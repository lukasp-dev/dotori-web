import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchRecommendedSchools = createAsyncThunk(
    "recommendedSchools/fetch",
    async () => {
        return [
            {id: 1, name: "NYU", price: 100},
            {id: 2, name: "Georgia Tech", price: 100},
            {id: 3, name: "U Georgia", price: 100},
            {id: 4, name: "UMN Twin Cities", price: 100},
        ];
    }
);

const recommendedSchoolsSlice = createSlice({
    name: "AIrecommendedSchools",
    initialState: {
        schools: [] as { id: number; name: string; price: number }[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendedSchools.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecommendedSchools.fulfilled, (state, action) => {
                state.schools = action.payload;
                state.loading = false;
            });
    },
});
export default recommendedSchoolsSlice.reducer;