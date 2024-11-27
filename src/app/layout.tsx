'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/header'
const Cart = dynamic(() => import('@/components/cart'))
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import axios from 'axios'
import ContextProvider from './context'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import ClientWrapper from './client_wrapper'
import ServerWrapper from './server_wrapper'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT
axios.defaults.withCredentials = true

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <ServerWrapper>
        <body suppressHydrationWarning>
          <ClientWrapper>
            <Provider store={store}>
              <ContextProvider>
                <ClerkProvider>
                  <Header />
                  {children}
                  <Cart />
                </ClerkProvider>
                <Toaster
                  position='top-right'
                  className='font-notoSans'
                  richColors
                />
              </ContextProvider>
            </Provider>
          </ClientWrapper>
        </body>
      </ServerWrapper>
    </html>
  )
}
