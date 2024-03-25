// ChatRoomPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChatRoomPage = () => {
  const location = useLocation();
  const { state } = location;
  const { team1, team2, topic, participants } = state;

  const [invitedParticipants, setInvitedParticipants] = useState([]);
  const [readyParticipants, setReadyParticipants] = useState([]);

  // Function to handle inviting a participant
  const handleInvite = (email) => {
    // Implement logic to send invite email
    // After sending the invite, update the invitedParticipants state
    setInvitedParticipants([...invitedParticipants, email]);
  };

  // Function to handle marking a participant as ready
  const handleReady = (email) => {
    // Update the readyParticipants state
    setReadyParticipants([...readyParticipants, email]);
  };

  useEffect(() => {
    // Check if participants array is defined and not empty
    if (participants && participants.length > 0) {
      // Check if all participants are ready
      if (readyParticipants.length === participants.length) {
        // Implement logic to show start chat button
        // This could involve setting a state to true to render the start chat button
      }
    }
  }, [readyParticipants, participants]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Chat Room: {team1} vs {team2}</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Topic: {topic}</h5>
              <ul className="list-group list-group-flush">
              {participants && participants.map((participant) => (
  <li key={participant.email} className="list-group-item d-flex justify-content-between align-items-center">
    <div>
      <div style={{ color: participant.name === 'Admin' ? 'red' : 'black' }}>{participant.name}</div>
      <div>{participant.email}</div>
    </div>
    {invitedParticipants.includes(participant.email) ? (
      <button className="btn btn-success" onClick={() => handleReady(participant.email)}>
        Ready!!
      </button>
    ) : (
      <button className="btn btn-primary" onClick={() => handleInvite(participant.email)}>
        Invite
      </button>
    )}
  </li>
))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Render Start Chat button when all participants are ready */}
      {participants && readyParticipants.length === participants.length && (
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-success">Start Chat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoomPage;
