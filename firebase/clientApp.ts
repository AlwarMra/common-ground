import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/compat/firestore'

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

// The google AuthProvider registers the user if it does not exists
export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const loginWithEmail = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const registerWithEmail = (email: string, password: string) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export default firebase
