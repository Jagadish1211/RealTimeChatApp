import React from "react";
import ContactCard from "../../Components/ContactCard/ContactCard";

import "./chatWindow.scss";


const ChatWindow = () => {
  return (
    <div className="Chat-container">
        <div className="contacts-card">
            <h2 className="heading-1">Contacts</h2>
            <div className="contacts-list">
                <ContactCard />
            </div>
        </div>
        <div className="chat-window">

        </div>
    </div>
  );
};

export default ChatWindow;