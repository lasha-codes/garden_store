import { StripePayment } from '@/types/globalTypes'
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const retrievePayments = createAsyncThunk(
  'payments/retrieve',
  async () => {
    try {
      const { data } = await axios.get('/stripe/retrieve/payments')
      return data.payments.data
    } catch (error) {
      console.error('failed retrieving payments:', error)
    }
  }
)

type initialStateType = {
  payments: StripePayment[]
  paidPayments: StripePayment[]
  unpaidPayments: StripePayment[]
}

const initialState: initialStateType = {
  payments: [],
  paidPayments: [],
  unpaidPayments: [],
}

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: initialState,
  reducers: {
    assignPayments: (state, { payload }) => {
      state.payments = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrievePayments.fulfilled, (state, action) => {
      const { payload } = action
      state.payments = payload
      const filterUnpaid = payload.filter((payment: StripePayment) => {
        return (
          payment.metadata?.status === 'pending🕒' ||
          payment.status === 'requires_payment_method' ||
          payment.status === 'canceled'
        )
      })
      const filterPaid = payload.filter((payment: StripePayment) => {
        return (
          payment.metadata?.status === 'complete✅' ||
          payment.status === 'succeeded'
        )
      })
      state.unpaidPayments = filterUnpaid
      state.paidPayments = filterPaid
    })
  },
})

export default paymentsSlice.reducer

export const { assignPayments } = paymentsSlice.actions
