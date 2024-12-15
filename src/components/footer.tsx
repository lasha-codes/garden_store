'use client'

import { socials } from '@/app/data/data'
import Link from 'next/link'
import { MdOutlineAttachEmail } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { IoArrowUp } from 'react-icons/io5'

const Footer = () => {
  const pathname = usePathname()
  const supportEmail = 'gardentools.contact@gmail.com'
  const title = process.env.NEXT_PUBLIC_TITLE
  if (!pathname.includes('/admin')) {
    return (
      <footer className='w-full z-[999] relative font-poppins mt-12 flex end px-5 justify-between bg-main p-2 h-[80px] max-md:h-[120px] max-md:items-end'>
        <div className='flex items-end gap-5 max-md:flex-col max-md:items-start'>
          <div className='flex flex-col items-start gap-2 text-white max-lg:text-[15px]'>
            <span className='max-md:text-sm'>Viber: +995596410041</span>
            <span className='max-md:text-sm whitespace-nowrap'>
              WhatsApp: +995577400041
            </span>
          </div>
          <IoArrowUp
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }}
            className='cursor-pointer absolute top-4 right-3 z-[10] text-xl text-white animate-bounce'
          />
          <Link
            href={`mailto:${supportEmail}`}
            className='flex items-center gap-2 text-[#050556] underline'
          >
            <MdOutlineAttachEmail className='text-lg max-lg:text-2xl' />
            <span className='max-lg:hidden'>{supportEmail}</span>
          </Link>
          <div className='flex items-center gap-5 max-lg:gap-4 max-md:gap-3 ml-10 max-md:hidden'>
            {socials.map((social, idx) => {
              return (
                <Link key={idx} href={social.link} target='_blank'>
                  {
                    <social.icon className='text-3xl text-white max-lg:text-xl' />
                  }
                </Link>
              )
            })}
          </div>
        </div>
        <div className='flex items-end gap-2 text-xl text-[#FFFFFF] max-md:text-[17px] max-md:-translate-x-3'>
          <span className='whitespace-nowrap'>© 2024</span>
          <span>{title}</span>
        </div>
      </footer>
    )
  }
}
export default Footer
