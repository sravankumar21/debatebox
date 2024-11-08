import React, { useState, useEffect } from 'react';

const SeeTopic = ({ isOpen, handleClose, topicId }) => {
  const [topicData, setTopicData] = useState(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const response = await fetch(`https://debatebox-api.rka.li/create/${topicId}`);
        const data = await response.json();
        setTopicData(data);
      } catch (error) {
        console.error('Error fetching topic data:', error);
      }
    };

    if (isOpen) {
      fetchTopicData();
    }
  }, [isOpen, topicId]);

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={`modal-dialog w-130 mt--1`} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{topicData ? topicData.topic : 'Loading...'}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          {topicData && (
            <div className="modal-body">
              <h6>Team 1: {topicData.team1}</h6>
              <h6>Team 2: {topicData.team2}</h6>
              <h6>Participants: {topicData.participants.join(', ')}</h6>
              <h6>Messages:</h6>
              <div>
              {topicData.messages.map((message) => (
                
                  <p className='message-idk'>{message}</p>
                
              ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeTopic;
