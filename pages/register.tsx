import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GoogleIcon } from '../components/Icons'
import Layout from '../components/Layout'
import { authAction } from '../types/auth'
import useUser from '../hooks/useUser'
import { useI18n } from '../context/I18nContext'

const Register = () => {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const { error, submitUser } = useUser()

  return (
    <>
      <Head>
        <title>Commonground</title>
        <meta name='description' content='Commondground - Register' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-xl mx-auto px-4 md:px-0'>
        <div className='pt-12 md:mx-6'>
          <form>
            <p className='mb-4 text-2xl'>{t.user.register}</p>
            <div className='mb-4'>
              <input
                type='text'
                required
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                id='email'
                placeholder={t.user.name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <input
                type='email'
                required
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                id='email'
                placeholder={t.user.mail}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <input
                type='password'
                required
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                id='password'
                placeholder={t.user.password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='text-center pt-1 mb-12 pb-1'>
              <button
                onClick={() =>
                  submitUser(authAction.REGISTER_MAIL, email, password, name)
                }
                className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                type='button'
                style={{
                  background:
                    'linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)',
                }}
              >
                {t.user.register_access}
              </button>
              <button
                type='button'
                onClick={() => submitUser(authAction.LOGIN_GOOGLE)}
                className='px-6 py-2.5 mb-3 w-full flex items-center gap-4 uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg'
              >
                <GoogleIcon /> {t.user.register_google}
              </button>
              {error && (
                <p className='text-red-600 text-left mt-4'>
                  {t.user.email_in_use}
                </p>
              )}
              {/* <Link className='text-gray-500' href='#!'>
                  Forgot password?
                </Link> */}
            </div>

            <div className='flex items-center justify-between pb-6'>
              <p className='mb-0 mr-2'>{t.user.already_account}</p>
              <Link
                href='/login'
                className='inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
              >
                {t.user.login}
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </>
  )
}

export default Register
