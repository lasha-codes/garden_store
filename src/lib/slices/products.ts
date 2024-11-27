import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/types/globalTypes'
import axios from 'axios'
import { toast } from 'sonner'
import { RootState } from '../store'
import { createSelector } from 'reselect'

export const fetchProducts = createAsyncThunk('products/retrieve', async () => {
  try {
    const { data } = await axios.get('/products/retrieve')
    if (Array.isArray(data.products)) {
      return data.products as Product[]
    } else {
      return []
    }
  } catch (err) {
    console.error('Error fetching products:', err)
  }
})

export const retrieveCartData = createAsyncThunk('cart/retrieve', async () => {
  try {
    const { data } = await axios.post('/products/cart/get', {
      products: JSON.parse(localStorage.getItem('cart') || '[]'),
    })
    if (data.cart) {
      return data.cart
    } else {
      return []
    }
  } catch (err) {
    console.error('Error retrieving cart', err)
  }
})

export const getSlider = createAsyncThunk('slider/get', async () => {
  try {
    const { data } = await axios.get('/products/slider/get')
    if (data.slider) {
      return data.slider
    } else {
      return []
    }
  } catch (err) {
    console.error('Error retrieving the slider data', err)
  }
})

interface CartProduct extends Product {
  qty: number
}

type initialStateType = {
  products: Product[]
  cartOpen: boolean
  cart: { id: string; qty: number }[]
  retrievedCart: CartProduct[]
  cartLoading: 'pending' | 'rejected' | 'fulfilled' | 'validated'
  slider: {
    product: {
      images: string[]
    }
  }[]
}

const initialState: initialStateType = {
  products: [],
  cartOpen: false,
  cart: [],
  retrievedCart: [],
  cartLoading: 'fulfilled',
  slider: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleCart: (state, { payload }: { payload: boolean }) => {
      state.cartOpen = payload
    },
    addToCart: (state, { payload }) => {
      const {
        productId,
        qty,
        maxQty,
      }: { productId: string; qty: number; maxQty: number } = payload
      const alreadyInCart = state.cart.find((product) => {
        return product.id === productId
      })
      if (alreadyInCart) {
        if (alreadyInCart.qty + qty > maxQty) {
          toast.error('პროდუქტის მარაგი შევსებულია.')
        } else {
          alreadyInCart.qty += qty
          const alreadyRetrieved = state.retrievedCart?.find((p) => {
            return p.id === productId
          })
          if (alreadyRetrieved) {
            alreadyRetrieved.qty += qty
          }
        }
      } else {
        state.cart = [...state.cart, { id: productId, qty: qty }]
      }
      state.cartOpen = true
      state.cart = JSON.parse(JSON.stringify(state.cart))
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    assignCart: (state, { payload }) => {
      state.cart = payload
    },
    initializeCart: (state, { payload }) => {
      const { cart } = payload
      state.retrievedCart = cart
    },
    removeFromCart: (state, { payload }) => {
      const { removeId }: { removeId: string } = payload
      const filteredArray = state.cart.filter((product) => {
        return product.id !== removeId
      })
      state.cart = filteredArray
      state.retrievedCart = state.retrievedCart.filter((product) => {
        return product.id !== removeId
      })

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart: (state) => {
      state.cart = []
      state.retrievedCart = []
      localStorage.setItem('cart', '[]')
      toast.success('კალათა გასუფთავებულია.')
    },
    removeProduct: (state, { payload }) => {
      const { removeId } = payload
      state.products = state.products.filter((prod) => {
        return prod.id !== removeId
      })
      toast.success('პროდუქტი წაიშალა')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { payload } = action
        if (Array.isArray(payload)) {
          state.products = payload
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = []
        const { payload } = action
        if (payload) {
          console.error(payload)
        }
      })
      .addCase(retrieveCartData.fulfilled, (state, action) => {
        const { payload } = action
        state.cartLoading = 'validated'
        state.retrievedCart = payload
      })
      .addCase(retrieveCartData.pending, (state) => {
        state.cartLoading = 'pending'
      })
      .addCase(retrieveCartData.rejected, (state) => {
        state.cartLoading = 'rejected'
        state.cart = []
      })
      .addCase(getSlider.fulfilled, (state, action) => {
        const { payload } = action
        state.slider = payload
      })
  },
})

const selectCart = (state: RootState) => state.products.cart
const selectRetrievedCart = (state: RootState) => state.products.retrievedCart

export const selectCartTotals = createSelector(
  [selectCart, selectRetrievedCart],
  (cart, retrievedCart) => {
    let totalCount = 0
    let totalPrice = 0

    cart.forEach((item) => {
      const product = retrievedCart?.find((p) => p.id === item.id)
      if (product) {
        totalCount += item.qty
        totalPrice += product.price * item.qty
      }
    })

    return { totalCount, totalPrice }
  }
)

export default productsSlice.reducer

export const {
  toggleCart,
  addToCart,
  initializeCart,
  removeFromCart,
  assignCart,
  clearCart,
  removeProduct,
} = productsSlice.actions
