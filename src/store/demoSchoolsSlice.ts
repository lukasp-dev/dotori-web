import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDemoSchools = createAsyncThunk(
  "allSchools/fetch",
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`);
    if (!response.ok) {
      throw new Error("Failed to fetch all schools");
    }
    const data = await response.json();
    return data;
  }
);

const allSchoolsSlice = createSlice({
  name: "allSchools",
  initialState: {
    schools: [] as { id: number; name: string; score: number }[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemoSchools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDemoSchools.fulfilled, (state, action) => {
        state.schools = action.payload;
        state.loading = false;
      })
      .addCase(fetchDemoSchools.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default allSchoolsSlice.reducer;
