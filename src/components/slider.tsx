'use client'

import { sliderData } from '@/app/data/data'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

const Slider = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [prevIndex, setPrevIndex] = useState<number>(sliderData.length - 1)
  const [animate, setAnimate] = useState<boolean>(false)

  useEffect(() => {
    setAnimate(true)
    const timeout = setTimeout(() => {
      setAnimate(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [selectedIndex])

  console.log(animate)

  const { language } = useSelector((state: RootState) => state.global)
  return (
    <section className='flex items-center gap-20'>
      <Image
        src={sliderData[prevIndex].image}
        alt='slider image'
        width={400}
        height={400}
        className={`h-full object-contain absolute transition-all duration-300 ease-linear left-1/2 -translate-x-1/2 opacity-0 ${
          animate && '!opacity-100'
        }`}
      />

      <Image
        width={400}
        height={400}
        src={sliderData[selectedIndex].image}
        alt='slider image'
        className={`h-full object-contain absolute transition-all duration-300 ease-linear left-1/2 -translate-x-1/2 opacity-100 ${
          animate && '!opacity-0'
        }`}
      />

      <div className='flex items-center gap-3 min-w-[270px] max-w-[270px]'>
        <div className='flex flex-col items-center gap-5'>
          {sliderData.map((data, idx) => {
            return (
              <span
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`whitespace-nowrap cursor-pointer transition-all duration-300 ${
                  selectedIndex === idx ? 'text-main' : 'text-black'
                } ${language === 'eng' ? 'font-poppins' : 'font-notoSans'}`}
              >
                {language === 'eng' ? data.eng_title : data.geo_title}
              </span>
            )
          })}
        </div>
        <div className='h-fit w-[5px] bg-gray-300/50 rounded-full'>
          {sliderData.map((data, idx) => {
            return (
              <div
                onClick={() => setSelectedIndex(idx)}
                key={idx}
                className='h-[50px] cursor-pointer flex items-center justify-center w-full'
              >
                <div
                  className={`w-full h-[50px] cursor-pointer rounded-full transition-all duration-300 ease-linear ${
                    selectedIndex === idx
                      ? 'bg-main !h-[50px]'
                      : 'bg-transparent !h-0'
                  }`}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Slider
