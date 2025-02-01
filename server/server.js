const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

   
    const betterPrompt = `You are a Python tutor for children. Explain in a simple and engaging way: ${prompt}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: betterPrompt }),
      }
    );

    const data = await response.json();
    res.json({ reply: data?.candidates?.[0]?.content ?? "I couldn't understand that, can you try again?" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error communicating with AI." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
