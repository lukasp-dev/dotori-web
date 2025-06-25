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
  userId: string;
  school_name: string;
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
    updateStep: (state, action: PayloadAction<{ school_name: string; step: keyof SchoolSteps; value: boolean }>) => {
      const { school_name, step, value } = action.payload;
      const school = state.find((s) => s.school_name === school_name);
      if (school) {
        school.steps[step] = value;
      }
    },
  },
});

export const { initProgress, updateStep } = progressSlice.actions;
export default progressSlice.reducer;