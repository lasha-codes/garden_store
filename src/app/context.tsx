'use client'

import { AppDispatch } from '@/lib/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  assignCart,
  fetchProducts,
  retrieveCartData,
  getSlider,
} from '@/lib/slices/products'

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getSlider())
    dispatch(fetchProducts())

    const cart = (() => {
      try {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
        return []
      }
    })()
    dispatch(retrieveCartData())
    dispatch(assignCart(cart))
  }, [dispatch])

  return <>{children}</>
}

export default ContextProvider
