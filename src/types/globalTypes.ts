export type Product = {
  id?: string
  PDF?: string | null
  youtubeURL?: string | null
  images: string[]
  geo_title: string
  eng_title: string
  geo_description: string
  eng_description: string
  price: number
  currency?: 'dollar' | 'lari' | 'euro'
  color?: string | null
  qty: number
  size?: string
  brand?: string
  model?: string
  material?: string
  weight?: string
  createdAt?: number
  updatedAt?: number
}
