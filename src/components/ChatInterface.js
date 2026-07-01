import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { sendMessageToGemini } from '../services/geminiService';
import '../styles/ChatInterface.css';

function ChatInterface({ conversation, onUpdateConversation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSendMessage = async (message, attachments = []) => {
    try {
      setError(null);
      setIsLoading(true);

      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: message,
        attachments: attachments,
        timestamp: new Date()
      };

      const updatedConv = {
        ...conversation,
        messages: [...conversation.messages, userMessage],
        title: conversation.messages.length === 0 ? message.substring(0, 30) : conversation.title
      };

      onUpdateConversation(updatedConv);

      const response = await sendMessageToGemini(message, conversation.messages, conversation.memory);

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.content,
        type: response.type,
        timestamp: new Date()
      };

      const finalConv = {
        ...updatedConv,
        messages: [...updatedConv.messages, assistantMessage],
        memory: updateMemory(conversation.memory, message, response.content)
      };

      onUpdateConversation(finalConv);
    } catch (err) {
      setError(err.message || 'Failed to get response');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMemory = (memory, userMessage, assistantResponse) => {
    // Extract key information from conversation
    const newMemoryItem = {
      timestamp: new Date(),
      userMessage: userMessage.substring(0, 100),
      context: extractContext(userMessage, assistantResponse)
    };
    return [...memory, newMemoryItem].slice(-50); // Keep last 50 items
  };

  const extractContext = (userMsg, assistantMsg) => {
    // Simple context extraction
    if (userMsg.toLowerCase().includes('name')) {
      const match = userMsg.match(/my name is ([a-zA-Z]+)/i);
      if (match) return { type: 'name', value: match[1] };
    }
    if (userMsg.toLowerCase().includes('language')) {
      const langs = ['python', 'javascript', 'java', 'react', 'nodejs'];
      const found = langs.find(lang => userMsg.toLowerCase().includes(lang));
      if (found) return { type: 'preferredLanguage', value: found };
    }
    return null;
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>{conversation.title}</h2>
      </div>
      <div className="chat-body">
        {conversation.messages.length === 0 ? (
          <div className="welcome-message">
            <h3>Welcome to Mini Build AI Assistant</h3>
            <p>Ask me anything! I can help with:</p>
            <ul>
              <li>💬 Natural conversations</li>
              <li>💻 Code generation & debugging</li>
              <li>🎨 Image generation</li>
              <li>📸 Image analysis</li>
              <li>🧠 Context-aware responses</li>
            </ul>
          </div>
        ) : (
          <>
            <MessageList messages={conversation.messages} />
            {error && <div className="error-message">{error}</div>}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default ChatInterface;
