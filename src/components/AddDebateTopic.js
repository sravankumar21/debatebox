import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library

const AddDebateTopic = () => {
  const [topic, setTopic] = useState('');
  const [credits, setCredits] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an HTTP POST request to the backend API
      const response = await axios.post('http://localhost:3333/addtopic/debateTopics', {
        topic,
        credits
      });
      console.log('Debate topic added successfully:', response.data);
      // Display alert after successful submission
      window.alert('Debate topic submitted successfully!');
      // Reset form fields after successful submission
      setTopic('');
      setCredits('');
    } catch (error) {
      console.error('Error adding debate topic:', error);
      // Handle error scenario here
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Debate Topic</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="topic" className="form-label">Debate Topic</label>
          <input
            type="text"
            className="form-control"
            id="topic"
            placeholder="Enter debate topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="credits" className="form-label">Credits</label>
          <input
            type="text"
            className="form-control"
            id="credits"
            placeholder="Enter credits for the topic"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddDebateTopic;
