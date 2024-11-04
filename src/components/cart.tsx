'use client'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'
import { TbCurrencyLari } from 'react-icons/tb'

const Cart = () => {
  const { language } = useSelector((state: RootState) => state.global)
  return (
    <div
      className={`h-full w-[340px] bg-white fixed right-0 top-0 shadow-xl flex flex-col items-start z-[999] ${
        language === 'geo' ? 'font-notoSans' : 'font-poppins'
      }`}
    >
      <div className='w-full flex items-center justify-between p-4 border-b'>
        <h3 className='text-lg font-semibold'>
          {language === 'geo' ? 'კალათი' : 'Cart'}
        </h3>
        <div className='flex items-center gap-1 cursor-pointer hover:text-gray-500 transition-all duration-300 ease-linear'>
          <IoCloseOutline className='text-[22px] -translate-y-[1.5px]' />
          <span className='text-sm font-semibold'>
            {language === 'geo' ? 'დახურვა' : 'close'}
          </span>
        </div>
      </div>
      <div className='overflow-y-scroll w-full px-4 h-[77%]'></div>
      <div className='flex flex-col items-start w-full p-4 gap-3'>
        <div className='w-full flex items-center justify-between'>
          <span className='font-semibold text-[19px]'>
            {language === 'geo' ? 'ჯამი:' : 'Total:'}
          </span>
          <span className='flex items-center gap-1 text-[19px] font-notoSans font-semibold text-main'>
            <span className='translate-y-0.5'>0</span>{' '}
            <TbCurrencyLari className='text-[20px]' />
          </span>
        </div>
        <div className='flex flex-col items-center gap-2 w-full'>
          <button className='h-[42px] text-center text-sm flex items-center justify-center w-full bg-[#F7F7F7] font-semibold hover:bg-[#e6e4e4] transition-all duration-200 ease-linear'>
            {language === 'geo' ? 'კალათის გასუფთავება' : 'Clear cart'}
          </button>
          <button className='h-[42px] text-center text-sm flex items-center justify-center w-full bg-main font-semibold hover:bg-[#476e2b] transition-all duration-200 ease-linear text-white'>
            {language === 'geo' ? 'შეძენა' : 'Purchase'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
