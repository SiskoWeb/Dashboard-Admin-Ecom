
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  userNumbers: number,
  isloading: boolean;
};

const initialState: initialStateType = {
  userNumbers: 0,
  isloading: false,
};

export const statistic = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setLengthUser: (state,action) => {
      state.userNumbers = action.payload;
    },
  },
});

export const { setLengthUser } = statistic.actions;
export default statistic.reducer;
