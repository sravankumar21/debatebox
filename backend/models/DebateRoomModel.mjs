import mongoose from 'mongoose';

const DebateRoomSchema = new mongoose.Schema({
  topic: { type: String, required: true }, // New field for topic
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  participants: [String], // Array of participant names
  uniqueLink: {type: String, required: true}
});

const DebateRoom = mongoose.model('DebateRoom', DebateRoomSchema);

export default DebateRoom;
