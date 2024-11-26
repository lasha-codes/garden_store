import axios from 'axios'

export const getProductById = async (id: string) => {
  try {
    const { data } = await axios.get(`/products/get/${id}`)
    return data.product
  } catch (error) {
    console.error('error retrieving the product:', error)
  }
}
