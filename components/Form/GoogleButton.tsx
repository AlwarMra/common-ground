import React from 'react'
import { GoogleIcon } from 'components/Icons'

interface googleBtnProps {
  text: string
  cb: any
}

const GoogleButton = ({ text, cb }: googleBtnProps) => {
  return (
    <button
      type='button'
      onClick={cb}
      className='px-6 py-2.5 mb-3 w-full flex items-center gap-4 uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg'
    >
      <GoogleIcon /> {text}
    </button>
  )
}

export default GoogleButton
