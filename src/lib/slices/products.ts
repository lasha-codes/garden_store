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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { payload } = action
        if (Array.isArray(payload)) {
          state.products = payload
          console.log(state.products)
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

export const { toggleCart } = productsSlice.actions
