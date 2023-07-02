import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useCookies} from 'react-cookie';

import ContactCard from "../../Components/ContactCard/ContactCard";
import MessageInput from "../../Components/MessageInput/messageInput";
import MessagesBackground from "../../Components/MessagesBackground/messagesBackground";
import ChatHeader from "../../Components/ChatHeader/chatHeader";

import { updateContacts } from "../../Features/Contacts/ContactSlice";

import "./chatWindow.scss";

const ChatWindow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [cookies] = useCookies(['userInfo']);
  const isAuthenticated  = cookies.accountDetails.email;
  const {contacts, activeContact}  = useSelector(state => state.contacts);
  
   const userEmail =  cookies.accountDetails.email;
   const accessToken = cookies.accountDetails.accessToken;

  const getAllContacts = () => {
    const options = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${accessToken}`} }
    axios.post('http://localhost:5000/app/contacts', {
      email: userEmail
    }, options).then(res => {
      const contactsList =  res.data.contacts
      dispatch(updateContacts(contactsList));
    }).catch(err => {
        console.log(err,"this is")
    });
  };


  useEffect(() => {
    !isAuthenticated && navigate("/login");
    getAllContacts();
  })


  return (
    <div className="Chat-container">
        <div className="contacts-card">
            <h2 className="heading-1">Contacts</h2>
            <div className="contacts-list">
              {contacts.map(contact => { return (
                  <ContactCard key={contact} name={contact}/>
              )  
              })}
               
            </div>
        </div>
        <div className="chat-window">
            <ChatHeader name={activeContact} />
            <MessagesBackground />
            <MessageInput />
        </div>
    </div>
  );
};

export default ChatWindow;