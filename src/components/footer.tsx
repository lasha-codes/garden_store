import { socials } from '@/app/data/data'
import Link from 'next/link'
import { MdOutlineAttachEmail } from 'react-icons/md'

const Footer = () => {
  const title = process.env.NEXT_PUBLIC_TITLE
  const supportEmail = 'lashagiorgi420@gmail.com'
  return (
    <footer className='w-full z-[999] font-poppins mt-12 flex items-center px-5 justify-between bg-main p-2 h-[80px] max-md:h-[120px] max-md:items-end'>
      <div className='flex items-end gap-5 max-md:flex-col max-md:items-start'>
        <div className='flex flex-col items-start gap-2 text-white max-lg:text-[15px]'>
          <span>Viber: +995596410041</span>
          <span>WhatsApp: +995577400041</span>
        </div>
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
                {<social.icon className='text-3xl text-white max-lg:text-xl' />}
              </Link>
            )
          })}
        </div>
      </div>
      <div className='flex items-center gap-2 text-xl text-[#FFFFFF] max-md:text-[17px]'>
        <span>© 2024</span>
        <span>{title}</span>
      </div>
    </footer>
  )
}
export default Footer
