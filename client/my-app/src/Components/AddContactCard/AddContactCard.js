import React, { useState , memo } from "react";
import Modal from '@mui/material/Modal';

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

import "./AddContactCard.scss"


const AddContactCard = ({ isOpen, className = "modal-container", handleClose }) => {
    const [contactEmail, setContactEmail] = useState("");

    const handleAddContact = () => {
        setContactEmail("")
        console.log(contactEmail, "this is");
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