import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ChatRoomPage = () => {
  const location = useLocation();
  const { state } = location || {};
const { team1, team2, topic, participants } = state || {};


  const [invitedParticipants, setInvitedParticipants] = useState([]);
  const [chatboxLink, setChatboxLink] = useState('');

 // Function to handle inviting a participant
const handleInvite = async (email) => {
  // Generate chatbox link
  const token = Math.random().toString(36).substr(2, 10);
  const generatedLink = `http://localhost:3000/chatbox/${token}`;
  setChatboxLink(generatedLink);

  try {
    // Send invitation email
    const response = await fetch('http://localhost:3333/invite/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, chatboxLink: generatedLink }),
    });
    if (response.ok) {
      // Update invited participants list if email sending successful
      setInvitedParticipants([...invitedParticipants, email]);
    } else {
      console.error('Failed to send invitation email');
    }
  } catch (error) {
    console.error('Error sending invitation email:', error);
  }
};


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
                      <button className="btn btn-info" disabled>
                        Invited
                      </button>
                    ) : (
                      <button className="btn btn-primary" onClick={() => handleInvite(participant.email)}>
                        Invite
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {/* Display chatbox link if generated */}
              {chatboxLink && (
                <div className="mt-3">
                  <p>Chatbox Link:</p>
                  <div className="input-group">
                    <input type="text" className="form-control" value={chatboxLink} readOnly />
                    <button className="btn btn-dark" onClick={() => navigator.clipboard.writeText(chatboxLink)}>Copy</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;