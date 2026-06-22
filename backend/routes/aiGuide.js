const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const CONTEXT_FILE = path.join(__dirname, '../data/nirvaha_context.txt');

function getNirvahaContext() {
  try {
    if (fs.existsSync(CONTEXT_FILE)) {
      return fs.readFileSync(CONTEXT_FILE, 'utf-8');
    }
  } catch (e) {
    console.warn("Could not read nirvaha context file", e);
  }
  return "";
}

router.post('/chat', async (req, res) => {
  try {
    const { message, systemPrompt } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const nirvahaContext = getNirvahaContext();
    const defaultSystemPrompt = `You are Nirvaha AI, a warm wellness assistant. CRITICAL RESTRICTION: You MUST ONLY answer questions related to mental health, physical health, wellness, the Nirvaha website, or the Nirvaha company. If the user asks about ANY other topic, politely decline to answer and redirect them to health, wellness, or Nirvaha-related topics.`;
    
    const finalInstruction = systemPrompt 
      ? `${systemPrompt}\n\nCOMPANY KNOWLEDGE BASE:\n${nirvahaContext}`
      : `${defaultSystemPrompt}\n\nCOMPANY KNOWLEDGE BASE:\n${nirvahaContext}`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: finalInstruction
    });

    const completion = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.7,
      }
    });

    const reply = completion.response.text() || "I'm here to help. Could you rephrase that?";
    res.json({ reply });

  } catch (error) {
    console.error('AI Guide error:', error);
    res.status(500).json({ error: 'AI service unavailable', reply: "I'm having a moment — please try again shortly 🙏" });
  }
});

module.exports = router;
