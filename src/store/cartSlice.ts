import{createSlice, PayloadAction} from "@reduxjs/toolkit";

interface School {
    id: number;
    name: string;
    price: number;
}

interface CartState {
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
        const exists = state.items.find((item) => item.id === action.payload.id);
        if (!exists) {
            state.items.push(action.payload);
            state.total += action.payload.price;
        }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
        const index = state.items.findIndex((item) => item.id === action.payload);
        if (index !== -1) {
            state.total -= state.items[index].price;
            state.items.splice(index, 1);
        }
        },
        clearCart: (state) => {
        state.items = [];
        state.total = 0;
        },
    },
});
export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;