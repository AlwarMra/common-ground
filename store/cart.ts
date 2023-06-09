import { createSlice } from '@reduxjs/toolkit'
import { CartProduct } from '../types/common'
import {
  addToCartUtil,
  calculateTotalPrice,
  calculateTotalQuantity,
  removeFromCartUtil,
  substractFromCartUtil,
} from './utils'

interface Cart {
  showModal: boolean
  cartItems: CartProduct[] | []
  totalQuantity: number
  totalPrice: number
}
const cartStorage = 'cartItems'

const cartItems = window.localStorage.getItem(cartStorage)

const cartInitialState: Cart = {
  showModal: false,
  cartItems: cartItems ? JSON.parse(cartItems) : [],
  totalQuantity: cartItems ? calculateTotalQuantity(JSON.parse(cartItems)) : 0,
  totalPrice: cartItems ? calculateTotalPrice(JSON.parse(cartItems)) : 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    showModal: (state, action) => {
      return (state.showModal = action.payload)
    },
    addToCart: (state, action) => {
      const item: CartProduct = action.payload
      const items = addToCartUtil(item, state.cartItems)
      const q = calculateTotalQuantity(items)
      const p = calculateTotalPrice(items)

      state.cartItems = items
      state.totalQuantity = q
      state.totalPrice = p
      return
    },
    substractFromCart: (state, action) => {
      const item: CartProduct = action.payload
      const items = substractFromCartUtil(item, state.cartItems)
      const q = calculateTotalQuantity(items)
      const p = calculateTotalPrice(items)

      state.cartItems = items
      state.totalQuantity = q
      state.totalPrice = p
      return
    },
    removeFromCart: (state, action) => {
      const item: CartProduct = action.payload
      const items = removeFromCartUtil(item, state.cartItems)
      const q = calculateTotalQuantity(items)
      const p = calculateTotalPrice(items)

      state.cartItems = items
      state.totalQuantity = q
      state.totalPrice = p
      return
    },
    clearCart: state => {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalPrice = 0
      return
    },
    populateCart: (state, action) => {
      state.cartItems = action.payload
      return
    },
    saveCart: state => {
      return window.localStorage.setItem(
        cartStorage,
        JSON.stringify(state.cartItems),
      )
    },
  },
})

export default cartSlice.reducer
