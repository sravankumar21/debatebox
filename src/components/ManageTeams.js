import React, { useState, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';

const ManageTeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    // Function to fetch all teams from the backend
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3333/addteams/teams');
        const data = await response.json();
        setTeams(data.teams);
        setFilteredTeams(data.teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleDelete = async (teamId) => {
    try {
      // Delete the team from the backend
      await fetch(`http://localhost:3333/addteams/teams/${teamId}`, {
        method: 'DELETE',
      });

      // Update the state to remove the deleted team
      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== teamId));
      setFilteredTeams((prevFilteredTeams) =>
        prevFilteredTeams.filter((team) => team._id !== teamId)
      );
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const handleFilter = (filterType) => {
    // Filter teams based on the filter type
    if (filterType === 'teamOfTwo') {
      setFilteredTeams(teams.filter((team) => team.participants.length === 2));
    } else if (filterType === 'teamOfThree') {
      setFilteredTeams(teams.filter((team) => team.participants.length === 3));
    } else if (filterType === 'teamOfFour') {
      setFilteredTeams(teams.filter((team) => team.participants.length === 4));
    } else {
      setFilteredTeams(teams); // Show all teams if no filter is applied
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage Teams</h2>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary me-2" onClick={() => handleFilter('teamOfTwo')}>
          Team of Two
        </button>
        <button className="btn btn-primary me-2" onClick={() => handleFilter('teamOfThree')}>
          Team of Three
        </button>
        <button className="btn btn-primary me-2" onClick={() => handleFilter('teamOfFour')}>
          Team of Four
        </button>
        <button className="btn btn-success" onClick={() => handleFilter('')}>
          All Teams
        </button>
      </div>
      <div className="row">
        {filteredTeams.map((team) => (
          <div key={team._id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{team.teamName} - {team.selectedTopic}</h5>
                <ul className="list-group list-group-flush">
                  {team.participants.map((participant, index) => (
                    <li key={index} className="list-group-item">
                      {participant.name} - {participant.email}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-danger mt-3" onClick={() => handleDelete(team._id)}>
                  <BiTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTeamsPage;
