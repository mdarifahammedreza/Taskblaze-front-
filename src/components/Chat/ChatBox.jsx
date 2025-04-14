// components/ChatBox.jsx
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaMicrophone, FaRobot, FaUser, FaUserSecret } from "react-icons/fa";
import { TextGenerateEffect } from "./Text-Generate-Effect";

export default function ChatBox({
  messages,
  input,
  setInput,
  sendMessage,
  typing,
}) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full bg-gray-900 text-white">
      {/* Chat Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto space-y-4 p-4 sm:p-6"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && <FaRobot className="text-cyan-400" />}
            {msg.sender === "sender" && <FaUserSecret className="text-cyan-200" />}
            <div
              className={`px-4 py-2 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animate-fade-in ${
                msg.sender === "user"
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {typeof msg.text === "string" ? msg.text : <TextGenerateEffect words={msg.text.props.words} />}
            </div>
            {msg.sender === "user" && <FaUser className="text-cyan-400" />}
          </div>
        ))}

        {typing && (
          <div className="flex items-center space-x-3 justify-start">
            <FaRobot className="text-cyan-400" />
            <div className="px-4 py-2 rounded-lg max-w-xs bg-gray-800 text-gray-300 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={() =>{ input ? sendMessage(input) : toast.error("Please type a message") }}
            className="px-2 md:px-6 md:py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
            
          >
            Send
          </button>
          <button className="px-2 md:px-4 md:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <FaMicrophone />
          </button >
        </div>
      </div>
    </div>
  );
}
