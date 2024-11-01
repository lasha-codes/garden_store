import { Product as ProductType } from '@/types/globalTypes'
import Link from 'next/link'
import Image from 'next/image'
import { BsPlus, BsEyeFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { CgDollar } from 'react-icons/cg'
import { TbCurrencyLari } from 'react-icons/tb'
import { MdEuroSymbol } from 'react-icons/md'
import { trimText } from '@/utils/utils'

const Product = ({ product }: { product: ProductType }) => {
  const { language } = useSelector((state: RootState) => state.global)
  const ReturnCurrency = () => {
    if (product.currency === 'dollar') {
      return <CgDollar className='text-xl' />
    } else if (product.currency === 'euro') {
      return <MdEuroSymbol className='text-[18px]' />
    } else {
      return <TbCurrencyLari className='text-xl' />
    }
  }
  return (
    <div className={`${language === 'geo' ? 'font-notoSans' : 'font-poppins'}`}>
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition rounded-[5px]'>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-[220px] mx-auto h-full flex justify-center items-center relative'>
            <Image
              priority
              fill
              className='h-full group-hover:scale-110 transition duration-300 object-cover'
              src={product.images[0]}
              alt=''
            />
          </div>
        </div>
        <div className='absolute top-4 -right-11 group-hover:right-3 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <button>
            <div className='flex justify-center items-center text-white w-12 h-12 bg-main'>
              <BsPlus className='text-3xl' />
            </div>
          </button>
          <Link
            href={`/products/${product.id}`}
            className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div className='text-sm capitalize text-gray-500'>
        {trimText(
          language === 'eng'
            ? product.eng_description
            : product.geo_description,
          22
        )}
      </div>
      <Link href={`/products/${product.id}`}>
        <h2 className='font-medium mb-1'>
          {language === 'eng' ? product.eng_title : product.geo_title}
        </h2>
      </Link>
      <div className='font-medium flex items-center gap-0.5'>
        <ReturnCurrency /> {product.price}
      </div>
    </div>
  )
}

export default Product
