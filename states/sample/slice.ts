import { createSlice } from "@reduxjs/toolkit";

const sampleReducer = createSlice({
  name: "sample",
  initialState: {
    hello: "world",
  },
  reducers: {
    clear: (state) => {
      state.hello = "";
    },
  },
});

export const { reducer } = sampleReducer;
