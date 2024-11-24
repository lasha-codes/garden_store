import Link from 'next/link'
import logo from '../../../../../../public/logo.png'
import Image from 'next/image'
import Navigation from './navigation'

const Sidebar = () => {
  return (
    <div className='h-screen w-[350px] p-3.5 bg-[#111111] flex flex-col items-start gap-5'>
      <Link
        href='/admin'
        className='flex items-center gap-3 justify-center w-full'
      >
        <h2 className='text-main text-[23px]'>Ingarden</h2>
        <Image src={logo} alt='/logo' width={42} height={42} />
      </Link>
      <Navigation />
    </div>
  )
}

export default Sidebar
