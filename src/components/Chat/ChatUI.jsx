import axios from "axios";
import { useState } from "react";
import ChatBox from "./ChatBox";
import { TextGenerateEffect } from "./Text-Generate-Effect";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages([...messages, { sender: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: text,
      });

      const extractedThinkText =
        response.data.response
          .match(/<think[^>]*>(.*?)<\/think>/gis)
          ?.map((match) => match.replace(/<\/?think[^>]*>/gi, "").trim()) || [];

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

  return (
    <div className="chatpage flex w-full bg-gray-900 text-white relative h-screen" style={{ height: 'calc(100vh - 64px)' }}>
      <section className="hidden sm:block sm:w-1/5 flex-1 border-x-2 border-gray-700 overflow-y-auto">
        {new Array(100).fill(null).map((_, index) => (
          <div key={index} className="flex items-center border-b-2 border-gray-700 px-2 py-3 cursor-pointer hover:bg-gray-800 gap-2">
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
        {/* Show the list of Task list of half */}
        {/* Show the member if group inbox open, otherwise show all notifications */}
      </section>
    </div>
  );
}
