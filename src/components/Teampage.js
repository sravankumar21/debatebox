import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Teampage = () => {
  const [teamSize, setTeamSize] = useState(2); // Default team size is 2
  const [participants, setParticipants] = useState([{ name: '', email: '' }, { name: '', email: '' }]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [teamName, setTeamName] = useState(''); // State for Team Name input
  const [topics, setTopics] = useState([]);
  const [uniqueTeamNames, setUniqueTeamNames] = useState([]); // State to store unique team names

  useEffect(() => {
    fetchTopics();
    fetchUniqueTeamNames(); // Fetch unique team names on component mount
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get('http://localhost:3333/addtopic/debateTopics');
      setTopics(response.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const fetchUniqueTeamNames = async () => {
    try {
      const response = await axios.get('http://localhost:3333/addteams/uniqueTeamNames');
      setUniqueTeamNames(response.data);
    } catch (error) {
      console.error('Error fetching unique team names:', error);
    }
  };

  const handleTeamSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setTeamSize(newSize);

    // Reset participants array
    setParticipants(Array.from({ length: newSize }, () => ({ name: '', email: '' })));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedParticipants = [...participants];
    updatedParticipants[index][name] = value;
    setParticipants(updatedParticipants);
  };

  const handleTopicSelect = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = async () => {
    let formFilled = true;
  
    participants.forEach(participant => {
      if (!participant.name || !participant.email) {
        formFilled = false;
      }
    });
  
    if (!selectedTopic || !formFilled || !teamName) {
      window.alert('Please fill out the form properly.');
    } else {
      // Check if the entered team name is unique
      if (uniqueTeamNames.includes(teamName)) {
        window.alert('Please enter a different team name.');
      } else {
        try {
          // Make a POST request to the backend API to create a team
          await axios.post('http://localhost:3333/addteams/teams', { participants, selectedTopic, teamName });
          
          // Display success message
          window.alert('Team created successfully.');
          
          // Reset form after successful creation
          setParticipants([{ name: '', email: '' }, { name: '', email: '' }]);
          setSelectedTopic('');
          setTeamName('');
        } catch (error) {
          console.error('Error creating team:', error);
          window.alert('Failed to create team. Please try again.');
        }
      }
    }
  };
  

  return (
    <div className="container mt-4">
      <h1 className="text-center">Team Page</h1>
      <div className="mb-3">
        <label htmlFor="teamSizeSelect" className="form-label">Select Team Size:</label>
        <select className="form-select" id="teamSizeSelect" onChange={handleTeamSizeChange} value={teamSize}>
          <option value="2">Team of Two</option>
          <option value="3">Team of Three</option>
          <option value="4">Team of Four</option>
        </select>
      </div>
      <div className="row">
        {participants.map((participant, index) => (
          <div key={index} className={`col-${12 / teamSize}`}>
            <div className="mb-3">
              <label htmlFor={`participantName${index + 1}`} className="form-label fw-bold">Participant {index + 1} Name:</label>
              <input type="text" className="form-control" id={`participantName${index + 1}`} name="name" value={participant.name} onChange={(e) => handleInputChange(index, e)} />
            </div>
            <div className="mb-3">
              <label htmlFor={`participantEmail${index + 1}`} className="form-label fw-bold">Participant {index + 1} Email:</label>
              <input type="email" className="form-control" id={`participantEmail${index + 1}`} name="email" value={participant.email} onChange={(e) => handleInputChange(index, e)} />
            </div>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <label htmlFor="debateTopicSelect" className="form-label">Select Debate Topic:</label>
        <select className="form-select" id="debateTopicSelect" onChange={handleTopicSelect} value={selectedTopic}>
          <option value="">Select Topic</option>
          {topics.map((topic, index) => (
            <option key={index} value={topic.topic}>{topic.topic}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="teamNameInput" className="form-label">Team Name:</label>
        <input type="text" className="form-control" id="teamNameInput" placeholder="Enter Team Name" value={teamName} onChange={handleTeamNameChange} />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Teampage;

