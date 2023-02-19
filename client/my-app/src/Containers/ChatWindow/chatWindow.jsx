import React from "react";
import ContactCard from "../../Components/ContactCard/ContactCard";
import MessageInput from "../../Components/MessageInput/messageInput";
import MessagesBackground from "../../Components/MessagesBackground/messagesBackground";
import ChatHeader from "../../Components/ChatHeader/chatHeader";

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
            <ChatHeader />
            <MessagesBackground />
            <MessageInput />
        </div>
    </div>
  );
};

export default ChatWindow;