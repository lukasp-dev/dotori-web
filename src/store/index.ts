import {configureStore} from "@reduxjs/toolkit";
import recommendedSchoolsReducer from "./recommendedSchoolsSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
        recommendedSchools: recommendedSchoolsReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;