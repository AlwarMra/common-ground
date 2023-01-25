import React from 'react'
import Head from 'next/head'
import { authAction, authFields } from '../types/auth'
import useUser from '../hooks/useUser'
import { useI18n } from '../context/I18nContext'
import Form from '../components/Form'
import Link from 'next/link'
import { useFormik } from 'formik'
import { FormikErrors, FormikValues } from 'formik/dist/types'

const Register = () => {
  const { t } = useI18n()
  const { error, submitUser } = useUser()

  const validate = (values: FormikValues) => {
    let errors: FormikErrors<FormikValues> = {}
    if (!values.name) {
      errors.name = 'Required'
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less'
    }
    return errors
  }
  const formik = useFormik({
    initialValues: {
      action: authAction.REGISTER_MAIL,
      email: '',
      password: '',
      name: '',
    },
    validate,
    onSubmit: values => {
      submitUser(values.action, values.email, values.password, values.name)
    },
  })

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
          <p className='mb-4 text-2xl'>{t.user.register}</p>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              type={'text'}
              name={'name'}
              placeholder={t.user.name}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Form.Input
              type={'email'}
              name={'email'}
              placeholder={t.user.mail}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Form.Input
              type={'password'}
              name={'password'}
              placeholder={t.user.password}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Form.SubmitButton text={t.user.register} />
            <Form.GoogleButton
              text={t.user.login_google}
              cb={() => submitUser(authAction.LOGIN_GOOGLE)}
            />
          </Form>
          {error && (
            <p className='text-red-600 text-left mt-4'>
              {t.user.email_password_invalid}
            </p>
          )}
          <div className='flex items-center justify-between pb-6 mt-8'>
            <p className='mb-0 mr-2'>{t.user.already_account}</p>
            <Link
              href='/login'
              className='inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
            >
              {t.user.login}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
