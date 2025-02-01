import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const character = queryParams.get("character") || "robot";

  const characterStyles = {
    robot: "You are a friendly AI Robot Tutor 🤖 that helps kids learn Python in a fun way.",
    wizard: "You are a Magical Python Wizard 🧙‍♂️ who teaches kids with fun spells!",
    animal: "You are a Cute Animal Tutor 🐻 who explains coding in a playful way!",
  };

  const quizQuestions = [
    { question: "What does `print('Hello, World!')` do?", answer: "It prints 'Hello, World!' on the screen." },
    { question: "What is the symbol for comments in Python?", answer: "The `#` symbol is used for comments." },
    { question: "What keyword is used to define a function?", answer: "The `def` keyword is used." },
  ];

  const [messages, setMessages] = useState([{ sender: "AI", text: "Hello! Ask me anything about Python. 😊" }]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();

    setMessages([...messages, { sender: "User", text: userMessage }]);
    setInput("");

    const prompt = `${characterStyles[character]}
    - Explain using **fun language, emojis, and examples**.
    - Ask follow-up questions to make learning interactive.
    - If a child asks multiple questions, insert a quiz after 3 messages.

    Child's question: "${userMessage}"`;

    try {
      const response = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      let newMessages = [...messages, { sender: "AI", text: data.reply }];

      if (newMessages.length % 3 === 0) {
        const randomQuiz = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
        newMessages.push({ sender: "AI", text: `🤔 **Surprise Quiz!** ${randomQuiz.question}` });
      }

      setMessages(newMessages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Chat with {character} Tutor</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === "AI" ? "text-blue-500" : "text-black"}>{msg.text}</p>
        ))}
      </div>
      <input className="mt-4 p-2 border rounded w-full" value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
