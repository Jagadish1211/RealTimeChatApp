import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
  };


export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            state.messages = action.payload
        },
    }
})

export const {sendMessage} = messageSlice.actions;
export default messageSlice.reducer;