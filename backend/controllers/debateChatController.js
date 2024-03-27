// controllers/debateChatController.js
const DebateChat = require('../models/DebateChatModel.mjs');

// Create new debate chat
exports.createDebateChat = async (req, res) => {
  try {
    const { team1, team2, participants } = req.body;
    const newDebateChat = new DebateChat({ team1, team2, participants });
    await newDebateChat.save();
    res.status(201).json(newDebateChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all debate chats
exports.getAllDebateChats = async (req, res) => {
  try {
    const debates = await DebateChat.find();
    res.json(debates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get debate chat by ID
exports.getDebateChatById = async (req, res) => {
  try {
    const debate = await DebateChat.findById(req.params.id);
    if (!debate) {
      return res.status(404).json({ error: 'Debate chat not found' });
    }
    res.json(debate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
