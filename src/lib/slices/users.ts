import { createSlice } from '@reduxjs/toolkit'
import { User } from '@clerk/nextjs/server'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const retrieveUsers = createAsyncThunk('/users/get', async () => {
  try {
    const { data } = await axios.get('/users/retrieve')
    if (data.users) {
      return data.users.data
    } else {
      return []
    }
  } catch (err) {
    console.error('error retrieving users:', err)
  }
})

type initialStateType = {
  users: User[]
  usersLoading: boolean
}

const initialState: initialStateType = {
  users: [],
  usersLoading: false,
}

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveUsers.pending, (state, action) => {
      state.usersLoading = true
    }),
      builder.addCase(retrieveUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.usersLoading = false
      })
    builder.addCase(retrieveUsers.rejected, (state, action) => {
      ;(state.users = []), (state.usersLoading = false)
    })
  },
})

export default usersSlice.reducer
