'use client'

import { mainData } from './data/data'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Slider = dynamic(() => import('@/components/slider'), {})
const Categories = dynamic(() => import('@/components/categories'), {})
import { useDispatch } from 'react-redux'
import { toggleCart } from '@/lib/slices/products'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { language } = useSelector((state: RootState) => state.global)
  const { cartOpen } = useSelector((state: RootState) => state.products)

  return (
    <main className='w-full mt-20 max-md:mt-16 flex flex-col gap-16 relative'>
      <div
        onClick={() => dispatch(toggleCart(false))}
        className={`fixed w-screen h-screen top-0 left-0 z-[500] bg-black/50 transition-all duration-200 ease-linear ${
          cartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      <section
        className={`w-full flex items-center max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-10 justify-between ${
          language === 'geo' ? 'font-notoSans' : 'font-poppins'
        }`}
      >
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <span
              className={`text-main font-medium text-[17px] max-md:text-base`}
            >
              {language === 'eng' ? mainData.eng_line : mainData.geo_line}
            </span>
            <div className='w-[80px] h-[2px] bg-main/80 rounded-full' />
          </div>
          <h2
            className={`text-5xl max-w-[470px] max-md:max-w-full leading-[1.3] max-md:text-4xl`}
          >
            {language === 'eng' ? mainData.eng_title : mainData.geo_title}
          </h2>
          <p className='text-sm text-slate-600/90 max-w-[470px] max-md:max-w-full max-md:text-[13px]'>
            {language === 'eng'
              ? mainData.eng_description
              : mainData.geo_description}
          </p>
          <div className='mt-5 flex items-center gap-4 max-md:mt-2'>
            {mainData.buttons.map((obj, idx) => {
              return (
                <Link
                  onClick={() => {}}
                  href={obj.path}
                  key={idx}
                  className={`px-6 py-2.5 ${
                    obj.eng_title === 'Explore Now'
                      ? 'bg-main border-2 border-main max-md:text-sm max-md:mt-0 transition-all duration-300 ease-linear text-white shadow-xl shadow-black/30 hover:shadow-none'
                      : 'bg-transparent border border-main text-main'
                  }`}
                >
                  {language === 'eng' ? obj.eng_title : obj.geo_title}
                </Link>
              )
            })}
          </div>
        </div>
        <Slider />
      </section>
      <Categories />
    </main>
  )
}

export default Home
