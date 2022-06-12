import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { getCartFromLS } from './../../utils/getCartFromLS';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id:string,
  title:string,
  type:string,
  price:number,
  count:number,
  imageUrl:string,
  size:number
}

export interface CartSliceState {
  totalPrice:number;
  items:CartItem[]
}

const {items, totalPrice} = getCartFromLS();

const initialState:CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      if (!state.items.length) {
        state.totalPrice = 0;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
