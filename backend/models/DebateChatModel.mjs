// models/DebateChat.js
const mongoose = require('mongoose');

const DebateChatSchema = new mongoose.Schema({
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

module.exports = mongoose.model('DebateChat', DebateChatSchema);
