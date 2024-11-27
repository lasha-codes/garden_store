'use client'
import ClientWrapper from './client_wrapper'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <ClientWrapper>{children}</ClientWrapper>
}

export default Wrapper
