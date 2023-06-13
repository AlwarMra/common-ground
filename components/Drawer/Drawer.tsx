import React from 'react'

const Drawer = () => {
  return (
    <div className='fixed right-0 top-0 z-10 min-w-[300px] h-screen border-l border-transparent bg-white flex flex-col transition-transform ease-in-out duration-200'>
      <div className='flex justify-between p-4 border-b border-cyan-200 font-fancy'>
        <span>Cart</span>
        <span className="font-fancy w-12 h-full relative after:cursor-pointer after:inline-block after:content-['\00d7'] after:text-4xl after:leading-none after:absolute after:h-full after:-top-1/4 after:right-0" />
      </div>
      <div className='flex flex-col justify-between h-full'>
        <div>
          <p className='text-cyan-500  p-4 text-center my-[40%] mx-auto max-w-xs'>
            Cart is empty
          </p>
        </div>
      </div>
    </div>
  )
}

export default Drawer
