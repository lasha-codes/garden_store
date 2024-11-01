export type Product = {
  id: string
  images: string[]
  geo_title: string
  eng_title: string
  geo_description: string
  eng_description: string
  price: number
  currency: 'dollar' | 'lari' | 'euro'
  color: string | null
  qty: number
}
