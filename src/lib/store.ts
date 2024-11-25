import { configureStore } from '@reduxjs/toolkit'
import globalSlice from './slices/global_slice'
import productsSlice from './slices/products'
import usersSlice from './slices/users'

export const store = configureStore({
  reducer: {
    global: globalSlice,
    products: productsSlice,
    users: usersSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
