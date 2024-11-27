import { PaymentIntent } from '@stripe/stripe-js'

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

type PaymentProduct = {
  name: string
  price: string
  qty: number
}

export interface StripePayment extends PaymentIntent {
  metadata: {
    address: string
    city: string
    delivery: string
    email: string
    id: string
    lastName: string
    name: string
    payment_method: string
    phone: string
    products: PaymentProduct[]
    shipping_cost: string
    status: string
  }
}
