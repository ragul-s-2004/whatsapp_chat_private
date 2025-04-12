import React, { useState } from 'react';
import './Message.css';

const Message = ({ datetime, sender, message }) => {
  const isMithu = sender === "mithu☠️";
  const [showMediaPreview, setShowMediaPreview] = useState(false);

  return (
    <>
      <div className={`message-row ${isMithu ? 'right-row' : 'left-row'}`}>
        <div className={`message-bubble ${isMithu ? 'right-bubble' : 'left-bubble'}`}>
          {message === "<Media omitted>" ? (
            <div 
              className="media-placeholder clickable"
              onClick={() => setShowMediaPreview(true)}
            >
              📷 Photo
              <span className="media-hint">(click to view)</span>
            </div>
          ) : (
            <div className="message-text">{message}</div>
          )}
          <div className="message-footer">
            <span className="message-time">
              {new Date(datetime).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            {isMithu && <span className="message-status">✓✓</span>}
          </div>
        </div>
      </div>
      
      {showMediaPreview && (
        <MediaPreview onClose={() => setShowMediaPreview(false)} />
      )}
    </>
  );
};

export default Message;