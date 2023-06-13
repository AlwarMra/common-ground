import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import DrawerProduct from './DrawerProduct'
import { useI18n } from '../../context/I18nContext'
import { CartProduct } from '../../types/common'
import { cartActions } from '../../store/cart'

const Drawer = () => {
  const cart = useAppSelector(state => state.cart)
  const { routerLocale } = useI18n()

  return (
    <div className='fixed right-0 top-0 z-10 max-w-[300px] w-full h-screen border-l border-transparent bg-white flex flex-col transition-transform ease-in-out duration-200 md:min-w-[400px]'>
      <div className='flex justify-between p-4 border-b border-cyan-200 font-fancy relative after:content-[""] after:absolute after:border-b after:border-b-red-300 after:left-0 after:w-full after:bottom-1'>
        <span>Cart</span>
        <span className="font-fancy w-12 h-full relative after:cursor-pointer after:inline-block after:content-['\00d7'] after:text-4xl after:leading-none after:absolute after:h-full after:-top-1/4 after:right-0" />
      </div>
      <div className='flex flex-col justify-between h-full'>
        {cart.cartItems.length > 0 ? (
          <>
            <div className='h-full max-h-[80%] overflow-y-auto'>
              {cart.cartItems.map(item => (
                <DrawerProduct
                  key={item.id}
                  prod={item}
                  lang={routerLocale.toString() as keyof CartProduct}
                  actions={cartActions}
                />
              ))}
            </div>
            <div className='p-4 border-t border-t-cyan-200 relative before:content-[""] before:absolute before:border-b before:border-b-red-300 before:left-0 before:w-full before:top-1'>
              <p className='mb-3'>
                <span className='font-fancy mr-4 inline-block'>
                  Total price:
                </span>
                <span>{cart.totalPrice}€</span>
              </p>
              <button>Buy</button>
            </div>
          </>
        ) : (
          <div>
            <p className='text-cyan-500  p-4 text-center my-[40%] mx-auto max-w-xs'>
              Cart is empty
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Drawer
