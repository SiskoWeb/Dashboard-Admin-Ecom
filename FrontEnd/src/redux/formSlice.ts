import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  whichForm: boolean; // Replace 'any' with the actual type for files
  isloading: boolean;
};

const initialState: initialStateType = {
  whichForm: true, // if true so register from appear if false login from appear
  isloading: false,
};

export const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setWhichForm: (state, action: PayloadAction<boolean>) => {
      state.whichForm = action.payload;
    },
  },
});

export const { setWhichForm } = FormSlice.actions;
export default FormSlice.reducer;
