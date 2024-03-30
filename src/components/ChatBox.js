import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useHref } from 'react-router-dom';
import SeeTopic from '../components/Seetopic';
import io from 'socket.io-client';
// import { useHref } from 'react-router-dom';

const ChatBox = () => {
  const location = useLocation();
  const { state } = location || {};
  const { team1, team2, topic, participants, isAdmin } = state || {}; // Destructure participants from state

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debates, setDebates] = useState([]);
  // const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});
  const { name, token } = useParams();
  const history = useHref();
  // console.log(name, token);

  useEffect(() => {
    const newSocket = io('http://localhost:3333');
    setSocket(newSocket);
    const fetchData = async () => {
      try {
        // const roomId = document.location.pathname.split('/').pop();
        const response = await fetch(`http://localhost:3333/create/room/${token}`);
        const data = await response.json();
        setRoomInfo(data);
        console.log(data);
      } catch (error) {
        // console.error('Error fetching debates:', error);
      }
    }
    fetchData();


    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('joinRoom', team1, team2);
    });

    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [socket, team1, team2]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3333/create/all');
        const data = await response.json();
        setDebates(data);
      } catch (error) {
        console.error('Error fetching debates:', error);
      }
    };

    fetchData();
  }, []);

  const sendMessage = () => {
    if (!socket || !messageInput.trim()) return;
    socket.emit('chat message', name+": "+messageInput);
    setMessageInput('');
  };

  const openTopicModal = (debate) => {
    setSelectedTopic(debate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
    setIsModalOpen(false);
  };

  const saveChat = async () => {
    if (!isAdmin) return;

    try {
      const response = await fetch('http://localhost:3333/create/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: topic,
          team1: team1,
          team2: team2,
          participants: participants ? participants.map(participant => participant.name) : [], // Check if participants exists
          messages: messages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save chat');
      }

      const updatedResponse = await fetch('http://localhost:3333/create/all');
      const updatedData = await updatedResponse.json();
      setDebates(updatedData);
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container-fluid h-100 mt-4">
      <div className="row h-100">
        <div className="col-md-4 h-100">
          <div className="card h-100">
            <div className="card-header">
              <h2 className="text-center">Read Debates</h2>
            </div>
            <div className="card-body debate-list overflow-auto">
              {debates.map((debate, index) => (
                <div key={index} className="debate-topic" onClick={() => openTopicModal(debate)}>
                  <p className="mb-0">
                    <a href="#" onClick={(e) => { e.preventDefault(); openTopicModal(debate); }}>{debate.topic}</a>
                  </p>
                  <hr className="my-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8 h-100">
          <div className="card h-100">
            <div className="card-header">
              {roomInfo.team1 && roomInfo.team2 && <h2 className="text-center">{roomInfo.team1} vs {roomInfo.team2}</h2>}
              {roomInfo.topic && <h5 className="text-center">Topic: {roomInfo.topic}</h5>}
              {/* {team1 && team2 && <h2 className="text-center">{team1} vs {team2}</h2>}
              {topic && <h5 className="text-center">Topic: {topic}</h5>} */}
            </div>
            <div className="card-body message-container overflow-auto" style={{ minHeight: '70vh' }}>
              <div className="accordion" id="adminMessageAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      onClick={toggleAccordion}
                      aria-expanded={isOpen ? 'true' : 'false'}
                      aria-controls="adminMessageCollapse"
                    >
                      Admin Message
                    </button>
                  </h2>
                  <div
                    id="adminMessageCollapse"
                    className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                    aria-labelledby="adminMessageHeading"
                    data-bs-parent="#adminMessageAccordion"
                  >
                    <div className="accordion-body">
                      <p><strong>Hii This is Admin:</strong> Please follow all the rules and regulations while you are in the debate.</p>
                      <div>
                        <strong>Participants</strong>
                        <ul>
                          {roomInfo.participants && roomInfo.participants.map((participant, index) => (
                            <li key={index}>{participant}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {messages.map((message, index) => (
                <div key={index} className="message">{message}</div>
              ))}
            </div>
            <div className="card-footer input-container d-flex align-items-center">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="form-control message-input"
                placeholder="Type your message..."
              />
              <button onClick={sendMessage} className="btn btn-primary send-btn mx-4">Send</button>
            </div>
            {isAdmin && (
              <button onClick={saveChat} className="btn btn-success ms-auto mt-2" style={{ display: 'block', margin: 'auto', paddingTop: '5px' }}>Save</button>
            )}
            {/* // <button onClick={saveChat} className="btn btn-success ms-auto mt-2" style={{ display: 'block', margin: 'auto', paddingTop: '5px' }}>Save</button> */}
          </div>
        </div>
      </div>
      {selectedTopic && (
        <SeeTopic isOpen={isModalOpen} handleClose={handleCloseModal} topicId={selectedTopic._id} />
      )}
    </div>
  );
};

export default ChatBox;