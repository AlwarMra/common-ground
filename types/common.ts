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

export type Order = {
  userId: string
  stripeCustomerId: string
  checkoutId: string
  products: CartProduct[]
  payment_status: string
}
