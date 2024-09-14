import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "../../Utils/socket";
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css'

import ContactCard from "../../Components/ContactCard/ContactCard";
import MessageInput from "../../Components/MessageInput/messageInput";
import MessagesBackground from "../../Components/MessagesBackground/messagesBackground";
import ChatHeader from "../../Components/ChatHeader/chatHeader";
import AddContactCard from "../../Components/AddContactCard/AddContactCard";

import "./chatWindow.scss";
import { updateContacts } from "../../Features/Contacts/ContactSlice";
import { sendMessage } from "../../Features/Messages/MessageSlice";
import AddProfilePicCard from "../../Components/AddProfilePicCard/AddProfilePicCard";
import  privateAxiosInstance from "../../Utils/axiosInstances";
import plus from "../../assets/plus.png";

const ChatWindow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [addContactModalOpen, setAddContactModalOpen] = useState(false);
  const [addProfilePicModalOpen, setAddProfilePicModalOpen] = useState(false);

  const isAuthenticated = JSON.parse(localStorage.getItem("accessToken")) ? true : false;
  const { contacts, activeContact } = useSelector(state => state.contacts);
  const { messages } = useSelector(state => state.messages);

  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const options = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` } };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit('join room', userEmail)
    });
  }, [])


  useEffect(() => {
    // fetch and update messages
    let messageList = [];
    privateAxiosInstance.post('/get-messages', {
      data: {
        sender: userEmail,
        target: activeContact
      }
    }
    ).then(res => {
      res?.data?.messages?.reverse()?.forEach(({ message, sender, target }) => {
        if (sender.email === userEmail) {
          const messageData = { message, sender: sender.email, target: activeContact }
          messageList.push(messageData)
        } else {
          messageList.push({
            message, sender: activeContact, target: sender.email,
          })
        }
      });
      dispatch(sendMessage(messageList))
    }).catch(err => {
      console.log(err, "this is")
    });
  }, [activeContact])

  useEffect(() => {
    socket.on('new message', (message, sender) => {
      dispatch(sendMessage([...messages, {
        message, sender, target: userEmail
      }]))
    });
    return () => socket.off('new message');
  }, [socket, messages])



  const getAllContacts = () => {
    privateAxiosInstance.post('/contacts', {
      data : {
        email: userEmail
      }
    }).then(res => {
      const contactsList = res.data.contacts
      dispatch(updateContacts(contactsList));
    }).catch(err => {
      console.log(err, "this is")
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      getAllContacts();
    }
  }, [isAuthenticated]);

  const handleAddContactModal = () => {
    setAddContactModalOpen(true);
  }

  const addProfilePic = () => {

  }

  return (
    <div className="Chat-container">
      <div className="contacts-card">
        <div className="heading-1"><span onClick={addProfilePic}><img src=""></img></span>{userEmail}</div>
        <h2 className="heading-2">Contacts<span data-tooltip-id="my-tooltip" data-tooltip-content="Add contact"><img onClick={handleAddContactModal} className="add-icon" alt="add contact icon" src={plus} /><Tooltip id="my-tooltip" /></span></h2>
        <div className="contacts-list">
          {contacts.map(contact => {
            return (
              <ContactCard key={contact} name={contact} />
            )
          })}
        </div>
      </div>
      <div className="chat-window">
        <ChatHeader name={activeContact} />
        {<MessagesBackground messages={activeContact ? messages : []} />}
        {activeContact ? <MessageInput socket={socket} /> : null}
      </div>

      <AddContactCard isOpen={addContactModalOpen} handleClose={() => setAddContactModalOpen(false)} />
      <AddProfilePicCard isOpen={addProfilePicModalOpen} handleClose={() => setAddProfilePicModalOpen(false)} />
    </div>
  );
};

export default ChatWindow;