import Link from 'next/link'
import React from 'react'
interface children {
  icon: JSX.Element
  link: string
  title: string
}

const SidebarItem = ({ icon, link, title }: children) => {
  return (
    <li>
      <Link
        href={link}
        className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
      >
        <span className='inline-flex justify-center items-center ml-4'>
          {icon}
        </span>
        <span className='ml-2 text-sm tracking-wide truncate'>{title}</span>
      </Link>
    </li>
  )
}

export default SidebarItem
