import express from 'express';
const router = express.Router();

// Import controller functions for CRUD operations
import { createTeam, getTeamById, getAllTeams, updateTeam, deleteTeam } from '../controllers/teamController.mjs';

// Route to handle team creation
router.post('/teams', createTeam);

// Route to get a team by ID
router.get('/teams/:id', getTeamById);

// Route to get all teams
router.get('/teams', getAllTeams);

// Route to update a team by ID
router.put('/teams/:id', updateTeam);

// Route to delete a team by ID
router.delete('/teams/:id', deleteTeam);

export default router;
