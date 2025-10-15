// pages/ask-ai/utils/aiService.js

const API_URL = import.meta.env.VITE_API_URL || "https://course-management-backend-m7fc.onrender.com/api";

export const sendMessageToAI = async (query) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/api/rag/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  const data = await response.json();
  
  return {
    role: "assistant",
    content: data.answer || "I received your question but couldn't generate a response. Please try rephrasing.",
  };
};