const express = require("express")
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const UserRoutes = require("./routes/user.js");
const ContactRoutes = require("./routes/contact.js");
const verifyToken = require("./middlewares/authJWT.js");
const MessageRoutes = require("./routes/messages.js");


const app = express();

try {
    mongoose.connect("mongodb+srv://mrjagadish1211:N7BwSKwDyACYK@cluster0.j1pcnwy.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to MongoDB");
} catch(error) {
    console.log(`${error} : Could not connect to MongoDB`)
}

dotenv.config();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use("/app", UserRoutes);

app.use("/app", ContactRoutes);

app.use("/app", MessageRoutes)


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});