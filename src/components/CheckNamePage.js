import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckNamePage = () => {
  const [name, setName] = useState(''); // Changed state variable to 'name'
  const [teams, setTeams] = useState([]);
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://debatebox-api.rka.li/addteams/teams');
        const teamsData = response.data.teams;
        const participantsNames = teamsData.reduce((acc, team) => {
          team.participants.forEach((participant) => {
            acc.push(participant.name.toLowerCase());
          });
          return acc;
        }, []);
        setTeams(participantsNames);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleChange = (e) => {
    setName(e.target.value); // Set the entered name to state variable 'name'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameFound = teams.includes(name.toLowerCase());
    setIsNameValid(isNameFound);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form onSubmit={handleSubmit} className="w-50">
        <div className="form-group">
          <label htmlFor="formName">Enter Your Name:</label>
          <input type="text" className="form-control" id="formName" placeholder="Name" value={name} onChange={handleChange} /> {/* Changed placeholder to 'Name' */}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {isNameValid && (
        <div>
          <p className="mt-3">Name is valid. You can proceed to the chatbox.</p>
          <a href="/chatbox" className="btn btn-primary">Go to Chatbox</a>
          
        </div>
      )}
    </div>
  );
};

export default CheckNamePage;
