import { isNaN, useField } from 'formik'
import React, { useCallback } from 'react'
import { InputNumberProps } from '../../types/dashboard'
import Label from './Label'

const InputNumber = ({
  label,
  currency = false,
  ...props
}: InputNumberProps) => {
  const [field, meta, helpers] = useField(props)

  const checkInputNumber = useCallback((val: string) => {
    if (val === '' || val === undefined) return ''
    const v = val.replace(',', '.')
    if (Number(v) < 0 || isNaN(Number(v)) || Number(v) === 0) {
      return 0
    }
    return val
  }, [])

  return (
    <div className='mb-4 flex-grow relative'>
      {label && <Label text={label} name={props.name} />}
      <input
        type='number'
        min={0}
        step={0.01}
        {...field}
        {...props}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          helpers.setValue(checkInputNumber(e.currentTarget.value))
        }}
        className='form-control block w-full px-3 py-1.5 pl-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
      />
      {currency && (
        <span className='absolute top-2/4 left-2 text-gray-400'>€</span>
      )}
      {meta.touched && meta.error ? (
        <div className='error absolute'>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default InputNumber
