import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { authAction } from '../types/auth'
import {
  addUsertoDB,
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
} from '../firebase/clientApp'
import AuthContext from '../context/AuthContext'

const useUser = () => {
  const [error, setError] = useState(false)
  const user = useContext(AuthContext)
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

  useEffect(() => {
    if (user) router.replace('/profile')
    return
  }, [router, user])

  return {
    submitUser,
    error,
  }
}

export default useUser
