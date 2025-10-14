// pages/ask-ai/components/MessageBubble.jsx
import MessageContent from "./MessageContent";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser
            ? "bg-purple-600 text-white"
            : "bg-white/20 text-white border border-white/30"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <MessageContent content={message.content} />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;