import firebase from 'firebase/compat/app'
import { db } from '../../firebase/clientApp'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function createOrder(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const orderRef = await db.collection('orders').add(req.body)
      const orderId = await orderRef.id

      const querySnapshot = await db
        .collection('users')
        .where('userId', '==', req.body.userId)
        .get()

      if (!querySnapshot.empty) {
        const snapShot = await querySnapshot.docs[0]
        await snapShot.ref.update({
          shippingDetails: req.body.shippingDetails,
          orders: firebase.firestore.FieldValue.arrayUnion(orderId),
        })
      }
      res.status(200).send('Success')
    } catch (err: Error | any) {
      res.status(500).send(err.message || 'Internal Server Error')
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}
