import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import ContactCard from "../../Components/ContactCard/ContactCard";
import MessageInput from "../../Components/MessageInput/messageInput";
import MessagesBackground from "../../Components/MessagesBackground/messagesBackground";
import ChatHeader from "../../Components/ChatHeader/chatHeader";


import "./chatWindow.scss";

const ChatWindow = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.authentication)

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  })

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