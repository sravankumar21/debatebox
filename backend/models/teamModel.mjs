import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true
  },
  participants: [{
    name: String,
    email: String
  }],
  selectedTopic: String
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
