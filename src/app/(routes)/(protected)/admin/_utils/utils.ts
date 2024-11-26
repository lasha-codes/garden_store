import { Product } from '@/types/globalTypes'
import axios from 'axios'
import { toast } from 'sonner'

export const getProductById = async (id: string) => {
  try {
    const { data } = await axios.get(`/products/get/${id}`)
    return data.product as Product
  } catch (error) {
    console.error('error retrieving the product:', error)
  }
}

export const updateProduct = async (product: Product, productId: string) => {
  try {
    const { data } = await axios.put('/products/update', {
      data: product,
      productId: productId,
    })
    if (data.updatedProduct) {
      toast.success('პროდუქტი განახლებულია')
      return { success: true }
    } else {
      toast.error('დაფიქსირდა ხარვეზი')
      return { success: false }
    }
  } catch (error: any) {
    toast.error(error.message)
  }
}
