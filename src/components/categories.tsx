import { categories } from '@/app/data/data'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

const Categories = () => {
  const { language } = useSelector((state: RootState) => state.global)

  return (
    <section className='w-full grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1 gap-10'>
      {categories.map((category, idx) => {
        return (
          <div
            key={idx}
            className='relative w-full h-[170px] bg-[#dbd8d8a8] flex items-center gap-5 px-6 group'
          >
            <div className='w-1/2  h-[250px]'>
              <div className='w-full h-full absolute z-[999] -top-20 left-0 group-hover:-translate-y-4 transition-all duration-300'>
                <Image
                  priority
                  src={category.image}
                  className={`object-contain absolute w-[170px] h-[200px] ${
                    category.eng_title === 'Trending Now' &&
                    '!w-[300px] !h-[250px] -left-16'
                  }`}
                  alt='category image'
                />
              </div>
            </div>
            <div
              className={`flex ${
                language === 'geo' ? 'font-notoSans' : 'font-poppins'
              } flex-col items-start gap-2.5 justify-start w-[52%] lg:w-full pr-2`}
            >
              <span className='text-sm text-gray-700 max-md:text-[13px]'>
                {language === 'geo' ? category.geo_title : category.eng_title}
              </span>
              <p className='font-medium text-[22px] max-lg:text-[21px] max-md:text-[20px] max-w-[150px] whitespace-normal'>
                {language === 'geo'
                  ? category.geo_description
                  : category.eng_description}
              </p>
              <button className='text-[15px] max-md:text-sm text-[#156d15] border-b font-medium border-[#156d15] pb-[1px] font-poppins'>
                SHOP NOW
              </button>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Categories
