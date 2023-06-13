import React from 'react'

const AddIcon = ({ size = 30 }) => {
  return (
    <svg
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 64 64'
      xmlns='http://www.w3.org/2000/svg'
      fill='#ffffff'
      stroke='#000000'
      className='group  cursor-pointer'
    >
      <circle
        cx='32'
        cy='32'
        r='24'
        className='group-hover:fill-cyan-100 group-hover:bg-cyan-200 transition ease-in-out duration-300'
      />
      <line x1='20' y1='32' x2='44' y2='32' />
      <line x1='32' y1='20' x2='32' y2='44' />
    </svg>
  )
}

export default AddIcon
