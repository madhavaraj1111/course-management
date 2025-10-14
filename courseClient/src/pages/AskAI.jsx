// pages/AskAI.jsx
import ChatHeader from "./ask-ai/sections/ChatHeader";
import ChatMessages from "./ask-ai/sections/ChatMessages";
import ChatInput from "./ask-ai/sections/ChatInput";
import { useChatManager } from "./ask-ai/hooks/useChatManager";

const AskAI = () => {
  const {
    messages,
    input,
    isLoading,
    messagesEndRef,
    setInput,
    handleSubmit,
  } = useChatManager();

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-4xl mx-auto">
        <ChatHeader />
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex flex-col h-[calc(100vh-250px)]">
          <ChatMessages 
            messages={messages} 
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
          
          <ChatInput
            input={input}
            isLoading={isLoading}
            setInput={setInput}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AskAI;