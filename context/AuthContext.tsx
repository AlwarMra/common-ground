import React, { createContext, useEffect, useState } from 'react'
import firebase from '../firebase/clientApp'
import 'firebase/compat/auth'

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
  useEffect(() => {
    const unsubsrcibe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
    return unsubsrcibe
  }, [])
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
