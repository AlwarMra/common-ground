import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ProductForm from '../../../components/Dashboard/ProductForm'
import {
  addProduct,
  deleteImage,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadImage,
} from '../../../firebase/clientApp'
import { Product } from '../../../types/dashboard'
import Modal from '../../../components/Modal'

const Product = () => {
  const [product, setProduct] = useState<Product | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [currentFiles, setCurrentFiles] = useState<string[]>([])
  const [actionType, setActionType] = useState<'add' | 'update'>('add')
  const [error, setError] = useState<string | null>(null)
  const [modalState, setModalState] = useState(false)
  const router = useRouter()
  const { id } = router.query

  const removeFile = (oldFile: File | string) => {
    if (oldFile instanceof File) {
      return setFiles(files.filter(file => file.name !== oldFile.name))
    }
    return setCurrentFiles(currentFiles.filter(file => file !== oldFile))
  }
  const uploadAllImages = async (files: File[]) => {
    if (files.length === 0) return []
    const newImgs = []
    for (let i = 0; i < files.length; i++) {
      const snapshot = await uploadImage(files[i])
      const imgUrl = await snapshot.ref.getDownloadURL()
      newImgs.push(imgUrl)
    }
    return newImgs
  }
  const deleteAllImages = async (urls: string[]) => {
    for (let i = 0; i < urls.length; i++) {
      const res = await deleteImage(urls[i])
      console.log(res)
    }
    return
  }
  const uploadNewProduct = (values: Product) => {
    addProduct(values)
      .then(() => router.push('/dashboard/products'))
      .catch(err => setError(err.message))
  }
  const removeProduct = () => {
    if (typeof id === 'string') {
      deleteProduct(id)
        .then(() => {
          router.push('/dashboard/products')
        })
        .catch(err => setError(err.message))
        .finally(() => setModalState(false))
    }
  }

  const submitProduct = async (
    values: Product,
    action: FormikHelpers<Product>,
    actionType: 'add' | 'update' = 'add',
  ) => {
    setError(null)

    await uploadAllImages(files)
      .then(async newImgs => {
        if (actionType === 'add') {
          values.images = newImgs
          await uploadNewProduct(values)
        }

        if (actionType === 'update') {
          const imagesToRemove = values.images.filter(
            x => currentFiles.indexOf(x) === -1,
          )
          const imagesToPreserve = values.images.filter(
            x => currentFiles.indexOf(x) !== -1,
          )
          values.images = imagesToPreserve.concat(newImgs)
          await updateProduct(values, id as string).then(async () => {
            await deleteAllImages(imagesToRemove)
              .then(() => {
                return router.push('/dashboard/products')
              })
              .catch(err => console.log(err))
          })
        }
      })
      .catch(err => {
        console.log('error', err.message)
        setError(err.message)
      })
  }

  useEffect(() => {
    let data
    const initialValues = {
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
    if (id === 'new-product') {
      return setProduct(initialValues)
    }
    if (typeof id === 'string') {
      getProductById(id)
        .then(async doc => {
          data = await doc.data()
          setProduct(data as Product)
          setCurrentFiles(data!.images)
          setActionType('update')
        })
        .catch(() => setError('This product does not exist'))
    }
  }, [id])

  if (product === null && error) {
    return <div>{error}</div>
  }

  if (product === null) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Modal
        modalAction={removeProduct}
        modalState={modalState}
        closeModal={setModalState}
      />
      <ProductForm
        initialValues={product}
        newFiles={{ files, setFiles }}
        currentFiles={{ files: currentFiles, setFiles: setCurrentFiles }}
        submitProduct={submitProduct}
        removeNewFile={removeFile}
        error={error}
        actionType={actionType}
        openModal={setModalState}
      />
    </>
  )
}

export default Product
