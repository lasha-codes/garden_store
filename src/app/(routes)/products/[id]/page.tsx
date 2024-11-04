'use client'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Product as ProductType } from '@/types/globalTypes'
import Image from 'next/image'
import { Pagination, Navigation } from 'swiper/modules'
import './product.css'
import { AppDispatch, RootState } from '@/lib/store'
import { useDispatch, useSelector } from 'react-redux'
import { SwiperRef } from 'swiper/react'
import SlideImage from './_components/slideImage'
import Purchase from './_components/purchase'
import { toggleCart } from '@/lib/slices/products'

const Product = () => {
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const [product, setProduct] = useState<ProductType | null>(null)
  const { language } = useSelector((state: RootState) => state.global)
  const { cartOpen } = useSelector((state: RootState) => state.products)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const swiperRef = useRef<SwiperRef | null>(null)

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
      <div
        onClick={() => dispatch(toggleCart(false))}
        className={`fixed w-screen h-screen top-0 left-0 z-[500] bg-black/50 transition-all duration-200 ease-linear ${
          cartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      <div className='w-full flex items-start justify-between gap-10 max-lg:flex-col'>
        <div className='flex flex-col items-center gap-3 w-full'>
          <div className='w-[500px] h-[300px] max-lg:w-full rounded-[10px] border flex flex-col items-center gap-2'>
            <Swiper
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              ref={swiperRef}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              modules={[Pagination, Navigation]}
              className='w-full h-full'
            >
              {product?.images.map((src, idx) => (
                <SwiperSlide key={idx}>
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
          <div className='flex items-center gap-3'>
            {product?.images.map((src, idx) => {
              return (
                <SlideImage
                  key={idx}
                  index={idx}
                  src={src}
                  swiper={swiperRef}
                  currentSlide={currentSlide}
                />
              )
            })}
          </div>
        </div>
        <div className='flex items-start w-full justify-between gap-7 max-xl:flex-col'>
          <div className='flex flex-col items-start w-full justify-start'>
            <h2 className='text-xl font-medium border-b w-full pb-3'>
              {product &&
                (language === 'geo' ? product.geo_title : product.eng_title)}
            </h2>
            <div className='pb-3 w-full border-b'>
              <p className='text-sm mt-3 max-w-[500px] text-gray-600'>
                {language === 'geo'
                  ? product?.geo_description
                  : product?.eng_description}
              </p>
            </div>
            {(product?.brand ||
              product?.model ||
              product?.material ||
              product?.size ||
              product?.weight) && (
              <div className='flex flex-col items-start gap-3 mt-3 w-full'>
                <h3 className='border-b w-full pb-3'>
                  {language === 'eng' ? 'Specifications' : 'სპეციფიკაციები'}
                </h3>
                <div className='w-full flex flex-col items-start gap-3 border-b pb-3 pr-36 max-2xl:pr-14 max-xl:pr-10 max-lg:pr-0'>
                  {product.brand && (
                    <div className='flex items-center w-full justify-between'>
                      <span className='text-sm text-gray-600'>
                        {language === 'eng' ? 'brand' : 'ბრენდი'}
                      </span>
                      <span className='text-sm font-poppins'>
                        {product.brand}
                      </span>
                    </div>
                  )}
                  {product.model && (
                    <div className='flex items-center w-full justify-between'>
                      <span className='text-sm text-gray-600'>
                        {language === 'eng' ? 'model' : 'მოდელი'}
                      </span>
                      <span className='text-sm font-poppins'>
                        {product.model}
                      </span>
                    </div>
                  )}
                  {product.weight && (
                    <div className='flex items-center w-full justify-between'>
                      <span className='text-sm text-gray-600'>
                        {language === 'eng' ? 'weight' : 'მასა'}
                      </span>
                      <span className='text-sm font-poppins'>
                        {product.weight}
                      </span>
                    </div>
                  )}
                  {product.size && (
                    <div className='flex items-center w-full justify-between'>
                      <span className='text-sm text-gray-600'>
                        {language === 'eng' ? 'size' : 'ზომა'}
                      </span>
                      <span className='text-sm font-poppins'>
                        {product.size}
                      </span>
                    </div>
                  )}
                  {product.material && (
                    <div className='flex items-center w-full justify-between'>
                      <span className='text-sm text-gray-600'>
                        {language === 'eng' ? 'material' : 'მასალა'}
                      </span>
                      <span className='text-sm font-poppins'>
                        {product.material}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <Purchase product={product as ProductType} language={language} />
        </div>
      </div>
    </main>
  )
}

export default Product
