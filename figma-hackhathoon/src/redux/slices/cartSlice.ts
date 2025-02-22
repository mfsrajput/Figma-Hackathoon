// src/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: any;
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

// Helper function to calculate total price
const calculateTotalPrice = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// Helper function to sort cart items by `id` (or any other field, like `name`)
const sortItems = (items: CartItem[]) => {
  return items.sort((a, b) => a.id.localeCompare(b.id)); // Sorting by 'id'. You can change this to 'name' or another field
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.items = sortItems(state.items); // Sort items after modification
      state.totalPrice = calculateTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.items = sortItems(state.items); // Sort items after removal
      state.totalPrice = calculateTotalPrice(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.items = sortItems(state.items); // Sort items after update
      state.totalPrice = calculateTotalPrice(state.items);
    },
       // New action to set the cart items
       setCartItems: (state, action: PayloadAction<CartItem[]>) => {
        state.items = sortItems(action.payload); // Sort items when setting the cart
        state.totalPrice = calculateTotalPrice(state.items);
      },
  },
});

export const { addItem, removeItem, clearCart, updateItemQuantity, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
