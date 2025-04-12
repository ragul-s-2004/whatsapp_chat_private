import React, { useState } from 'react';
import MediaPreview from './MediaPreview';
import './Message.css';

const Message = ({ datetime, sender, message }) => {
  const isMithu = sender === "mithu☠️";
  const [showMediaPreview, setShowMediaPreview] = useState(false);

  // Check for image attachments
  const isImageAttachment = message.startsWith("IMG-") && 
                          (message.endsWith(".jpg") || 
                           message.endsWith(".png"));

  return (
    <>
      <div className={`message-row ${isMithu ? 'right-row' : 'left-row'}`}>
        <div className={`message-bubble ${isMithu ? 'right-bubble' : 'left-bubble'}`}>
          {isImageAttachment ? (
            <img 
              src={`/media/${message}`} 
              className="message-image"
              onClick={() => setShowMediaPreview(true)}
              alt="Shared content"
            />
          ) : message === "<Media omitted>" ? (
            <div 
              className="media-placeholder clickable"
              onClick={() => setShowMediaPreview(true)}
            >
              📷 Photo
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