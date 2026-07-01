import React, { useState, useRef } from 'react';
import { FiSend, FiImage } from 'react-icons/fi';
import '../styles/ChatInput.css';

function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const handleSend = async () => {
    if (message.trim() && !isLoading) {
      await onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setAttachments([...attachments, event.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="chat-input-container">
      {attachments.length > 0 && (
        <div className="attachments-preview">
          {attachments.map((att, idx) => (
            <div key={idx} className="attachment-thumb">
              <img src={att} alt="preview" />
              <button onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}>✕</button>
            </div>
          ))}
        </div>
      )}
      <div className="input-wrapper">
        <button
          className="attach-btn"
          onClick={() => fileInputRef.current.click()}
          title="Attach image"
          disabled={isLoading}
        >
          <FiImage />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          style={{ display: 'none' }}
        />
        <textarea
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything... (Shift+Enter for new line)"
          disabled={isLoading}
          rows="3"
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          title="Send message"
        >
          {isLoading ? '⏳' : <FiSend />}
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
