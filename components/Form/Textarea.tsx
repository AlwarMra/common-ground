import React from 'react'
import { useField } from 'formik'
import { textAreaProps } from 'types/dashboard'
import Label from 'components/Form//Label'

const Textarea = ({ label, ...props }: textAreaProps) => {
  const [field, meta] = useField(props)
  return (
    <div className='mb-4'>
      {label && <Label text={label} name={props.name} />}
      <textarea
        rows={10}
        cols={40}
        {...field}
        {...props}
        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default Textarea
