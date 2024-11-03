'use client'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'

const Cart = () => {
  const { language } = useSelector((state: RootState) => state.global)
  return (
    <div
      className={`h-full w-[350px] bg-white fixed right-0 top-0 shadow-xl flex flex-col items-start z-[999] ${
        language === 'geo' ? 'font-notoSans' : 'font-poppins'
      }`}
    >
      <div className='w-full flex items-center justify-between px-3 py-5'>
        <h3 className='text-xl font-bold'>
          {language === 'geo' ? 'კალათი' : 'Cart'}
        </h3>
        <div className='flex items-center gap-1'>
          <IoCloseOutline className='text-xl' />
          <span className='text-[15px] font-medium'>
            {language === 'geo' ? 'დახურვა' : 'close'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Cart
