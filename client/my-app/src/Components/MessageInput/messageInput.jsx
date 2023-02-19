import React from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

import "./messageInput.scss"

const MessageInput = () => {

    const [message, setMessage] = React.useState("");

    const sendMessage = () => { 
        console.log(message)
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
