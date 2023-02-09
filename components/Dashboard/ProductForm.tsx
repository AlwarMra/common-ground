import React from 'react'
import { Product } from '../../types/dashboard'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import TabSelector from '../TabSelector'
import { TabPanel, useTabs } from 'react-headless-tabs'
import {
  Input,
  InputCheckbox,
  InputFile,
  InputNumber,
  SubmitButton,
  Textarea,
} from '../Form'
import Image from 'next/image'

interface ProductFormProps {
  initialValues: Product
  submitProduct: (values: Product, action: FormikHelpers<Product>) => void
  error: string | null
  removeNewFile: (file: File) => void
  currentFiles?: {
    files: string[]
    setFiles: React.Dispatch<React.SetStateAction<String[]>>
  }
  newFiles: {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  }
}

const validationSchema = Yup.object().shape({
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

const ProductForm = ({
  initialValues,
  submitProduct,
  error,
  newFiles,
  removeNewFile,
}: ProductFormProps) => {
  const [selectedTabLang, setSelectedTabLang] = useTabs(['es', 'en'])
  return (
    <section className='p-4 bg-gray-100 rounded'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submitProduct(values, actions)
        }}
      >
        {formik => (
          <Form>
            <div className='mb-8 pb-2'>
              <TabSelector
                isActive={selectedTabLang === 'es'}
                onClick={() => setSelectedTabLang('es')}
              >
                ES
              </TabSelector>
              <TabSelector
                isActive={selectedTabLang === 'en'}
                onClick={() => setSelectedTabLang('en')}
              >
                EN
              </TabSelector>
            </div>
            <TabPanel hidden={selectedTabLang !== 'es'}>
              <Input
                type='text'
                name='es.title_es'
                label='Title'
                placeholder='Title ES'
              />
              <Textarea
                name='es.description_es'
                label='Description'
                placeholder='Description ES'
              />
            </TabPanel>
            <TabPanel hidden={selectedTabLang !== 'en'}>
              <Input
                type='text'
                name='en.title_en'
                label='Title'
                placeholder='Title EN'
              />
              <Textarea
                name='en.description_en'
                label='Description'
                placeholder='Description EN'
              />
            </TabPanel>
            <div className='flex items-center gap-4 mb-4'>
              <InputNumber
                placeholder='Price'
                name='price'
                label='Price'
                currency={true}
              />
              <InputNumber
                placeholder='Compared price'
                name='compared_at_price'
                label='Compared at price'
                currency={true}
              />
            </div>
            <div className='gap-4'>
              <InputNumber placeholder='Stock' name='stock' label='Stock' />
              <InputCheckbox
                name='ignore_stock'
                text='Display product if out of stock?'
              />
            </div>
            <div className='flex flex-wrap gap-4 my-8'>
              <InputFile
                setFileState={newFiles.setFiles}
                fileState={newFiles.files}
              />
              {newFiles.files &&
                newFiles.files.map(file => (
                  <div
                    key={file.size}
                    className='relative w-36 h-36 rounded-lg'
                  >
                    <span
                      onClick={() => removeNewFile(file)}
                      className='absolute z-[1] bg-red-600 text-white right-1 top-1 p-1 rounded-full w-8 h-8 text-center cursor-pointer'
                    >
                      X
                    </span>
                    <Image
                      style={{ objectFit: 'cover' }}
                      alt={file.name}
                      src={URL.createObjectURL(file)}
                      fill
                    />
                  </div>
                ))}
            </div>
            {formik.errors.images && (
              <div className='mb-4 error'>{formik.errors.images}</div>
            )}
            <SubmitButton
              text='Create product'
              disabled={formik.isSubmitting}
            />
          </Form>
        )}
      </Formik>
      {error !== null && <p>{error}</p>}
    </section>
  )
}

export default ProductForm
