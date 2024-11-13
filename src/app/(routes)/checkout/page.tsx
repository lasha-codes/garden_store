'use client'

import { toggleCart } from '@/lib/slices/products'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cartOpen } = useSelector((state: RootState) => state.products)
  return (
    <main className='bg-white flex items-start gap-4 mt-16 font-notoSans'>
      <div
        onClick={() => dispatch(toggleCart(false))}
        className={`fixed w-screen h-screen top-0 left-0 z-[500] bg-black/50 transition-all duration-200 ease-linear ${
          cartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      <div className='w-full flex flex-col gap-5'>
        <h2 className='font-notoSans font-semibold text-2xl'>
          BILLING DETAILS
        </h2>
        <form className='flex flex-col items-start gap-5 w-full'>
          <div className='flex items-center gap-3 w-full'>
            <div className='w-full flex flex-col items-start gap-1'>
              <label
                htmlFor='name'
                className='flex items-center gap-1.5 text-[15px]'
              >
                <span>სახელი</span>
                <span className='text-red-500'>*</span>
              </label>
              <input
                id='name'
                type='text'
                className='w-full h-[42px] outline-none px-3 text-[15px] py-1 border border-[#D9D9D9] text-[#778080]'
              />
            </div>
            <div className='w-full flex flex-col items-start gap-1'>
              <label
                htmlFor='lastName'
                className='flex items-center gap-1.5 text-[15px]'
              >
                <span>გვარი</span>
                <span className='text-red-500'>*</span>
              </label>
              <input
                id='lastName'
                type='text'
                className='w-full h-[42px] outline-none text-[15px] px-3 py-1 border border-[#D9D9D9] text-[#778080]'
              />
            </div>
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='idNumber'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>პირადი ნომერი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              id='idNumber'
              type='text'
              className='w-full h-[42px] outline-none text-[15px] px-3 py-1 border border-[#D9D9D9] text-[#778080]'
            />
          </div>
          <div className='flex flex-col items-start gap-1'>
            <div className='flex items-center gap-1.5 text-[15px]'>
              <span>ქვეყანა</span>
              <span className='text-red-500'>*</span>
            </div>
            <span className='text-[15px] font-semibold text-[#777780]'>
              Georgia
            </span>
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='city'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>ქალაქი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              id='city'
              type='text'
              className='w-full h-[42px] outline-none text-[15px] px-3 py-1 border border-[#D9D9D9] text-[#778080]'
            />
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='address'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>ქუჩის მისამართი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              id='address'
              type='text'
              placeholder='სახლის ნომერი და ქუჩის მისამართი'
              className='w-full h-[42px] outline-none px-3 text-[15px] py-1 border border-[#D9D9D9] text-[#778080] placeholder:text-[#778080]'
            />
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='phone'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>ტელეფონი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              id='phone'
              type='text'
              className='w-full h-[42px] outline-none px-3 text-[15px] py-1 border border-[#D9D9D9] text-[#778080] placeholder:text-[#778080]'
            />
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='email'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>ელფოსტის მისამართი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              id='email'
              type='email'
              className='w-full h-[42px] outline-none px-3 text-[15px] py-1 border border-[#D9D9D9] text-[#778080] placeholder:text-[#778080]'
            />
          </div>
          <div className='w-full flex flex-col items-start gap-1 mt-5'>
            <label
              htmlFor='notes'
              className='flex items-center gap-1.5 text-[15px]'
            >
              Order notes (optional)
            </label>
            <textarea
              id='notes'
              placeholder='Notes about your order, e.g. special notes for delivery.'
              className='w-full h-[180px] outline-none px-3 text-[15px] py-4 border border-[#D9D9D9] text-[#778080] placeholder:text-[#778080]'
            />
          </div>
        </form>
      </div>
      <div className='w-full h-[50px] bg-black'></div>
    </main>
  )
}

export default Checkout
