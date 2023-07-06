import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'

const webUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_URL
    : process.env.DEV_URL
const webhookSecret =
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_WEBHOOK_SECRET_PROD!
    : process.env.STRIPE_WEBHOOK_SECRET_DEV!
const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY!

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function checkoutWebhooks(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2022-11-15',
  })

  const signature = req.headers['stripe-signature']!

  let event: Stripe.Event

  try {
    const body = await buffer(req)
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: Error | any | unknown) {
    console.log(`❌ Error message: ${err.message}`)
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  //Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data: any = event.data.object
      stripe.customers.retrieve(data.customer).then(async stripeCustomer => {
        try {
          const customer = {
            ...stripeCustomer,
            shipping_details: data.shipping_details,
          }
          const lineItems = await stripe.checkout.sessions.listLineItems(
            data.id,
          )
          //   return createNewOrder(data, customer, lineItems.data)
          res.status(200).end()
        } catch (err: Error | any | unknown) {
          res.status(400).send(`Webhook Error: ${err.message}`)
        }
      })
      break
    default:
      console.warn(`Unhandled event type: ${event.type}`)
  }
  res.status(200).end('Webhook succesfull')
}

const createNewOrder = async (data: any, customer: any, items: any) => {
  const metadata = data.metadata
  const products = items.map((item: any, index: any) => {
    return { id: metadata[index], q: item.quantity }
  })
  const newOrder = {
    userId: customer.metadata.userId,
    stripeCustomerId: customer.id,
    checkoutId: data.id,
    products,
    subtotal: reducer(items, 'amount_subtotal'),
    total: reducer(items, 'amount_total'),
    payment_status: data.payment_status,
    totalQ: reducer(items, 'quantity'),
  }

  const order = await fetch(webUrl + '/api/orders', {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: { 'Content-Type': 'application/json' },
  })
  console.log('ORDER', order)
}

function reducer(data, prop: 'amount_subtotal' | 'amount_total' | 'quantity') {
  const sum = data.reduce((accumulator: any, object) => {
    return accumulator + object[prop]
  }, 0)
  return sum
}

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = []

    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })

    req.on('end', () => {
      resolve(Buffer.concat(chunks))
    })

    req.on('error', reject)
  })
}
