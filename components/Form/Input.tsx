import { ErrorMessage } from '@hookform/error-message'
import React, { InputHTMLAttributes, HTMLInputTypeAttribute } from 'react'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type: HTMLInputTypeAttribute
  placeholder?: string
  label?: string
  register?: UseFormRegister<FieldValues> // declare register props
  registerProps?: FieldValues
  errors?: Partial<FieldErrorsImpl<any>>
}

const Input = ({
  register,
  name,
  type,
  placeholder,
  label,
  registerProps,
  errors,
  ...rest
}: InputProps) => {
  return (
    <div className='mb-4'>
      <input
        type={type}
        placeholder={placeholder}
        {...register!(name, registerProps)}
        aria-label={label}
        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
        {...rest}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className='text-red-600 text-left mt-4'>{message}</p>
        )}
      />
    </div>
  )
}

export default Input
