import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import WeatherDashboard from './components/WeatherDashboard';
import './App.css';

function App() {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('conversations');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentConversation, setCurrentConversation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'weather'

  const saveConversations = (convs) => {
    localStorage.setItem('conversations', JSON.stringify(convs));
  };

  const handleNewConversation = () => {
    const newConv = {
      id: Date.now(),
      title: `Chat ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date().toISOString(),
    };
    const newConversations = [newConv, ...conversations];
    setConversations(newConversations);
    setCurrentConversation(newConv.id);
    saveConversations(newConversations);
  };

  const handleDeleteConversation = (id) => {
    const newConversations = conversations.filter(conv => conv.id !== id);
    setConversations(newConversations);
    saveConversations(newConversations);
    if (currentConversation === id) {
      setCurrentConversation(newConversations.length > 0 ? newConversations[0].id : null);
    }
  };

  const handleSelectConversation = (id) => {
    setCurrentConversation(id);
  };

  const handleSendMessage = (message) => {
    if (!currentConversation) return;

    const newConversations = conversations.map(conv => {
      if (conv.id === currentConversation) {
        return {
          ...conv,
          messages: [...conv.messages, message],
        };
      }
      return conv;
    });
    setConversations(newConversations);
    saveConversations(newConversations);
  };

  const currentConv = conversations.find(conv => conv.id === currentConversation);

  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="main-content">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </button>
          <button
            className={`tab-btn ${activeTab === 'weather' ? 'active' : ''}`}
            onClick={() => setActiveTab('weather')}
          >
            🌤️ Weather
          </button>
        </div>

        {activeTab === 'chat' ? (
          <ChatWindow
            conversation={currentConv}
            onSendMessage={handleSendMessage}
            onNewChat={handleNewConversation}
          />
        ) : (
          <WeatherDashboard />
        )}
      </main>
    </div>
  );
}

export default App;