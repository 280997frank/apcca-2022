import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedbackState {
  submittedFeedbacks: string[];
}

const initialState: FeedbackState = {
  submittedFeedbacks: [],
};

const feedback = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setSubmittedFeedback: (state, action: PayloadAction<string>) => {
      const newState = [...state.submittedFeedbacks, action.payload];
      state.submittedFeedbacks = newState;
    },
  },
});

export const actions = {
  ...feedback.actions,
};

export const reducer = feedback.reducer;
