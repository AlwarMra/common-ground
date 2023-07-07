import React, { useEffect } from 'react'
import { CartProduct } from 'types/common'
import useCheckout from 'hooks/useCheckout'

type ICheckoutButton = {
  items: CartProduct[]
  lang: keyof CartProduct
}

const CheckoutButton = ({ items, lang }: ICheckoutButton) => {
  const { submitCheckout } = useCheckout()

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    const userInfo = {
      email: 'alwaromoreno@gmail.com',
      id: '8F9B1ZOuGBT9Pe5z3gIsHtklyzp1',
      name: 'Alwar',
    }

    const transformedItems = items.map(item => ({
      ...item,
      price: Number(item.price) * 100,
    }))
    submitCheckout({ items: transformedItems, userInfo, lang })
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get('checkout_success')) {
      console.log('Order placed! You will receive an email confirmation.')
    }
    if (query.get('checkout_canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.',
      )
    }
  }, [])

  return (
    <form onSubmit={e => handleCheckout(e)}>
      <button
        className='w-full text-center p-2 border-2 border-cyan-400 transition hover:bg-cyan-100'
        type='submit'
        role='link'
      >
        Checkout
      </button>
    </form>
  )
}

export default CheckoutButton
