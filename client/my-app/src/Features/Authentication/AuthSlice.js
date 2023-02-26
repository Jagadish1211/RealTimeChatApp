import { createSlice } from '@reduxjs/toolkit';

const AuthState = {
    isAuthenticated: false,
    isLoading: false,
    userEmail: null,
    error: null,
}

export const AuthSlice = createSlice({
    name: 'authentication',
    initialState : AuthState,
    reducers: {
        authRequest : (state) => {
            const appState = {...state};
            appState.isLoading = true;
            return appState;
        },
        authSuccess : (state, action) => {
            const appState = {...state};
            appState.isAuthenticated = true;
            appState.userEmail = action.payload?.user?.email;
            appState.error = null;
            appState.isLoading = false;
            return appState;
        },
        authFailure : (state) => {
            const appState = {...state};
            appState.isLoading = false;
            appState.isAuthenticated = false;
            appState.error = "Error message relevant to the failure";
            return appState;
        }
    }
});

export const {authSuccess, authFailure, authRequest} = AuthSlice.actions;
export default AuthSlice.reducer;