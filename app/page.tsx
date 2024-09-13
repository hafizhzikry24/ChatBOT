'use client'

import { useState, useRef, useEffect } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const sendMessage = async () => {
    if (message.trim() === '') return; // Ignore empty messages

    try {
      const response = await fetch('http://localhost:5000/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ msg: message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setChatHistory(prevHistory => [
        ...prevHistory,
        `User: ${message}`,
        `Bot: ${data.response}`
      ]);

      setMessage('');

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-purple-400">
      <div className="sm:w-full max-w-md max-h-md bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center p-4 bg-gradient-to-r from-blue-300 to-purple-500 text-white animate-fadeIn">
          <img
            className="w-12 h-12 rounded-full border-2 border-white"
            src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png"
            alt="Bot"
          />
          <div className="ml-3">
            <h3 className="text-xl font-bold">ChatBot</h3>
            <p className="text-sm text-gray-200">Ask me anything!</p>
          </div>
        </div>

        {/* Chat History */}
        <div className="p-4 space-y-3 h-80 overflow-y-auto bg-gray-50">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.startsWith('User:') ? 'justify-end' : 'justify-start'} animate-slideInRight`}
            >
              <div
                className={`${
                  msg.startsWith('User:') ? 'bg-blue-500' : 'bg-pink-500'
                } max-w-xs rounded-lg p-3 text-white shadow-md`}
              >
                <p className="text-sm">{msg.split(': ')[1]}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none shadow-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg shadow-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
