import React from 'react'
import { Spinner } from 'components/Icons'

interface submitButton {
  text: string
  disabled?: boolean
}

const SubmitButton = ({ text, disabled = false }: submitButton) => {
  return (
    <button
      disabled={disabled}
      className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
      type='submit'
      style={{
        background: 'linear-gradient(to right,#bae6fd,#93c5fd,#5eead4,#6ee7b7)',
        // background: 'linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)',
      }}
    >
      {disabled ? <Spinner /> : text}
    </button>
  )
}

export default SubmitButton
