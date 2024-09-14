const express = require("express")
const dotenv = require("dotenv").config();
const http = require('http')
const mongoose = require("mongoose");
const {Server} = require('socket.io');
const cors = require('cors');

const UserRoutes = require("./routes/user.js");
const ContactRoutes = require("./routes/contact.js");
const verifyToken = require("./middlewares/authJWT.js");
const MessageRoutes = require("./routes/messages.js");
const profileImageRoute = require("./routes/profileImage.js");
const { sendMessageHandler } = require("./controllers/message.js");
const cookieParser = require('cookie-parser');

const app = express();
const websocketApp = express();
const WEBSOCKETPORT = process.env.WEBSOCKETPORT || 3005;
const PORT = process.env.PORT || 5000;

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  const server =  http.createServer(websocketApp).listen(WEBSOCKETPORT);
  const io = new Server(server, {cors: {origin :"*"}});
// establishing socketIO connection
io.on('connection', (socket) => {
  // first create a room with email of user

  socket.on("join room", (useEmail) => {
    const room = `private:${useEmail}`;
    socket.join(room);
  })

  socket.on('send message', (messageData, messageStatus) => {
    
    const {sender, message, target} =  messageData;
    const room = `private:${target}`
    socket.to(room).emit('new message', message, sender)
    sendMessageHandler(message, sender, target);
  })
  
})
} catch(error) {
  console.log(`${error} : Could not connect to MongoDB`)
}

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());


app.use("/app", UserRoutes);

app.use("/app", ContactRoutes);

app.use("/app", MessageRoutes)

app.use("/uploads", profileImageRoute);




app.get("/", (req, res) => {
    res.status(200).send("Server is running sucessfully");
});

app.listen(PORT);


