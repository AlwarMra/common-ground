import React from 'react'
import { InputProps } from '../../types/dashboard'
import Label from './Label'

const Input = ({
  type,
  placeholder,
  label,
  name,
  onChange,
  value,
}: InputProps) => {
  return (
    <div className='mb-4'>
      {label && <Label text={label} />}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
      />
    </div>
  )
}

export default Input
