import DebateTopic from '../models/debateTopicModel.mjs';

export const createDebateTopic = async (req, res) => {
  const { topic, credits } = req.body;

  try {
    const newDebateTopic = await DebateTopic.create({ topic, credits });
    res.status(201).json(newDebateTopic);
  } catch (error) {
    console.error('Error creating debate topic:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllDebateTopics = async (req, res) => {
  try {
    const debateTopics = await DebateTopic.find();
    res.status(200).json(debateTopics);
  } catch (error) {
    console.error('Error fetching debate topics:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
