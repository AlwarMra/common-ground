import { Formik, Form } from 'formik'
import React from 'react'
import { TabPanel, useTabs } from 'react-headless-tabs'
import {
  Input,
  Textarea,
  InputNumber,
  SubmitButton,
  InputChecbox,
} from '../../../components/Form'
import TabSelector from '../../../components/TabSelector'

const NewProduct = () => {
  const [selectedTabLang, setSelectedTabLang] = useTabs(['es', 'en'])

  function checkValue(val: string) {
    if (val === '') return
    const v = val.replace(',', '.')
    if (Number(v) < 0 || isNaN(Number(v)) || Number(v) === 0) {
      return 0
    }
    return val
  }
  return (
    <section className='p-4 bg-gray-100 rounded'>
      <Formik
        initialValues={{
          title_es: '',
          title_en: '',
          description_es: '',
          description_en: '',
          price: '0',
          compared_at_price: '0',
          stock: '0',
          ignore_stock: true,
        }}
        onSubmit={(values, actions) => {
          console.log(values)
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
                name='title_es'
                label='Title'
                placeholder='Title ES'
              />
              <Textarea
                name='description_es'
                label='Description'
                placeholder='Description ES'
              />
            </TabPanel>
            <TabPanel hidden={selectedTabLang !== 'en'}>
              <Input
                type='text'
                name='title_en'
                label='Title'
                placeholder='Title EN'
              />
              <Textarea
                name='description_en'
                label='Description'
                placeholder='Description EN'
              />
            </TabPanel>
            <div className='flex items-center gap-4'>
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

            <SubmitButton text='Create product' />
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default NewProduct
