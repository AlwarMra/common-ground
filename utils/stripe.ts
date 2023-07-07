import { NextApiRequest } from 'next'
import Stripe from 'stripe'

export function stripeItemsReducer(
  data: Stripe.LineItem[],
  prop: 'amount_subtotal' | 'amount_total' | 'quantity',
) {
  const sum = data.reduce((accumulator: any, object) => {
    return accumulator + object[prop]
  }, 0)
  return sum
}

export const buffer = (req: NextApiRequest) => {
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
