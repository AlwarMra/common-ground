import React, { createContext, useEffect, useState } from 'react'
import firebase from '../firebase/clientApp'
import 'firebase/compat/auth'
import { useRouter } from 'next/router'

export interface AuthContextModel {
  user: firebase.User | null
  loginWithGoogle: () => Promise<firebase.auth.UserCredential>
  loginWithEmail: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>
  registerWithEmail: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>
  logout: () => Promise<void>
}
const AuthContext = createContext<AuthContextModel>({} as AuthContextModel)

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.User | null>(null)

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

  // Set user if it changes
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser)
  }, [])

  const router = useRouter()

  // Check for protected routes
  useEffect(() => {
    const privatePaths = ['/profile']
    const isPrivate = privatePaths.indexOf(router.pathname)

    if (isPrivate !== -1 && user === null) {
      router.replace('/')
    }
  }, [router, user])

  const value = {
    user,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
