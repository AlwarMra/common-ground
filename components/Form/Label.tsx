import React from 'react'

const Label = ({ text, name }: { text: string; name: string }) => {
  return (
    <label htmlFor={name} className='ml-2 font-bold relative bottom-1'>
      {text}
    </label>
  )
}

export default Label
