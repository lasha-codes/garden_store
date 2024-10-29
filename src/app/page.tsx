'use client'
import { mainData } from './data/data'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

const Home = () => {
  const { language } = useSelector((state: RootState) => state.global)
  return (
    <main className='w-full mt-40 flex flex-col gap-40'>
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
            <div className='w-[100px] h-[2px] bg-main/80 rounded-full' />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
