const mongoose = require('mongoose');
require('dotenv').config();
const FAQ = require('./models/FAQ');

const faqs = [
    {
        question: "Is Nirvaha suitable for beginners?",
        answer: "Yes. Our paths are gentle and designed to welcome you exactly as you are, regardless of prior experience.",
        image: "/images/faq_beginners.png"
    },
    {
        question: "How does the AI Reflection Companion work?",
        answer: "It acts as a secure, non-judgmental space. It listens to your thoughts and softly guides you toward emotional clarity.",
        image: "/images/faq_ai_companion.png"
    },
    {
        question: "Is Nirvaha a therapy platform?",
        answer: "No. We are a supportive wellness space meant for mindfulness and emotional reflection, not a replacement for clinical therapy.",
        image: "/images/faq_therapy_ancient.png"
    },
    {
        question: "Can I use Nirvaha during stressful moments?",
        answer: "Absolutely. We offer immediate grounding techniques and emergency calm modules to help you navigate sudden overwhelm.",
        image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=800&auto=format&fit=crop"
    },
    {
        question: "Are conversations private?",
        answer: "Yes. Your emotional space is entirely your own. All reflections are strictly confidential and securely encrypted.",
        image: "/images/faq_privacy.png"
    },
    {
        question: "How long are wellness sessions?",
        answer: "Sessions adapt to your needs. Choose from a quick 3-minute breathwork reset to a deep 45-minute guided release.",
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop"
    }
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvaha');
  
  await FAQ.deleteMany({}); // clear existing
  let order = 0;
  for (const faq of faqs) {
    await FAQ.create({ ...faq, order: order++ });
    console.log(`Created FAQ: ${faq.question}`);
  }
  process.exit(0);
}
run();
