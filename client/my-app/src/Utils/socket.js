
import { io } from "socket.io-client";

const socket = io("http://localhost:3005", { autoConnect: true, transports: ['websocket'] });

export default socket;