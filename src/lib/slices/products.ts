import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/types/globalTypes'
import axios from 'axios'
import { RootState } from '../store'

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

export const retrieveCartData = createAsyncThunk(
  'cart/retrieve',
  async (_, { getState }) => {
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
  }
)

interface CartProduct extends Product {
  qty: number
}

type initialStateType = {
  products: Product[]
  cartOpen: boolean
  cart: { id: string; qty: number }[]
  retrievedCart: CartProduct[]
  cartLoading: 'pending' | 'rejected' | 'fulfilled'
}

const initialState: initialStateType = {
  products: [],
  cartOpen: false,
  cart: [],
  retrievedCart: [],
  cartLoading: 'fulfilled',
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
        const alreadyRetrieved = state.retrievedCart?.find((p) => {
          return p.id === productId
        })
        if (alreadyRetrieved) {
          alreadyRetrieved.qty += qty
        }
      } else {
        state.cart = [...state.cart, { id: productId, qty: qty }]
      }
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
        state.retrievedCart = payload
        state.cartLoading = 'fulfilled'
        state.cartOpen = true
      })
      .addCase(retrieveCartData.pending, (state) => {
        state.cartLoading = 'pending'
      })
      .addCase(retrieveCartData.rejected, (state) => {
        state.cartLoading = 'rejected'
        state.cart = []
      })
  },
})

export default productsSlice.reducer

export const {
  toggleCart,
  addToCart,
  initializeCart,
  removeFromCart,
  assignCart,
} = productsSlice.actions
