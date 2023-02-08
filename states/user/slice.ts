import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  ticketQty: number;
  profilePicture: string;
  orgUnit: string;
}

type UserWithoutTicket = Omit<User, "ticketQty">;

const initialState: User = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  ticketQty: 0,
  profilePicture: "",
  orgUnit: "",
};

const config = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear: () => initialState,
    setProfile: (state, action: PayloadAction<UserWithoutTicket>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePicture = action.payload.profilePicture;
      state.orgUnit = action.payload.orgUnit;
    },
    setProfilePicture: (
      state,
      action: PayloadAction<{ profilePicture: string }>
    ) => {
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const actions = {
  ...config.actions,
};

export const reducer = config.reducer;
