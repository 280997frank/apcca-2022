import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  badge: string;
}

const initialState: IInitialState = {
  badge: "0",
};

const noticeboardSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    clear: () => initialState,
    setNoticeboardBadge: (state, action) => {
      state.badge = action.payload;
    },
  },
});

export const { clear, setNoticeboardBadge } = noticeboardSlice.actions;
export default noticeboardSlice.reducer;
