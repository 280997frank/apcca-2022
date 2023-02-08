import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IZoomMeeting {
  isReady: boolean;
  meetingNumber: string;
  passWord: string;
}

interface IZoomMeetingCredentials {
  meetingNumber: string;
  passWord: string;
}

const initialState: IZoomMeeting = {
  isReady: false,
  meetingNumber: "",
  passWord: "",
};

const zoomSlice = createSlice({
  name: "zoom",
  initialState,
  reducers: {
    clear: () => initialState,
    setReady: (state, action: PayloadAction<IZoomMeetingCredentials>) => {
      state.isReady = true;
      state.meetingNumber = action.payload.meetingNumber;
      state.passWord = action.payload.passWord;
    },
  },
});

export const actions = {
  ...zoomSlice.actions,
};

export const reducer = zoomSlice.reducer;
