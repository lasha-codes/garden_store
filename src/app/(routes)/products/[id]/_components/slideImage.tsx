import Image from 'next/image'

const SlideImage = ({
  index,
  src,
  swiper,
  currentSlide,
}: {
  index: number
  src: string
  swiper: any
  currentSlide: number
}) => {
  const handleSlide = () => {
    if (swiper) {
      swiper.current.swiper.slideTo(index)
    }
  }
  return (
    <div
      onClick={handleSlide}
      className={`relative h-[80px] transition-all border-2 duration-00 ease-linear w-[90px] rounded-[5px] overflow-hidden cursor-pointer group ${
        index === currentSlide ? 'border-main' : 'border-transparent'
      }`}
    >
      <Image
        src={src}
        priority
        fill
        alt='product image'
        className='group-hover:scale-110 transition-all duration-200 ease-linear object-cover'
      />
    </div>
  )
}

export default SlideImage
