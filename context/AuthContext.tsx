import React, { createContext, useEffect, useState } from 'react'
import firebase from '../firebase/clientApp'
import 'firebase/compat/auth'
import { useRouter } from 'next/router'

const AuthContext = createContext<firebase.User | null>(
  {} as firebase.User | null,
)
export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.User | null>(null)

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

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthContext
