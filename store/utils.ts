import { CartProduct } from '../types/common'

type ArrayWithProperty = {
  q: number
  [key: string]: any
}

function addToCartUtil(item: CartProduct, array: CartProduct[]) {
  const existProduct = array.find(prod => prod.id === item.id)

  if (existProduct) {
    return array.map(prod => {
      if (prod.id === item.id) {
        return { ...prod, q: prod.q + item.q }
      }
      return prod
    })
  } else {
    return [...array, item]
  }
}

function substractFromCartUtil(item: CartProduct, array: CartProduct[]) {
  const existProduct = array.find(prod => prod.id === item.id)
  if (existProduct && existProduct.q > 1) {
    return array.map(prod => {
      if (prod.id === item.id) {
        return { ...prod, q: prod.q - 1 }
      }
      return prod
    })
  } else {
    return removeFromCartUtil(item, array)
  }
}

function removeFromCartUtil(item: CartProduct, array: CartProduct[]) {
  const newArray = array.filter(prod => prod.id !== item.id)
  return newArray
}

function calculateTotalQuantity(array: CartProduct[]) {
  let q = 0
  for (let i = 0; i < array.length; i++) {
    q += array[i].q
  }
  return q
}
function calculateTotalPrice(array: CartProduct[]) {
  let price = 0

  for (let i = 0; i < array.length; i++) {
    price += array[i].q * array[i].price
  }
  return price
}

export {
  addToCartUtil,
  substractFromCartUtil,
  removeFromCartUtil,
  calculateTotalQuantity,
  calculateTotalPrice,
}
