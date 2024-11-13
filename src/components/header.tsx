import Link from 'next/link'
import { navigation } from '@/app/data/data'
import { IoSearchOutline } from 'react-icons/io5'
import { FiShoppingBag, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { toggleLanguage, toggleMenu } from '@/lib/slices/global_slice'
import { usePathname } from 'next/navigation'
import { selectCartTotals, toggleCart } from '@/lib/slices/products'

const Header = () => {
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const { language, menuOpen } = useSelector((state: RootState) => state.global)
  const { totalCount } = useSelector(selectCartTotals)
  return (
    <header className='w-full h-full flex items-center justify-between'>
      <Link href='/' className=''>
        <h1 className='text-main font-poppins font-medium text-2xl'>
          Ingarden
        </h1>
      </Link>
      <nav
        className={`${
          language === 'geo' ? 'font-notoSans' : 'font-poppins'
        } flex items-center gap-5 relative max-lg:hidden`}
      >
        {navigation.map((link, idx) => {
          return (
            <Link
              key={idx}
              href={link.path}
              className={`${
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
        <div className='flex items-center gap-4 max-md:hidden'>
          <IoSearchOutline className='text-xl cursor-pointer' />
          <button
            onClick={() => dispatch(toggleCart(true))}
            className='text-lg cursor-pointer relative'
          >
            <FiShoppingBag />
            {totalCount > 0 && (
              <div className='absolute bg-main text-[9px] flex items-center -top-1 -right-1 justify-center text-white font-notoSans w-[15px] h-[15px] rounded-full'>
                <span>{totalCount}</span>
              </div>
            )}
          </button>
          <FiUser className='text-xl cursor-pointer' />
        </div>
      </div>
      <div className='relative hidden max-lg:block'>
        <button
          onClick={() => dispatch(toggleMenu())}
          className={`flex flex-col items-center gap-[4px]`}
        >
          <div
            className={`w-[17px] h-[2px] transition-all duration-300 bg-black rounded-full ${
              menuOpen && 'rotate-[135deg] translate-y-1.5 filter h-[1px]'
            }`}
          />
          <div
            className={`w-[17px] h-[2px] bg-black rounded-full transition-all duration-300 ${
              menuOpen && 'opacity-0'
            }`}
          />
          <div
            className={`w-[17px] h-[2px] bg-black transition-all duration-300 rounded-full ${
              menuOpen && 'rotate-45 -translate-y-[6px] filter h-[1px]'
            }`}
          />
        </button>
        <nav
          className={`absolute ${
            language === 'geo' ? 'font-notoSans' : 'font-poppins'
          } right-[0px] top-8 transition-all duration-300 ease-in-out bg-[#e2e1e1] p-4 rounded-[10px] z-[999] ${
            menuOpen
              ? 'rounded-tr-none opacity-100 pointer-events-auto translate-y-0'
              : 'opacity-0 pointer-events-none translate-y-6'
          }`}
        >
          {navigation.map((link, idx) => {
            return (
              <Link
                key={idx}
                href={link.path}
                className={`${
                  pathname === link.path && 'text-main'
                } hover:text-main transition-all duration-200 ease-linear`}
              >
                <span
                  className={`${
                    language === 'geo'
                      ? 'opacity-100 pointer-events-auto block'
                      : 'opacity-0 pointer-events-none absolute top-0'
                  }`}
                >
                  {link.geo_title}
                </span>
                <span
                  className={`${
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
          <div className='flex items-center gap-4 md:hidden mt-5'>
            <IoSearchOutline className='text-xl' />
            <FiShoppingBag className='text-lg' />
            <FiUser className='text-xl' />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
