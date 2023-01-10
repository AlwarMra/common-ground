import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

interface childrenProps {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: childrenProps) {
  const { user } = useContext(AuthContext)

  const router = useRouter()
  return user === null ? router.push('/') : children
}
