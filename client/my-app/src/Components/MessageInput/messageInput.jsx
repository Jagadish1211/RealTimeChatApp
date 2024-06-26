import React from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import {useCookies} from 'react-cookie';

import "./messageInput.scss"
import { sendMessage } from "../../Features/Messages/MessageSlice";

const MessageInput = ({socket}) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['userInfo']);
  const userEmail = cookies.accountDetails.email;
  const [message, setMessage] = React.useState("");
  const { activeContact }  = useSelector(state => state.contacts);
  const { messages } =  useSelector(state => state.messages);

  const handleSendMessage = () => { 
    const data = {message, sender: userEmail , target : activeContact  }
    socket.emit('send message', data)
    dispatch(sendMessage([...messages, data]))
    setMessage("");
  }

  const handleEnterPress = (evt) => {
    if (evt.keyCode === 13) {
      handleSendMessage();
    }
  }
        
  return (
    <div className="message-input">
      <div className="input-field">
        <TextField fullWidth label="Type message" multiline maxRows={3} id="fullWidth" onChange={e => setMessage(e.target.value)} onKeyDown={handleEnterPress} value={message} />
      </div>
      <SendIcon className="send-button" onClick={handleSendMessage}/>
    </div>
  );
};

export default MessageInput;
