import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "./Features/Authentication/AuthSlice";
import ContactReducer from "./Features/Contacts/ContactSlice"
import MessageReducer from './Features/Messages/MessageSlice';

export const store = configureStore({
    reducer: {
        authentication: AuthReducer,
        contacts: ContactReducer,
        messages: MessageReducer
    },
  })