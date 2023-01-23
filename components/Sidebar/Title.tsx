import React from 'react'

const Title = ({ title }: { title: string }) => {
  return (
    <li className='px-5'>
      <div className='flex flex-row items-center h-8'>
        <div className='text-sm font-light tracking-wide text-gray-500'>
          {title}
        </div>
      </div>
    </li>
  )
}

export default Title
