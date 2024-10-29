import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  language: 'geo' | 'eng'
}

const initialState: initialStateType = {
  language: 'geo',
}

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    toggleLanguage: (state) => {
      if (state.language === 'eng') {
        state.language = 'geo'
      } else {
        state.language = 'eng'
      }
    },
  },
})

export default globalSlice.reducer

export const { toggleLanguage } = globalSlice.actions
