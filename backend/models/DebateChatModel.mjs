import mongoose from 'mongoose';

const DebateChatSchema = new mongoose.Schema({
  topic: { type: String, required: true }, // New field for topic
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  participants: [String], // Array of participant names
  messages: [
    {
      sender: { type: String, required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const DebateChat = mongoose.model('DebateChat', DebateChatSchema);

export default DebateChat;
