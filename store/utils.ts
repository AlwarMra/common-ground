import { CartProduct } from '../types/common'

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

function calculateTotalPriceAndQuantity(array: CartProduct[]) {
  let price = 0
  let q = 0
  for (let i = 0; i < array.length; i++) {
    price += Number((array[i].q * array[i].price).toFixed(2))
    q += array[i].q
  }
  return { q, price }
}

export {
  addToCartUtil,
  substractFromCartUtil,
  removeFromCartUtil,
  calculateTotalPriceAndQuantity,
}
