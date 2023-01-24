import React from 'react'

interface submitButton {
  text: string
}

const SubmitButton = ({ text }: submitButton) => {
  return (
    <button
      className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
      type='submit'
      style={{
        background: 'linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)',
      }}
    >
      {text}
    </button>
  )
}

export default SubmitButton
