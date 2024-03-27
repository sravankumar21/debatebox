import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const ChatBox = () => {
  const location = useLocation();
  const { state } = location || {};
  const { team1, team2, topic } = state || {};

  const [socket, setSocket] = useState(null); // Added socket state
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3333'); // Connect to backend URL
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('joinRoom', team1, team2); // Emit joinRoom with team names
    });

    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [socket, team1, team2]);

  const sendMessage = () => {
    if (!socket || !messageInput.trim()) return;
    socket.emit('chat message', messageInput);
    setMessageInput('');
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          {team1 && team2 && <h2 className="text-center">{team1} vs {team2}</h2>}
          {topic && <h5 className="text-center">Topic: {topic}</h5>}
        </div>
        <div className="card-body message-container">
          {/* Display chat messages */}
          {messages.map((message, index) => (
            <div key={index} className="message">{message}</div>
          ))}
        </div>
        <div className="card-footer input-container">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="form-control message-input"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="btn btn-primary send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
