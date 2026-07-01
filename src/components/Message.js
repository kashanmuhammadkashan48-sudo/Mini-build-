import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import '../styles/Message.css';

function Message({ message }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCodeMessage = message.content.includes('```');

  return (
    <div className={`message message-${message.role}`}>
      <div className="message-avatar">
        {message.role === 'user' ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        {isCodeMessage ? (
          <div className="code-message">
            {message.content.split('```').map((block, idx) => {
              if (idx % 2 === 0) {
                return <p key={idx}>{block}</p>;
              } else {
                const [lang, ...code] = block.split('\n');
                return (
                  <CodeBlock
                    key={idx}
                    code={code.join('\n').trim()}
                    language={lang.trim() || 'javascript'}
                  />
                );
              }
            })}
          </div>
        ) : (
          <p className="message-text">{message.content}</p>
        )}
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="attachments">
            {message.attachments.map((att, idx) => (
              <img key={idx} src={att} alt="attachment" className="attachment-image" />
            ))}
          </div>
        )}

        <div className="message-actions">
          {message.role === 'assistant' && (
            <>
              <button
                className="action-btn"
                onClick={handleCopyMessage}
                title="Copy message"
              >
                <FiCopy /> {copied ? 'Copied!' : 'Copy'}
              </button>
              <button className="action-btn" title="Regenerate">
                <FiRefreshCw /> Regenerate
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
