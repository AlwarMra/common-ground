import { HTMLInputTypeAttribute } from 'react'
import { FormikHelpers } from 'formik'
import { Product } from './common'

// Inputs
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

export interface ProductFormProps {
  initialValues: Product
  submitProduct: (
    values: Product,
    action: FormikHelpers<Product>,
    actionType: 'add' | 'update',
  ) => void
  error: string | null
  removeNewFile: (file: File | string) => void
  actionType: 'add' | 'update'
  newFiles: {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  }
  currentFiles?: {
    files: string[]
    setFiles: React.Dispatch<React.SetStateAction<string[]>>
  }
  openModal: React.Dispatch<React.SetStateAction<boolean>>
}
