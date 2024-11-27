import axios from 'axios'

export const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) {
    return text
  } else {
    return text.slice(0, trimBy) + '...'
  }
}

export const fetchProductsSEO = async (baseUrl: string) => {
  const response = await axios.get(`${baseUrl}/products/retrieve`)

  return response.data.products
}
