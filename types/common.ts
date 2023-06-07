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
export interface Product {
  id?: string
  es: {
    title_es: string
    description_es: string
  }
  en: {
    title_en: string
    description_en: string
  }
  price: number
  compared_at_price: number
  stock: number
  ignore_stock: boolean
  images: string[]
}
