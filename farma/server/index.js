import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const model = process.env.MODEL;

const aiClient = new OpenAI({
  apiKey: process.env.FARMAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "X-Title": "FarmAI",
  },
});

// ✅ Enable CORS
app.use(cors({
  origin: [
    "http://localhost:8080", // local dev
    "https://farmai-chat-akshay.surge.sh" // ✅ FIXED: use https
  ],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));

app.use(bodyParser.json());

// POST endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const formattedMessages = messages.map(m => ({
      role: m.type === "user" ? "user" : "assistant",
      content: m.content,
    }));

    const response = await aiClient.chat.completions.create({
      model,
      messages: formattedMessages,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ AI API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
});

app.listen(port, () => {
  console.log(`🚀 FarmAI server running on port ${port}`);
  console.log(`✅ Using model: ${model}`);
});
