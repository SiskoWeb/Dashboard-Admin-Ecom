import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  whichForm: boolean; // Replace 'any' with the actual type for files
  isloading: boolean;
  toggleNavBar:boolean
};

const initialState: initialStateType = {
  whichForm: true, // if true so register from appear if false login from appear
  isloading: false,
  toggleNavBar: false,
};

export const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setWhichForm: (state, action: PayloadAction<boolean>) => {
      state.whichForm = action.payload;
    },
    setToggleNavbar: (state, action: PayloadAction<boolean>) => {
      state.toggleNavBar = action.payload;
    },
  },
});

export const { setWhichForm,setToggleNavbar } = FormSlice.actions;
export default FormSlice.reducer;
