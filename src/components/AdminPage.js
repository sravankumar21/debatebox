import React, { useState, useEffect } from 'react';
import { BiBarChart } from 'react-icons/bi';

import ADMINImage1 from '../images/ADMIN.jpeg';

const AdminDashboard = () => {
  const [teamsCount, setTeamsCount] = useState({ teamOfTwo: 0, teamOfThree: 0, teamOfFour: 0 });

  useEffect(() => {
    const fetchTeamsCount = async () => {
      try {
        const response = await fetch('http://localhost:3333/addteams/teams'); // Replace URL with your backend API endpoint
        const data = await response.json();

        // Calculate team counts
        const teamOfTwoCount = data.teams.filter(team => team.participants.length === 2).length;
        const teamOfThreeCount = data.teams.filter(team => team.participants.length === 3).length;
        const teamOfFourCount = data.teams.filter(team => team.participants.length === 4).length;

        setTeamsCount({ teamOfTwo: teamOfTwoCount, teamOfThree: teamOfThreeCount, teamOfFour: teamOfFourCount });
      } catch (error) {
        console.error('Error fetching teams count:', error);
      }
    };

    fetchTeamsCount();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          {/* Left Side */}
          <a className="navbar-brand" href="/">
            <BiBarChart style={{ marginRight: '20px', marginLeft: '45px' }} />Admin Dashboard
          </a>
          
         {/* Right Side */}
{/* Right Side */}
<ul className="navbar-nav ms-auto">
  <li className="nav-item">
    <a className="nav-link" href="/manageteams" style={{ paddingRight: '18px' }}>Manage Teams</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/fixmatch" style={{ paddingRight: '18px' }}>Fix Match</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/chatroom" style={{ paddingRight: '18px' }}>ChatRoom</a>
  </li>
  <li className="nav-item">
    <a className="nav-link btn btn-danger" href="/" style={{ paddingRight: '18px' }}>Logout</a>
  </li>
</ul>


        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5 mb-4">
        <div className="row justify-content-center align-items-center">
          {/* Admin Image */}
          <div className="col-md-4 text-center">
            <img
              src={ADMINImage1}
              className="img-fluid rounded"
              alt=''
              style={{ maxWidth: '120%', height: 'auto', borderRadius: '10px', marginTop: '4%' }}
            />
          </div>

          {/* Live Teams Count Card */}
          <div className="col-md-8" style={{ width: '100%', marginTop: '6%' }}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center" style={{ marginTop: '1%' , marginBottom: '1%' }}>Live Teams Count</h5>
                <div className="row">
                  <div className="col-md-4">
                    <p className="text-center">Team of Two: <strong>{teamsCount.teamOfTwo}</strong></p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-center">Team of Three: <strong>{teamsCount.teamOfThree}</strong></p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-center">Team of Four: <strong>{teamsCount.teamOfFour}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
