import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { Product } from '../types/dashboard'

const firebaseConfig = {
  apiKey: 'AIzaSyAcTedBuWurGyfn_aKwbZSNUPqAiHGCFLw',
  authDomain: 'common-ground-889f7.firebaseapp.com',
  projectId: 'common-ground-889f7',
  storageBucket: 'common-ground-889f7.appspot.com',
  messagingSenderId: '659635235153',
  appId: '1:659635235153:web:5c22fa7274a5f961b1cb70',
  measurementId: 'G-32ZQY90WVZ',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const db = firebase.firestore()

//Check Firebase Docs for future implementation of auth persistence
// https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=es-419#web-version-8
// f=> irebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{})

//Also check this article to implement SSR Auth system https://colinhacks.com/essays/nextjs-firebase-authentication

//LOGIN functions
// The google AuthProvider registers the user if it does not exists
const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}
const loginWithEmail = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}
const registerWithEmail = (email: string, password: string) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}
const logout = () => {
  return firebase.auth().signOut()
}

// DB FUNCTIONS
// User
export function addUsertoDB(name: string, email: string, uid: string) {
  db.collection('users').add({
    name,
    email,
    userId: uid,
    orders: [],
  })
}
// Products
export function addProduct(prod: Product) {
  return db.collection('products').add(prod)
}

export function updateProduct(prod: Product) {}

export function getAllProducts() {
  return db
    .collection('products')
    .orderBy('es.title_es')
    .get()
    .then(({ docs }) => {
      return docs.map(doc => {
        const data = doc.data()
        data.id = doc.id
        return {
          ...data,
          id: doc.id,
        }
      })
    })
}

// Images
export function uploadImage(file: File) {
  const ref = firebase.storage().ref(`products/${file.name}`)
  return ref.put(file)
}
export function deleteImage(file: File) {}

export default firebase
export { loginWithEmail, loginWithGoogle, registerWithEmail, logout }
