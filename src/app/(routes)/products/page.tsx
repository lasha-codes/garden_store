'use client'

import { fetchProducts, toggleCart } from '@/lib/slices/products'
import { AppDispatch, RootState } from '@/lib/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from './_components/product'
const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, cartOpen } = useSelector(
    (state: RootState) => state.products
  )

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <main className='w-full mt-16'>
      <div
        onClick={() => dispatch(toggleCart(false))}
        className={`fixed w-screen h-screen top-0 left-0 z-[500] bg-black/50 transition-all duration-200 ease-linear ${
          cartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      <div className='w-full flex items-center gap-5 flex-wrap'>
        {products.map((product, idx) => {
          return <Product key={idx} product={product} />
        })}
      </div>
    </main>
  )
}

export default Products
