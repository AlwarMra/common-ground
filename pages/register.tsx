import React, { useState, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GoogleIcon } from '../components/Icons'
import Layout from '../components/Layout'
import AuthContext from '../context/AuthContext'
import { authProvider } from '../types/enums'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const { loginWithGoogle, registerWithEmail } = useContext(AuthContext)

  function register(prov: authProvider) {
    if (prov === authProvider.GOOGLE) {
      loginWithGoogle()
        .then()
        .catch(err => {
          console.log(err)
          setError(true)
          return
        })
    }
    if (prov === authProvider.MAIL) {
      registerWithEmail(email, password)
        .then()
        .catch(err => {
          console.log(err)
          setError(true)
          return
        })
    }
  }
  return (
    <>
      <Head>
        <title>Commonground</title>
        <meta name='description' content='Commondground - Register' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className='max-w-xl mx-auto px-4 md:px-0'>
          <div className='pt-12 md:mx-6'>
            <form>
              <p className='mb-4 text-2xl'>Register as a new user</p>
              <div className='mb-4'>
                <input
                  type='email'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='email'
                  placeholder='E-mail'
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <input
                  type='password'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='password'
                  placeholder='Password'
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className='text-center pt-1 mb-12 pb-1'>
                <button
                  onClick={() => register(authProvider.MAIL)}
                  className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                  type='button'
                  style={{
                    background:
                      'linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)',
                  }}
                >
                  Create account
                </button>
                <button
                  type='button'
                  onClick={() => register(authProvider.GOOGLE)}
                  className='px-6 py-2.5 mb-3 w-full flex items-center gap-4 uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg'
                >
                  <GoogleIcon /> Create account with Google
                </button>
                {error && (
                  <p className='text-red-600 text-left mt-4'>
                    Email is already in use by another user
                  </p>
                )}
                {/* <Link className='text-gray-500' href='#!'>
                  Forgot password?
                </Link> */}
              </div>

              <div className='flex items-center justify-between pb-6'>
                <p className='mb-0 mr-2'>Already have an account?</p>
                <Link
                  href='/login'
                  className='inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div></div>
      </Layout>
    </>
  )
}

export default Register
