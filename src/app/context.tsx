'use client'

import { AppDispatch } from '@/lib/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { initializeCart } from '@/lib/slices/products'

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const fetchCart = async () => {
    try {
      const products: { id: string; qty: number }[] = JSON.parse(
        localStorage.getItem('cart')! || '[]'
      )

      const filteredProducts = products.filter((product) => {
        return product.qty && product.id
      })

      const { data } = await axios.post('/products/cart/get', {
        products: filteredProducts,
      })

      if (data.cart) {
        console.log(data.cart)
        dispatch(initializeCart({ cart: data.cart }))
      } else {
        dispatch(initializeCart({ cart: [] }))
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }

  useEffect(() => {
    if (!isClient) {
      setIsClient(true)
    }
    if (isClient) {
      fetchCart()
    }
  }, [isClient])
  return <>{children}</>
}
export default ContextProvider
