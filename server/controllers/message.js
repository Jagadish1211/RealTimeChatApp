const User = require("../models/user.js");
const Message = require("../models/messages.js");


exports.sendMessageHandler = (req, res) => {
    const {message, sender, target} = req.body

    //check if receiver exists
    User.findOne({email: target}).exec((err, user) => {
        if (err) {
            return res.status(500).send({message: "There was a problem sending the message"})
        } else {
            if (!user) {
                return res.status(400).send({message : "The receiver does not exist."})
            } else {
                // create a new message document

                User.findOne({email: sender}).exec((error, senderUser) => {
                const newMessage = new Message({
                    message : message,
                    sender : senderUser._id,
                    target: user._id
                })

                newMessage.save()
                user.conversations.unshift(newMessage)
                user.save().then(() => {
                    return res.status(200).send({message : "Message sent successfully"});
                }).catch (() => {
                    return res.status(500).send({message: "There was a problem sending the message"})
                })

                senderUser.conversations.unshift(newMessage)
                senderUser.save()
            })
            }
        }
    })
}

exports.getConversationHandler = (req,res) => {
    const { sender, target } = req.body;
    // find the user in DB
    User.findOne({email : sender}).populate("conversations").exec((err, user) => {
     if (err) return res.status(500).send({"message" : "There was a problem getting the conversation"});
     else if (!user) return res.status(404).send({"message" : "User not found"});
     else {
        // if no messages found , then return empty array
        if (user.conversations.length === 0 ) return res.status(400).send({"message" : "No conversations found"});
        else {
            // filter the messages using the target/contact email
            const messages = user.conversations
            console.log(messages,"this is")
            messages.filter((message) => {
                message.target.email === target
            })

            return res.status(200).send({"message" : {
                messages : messages
            } })
        }
     }   
    })
}