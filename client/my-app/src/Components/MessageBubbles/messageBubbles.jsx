import React from "react";
import "./messageBubbles.scss";

const MessageBubbles = ({ message }) => {

    const [incomingMessage, setIncomingMessage] = React.useState(false);

    return (
        <div className={`message-bubbles ${incomingMessage ? "incoming" : ""}`}>
            <div className="message-text">
            {message}
            </div>
            
        </div>
    );

};

export default MessageBubbles;