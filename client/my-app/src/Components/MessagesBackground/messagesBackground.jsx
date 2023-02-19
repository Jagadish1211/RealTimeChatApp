import React from "react";
import "./messagesBackground.scss";

import MessageBubbles from "../MessageBubbles/messageBubbles";


const MessagesBackground = () => {
    return (
        <div className="messages-background">
            <MessageBubbles message={"hello"} />
            </ div>
    )

};

export default MessagesBackground;