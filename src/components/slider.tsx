'use client'

import Image from 'next/image'
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

import 'swiper/css'
import 'swiper/css/navigation'
import './slider.css'

const Slider = () => {
  const { slider } = useSelector((state: RootState) => state.products)
  return (
    <div className='w-[550px] max-lg:w-full'>
      <Swiper
        modules={[Navigation, Autoplay, EffectCoverflow]}
        effect='coverflow'
        autoplay={{
          delay: 4000,
        }}
        coverflowEffect={{
          rotate: 90,
        }}
        speed={700}
        navigation={true}
        spaceBetween={10}
        slidesPerView={1}
      >
        {slider.map((data, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image
                src={data.product.images[0]}
                alt='slider image'
                className='object-contain min-h-[500px] max-h-[500px] max-md:max-h-[430px] max-md:min-h-[430px]'
                height={500}
                width={600}
                priority
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Slider
