import axios from 'axios'
import { cache } from 'react'

export const getSlider = cache(async () => {
  const { data } = await axios.get('/products/slider/get')
  return data.slider
})
