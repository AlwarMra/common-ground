import React from 'react'
import { useForm } from 'react-hook-form'
import GoogleButton from './GoogleButton'
import Input from './Input'
import SubmitButton from './SubmitButton'

interface FormProps {
  defaultValues?: any
  children: JSX.Element[] | JSX.Element
  onSubmit: any
}

const Form = ({ defaultValues, children, onSubmit }: FormProps) => {
  const methods = useForm({ defaultValues })
  const {
    handleSubmit,
    formState: { errors },
  } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                key: child.props.name,
                register: methods.register,
                errors,
              },
            })
          : child
      })}
    </form>
  )
}

Form.Input = Input
Form.SubmitButton = SubmitButton
Form.GoogleButton = GoogleButton
export default Form
