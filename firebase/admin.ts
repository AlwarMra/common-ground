import admin from 'firebase-admin'

const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CREDENTIALS!,
)
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export default app
