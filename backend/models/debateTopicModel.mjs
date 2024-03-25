import mongoose from 'mongoose';

const debateTopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  credits: {
    type: String,
    required: true
  }
});

const DebateTopic = mongoose.model('DebateTopic', debateTopicSchema);

export default DebateTopic;
