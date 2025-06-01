import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface School {
  userId: string;
  school_name: string;
  score: number;
}

export interface CartState {
  items: School[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<School>) => {
      const exists = state.items.find((item) => item.school_name === action.payload.school_name);
      if (!exists) {
        state.items.push(action.payload);
        state.total += 100; 
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.school_name === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.total -= 100;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;