'use client'

import { usePathname } from 'next/navigation'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPath = pathname.toLowerCase().includes('/admin')

  return (
    <div className={`py-6 px-12 relative ${isAdminPath && '!p-0'}`}>
      {children}
    </div>
  )
}
