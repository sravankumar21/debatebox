// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.mjs';
import adminpassport from './config/passport_config_admin.js';
import inviteRoutes from './routers/inviteRoutes.mjs';
import teamRouter from './routers/teamRoutes.mjs';
import adminRouter from './routers/authRoutes.mjs';
import createDebateRouter from './routers/debateTopicRoutes.mjs';
import debateChatRouter from './routers/debateChatRoutes.mjs'; // Import debate chat routes

dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
}); // Initialize Socket.IO with CORS configuration

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(adminpassport.initialize());

// Routes
app.use('/admins', adminRouter);
app.use('/addteams', teamRouter);
app.use('/addtopic', createDebateRouter);
app.use('/invite', inviteRoutes);
app.use('/create', debateChatRouter); // Use debate chat routes

// Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('Message:', msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => console.log('Server started on port:', PORT)); // Log server start with port number
