import { useState, useEffect } from 'react';
import MessageList from './MessageList';
import './Message.css';

type Message = {
  Datetime: string;
  Sender: string;
  Message: string;
};

const App = () => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [loading, setLoading] = useState(true);
  const chunks = 43;

  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Type assertion for the import
        const data: { default?: unknown } = await import('./WhatsApp_Chat_Parsed.json');
        
        // Type guard to verify the data structure
        const parseMessages = (rawData: unknown): Message[] => {
          if (!Array.isArray(rawData)) return [];
          
          return rawData.filter((item): item is Message => (
            typeof item === 'object' &&
            item !== null &&
            'Datetime' in item &&
            'Sender' in item &&
            'Message' in item
          ));
        };
      
        // Handle both default export and direct array cases
        const messages = parseMessages(data.default ?? data);
        
        setAllMessages(messages);
        setDisplayMessages(messages.slice(0, 1000));
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  const jumpToChunk = (chunkIndex: number) => {
    const start = chunkIndex * 1000;
    const end = start + 1000;
    setDisplayMessages(allMessages.slice(start, end));
    setCurrentChunk(chunkIndex);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <div className="chat-header">
        <div className="chat-title">RAGUL☠️</div>
      </div>
      
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