'use client'

import { mainData } from './data/data'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Link from 'next/link'
import Slider from '@/components/slider'

const Home = () => {
  const { language } = useSelector((state: RootState) => state.global)
  return (
    <main className='w-full mt-40 flex flex-col gap-40 relative'>
      <section
        className={`w-full flex items-center justify-between ${
          language === 'geo' ? 'font-notoSans' : 'font-poppins'
        }`}
      >
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <span className={`text-main font-medium text-[17px]`}>
              {language === 'eng' ? mainData.eng_line : mainData.geo_line}
            </span>
            <div className='w-[80px] h-[2px] bg-main/80 rounded-full' />
          </div>
          <h2 className={`text-5xl max-w-[470px] leading-[1.3]`}>
            {language === 'eng' ? mainData.eng_title : mainData.geo_title}
          </h2>
          <p className='text-sm text-slate-600/90 max-w-[470px]'>
            {language === 'eng'
              ? mainData.eng_description
              : mainData.geo_description}
          </p>
          <div className='mt-5 flex items-center gap-4'>
            {mainData.buttons.map((obj, idx) => {
              return (
                <Link
                  href={obj.path}
                  key={idx}
                  className={`px-6 py-2.5 ${
                    obj.eng_title === 'Explore Now'
                      ? 'bg-main border-1 border-main transition-all duration-300 ease-linear text-white shadow-xl shadow-black/30 hover:shadow-none'
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
    </main>
  )
}

export default Home
