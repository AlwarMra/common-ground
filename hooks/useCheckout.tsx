import { CartProduct } from 'types/common'

type checkoutBodyRequest = {
  items: CartProduct[]
  lang: keyof CartProduct
  userInfo: {
    email: string
    id: string
    name: string
  }
}

export default function useCheckout() {
  function createCheckoutSession(body: checkoutBodyRequest) {
    return fetch('/api/checkout/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(res => {
        console.log(res)
        return res
      })
  }

  const submitCheckout = (body: checkoutBodyRequest) => {
    return createCheckoutSession(body).then(res => {
      console.log(res)
      window.location.href = res.url
    })
  }

  return { submitCheckout }
}
