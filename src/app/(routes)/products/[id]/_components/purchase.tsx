'use client'

import { Product } from '@/types/globalTypes'
import { CgDollar } from 'react-icons/cg'
import { MdEuroSymbol } from 'react-icons/md'
import { TbCurrencyLari } from 'react-icons/tb'
import { useState } from 'react'
import { FaCcStripe } from 'react-icons/fa'
import { addToCart, toggleCart } from '@/lib/slices/products'
import { AppDispatch, RootState } from '@/lib/store'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveCartData } from '@/lib/slices/products'
import Link from 'next/link'
import { FaRegFilePdf } from 'react-icons/fa'

const Purchase = ({
  product,
  language,
}: {
  product: Product
  language: 'geo' | 'eng'
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [qty, setQty] = useState<string>('1')
  const { cartLoading, retrievedCart } = useSelector(
    (state: RootState) => state.products
  )
  const ReturnCurrency = () => {
    if (product) {
      if (product.currency === 'dollar') {
        return <CgDollar className='text-xl' />
      } else if (product.currency === 'euro') {
        return <MdEuroSymbol className='text-[18px]' />
      } else {
        return <TbCurrencyLari className='text-xl' />
      }
    }
  }

  const decrementQty = () => {
    if (Number(qty) === 1) {
      return
    } else {
      setQty((prev) => (Number(prev) - 1).toString())
    }
  }

  const incrementQty = () => {
    if (Number(qty) === product.qty) {
      return
    } else {
      setQty((prev) => (Number(prev) + 1).toString())
    }
  }

  const addToCartFunction = () => {
    dispatch(
      addToCart({
        productId: product.id,
        qty: Number(qty),
        maxQty: product.qty,
      })
    )
    const alreadyRetrieved = retrievedCart.find((p) => {
      return product.id === p.id
    })
    if (!alreadyRetrieved) {
      dispatch(retrieveCartData())
    } else {
      dispatch(toggleCart(true))
    }
  }

  return (
    <div className='border rounded-xl flex flex-col items-start p-3.5 gap-3 min-w-[310px] max-w-[310px] max-xl:min-w-[60%] max-xl:max-w-[60%] max-md:min-w-full max-md:max-w-full'>
      <div className='flex items-center gap-0.5 text-lg font-poppins font-medium w-full'>
        <span>{product?.price}</span>
        <ReturnCurrency />
      </div>
      <div className='flex flex-col items-start gap-3 w-full'>
        <div className='flex items-center gap-2 w-full'>
          <div className='w-[80px] h-[40px] flex items-center border font-poppins text-gray-500'>
            <button
              onClick={decrementQty}
              className='w-full h-full border-r hover:bg-main transition-all duration-300 ease-linear hover:text-white'
            >
              -
            </button>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.value.trim()) {
                  return setQty('1')
                }
                if (!Number.isInteger(Number(e.target.value))) {
                  return
                }
                if (Number(e.target.value) > product.qty) {
                  return setQty(product.qty.toString())
                }
                setQty(e.target.value)
              }}
              value={qty}
              className='w-full h-full outline-none text-center'
            />
            <button
              onClick={incrementQty}
              className='w-full h-full border-l hover:bg-main transition-all duration-300 ease-linear hover:text-white'
            >
              +
            </button>
          </div>
          <button
            onClick={addToCartFunction}
            className='text-sm bg-main hover:bg-main/90 transition-all duration-200 ease-linear h-[40px] text-white px-3 w-full flex items-center justify-center'
          >
            {cartLoading === 'pending' ? (
              <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : language === 'geo' ? (
              'კალათაში დამატება'
            ) : (
              'Add to cart'
            )}
          </button>
        </div>
        {product?.PDF && (
          <Link
            href={product.PDF}
            target='_blank'
            className='w-full bg-[#DE231B] hover:bg-[#DE231B]/80 transition-all duration-200 ease-linear flex items-center gap-3 py-2.5 font-semibold text-white px-5'
          >
            <FaRegFilePdf className='text-xl' />
            <div className='h-[20px] w-[2px] bg-white' />
            <span className='text-sm'>ინსტრუქცია</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Purchase
