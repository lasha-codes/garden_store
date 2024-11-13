'use client'
import { RootState, AppDispatch } from '@/lib/store'
import { useSelector, useDispatch } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'
import { TbCurrencyLari } from 'react-icons/tb'
import { clearCart, selectCartTotals, toggleCart } from '@/lib/slices/products'
import Product from './product'
import { BsCartX } from 'react-icons/bs'
import Link from 'next/link'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { language } = useSelector((state: RootState) => state.global)
  const { cartOpen, retrievedCart } = useSelector(
    (state: RootState) => state.products
  )
  const { totalPrice } = useSelector(selectCartTotals)

  return (
    <div
      className={`h-full w-[350px] transition-all duration-500 bg-white fixed right-0 top-0 shadow-xl flex flex-col items-start z-[999] ${
        cartOpen ? 'translate-x-0' : 'translate-x-[400px]'
      } ${language === 'geo' ? 'font-notoSans' : 'font-poppins'}`}
    >
      <div className='w-full flex items-center justify-between p-4 border-b'>
        <h3 className='text-lg font-semibold'>
          {language === 'geo' ? 'კალათი' : 'Cart'}
        </h3>
        <button
          onClick={() => dispatch(toggleCart(false))}
          className='flex items-center gap-1 cursor-pointer hover:text-gray-500 transition-all duration-300 ease-linear'
        >
          <IoCloseOutline className='text-[22px] -translate-y-[1.5px]' />
          <span className='text-sm font-semibold'>
            {language === 'geo' ? 'დახურვა' : 'close'}
          </span>
        </button>
      </div>
      {retrievedCart.length > 0 ? (
        <>
          <div className='overflow-y-auto w-full h-[77%]'>
            {retrievedCart?.length > 0 &&
              retrievedCart.map((product, idx) => {
                return <Product key={idx} product={product} />
              })}
          </div>
          <div className='flex flex-col items-start w-full p-4 gap-3'>
            <div className='w-full flex items-center justify-between'>
              <span className='font-semibold text-[19px]'>
                {language === 'geo' ? 'ჯამი:' : 'Total:'}
              </span>
              <span className='flex items-center gap-1 text-[19px] font-notoSans font-semibold text-main'>
                <span className='translate-y-0.5'>{totalPrice}</span>{' '}
                <TbCurrencyLari className='text-[20px]' />
              </span>
            </div>
            <div className='flex flex-col items-center gap-2 w-full'>
              <button
                onClick={() => dispatch(clearCart())}
                className='h-[42px] text-center text-sm flex items-center justify-center w-full bg-[#F7F7F7] font-semibold hover:bg-[#e6e4e4] transition-all duration-200 ease-linear'
              >
                {language === 'geo' ? 'კალათის გასუფთავება' : 'Clear cart'}
              </button>
              <button className='h-[42px] text-center text-sm flex items-center justify-center w-full bg-main font-semibold hover:bg-[#476e2b] transition-all duration-200 ease-linear text-white'>
                {language === 'geo' ? 'შეძენა' : 'Purchase'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full flex flex-col items-center gap-4 mt-5'>
          <BsCartX className='text-8xl text-[#EDEDED]' />
          <span className='text-sm font-semibold'>
            {language === 'eng'
              ? 'No products in the cart.'
              : 'კალათა ცარიელია.'}
          </span>
          <Link
            href='/products'
            className='bg-main text-white text-[13px] font-semibold px-5 py-2 hover:bg-main/90 transition-all duration-200 ease-linear'
          >
            {language === 'eng'
              ? 'Redirect to the shop'
              : 'მაღაზიაში დაბრუნება'}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
