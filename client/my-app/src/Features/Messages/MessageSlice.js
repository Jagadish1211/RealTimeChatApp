import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
  };


export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            state.messages.push({
                messageText : action.payload.data.message,
                sender: action.payload.data.sender,
                target: action.payload.data.target,
                incomingMessage: false
            })
        },
        addReceivedMessages: (state, action) => {
            state.messages.push({
                messageText : action.payload.message,
                sender: action.payload.sender,
                target: action.payload.target,
                incomingMessage: true
            })
        },
    }
})

export const {sendMessage, addReceivedMessages} = messageSlice.actions;
export default messageSlice.reducer;