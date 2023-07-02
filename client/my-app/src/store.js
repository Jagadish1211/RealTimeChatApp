import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "./Features/Authentication/AuthSlice";
import ContactReducer from "./Features/Contacts/ContactSlice"

export const store = configureStore({
    reducer: {
        authentication: AuthReducer,
        contacts: ContactReducer,
    },
  })