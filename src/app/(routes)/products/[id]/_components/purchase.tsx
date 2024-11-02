import { Product } from '@/types/globalTypes'
import { CgDollar } from 'react-icons/cg'
import { MdEuroSymbol } from 'react-icons/md'
import { TbCurrencyLari } from 'react-icons/tb'
import { useState } from 'react'
import { FaCcStripe } from 'react-icons/fa'

const Purchase = ({
  product,
  language,
}: {
  product: Product
  language: 'geo' | 'eng'
}) => {
  const [qty, setQty] = useState<string>('1')
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

  return (
    <div className='border rounded-xl flex flex-col items-start p-3.5 gap-3 min-w-[310px] max-w-[310px] max-xl:min-w-[60%] max-xl:max-w-[60%] max-md:min-w-full max-md:max-w-full'>
      <div className='flex items-center gap-0.5 text-lg font-poppins font-medium'>
        <span>{product?.price}</span>
        <ReturnCurrency />
      </div>
      <div className='flex flex-col items-start gap-3 w-full'>
        <div className='flex items-center gap-2'>
          <div className='w-[80px] h-[40px] flex items-center border font-poppins text-gray-500'>
            <button
              onClick={decrementQty}
              className='w-full h-full border-r hover:bg-main transition-all duration-300 ease-linear hover:text-white'
            >
              -
            </button>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!Number.isInteger(Number(e.target.value))) {
                  return
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
          <button className='text-sm bg-main hover:bg-main/90 transition-all duration-200 ease-linear h-[40px] text-white px-3'>
            {language === 'geo' ? 'კალათაში დამატება' : 'Add to cart'}
          </button>
        </div>
        <button className='flex items-center gap-3 w-full bg-[#6472FE] px-3 h-[45px] text-white rounded-[6px] hover:bg-[#6472FE]/90 transition-all duration-200 ease-linear'>
          <FaCcStripe className='text-3xl' />
          <div className='h-[20px] w-[1px] bg-white' />
          <span className='text-sm'>
            {language === 'geo' ? 'გადახდა' : 'Purchase'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Purchase
