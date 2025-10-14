// pages/ask-ai/components/MessageContent.jsx
import { formatMessageContent } from "../utils/messageFormatter";

const MessageContent = ({ content }) => {
  const formattedContent = formatMessageContent(content);

  return (
    <div className="text-sm leading-relaxed space-y-2">
      {formattedContent.map((item, idx) => {
        switch (item.type) {
          case 'bullet':
            return (
              <div key={idx} className="flex items-start space-x-2 ml-2">
                <span className="mt-1.5 w-1 h-1 bg-white rounded-full flex-shrink-0"></span>
                <span>{item.content}</span>
              </div>
            );
          
          case 'numbered':
            return (
              <div key={idx} className="flex items-start space-x-2 ml-2">
                <span className="font-semibold flex-shrink-0">{item.number}.</span>
                <span>{item.content}</span>
              </div>
            );
          
          case 'header':
            return (
              <h3 key={idx} className="font-semibold text-base mt-3 mb-1">
                {item.content}
              </h3>
            );
          
          case 'paragraph':
            return <p key={idx} className="mb-2">{item.content}</p>;
          
          default:
            return null;
        }
      })}
    </div>
  );
};

export default MessageContent;