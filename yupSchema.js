import * as Yup from 'yup'

export const productSchema = Yup.object().shape({
  es: Yup.object({
    title_es: Yup.string().required(),
    description_es: Yup.string().required(),
  }),
  en: Yup.object({
    title_en: Yup.string().required(),
    description_en: Yup.string().required(),
  }),
  price: Yup.number().positive().required(),
  compared_at_price: Yup.number().positive().min(0),
  stock: Yup.number().integer(),
  ignore_stock: Yup.boolean(),
  images: Yup.array().of(Yup.string()),
})
