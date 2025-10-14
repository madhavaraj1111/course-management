// pages/ask-ai/sections/ChatHeader.jsx
import { Sparkles } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-4 border border-white/20">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 p-3 rounded-full">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Ask AI Assistant
          </h1>
          <p className="text-gray-300 text-sm">
            Get help with your courses and studies
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;