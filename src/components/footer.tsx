import { socials } from '@/app/data/data'

const Footer = () => {
  const title = process.env.NEXT_PUBLIC_TITLE
  return (
    <footer className='w-full z-[999] mt-12 flex items-center justify-between bg-main p-2 h-[75px]'>
      <div></div>
      <div>
        ©2024 <span>{title}</span>{' '}
      </div>
    </footer>
  )
}
export default Footer
