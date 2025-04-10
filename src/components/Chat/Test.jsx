import React, { useState } from 'react';
import useSocket from './socket'; // Import the custom hook

const ChatComponent = () => {
  const { messages, room, joinRoom, leaveRoom, sendMessage, createRoom } = useSocket();
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');

  const handleSendMessage = () => {
    sendMessage(room, newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <div>
        <input 
          type="text" 
          placeholder="Enter Room ID" 
          value={roomId} 
          onChange={(e) => setRoomId(e.target.value)} 
        />
        <button onClick={() => joinRoom(roomId)}>Join Room</button>
        <button onClick={() => leaveRoom(roomId)}>Leave Room</button>
      </div>
      <div>
        <textarea 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <button onClick={() => createRoom(roomId, userId)}>Create Room</button>
      </div>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
