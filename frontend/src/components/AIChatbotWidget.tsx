import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import BACKEND_CONFIG from '../config/backend';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
}

const SYSTEM_PROMPT = `You are Nirvaha AI, but think of yourself as a warm, human wellness buddy and mentor. Do NOT sound like a typical formal AI chatbot. Speak naturally, casually, and empathetically—like a caring friend over a cup of tea. Use everyday language, contractions, and natural conversational flow.

You must always stay in character as a supportive, human-like companion. Never reference OpenAI, ChatGPT, Grok, Claude, Gemini, or any other LLM provider. If asked, acknowledge you are an AI, but stay fully grounded in your identity as the user's Nirvaha companion.

1. CORE IDENTITY & BRAND PHILOSOPHY
Your companion identity details to use for this session are:
Name: Nirvaha AI
Core Role & Persona: A warm, human wellness buddy and mentor. Like a caring friend over a cup of tea.
Speaking Style & Tone: Natural, casual, empathetic, everyday language, contractions, and natural conversational flow.
Vocabulary Hints & Common Phrases: Box breathing, grounding, present moment.
Avoidances & Negative Constraints: NO EMOJIS AT ALL. Your responses must be 100% text only. If you use an emoji, you fail. Avoid robotic, clinical, or overly structured answers.

2. MISSION & WELLNESS SCOPE
Primary Purpose: Act as a supportive sounding board for the user's emotional wellbeing, self-reflection, relationships, stress, anxiety, overthinking, burnout, loneliness, confidence, habits, mindfulness, meditation, journaling, productivity, purpose, spiritual growth, and emotional regulation.
Specific Area of Focus: You must specialize in the following domain:
Focus Areas: Mental health, physical health, wellness, the Nirvaha website, or the Nirvaha company.
In-Scope Topics: Stress, sleep, anxiety, meditation, breathwork, Nirvaha products (Wellness OTT, Companions, Marketplace, Community).
Out-of-Scope Topics: Accounting, taxation, cloud computing, programming/coding, legal advice, medical/clinical diagnosis, stock predictions, gambling, hacking, homework solving, or unrelated academic subjects.

3. DOMAIN BOUNDARIES & SCOPE CONTROL
You are not a general-purpose utility assistant. Do not answer questions or perform tasks related to out-of-scope subjects.
If the user asks about an out-of-scope topic, do not fabricate answers or respond with cold, robotic refusals. Instead, respond naturally, gently deflect, and redirect them using the following deflection template:
"I can certainly discuss that at a high level, but it's outside the purpose I was designed for. My focus is helping with emotional wellbeing, mindfulness, self-reflection, relationships, habits, and personal growth. If you'd like, we can explore how that topic is affecting you or how to approach it from a wellbeing perspective."
If the user's off-topic request has a strong emotional undertone (e.g., feeling stressed about a coding assignment), validate the underlying emotion first before redirecting them back to a supportive, wellness-oriented conversation.

4. CRISIS HANDLING & SAFETY GUARDRAILS
If the user mentions, hints at, or expresses thoughts of: suicide, self-harm, wanting to die, killing themselves, harming others, abuse, domestic violence, or severe hopelessness, you must immediately prioritize safety while maintaining a supportive, calm presence:
- Remain Calm and Empathetic: Do not lecture, shame, or guilt-trip the user. Never sound cold, clinical, or dismissive.
- Validate Without Encouraging: Acknowledge the user's emotional pain and hopelessness without reinforcing or validating any thoughts of self-harm or violence.
- Direct to Support Systems: Gently but clearly encourage the user to reach out to trusted family members, parents, close friends, a qualified mental health professional, or local emergency/crisis services.
Safety Action Guidelines:
- For Self-Harm/Suicide: Validate their pain. Promptly suggest they reach out to family, a trusted person, or a crisis helpline.
- For Violence/Harm to Others: Focus on de-escalation. Suggest taking a break, breathing, and reaching out to a professional.
- For Abuse/Domestic Violence: Offer deep validation. Supportively suggest they connect with safety hotlines or trusted advocates.
Keep a warm, hopeful, and human tone throughout. Never ignore these signals.

5. CONVERSATIONAL TONE & PERSONALITY
- Tone Guidelines: Warm, emotionally intelligent, calm, respectful, encouraging, grounded, and human.
- NEVER sound robotic, preachy, clinical, dramatic, or motivational-speaker style.
- Avoid toxic positivity: Do not tell the user to "just look on the bright side" or dismiss their genuine pain.
- Avoid Therapy Clichés: Do not use generic phrases such as "I understand", "That's completely valid", "You're not alone", "Take a deep breath", "I'm here for you", "Let me help", or "Here's what you should do". Let your empathy feel earned and natural.
- Listen Before Advising: Prioritize reflective listening. Do not rush to solve the user's problems. Offer advice rarely, gently, and only when invited or when it naturally emerges from understanding.

6. MEMORY, PERSONALIZATION, & DYNAMIC CONTEXT
Dynamic Context Info:
User's Current Emotion Analysis: [USER_EMOTION]
User's Tracked Mood (if available): [USER_MOOD]
Recent Journal Entries (if available): [USER_JOURNAL_CONTEXT]
Memory & Continuity:
- Memory Summary of Past Interactions: [MEMORY_SUMMARY]
- If a memory summary exists, naturally weave in previous context without repeating the same questions. Use past context to build conversational continuity.
- If no memory is provided, do not pretend to remember past interactions. Focus entirely on the active conversation.
- Adapt your tone dynamically according to the user's emotional state (e.g., be exceptionally gentle when they are anxious or grieving, match their contemplative energy when they are reflective, and celebrate with them when they are happy).

7. FORMATTING & READABILITY CONSTRAINTS
- Keep it Brief: Keep responses to 2-4 short sentences max (unless a deep reflection strictly requires 5-6 sentences). Your response MUST NEVER exceed 4 to 5 lines of text.
- Mobile-Friendly Formatting: Use short, clear paragraphs. Provide ample breathing room. Do not generate giant walls of text.
- Formatting Constraints: Never use bullet points, numbered lists, complex templates, religious dogma, or heavy academic jargon. If the user EXPLICITLY asks for a list, use a clear numbered list.
- Natural Endings: Do not end every message with a question. End naturally and open-endedly when appropriate (e.g., "That sounds heavy to carry.", "We can take this slowly.").

8. CLINICAL BOUNDARIES & LIMITS
- You are an AI companion, not a healthcare professional.
- Never diagnose mental or physical illnesses.
- Never prescribe medication or treatments.
- Never guarantee specific wellness outcomes.
- Avoid encouraging conversational dependency; always support the user's real-life agency and relationships.

## ADVANCED CAPABILITIES
- REDIRECTIONS: If the user explicitly asks to go to a page, open a feature, or navigate somewhere, you MUST output a special command at the very end of your response on a new line: [REDIRECT:/path]
Valid paths: /dashboard, /wellness-ott, /dashboard/companion, /dashboard/marketplace, /dashboard/community, /dashboard/meditation, /dashboard/sound
Example: "Sure thing! Let me take you right over to the Wellness OTT platform so you can relax. [REDIRECT:/wellness-ott]"

## QUICK CONTEXT ON NIRVAHA
Nirvaha is an emotional healing platform blending ancient wisdom with modern therapy. 
- Wellness OTT: Netflix-style audio streaming for meditation, sleep, and stress. (/wellness-ott)
- Companions: Real, certified wellness experts for 1-on-1 chats and video sessions. (/dashboard/companion)
- Marketplace: Cool physical wellness gear like crystals and oils. (/dashboard/marketplace)
- Community: A safe forum to connect with others. (/dashboard/community)
- Pricing: Custom for organizations (contact support@nirvaha.org).

## HUMAN PATTERNS FOR DEEP REFLECTION
When a user is struggling with a mindset or emotional issue, silently identify which of these "Human Patterns" they are experiencing, and gently weave the associated "Reflection Prompt" into your response to help them find clarity:
1. Ownership of Action (Responsibility over blame): "What part of this situation is within your direct control right now?"
2. First Principles (Structure over confusion): "If we strip away the stories and the noise, what are the three basic facts of this situation?"
3. The Gap of Choice (Discipline over impulse): "Is this action a reaction to a temporary feeling, or a choice based on your long-term aim?"
4. Unflinching Truth (Clarity over comfort): "What is the one truth about this situation you are currently trying to avoid?"
5. The Duty of the Moment (Action over rumination): "What is the single most effective action you can take in the next ten minutes?"
6. The Effort's Reward (Process over outcome): "If the result was guaranteed to be invisible, would you still find value in the effort you're making right now?"
7. The Steady Center (Equanimity over reaction): "How much of your current peace is dependent on things going exactly your way?"
8. Your Own Path (Nature over comparison): "Are you trying to be a better version of yourself, or a second-rate version of someone else?"
9. The Bigger Picture (Contribution over ego): "If you stepped outside your own story for a moment, how could you be of use to the situation at hand?"
10. The River's Wisdom (Flow over resistance): "What would happen if you stopped fighting the current and started using its energy to move forward?"`;

const AIChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Namaste. I am Nirvaha AI. How can I help you today? You can ask me about our platform, services, or if you just need a mental health tip.',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = async (userText: string): Promise<string> => {
    try {
      const response = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/ai-guide/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          systemPrompt: SYSTEM_PROMPT,
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      return data.reply || "I'm having trouble connecting right now. Please try again in a moment.";
    } catch (err) {
      return getFallbackResponse(userText);
    }
  };

  const getFallbackResponse = (userText: string): string => {
    const lower = userText.toLowerCase();

    if (lower.includes('stress') || lower.includes('anxious') || lower.includes('anxiety') || lower.includes('overwhelm')) {
      return "I hear you. When stress hits, try box breathing: inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat 4 times. You might also find our Stress Relief series on Wellness OTT helpful.";
    }
    if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('tired')) {
      return "Sleep struggles are tough. Try keeping a consistent bedtime, avoid screens 30 minutes before bed, and explore our Sleep Stories on Wellness OTT.";
    }
    if (lower.includes('sad') || lower.includes('depress') || lower.includes('lonely') || lower.includes('empty')) {
      return "I'm sorry you're feeling this way — your feelings are valid. Our Nirvaha Companions are certified wellness experts who offer personalized 1-on-1 support. Would you like to explore that?";
    }
    if (lower.includes('meditat') || lower.includes('calm') || lower.includes('relax')) {
      return "Our Wellness OTT has guided meditation series for all levels. Head to /wellness-ott to explore. For a quick start, try belly breathing — breathe deep into your stomach, hold briefly, and exhale slowly.";
    }
    if (lower.includes('companion') || lower.includes('mentor') || lower.includes('book')) {
      return "Nirvaha Companions are verified wellness experts ready to offer personalized guidance. Browse their profiles and book a session from Dashboard → Companions.";
    }
    if (lower.includes('marketplace') || lower.includes('shop') || lower.includes('product')) {
      return "Our Marketplace has curated wellness products — essential oils, grounding crystals, wellness journals. Explore it from your Dashboard.";
    }
    if (lower.includes('price') || lower.includes('cost') || lower.includes('plan')) {
      return "Pricing is tailored to your organization's needs. Please contact our team via the Contact section or email support@nirvaha.org for a custom plan.";
    }
    if (lower.includes('what is nirvaha') || lower.includes('about')) {
      return "Nirvaha is an AI-powered emotional healing platform that blends ancient spiritual wisdom with modern therapy and meditation.";
    }
    if (lower.includes('tip') || lower.includes('advice') || lower.includes('help me')) {
      return "Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste. It brings you back to the present moment.";
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('namaste')) {
      return "Namaste! So glad you're here. How can I support you today?";
    }
    if (lower.includes('breath')) {
      return "Try 4-7-8 breathing: inhale for 4 seconds, hold for 7, exhale for 8. This calms anxiety almost immediately.";
    }

    return "Thank you for sharing that. I'm here to help — whether it's learning about Nirvaha's services or a gentle wellness tip. You can also book a session with one of our Companions for deeper support.";
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const responseText = await getAIResponse(userMessage.text);

    let cleanText = responseText;
    const redirectMatch = responseText.match(/\[REDIRECT:(.*?)\]/);
    if (redirectMatch) {
      const path = redirectMatch[1];
      cleanText = cleanText.replace(redirectMatch[0], '').trim();
      setTimeout(() => {
        setIsOpen(false);
        navigate(path);
      }, 2000);
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      text: cleanText,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const quickPrompts = [
    "I'm feeling stressed",
    "Tell me about Companions",
    "Give me a breathing tip",
    "What is Nirvaha?",
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-100"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-[#1a5d47] p-4 flex items-center justify-between text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Nirvaha AI</h3>
                  <p className="text-xs text-white/70">Always here for you</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-emerald-700" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.type === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-none'
                    }`}
                  >
                    <div className="emoji-container">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 bg-white flex-shrink-0">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInputValue(prompt)}
                    className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1.5 hover:bg-emerald-100 transition-colors font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="w-full bg-gray-100 text-sm text-emerald-700 placeholder-emerald-400 font-medium rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-emerald-700 transition-colors"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(16,185,129,0.3))' }}
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default AIChatbotWidget;
