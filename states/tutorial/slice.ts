import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Tutorial {
  isOpen: boolean;
}

const initialState: Tutorial = {
  isOpen: false,
};

const config = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    setOpenTutorial: (state, action: PayloadAction<Tutorial>) => {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const actions = {
  ...config.actions,
};

export const reducer = config.reducer;
