'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { IoIosClose } from 'react-icons/io'
import { TbCurrencyLari } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCart } from '@/lib/slices/products'
import { MdDeliveryDining } from 'react-icons/md'
import Link from 'next/link'
import { AppDispatch, RootState } from '@/lib/store'
import { finishPurchase } from '@/services/products'

const OrderComplete = () => {
  const dispatch = useDispatch<AppDispatch>()
  const params = useSearchParams()
  const [lineItems, setLineItems] = useState<any[]>([])
  const [session, setSession] = useState<any>({})
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const { cartOpen, retrievedCart } = useSelector(
    (state: RootState) => state.products
  )

  useEffect(() => {
    const sessionId = params.get('session_id')

    const retrieveSession = async () => {
      const { data } = await axios.get(`stripe/session/get/${sessionId}`)
      if (data.status === 'failed' || !data.status) {
        return (window.location.href = '/')
      }
      if (data.session && data.status && data.lineItems) {
        setLineItems(data.lineItems.data)
        setSession(data.session)
      }
    }
    retrieveSession()
  }, [])

  useEffect(() => {
    if (retrievedCart.length > 0) {
      finishPurchase(retrievedCart, dispatch)
    }
  }, [retrievedCart])

  useEffect(() => {
    if (lineItems.length > 0) {
      lineItems.forEach((product) => {
        setTotalPrice((prev) => {
          return prev + (product.price.unit_amount / 100) * product.quantity
        })
      })
    }
  }, [lineItems])

  if (lineItems.length > 0) {
    return (
      <main className='h-[91vh] w-full flex items-center justify-center font-notoSans'>
        <div className='bg-[#F7F7F7] p-6 flex flex-col items-center gap-3'>
          <h2 className='text-lg font-semibold'>YOUR ORDER</h2>
          <div className='bg-white w-[400px] flex flex-col p-4'>
            <div className='w-full flex items-center justify-between font-semibold text-sm pb-3 pt-0.5 border-b-2 border-[#E4E4E4]'>
              <h3>PRODUCT</h3>
              <h3>SUBTOTAL</h3>
            </div>
            <div className='flex flex-col w-full items-start'>
              {lineItems.map((product, idx) => {
                return (
                  <div
                    key={idx}
                    className='py-3 border-b border-[#E4E4E4] flex items-center w-full justify-between'
                  >
                    <div className='flex items-center gap-1'>
                      <p className='text-[15px] text-[#777777] max-w-[250px]'>
                        {product.description}
                      </p>
                      <IoIosClose className='text-[#6c6c6c]' />
                      <span className='text-sm font-semibold text-[#777777]'>
                        {product.quantity}
                      </span>
                    </div>
                    <div className='flex items-start gap-1.5'>
                      <span className='text-[15px] text-[#777777]'>
                        {(
                          (product.price.unit_amount / 100) *
                          product.quantity
                        ).toFixed(2)}
                      </span>
                      <TbCurrencyLari className='text-[#777777]' />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='w-full flex items-center justify-between py-3 border-b border-[#E4E4E4]'>
              <div
                onClick={() => dispatch(toggleCart(false))}
                className={`fixed w-screen h-screen top-0 left-0 z-[500] bg-black/50 transition-all duration-200 ease-linear ${
                  cartOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              />
              <h3 className='font-semibold text-[15px]'>Subtotal</h3>
              <h3 className='flex items-start gap-2 font-semibold text-main'>
                <span>{totalPrice.toFixed(2)}</span>
                <TbCurrencyLari className='text-xl' />
              </h3>
            </div>
            <div className='w-full flex items-center justify-between py-3 border-b border-[#E4E4E4]'>
              <h3 className='font-semibold text-[15px]'>Shipping</h3>
              <div className='flex items-center gap-2'>
                <MdDeliveryDining className='text-[22px]' />
                <span className='text-sm'>
                  {session?.shipping_cost.amount_subtotal / 100 === 10
                    ? 'მიწოდება თბილისში'
                    : 'მიწოდება რეგიონში'}
                </span>
                -
                <div className='flex items-center gap-1 text-[#777777]'>
                  <span className='text-[15px]'>
                    {(session?.shipping_cost.amount_subtotal / 100).toFixed(2)}
                  </span>
                  <TbCurrencyLari />
                </div>
              </div>
            </div>
            <div className='w-full flex items-center justify-between py-4 border-b border-[#E4E4E4]'>
              <h2 className='text-xl font-semibold'>Total</h2>
              <div className='flex items-center gap-2 text-xl text-main font-semibold'>
                <span>
                  {(
                    totalPrice +
                    session?.shipping_cost.amount_subtotal / 100
                  ).toFixed(2)}
                </span>
                <TbCurrencyLari className='text-2xl' />
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col items-center gap-4'>
            <Link
              href='/'
              className='w-full py-3 bg-main hover:bg-main/90 transition-all duration-200 ease-linear text-white flex items-center justify-center'
            >
              <span>მთავარი გვერდი</span>
            </Link>
            <p className='uppercase text-[15px] text-main'>
              transaction was successful.
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default OrderComplete
