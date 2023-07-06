import React from 'react'
import { ProductFormProps } from 'types/dashboard'
import { Form, Formik } from 'formik'
import { productSchema } from 'yupSchema'
import TabSelector from 'components/TabSelector'
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

const ProductForm = ({
  initialValues,
  submitProduct,
  error,
  newFiles,
  currentFiles,
  removeNewFile,
  actionType,
  openModal,
}: ProductFormProps) => {
  const [selectedTabLang, setSelectedTabLang] = useTabs(['es', 'en'])
  return (
    <section className='p-4 bg-gray-100 rounded'>
      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={(values, actions) => {
          submitProduct(values, actions, actionType)
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
                name='es.title'
                label='Title'
                placeholder='Title ES'
              />
              <Textarea
                name='es.description'
                label='Description'
                placeholder='Description ES'
              />
            </TabPanel>
            <TabPanel hidden={selectedTabLang !== 'en'}>
              <Input
                type='text'
                name='en.title'
                label='Title'
                placeholder='Title EN'
              />
              <Textarea
                name='en.description'
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
              {currentFiles !== undefined &&
                currentFiles.files &&
                currentFiles.files.map(file => (
                  <div key={file} className='relative w-36 h-36 rounded-lg'>
                    <span
                      onClick={() => removeNewFile(file)}
                      className='absolute z-[1] bg-red-600 text-white right-1 top-1 p-1 rounded-full w-8 h-8 text-center cursor-pointer'
                    >
                      X
                    </span>
                    <Image
                      style={{ objectFit: 'cover' }}
                      alt={file}
                      src={file}
                      fill
                    />
                  </div>
                ))}
            </div>
            {formik.errors.images && (
              <div className='mb-4 error'>{formik.errors.images}</div>
            )}
            {actionType === 'add' && (
              <SubmitButton
                text='Create product'
                disabled={formik.isSubmitting}
              />
            )}
            {actionType === 'update' && (
              <div className='flex gap-4'>
                <SubmitButton
                  text='Update product'
                  disabled={formik.isSubmitting}
                />
                <button
                  className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                  type='submit'
                  onClick={e => {
                    e.preventDefault()
                    openModal(true)
                  }}
                  style={{
                    background:
                      'linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)',
                  }}
                >
                  Delete product
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {error !== null && <p>{error}</p>}
    </section>
  )
}

export default ProductForm
