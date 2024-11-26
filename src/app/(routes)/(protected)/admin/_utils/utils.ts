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

export const uploadProduct = async (products: Product) => {
  const { data } = await axios.post('/products/upload', products)
  if (data.message) {
    toast.success('პროდუქტი განახლებულია')
    return { success: true }
  } else {
    toast.error('დაფიქსირდა ხარვეზი')
    return { success: false }
  }
}

export const uploadFile = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<string>> | null,
  setImages: React.Dispatch<React.SetStateAction<string[]>> | null
) => {
  const formData = new FormData()
  formData.append('file', e.target?.files && (e.target.files[0] as any))
  axios
    .post('/files/upload', formData)
    .then((response) => {
      if (setFile) {
        setFile(response.data.image_path)
      } else {
        setImages!((prev) => {
          return [...prev, response.data.image_path]
        })
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
}
