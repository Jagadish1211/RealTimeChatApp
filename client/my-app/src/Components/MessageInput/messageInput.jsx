import React from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';
import {useCookies} from 'react-cookie';

import "./messageInput.scss"

const MessageInput = () => {
  const [cookies] = useCookies(['userInfo']);
  const userEmail = cookies.accountDetails.email;
    const socket = io("http://localhost:5000/");
    const [message, setMessage] = React.useState("");
    const { activeContact }  = useSelector(state => state.contacts);

    socket.on("connect", () => {
      socket.emit('join room', userEmail )
      socket.on('new message', (message, sender) => {
        console.log(message,"this is new message")
      })
    })

    const sendMessage = () => { 
      let tar = ""
      const data = {message, sender: userEmail , target : activeContact  }
      socket.emit('send message', data)
        setMessage("")
    }

        
  return (
    <div className="message-input">
      <div className="input-field">
        <TextField fullWidth label="Type message" multiline maxRows={3} id="fullWidth" onChange={e => setMessage(e.target.value)} value={message} />
      </div>
      <SendIcon className="send-button" onClick={sendMessage}/>
    </div>
  );
};

export default MessageInput;
