'use client'

import { AppDispatch } from '@/lib/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { assignCart, retrieveCartData } from '@/lib/slices/products'
import { getSlider } from '@/lib/slices/products'

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getSlider())
  }, [])

  useEffect(() => {
    if (!isClient) {
      setIsClient(true)
    }
    if (isClient) {
      const products: { id: string; qty: number }[] = JSON.parse(
        localStorage.getItem('cart')! || '[]'
      )
      dispatch(retrieveCartData())
      dispatch(assignCart(products))
    }
  }, [isClient])

  return <>{children}</>
}
export default ContextProvider
