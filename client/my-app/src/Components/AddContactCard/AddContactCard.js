import React, { useState , memo } from "react";
import Modal from '@mui/material/Modal';

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import {useCookies} from 'react-cookie';
import { useDispatch } from 'react-redux';

import "./AddContactCard.scss"
import axios from "axios";

import { updateContacts } from "../../Features/Contacts/ContactSlice";


const AddContactCard = ({ isOpen, className = "modal-container", handleClose }) => {
    const [contactEmail, setContactEmail] = useState("");
    const [cookies] = useCookies(['userInfo']);
    const dispatch = useDispatch();

    const handleAddContact = () => {
        // contactEmail , email
        const userEmail =  cookies.accountDetails.email;
        const accessToken = cookies.accountDetails.accessToken;
        const options = { headers: { "Content-Type": "application/json", "authorization" : `Bearer ${accessToken}`} };
        axios.post('http://localhost:5000/app/add-contact', {
            email : userEmail,
            contactEmail
        }, options).then(res => {
            dispatch(updateContacts(res.data.contacts));
            setContactEmail('');
            handleClose();
        }).catch(err => console.log(err));
    }

    return <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <div className="add-contact-card-container">
                <TextField
                    required
                    id="outlined-required"
                    label="Contact email"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                />
                <Button variant="outlined" className="button" onClick={handleAddContact}>Add Contact</Button>
            </div>
        </Modal>

}

export default memo(AddContactCard);