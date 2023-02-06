import { HTMLInputTypeAttribute } from 'react'

export interface InputProps {
  type: HTMLInputTypeAttribute
  name: string
  label?: string
  placeholder?: string
}
export interface InputNumberProps extends Omit<InputProps, 'type'> {
  currency?: boolean
}
export interface InputCheckboxProps extends Omit<InputProps, 'type'> {
  text: string
}

export interface textAreaProps {
  name: string
  placeholder: string
  label?: string
}

export interface Product {
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
