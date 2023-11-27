import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./formSlice";
import statistic from "./statistic";

export const store = configureStore({
  reducer: {
    FormSlice,
    statistic,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
