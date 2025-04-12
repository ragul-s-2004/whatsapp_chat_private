import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import './Message.css';

const App = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [loading, setLoading] = useState(true);
  const chunks = 43; // 43 bookmarks for 43,000 messages

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await import('./WhatsApp_Chat_Parsed.json');
        setAllMessages(data.default || data);
        setDisplayMessages((data.default || data).slice(0, 1000));
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  const jumpToChunk = (chunkIndex) => {
    const start = chunkIndex * 1000;
    const end = start + 1000;
    setDisplayMessages(allMessages.slice(start, end));
    setCurrentChunk(chunkIndex);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <div className="chat-header">
        <div className="chat-title">RAGUL ↔ mithu☠️</div>
      </div>
      
      {/* Bookmark Navigation */}
      <div className="bookmark-bar">
        {Array.from({ length: chunks }).map((_, index) => (
          <button
            key={index}
            className={`bookmark ${currentChunk === index ? 'active' : ''}`}
            onClick={() => jumpToChunk(index)}
          >
            {index * 1000 + 1}-{Math.min((index + 1) * 1000, allMessages.length)}
          </button>
        ))}
      </div>
      
      <MessageList messages={displayMessages} />
      
      <div className="message-input-container">
        <input type="text" placeholder="Type a message..." />
      </div>
    </div>
  );
};

export default App;