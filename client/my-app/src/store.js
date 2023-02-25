import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "./Features/Authentication/AuthSlice";

export const store = configureStore({
    reducer: {
        authentication: AuthReducer,
    },
  })