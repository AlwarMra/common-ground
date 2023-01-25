import { HTMLInputTypeAttribute } from 'react'

export interface InputProps {
  type: HTMLInputTypeAttribute
  name: string
  label?: string
  placeholder: string
  onChange: any
  value: string | number
}
