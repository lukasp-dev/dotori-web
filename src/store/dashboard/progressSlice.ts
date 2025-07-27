import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SchoolProgress {
  id: number;
  userId: string;
  school_name: string;
}

const initialState: SchoolProgress[] = [];

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    initProgress: (state, action: PayloadAction<SchoolProgress[]>) => {
      return action.payload;
    },
  },
});

export const { initProgress } = progressSlice.actions;
export default progressSlice.reducer;