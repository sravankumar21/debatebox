import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatBox = ({ chatroomId, team1, team2, topic }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3333');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;
  
    // Listen for incoming messages
    socket.on('chat message', (message) => {
      if (message.user && message.user.username) {
        setMessages((prevMessages) => [...prevMessages, `${message.user.username}: ${message.msg}`]);
      } else {
        // Handle the case where the message object does not contain the expected user information
        console.error('Received message without username:', message);
      }
    });
  
    return () => {
      socket.off('chat message');
    };
  }, [socket]);
  

  const sendMessage = () => {
    if (!socket || !messageInput.trim()) return;
    socket.emit('chat message', messageInput);
    setMessageInput('');
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2 className="text-center">{team1} vs {team2}</h2>
          <h5 className="text-center">Topic: {topic}</h5>
        </div>
        <div className="card-body message-container">
          {messages.map((msg, index) => (
            <div key={index} className="message">{msg}</div>
          ))}
        </div>
        <div className="card-footer input-container">
          <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="form-control message-input" placeholder="Type your message..." />
          <button onClick={sendMessage} className="btn btn-primary send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
