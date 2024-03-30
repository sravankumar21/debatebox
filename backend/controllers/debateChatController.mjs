import DebateChat from '../models/DebateChatModel.mjs';
import DebateRoom from '../models/DebateRoomModel.mjs';

// Create new debate chat
export const createDebateChat = async (req, res) => {
  try {
    const { topic, team1, team2, participants, messages } = req.body;
    if (!topic || !team1 || !team2) {
      return res.status(400).json({ error: 'Topic and team names are required' });
    }
    const newDebateChat = new DebateChat({ topic, team1, team2, participants, messages });
    await newDebateChat.save();
    res.status(201).json(newDebateChat);
  } catch (error) {
    console.error('Error creating debate chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all debate chats
export const getAllDebateChats = async (req, res) => {
  try {
    const debates = await DebateChat.find();
    res.status(200).json(debates);
  } catch (error) {
    console.error('Error fetching debate chats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get debate chat by ID
export const getDebateChatById = async (req, res) => {
  try {
    const debate = await DebateChat.findById(req.params.id);
    if (!debate) {
      return res.status(404).json({ error: 'Debate chat not found' });
    }
    res.json(debate);
  } catch (error) {
    console.error('Error fetching debate chat by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params.roomId;
    const debate = await DebateRoom.findOne({ room: roomId });
    res.json(debate);
  } catch (error) {
    console.error('Error fetching room details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}