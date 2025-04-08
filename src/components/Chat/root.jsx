import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import auth from '../../../firebase.config';

const socket = io('http://localhost:5000'); // adjust to your server address

const ChatRoot = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState('general'); // example chat ID
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const typingTimeoutRef = useRef(null);

  // Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Socket listeners
  useEffect(() => {
    socket.emit('joinRoom', selectedChat);

    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('typing', handleTypingEvent);
    socket.on('stopTyping', handleStopTypingEvent);

    return () => {
      socket.off('receiveMessage');
      socket.off('typing', handleTypingEvent);
      socket.off('stopTyping', handleStopTypingEvent);
    };
  }, [selectedChat]);

  // Handle typing event
  const handleTypingEvent = ({ chatId, userId }) => {
    if (chatId === selectedChat && userId !== currentUser?.uid) {
      setTypingUsers(prev => (prev.includes(userId) ? prev : [...prev, userId]));
    }
  };

  const handleStopTypingEvent = ({ chatId, userId }) => {
    if (chatId === selectedChat) {
      setTypingUsers(prev => prev.filter(id => id !== userId));
    }
  };

  // Typing logic
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    socket.emit('typing', { chatId: selectedChat, userId: currentUser?.uid });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', { chatId: selectedChat, userId: currentUser?.uid });
    }, 1000);
  };

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageData = {
      chatId: selectedChat,
      userId: currentUser?.uid,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', messageData);
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
    socket.emit('stopTyping', { chatId: selectedChat, userId: currentUser?.uid });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat Room: {selectedChat}</h2>

      <div className="bg-gray-100 rounded p-4 h-64 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.userId === currentUser?.uid ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-white px-3 py-1 rounded shadow">
              {msg.content}
            </span>
          </div>
        ))}
        {typingUsers.length > 0 && (
          <div className="text-sm text-gray-500 italic">
            {typingUsers.length === 1 ? 'Someone is typing...' : 'Multiple people are typing...'}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          className="flex-1 border px-4 py-2 rounded"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoot;
