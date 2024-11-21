import { Product as ProductType } from '@/types/globalTypes'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { IoIosClose } from 'react-icons/io'
import { CgDollar } from 'react-icons/cg'
import { TbCurrencyLari } from 'react-icons/tb'
import { MdEuroSymbol } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { removeFromCart } from '@/lib/slices/products'
import Link from 'next/link'
import { trimText } from '@/utils/utils'

interface CartProduct extends ProductType {
  qty: number
}

const Product = ({ product }: { product: CartProduct }) => {
  const dispatch = useDispatch<AppDispatch>()
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
  const { language } = useSelector((state: RootState) => state.global)
  return (
    <div
      className={`w-full flex relative border-b last:border-none px-4 items-start justify-start gap-3 cursor-pointer h-[125px] group py-3.5 ${
        language === 'geo' ? 'font-notoSans' : 'font-poppins'
      }`}
    >
      <div className='w-[30%] h-full relative'>
        <Image
          src={product.images[0]}
          fill
          priority
          alt='product in cart image'
          className='object-cover'
        />
      </div>
      <Link
        href={`/products/${product.id}`}
        className='flex flex-col w-full items-start'
      >
        <h3 className='font-semibold text-[15px]'>
          {trimText(
            language === 'geo' ? product.geo_title : product.eng_title,
            18
          )}
        </h3>
        <p className='text-[13px] max-w-[90%]'>
          {trimText(
            language === 'geo'
              ? product.geo_description
              : product.eng_description,
            35
          )}
        </p>
        <div className='w-full flex items-center gap-2 font-notoSans text-sm mt-2.5'>
          <span className='text-[#858585]'>{product.qty}</span>
          <span className='text-[#858585]'>x</span>
          <div className='flex items-center gap-1 text-main font-semibold'>
            <span>{product.price.toFixed(2)}</span>
            <div className='-translate-y-0.5'>
              <ReturnCurrency />
            </div>
          </div>
        </div>
      </Link>
      <div className='absolute w-full h-full pointer-events-none bg-gray-400/20 left-0 top-0 z-[40] opacity-0 group-hover:opacity-100 transition-all duration-200 ease-linear'></div>
      <button
        onClick={() => dispatch(removeFromCart({ removeId: product.id }))}
        className='absolute top-2.5 right-4 p-0.5 rounded-full bg-transparent hover:bg-white hover:border-gray-300/40 border border-transparent z-[50] transition-all duration-200 ease-linear'
      >
        <IoIosClose className='text-[20px] text-[#858585]' />
      </button>
    </div>
  )
}
export default Product
