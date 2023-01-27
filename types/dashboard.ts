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
