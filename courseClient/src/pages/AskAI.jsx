import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import Button from "../components/common/Button";

const AskAI = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your Perfect Study AI assistant. I can help you with questions about your courses, study tips, and navigating the platform. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      // Use environment variable or fallback to localhost:5000
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      const response = await fetch(`${API_URL}/api/rag/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      
      // Add AI response
      const aiResponse = {
        role: "assistant",
        content: data.answer || "I received your question but couldn't generate a response. Please try rephrasing.",
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      
      // Add error message
      const errorResponse = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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

        {/* Chat Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex flex-col h-[calc(100vh-250px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white/20 text-white border border-white/30"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  ) : (
                    <div className="text-sm leading-relaxed space-y-2">
                      {message.content.split('\n').map((paragraph, idx) => {
                        // Check if it's a bullet point
                        if (paragraph.trim().startsWith('*') || paragraph.trim().startsWith('-')) {
                          return (
                            <div key={idx} className="flex items-start space-x-2 ml-2">
                              <span className="mt-1.5 w-1 h-1 bg-white rounded-full flex-shrink-0"></span>
                              <span>{paragraph.trim().substring(1).trim()}</span>
                            </div>
                          );
                        }
                        // Check if it's a numbered list
                        else if (/^\d+\./.test(paragraph.trim())) {
                          const match = paragraph.trim().match(/^(\d+)\.\s*(.+)$/);
                          return (
                            <div key={idx} className="flex items-start space-x-2 ml-2">
                              <span className="font-semibold flex-shrink-0">{match[1]}.</span>
                              <span>{match[2]}</span>
                            </div>
                          );
                        }
                        // Check if it's a header (starts with ##)
                        else if (paragraph.trim().startsWith('##')) {
                          return (
                            <h3 key={idx} className="font-semibold text-base mt-3 mb-1">
                              {paragraph.trim().replace(/^#+\s*/, '')}
                            </h3>
                          );
                        }
                        // Regular paragraph
                        else if (paragraph.trim()) {
                          return <p key={idx} className="mb-2">{paragraph}</p>;
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/20 text-white border border-white/30 rounded-lg p-4">
                  <Loader2 className="animate-spin" size={20} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
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
        </div>
      </div>
    </div>
  );
};

export default AskAI;