import { UserInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  userData: UserInfo | unknown; // Replace 'any' with the actual type for files
  isloading: boolean;
};

const initialState: initialStateType = {
  userData: {},
  isloading: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
