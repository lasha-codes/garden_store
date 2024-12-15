import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

const Loader = ({ title }: { title: string }) => {
  return (
    <div className='w-full flex flex-col items-center gap-3.5 font-notoSans h-screen mt-10'>
      <ImSpinner2 className='text-2xl text-main animate-spin' />
      <h4 className='text-zinc-700'>{title}</h4>
    </div>
  )
}

export default Loader
