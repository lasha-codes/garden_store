import axios from 'axios'

export const retrievePaymentIntent = async (paymentIntentId: string) => {
  try {
    if (!paymentIntentId) return
    const { data } = await axios.get(`/stripe/paymentIntent/${paymentIntentId}`)
    if (data.paymentIntent) {
      return data.paymentIntent
    } else {
      return null
    }
  } catch (error) {
    console.error('Error retrieving the payment:', error)
  }
}
