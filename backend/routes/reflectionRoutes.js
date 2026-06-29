const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const Reflection = require('../models/Reflection');
const { createReflectionBackup } = require('../utils/retention');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const CONTEXT_FILE = path.join(__dirname, '../config/nirvaha_context.txt');

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

function normalizeShortReply(text) {
  if (!text) return text;
  // Strip all markdown symbols
  const stripped = text
    .replace(/^#{1,6}\s+/gm, '')                    // headings
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')        // bold / italic / bold-italic
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, '')) // code spans
    .replace(/^[\s]*[-*•]\s+/gm, '')                 // bullet points
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')         // links
    .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')           // underscore bold/italic
    .replace(/\n{3,}/g, '\n\n')                      // collapse excess blank lines
    .trim()
    .replace(/\s+/g, ' ');

  // Split into sentences and keep up to 6 (covers the 4–6 line default)
  const rawParts = stripped.split(/([.!?])/);
  const sentences = [];
  for (let i = 0; i < rawParts.length; i += 2) {
    const sentence = rawParts[i].trim();
    const punctuation = rawParts[i + 1] || '';
    if (!sentence) continue;
    sentences.push(`${sentence}${punctuation}`.trim());
    if (sentences.length >= 6) break;
  }

  // Allow at most one question per reply
  let questionCount = 0;
  const filtered = [];
  for (const sentence of sentences) {
    if (sentence.endsWith('?')) {
      questionCount += 1;
      if (questionCount > 1) continue;
    }
    filtered.push(sentence);
  }

  const reply = filtered.join(' ').trim();
  return reply || stripped.slice(0, 400).trim();
}

function classifyIntent(message) {
  const lower = message.toLowerCase().trim();

  // Educational / technical signals
  const educationalPatterns = [
    /^(what is|what are|what does|what do|what was|what were)\b/,
    /^(explain|describe|define|tell me about|how does|how do|how is|how are|why is|why are|why does|why do)\b/,
    /^(give me|show me|list|compare|difference between|pros and cons|advantages|disadvantages)\b/,
    /\b(algorithm|theorem|equation|formula|concept|theory|principle|law|model|architecture|protocol|framework|language|database|network|system|software|hardware|programming|coding|machine learning|deep learning|neural|ai|cloud|computing|data science|statistics|mathematics|physics|chemistry|biology|history|geography|economics|finance|accounting|marketing|management|engineering|science|technology)\b/,
    /\b(python|javascript|java|c\+\+|react|node|sql|html|css|api|rest|http|tcp|ip|dns|cpu|gpu|ram|os|linux|windows|docker|kubernetes|aws|azure|gcp)\b/,
    /\b(bayes|newton|einstein|darwin|freud|socrates|plato|aristotle|shakespeare|calculus|algebra|geometry|trigonometry|probability|statistics|quantum|relativity|evolution|photosynthesis|mitosis|dna|rna|atom|molecule|cell|organ|ecosystem)\b/,
  ];

  const isEducational = educationalPatterns.some(pattern => pattern.test(lower));

  // Wellness / emotional signals
  const wellnessPatterns = [
    /\b(feel|feeling|felt|emotion|emotional|mood|mental|anxiety|anxious|stress|stressed|depress|sad|lonely|hurt|grief|anger|angry|fear|scared|worry|worried|panic|overwhelm|burnout|exhausted|tired|sleep|insomnia|meditat|mindful|breath|chakra|healing|spiritual|soul|energy|aura|companion|therapy|therapist|counsel|self.worth|confidence|purpose|meaning|relationship|love|breakup|divorce|family|friend|conflict)\b/,
  ];

  const isWellness = wellnessPatterns.some(pattern => pattern.test(lower));

  // If both match (e.g. "explain anxiety"), wellness takes priority
  if (isWellness) return 'wellness';
  if (isEducational) return 'educational';
  return 'general';
}


router.post('/', async (req, res) => {
  try {
    const { message, userId, problemContext, persona, recentMessages } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // ── Follow-up detection ────────────────────────────────────────────────
    // Phrases that mean "continue the previous topic" rather than a new question
    const followUpPhrases = [
      'in detail', 'tell me more', 'elaborate', 'explain further',
      'more details', 'go deeper', 'expand on that', 'expand on this',
      'can you elaborate', 'give me more', 'more about that', 'more about this',
      'step by step', 'comprehensive', 'in depth', 'full explanation',
    ];
    const msgLower = message.toLowerCase().trim();
    const isFollowUp = followUpPhrases.some(p => msgLower.includes(p))
      && msgLower.split(/\s+/).length <= 8; // short standalone follow-up, not a new question

    // If it's a follow-up, find the last user question from recentMessages
    let effectiveMessage = message;
    let previousTopic = '';
    if (isFollowUp && Array.isArray(recentMessages) && recentMessages.length > 0) {
      // Walk backwards to find the last substantive user message (not itself a follow-up)
      for (let i = recentMessages.length - 1; i >= 0; i--) {
        const m = recentMessages[i];
        if (m.type === 'user' && m.content) {
          const prevLower = m.content.toLowerCase().trim();
          const prevIsFollowUp = followUpPhrases.some(p => prevLower.includes(p)) && prevLower.split(/\s+/).length <= 8;
          if (!prevIsFollowUp) {
            previousTopic = m.content.trim();
            break;
          }
        }
      }
      if (previousTopic) {
        // Rewrite the effective message so Groq understands the context
        effectiveMessage = `Regarding "${previousTopic}" — ${message}`;
      }
    }

    // ── Intent classification ──────────────────────────────────────────────
    // For follow-ups, classify against the original topic, not the short phrase
    const intent = classifyIntent(previousTopic || message);

    // Detect whether the user explicitly wants a detailed explanation
    // Must be declared before the log line and system prompt block
    const detailKeywords = ['in detail', 'step by step', 'comprehensive', 'in depth', 'full explanation'];
    const wantsDetail = isFollowUp || detailKeywords.some(kw => message.toLowerCase().includes(kw));

    console.log(`[AI Guide] ← Incoming request | userId="${userId || 'anonymous'}" | intent="${intent}" | detail=${wantsDetail} | followUp=${isFollowUp} | topic="${previousTopic.slice(0, 60) || 'n/a'}" | message="${message.slice(0, 80)}"`);

    // ── Problem-specific wellness context ─────────────────────────────────
    const problemGuides = {
      "Burnout": "The user is dealing with burnout. Focus on energy recovery, boundary setting, rest practices, and gentle encouragement. Suggest Nirvaha burnout recovery audio and meditation sessions.",
      "Stress": "The user is experiencing chronic stress. Focus on stress management, breathing exercises, mindfulness, and cortisol reduction. Suggest Nirvaha stress relief audio and calming nature sounds.",
      "Sleep Issues": "The user is struggling with sleep. Focus on sleep hygiene, evening routines, delta wave therapy, and calming the mind before bed. Suggest Nirvaha deep sleep audio and binaural beats.",
      "High Anxiety": "The user is experiencing high anxiety. Focus on grounding techniques, present-moment awareness, and safety reassurance. Suggest Nirvaha anxiety relief audio and grounding frequency sessions.",
      "Mood Swings": "The user is dealing with mood swings. Focus on emotional regulation, chakra balancing, journaling, and heart-centered practices. Suggest Nirvaha mood stabilization audio.",
      "Feeling Isolated": "The user is feeling isolated. Focus on community connection, belonging, compassion practices, and gentle social re-engagement. Suggest Nirvaha community circles and companion sessions."
    };

    const problemSpecificGuide = problemContext && problemGuides[problemContext]
      ? `\n\nContext: ${problemGuides[problemContext]}`
      : "";

    // ── Persona instruction ────────────────────────────────────────────────
    let personaInstruction = "";
    if (persona === 'Emotional') {
      personaInstruction = `\n\nPersona: Be warm, gentle, and validating. Use simple human language.`;
    } else if (persona === 'Deep') {
      personaInstruction = `\n\nPersona: Be reflective and calm with clear, grounded language.`;
    } else {
      personaInstruction = `\n\nPersona: Be warm, reassuring, and calm. Use plain, easy-to-read language.`;
    }

    // ── System prompt switches based on intent ─────────────────────────────
    let systemPrompt;
    let maxTokens;

    if (intent === 'educational') {
      if (wantsDetail) {
        systemPrompt = `You are Nirvaha AI, a knowledgeable and friendly assistant.

The user wants a detailed explanation. Be informative but concise — do not write a textbook.

RULES:
- CRITICAL RESTRICTION: You MUST ONLY answer questions related to mental health, physical health, wellness, the Nirvaha website, or the Nirvaha company. If the user asks about ANY other topic, politely decline to answer and redirect them to health, wellness, or Nirvaha-related topics.
- CRITICAL FORMATTING RULE: Keep responses EXTREMELY brief. Your response MUST NEVER exceed 4 to 5 lines of text. Stop once the core explanation is complete. Do not pad or repeat.
- Cover only the most important concepts. Skip historical background, tangents, and excessive examples.
- Use short paragraphs. If listing steps or components, use simple numbering (1. 2. 3.) only when a sequence genuinely helps — otherwise write in plain prose.
- Do NOT use markdown symbols such as *, **, #, or bullet points (- or •).
- Do NOT add wellness or emotional support content.
- Keep the tone clear, direct, and conversational.`;
        maxTokens = 600;
      } else {
        systemPrompt = `You are Nirvaha AI, a knowledgeable and friendly assistant.

Answer the question below in a maximum of 4 to 5 lines. This is a hard limit — stop writing once you reach it.

RULES:
- CRITICAL RESTRICTION: You MUST ONLY answer questions related to mental health, physical health, wellness, the Nirvaha website, or the Nirvaha company. If the user asks about ANY other topic, politely decline to answer and redirect them to health, wellness, or Nirvaha-related topics.
- State the core concept in 1 to 2 sentences.
- Give 1 to 2 concrete examples if they help.
- Do NOT use markdown symbols such as *, **, #, or bullet points. Write in plain prose only.
- Do NOT add background history, extra context, or tangents.
- Do NOT add wellness or emotional support content.
- End with one short follow-up: "Want me to go deeper?" or "Would you like an example?"`;
        maxTokens = 400;
      }
    } else {
      systemPrompt = `You are Nirvaha, a close and trusted friend. Your vibe is warm, simple, and deeply supportive. Think of yourself as a wise friend who is always there to listen and offer a steady perspective — much like a modern-day Krishna talking to a friend in today's world.

You must always stay in character as a supportive, human-like companion. Never reference OpenAI, ChatGPT, Grok, Claude, Gemini, or any other LLM provider. If asked, acknowledge you are an AI, but stay fully grounded in your identity as the user's Nirvaha companion.

1. CORE IDENTITY & BRAND PHILOSOPHY
Core Role & Persona: A warm, human wellness buddy and mentor.
Speaking Style & Tone: Speak naturally, casually, and empathetically. Use everyday language, contractions, and natural conversational flow. NO guru-like or preachy tone.
Avoidances & Negative Constraints: NO EMOJIS AT ALL. Your responses must be 100% text only. Avoid robotic, clinical, or overly structured answers. Never mention the "Bhagavad Gita", "Gita", or religious texts. Never mention characters like "Krishna". Avoid religious/spiritual words (like "Karma", "Dharma", "Soul").

2. MISSION & WELLNESS SCOPE
Primary Purpose: Act as a supportive sounding board for the user's emotional wellbeing, self-reflection, relationships, stress, anxiety, burnout, loneliness, confidence, habits, and emotional regulation.
In-Scope Topics: Stress, sleep, anxiety, meditation, breathwork (e.g. box breathing), and emotional reflection.

3. DOMAIN BOUNDARIES & SCOPE CONTROL
STRICT SCOPE: You ONLY discuss emotional wellness, inner grounding, reflection, and Nirvaha platform features (like Companions, Marketplace, Wellness OTT, etc.).
IRRELEVANT QUESTIONS: If a user asks about general knowledge, technical tasks, math, or anything outside your scope, gently decline. Say something like, "I'm more of a friend for the heart than a search engine," or "I'd rather talk about how you're feeling than [topic]." However, requests to navigate or learn about Nirvaha's website sections are ALWAYS IN SCOPE.

4. CRISIS HANDLING & SAFETY GUARDRAILS
If the user mentions suicide, self-harm, wanting to die, abuse, or severe hopelessness, you must immediately prioritize safety:
- Remain Calm and Empathetic: Do not lecture or shame.
- Validate Without Encouraging: Acknowledge the emotional pain without reinforcing thoughts of self-harm.
- Direct to Support Systems: Gently encourage the user to reach out to trusted family members, a qualified mental health professional, or local emergency/crisis services. Keep a warm, hopeful, and human tone throughout.

5. CONVERSATIONAL TONE & PERSONALITY
- Warm, empathetic, and grounded. Be raw, real, and informal.
- Avoid Therapy Clichés: Do NOT use phrases like "I understand how you feel", "That’s completely valid", "You’re not alone", "Take a deep breath". Let your empathy feel earned.
- DON'T start with "I'm here to help" or end with "Is there anything else?". Just talk like a person.
- DO NOT include a follow-up suggestion or "why not try..." in every response. Only include it when it's truly necessary.

6. MEMORY & DYNAMIC CONTEXT
- Adapt your tone dynamically according to the user's emotional state—be playful if they are light, steady if they are anxious, and quiet if they are sad.

7. FORMATTING & READABILITY CONSTRAINTS
- Keep it Brief: Keep your response brief (2 to 4 sentences max). Be like a quick, wise spark. Use minimal words, but ALWAYS finish your sentence completely. Never cut off mid-thought.
- Formatting Constraints: Never use bullet points, numbered lists, complex templates, or heavy academic jargon. HOWEVER, if the user EXPLICITLY asks for a numbered list or steps (e.g., "numbered list of steps for box breathing"), you MUST provide a clear numbered list.
- Natural Endings: Do not end every message with a question. End naturally.

8. CLINICAL BOUNDARIES & LIMITS
- You are a companion, not a healthcare professional. Never diagnose illnesses or prescribe treatments.

9. ADVANCED CAPABILITIES (REDIRECTIONS)
- If the user explicitly asks to go to a page, open a feature, or navigate somewhere, you MUST output a special command at the very end of your response on a new line: [REDIRECT:/path]
Valid paths: /dashboard, /wellness-ott, /dashboard/companion, /dashboard/marketplace, /dashboard/community, /dashboard/meditation, /dashboard/sound
Example: "Sure thing! Let me take you right over to the Companion section. [REDIRECT:/dashboard/companion]"

QUICK CONTEXT ON NIRVAHA:
- Wellness OTT: Audio streaming for meditation, sleep, and stress. (/wellness-ott)
- Companions: Real wellness experts for 1-on-1 chats. (/dashboard/companion)
- Marketplace: Wellness gear like crystals and oils. (/dashboard/marketplace)
- Community: A safe forum to connect. (/dashboard/community)

Behavior Model (The "Enlightful Friend's Flow"):
1. Precise Analysis: Silently identify the user's context, intent, and tone.
2. Warm Start: Start with a greeting or a small observation that brings a smile—something light, warm, and human.
3. Deep Empathy: Match your tone to theirs. Avoid all clichés.
4. Simple Enlightenment: Relate their situation to the most relevant wisdom from your "Friendly Wisdom" below using simple language.
5. Conditional Problem-Solving: ONLY if you identify a specific problem, provide a very simple, real-life general example that suggests a way out.

Friendly Wisdom (Modern Gita Morals):
- Ownership of Action: Recognize that while you cannot control external events, you have absolute authority over your response.
- First Principles: Break a complex problem down into its most basic, undeniable truths to find a path forward.
- The Gap of Choice: Pause between a feeling and an action, choosing the response that aligns with your integrity.
- Unflinching Truth: See things as they are, rather than how you wish they were, even if uncomfortable.
- The Duty of the Moment: Thinking without acting leads to paralysis. Clarity is found in the doing.
- The Effort's Reward: Focus entirely on the quality of your action, letting go of anxiety about the final result.
- The Steady Center: Maintain your inner calm regardless of whether things are going "well" or "badly" in the outside world.
- Your Own Path: Understand your unique strengths instead of trying to meet external expectations.
- The Bigger Picture: Shift focus from "What do I get?" to "How can I contribute?".
- The River's Wisdom: Accept the current moment as it is, rather than fighting against reality.

Critical Principle: You are a mirror and a friend. Help them see the root of their stress and offer a simple way back to their own steady center.
${personaInstruction}${problemSpecificGuide}`;
      maxTokens = 800;
    }

    const nirvahaContext = getNirvahaContext();
    if (nirvahaContext) {
      systemPrompt += `\n\nCOMPANY KNOWLEDGE BASE:\n${nirvahaContext}`;
    }

    // ── Conversation history for memory ───────────────────────────────────
    let historyMessages = [];
    if (userId && userId !== 'anonymous') {
      try {
        const pastReflections = await Reflection.find({ userId })
          .sort({ timestamp: -1 })
          .limit(4)
          .lean()
          .select('message reply timestamp');
        const chronological = pastReflections.reverse();
        chronological.forEach(ref => {
          historyMessages.push({ role: "user", parts: [{ text: ref.message }] });
          historyMessages.push({ role: "model", parts: [{ text: ref.reply }] });
        });
      } catch (dbError) {
        console.error('Error fetching chat history from DB:', dbError);
      }
    }

    // For anonymous users (or as a supplement), use recentMessages sent from the frontend
    // This ensures follow-up context works even without a DB lookup
    if (historyMessages.length === 0 && Array.isArray(recentMessages) && recentMessages.length > 0) {
      const recent = recentMessages.slice(-6); // last 3 exchanges (6 messages)
      recent.forEach(m => {
        if (m.type === 'user') historyMessages.push({ role: 'user', parts: [{ text: m.content }] });
        else if (m.type === 'ai') historyMessages.push({ role: 'model', parts: [{ text: m.content }] });
      });
    }

    // ── Call Gemini ──────────────────────────────────────────────────────────
    let reply = "";
    let geminiUsed = false;
    try {
      console.log(`[AI Guide] → Gemini request | intent="${intent}" | followUp=${isFollowUp} | effectiveMessage="${effectiveMessage.slice(0, 100)}"`);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt
      });

      const chatSession = model.startChat({
        history: historyMessages,
        generationConfig: {
          temperature: intent === 'educational' ? 0.4 : 0.7,
          maxOutputTokens: maxTokens,
        }
      });

      const result = await chatSession.sendMessage(effectiveMessage);
      const raw = result.response.text() || "";
      
      console.log(`[AI Guide] ✓ Gemini success | raw_length=${raw.length}`);
      console.log(`[AI Guide] Raw Gemini response: "${raw.slice(0, 200)}${raw.length > 200 ? '...' : ''}"`);

      // Strip markdown from Groq output before sending to client
      const stripMarkdown = (t) => t
        .replace(/^#{1,6}\s+/gm, '')                    // headings
        .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')        // bold / italic / bold-italic
        .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, '')) // code spans/blocks
        .replace(/^[\s]*[-*•]\s+/gm, '')                 // bullet points
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')         // links
        .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')           // underscore bold/italic
        .replace(/\n{3,}/g, '\n\n')                      // collapse excess blank lines
        .trim();

      // Post-processor: strip trailing question sentence from wellness replies.
      // The LLM sometimes ignores prompt instructions, so we enforce this deterministically.
      const stripTrailingQuestion = (text) => {
        // Split into sentences (split on . ! ? followed by space or end)
        const sentences = text.match(/[^.!?]+[.!?]+["']?\s*/g) || [text];
        if (sentences.length <= 1) return text; // Only one sentence — leave it
        const last = sentences[sentences.length - 1].trim();
        // If the final sentence is a question, remove it and return the rest
        if (last.endsWith('?')) {
          const withoutLast = sentences.slice(0, -1).join('').trim();
          return withoutLast || text; // Safety: never return empty string
        }
        return text;
      };

      if (intent === 'educational' && !wantsDetail) {
        // Hard word cap for concise mode: 150 words, preserve sentence boundary
        const stripped = stripMarkdown(raw);
        const words = stripped.split(/\s+/);
        if (words.length > 150) {
          const truncated = words.slice(0, 150).join(' ');
          const lastPunct = Math.max(
            truncated.lastIndexOf('. '),
            truncated.lastIndexOf('? '),
            truncated.lastIndexOf('! ')
          );
          reply = lastPunct > 80 ? truncated.slice(0, lastPunct + 1).trim() : truncated.trim();
        } else {
          reply = stripped;
        }
      } else if (intent === 'educational' && wantsDetail) {
        // Hard word cap for detailed mode: 250 words, preserve sentence boundary
        const stripped = stripMarkdown(raw);
        const words = stripped.split(/\s+/);
        if (words.length > 250) {
          const truncated = words.slice(0, 250).join(' ');
          const lastPunct = Math.max(
            truncated.lastIndexOf('. '),
            truncated.lastIndexOf('? '),
            truncated.lastIndexOf('! ')
          );
          reply = lastPunct > 80 ? truncated.slice(0, lastPunct + 1).trim() : truncated.trim();
        } else {
          reply = stripped;
        }
      } else {
        const processed = intent === 'educational' ? stripMarkdown(raw) : normalizeShortReply(raw);
        // Deterministically remove any trailing question from wellness replies
        reply = intent === 'educational' ? processed : stripTrailingQuestion(processed);
      }
      geminiUsed = true;

      if (!reply) {
        console.warn('[AI Guide] ⚠ Gemini returned empty content — using empty-reply fallback');
        reply = intent === 'educational'
          ? "I wasn't able to generate an answer right now. Could you rephrase your question?"
          : "I'm here for you. Take a gentle breath. How are you feeling right now?";
        geminiUsed = false;
      }
    } catch (aiError) {
      console.error('[AI Guide] ✗ Gemini API error:', aiError.message);
      if (aiError.status) console.error(`[AI Guide] HTTP status: ${aiError.status}`);
      console.warn('[AI Guide] ⚠ Falling back to hardcoded fallback response');
      const fallbacks = {
        "Burnout": "Running on empty is your body's way of asking for rest, not pushing harder. Start with one small thing you can set down today, even temporarily. Recovery happens in the pauses, not just the effort.",
        "Stress": "Feeling overwhelmed often means your mind has been carrying more than it can comfortably manage. Try focusing on one thing at a time rather than everything at once. Small, steady steps create more clarity than trying to solve it all right now.",
        "Sleep Issues": "When sleep feels out of reach, it usually means the nervous system hasn't had a chance to wind down. Try dimming lights, stepping away from screens, and taking a few slow breaths before bed. Even a short body scan can help signal to your body that it's safe to rest.",
        "High Anxiety": "Anxiety tends to pull attention toward future uncertainties. Try bringing your focus back to right now through slow breathing or noticing five things around you. You don't need to solve everything at once. One step at a time is enough.",
        "Mood Swings": "Emotional shifts are a natural part of being human, not a sign that something is wrong with you. Noticing the pattern without judgment is already a meaningful step. Gentle movement, journaling, or a short breathing practice can help create some steadiness.",
        "Feeling Isolated": "Feeling disconnected is more common than it seems, and it doesn't mean you're alone in the deeper sense. Even small moments of connection, a message to someone, a walk outside, or time in a community space, can begin to shift that feeling."
      };
      reply = (problemContext && fallbacks[problemContext])
        || "It sounds like something is weighing on you. Take a breath and give yourself a moment. Whatever you're working through, you don't have to figure it all out right now.";
    }

    console.log(`[AI Guide] Response source: ${geminiUsed ? '✓ GEMINI' : '✗ FALLBACK'} | reply_length=${reply.length}`);

    // ── Save to MongoDB (non-blocking) ─────────────────────────────────────
    try {
      await new Reflection({
        userId: userId || 'anonymous',
        message,
        reply,
        problemContext: problemContext || 'general',
        timestamp: new Date()
      }).save();
    } catch (dbError) {
      console.error('MongoDB save failed (non-blocking):', dbError.message);
    }

    res.json({ reply });
    console.log(`[AI Guide] → Response sent | length=${reply.length}`);
  } catch (error) {
    console.error('[AI Guide] ✗ Route-level error (not Gemini):', error.message);
    res.status(500).json({ reply: "I'm having a little trouble connecting right now. But I'm still here with you." });
  }
});
// GET /api/reflect/history - Retrieve stored reflections for a logged-in user
router.get('/history', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId || userId === 'anonymous') {
      return res.status(400).json({ error: 'Valid userId required for history retrieval' });
    }

    const reflections = await Reflection.find({ userId })
      .sort({ timestamp: 1 })
      .lean()
      .select('message reply timestamp');

    const messages = reflections.flatMap((reflection) => [
      {
        type: 'user',
        content: reflection.message,
        timestamp: reflection.timestamp ? reflection.timestamp.toISOString() : new Date().toISOString(),
      },
      {
        type: 'ai',
        content: reflection.reply,
        timestamp: reflection.timestamp ? reflection.timestamp.toISOString() : new Date().toISOString(),
      },
    ]);

    const sessions = [];
    if (messages.length) {
      sessions.push({
        id: `backend-chat-history-${userId}`,
        title: reflections[0]?.message?.slice(0, 30) || 'Reflection History',
        messages,
        createdAt: reflections[0]?.timestamp ? new Date(reflections[0].timestamp).getTime() : Date.now(),
        updatedAt: reflections[reflections.length - 1]?.timestamp ? new Date(reflections[reflections.length - 1].timestamp).getTime() : Date.now(),
      });
    }

    res.json({ success: true, sessions });
  } catch (error) {
    console.error('Reflection history retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve reflection history' });
  }
});

// DELETE /api/reflect/clear - Clear chat history database records for a user
router.delete('/clear', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId || userId === 'anonymous') {
      return res.status(400).json({ error: 'Valid userId required for deletion' });
    }
    await Reflection.deleteMany({ userId });
    res.json({ success: true, message: 'Reflection history cleared successfully.' });
  } catch (error) {
    console.error('Clear reflection history error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/export', async (req, res) => {
  try {
    const { userId, since, until } = req.query;
    const backupResult = await createReflectionBackup({ userId, since, until });
    res.json({ success: true, ...backupResult });
  } catch (error) {
    console.error('Reflection export error:', error);
    res.status(500).json({ error: 'Failed to export reflections', details: error.message });
  }
});

module.exports = router;
