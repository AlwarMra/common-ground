import React from 'react'
import GoogleButton from './GoogleButton'
import Input from './Input'
import SubmitButton from './SubmitButton'
import Textarea from './Textarea'

interface FormProps {
  children: JSX.Element[] | JSX.Element
  onSubmit: any
}

const Form = ({ children, onSubmit }: FormProps) => {
  return <form onSubmit={onSubmit}>{children}</form>
}

Form.Input = Input
Form.Textarea = Textarea
Form.SubmitButton = SubmitButton
Form.GoogleButton = GoogleButton
export default Form
