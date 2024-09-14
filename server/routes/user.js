const express = require("express")

router = express.Router();

//import {signUpHandler, loginHandler} from "../controllers/authentication.js";

const { signUpHandler, loginHandler, logoutHandler, refreshTokenHandler } = require("../controllers/authentication");

router.post("/signup", signUpHandler);

router.post("/login", loginHandler);

router.post("/logout", logoutHandler);

router.get("/refresh", refreshTokenHandler);

module.exports = router;