import admin from 'firebase-admin'

const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CREDENTIALS!,
)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
