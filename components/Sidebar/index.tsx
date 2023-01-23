import React from 'react'
import SidebarItem from './SidebarItem'
import Title from './Title'

interface children {
  children: React.ReactNode
}

const Sidebar = ({ children }: children) => {
  return (
    <div className='antialiased bg-gray-50 text-gray-800'>
      <div className='sticky top-0 left-0 flex flex-col w-64 bg-white border-r'>
        <div className='overflow-y-auto overflow-x-hidden flex-grow'>
          <ul className='flex flex-col py-4 space-y-1'>{children}</ul>
        </div>
      </div>
    </div>
  )
}
Sidebar.Title = Title
Sidebar.Item = SidebarItem

export default Sidebar
