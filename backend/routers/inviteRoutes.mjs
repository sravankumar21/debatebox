// inviteRoutes.mjs

import express from 'express';
import { sendInvitationEmail } from '../controllers/inviteController.mjs';

const router = express.Router();

// POST request to send invitation email
router.post('/invite', sendInvitationEmail);

export default router;
