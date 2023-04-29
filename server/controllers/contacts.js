
const User = require("../models/user.js");
const Contact = require("../models/contacts.js");

exports.addContactsHandler = (req, res) => {
    const contact = req.body.contactEmail;
    // find the user

    User.findOne({email: req.body.email}).populate('contacts').exec(
        (err, user) => {
            if (err) {
                return res.status(500).send({message: "There was a problem adding the contact"})
            } else {
                if (user) {
                    // check if contact already exists
                        if (user.contacts.includes(contact)) {
                            return res
                                .status(400)
                                .send({message: "Contact already exists"})
                        }
                        else {
                            // create contact model using schema
                            const newContact = new Contact({
                                email: contact,
                                user: user._id
                            });
                            newContact.save();
                            // add contact to user
                            user.contacts.push(newContact);
                            user.save();
                            return res.status(200).send({message: "Contact added successfully"});
                        }
                    }  
                } 
        }
    )

};

exports.getContactsHandler = (req, res) => {
    User.findOne({ email: req.body.email }).populate('contacts').exec(
        (err, user) => {
            if (err) {
                return res.status(500).send({ message: "There was a problem getting your contacts." })
            } else if (user) {
                return res.status(200).send({ contacts   : user.contacts });
            }

        }

    )

};