import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ✅ Use environment variable for security
const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

// Basic route to check deployment
app.get("/", (req, res) => {
  res.send("🚀 Telegram Bot is running on Vercel!");
});

// Telegram webhook endpoint
app.post("/webhook", async (req, res) => {
  const message = req.body.message;
  if (message && message.text) {
    const chatId = message.chat.id;
    const text = message.text;

    if (text === "/start") {
      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ Bot is working successfully on Vercel!",
        }),
      });
    } else {
      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `You said: ${text}`,
        }),
      });
    }
  }

  res.sendStatus(200);
});

export default app;
