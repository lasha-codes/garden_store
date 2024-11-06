import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/types/globalTypes'
import axios from 'axios'

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

type initialStateType = {
  products: Product[]
  cartOpen: boolean
  cart: { id: string; qty: number }[]
}

const initialState: initialStateType = {
  products: [],
  cartOpen: false,
  cart: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleCart: (state, { payload }: { payload: boolean }) => {
      state.cartOpen = payload
    },
    addToCart: (state, { payload }) => {
      const { productId, qty }: { productId: string; qty: number } = payload
      const alreadyInCart = state.cart.find((product) => {
        return product.id === productId
      })
      if (alreadyInCart) {
        alreadyInCart.qty += qty
      } else {
        state.cart = [...state.cart, { id: productId, qty: qty }]
      }
      state.cart = JSON.parse(JSON.stringify(state.cart))

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    initializeCart: (state, { payload }) => {
      const { cart } = payload
      state.cart = cart
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
  },
})

export default productsSlice.reducer

export const { toggleCart, addToCart, initializeCart } = productsSlice.actions
