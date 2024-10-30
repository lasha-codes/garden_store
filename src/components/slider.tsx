import { sliderData } from '@/app/data/data'
import Image from 'next/image'
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

const Slider = () => {
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
        {sliderData.map((data, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image
                src={data.image}
                alt='slider image'
                className='object-contain min-h-[500px] max-h-[500px]'
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
