const express = require("express")
const dotenv = require("dotenv");
const http = require('http')
const mongoose = require("mongoose");
const {Server} = require('socket.io');



const UserRoutes = require("./routes/user.js");
const ContactRoutes = require("./routes/contact.js");
const verifyToken = require("./middlewares/authJWT.js");
const MessageRoutes = require("./routes/messages.js");

const app = express();

try {
  mongoose.connect("mongodb+srv://mrjagadish1211:N7BwSKwDyACYK@cluster0.j1pcnwy.mongodb.net/?retryWrites=true&w=majority");
  console.log("Connected to MongoDB");
  const server =  http.createServer(app);
  const io = new Server(server, {cors: {origin :"*"}});

  
// establishing socketIO connection
io.on('connection', (socket) => {

  // this gets triggered when client side sends message
  socket.on('new message', (messageData, messageStatus) => {
    // get info about the sender and the recipient 
    console.log(messageData)
  })
})
} catch(error) {
  console.log(`${error} : Could not connect to MongoDB`)
}




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

// app.use("/app", MessageRoutes)


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});




dotenv.config();


