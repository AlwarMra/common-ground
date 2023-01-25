import React from 'react'

const Label = ({ text }: { text: string }) => {
  return (
    <label htmlFor={text} className='ml-2 font-bold'>
      {text}
    </label>
  )
}

export default Label
