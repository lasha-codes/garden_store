'use client'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Product as ProductType } from '@/types/globalTypes'
import Image from 'next/image'
import { Pagination, Navigation } from 'swiper/modules'
import './product.css'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

const Product = () => {
  const params = useParams()
  const [product, setProduct] = useState<ProductType | null>(null)
  const { language } = useSelector((state: RootState) => state.global)

  console.log(product)

  useEffect(() => {
    const getProductById = async () => {
      try {
        const { data } = await axios.get(`/products/get/${params.id}`)
        if (data.product) {
          setProduct(data.product)
        } else {
          setProduct(null)
        }
      } catch (err) {
        console.error(err)
      }
    }
    getProductById()
  }, [params])

  return (
    <main
      className={`w-full flex flex-col items-start mt-16 gap-6 ${
        language == 'geo' ? 'font-notoSans' : 'font-poppins'
      }`}
    >
      <div className='w-full flex items-center justify-between gap-10'>
        <div className='w-[700px] h-[300px] rounded-[10px] border overflow-hidden'>
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
            className='w-full h-full'
          >
            {product?.images.map((src, idx) => (
              <SwiperSlide key={idx} className='!h-[300px]'>
                <div className='relative h-full w-full'>
                  <Image
                    src={src}
                    priority
                    fill
                    className='object-contain'
                    alt='product image'
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='flex flex-col items-start w-full h-[300px] justify-start'>
          <h2 className='text-xl font-medium border-b w-full pb-3'>
            {product &&
              (language === 'geo' ? product.geo_title : product.eng_title)}
          </h2>
          <div className='pb-3 w-full border-b'>
            <p className='text-sm mt-3 max-w-[300px] text-gray-600'>
              {language === 'geo'
                ? product?.geo_description
                : product?.eng_description}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Product
