const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// import User from "..models/user.js";

const User = require("../models/user.js");

exports.signUpHandler = (req, res, next) => {

  // check if user already exists
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: "There was a problem signing up" })
    } else {
      if (user) {
        return res.status(400).send({ message: "User already exists, please login" })
      } else {

        // if user does not exist, create new user
        const newUser = new User({
          
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        });

        newUser.save((err, user) => {
          if (err) {
            console.log(err)
            return res.status(500).send({ message: err });
          } else {
            res.status(200).send({ message: "User registered successfully!" });
          }
        });
      }
    }
  })
};

exports.loginHandler = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "There was a problem finding the user." });
    } else {
      if (!user) {
        return res.status(404).send({ message: "No user found." });
      }
    }

    // compare password if user found
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        authToken: null,
        message: "Invalid password",
      });
    }

    // Sign token with user ID
    const authToken = jwt.sign(
      {
        id: user.email,
      },
      "THIS_IS_API_SECRET",
      {
        expiresIn: 600, // expires in 10 mins
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.email,
      }, "THIS_IS_API_SECRET_REFRESH_TOKEN", {
        expiresIn: 86400, // expires in 24 hours
      }
    );

    res.cookie("refreshToken", refreshToken, { httpOnly : true, secure : true, sameSite : "none"})

    // now send response with token and login message
    res.status(200).send({
      user: {
        email: user.email,
      },
      message: "Login successful",
      accessToken: authToken,
      refreshToken: refreshToken
    });
  });
};
