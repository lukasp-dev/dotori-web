import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SchoolSteps {
    ResumeOutline: boolean,
    FirstDraft: boolean,
    AiFeedback: boolean,
    RequestedHumanize: boolean,
    Humanized: boolean,
    Submitted: boolean,
}

export interface SchoolProgress {
  id: number;
  name: string;
  steps: SchoolSteps;
}

const initialState: SchoolProgress[] = [];

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    initProgress: (state, action: PayloadAction<SchoolProgress[]>) => {
      return action.payload;
    },
    updateStep: (state, action: PayloadAction<{ schoolId: number; step: keyof SchoolSteps; value: boolean }>) => {
      const { schoolId, step, value } = action.payload;
      const school = state.find((s) => s.id === schoolId);
      if (school) {
        school.steps[step] = value;
      }
    },
  },
});

export const { initProgress, updateStep } = progressSlice.actions;
export default progressSlice.reducer;