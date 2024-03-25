import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import adminpassport from './config/passport_config_admin.js';
import connectDB from './config/db.mjs';
import adminRouter from './routers/authRoutes.mjs';
import teamRouter from './routers/teamRoutes.mjs';
import createDebateRouter from './routers/debateTopicRoutes.mjs';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
}); // Initialize Socket.IO with CORS configuration


// server.js




io.on('connection', (socket) => {
  console.log('A user connected');

// Inside the 'connection' event handler
socket.on('chat message', (msg) => {
  console.log('message: ' + msg);
  io.emit('chat message', { user: socket.request.user, msg }); // Include user info
});

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(adminpassport.initialize());

app.use('/admins', adminRouter);
app.use('/addteams', teamRouter);
app.use('/addtopic', createDebateRouter);

connectDB();

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
