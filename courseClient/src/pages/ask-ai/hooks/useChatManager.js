// pages/ask-ai/hooks/useChatManager.js
import { useState, useRef, useEffect } from "react";
import { sendMessageToAI } from "../utils/aiService";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hello! I'm your Perfect Study AI assistant. I can help you with questions about your courses, study tips, and navigating the platform. How can I assist you today?",
};

export const useChatManager = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
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
      const aiResponse = await sendMessageToAI(userMessage);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      
      const errorResponse = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    isLoading,
    messagesEndRef,
    setInput,
    handleSubmit,
  };
};