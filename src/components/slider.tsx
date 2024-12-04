'use client'

import Image from 'next/image'
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import './slider.css'
import { getSlider } from '@/services/products'
import { useState, useEffect, cache } from 'react'

const Slider = () => {
  const [slider, setSlider] = useState<
    {
      product: {
        images: string[]
      }
    }[]
  >([])
  useEffect(() => {
    const fetchSlider = cache(async () => {
      const data = await getSlider()
      setSlider(data)
    })
    fetchSlider()
  }, [])

  return (
    <div className={`w-[550px] max-lg:w-full`}>
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
        className={``}
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
        {slider.length === 0 && <div className='w-full h-[500px]'></div>}
      </Swiper>
    </div>
  )
}

export default Slider
