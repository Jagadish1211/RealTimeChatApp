import React, { useState } from "react";
import "./messagesBackground.scss";

import MessageBubbles from "../MessageBubbles/messageBubbles";
import { useSelector } from "react-redux";


const MessagesBackground = ({messages}) => {
    const {contacts, activeContact}  = useSelector(state => state.contacts);
    return (
        <div className="messages-background">
            {messages.length !== 0 && messages?.map(
                (msg, index) => msg.sender === activeContact || msg.target === activeContact ? <MessageBubbles message={msg.messageText} key={msg+index} incomingMessage={msg.incomingMessage}/> : null
            ) }
            </ div>
    )

};

export default MessagesBackground;