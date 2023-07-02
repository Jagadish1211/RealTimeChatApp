
const User = require("../models/user.js");
const Contact = require("../models/contacts.js");

exports.addContactsHandler = (req, res) => {
    const contact = req.body.contactEmail;
    // find the user

    User.findOne({email: req.body.email}).exec(
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
                            // add contact to user
                            user.contacts.push(contact);
                            user.save();
                            return res.status(200).send({message: "Contact added successfully"});
                        }
                    }  
                } 
        }
    )

};

exports.getContactsHandler = (req, res) => {
    User.findOne({ email: req.body.email }).exec(
        (err, user) => {
            if (err) {
                return res.status(500).send({ message: "There was a problem getting your contacts." })
            } else if (user) {
                return res.status(200).send({ contacts   : user.contacts });
            }

        }

    )

};