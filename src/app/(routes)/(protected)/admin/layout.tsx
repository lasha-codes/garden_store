'use client'

import { useEffect } from 'react'
import Header from './_components/header'
import Sidebar from './_components/sidebar'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { retrieveUsers } from '@/lib/slices/users'
import { retrievePayments } from '@/lib/slices/payments'
import ProtectAdmin from './protectAdmin'

const AdminLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(retrieveUsers())
    dispatch(retrievePayments() as any)
  }, [])

  return (
    <ProtectAdmin>
      <main className='w-full min-h-screen bg-[#1D1D1D] flex items-start font-notoSans'>
        <Sidebar />
        <div className='h-full flex flex-col items-center w-full'>
          <Header />
          <div className='p-5 w-full h-full'>{children}</div>
        </div>
      </main>
    </ProtectAdmin>
  )
}

export default AdminLayout
