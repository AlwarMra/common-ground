export interface children {
  children: React.ReactNode
}
export enum langs {
  ES = 'es',
  EN = 'en',
  FR = 'fr',
}

export enum database {
  USERS = 'users',
}

//Product
export type Product = {
  id?: string
  es: {
    title: string
    description: string
  }
  en: {
    title: string
    description: string
  }
  price: number
  compared_at_price: number
  stock: number
  ignore_stock: boolean
  images: string[]
}

export interface CartProduct extends Product {
  q: number
}

export type IOrder = {
  userId: string
  stripeCustomerId: string
  checkoutId: string
  products: {
    id: string
    q: number
  }[]
  payment_status: string
  subtotal: number
  total: number
  totalQ: number
  shippingDetails: IShippingDetails
}

export type IShippingDetails = {
  line1: string
  country: string
  state: string
  city: string
  postal_code: string
  line2: string | null
}
