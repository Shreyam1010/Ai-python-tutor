import { useState, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; 

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me anything about Python. 🐍", sender: "bot" },
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const formatResponse = (responseText) => {
    if (responseText.includes("```python")) {
      const code = responseText.match(/```python(.*?)```/s);
      if (code) {
        const highlightedCode = hljs.highlight("python", code[1]).value;
        return responseText.replace(
          /```python(.*?)```/s,
          `<pre><code class="hljs python">${highlightedCode}</code></pre>`
        );
      }
    }
    return responseText; 
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    
    const botResponse = { text: "Thinking...", sender: "bot" };
    setMessages((prev) => [...prev, botResponse]);

    const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";
    const API_KEY = "AIzaSyCwqpmZn5CGVkFr8n5gabmm104lTXxu1So"; 

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }], 
        }),
      });

      const data = await response.json();
      console.log("API Response:", data); 

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        botResponse.text = formatResponse(data.candidates[0].content.parts[0].text);
      } else {
        botResponse.text = "I didn't quite understand that. Try again!";
      }

      setMessages((prev) => [...prev.slice(0, -1), botResponse]);
    } catch (error) {
      console.error("Error:", error);
      botResponse.text = "Oops! Something went wrong. Try again.";
      setMessages((prev) => [...prev.slice(0, -1), botResponse]);
    }

    setInput("");
  };

  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`${
        isFullscreen ? "w-full h-screen fixed top-0 left-0 z-50" : "max-w-md mx-auto"
      } bg-white p-4 rounded-lg shadow-md overflow-hidden transition-all duration-300`}
    >
      {/* Fullscreen Toggle Button */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
        <div className="font-bold">Chat with Your Python Tutor</div>
      </div>

      <div
        className={`${
          isFullscreen ? "h-[calc(100vh-160px)]" : "h-96"
        } overflow-y-auto p-4 border rounded-lg ${isFullscreen ? "text-lg" : "text-base"}`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 my-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-gray-200 text-black"
            }`}
          >
            <p
              className={`whitespace-pre-line font-semibold ${msg.sender === "bot" ? "text-bold" : ""}`}
              dangerouslySetInnerHTML={{ __html: msg.text }} 
            />
          </div>
        ))}
      </div>

      {}
      <div
        className={`flex mt-4 ${isFullscreen ? "absolute bottom-4 w-full" : "w-full"}`}
      >
        <input
          type="text"
          className="flex-1 p-3 border rounded-lg"
          placeholder="Ask a Python question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 p-3 bg-blue-500 text-white rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
