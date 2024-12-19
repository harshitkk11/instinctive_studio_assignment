import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/studentSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      students: studentReducer,
    },
  });
};

// Infer the type of Store
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
