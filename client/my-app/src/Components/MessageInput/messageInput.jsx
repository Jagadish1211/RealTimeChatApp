import React from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import {useCookies} from 'react-cookie';

import "./messageInput.scss"
import { sendMessage, addReceivedMessages } from "../../Features/Messages/MessageSlice";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['userInfo']);
  const userEmail = cookies.accountDetails.email;
  const [message, setMessage] = React.useState("");
  const { activeContact }  = useSelector(state => state.contacts);

 

  const handleSendMessage = () => { 
    const socket = io("http://localhost:5000/");
    let tar = ""
    const data = {message, sender: userEmail , target : activeContact  }
    socket.emit('send message', data)
    dispatch(sendMessage({data}))
  }
        
  return (
    <div className="message-input">
      <div className="input-field">
        <TextField fullWidth label="Type message" multiline maxRows={3} id="fullWidth" onChange={e => setMessage(e.target.value)} value={message} />
      </div>
      <SendIcon className="send-button" onClick={handleSendMessage}/>
    </div>
  );
};

export default MessageInput;
