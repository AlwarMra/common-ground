import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartProduct } from '../types/common'
import {
  addToCartUtil,
  removeFromCartUtil,
  substractFromCartUtil,
  calculateTotalPriceAndQuantity,
} from './utils'

interface Cart {
  cartItems: CartProduct[] | []
  totalQuantity: number
  totalPrice: number
}

export const cartStorage = 'CommongGround_cartItems'

// const cartItems = window.localStorage.getItem(cartStorage)

const cartInitialState: Cart = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const item: CartProduct = action.payload
      const items = addToCartUtil(item, state.cartItems)
      const { q, price: p } = calculateTotalPriceAndQuantity(items)

      state.cartItems = items
      state.totalQuantity = q
      state.totalPrice = p
      cartSlice.caseReducers.saveCart(state)
      return
    },
    substractFromCart: (state, action: PayloadAction<CartProduct>) => {
      const item: CartProduct = action.payload
      const items = substractFromCartUtil(item, state.cartItems)
      const { q, price: p } = calculateTotalPriceAndQuantity(items)

      state.cartItems = items
      state.totalQuantity = q
      state.totalPrice = p
      cartSlice.caseReducers.saveCart(state)
      return
    },
    removeFromCart: (state, action: PayloadAction<CartProduct>) => {
      const item: CartProduct = action.payload
      const items = removeFromCartUtil(item, state.cartItems)
      const { q, price: p } = calculateTotalPriceAndQuantity(items)

      state.cartItems = items
      state.totalQuantity = q
      state.totalPrice = p
      cartSlice.caseReducers.saveCart(state)
      return
    },
    clearCart: state => {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalPrice = 0
      window.localStorage.removeItem(cartStorage)
      return
    },
    populateCart: (state, action: PayloadAction<CartProduct[]>) => {
      const { q, price: p } = calculateTotalPriceAndQuantity(action.payload)
      state.cartItems = action.payload
      state.totalPrice = p
      state.totalQuantity = q
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

export const cartActions = cartSlice.actions
export type cartActionsType = typeof cartActions

export default cartSlice.reducer
