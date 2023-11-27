import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  userNumbers: number;
  categoriesNumber: number;
  isloading: boolean;
};

const initialState: initialStateType = {
  userNumbers: 0,
  categoriesNumber: 0,
  isloading: false,
};

export const statistic = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setLengthUser: (state, action) => {
      state.userNumbers = action.payload;
    },
    setLengthCategories: (state, action) => {
      state.categoriesNumber = action.payload;
    },
  },
});

export const { setLengthUser, setLengthCategories } = statistic.actions;
export default statistic.reducer;
