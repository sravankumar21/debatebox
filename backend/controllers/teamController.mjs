import Team from '../models/teamModel.mjs';

// Create a new team
export const createTeam = async (req, res) => {
  const { teamName, participants, selectedTopic } = req.body;

  try {
    // Validate request data
    if (!teamName || !participants || !Array.isArray(participants) || participants.length === 0 || !selectedTopic) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Check if team name already exists
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({ error: 'Team name already exists. Please choose a different team name.' });
    }

    // Create a new team
    const team = new Team({
      teamName,
      participants,
      selectedTopic
    });

    // Save the team to the database
    await team.save();

    // Return success response
    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a team by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.status(200).json({ team });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ teams });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a team
export const updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.status(200).json({ message: 'Team updated successfully', updatedTeam });
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a team
export const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.status(200).json({ message: 'Team deleted successfully', deletedTeam });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
