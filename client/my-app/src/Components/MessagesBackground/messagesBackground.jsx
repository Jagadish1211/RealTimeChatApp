import React, { useState } from "react";
import "./messagesBackground.scss";
import { io } from "socket.io-client";

import MessageBubbles from "../MessageBubbles/messageBubbles";
import { useSelector } from "react-redux";


const MessagesBackground = ({messages}) => {
    return (
        <div className="messages-background">
            {messages.length !== 0 && messages?.map(
                msg => <MessageBubbles message={msg.messageText} incomingMessage={msg.incomingMessage}/>
            ) }
            </ div>
    )

};

export default MessagesBackground;