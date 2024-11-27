'use client'
import { RootState } from '@/lib/store'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import ProductCard from '../../_components/product_card'
import { CiSearch } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import { Product } from '@/types/globalTypes'

const Products = () => {
  const { products } = useSelector((state: RootState) => state.products)
  const [productsCopy, setProductsCopy] = useState<Product[]>([])

  const filterProducts = (value: string) => {
    if (!value) {
      return setProductsCopy(products)
    }
    const filteredProducts = products.filter((product) => {
      return (
        product.geo_title.toLowerCase().includes(value.toLowerCase()) ||
        product.eng_title.toLowerCase().includes(value.toLowerCase())
      )
    })
    setProductsCopy(filteredProducts)
  }

  useEffect(() => {
    if (products) {
      setProductsCopy(products)
    }
  }, [products])

  return (
    <main className='w-full flex flex-col items-start gap-8'>
      <div className='w-full flex items-center justify-between'>
        <h2 className='text-xl text-white'>პროდუქცია</h2>
        <Link
          href='/admin/products/upload'
          className='bg-main px-10 py-3 font-semibold text-sm text-white rounded-[10px] hover:bg-main/90 transition-all duration-200 ease-linear'
        >
          დამატება
        </Link>
      </div>
      <div className='w-full flex flex-col items-start gap-3 bg-[#111111] rounded-[10px] p-5 max-h-[78vh] overflow-auto'>
        <div className='w-full flex items-center bg-transparent border border-[#575757] rounded-[10px] pl-5 min-h-[52px] max-h-[52px]'>
          <CiSearch className='text-xl text-[#575757]' />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              filterProducts(e.target.value)
            }}
            placeholder='მოძებნე პროდუქტი'
            className='w-full h-[52px] bg-transparent outline-none text-[#575757] placeholder:text-[#575757] text-sm [15px] font-semibold px-2'
          />
        </div>
        {productsCopy.map((product, idx) => {
          return <ProductCard key={idx} product={product} />
        })}
      </div>
    </main>
  )
}

export default Products
