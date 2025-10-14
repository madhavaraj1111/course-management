// pages/ask-ai/utils/messageFormatter.js

export const formatMessageContent = (content) => {
  const paragraphs = content.split('\n');
  const formatted = [];

  paragraphs.forEach((paragraph) => {
    const trimmed = paragraph.trim();
    
    if (!trimmed) return;

    // Check if it's a bullet point
    if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
      formatted.push({
        type: 'bullet',
        content: trimmed.substring(1).trim(),
      });
    }
    // Check if it's a numbered list
    else if (/^\d+\./.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s*(.+)$/);
      if (match) {
        formatted.push({
          type: 'numbered',
          number: match[1],
          content: match[2],
        });
      }
    }
    // Check if it's a header (starts with ##)
    else if (trimmed.startsWith('##')) {
      formatted.push({
        type: 'header',
        content: trimmed.replace(/^#+\s*/, ''),
      });
    }
    // Regular paragraph
    else {
      formatted.push({
        type: 'paragraph',
        content: trimmed,
      });
    }
  });

  return formatted;
};