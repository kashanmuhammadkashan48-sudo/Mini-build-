import React from 'react';
import { FiMenu, FiPlus, FiTrash2 } from 'react-icons/fi';
import '../styles/Sidebar.css';

function Sidebar({ conversations, currentConversation, onSelectConversation, onNewConversation, onDeleteConversation, isOpen, onToggle }) {
  return (
    <>
      <button className="sidebar-toggle" onClick={onToggle}>
        <FiMenu />
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1 className="logo">🦅 Mini Build</h1>
          <button className="new-chat-btn" onClick={onNewConversation} title="New conversation">
            <FiPlus /> New Chat
          </button>
        </div>
        <div className="conversations-list">
          {conversations.length === 0 ? (
            <p className="no-conversations">No conversations yet</p>
          ) : (
            conversations.map(conv => (
              <div
                key={conv.id}
                className={`conversation-item ${currentConversation === conv.id ? 'active' : ''}`}
                onClick={() => onSelectConversation(conv.id)}
              >
                <span className="conv-title">{conv.title}</span>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conv.id);
                  }}
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
