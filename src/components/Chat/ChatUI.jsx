import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ChatBox from "./ChatBox";
import useSocket from "./Socket";
import { TextGenerateEffect } from "./Text-Generate-Effect";
import { UserContext } from "../../Pages/Private/AuthProvider";
export default function ChatUI() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  // Socket Function Information
  const {
    messages: socketMessages,
    room,
    joinRoom,
    leaveRoom,
    sendMessage: socketsendMessage,
    createRoom,
  } = useSocket();

  // ChatBox message Function Information
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
  ]);

  const [input, setInput] = useState(""); // Message input from UI
  const [typing, setTyping] = useState(false); // Handle Typing Effect in ChatUI
  const [roomId, setRoomId] = useState(""); // Room ID for socket connection
  const [userId, setUserId] = useState(""); // User ID for socket connection
  // Message input from UI

  // Socket IO function to handle sending messages
  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setTyping(true);
    socketsendMessage(room, text, userId); // Send message to socket server
    setTyping(false);
  };

  const sendMessage = (text) => {
    const taskblazePattern = /@?(taskblaze|task|blaze)/gi; // Match @task, @blaze, @taskblaze (case-insensitive)
  
    if (/(task|blaze)/i.test(text)) {
      const cleanedText = text.replace(taskblazePattern, '').trim(); // Remove keyword and clean up
      AIsendMessage(cleanedText); // Send to AI without keywords
    } else {
      handleSendMessage(text); // Regular socket message
    }
  };
  

  // AI message send function
  const AIsendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: text,
      });

      const cleanedMessage = response.data.response
        .replace(/<think[^>]*>.*?<\/think>/gis, "")
        .replace(/\s+/g, " ")
        .trim();

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: <TextGenerateEffect words={cleanedMessage} /> },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  // Listen for new socket messages and update state accordingly
  useEffect(() => {
    if (socketMessages.length > 0) {
      console.log("Socket message received:", socketMessages.at(-1));
      if(socketMessages.at(-1).user !== userId) {
        setMessages((prev) => [
          ...prev,
          { sender: "Sender", text: socketMessages.at(-1).message },
        ]);
      }
      
      // setMessages((prev) => [
      //   ...prev,
      //   { sender: "Sender", text: socketMessages.at(-1) },
      // ]);
    }
  }, [socketMessages]);

  return (
    <div
      className="chatpage flex w-full bg-gray-900 text-white relative h-screen"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <section className="hidden sm:block sm:w-1/5 flex-1 border-x-2 border-gray-700 overflow-y-auto">
        {new Array(100).fill(null).map((_, index) => (
          <div
            key={index}
            className="flex items-center border-b-2 border-gray-700 px-2 py-3 cursor-pointer hover:bg-gray-800 gap-2"
          >
            <section>
              <img
                src="https://i.ibb.co.com/Gx52yXp/19ca0976-b0c9-4c73-8230-fc9261eced81.jpg"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            </section>
            <section className="flex flex-col leading-[10px]">
              <p>Md Arif Ahammed Reza</p>
              <p className="text-sm overflow-hidden">Last Message show</p>
            </section>
          </div>
        ))}
      </section>

      <section className="w-full sm:w-3/5 overflow-y-auto">
        <ChatBox
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          typing={typing}
        />
      </section>

      <section className="hidden sm:block sm:w-1/5 border-x-2 border-gray-700 overflow-y-auto">
        <div className="mb-4 p-4">
          <label
            htmlFor="roomId"
            className="block text-sm font-medium text-gray-300"
          >
            Room ID :
          </label>
          <input
            id="roomId"
            name="roomId"
            type="text"
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="e.g. XXXXX"
            required
          />
          <div className="flex justify-between mt-5">
            <button onClick={() => joinRoom(roomId)} className="btn">
              Join Room
            </button>
            <button
              onClick={() => leaveRoom(roomId)}
              className="btn bg-red-700 border-red-800 shadow-red-700 text-white"
            >
              Leave Room
            </button>
            <button
              onClick={() => createRoom(roomId, userId)}
              className="btn bg-green-700 border-green-800 shadow-green-700 text-white"
            >
              Create Room
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
