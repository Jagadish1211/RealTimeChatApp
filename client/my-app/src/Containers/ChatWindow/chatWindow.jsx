import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useCookies} from 'react-cookie';
import socket from "../../Utils/socket";


import ContactCard from "../../Components/ContactCard/ContactCard";
import MessageInput from "../../Components/MessageInput/messageInput";
import MessagesBackground from "../../Components/MessagesBackground/messagesBackground";
import ChatHeader from "../../Components/ChatHeader/chatHeader";

import { updateContacts } from "../../Features/Contacts/ContactSlice";
import { addReceivedMessages, sendMessage } from "../../Features/Messages/MessageSlice";

import "./chatWindow.scss";

const ChatWindow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [cookies] = useCookies(['userInfo']);
  const isAuthenticated  = cookies.accountDetails.email;
  const {contacts, activeContact}  = useSelector(state => state.contacts);
  const { messages } =  useSelector(state => state.messages);
  
  
   const userEmail =  cookies.accountDetails.email;
   const accessToken = cookies.accountDetails.accessToken;

   const options = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${accessToken}`} };

useEffect(() => {
  socket.on("connect", () => {
    socket.emit('join room', userEmail )
  });
},[])

useEffect(() => {
    // fetch and update messages
    axios.post('http://localhost:5000/app/get-messages', {
      sender: userEmail,
      target: activeContact
    }, options).then(res => {
      res?.data?.messages?.reverse()?.map(({message, sender, target}) => {
        if (sender.email === userEmail) {
          const data = {message, sender: sender.email , target : activeContact  }
          dispatch(sendMessage({data}))
        } else {
          dispatch(addReceivedMessages({
            message, sender : activeContact, target: sender.email,
          }))
        }
      });
    }).catch(err => {
        console.log(err,"this is")
    });
},[activeContact])

useEffect(() => {
  socket.on('new message', (message, sender) => {
    dispatch(addReceivedMessages({
      message, sender, target: userEmail
    }))
  });
  return () => socket.off('new message');
},[socket])



  const getAllContacts = () => {
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
    if (!isAuthenticated ) {
      navigate("/login");
    } else {
      getAllContacts();
    }
  }, [isAuthenticated]);

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
            {<MessagesBackground messages={activeContact ? messages : []}  />}
            {activeContact ?<MessageInput socket={socket}/> : null}
        </div>
    </div>
  );
};

export default ChatWindow;