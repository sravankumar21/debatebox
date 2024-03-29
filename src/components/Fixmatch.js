// FixMatchPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FixMatchPage = () => {
  const [teams, setTeams] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3333/addteams/teams');
        const data = await response.json();
        setTeams(data.teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const filterTeams = () => {
      const groupedTeams = {};
      teams.forEach((team) => {
        const key = `${team.participants.length}-${team.selectedTopic}`;
        if (!groupedTeams[key]) {
          groupedTeams[key] = [];
        }
        groupedTeams[key].push(team);
      });

      const pairs = [];
      Object.values(groupedTeams).forEach((group) => {
        if (group.length >= 2) {
          for (let i = 0; i < group.length - 1; i++) {
            for (let j = i + 1; j < group.length; j++) {
              pairs.push([group[i], group[j]]);
            }
          }
        }
      });
      setMatchedPairs(pairs);
    };

    filterTeams();
  }, [teams]);

  const handleFixMatch = (team1, team2) => {
    navigate('/chatroom', {
      state: {
        team1: team1.teamName,
        team2: team2.teamName,
        topic: team1.selectedTopic,
        participants: [...team1.participants, ...team2.participants]
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Fix Match</h2>
      <div className="row">
        {matchedPairs.map(([team1, team2]) => (
          <div key={`${team1._id}-${team2._id}`} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Match: {team1.teamName} vs {team2.teamName}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Participants: {team1.participants.map(participant => participant.name).join(', ')}</li>
                  <li className="list-group-item">Participants: {team2.participants.map(participant => participant.name).join(', ')}</li>
                </ul>
                <button className="btn btn-primary mt-3" onClick={() => handleFixMatch(team1, team2)}>Fix Match</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixMatchPage;
