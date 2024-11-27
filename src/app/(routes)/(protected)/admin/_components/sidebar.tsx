import Link from 'next/link'
import logo from '../../../../../../public/logo.png'
import Image from 'next/image'
import Navigation from './navigation'

const Sidebar = () => {
  return (
    <div className='h-full bg-white min-w-[280px] max-w-[280px]'>
      <div className='h-screen max-w-[280px] min-w-[280px] fixed bg-[#111111] flex flex-col items-start gap-5 py-[19px]'>
        <Link
          href='/admin'
          className='flex items-center gap-3 justify-center w-full'
        >
          <h2 className='text-main text-[23px]'>Ingarden</h2>
          <Image src={logo} alt='/logo' width={42} height={42} />
        </Link>
        <span className='px-7 text-[#5E5E5E] text-[15px]'>
          სამართავი ფუნქციები
        </span>
        <Navigation />
      </div>
    </div>
  )
}

export default Sidebar
