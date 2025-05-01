import {configureStore} from "@reduxjs/toolkit";
import demoSchoolsReducer from "./demoSchoolsSlice";
import cartReducer from "./cartSlice";
import progressReducer from "@/store/dashboard/progressSlice"

export const store = configureStore({
    reducer: {
        demoSchools: demoSchoolsReducer,
        cart: cartReducer,
        progress: progressReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;