'use client'

import { Product } from '@/types/globalTypes'
import Image from 'next/image'
import { trimText } from '@/utils/utils'
import { months } from '../_data/data'
import { TbCurrencyLari } from 'react-icons/tb'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { removeProductById } from '@/services/products'

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const formatDate = (createdAt: number) => {
    const date = new Date(createdAt)
    const year = date.getFullYear()
    const month = months.find((_, idx) => {
      return idx === date.getMonth()
    })
    const day = date.getDate()
    return `${day} ${month} ${year}`
  }

  const date = product?.createdAt ? formatDate(product?.createdAt) : ''

  return (
    <div className='w-full py-4 border-b last:border-none border-[#202020] flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <Image
          src={product.images[0]}
          alt='product image'
          width={80}
          height={80}
          className='object-cover rounded-[10px]'
        />
        <div className='flex flex-col items-start gap-2.5'>
          <div className='flex flex-col items-start'>
            <h3 className='text-[#FFFFFF]'>
              {trimText(product.geo_title, 25)}
            </h3>
            <h3 className='text-[#505050] font-poppins text-[15px]'>
              {trimText(product.eng_title, 25)}
            </h3>
          </div>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-3'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.83327 15.2485L4.56432 15.0809L3.83327 15.2485ZM3.83327 9.35323L4.56432 9.52078L3.83327 9.35323ZM20.1667 9.35323L19.4357 9.52079L20.1667 9.35323ZM20.1667 15.2485L19.4357 15.0809L20.1667 15.2485ZM14.8801 20.6589L15.0552 21.3882L14.8801 20.6589ZM9.11986 20.6589L9.29493 19.9296L9.11986 20.6589ZM9.11985 3.94279L9.29493 4.67207L9.11985 3.94279ZM14.8801 3.94279L15.0552 3.21351L14.8801 3.94279ZM8.82008 3C8.82008 2.58579 8.48429 2.25 8.07008 2.25C7.65587 2.25 7.32008 2.58579 7.32008 3H8.82008ZM7.32008 5.51375C7.32008 5.92796 7.65587 6.26375 8.07008 6.26375C8.48429 6.26375 8.82008 5.92796 8.82008 5.51375H7.32008ZM16.6799 3C16.6799 2.58579 16.3441 2.25 15.9299 2.25C15.5157 2.25 15.1799 2.58579 15.1799 3H16.6799ZM15.1799 5.51375C15.1799 5.92796 15.5157 6.26375 15.9299 6.26375C16.3441 6.26375 16.6799 5.92796 16.6799 5.51375H15.1799ZM4.56432 15.0809C4.14523 13.2524 4.14523 11.3493 4.56432 9.52078L3.10223 9.18568C2.63259 11.2347 2.63259 13.367 3.10223 15.416L4.56432 15.0809ZM19.4357 9.52079C19.8548 11.3493 19.8548 13.2524 19.4357 15.0809L20.8978 15.416C21.3674 13.367 21.3674 11.2347 20.8978 9.18568L19.4357 9.52079ZM14.7051 19.9296C12.9258 20.3568 11.0742 20.3568 9.29493 19.9296L8.94478 21.3882C10.9542 21.8706 13.0458 21.8706 15.0552 21.3882L14.7051 19.9296ZM9.29493 4.67207C11.0742 4.24493 12.9258 4.24493 14.7051 4.67207L15.0552 3.21351C13.0458 2.73111 10.9542 2.73111 8.94478 3.21351L9.29493 4.67207ZM9.29493 19.9296C6.95607 19.3682 5.11769 17.4953 4.56432 15.0809L3.10223 15.416C3.77946 18.3708 6.03739 20.6902 8.94478 21.3882L9.29493 19.9296ZM15.0552 21.3882C17.9626 20.6902 20.2205 18.3708 20.8978 15.416L19.4357 15.0809C18.8823 17.4953 17.0439 19.3682 14.7051 19.9296L15.0552 21.3882ZM14.7051 4.67207C17.0439 5.23355 18.8823 7.10642 19.4357 9.52079L20.8978 9.18568C20.2205 6.23089 17.9626 3.91147 15.0552 3.21351L14.7051 4.67207ZM8.94478 3.21351C6.03739 3.91147 3.77946 6.23089 3.10223 9.18568L4.56432 9.52078C5.11769 7.10641 6.95607 5.23355 9.29493 4.67207L8.94478 3.21351ZM4.14016 9.02886H19.8598V7.52886H4.14016V9.02886ZM7.32008 3V5.51375H8.82008V3H7.32008ZM15.1799 3V5.51375H16.6799V3H15.1799Z'
                  fill='#585858'
                />
                <path
                  d='M13.442 13.9239C13.847 13.6359 14.099 13.2039 14.099 12.6189C14.099 11.4039 13.163 10.7739 12.056 10.7739C10.949 10.7739 10.004 11.4039 10.004 12.6189C10.004 13.2039 10.265 13.6359 10.661 13.9239C10.112 14.2569 9.797 14.8059 9.797 15.4449C9.797 16.6059 10.652 17.3259 12.056 17.3259C13.451 17.3259 14.315 16.6059 14.315 15.4449C14.315 14.8059 14 14.2569 13.442 13.9239ZM12.056 11.9439C12.524 11.9439 12.866 12.2139 12.866 12.6819C12.866 13.1409 12.524 13.4289 12.056 13.4289C11.588 13.4289 11.246 13.1409 11.246 12.6819C11.246 12.2139 11.588 11.9439 12.056 11.9439ZM12.056 16.1559C11.462 16.1559 11.03 15.8499 11.03 15.2829C11.03 14.7249 11.462 14.4189 12.056 14.4189C12.65 14.4189 13.082 14.7249 13.082 15.2829C13.082 15.8499 12.65 16.1559 12.056 16.1559Z'
                  fill='#585858'
                />
              </svg>
              <span className='text-[#585858] text-sm'>{date}</span>
            </div>
            <div className='flex items-center gap-1 text-main font-semibold'>
              <span>{product.price}</span>
              <TbCurrencyLari className='text-xl' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Link
          href={`/admin/products/update/${product.id}`}
          className='flex items-center gap-3 py-3 px-5 rounded-[10px] bg-main/30'
        >
          <div className='bg-main h-[10px] w-[10px] rounded-full' />
          <span className='text-[15px] text-main translate-y-[1px]'>
            რედაქტირება
          </span>
        </Link>
        <button
          onClick={() => removeProductById(product.id as string, dispatch)}
          className='flex items-center gap-3 py-3 px-5 rounded-[10px] bg-red-600/40'
        >
          <div className='bg-red-600 h-[10px] w-[10px] rounded-full' />
          <span className='text-[15px] text-red-600 translate-y-[1px]'>
            წაშლა
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
