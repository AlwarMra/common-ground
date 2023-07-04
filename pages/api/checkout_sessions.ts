import { NextApiRequest, NextApiResponse } from 'next'
import { CartProduct } from '../../types/common'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function checkout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const items = req.body.items.map((item: CartProduct) => {
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              /* @ts-ignore */
              name: item[req.body.lang as keyof CartProduct].title,
              images: [item.images[0]],
              metadata: {
                productId: item.id,
                slug: item.id,
              },
            },
            unit_amount: item.price,
          },
          quantity: item.q,
        }
      })
      const productIds = {
        ...req.body.items.map((item: any) => {
          return item.id
        }),
      }

      const customer = await stripe.customers.create({
        metadata: {
          userId: req.body.userInfo.id,
          cart: JSON.stringify(req.body.cartItems),
        },
      })

      const session = await stripe.checkout.sessions.create({
        line_items: items,
        metadata: productIds,
        customer: customer.id,
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['ES'],
        },
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      })
      res.send({ url: session.url })
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
