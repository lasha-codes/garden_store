import axios from 'axios'
import { AppDispatch } from '@/lib/store'
import { Product } from '@/types/globalTypes'
import { initializeCart } from '@/lib/slices/products'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { removeProduct } from '@/lib/slices/products'
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

export const removeProductById = async (
  removeId: string,
  dispatch: AppDispatch
) => {
  try {
    const { data } = await axios.delete(`/products/delete/${removeId}`)
    if (data.deletedProduct) {
      dispatch(removeProduct({ removeId: removeId }))
    }
  } catch (err) {
    console.error('error removing product:', err)
  }
}

export const getSlider = async () => {
  const { data } = await axios.get('/products/slider/get')
  return data.slider
}

export const fetchProductsSEO = async (baseUrl: string) => {
  const response = await axios.get(`${baseUrl}/products/retrieve`)

  return response.data.products
}

export const finishPurchase = async (
  cart: Product[],
  dispatch: AppDispatch
) => {
  try {
    await axios.post('/products/finish/purchase', {
      cart: cart,
    })
    dispatch(initializeCart({ cart: [] }))
    localStorage.setItem('cart', '[]')
  } catch (error: any) {
    console.error(error.message)
  }
}

export const validateCheckoutRoute = (
  router: AppRouterInstance,
  cartLoading: 'fulfilled' | 'pending' | 'rejected' | 'validated',
  cart: Product[]
) => {
  console.log('Cart Loading:', cartLoading)
  console.log('Cart Length:', cart.length)

  if (cartLoading === 'pending') return
  if (cartLoading === 'rejected') {
    router.replace('/')
  } else if (cartLoading === 'validated' && cart.length === 0) {
    router.replace('/')
  }
}
