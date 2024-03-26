import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const ChatBox = () => {
  const { token } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  // eslint-disable-next-line
  const [team1, setTeam1] = useState('');
  // eslint-disable-next-line
  const [team2, setTeam2] = useState('');
  // eslint-disable-next-line
  const [topic, setTopic] = useState('');
  // const location = useLocation();
  // const { state } = location || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/addteams/teams}`); // Adjust URL and endpoint as per your backend
        if (response.ok) {
          const data = await response.json();
          setTeam1(data.team1);
          setTeam2(data.team2);
          setTopic(data.topic);
        } else {
          console.error('Failed to fetch team and topic details');
        }
      } catch (error) {
        console.error('Error fetching team and topic details:', error);
      }
    };

    fetchData();

    const newSocket = io('http://localhost:3333'); // Connect to backend URL
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('joinRoom', token);
    });

    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [socket, token]);

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
          {messages.map((msg, index) => (
            <div key={index} className="message">{msg.content}</div>
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
