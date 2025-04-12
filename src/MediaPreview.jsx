import React from 'react';
import './Message.css';

const MediaPreview = ({ onClose }) => {
  // Sample media data - replace with your actual media sources
  const mediaItems = [
    { id: 1, type: 'image', url: 'https://example.com/photo1.jpg' },
    { id: 2, type: 'image', url: 'https://example.com/photo2.jpg' },
    // Add all your media items here
  ];

  return (
    <div className="media-preview-overlay" onClick={onClose}>
      <div className="media-preview-container" onClick={e => e.stopPropagation()}>
        <h3>Shared Media</h3>
        <div className="media-grid">
          {mediaItems.map(item => (
            <div key={item.id} className="media-item">
              {item.type === 'image' && (
                <img 
                  src={item.url} 
                  alt="Shared content" 
                  className="media-thumbnail"
                />
              )}
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MediaPreview;