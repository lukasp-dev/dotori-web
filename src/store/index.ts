import {configureStore} from "@reduxjs/toolkit";
import recommendedSchoolsReducer from "./recommendedSchoolsSlice";
import cartReducer from "./cartSlice";
import progressReducer from "@/store/dashboard/progressSlice"

export const store = configureStore({
    reducer: {
        recommendedSchools: recommendedSchoolsReducer,
        cart: cartReducer,
        progress: progressReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;