import { useUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'

const ProtectAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser()
  const role = user?.publicMetadata.role

  if (isLoaded) {
    if (!user) {
      return notFound()
    } else if (!role || role !== 'admin') {
      return notFound()
    }
  }

  if (isLoaded) {
    return <>{role === 'admin' && children}</>
  }
}

export default ProtectAdmin
