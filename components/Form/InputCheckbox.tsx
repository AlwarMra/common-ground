import React from 'react'
import { useField } from 'formik'
import { InputCheckboxProps } from 'types/dashboard'

const Input = ({ label, ...props }: InputCheckboxProps) => {
  const [field, meta] = useField(props)
  return (
    <div className='mb-4 flex gap-2'>
      <input
        {...field}
        {...props}
        type='checkbox'
        className='form-control block w-5 h-5 ml-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
      />
      <span>{props.text}</span>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default Input
