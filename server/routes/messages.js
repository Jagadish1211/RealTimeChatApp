const express = require("express")
router = express.Router();

const {sendMessageHandler, getConversationHandler} = require("../controllers/message")
const verifyToken = require("../middlewares/authJWT");

router.get("/message", (req,res) => {
    res.status(200).send({message : "This router is working"})
})

router.use(verifyToken);

router.post("/send-message", sendMessageHandler);

router.post("/get-messages", getConversationHandler);

module.exports = router;