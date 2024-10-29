import Link from 'next/link'
import { navigation } from '@/app/data/data'
import { IoSearchOutline } from 'react-icons/io5'
import { FiShoppingBag, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { toggleLanguage } from '@/lib/slices/global_slice'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const { language } = useSelector((state: RootState) => state.global)
  return (
    <header className='w-full h-full flex items-center justify-between'>
      <Link href='/' className=''>
        <h1 className='text-main font-poppins font-medium text-2xl'>
          Ingarden
        </h1>
      </Link>
      <nav className='flex items-center gap-5 relative'>
        {navigation.map((link, idx) => {
          return (
            <Link
              key={idx}
              href={link.path}
              className={`font-notoSans ${
                pathname === link.path && 'text-main'
              } hover:text-main transition-all duration-200 ease-linear`}
            >
              <span
                className={`transition-all duration-300 ease-linear ${
                  language === 'geo'
                    ? 'opacity-100 pointer-events-auto block'
                    : 'opacity-0 pointer-events-none absolute top-0'
                }`}
              >
                {link.geo_title}
              </span>
              <span
                className={`transition-all duration-300 ease-linear ${
                  language === 'eng'
                    ? 'opacity-100 pointer-events-auto block'
                    : 'opacity-0 pointer-events-none absolute top-0'
                }`}
              >
                {link.eng_title}
              </span>
            </Link>
          )
        })}
      </nav>
      <div className='flex items-center gap-10'>
        <button
          onClick={() => dispatch(toggleLanguage())}
          className='flex items-center relative w-[85px] h-[25px] px-1 overflow-hidden rounded-[7px] bg-black/10'
        >
          <div
            className={`w-1/2 absolute right-0 top-0 h-full bg-main/60 ${
              language === 'geo' ? 'translate-x-0' : '-translate-x-[42px]'
            } -z-10 transition-all duration-300 ease-out`}
          />
          <div
            className={`w-full text-sm font-poppins transition-all duration-200 ${
              language === 'eng' && 'text-white'
            }`}
          >
            ENG
          </div>
          <div
            className={`w-full text-sm font-notoSans transition-all duration-200 ${
              language === 'geo' && 'text-white'
            }`}
          >
            ქარ
          </div>
        </button>
        <div className='flex items-center gap-4'>
          <IoSearchOutline className='text-xl' />
          <FiShoppingBag className='text-lg' />
          <FiUser className='text-xl' />
        </div>
      </div>
    </header>
  )
}

export default Header
