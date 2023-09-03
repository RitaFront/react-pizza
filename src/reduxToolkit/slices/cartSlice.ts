import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartSliceState, ICartItem } from '../types';
import { getCartLocalStorage } from '../../utils/getCartLocalStorage';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

const cartData = getCartLocalStorage();

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload
      );

      state.totalPrice -= findItem!.price;

      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload
      );

      state.totalPrice -= findItem!.price * findItem!.count;

      state.items = state.items.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelect = (state: RootState) => state.cart;
export const cartItemsSelect = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, clearItems, removeItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
