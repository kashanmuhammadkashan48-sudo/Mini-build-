import React, { useState, useEffect, useRef } from 'react';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('conversations');
    if (saved) {
      setConversations(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  const startNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: 'New Chat',
      messages: [],
      memory: [],
      createdAt: new Date()
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newConversation.id);
  };

  const selectConversation = (id) => {
    setCurrentConversation(id);
  };

  const updateConversation = (updatedConv) => {
    setConversations(conversations.map(c => c.id === updatedConv.id ? updatedConv : c));
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter(c => c.id !== id));
    if (currentConversation === id) {
      setCurrentConversation(conversations.length > 0 ? conversations[0].id : null);
    }
  };

  const activeConversation = conversations.find(c => c.id === currentConversation);

  return (
    <div className="app-container">
      <Sidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onSelectConversation={selectConversation}
        onNewConversation={startNewConversation}
        onDeleteConversation={deleteConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="main-content">
        {activeConversation ? (
          <ChatInterface
            conversation={activeConversation}
            onUpdateConversation={updateConversation}
          />
        ) : (
          <div className="empty-state">
            <h1>Mini Build</h1>
            <p>Your AI Assistant powered by Google Gemini</p>
            <button className="btn btn-primary" onClick={startNewConversation}>
              Start New Chat
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
