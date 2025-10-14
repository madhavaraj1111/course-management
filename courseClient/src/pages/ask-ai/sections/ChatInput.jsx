// pages/ask-ai/sections/ChatInput.jsx
import { Send } from "lucide-react";
import Button from "../../../components/common/Button";

const ChatInput = ({ input, isLoading, setInput, handleSubmit }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-white/20">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your courses..."
          className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/20"
          disabled={isLoading}
        />
        <Button
          onClick={handleSubmit}
          variant="primary"
          size="md"
          disabled={!input.trim() || isLoading}
        >
          <Send size={20} />
        </Button>
      </div>
      <p className="text-gray-400 text-xs mt-2 text-center">
        AI responses are for assistance only. Always verify important
        information.
      </p>
    </div>
  );
};

export default ChatInput;