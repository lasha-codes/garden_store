'use client'

import { fetchProducts } from '@/lib/slices/products'
import { AppDispatch } from '@/lib/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return <main></main>
}

export default Products
