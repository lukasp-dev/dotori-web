import{createSlice, PayloadAction} from "@reduxjs/toolkit";

interface School {
    id: number;
    name: string;
    price: number;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [] as School[],
    },
    reducers: {
        addToCart: (state, action: PayloadAction<School>) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});
export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;