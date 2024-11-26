'use client'
import { Product } from '@/types/globalTypes'
import { useState, useEffect } from 'react'
import { getProductById } from '../../../../_utils/utils'
import { useParams, useRouter } from 'next/navigation'
import Form from '../../../../_components/shared/product_form'

const Update = () => {
  const router = useRouter()
  const params: { id: string } = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (params.id) {
      getProductById(params.id).then((prod) => {
        if (prod) {
          setProduct(prod)
        } else {
          router.replace('/admin')
        }
      })
    }
  }, [params])

  console.log(product)

  return (
    <main className='w-full flex flex-col items-start gap-5'>
      <h2 className='text-xl text-white'>პროდუქტის განახლება</h2>
      <Form product={product as Product} type='update' />
    </main>
  )
}

export default Update
