import Link from 'next/link'
import { navigation } from '@/app/data/data'
import { IoSearchOutline } from 'react-icons/io5'
import { FiShoppingBag, FiUser } from 'react-icons/fi'

const Header = () => {
  return (
    <header className='w-full h-full flex items-center justify-between'>
      <Link href='/' className=''>
        <h1 className='text-main font-poppins font-medium text-2xl'>
          Ingarden
        </h1>
      </Link>
      <nav className='flex items-center gap-5'>
        {navigation.map((link, idx) => {
          return (
            <Link
              key={idx}
              href={link.path}
              className='font-notoSans hover:text-main transition-all duration-200 ease-linear'
            >
              {link.geo_title}
            </Link>
          )
        })}
      </nav>
      <div className='flex items-center gap-4'>
        <IoSearchOutline className='text-xl' />
        <FiShoppingBag className='text-lg' />
        <FiUser className='text-xl' />
      </div>
    </header>
  )
}

export default Header
