import { SignUp } from '@clerk/nextjs'

const page = () => {
  return (
    <main className='w-full h-[91vh] flex items-center justify-center'>
      <SignUp />
    </main>
  )
}

export default page
