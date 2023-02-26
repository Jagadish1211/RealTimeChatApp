import { createSlice } from "@reduxjs/toolkit";

const ContactState = {
    contacts: [],
    isLoading: false,
    error: null,
};

export const ContactSlice = createSlice({
    name: "contacts",
    initialState: ContactState,
    reducers: {
        AddContactsRequest: (state) => {
            const appState = { ...state };
            appState.isloading = true;
            return appState;
        },
        AddContactsSuccess: (state, action) => {
            const appState = { ...state };
            // Add contacts here
            // appState.contacts = action.payload;
            appState.isloading = false;
            return appState;
        },
        AddContactsFailure: (state) => {
            const appState = { ...state };
            appState.isloading = false;
            appState.error = "Failed to add contacts";
            return appState;
        },
    }});

    export const {AddContactsRequest, AddContactsSuccess, AddContactsFailure} = ContactSlice.actions;
    export default ContactSlice.reducer;