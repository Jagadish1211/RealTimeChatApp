import React from "react";
import "./chatHeader.scss"

const ChatHeader = ({name}) => {
    
return (
    <div className="chat-header">
        <div>
            {name}
        </div>
        </ div>
)
};


export default ChatHeader;