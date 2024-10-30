import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  language: 'geo' | 'eng'
  menuOpen: boolean
}

const initialState: initialStateType = {
  language: 'geo',
  menuOpen: false,
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
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen
    },
  },
})

export default globalSlice.reducer

export const { toggleLanguage, toggleMenu } = globalSlice.actions
