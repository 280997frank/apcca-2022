import { TMsgNotif } from "@/hooks/chat";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isOpen: boolean;
  notification: TMsgNotif[];
  totalUnread: number;
}

const initialState: InitialState = {
  isOpen: false,
  notification: [],
  totalUnread: 0,
};

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clear: () => initialState,
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setTotalUnread: (state, action) => {
      state.totalUnread = action.payload;
    },
  },
});

export const actions = {
  ...chatReducer.actions,
};

export const { reducer } = chatReducer;
