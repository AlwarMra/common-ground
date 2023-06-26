import * as Yup from 'yup'

export const productSchema = Yup.object().shape({
  es: Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
  }),
  en: Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
  }),
  price: Yup.number().positive().required(),
  compared_at_price: Yup.number().positive().min(0),
  stock: Yup.number().integer(),
  ignore_stock: Yup.boolean(),
  images: Yup.array().of(Yup.string()),
})
