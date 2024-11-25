'use client'
import Link from 'next/link'
import { navigation } from '../_data/data'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()
  return (
    <nav className='w-full flex flex-col items-start'>
      {navigation.map((item, idx) => {
        return (
          <Link
            key={idx}
            href={item.href}
            className={`w-full flex items-center group gap-3.5 py-3.5 hover:bg-[#1D1D1D] px-8 transition-all duration-200 ease-linear ${
              pathname === item.href && '!bg-[#1D1D1D]'
            }`}
          >
            {
              <item.icon
                className={`group-hover:text-main transition-all duration-200 ease-linear ${
                  pathname === item.href && '!text-main'
                }`}
                style={{
                  fontSize: item?.size || '24px',
                }}
              />
            }
            <span
              className={`text-[#5E5E5E] text-[15px] group-hover:text-main ${
                pathname === item.href && '!text-main'
              }`}
            >
              {item.name}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export default Navigation
