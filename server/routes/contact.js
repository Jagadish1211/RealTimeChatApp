const express = require("express")

router = express.Router();

const { addContactsHandler, getContactsHandler } = require("../controllers/contacts");
const verifyToken = require("../middlewares/authJWT");

router.use(verifyToken);

router.post("/contacts", getContactsHandler)

router.post("/add-contact", addContactsHandler)

module.exports = router;