// src/hooks/useCart.ts
'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { addItem, removeItem, updateItemQuantity } from '@/redux/slices/cartSlice'
import { CartItem } from '@/redux/slices/cartSlice'

export function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart)

  const addCartItem = (item: CartItem) => dispatch(addItem(item))
  const removeCartItem = (id: string) => dispatch(removeItem(id))
  const updateCartItemQuantity = (id: string, quantity: number) => dispatch(updateItemQuantity({ id, quantity }))

  return {
    cart,
    addCartItem,
    removeCartItem,
    updateCartItemQuantity,
  }
}
