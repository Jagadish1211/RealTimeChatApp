import { createSlice } from '@reduxjs/toolkit';

const AuthState = {
    isAuthenticated: false,
    userEmail: null,
    authError: null,
}

export const AuthSlice = createSlice({
    name: 'authentication',
    initialState : AuthState,
    reducers: {
        authSuccess : (state) => {
            const appState = {...state};
            appState.isAuthenticated = true;
            // appState.userEmail = action.payload;
            appState.authError = null;
            return state;
        },
        authFaliure : (state) => {
            const appState = {...state};
            appState.isAuthenticated = false;
            // appState.authError = Error message relevant to the failure;
            return state;
        }
    }
});

export const {authSuccess, authFailure} = AuthSlice.actions;
export default AuthSlice.reducer;