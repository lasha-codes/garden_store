import { AppDispatch } from '@/lib/store'
import { Product } from '@/types/globalTypes'
import { initializeCart } from '@/lib/slices/products'
import axios from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

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
