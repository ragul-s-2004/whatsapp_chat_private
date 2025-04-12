
import Message from './Message';
import './Message.css';

type MessageListProps = {
  messages: Array<{
    Datetime: string;
    Sender: string;
    Message: string;
  }>;
};

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="messages-container">
      {messages.map((msg, index) => (
        <Message
          key={index}
          datetime={msg.Datetime}
          sender={msg.Sender}
          message={msg.Message}
        />
      ))}
    </div>
  );
};

export default MessageList;