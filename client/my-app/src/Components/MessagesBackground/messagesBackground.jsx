import React, { useState } from "react";
import "./messagesBackground.scss";
import { io } from "socket.io-client";

import MessageBubbles from "../MessageBubbles/messageBubbles";


const MessagesBackground = () => {

    const socket = io("http://localhost:5000/");
    const [msg, setMessage] = useState("");

    socket.on("new message", (message, sender) => {
        setMessage(message);
      console.log(message)
    })



    return (
        <div className="messages-background">
            {msg && <MessageBubbles message={msg} />}
            </ div>
    )

};

export default MessagesBackground;