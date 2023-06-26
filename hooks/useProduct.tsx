import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart'
import { Product } from '../types/common'

const useProduct = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const submitProduct = (prod: Product) => {
    setIsLoading(true)
    dispatch(cartActions.addToCart({ ...prod, q: 1 }))
    setTimeout(() => setIsLoading(false), 1000)
  }

  return {
    isLoading,
    submitProduct,
  }
}

export default useProduct
