'use client'
import Header from '@/components/header'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import axios from 'axios'
import Cart from '@/components/cart'
import ContextProvider from './context'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT
axios.defaults.withCredentials = true

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='py-6 px-12 relative'>
        <Provider store={store}>
          <ClerkProvider>
            <ContextProvider>
              <Header />
              {children}
              <Cart />
            </ContextProvider>
          </ClerkProvider>
          <Toaster position='top-right' className='font-notoSans' richColors />
        </Provider>
      </body>
    </html>
  )
}
