import React from "react";
import { useDispatch } from 'react-redux';

import { setActiveContact } from "../../Features/Contacts/ContactSlice";

import "./ContactCard.scss";


const ContactCard = ({name}) => {
    const dispatch = useDispatch();

    const handleOpenChatWindow = () => {
        // set this contact as the active contact
        dispatch(setActiveContact(name))
      };
      
return (
    <div className="contact" onClick={handleOpenChatWindow}>
        <p>
           {name}
        </p>
    </div>
)
};


export default ContactCard;