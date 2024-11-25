'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import ProductCard from './product_card'

const NewProducts = () => {
  const { products } = useSelector((state: RootState) => state.products)
  return (
    <section className='w-full flex flex-col items-start gap-5'>
      <h3 className='text-[#FFFFFF] text-xl'>ახალი დამატებული</h3>
      <div className='w-full bg-[#111111] rounded-[10px] flex flex-col items-start p-3 gap-3'>
        {products.length > 0 &&
          products
            .slice(0, 4)
            .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
            .map((product, idx) => {
              return <ProductCard product={product} key={idx} />
            })}
      </div>
    </section>
  )
}

export default NewProducts
