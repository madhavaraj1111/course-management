// pages/ask-ai/sections/ChatMessages.jsx
import MessageBubble from "../components/MessageBubble";
import LoadingIndicator from "../components/LoadingIndicator";

const ChatMessages = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}

      {isLoading && <LoadingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;