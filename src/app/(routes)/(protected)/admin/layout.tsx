'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Header from './_components/header'
import Sidebar from './_components/sidebar'

const AdminLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const router: AppRouterInstance = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      const role: 'admin' | unknown = user?.publicMetadata?.role
      if (role !== 'admin') {
        router.replace('/')
      }
    }
  }, [user, router])

  return (
    <main className='w-full min-h-screen bg-[#1D1D1D] flex items-start'>
      <Sidebar />
      <div className='h-full flex flex-col items-center w-full'>
        <Header />
        <div className='p-5 w-full h-full'>{children}</div>
      </div>
    </main>
  )
}

export default AdminLayout
