// socket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Initialize socket connection to the server
const socket = io('http://localhost:5000');

const useSocket = () => {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);

  // Function to join a room
  const joinRoom = (roomId) => {
    socket.emit('joinRoom', roomId);
    setRoom(roomId);
    console.log(`Joined room: ${roomId}`);
  };

  // Function to leave a room
  const leaveRoom = (roomId) => {
    socket.emit('leaveRoom', roomId);
    setRoom(null);
    console.log(`Left room: ${roomId}`);
  };

  // Function to send a message
  const sendMessage = (roomId, message, user) => {
    const messageData = { roomId, message, user }; // Include user information
    socket.emit('sendMessage', messageData);
    console.log(`Message sent to room ${roomId} by ${user}: ${message}`);
  };
  

  // Listen for incoming messages
  useEffect(() => {
    socket.on('receiveMessage', (messageData) => {
      console.log('New message received:', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]); // Add the message with user data
    });
  
    // Cleanup on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  

  // Function to create a room (either group or 1-to-1)
  const createRoom = (roomId, userId) => {
    socket.emit('createRoom', roomId, userId);
    console.log(`Room ${roomId} created by user ${userId}`);
  };

  // Listen for room creation event
  useEffect(() => {
    socket.on('roomCreated', (data) => {
      console.log(data.message);  // Display room creation success message
      console.log('Room ID:', data.roomId);
      console.log('Room created by:', data.creator);  // You can handle this to show who created the room
      joinRoom(data.roomId);  // Automatically join the room after creation
    });

    // Cleanup on unmount
    return () => {
      socket.off('roomCreated');
    };
  }, []);

  return {
    messages,
    room,
    joinRoom,
    leaveRoom,
    sendMessage,
    createRoom,
  };
};

export default useSocket;
