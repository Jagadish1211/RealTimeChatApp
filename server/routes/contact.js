const express = require("express")

router = express.Router();

const { addContactsHandler, getContactsHandler, deleteContactsHandler } = require("../controllers/contacts");
const verifyToken = require("../middlewares/authJWT");

router.use(verifyToken);

router.post("/contacts", getContactsHandler)

router.post("/add-contact", addContactsHandler)

router.post("/delete-contact", deleteContactsHandler)

module.exports = router;