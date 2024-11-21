import { AppDispatch } from '@/lib/store'
import { Product } from '@/types/globalTypes'
import { initializeCart } from '@/lib/slices/products'
import axios from 'axios'

export const finishPurchase = async (
  cart: Product[],
  dispatch: AppDispatch
) => {
  try {
    const { data } = await axios.post('/products/finish/purchase', {
      cart: cart,
    })
    dispatch(initializeCart({ cart: [] }))
    localStorage.setItem('cart', '[]')
  } catch (error: any) {
    console.error(error.message)
  }
}
