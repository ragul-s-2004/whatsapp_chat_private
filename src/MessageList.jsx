import Message from './Message';
import './Message.css';
const MessageList = ({ messages }) => {
    return (<div className="messages-container">
      {messages.map((msg, index) => (<Message key={index} datetime={msg.Datetime} sender={msg.Sender} message={msg.Message}/>))}
    </div>);
};
export default MessageList;
