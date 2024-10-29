'use client'
import Header from '@/components/header'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='py-6 px-12'>
        <Provider store={store}>
          <Header />
        </Provider>
        {children}
      </body>
    </html>
  )
}
