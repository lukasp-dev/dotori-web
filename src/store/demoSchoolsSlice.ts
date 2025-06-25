import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface School {
  id: number;
  userId: string;
  school_name: string;
  score: number;
}

export const fetchDemoSchools = createAsyncThunk(
  "allSchools/fetch",
  async () => {
    const response = await fetch("/mock_schools.json");
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.id,
      userId: item.matching_score?.applicant || "",
      school_name: item.name,
      score: item.matching_score?.score || 0,
    }))
    // TODO: use this once we have a real API
    // console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch all schools");
    // }
    // const data = await response.json();
    // return data;
  }
);

const allSchoolsSlice = createSlice({
  name: "allSchools",
  initialState: {
    schools: [] as School[],
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
