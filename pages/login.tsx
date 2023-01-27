import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { authAction } from '../types/auth'
import useUser from '../hooks/useUser'
import { useI18n } from '../context/I18nContext'
import { SubmitButton, Input, GoogleButton } from '../components/Form'
import { Formik, useFormik, Form } from 'formik'

const Login = () => {
  const { error, submitUser } = useUser()
  const { t } = useI18n()
  return (
    <>
      <Head>
        <title>Commonground - Login</title>
        <meta name='description' content='Commondground - Login' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-xl mx-auto px-4 md:px-0'>
        <div className='pt-12 md:mx-6'>
          <p className='mb-4 text-2xl'>{t.user.login}</p>
          <Formik
            initialValues={{
              action: authAction.LOGIN_MAIL,
              email: '',
              password: '',
            }}
            onSubmit={(values, actions) => {
              submitUser(values.action, values.email, values.password)
            }}
          >
            <Form>
              <Input type='email' name='email' placeholder={t.user.mail} />
              <Input
                type='password'
                name='password'
                placeholder={t.user.password}
              />
              <SubmitButton text={t.user.login} />
              <GoogleButton
                text={t.user.login_google}
                cb={() => submitUser(authAction.LOGIN_GOOGLE)}
              />
            </Form>
          </Formik>

          {error && (
            <p className='text-red-600 text-left mt-4'>
              {t.user.email_password_invalid}
            </p>
          )}
          <div className='flex items-center justify-between pb-6 mt-8'>
            <p className='mb-0 mr-2'>{t.user.dont_have_account}</p>
            <Link
              href='/register'
              className='inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
            >
              {t.user.register}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
