const express = require("express")

router = express.Router();

//import {signUpHandler, loginHandler} from "../controllers/authentication.js";

const { signUpHandler, loginHandler } = require("../controllers/authentication");


router.post("/signup", signUpHandler);

router.post("/login", loginHandler);

module.exports = router;