import Header from '@/components/header'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='py-6 px-12'>
        <Header />
        {children}
      </body>
    </html>
  )
}
