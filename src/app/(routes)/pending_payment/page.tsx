'use client'

import { PaymentIntent } from '@stripe/stripe-js'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'
import { TbCurrencyLari } from 'react-icons/tb'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { retrievePaymentIntent } from '@/services/stripe'
import { finishPurchase } from '@/services/products'

type intentProduct = {
  name: string
  price: string
  qty: string
}

interface completePaymentIntent extends PaymentIntent {
  metadata: {
    products: intentProduct[]
    status: string
    amount: number
    shipping_cost: number
  }
}

const PendingPayment = () => {
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const [paymentIntent, setPaymentIntent] =
    useState<completePaymentIntent | null>(null)
  const { retrievedCart } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    const paymentIntentId = params.find((param) => {
      return param.startsWith('pi_')
    })

    retrievePaymentIntent(paymentIntentId || '').then((intent) => {
      setPaymentIntent(intent)
    })
  }, [])

  useEffect(() => {
    if (paymentIntent && retrievedCart) {
      finishPurchase(retrievedCart, dispatch)
    }
  }, [paymentIntent, retrievedCart])

  if (paymentIntent) {
    return (
      <main className='w-full h-[92vh] flex items-center justify-center'>
        <div className='bg-[#F7F7F7] flex flex-col items-center gap-3 p-6 w-fit'>
          <h3 className='text-xl font-notoSans font-semibold'>YOUR ORDER</h3>
          <div className='bg-white w-[400px] flex flex-col items-start p-3'>
            <div className='w-full flex items-center justify-between pb-2.5 pt-1 border-b-2 border-[#E4E4E4]'>
              <h4 className='text-[15px] font-semibold font-notoSans'>
                PRODUCT
              </h4>
              <h4 className='text-[15px] font-semibold font-notoSans'>
                SUBTOTAL
              </h4>
            </div>
            <div className='flex flex-col items-start w-full'>
              {paymentIntent &&
                [
                  ...JSON.parse(paymentIntent?.metadata.products.toString()),
                ].map((product: intentProduct, idx) => {
                  return (
                    <div
                      key={idx}
                      className='w-full py-3 border-b border-[#E4E4E4] flex items-center justify-between'
                    >
                      <h3 className='text-[#777777] font-notoSans text-[15px]'>
                        {product.name + ' ' + '..'}
                      </h3>
                      <div className='flex items-center gap-1'>
                        <IoIosClose className='text-[#6d6d6d]' />
                        <span className='font-notoSans font-semibold text-[#777777] text-sm'>
                          {product.qty}
                        </span>
                      </div>
                      <div className='flex items-start gap-1'>
                        <span className='font-notoSans text-[#777777] text-[15px]'>
                          {(
                            Number(product.price.trim().split('-')[0]) *
                            Number(product.qty)
                          ).toFixed(2)}
                        </span>
                        <TbCurrencyLari className='text-[18px] text-[#777777]' />
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className='w-full flex items-center justify-between py-3 border-b border-[#E4E4E4]'>
              <h4 className='font-notoSans font-semibold text-[15px]'>
                Status
              </h4>
              <span className='font-notoSans uppercase text-[13px] font-semibold'>
                {paymentIntent?.metadata.status}
              </span>
            </div>
            <div className='w-full flex items-center justify-between font-notoSans py-3 border-b border-[#E4E4E4]'>
              <div className='flex items-center gap-1'>
                <h4 className='text-xl font-semibold'>Total</h4>
                {paymentIntent.metadata.shipping_cost.toString() !== '0' && (
                  <span className='text-sm'>( +SHIPPING )</span>
                )}
              </div>
              <h4 className='flex items-start gap-2 text-xl text-main font-semibold'>
                {((paymentIntent?.amount || 100) / 100).toFixed(2)}
                <TbCurrencyLari className='text-2xl' />
              </h4>
            </div>
            <Link
              href='/'
              className='bg-main w-full py-3 text-center hover:bg-main/90 transition-all duration-200 ease-linear text-white font-notoSans mt-3'
            >
              მთავარი გვერდი
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

export default PendingPayment
