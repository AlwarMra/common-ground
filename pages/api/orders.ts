import { db } from '../../firebase/clientApp'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function createOrder(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const order = await db.collection('orders').add(req.body)
    res.status(200).send(order)
  } else if (req.method === 'PUT') {
    res.send(400)
  } else {
    res.send(405)
  }
}
