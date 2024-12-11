import axios from 'axios'

export const processPayment = async (
  products: { price: number; qty: number; geo_title: string }[],
  metadata: any
) => {
  try {
    const response = await axios.post('/banks/tbc/process/payment', {
      products,
      amount: products.reduce((acc, product) => {
        return acc + product.qty * product.price
      }, 0),
      metadata: metadata,
    })
    console.log(response)
  } catch (error) {
    console.log('error processing payment:', error)
  }
}
