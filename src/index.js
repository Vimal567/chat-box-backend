const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const { registerChatSockets } = require("./sockets/chat.socket");

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../', '.env') });
const port = process.env.PORT || 3000;

// Initialize express app
const app = express();
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Default Route
app.get('/', (req, res) => res.send("API is working!"));

// API Routes
const chats = require('./routes/chats.route');
app.use('/api/chats', chats);

// Create HTTP server to support both Express and Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: '*', // Change this to your frontend's URL
    methods: ['GET', 'POST']
  }
});

// Initialise Web Socket
registerChatSockets(io);

// Start the server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
