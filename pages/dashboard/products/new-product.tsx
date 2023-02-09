import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { addProduct, uploadImage } from '../../../firebase/clientApp'
import { Product } from '../../../types/dashboard'
import ProductForm from '../../../components/Dashboard/ProductForm'
import { FormikHelpers } from 'formik'

const NewProduct = () => {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

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

  const removeFile = (oldFile: File) => {
    return setFiles(files.filter(file => file.name !== oldFile.name))
  }

  const uploadAllImages = async (files: File[]) => {
    const newImgs = []
    for (let i = 0; i < files.length; i++) {
      const snapshot = await uploadImage(files[i])
      const imgUrl = await snapshot.ref.getDownloadURL()
      newImgs.push(imgUrl)
    }
    return newImgs
  }

  const submitNewProduct = (
    values: Product,
    action: FormikHelpers<Product>,
  ) => {
    setError(null)
    uploadAllImages(files)
      .then(newImgs => {
        values.images = values.images.concat(newImgs)
        addProduct(values)
          .then(result => {
            router.push('/dashboard/products')
          })
          .catch(err => {
            setError(err.message)
            return
          })
      })
      .catch(err => {
        setError(err.message)
        return
      })
    if (typeof error === 'string') return
  }

  return (
    <ProductForm
      initialValues={initialValues}
      submitProduct={submitNewProduct}
      error={error}
      newFiles={{ files, setFiles }}
      removeNewFile={removeFile}
    />
  )
}

export default NewProduct
