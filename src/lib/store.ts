import { configureStore } from '@reduxjs/toolkit'
import globalSlice from './slices/global_slice'
import productsSlice from './slices/products'

export const store = configureStore({
  reducer: {
    global: globalSlice,
    products: productsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
