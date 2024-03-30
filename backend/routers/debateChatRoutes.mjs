import express from 'express';
import { createDebateChat, getAllDebateChats, getDebateChatById, getRoomDetails } from '../controllers/debateChatController.mjs';

const router = express.Router();

// Create a new debate chat
router.post('/create', createDebateChat);

// Get all debate chats
router.get('/all', getAllDebateChats);

// Get debate chat by ID
router.get('/:id', getDebateChatById);

router.get('/room/:roomId', getRoomDetails);

export default router;
