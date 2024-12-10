'use client'

import { toggleCart } from '@/lib/slices/products'
import { AppDispatch, RootState } from '@/lib/store'
import { useDispatch, useSelector } from 'react-redux'
import Product from './_components/product'
const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, cartOpen } = useSelector(
    (state: RootState) => state.products
  )

  return (
    <main className='w-full mt-16 min-h-screen'>
      <div
        onClick={() => dispatch(toggleCart(false))}
        className={`fixed w-screen h-screen top-0 left-0 z-[500] bg-black/50 transition-all duration-200 ease-linear ${
          cartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      <div className='w-full grid grid-cols-5 gap-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
        {products.map((product, idx) => {
          return <Product key={idx} product={product} />
        })}
      </div>
    </main>
  )
}

export default Products
