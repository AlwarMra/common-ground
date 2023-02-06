import React, { useState } from 'react'
import Image from 'next/image'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { TabPanel, useTabs } from 'react-headless-tabs'
import {
  Input,
  Textarea,
  InputNumber,
  SubmitButton,
  InputChecbox,
  InputFile,
} from '../../../components/Form'
import TabSelector from '../../../components/TabSelector'
import { uploadImage } from '../../../firebase/clientApp'
import { Product } from '../../../types/dashboard'

const NewProduct = () => {
  const [selectedTabLang, setSelectedTabLang] = useTabs(['es', 'en'])
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const removeFile = (oldFile: File) => {
    setFiles(files.filter(file => file.name !== oldFile.name))
  }

  const initialValues: Product = {
    es: {
      title_es: '',
      description_es: '',
    },
    en: {
      title_en: '',
      description_en: '',
    },
    price: 0,
    compared_at_price: 0,
    stock: 0,
    ignore_stock: true,
    images: [],
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
    images: Yup.array().of(Yup.string()).min(1),
  })
  const uploadAllImages = async (files: File[]) => {
    const newImgs = []
    for (let i = 0; i < files.length; i++) {
      const snapshot = await uploadImage(files[i])
      const imgUrl = await snapshot.ref.getDownloadURL()
      newImgs.push(imgUrl)
    }
    return newImgs
  }

  return (
    <section className='p-4 bg-gray-100 rounded'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          setError(null)
          uploadAllImages(files)
            .then(newImgs => {
              values.images = values.images.concat(newImgs)
            })
            .catch(err => setError(err.message))
          if (typeof error === 'string') return
          values.compared_at_price = values.price * 100
          values.compared_at_price = values.compared_at_price * 100
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
              <InputChecbox
                name='ignore_stock'
                text='Display product if out of stock?'
              />
            </div>
            <div className='flex flex-wrap gap-4 my-8'>
              <InputFile setFileState={setFiles} fileState={files} />
              {files &&
                files.map(file => (
                  <div
                    key={file.size}
                    className='relative w-36 h-36 rounded-lg'
                  >
                    <span
                      onClick={() => removeFile(file)}
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
            <SubmitButton text='Create product' />
          </Form>
        )}
      </Formik>
      {error && <p>{error}</p>}
    </section>
  )
}

export default NewProduct
