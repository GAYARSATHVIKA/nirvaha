const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
  console.log("Using key:", process.env.GEMINI_API_KEY ? "Set" : "Not Set");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("Success:", result.response.text());
  } catch (e) {
    console.error("Error with gemini-1.5-flash:", e.message);
  }
}
test();
