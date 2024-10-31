'use client'

import { fetchProducts } from '@/lib/slices/products'
import { AppDispatch, RootState } from '@/lib/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from './_components/product'
const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <main className='w-full mt-16'>
      <div className='w-full flex items-center gap-5 flex-wrap'>
        {products.map((product, idx) => {
          return <Product key={idx} product={product} />
        })}
      </div>
    </main>
  )
}

export default Products
