import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '../context/AuthContext'
import { authAction } from '../types/auth'
import { db } from '../firebase/clientApp'

const useUser = () => {
  const [error, setError] = useState(false)

  const { loginWithGoogle, loginWithEmail, registerWithEmail } =
    useContext(AuthContext)

  const router = useRouter()

  const handleError = (err: Error) => {
    console.error(err)
    setError(true)
  }
  const handleSuccess = () => {
    router.push('/profile')
  }

  function submitUser(
    action: authAction,
    password: string = '',
    email: string = '',
    name: string = '',
  ) {
    if (action === authAction.LOGIN_GOOGLE) {
      loginWithGoogle()
        .then(data => {
          if (data.additionalUserInfo?.isNewUser && data.user) {
            addUsertoDB(data.user.displayName!, data.user.email!, data.user.uid)
          }
          handleSuccess()
        })
        .catch(handleError)
    }
    if (action === authAction.REGISTER_MAIL) {
      registerWithEmail(email, password)
        .then(data => {
          if (data.additionalUserInfo?.isNewUser && data.user) {
            addUsertoDB(name, data.user.email!, data.user.uid)
          }
          handleSuccess()
        })
        .catch(handleError)
    }
    if (action === authAction.LOGIN_MAIL) {
      loginWithEmail(email, password).then(handleSuccess).catch(handleError)
    }
  }

  function addUsertoDB(name: string, email: string, uid: string) {
    db.collection('users').add({
      name,
      email,
      userId: uid,
      orders: [],
    })
  }

  return {
    submitUser,
    error,
  }
}

export default useUser
