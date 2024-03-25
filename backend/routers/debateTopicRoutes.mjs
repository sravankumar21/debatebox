import express from 'express';
const router = express.Router();

import { createDebateTopic, getAllDebateTopics } from '../controllers/debateTopicController.mjs';

router.post('/debateTopics', createDebateTopic);
router.get('/debateTopics', getAllDebateTopics);

export default router;
