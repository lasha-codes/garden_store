import { SignIn } from '@clerk/nextjs'

const Login = () => {
  return (
    <main className='w-full h-[91vh] flex items-center justify-center'>
      <SignIn />
    </main>
  )
}

export default Login
