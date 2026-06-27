import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  ChevronLeft, ChevronRight, ChevronDown, BookOpen, PenLine, HelpCircle,
  PlayCircle, CheckCircle2, Lock, Sparkles, Brain, Users, Zap,
  Award, Trophy, X, Menu, FileText,
  Layers, Target, Flame, Clock, ArrowRight, RotateCcw,
  NotebookPen, ListChecks, Leaf
} from 'lucide-react';
import { toast } from 'sonner';
import { CertificateModal } from '../components/CertificateModal';
import BACKEND_CONFIG from '../config/backend';

/* ──────────────────────────────────────────
   LESSON CONTENT — All 3 courses, all 15 lessons each
────────────────────────────────────────── */

type LessonContent = {
  objectives: string[];
  body: string[];
  keyTakeaways?: string[];
  practicalExercise?: string;
  reflectionPrompts?: string[];
  quizQuestions?: { question: string; options: string[]; correct: number }[];
  activitySteps?: string[];
  summary?: string;
};

// ════════════════════════════════════════
// COURSE 1: Foundations of Clear Communication
// ════════════════════════════════════════
const FCC_CONTENT: Record<string, LessonContent> = {
  // Module 1
  'fcc-1-1': {
    objectives: [
      'Understand why clear communication is a professional and personal advantage',
      'Recognize the most common barriers to clear communication',
      'Identify what it means to communicate with intention',
    ],
    body: [
      'Communication is the most used skill in human life — and often the least developed. We speak thousands of words every day, yet studies show that more than 70% of workplace misunderstandings stem from unclear or incomplete communication. Clarity is not a luxury. It is a necessity.',
      'When you communicate clearly, you save time. You prevent confusion. You build trust. The person on the receiving end does not have to guess your meaning, re-read your message three times, or ask follow-up questions just to understand what you need. Clear communication respects the time and intelligence of everyone involved.',
      'So what does clarity actually look like? It means knowing your *purpose* before you speak. It means organizing your thoughts before they leave your mouth. It means choosing words that your listener already understands, not words designed to impress or confuse.',
      'There are three fundamental barriers to clear communication. First, *assumption* — we assume the other person already knows the context, the background, or the reason. Second, *vagueness* — we use words like "soon," "later," or "someone" when we should be specific. Third, *emotional reactivity* — we speak from frustration or anxiety rather than from a calm and clear state of mind.',
      'Professional communicators are not born — they are built. Every great leader, negotiator, or teacher you admire developed communication skills through deliberate practice. This course gives you the framework, the tools, and the exercises to do exactly that. Start by deciding: I will communicate with purpose.',
    ],
    keyTakeaways: [
      'Clarity is a skill that can be learned and improved with practice',
      'Most misunderstandings come from assumption, vagueness, and emotional reactivity',
      'Clear communication respects both your time and your listener\'s time',
      'Purpose-driven communication begins before you speak',
    ],
    practicalExercise: 'Choose one recent conversation where a misunderstanding occurred. Write down: (1) What you meant to say, (2) What was actually understood, (3) Which of the three barriers — assumption, vagueness, or reactivity — caused the gap. This reflection will be your baseline for growth.',
    summary: 'Clarity in communication is not about being perfect — it is about being intentional. When you know why you are speaking and what you want the other person to understand, you have already done half the work.',
  },
  'fcc-1-2': {
    objectives: [
      'Understand why the pause before speaking is a professional superpower',
      'Learn to organize thoughts before expressing them',
      'Practice the Think-Structure-Speak framework',
    ],
    body: [
      'Most communication problems begin before a single word is spoken. They begin in the gap between thought and expression — the moment where we have not yet decided what we actually want to say, but say it anyway.',
      'Thinking before speaking is one of the most powerful communication habits you can develop. It signals to others that your words have weight. When you speak with deliberation, people listen differently. They sense that what you are about to say is worth hearing.',
      'The *Think-Structure-Speak* framework gives you a practical process. Step one: Think. Before responding, take a brief pause — even two or three seconds — and ask yourself: "What is the one thing I need the other person to understand?" Step two: Structure. Arrange your key point first, supporting detail second, and action or request third. Step three: Speak. Now deliver your message with that structure in place.',
      'This does not mean you become slow or robotic. It means your speech becomes *purposeful*. Over time, this thinking process becomes automatic. What once required a deliberate pause will become second nature, allowing you to communicate clearly even in fast-paced conversations.',
      'Consider the difference between these two responses to a question. Response A: "Well, I was thinking, you know, that maybe we could, I mean if the team is okay with it, kind of shift the deadline a little bit." Response B: "I recommend we extend the deadline by two days. Here is why — and here is how it benefits the project." Response B is not smarter. It is simply more organized. Anyone can do this.',
    ],
    keyTakeaways: [
      'A brief pause before speaking is a sign of confidence, not uncertainty',
      'The Think-Structure-Speak framework brings order to your message',
      'Lead with your main point, then provide supporting details',
      'Organized communication earns respect and trust',
    ],
    practicalExercise: 'For the next 24 hours, before every response in conversation, apply a 3-second internal pause. During that pause, identify one thing: what is the most important point you need to make? Deliver that first. Observe how others respond when you lead with clarity.',
    summary: 'Thinking before speaking is not hesitation — it is precision. When you structure your thoughts before expressing them, your communication becomes sharper, cleaner, and far more effective.',
  },
  'fcc-1-3': {
    objectives: [
      'Understand why simple language is more powerful than complex vocabulary',
      'Learn how to replace jargon with plain, direct language',
      'Practice translating complex ideas into accessible words',
    ],
    body: [
      'There is a widespread myth that using complex words, long sentences, and industry jargon makes you sound more intelligent and credible. Research consistently shows the opposite. Studies from Princeton University found that people who use simpler, more direct language are rated as *more* intelligent, not less.',
      'Simple language does not mean shallow thinking. It means respecting your audience enough to make your ideas accessible. When you force your listener to decode your language, you lose them — and with them, your message.',
      'The key principle is this: *use the simplest word that accurately conveys your meaning.* Instead of "utilize," say "use." Instead of "in the event that," say "if." Instead of "facilitate," say "help." Instead of "leverage," say "use" or "apply." These substitutions make your speech faster, clearer, and more believable.',
      'Jargon is another major barrier. Every industry has its own language, and within that industry it is efficient. But the moment you use jargon with someone outside your field, you create a wall. When in doubt, ask yourself: "If I explained this to a 12-year-old, what words would I use?" Those are often the right words for adult communication too.',
      'Hemingway, one of the most influential writers in history, built his reputation on simple language. Short words. Short sentences. No wasted words. His first drafts were often complex; his final drafts were stripped clean. Professional communicators follow the same principle — first get it out, then make it simple.',
    ],
    keyTakeaways: [
      'Simple language signals confidence and clarity, not weakness',
      'Replace jargon with plain language whenever communicating across knowledge gaps',
      'Lead with the clearest, most direct words available',
      'Editing for simplicity is a professional skill worth developing',
    ],
    practicalExercise: 'Take a recent email or message you sent and rewrite it using simpler words. Remove all jargon. Replace any phrase over five words with a phrase under three. Read both versions aloud. Notice which one sounds clearer and more confident. That is the version you should be sending.',
    summary: 'Simplicity is sophistication. The ability to take a complex idea and express it in plain language is one of the rarest and most powerful communication skills you can develop.',
  },
  'fcc-1-4': {
    objectives: [
      'Assess your understanding of Module 1 concepts',
      'Reinforce key ideas from the first three lessons',
      'Build confidence in applying clarity principles',
    ],
    body: [
      'This assessment covers the core concepts from Module 1: Foundations of Clear Communication. Answer each question carefully. After submission, you will receive instant feedback. Review any incorrect answers before moving to Module 2.',
    ],
    quizQuestions: [
      {
        question: 'Which of the following is NOT one of the three fundamental barriers to clear communication?',
        options: ['Assumption', 'Vagueness', 'Emotional reactivity', 'Speaking too slowly'],
        correct: 3,
      },
      {
        question: 'In the Think-Structure-Speak framework, what should come first when you speak?',
        options: ['Supporting details', 'Background context', 'Your main point', 'Your credentials'],
        correct: 2,
      },
      {
        question: 'Research shows that using simpler, more direct language makes you appear:',
        options: ['Less educated', 'More intelligent and credible', 'Less confident', 'More approachable but less professional'],
        correct: 1,
      },
    ],
    summary: 'Module 1 complete. You now understand why clarity matters, how to think before speaking, and why simple language is more powerful than complex vocabulary. Continue to Module 2 to build speaking confidence.',
  },

  // Module 2
  'fcc-2-1': {
    objectives: [
      'Understand the relationship between preparation and speaking confidence',
      'Learn why confidence is earned, not performed',
      'Build a pre-communication preparation habit',
    ],
    body: [
      'Confidence is not something you feel before you speak. It is something you build by preparing. Every speaker who walks into a room with calm, assured presence has done the work before entering that room. Confidence is the residue of preparation.',
      'When we speak without preparation, our brain is doing two jobs at once: creating content and delivering it simultaneously. This cognitive overload is what causes rambling, filler words, and losing the thread of thought mid-sentence. Preparation eliminates this. When you already know what you are going to say, your brain can focus entirely on *how* you are saying it.',
      'Preparation does not require hours of rehearsal. For most professional conversations, five minutes of intentional thinking is enough. Ask yourself three questions before any important communication: What is my objective? What are the two or three key points I need to make? What do I want the other person to do, feel, or understand when I finish?',
      'These three questions work for presentations, difficult conversations, emails, meetings, and interviews. They shift your mindset from reactive to intentional. You stop improvising under pressure and start communicating with purpose.',
      'One powerful preparation technique is *mental rehearsal*. Before a meeting or presentation, sit quietly and visualize the conversation. Imagine yourself speaking clearly, calmly, and confidently. Imagine the other person nodding, understanding, responding positively. Research on performance psychology shows that mental rehearsal activates the same neural pathways as actual practice — with remarkable results.',
    ],
    keyTakeaways: [
      'Confidence comes from preparation, not from personality or talent',
      'Preparation reduces cognitive overload and improves speech quality',
      'Three questions before every communication: objective, key points, desired outcome',
      'Mental rehearsal is a proven technique used by elite speakers and performers',
    ],
    practicalExercise: 'Before your next important conversation or meeting, spend five minutes answering these three questions in writing: (1) What is my goal? (2) What are my two most important points? (3) What do I want the other person to do or understand? Notice how much more confident and clear you feel when the conversation begins.',
    summary: 'Confidence is not a personality trait — it is a skill built through preparation. When you prepare, you speak better. When you speak better, you feel more confident. This cycle builds on itself.',
  },
  'fcc-2-2': {
    objectives: [
      'Understand how speaking pace affects clarity and credibility',
      'Learn techniques to slow down and articulate clearly',
      'Develop awareness of your own speaking rhythm',
    ],
    body: [
      'Speaking too fast is one of the most common communication habits that undermines clarity and credibility. When we are nervous, excited, or eager to prove ourselves, we speed up. Words run together. Sentences blur. The listener struggles to follow, and our message is lost.',
      'Speaking slowly and clearly signals confidence, control, and respect for the listener. It gives your audience time to process each idea before the next one arrives. It also gives you time to think. When you slow down, you give your brain a moment to choose better words, make stronger connections, and avoid the verbal stumbles that come from rushing.',
      'The ideal speaking pace for clear communication is *slower than you think you need to be.* Most speakers overestimate how slow they are actually speaking. Record yourself in a conversation and you will almost certainly find you are speaking faster than you realized.',
      'Pauses are as important as words. A one or two second pause between ideas is not awkward — it is powerful. It allows your listener to absorb what you just said before you move on. It signals that you are considered and deliberate. The greatest orators in history — from Lincoln to Churchill to Obama — all used strategic pauses to create emphasis and allow their words to land.',
      'Articulation is the physical discipline of speaking. It means opening your mouth more than feels necessary, enunciating each syllable with intention, and avoiding the lazy dropping of word endings. The word "going" should not become "gonna." The word "want to" should not become "wanna." These small differences cumulatively shape how professional you sound.',
    ],
    keyTakeaways: [
      'Speaking pace has a direct impact on how credible and confident you appear',
      'Strategic pauses are tools of emphasis, not signs of uncertainty',
      'Record yourself to discover your actual speaking pace',
      'Articulation — clear enunciation — is a learnable physical discipline',
    ],
    practicalExercise: 'Record a 90-second voice memo where you explain your job or a recent project as if to someone unfamiliar with your field. Play it back and count: how many times did you rush? How many words slurred together? Now re-record the same content, deliberately 30% slower. Compare the two. The second recording sounds far more authoritative.',
    summary: 'When you slow down, the quality of your communication goes up. Speaking clearly and at a measured pace is one of the fastest ways to be perceived as more credible, confident, and worth listening to.',
  },
  'fcc-2-3': {
    objectives: [
      'Understand the physiological and psychological roots of communication nervousness',
      'Learn evidence-based techniques to manage anxiety before and during speaking',
      'Reframe nervousness as energy that can serve your communication',
    ],
    body: [
      'Nervousness before speaking is nearly universal. Research consistently shows that public speaking ranks among the most common human fears — above heights, spiders, and financial loss. You are not alone, and you are not broken. Nervousness is simply your body preparing for something it perceives as important.',
      'When you feel nervous before speaking, your body releases adrenaline. Your heart rate increases, your palms may sweat, and your voice may tremble. These physiological responses evolved to help you perform under pressure — not to sabotage you. The key is to *redirect* this energy rather than fight it.',
      'The most powerful reframe for nervousness is this: rename it. Instead of telling yourself "I am nervous," say "I am excited." Stanford research shows that this simple reframe shifts your mindset from avoidance to engagement — from trying to calm down to channeling energy forward. These two states — nervousness and excitement — feel physiologically similar but lead to radically different performance outcomes.',
      'Breathwork is one of the fastest and most effective tools for managing nervousness. The 4-7-8 technique works reliably: inhale for 4 counts, hold for 7, exhale for 8. This activates the parasympathetic nervous system, slowing the heart rate and calming the stress response within seconds. Do this two or three times before entering a high-stakes conversation.',
      'Physical posture also affects confidence. Social psychologist Amy Cuddy\'s research on "power posing" found that expansive, open postures — standing tall, shoulders back, feet shoulder-width apart — can shift both your internal state and how others perceive you. Before a presentation or important conversation, take two minutes in a confident posture. You will feel measurably different.',
    ],
    keyTakeaways: [
      'Nervousness is a physiological response, not a character flaw',
      'Renaming nervousness as excitement produces measurably better performance',
      'The 4-7-8 breathing technique calms the nervous system rapidly',
      'Physical posture directly influences both your confidence and how others perceive you',
    ],
    practicalExercise: 'The next time you feel nervous before speaking, try this 90-second protocol: (1) Say to yourself: "I am excited, not nervous." (2) Take three 4-7-8 breaths. (3) Stand or sit with your spine straight, shoulders back, and chin slightly lifted. Notice the shift in your state before you begin speaking. Practice this until it becomes automatic.',
    summary: 'Nervousness is not your enemy — it is energy. With the right tools, you can redirect that energy into presence, enthusiasm, and impact. Managing nervousness is a learnable skill, not a fixed personality trait.',
  },
  'fcc-2-4': {
    objectives: [
      'Assess your understanding of Module 2 concepts',
      'Test your knowledge of preparation, pacing, and nervousness management',
    ],
    body: ['This assessment covers Module 2: Speaking with Confidence. Answer all three questions, then submit.'],
    quizQuestions: [
      {
        question: 'What is the most accurate description of where speaking confidence comes from?',
        options: ['Innate personality traits', 'Years of experience only', 'Preparation and intentional practice', 'Natural charisma'],
        correct: 2,
      },
      {
        question: 'What does research show about renaming nervousness as excitement?',
        options: ['It makes you appear less professional', 'It shifts mindset from avoidance to engagement and improves performance', 'It suppresses the feeling temporarily', 'It has no measurable effect'],
        correct: 1,
      },
      {
        question: 'Strategic pauses during speaking are best described as:',
        options: ['Signs of forgetting what to say', 'Tools for emphasis and allowing ideas to land', 'Signs of poor preparation', 'Interruptions in communication flow'],
        correct: 1,
      },
    ],
    summary: 'Module 2 complete. You now have practical tools for preparation, pacing, and managing nervousness. Move to Module 3 to develop your active listening skills.',
  },

  // Module 3
  'fcc-3-1': {
    objectives: [
      'Understand the fundamental difference between listening and hearing',
      'Recognize the habits that prevent true listening',
      'Develop the foundation for active, engaged listening',
    ],
    body: [
      'Hearing is passive. It is the physical act of sound waves reaching your ears. Listening is active. It is the conscious choice to understand what those sounds mean — not just the words, but the intention, emotion, and context behind them.',
      'Most people in conversation are not listening. They are waiting. They are preparing their response while the other person is still speaking. They are thinking about what happened earlier, what they need to do next, or how they disagree with what is being said. This is hearing without listening.',
      'The consequences of poor listening are enormous. Relationships erode because people feel unheard. Decisions are made based on incomplete understanding. Instructions are misinterpreted. Projects fail. Conflicts escalate. Most of these outcomes could be prevented with better listening.',
      'Active listening requires a deliberate choice at the start of every conversation: *I am going to understand before I respond.* This means your internal voice goes quiet. You are not composing your reply while the other person speaks. You are absorbing — the words, the tone, the pauses, the body language — all of it.',
      'One of the most powerful listening practices is *mirroring and reflecting*. After someone finishes a key point, briefly summarize what you heard: "So what I am hearing is..." or "It sounds like..." This does two things: it confirms you understood correctly, and it signals to the speaker that their words actually landed. The effect on the other person is immediate and powerful — they feel genuinely heard, and trust increases.',
    ],
    keyTakeaways: [
      'Hearing is passive; listening is an active and conscious choice',
      'Most people listen to reply, not to understand',
      'Active listening requires silencing your internal response-preparation voice',
      'Reflecting and summarizing confirms understanding and builds trust',
    ],
    practicalExercise: 'In your next important conversation, make one deliberate commitment: do not speak until the other person has completely finished their thought — not just their sentence, but their full idea. Wait two full seconds after they finish. Then reflect back what you heard before responding. Notice how the dynamic of the conversation changes.',
    summary: 'Listening is a skill, not a talent. When you choose to truly listen — not just wait to talk — the quality of every relationship, conversation, and outcome in your life improves dramatically.',
  },
  'fcc-3-2': {
    objectives: [
      'Understand why questions are the most powerful listening tool',
      'Learn the difference between closed, open, and clarifying questions',
      'Develop a habit of asking questions before making assumptions',
    ],
    body: [
      'The best communicators are often the best questioners. Questions signal interest, invite deeper sharing, and prevent the misunderstandings that come from assumption. Asking better questions is one of the highest-leverage skills you can develop.',
      'There are three types of questions worth mastering. *Closed questions* produce yes or no answers. "Did you finish the report?" These are efficient but limit depth. *Open questions* invite full responses. "What was most challenging about finishing the report?" These reveal thinking, context, and feeling. *Clarifying questions* dig below the surface. "When you say the timeline is tight, what specifically concerns you most?"',
      'Clarifying questions are particularly powerful in professional environments. They demonstrate that you are paying attention, that you take the other person seriously, and that you are not willing to act on incomplete information. They prevent costly errors that come from assuming you understand something when you do not.',
      'The art of sequencing questions matters as much as the questions themselves. Start broad and open, then move toward specificity. "Tell me about how that project has been going?" followed by "What has been the biggest obstacle?" followed by "And when that obstacle appeared, what options did you consider?" Each question builds on the last, taking the conversation progressively deeper.',
      'One common mistake is peppering someone with multiple questions at once: "What happened, why did that occur, and what did you do about it?" This overwhelms the listener and usually produces a shallow answer to whichever question felt easiest. Ask one question. Wait fully for the answer. Then ask the next.',
    ],
    keyTakeaways: [
      'Questions signal interest and prevent costly misunderstandings',
      'Open questions invite depth; clarifying questions prevent false assumption',
      'Sequence questions from broad to specific for deeper understanding',
      'Ask one question at a time and wait fully for the answer',
    ],
    practicalExercise: 'In your next five conversations today, challenge yourself to ask at least one open question and one clarifying question before giving your opinion or making any decision. Track the conversations. You will discover information you would have completely missed without those questions.',
    summary: 'Asking better questions is listening in action. When you ask rather than assume, you access information that transforms your understanding, your decisions, and your relationships.',
  },
  'fcc-3-3': {
    objectives: [
      'Understand why responding before fully understanding is a communication failure',
      'Learn a framework for ensuring comprehension before replying',
      'Practice the habit of understanding first in high-stakes conversations',
    ],
    body: [
      'There is a deeply ingrained habit in most conversations: responding before fully understanding. We hear enough to form an opinion, and we respond to that partial picture. The result is conversations that go in circles, conflicts that escalate unnecessarily, and decisions made on incomplete information.',
      'The principle of understanding before responding does not mean being passive or slow. It means being accurate. It means that your response, when it comes, is based on the actual full message — not on what you thought you heard, not on what you expected the person to say, and not on the emotional reaction you had to the first few words.',
      'The *WAIT* principle is useful here. WAIT stands for "Why Am I Talking?" It is a reminder to pause before contributing to a conversation and ask whether you have truly understood the situation. If the answer is no, your next step is to ask, listen, and clarify — not to offer your view.',
      'In high-stakes conversations — negotiations, difficult feedback sessions, conflict resolution — the discipline of understanding first is the difference between resolution and escalation. When people feel fully heard before any response is given, they become significantly more receptive to what you say next. This is not just psychology — it is practical strategy.',
      'Phrases that signal understanding before responding include: "Let me make sure I understand..." "Before I respond, let me reflect back what I heard..." "Can I ask a few questions before I share my perspective?" These simple phrases signal respect, demonstrate competence, and set the stage for a far more productive exchange.',
    ],
    keyTakeaways: [
      'Responding to partial understanding causes circular conversations and poor decisions',
      'The WAIT principle: ask yourself "Why Am I Talking?" before responding',
      'In high-stakes conversations, understanding first dramatically increases receptivity',
      'Signal phrases that demonstrate understanding build trust and authority',
    ],
    practicalExercise: 'Today, choose one conversation — a difficult topic, a complex request, or a tense interaction — and commit to asking at least two clarifying questions before offering any response or opinion. Use the phrase: "Before I respond, let me make sure I understand what you mean." Reflect on how different the outcome feels compared to your usual approach.',
    summary: 'Understanding before responding is one of the most powerful communication disciplines available. It costs you nothing but a few extra seconds, and it produces dramatically better outcomes in every context.',
  },
  'fcc-3-4': {
    objectives: ['Assess your understanding of Module 3: Active Listening concepts'],
    body: ['This assessment covers the key concepts from Module 3. Answer all questions, then submit for feedback.'],
    quizQuestions: [
      {
        question: 'What is the primary difference between listening and hearing?',
        options: ['Hearing involves understanding context; listening is passive', 'Listening is active and conscious; hearing is passive and physical', 'They are the same process', 'Listening is slower than hearing'],
        correct: 1,
      },
      {
        question: 'Which type of question invites the deepest and most complete response?',
        options: ['Closed questions', 'Leading questions', 'Open questions', 'Rhetorical questions'],
        correct: 2,
      },
      {
        question: 'What does the WAIT principle stand for?',
        options: ['Words Articulate Intelligent Thought', 'Why Am I Talking?', 'Wisdom Achieved In Time', 'Wait And Improve Tone'],
        correct: 1,
      },
    ],
    summary: 'Module 3 complete. Your listening skills are now grounded in a solid framework. Module 4 will apply these skills to professional communication contexts.',
  },

  // Module 4
  'fcc-4-1': {
    objectives: [
      'Learn the principles of professional, effective email communication',
      'Understand how to structure emails for clarity and action',
      'Develop habits that reduce email misunderstandings',
    ],
    body: [
      'Email is one of the primary tools of professional communication — and one of the most frequently misused. Poor emails waste time, create confusion, damage professional reputation, and delay outcomes. Mastering email communication is not optional; it is essential.',
      'Every professional email needs four elements. First, a *clear subject line* that tells the recipient exactly what the email is about. Not "Update" — but "Project X: Revised Deadline and Next Steps." Second, a *direct opening* that states the purpose within the first two sentences. Third, a *structured body* with no more than three key points, each in its own short paragraph. Fourth, a *specific call to action* — what do you need the recipient to do, by when?',
      'Length is one of the most common email errors. Professionals receive hundreds of emails per day. Long, unstructured emails get skimmed or ignored. If your email requires more than three short paragraphs, consider whether a meeting or call would be more appropriate. If email is necessary, use bullet points to make key information scannable.',
      'Tone is the invisible dimension of email communication. Because email lacks voice, facial expression, and body language, tone can easily be misread. A direct email can sound curt. A casual email can sound unprofessional. To calibrate tone, read your email aloud before sending. Ask yourself: "If I received this, how would I feel?" That audit catches most tone problems before they cause damage.',
      'The one-touch principle is a productivity and communication rule: handle each email once. Either respond immediately, delegate it, defer it to a specific time, or delete it. Do not read an email, feel uncertain, and leave it to revisit later without any action. This creates mental clutter and communication delays that erode professional relationships.',
    ],
    keyTakeaways: [
      'Every professional email needs a clear subject, direct opening, structured body, and specific call to action',
      'Keep emails short — use bullet points for scannability in longer messages',
      'Read emails aloud before sending to audit tone',
      'The one-touch principle: handle each email with a definitive action',
    ],
    practicalExercise: 'Review your last five sent emails. For each one, ask: (1) Is the subject line specific and clear? (2) Did I state my purpose in the first two sentences? (3) Is there a clear action I am asking for? Rewrite one email that failed these criteria. Compare the original and the revision — notice the difference in professionalism and clarity.',
    summary: 'Professional email communication is a disciplined craft. When you write with clarity, structure, and a specific call to action, you become someone whose emails get read, taken seriously, and acted upon.',
  },
  'fcc-4-2': {
    objectives: [
      'Learn how to communicate effectively in meetings',
      'Understand how to contribute with clarity and concision',
      'Develop the habit of purposeful meeting communication',
    ],
    body: [
      'Meetings are one of the most expensive forms of communication in any organization. When they are well-facilitated and clearly communicated, they drive alignment and decisions. When they are poorly handled, they are a massive drain of time, energy, and morale.',
      'Whether you are leading or attending a meeting, your communication choices significantly impact its quality. As a *participant*, the primary discipline is this: speak only when you have something meaningful to add, and be concise when you do. Long, rambling contributions in meetings are one of the most common professional credibility mistakes. People who speak with economy and clarity are remembered and respected.',
      'Before any meeting contribution, apply the *Point-Reason-Example* framework. Lead with your point, state your reason, and if needed, give one example. "I recommend we delay the launch by two weeks [point] because our testing data shows three unresolved issues [reason]. For example, the payment integration failed in 12% of test cases [example]." This structure takes less than 30 seconds and is far more powerful than a lengthy explanation.',
      'When you are leading a meeting, your most important job is clarity of purpose and ownership of decisions. Every meeting should begin with a stated objective: "The purpose of today\'s meeting is to decide X" or "We are here to align on Y." Without this, meetings drift. Every meeting should end with documented actions, owners, and deadlines.',
      'Asking for the floor in meetings is also a communication skill. A simple "I\'d like to add something here" or "Can I respond to that?" is far more effective than talking over someone or waiting so long that the moment passes. Assertive, not aggressive. Timely, not interruptive.',
    ],
    keyTakeaways: [
      'In meetings, quality of contribution matters more than quantity of words',
      'The Point-Reason-Example framework makes meeting contributions crisp and memorable',
      'Every meeting should start with a clear objective and end with documented actions',
      'Assertive meeting participation requires timing, brevity, and relevance',
    ],
    practicalExercise: 'In your next three meetings, apply the Point-Reason-Example framework to every verbal contribution you make. Before speaking, mentally complete this sentence: "My point is ___. My reason is ___. My example is ___." Deliver only what is necessary. Observe how colleagues respond to your contributions differently.',
    summary: 'Meeting communication is a professional skill that can be learned. When you speak with clarity, structure, and purpose in meetings, you build a reputation as someone worth listening to.',
  },
  'fcc-4-3': {
    objectives: [
      'Understand the core principles of professional workplace communication',
      'Learn how to navigate difficult conversations professionally',
      'Develop standards for cross-functional and hierarchical communication',
    ],
    body: [
      'Workplace communication is more complex than most other contexts because it involves hierarchy, relationships, performance stakes, and organizational culture all at once. The professional who can communicate effectively across all these dimensions has a significant career advantage.',
      'The foundation of effective workplace communication is *clarity of expectation*. Many workplace conflicts and failures can be traced back to ambiguous expectations — someone thought they were responsible for something, someone else also thought they were responsible, and no one confirmed it. When giving instructions or assigning tasks, always specify: what needs to be done, to what standard, by when, and who is responsible.',
      'Upward communication — speaking to your manager or leadership — requires a different approach than peer or downward communication. Be concise. Lead with conclusions, not process. "The project is on track and will deliver by Friday" is more useful to a leader than "We had some challenges last week but we resolved them and now we are moving ahead." Leaders want outcomes and flags, not detailed narratives.',
      'Difficult workplace conversations — feedback, disagreement, boundary-setting — are unavoidable. The professionals who avoid them create bigger problems later. The framework for difficult conversations: (1) Choose the right time and place — private, unhurried. (2) Start with shared purpose: "I want to talk about this because I care about our work together." (3) Describe behavior specifically, not character generally. (4) State impact. (5) Listen. (6) Agree on a path forward.',
      'Professional communication also means knowing when to go to a person directly rather than involving others unnecessarily. Speaking to someone about a concern before escalating it to a third party is not only more respectful — it is more effective. It demonstrates maturity, preserves relationships, and often resolves the issue far faster.',
    ],
    keyTakeaways: [
      'Clarity of expectation prevents most workplace communication failures',
      'Upward communication should lead with conclusions and outcomes, not process',
      'Difficult conversations are unavoidable — avoidance creates larger problems',
      'Always address concerns directly before involving third parties',
    ],
    practicalExercise: 'Identify one conversation you have been avoiding in your professional environment — a piece of feedback you need to give, a boundary you need to set, or a misunderstanding you need to clear. This week, schedule that conversation using the five-step framework: shared purpose, specific behavior, impact, listening, path forward.',
    summary: 'Workplace communication mastery requires adapting your style, managing difficult conversations proactively, and setting clear expectations at every level. These skills separate good professionals from exceptional ones.',
  },
  'fcc-4-4': {
    objectives: ['Assess your understanding of Module 4: Professional Communication'],
    body: ['This assessment covers email, meeting, and workplace communication. Answer all questions, then submit.'],
    quizQuestions: [
      {
        question: 'What is the most important element every professional email must include?',
        options: ['A formal greeting', 'A clear call to action', 'A lengthy explanation of context', 'A CC to the manager'],
        correct: 1,
      },
      {
        question: 'In the Point-Reason-Example framework, what comes first?',
        options: ['The example', 'The background', 'The point', 'The reason'],
        correct: 2,
      },
      {
        question: 'When communicating upward to leadership, you should:',
        options: ['Provide full context before conclusions', 'Lead with conclusions and outcomes', 'Wait to be asked before sharing information', 'Use formal language exclusively'],
        correct: 1,
      },
    ],
    summary: 'Module 4 complete. You now have a professional toolkit for email, meeting, and workplace communication. Final module ahead: presenting ideas clearly.',
  },

  // Module 5
  'fcc-5-1': {
    objectives: [
      'Learn how to structure a presentation for maximum clarity and impact',
      'Understand the three-part framework that works for any presentation',
      'Develop the habit of audience-centered structure',
    ],
    body: [
      'A presentation without structure is not a presentation — it is a stream of consciousness. No matter how important your content, if it is not organized, your audience cannot follow it, remember it, or act on it. Structure is the backbone of any effective presentation.',
      'The most reliable presentation structure follows three stages. First, *Tell them what you are going to tell them.* This is your opening — state the topic, why it matters, and what they will leave with. Second, *Tell them.* This is the body — present your key points in a logical sequence, no more than three main ideas per presentation. Third, *Tell them what you told them.* This is your close — summarize the key takeaways and state a clear next step or call to action.',
      'Every strong presentation also answers one implicit question that your audience is always asking: "Why should I care?" This is the "so what" of your presentation. If you can answer that question within the first 60 seconds, you have your audience\'s attention. If you cannot, you are losing them while they wonder why they are there.',
      'The *PREP* framework is another reliable structure for shorter presentations and verbal explanations. Point: state your position. Reason: explain why. Example: illustrate with a specific case or data point. Point again: restate your position as a conclusion. This four-step framework works for two-minute briefings, five-minute presentations, and 30-minute workshops.',
      'Slide decks — when used — should support your message, not contain it. Each slide should have one idea, minimal text, and a visual that reinforces the point. If you find yourself reading off your slides, your slides have too much text. Your audience should be listening to you, not reading your slides.',
    ],
    keyTakeaways: [
      'Structure is not optional — it is what makes content followable and memorable',
      'The three-part structure: tell them what you will say, say it, tell them what you said',
      'Answer the "so what" question within the first 60 seconds',
      'The PREP framework works for any length of verbal presentation',
    ],
    practicalExercise: 'Design a 5-minute presentation on a topic you know well — a project, a hobby, or a professional skill. Using the three-part structure: (1) Write a 30-second opening that states the topic and why it matters. (2) Identify exactly three key points. (3) Write a 30-second close that summarizes and ends with a clear takeaway. Practice delivering it aloud.',
    summary: 'Structure is the silent framework that transforms information into communication. When your presentation has a clear shape, your audience can follow, absorb, and remember what you are saying.',
  },
  'fcc-5-2': {
    objectives: [
      'Learn techniques for making complex ideas accessible to any audience',
      'Understand how analogies, examples, and chunking improve comprehension',
      'Develop the skill of translating expertise into clarity',
    ],
    body: [
      'The mark of true expertise is not the ability to make something sound complex — it is the ability to make something complex sound simple. If you cannot explain your idea to someone unfamiliar with your field, your understanding of it is incomplete.',
      'The most powerful tool for explaining complex ideas is the *analogy*. An analogy creates a bridge between something your audience already understands and the new concept you are introducing. "Think of a firewall like a security guard for your computer network — it checks every person coming in and decides whether they are authorized to enter." The audience does not need to understand firewalls to grasp this. They understand security guards.',
      'Concrete examples are equally essential. Abstract ideas — strategy, vision, culture, efficiency — become meaningful when illustrated with specific, real-world cases. "When I say efficiency, here is what I mean: our team reduced report preparation time from four hours to 45 minutes by eliminating one unnecessary approval step." Abstract becomes concrete. Vague becomes specific.',
      '*Chunking* is the technique of breaking a complex idea into smaller, digestible pieces and presenting them sequentially. Instead of explaining the entire system at once, explain layer by layer. "First, let me explain what the problem is. Then, I will show you how our solution addresses it. Finally, I will tell you what you need to do to implement it." Each chunk is manageable; together they form the full picture.',
      'One final principle: *know your audience deeply.* What do they already understand? What vocabulary do they use? What do they care about? What is their relationship to this topic? The answers determine how technical your language can be, how much context you need to provide, and which analogies will land. Audience-centered communication always outperforms content-centered communication.',
    ],
    keyTakeaways: [
      'Analogies create bridges between what is known and what is new',
      'Concrete examples make abstract concepts real and memorable',
      'Chunking breaks complex ideas into manageable, sequential pieces',
      'Deep audience knowledge determines the right language, level, and approach',
    ],
    practicalExercise: 'Choose one complex idea from your professional field. Write a 150-word explanation of it as if explaining to a talented teenager with no background in your field. Use at least one analogy, one concrete example, and no jargon. Read it aloud. If a teenager would understand it, a professional audience will too.',
    summary: 'Explaining complex ideas simply is a rare and powerful skill. When you master it, you become the person who makes the complicated accessible, the technical understandable, and the important actionable.',
  },
  'fcc-5-3': {
    objectives: [
      'Learn techniques for capturing and maintaining audience attention',
      'Understand how to create connection during a presentation',
      'Develop the presence and energy that makes communication memorable',
    ],
    body: [
      'A presentation delivered to an unengaged audience is not a presentation — it is a monologue. Engagement is not something your audience owes you. It is something you earn through deliberate choices about how you show up, how you structure your content, and how you connect with the people in front of you.',
      'The most effective engagement tool is the *story*. Human brains are wired for narrative. Stories activate emotion, memory, and attention in ways that data and information alone cannot. Every presentation benefits from at least one story — a real situation, a specific person, a challenge faced and navigated. Stories make abstract concepts personal and make presenters human.',
      'Audience interaction is another powerful engagement tool. Questions — rhetorical or direct — pull people back into the room. "How many of you have experienced this?" or "What would you do in this situation?" creates participation. When people participate, even mentally, they are engaged. When they are engaged, they remember.',
      'Physical presence matters enormously. Eye contact is the most powerful connection tool a presenter has. Look at individuals, not crowds. Hold eye contact for three to five seconds per person. This creates genuine connection and makes each person feel seen. Movement — walking toward the audience, changing position in the room — adds energy and holds visual attention.',
      'Energy is contagious. If you bring genuine enthusiasm for your topic, the audience feels it. If you are going through the motions, the audience feels that too. Before you present, ask yourself: "What excites me most about this topic? What do I genuinely want this audience to take away?" Let that energy drive your delivery. Authenticity is the most engaging quality a presenter can have.',
    ],
    keyTakeaways: [
      'Engagement must be earned through deliberate choices, not assumed as given',
      'Stories activate emotion and memory more powerfully than data alone',
      'Eye contact — with individuals, not the room — creates genuine connection',
      'Authentic enthusiasm for your topic is the most engaging quality you can bring',
    ],
    practicalExercise: 'For your next presentation or explanation, prepare one story — real and specific — that illustrates your key message. It should be no more than 90 seconds long and should feature a specific person, a specific challenge, and a specific outcome. Practice telling it until it feels natural and genuine, not rehearsed.',
    summary: 'Engagement is not a trick — it is a commitment. When you bring authentic energy, tell human stories, and create genuine eye contact, you transform a presentation from information delivery into genuine communication.',
  },
  'fcc-5-4': {
    objectives: ['Complete the final assessment for Course 1: Foundations of Clear Communication'],
    body: ['This final assessment covers all five modules of the course. Upon completion, you will have earned your Foundations of Clear Communication Certificate.'],
    quizQuestions: [
      {
        question: 'Which of the following best describes the purpose of the Think-Structure-Speak framework?',
        options: ['To slow down speaking permanently', 'To organize thoughts before speaking for clearer delivery', 'To eliminate emotional content from communication', 'To replace listening with thinking'],
        correct: 1,
      },
      {
        question: 'What does the "so what" question in presentation design refer to?',
        options: ['A summary at the end of a presentation', 'The reason the audience should care, stated within the first 60 seconds', 'A way to dismiss audience questions', 'The conclusion of the presentation'],
        correct: 1,
      },
      {
        question: 'Which engagement tool activates emotion and memory more powerfully than data alone?',
        options: ['Complex statistics', 'Slide decks', 'Stories', 'Formal vocabulary'],
        correct: 2,
      },
    ],
    summary: 'Congratulations — you have completed the Foundations of Clear Communication program. You now have a comprehensive toolkit covering clarity, confidence, listening, professional communication, and presentation skills. Your certificate is ready.',
  },
};

// ════════════════════════════════════════
// COURSE 2: Decision Clarity & Strategic Thinking
// ════════════════════════════════════════
const DCST_CONTENT: Record<string, LessonContent> = {
  // Module 1
  'dcst-1-1': {
    objectives: [
      'Understand the difference between reactive thinking and clear, deliberate thinking',
      'Identify the conditions that trigger reactive decision-making',
      'Build awareness of your own thinking patterns',
    ],
    body: [
      'Most human decisions are made reactively. We feel something — urgency, fear, excitement, irritation — and we act on that feeling. The action feels like a decision, but it is really a reaction dressed in decision-making clothes. The consequences of this pattern range from minor regret to serious, lasting damage.',
      'Reactive thinking is fast. It is automatic. It is driven by the emotional brain — the amygdala — which is designed to respond to perceived threats quickly. This served our ancestors well when the threat was physical. In modern professional and personal life, the same mechanism causes us to send angry emails, make hasty commitments, and shut down conversations before they could be productive.',
      'Clear thinking requires a different process. It is slower. It is deliberate. It engages the prefrontal cortex — the part of the brain responsible for reason, planning, and consequence evaluation. The challenge is that the emotional brain fires much faster than the rational brain. By the time your reasoning kicks in, your reaction may already have occurred.',
      'The solution is *space* — a deliberate pause between stimulus and response. Viktor Frankl famously said: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and freedom." That space does not appear automatically. You must create it intentionally, especially in high-emotion situations.',
      'The most reliable way to create that space is to name what is happening: "I notice I am feeling urgent/frustrated/excited right now." Naming an emotion activates the prefrontal cortex and momentarily reduces the intensity of the emotional response. You then have a fraction more time to choose — rather than react.',
    ],
    keyTakeaways: [
      'Reactive thinking is emotional and automatic; clear thinking is deliberate and rational',
      'The space between stimulus and response is where decision quality is determined',
      'Naming emotions activates the rational brain and reduces reactive impulse',
      'Building awareness of your own triggers is the first step to clearer thinking',
    ],
    practicalExercise: 'For the next three days, keep a brief decision log. Each time you make a significant decision or respond to a high-stakes situation, note: (1) What triggered the response? (2) Did you pause before acting? (3) Was the response reactive or deliberate? Review the log at the end of three days and identify your most common reactive triggers.',
    summary: 'The difference between reactive and clear thinking is not intelligence — it is awareness and practice. Every time you create space between stimulus and response, you are building the habit of clear thinking.',
  },
  'dcst-1-2': {
    objectives: [
      'Learn how to define the actual problem before attempting to solve it',
      'Understand why most people solve the wrong problem',
      'Develop the skill of problem diagnosis before solution',
    ],
    body: [
      'There is a principle in engineering and design called "the problem statement problem." It states that most failures in problem-solving occur not because the solution was wrong, but because the wrong problem was being solved. This is more common than it seems and more costly than most people realize.',
      'When a problem appears, our instinct is to solve it. Immediately. We jump to solutions — changes, fixes, interventions — before we have genuinely understood what is causing the problem. The result: we apply the right solution to the wrong problem. The symptom improves temporarily. The underlying issue persists.',
      'The diagnostic question that changes everything is: "What is actually happening?" Not "what should I do?" but "what is really going on here?" This question invites investigation rather than reaction. It slows the problem-solving process just enough to ensure you are working on the right thing.',
      'A powerful tool for identifying the real problem is the *Five Whys* technique, developed by Sakichi Toyoda and popularized by Toyota\'s production system. When a problem occurs, ask "Why?" Record the answer. Then ask "Why?" again about that answer. Repeat five times. By the fifth Why, you have usually reached the root cause rather than the surface symptom.',
      'Example: A team consistently misses deadlines. Why? Because tasks take longer than estimated. Why? Because scope is unclear at the start of projects. Why? Because requirements are not finalized before work begins. Why? Because stakeholders are not engaged early in the process. Why? Because there is no formal stakeholder engagement protocol. The real problem is not "people are slow" — it is "we lack a process." Completely different solution.',
    ],
    keyTakeaways: [
      'Most problem-solving fails because the wrong problem is being solved',
      'Ask "What is actually happening?" before asking "What should I do?"',
      'The Five Whys technique reveals root causes beneath surface symptoms',
      'A precisely defined problem is already halfway solved',
    ],
    practicalExercise: 'Identify one recurring problem in your life or work — something that keeps happening despite your efforts to fix it. Apply the Five Whys technique: state the problem, ask "Why is this happening?" five consecutive times, recording each answer. By the fifth iteration, you should have reached a root cause you had not previously considered. What new solution does this reveal?',
    summary: 'The real problem is rarely the visible problem. Developing the habit of diagnosing before prescribing — of asking Why multiple times before deciding What — produces solutions that actually work.',
  },
  'dcst-1-3': {
    objectives: [
      'Learn to evaluate consequences before making decisions',
      'Understand second and third-order consequences',
      'Develop a future-thinking habit for better decision quality',
    ],
    body: [
      'Every decision has consequences. First-order consequences are the immediate, obvious, intended outcomes. Second-order consequences are what happens as a result of those first-order outcomes. Third-order consequences are what happens after that. Most people only think about first-order consequences. This is one of the most costly thinking errors in decision-making.',
      'Consider a simple example: You decide to cut costs by reducing staff. First-order consequence: payroll decreases. Second-order consequence: remaining staff are overworked, morale falls, quality deteriorates. Third-order consequence: key employees leave, clients are lost, revenue drops more than the cost savings. The decision that looked smart at first-order thinking was disastrous at third-order thinking.',
      'Thinking about consequences does not require perfect prediction. It requires the discipline of asking "And then what?" multiple times before committing to a course of action. This simple question extends your thinking horizon beyond the immediate and reveals patterns that would otherwise remain invisible until it is too late.',
      'Time perspective is also crucial. Short-term thinking asks: "What will this look like in the next few days or weeks?" Long-term thinking asks: "What will this look like in six months? In two years? In ten years?" Many decisions that feel comfortable in the short-term create significant long-term problems. Many decisions that feel difficult in the short-term create significant long-term advantages.',
      'The "future self" framework is useful here. Before a major decision, ask: "How will my future self, looking back at this moment, evaluate this choice?" This perspective shift changes the emotional weighting of the decision. It de-emphasizes immediate comfort and emphasizes long-term alignment — which consistently leads to better decisions.',
    ],
    keyTakeaways: [
      'Second and third-order consequences determine the true impact of any decision',
      'Ask "And then what?" repeatedly before committing to any course of action',
      'Long-term perspective consistently produces better decisions than short-term comfort',
      'The future self framework shifts emotional weighting toward meaningful outcomes',
    ],
    practicalExercise: 'Choose one significant decision you are currently facing. On a piece of paper, map it out in three columns: First-order consequences (immediate outcomes), Second-order consequences (results of those outcomes), Third-order consequences (results of those results). Then ask: "How does this look to my future self in two years?" Use this map to inform your decision.',
    summary: 'Consequence thinking is the habit of looking further ahead than feels natural. When you train yourself to see second and third-order effects, your decisions become demonstrably better — and your future reflects it.',
  },
  'dcst-1-4': {
    objectives: ['Assess your understanding of Module 1: Understanding Clear Thinking'],
    body: ['Answer all questions and submit for feedback.'],
    quizQuestions: [
      {
        question: 'What is the primary difference between reactive thinking and clear thinking?',
        options: ['Reactive thinking is slower and more deliberate', 'Clear thinking is emotional and fast; reactive thinking is rational', 'Reactive thinking is driven by emotion; clear thinking is deliberate and rational', 'They are the same cognitive process'],
        correct: 2,
      },
      {
        question: 'What does the Five Whys technique help you identify?',
        options: ['The five most important decisions you need to make', 'The root cause of a problem rather than its surface symptom', 'Five alternative solutions to a problem', 'Five stakeholders involved in a decision'],
        correct: 1,
      },
      {
        question: 'What are "second-order consequences" in decision-making?',
        options: ['The second decision you need to make', 'The outcomes that result from the first-order outcomes of a decision', 'Minor consequences not worth considering', 'Consequences that happen immediately'],
        correct: 1,
      },
    ],
    summary: 'Module 1 complete. You understand reactive vs. clear thinking, root cause analysis, and consequence mapping. Module 2 introduces structured decision-making frameworks.',
  },

  // Module 2
  'dcst-2-1': {
    objectives: [
      'Learn how to define a decision with precision before evaluating options',
      'Understand why ambiguous decision framing leads to poor choices',
      'Develop a habit of decision definition as the first step of any major choice',
    ],
    body: [
      'Before you can make a good decision, you must know exactly what you are deciding. This sounds obvious but is rarely practiced. Most decisions are made with fuzzy, undefined parameters — which makes it impossible to evaluate options fairly or know when a decision has been successfully made.',
      'A well-defined decision has four components. First, the *decision statement*: a clear, specific sentence describing what exactly is being decided. Not "What should we do about marketing?" but "Should we increase our digital advertising budget by 20% for Q3, and if so, which channels should we prioritize?" The precision transforms a vague deliberation into a solvable problem.',
      'Second, the *decision criteria*: the standards against which you will evaluate options. What matters most? Cost? Speed? Risk level? Alignment with strategy? Quality? These criteria should be defined before options are evaluated — not after. If you define criteria after seeing options, you unconsciously reverse-engineer them to justify the option you already prefer.',
      'Third, the *constraints*: the non-negotiable limits within which the decision must be made. Time, budget, legal requirements, resource availability. These are not criteria to weigh — they are filters. Options that violate constraints are automatically eliminated.',
      'Fourth, the *decision maker*: who has authority to make this decision? In group settings, ambiguous decision authority is one of the most common causes of poor outcomes. The RACI model — Responsible, Accountable, Consulted, Informed — is a useful framework for clarifying who decides, who inputs, and who is simply notified.',
    ],
    keyTakeaways: [
      'A precisely defined decision statement transforms vagueness into a solvable problem',
      'Decision criteria must be established before options are evaluated to avoid bias',
      'Constraints are non-negotiable filters, not criteria to weigh',
      'Ambiguous decision authority is a major cause of poor group decisions',
    ],
    practicalExercise: 'Take one decision you are currently facing and write a full decision definition: (1) Decision statement (specific, one sentence), (2) Three most important criteria for evaluating options, (3) Non-negotiable constraints, (4) Who makes the final call. Review this definition before evaluating any options. Notice how much clearer the path becomes.',
    summary: 'Defining a decision before deciding is the first discipline of clear thinking. When you know precisely what you are deciding and by what criteria, the path to a good decision becomes dramatically clearer.',
  },
  'dcst-2-2': {
    objectives: [
      'Learn how to systematically generate and evaluate options',
      'Understand why expanding the option space improves decision quality',
      'Avoid the binary thinking trap that limits decision potential',
    ],
    body: [
      'One of the most consistent findings in decision science is that people generate far too few options before deciding. The average decision-maker considers just two alternatives: the obvious choice and one other. This is almost always insufficient. The best decision is rarely among the first two options you consider.',
      'The first discipline in option generation is *resisting premature closure* — the tendency to settle on an option before adequately exploring the space. When you feel you have found "the answer" within the first five minutes of deliberation, that is usually a sign that you have not thought broadly enough. Force yourself to generate at least three or four genuine alternatives before evaluating any.',
      'One powerful technique for expanding options is the "multiverse" approach: ask "In a parallel world where my first choice is not available, what would I do?" This question forces new thinking paths. Another is the "opposite" approach: identify what you absolutely would not do, and then ask what the reasons for avoiding it might actually reveal about what you value.',
      'Evaluation — once options are defined — should be done systematically against the criteria you established in the decision definition phase. A simple decision matrix works well: list options as rows, criteria as columns, score each option against each criterion (1-5), weight criteria by importance, calculate weighted scores. The matrix does not make the decision for you, but it makes your thinking visible, testable, and defensible.',
      'One important caution: do not confuse the most familiar option with the best option. Familiarity creates false comfort. The option you have used before feels safer precisely because it is known — not necessarily because it is superior. New options should always be evaluated against criteria, not against comfort level.',
    ],
    keyTakeaways: [
      'Most people generate too few options — force at least three or four alternatives before evaluating',
      'Resist premature closure: the best answer is rarely among the first two options',
      'Decision matrices make evaluation visible, structured, and defensible',
      'Familiarity is not a criterion — separate comfort from quality in evaluation',
    ],
    practicalExercise: 'For your current or next significant decision, generate at least five distinct options before evaluating any. Use the "multiverse" question for options three, four, and five: "If my top choice were not available, what would I do?" Then create a simple decision matrix: rate each option against your top three criteria. Which option scores highest? Does that surprise you?',
    summary: 'The breadth of your option space determines the ceiling of your decision quality. When you resist settling early and deliberately expand your alternatives, you access choices you would have otherwise never considered.',
  },
  'dcst-2-3': {
    objectives: [
      'Learn how to evaluate risk and reward across decision options',
      'Understand asymmetric risk and how to identify it',
      'Develop a consistent framework for risk assessment',
    ],
    body: [
      'Every decision involves risk. The question is never "can I avoid risk?" but "which risks am I willing to take, and are the potential rewards worth them?" People who make excellent decisions over time are not those who avoid risk — they are those who accurately assess it.',
      'The fundamental risk-reward analysis asks two questions for every option: "What is the best realistic outcome if this works?" and "What is the worst realistic outcome if it does not?" The ratio between these two answers is the risk-reward profile of that option. An option with a moderate upside and a catastrophic downside has a poor risk-reward profile regardless of how likely success seems.',
      'Asymmetric risk is the concept that deserves particular attention. Asymmetric downside risk means: if this goes wrong, the consequences are severe and potentially irreversible. When any option has asymmetric downside risk, it should be weighted heavily against even if the probability of failure seems low. The irreversibility is the key factor — you cannot unscramble certain eggs.',
      'Probability calibration is another critical skill. Most people are poorly calibrated in their probability estimates — they are overconfident that good outcomes will occur and underestimate the likelihood of problems. Research by Kahneman, Tversky, and others consistently shows that humans overestimate their control over outcomes and underestimate variance. Adding a "pre-mortem" to your analysis helps: imagine the option has failed spectacularly — what most likely caused it? This exercise surfaces risks you would otherwise miss.',
      'Finally, consider the *reversibility* of each option. If a decision can be reversed or corrected easily, the cost of a wrong choice is low, and you should lean toward decisive action. If a decision cannot be easily reversed, it deserves proportionally more deliberation. Jeff Bezos famously categorized decisions as "two-way doors" (reversible) and "one-way doors" (irreversible) — applying different levels of rigor to each.',
    ],
    keyTakeaways: [
      'Good decision-makers assess risk accurately, not avoid it entirely',
      'Asymmetric downside risk deserves heavy weighting even at low probability',
      'Pre-mortem analysis reveals risks that forward-looking analysis misses',
      'Reversible decisions warrant action; irreversible decisions warrant deep deliberation',
    ],
    practicalExercise: 'For one current decision, conduct a pre-mortem analysis: imagine you chose this option and it failed completely two years from now. Write a 150-word narrative of how and why it failed. What specific risks does this reveal? Now evaluate: are these risks manageable or potentially irreversible? Use this assessment to adjust how much weight you give this option.',
    summary: 'Risk assessment is not pessimism — it is realism in service of better decisions. When you accurately map the risk-reward landscape, you make choices that are genuinely informed rather than optimistically assumed.',
  },
  'dcst-2-4': {
    objectives: ['Assess your understanding of Module 2: Decision-Making Frameworks'],
    body: ['Answer all questions and submit for feedback.'],
    quizQuestions: [
      {
        question: 'Why should decision criteria be established before evaluating options?',
        options: ['To make the process faster', 'To avoid unconsciously reverse-engineering criteria to justify a preferred option', 'To reduce the number of options considered', 'To involve fewer people in the decision'],
        correct: 1,
      },
      {
        question: 'What does "asymmetric risk" refer to in decision-making?',
        options: ['Risks that only affect one side of a negotiation', 'When the downside is potentially severe and irreversible while the upside is limited', 'When risk is distributed unequally among team members', 'Risks that occur in one direction only'],
        correct: 1,
      },
      {
        question: 'What is a pre-mortem analysis?',
        options: ['Reviewing a past decision\'s outcomes', 'Imagining an option has already failed and identifying what caused it', 'Evaluating risks before they occur in real-time', 'A final review before submitting a decision'],
        correct: 1,
      },
    ],
    summary: 'Module 2 complete. You now have structured frameworks for defining decisions, generating options, and evaluating risk and reward. Module 3 introduces strategic thinking.',
  },

  // Module 3
  'dcst-3-1': {
    objectives: [
      'Understand the fundamental difference between short-term and long-term thinking',
      'Recognize how short-term bias affects decision quality',
      'Develop a practice of long-term perspective in daily decisions',
    ],
    body: [
      'Human brains are naturally wired for short-term thinking. In evolutionary terms, immediate threats required immediate responses. Long-term planning was a luxury. Today, that same short-term bias operates in a world that rewards long-term thinking — creating a persistent mismatch between how our brains are wired and what produces good outcomes.',
      'Short-term thinking optimizes for immediate comfort, quick wins, and visible results. It avoids the discomfort of delay, the uncertainty of compound investment, and the discipline of deferred gratification. The consequences accumulate invisibly until they become visible crises: financial instability, deteriorating health, eroded relationships, underdeveloped skills.',
      'Long-term thinking operates on a different time horizon. It asks: "What will serve me — and the people and systems I am part of — in three years? In five? In ten?" These questions shift the criteria for decision-making away from "what feels best now" toward "what is actually best." The discipline required is significant. The results are proportional.',
      'One of the most practical tools for developing long-term thinking is the *10-10-10* framework, introduced by Suzy Welch. Before any significant decision, ask: "How will I feel about this choice in 10 minutes? In 10 months? In 10 years?" Decisions that feel comfortable at 10 minutes but regrettable at 10 months and 10 years are short-term choices with long-term costs. Decisions that feel difficult at 10 minutes but rewarding at 10 months and 10 years are long-term investments worth making.',
      'Organizations that outperform over decades consistently prioritize long-term value over short-term metrics. Amazon famously told shareholders in its first letter that it would sacrifice short-term profitability to build long-term infrastructure. That commitment produced one of the most valuable companies in history. The same principle applies to careers, relationships, health, and skills.',
    ],
    keyTakeaways: [
      'Short-term bias is hardwired — long-term thinking requires deliberate practice',
      'The 10-10-10 framework shifts perspective across three time horizons simultaneously',
      'Short-term comfort and long-term optimization often point in opposite directions',
      'Organizational and personal excellence are built on long-term thinking disciplines',
    ],
    practicalExercise: 'Apply the 10-10-10 framework to one decision you are facing. Write your answers to: (1) How will I feel about this in 10 minutes? (2) How will I feel in 10 months? (3) How will I feel in 10 years? If the answers diverge significantly — especially if 10 minutes looks better but 10 years looks worse — treat that divergence as a signal. What does it tell you?',
    summary: 'Long-term thinking is a discipline that must be practiced against the natural pull of short-term comfort. When you consistently apply it, your decisions — and their outcomes — reflect that investment.',
  },
  'dcst-3-2': {
    objectives: [
      'Learn principles and frameworks for effective prioritization',
      'Understand the difference between urgency and importance',
      'Develop a system for focusing energy on what matters most',
    ],
    body: [
      'Prioritization is not simply organizing a to-do list. It is the strategic discipline of deciding what matters most, what can wait, and what should be eliminated entirely. Done well, prioritization multiplies your effectiveness. Done poorly, it leaves you busy with low-value activities while high-value outcomes wait indefinitely.',
      'The most widely used prioritization framework is the *Eisenhower Matrix*, named after President Dwight D. Eisenhower who described his most effective time management principle. The matrix divides activities into four quadrants based on two dimensions: urgency (does it need immediate attention?) and importance (does it meaningfully contribute to your goals?).',
      'Quadrant 1: Urgent and Important — crises, deadlines, emergencies. These must be done now. Quadrant 2: Not Urgent but Important — strategic planning, skill development, relationship building, health. These are where your highest leverage lies and are chronically neglected. Quadrant 3: Urgent but Not Important — many meetings, most interruptions, some emails. These should be delegated. Quadrant 4: Not Urgent and Not Important — time-wasting activities. These should be eliminated.',
      'Most people spend the majority of their time in Quadrant 1 (firefighting) and Quadrant 3 (responding to others\' urgencies). The result is reactive, exhausted, and low-impact work. The highest performers spend deliberate, protected time in Quadrant 2 — working on what matters before it becomes urgent.',
      'Prioritization also requires the discipline of saying no. Every yes to one activity is a no to another. When your calendar fills with Quadrant 3 activities, there is no room for Quadrant 2 investment. Protecting Quadrant 2 time requires explicitly declining or delegating non-important urgent requests — a skill that requires both judgment and confidence.',
    ],
    keyTakeaways: [
      'Prioritization is a strategic discipline, not a to-do list exercise',
      'The Eisenhower Matrix distinguishes urgency from importance across four quadrants',
      'Quadrant 2 — not urgent but important — is where highest leverage work lives',
      'Every yes is a no to something else; protecting important time requires saying no',
    ],
    practicalExercise: 'List every task or activity on your current plate. Place each in one of the four Eisenhower quadrants. Count how many items fall in each quadrant. Now ask: (1) What can I delegate from Quadrant 3? (2) What can I eliminate from Quadrant 4? (3) What Quadrant 2 activities am I currently neglecting? Block two hours this week for Quadrant 2 work.',
    summary: 'Prioritization is the skill that separates productivity from busyness. When you consistently focus on what is important — not just what is urgent — your work and your life reflect a fundamentally different level of intentionality.',
  },
  'dcst-3-3': {
    objectives: [
      'Learn the foundations of forward planning for professional and personal outcomes',
      'Understand how to work backward from a desired outcome',
      'Develop a planning discipline that makes strategy actionable',
    ],
    body: [
      'Planning ahead is not optimism — it is engineering. It is the discipline of envisioning a desired future state and reverse-engineering the steps required to produce it. People who plan consistently outperform those who do not, not because they predict the future accurately, but because their plans create direction, surface obstacles early, and allow for course correction.',
      'The most effective planning methodology is *backward planning* — also called reverse engineering or beginning with the end in mind. Start by defining the desired outcome precisely: not "I want to improve professionally" but "By December 31st, I will have completed three speaking engagements and received measurable feedback on my communication skills." Then work backward: What needs to happen in Q4? Q3? Q2? This month? This week? Today?',
      'Planning without milestones is aspiration, not strategy. Milestones are interim checkpoints that confirm progress and signal when course correction is needed. They should be specific, time-bound, and measurable. "Progress is going well" is not a milestone. "By March 15th, the first draft is complete and reviewed by two stakeholders" is a milestone.',
      'Scenario planning is the advanced form of planning ahead. Instead of planning one path forward, you develop two or three scenarios — a baseline scenario, an optimistic scenario, and a challenging scenario — and prepare responses to each. This does not mean predicting which will occur. It means being ready when circumstances shift, which they inevitably will.',
      'The planning paradox: plans rarely survive contact with reality unchanged. This does not make planning futile — it makes adaptation possible. A plan gives you a baseline from which to measure deviation. Without a plan, there is no deviation — only chaos. The discipline of planning creates the structure within which intelligent adaptation can occur.',
    ],
    keyTakeaways: [
      'Backward planning — starting with the end and working backward — produces the most actionable plans',
      'Milestones convert aspirations into measurable, time-bound checkpoints',
      'Scenario planning prepares you for change without requiring accurate prediction',
      'Plans are baselines for adaptation, not rigid commitments — the value is in the planning process itself',
    ],
    practicalExercise: 'Choose one goal you want to achieve in the next 90 days. Define it precisely. Then use backward planning: work from the 90-day mark backward to today, identifying every major milestone required. Create a timeline with at least four specific milestones. Now ask: "If this went better than expected, what would the optimistic scenario look like? If this got harder, what is the challenging scenario and how would I adapt?"',
    summary: 'Planning ahead transforms intention into strategy. When you work backward from clear outcomes and build milestones as checkpoints, you create a roadmap that guides action even when circumstances change.',
  },
  'dcst-3-4': {
    objectives: ['Assess your understanding of Module 3: Strategic Thinking'],
    body: ['Answer all questions and submit for feedback.'],
    quizQuestions: [
      {
        question: 'What does the 10-10-10 framework help you evaluate?',
        options: ['Ten decision alternatives at once', 'How you will feel about a decision in 10 minutes, 10 months, and 10 years', 'Ten risk factors of a major decision', 'A decision-making process with ten steps'],
        correct: 1,
      },
      {
        question: 'In the Eisenhower Matrix, which quadrant represents the highest-leverage work?',
        options: ['Urgent and Important', 'Not Urgent and Not Important', 'Not Urgent but Important', 'Urgent but Not Important'],
        correct: 2,
      },
      {
        question: 'What is backward planning?',
        options: ['Reviewing past decisions for learning', 'Starting with a desired future outcome and working backward to identify required steps', 'Planning for worst-case scenarios only', 'Reversing a decision after it has been made'],
        correct: 1,
      },
    ],
    summary: 'Module 3 complete. Long-term thinking, prioritization, and planning ahead are now part of your strategic toolkit. Module 4 addresses cognitive biases that undermine clear decisions.',
  },

  // Module 4 & 5 placeholders follow same pattern
  'dcst-4-1': {
    objectives: ['Recognize how emotions distort decision-making', 'Learn tools to separate emotion from evaluation'],
    body: [
      'Emotions are not enemies of good decision-making — unexamined emotions are. Research by neuroscientist Antonio Damasio shows that completely emotion-free decisions are actually worse, because emotions carry important information about our values and priorities. The problem arises when emotions hijack the process rather than inform it.',
      'The most dangerous emotional states for decision-making are high arousal states: anger, excitement, anxiety, and grief. In these states, the brain\'s threat-detection and reward-seeking systems are dominant, and the prefrontal cortex — responsible for rational evaluation — is functionally impaired. Making major decisions in these states reliably produces regret.',
      'The discipline of emotional decision-making has one primary rule: never make a significant, irreversible decision in a high-arousal emotional state. The feelings that make immediate action feel urgent are precisely the feelings that make good decisions least likely. When you feel a strong emotional pull toward immediate action, that feeling is a signal to wait — not a reason to proceed.',
      'Sleep is one of the most reliable decision quality enhancers available. Research consistently shows that sleeping on a decision — even for one night — produces measurably different and generally better choices. The brain continues processing during sleep, and the emotional intensity of the previous day diminishes, allowing clearer evaluation. "Sleep on it" is evidence-based advice.',
      'The tool that most reliably separates emotion from evaluation is writing. Write out the decision, your options, and your emotional state. Then set it aside for a defined period — an hour, a day, a weekend — and revisit it with fresh eyes. What you wrote reveals the emotional coloring. The fresh read reveals what the rational brain would choose.',
    ],
    keyTakeaways: [
      'Emotions carry information — unexamined emotions distort decisions',
      'Never make significant irreversible decisions in high-arousal emotional states',
      'Sleeping on decisions is evidence-based, not procrastination',
      'Writing out decisions externalizes and reveals emotional biases',
    ],
    practicalExercise: 'Identify a decision you made in the last month that you now question. Reconstruct your emotional state at the time of the decision. Were you excited, anxious, frustrated, or pressured? How did that state affect the choice you made? What would you decide now, with a calmer and clearer mind? Use this reflection to identify your personal emotional decision-making vulnerabilities.',
    summary: 'Emotional intelligence in decision-making is not suppressing emotions — it is knowing when they are informing you versus when they are distorting you. The discipline of waiting is the most powerful antidote.',
  },
  'dcst-4-2': {
    objectives: ['Understand what confirmation bias is and how it distorts evaluation', 'Learn strategies for seeking disconfirming information'],
    body: [
      'Confirmation bias is the tendency to seek, interpret, and remember information in a way that confirms what we already believe or want to believe. It is one of the most pervasive and consequential cognitive biases in human decision-making, and it operates almost entirely outside our awareness.',
      'The mechanics are straightforward: once you form a preliminary preference or belief, your brain begins filtering incoming information through that preference. Evidence that supports it feels compelling and clear. Evidence that contradicts it feels weak or irrelevant. Over time, your confidence in the original belief increases — not because you have found more evidence, but because you have filtered out the evidence against it.',
      'Confirmation bias is especially dangerous in high-stakes decisions because the higher our emotional investment in an outcome, the stronger the bias operates. We want a candidate to be right for the role, so we notice their strengths and discount their weaknesses. We want an investment to perform, so we focus on the optimistic forecasts and minimize the bearish signals.',
      'The antidote to confirmation bias is *active search for disconfirming information*. Before finalizing any significant decision, explicitly ask: "What would I need to see to change my mind?" Then go look for it. Read the opposing argument. Talk to someone who disagrees with your preferred option. If you cannot find any disconfirming information — if everything you encounter seems to support your view — you are almost certainly inside a confirmation bubble.',
      'The practice of "steel-manning" is particularly valuable. Steel-manning is the opposite of straw-manning: instead of creating the weakest version of the opposing argument, you construct the strongest version. You argue for the opposite position as compellingly as you can. If you cannot make a strong case for the other side, you have not understood it well enough to make an informed decision.',
    ],
    keyTakeaways: [
      'Confirmation bias filters information to support existing beliefs — largely unconsciously',
      'Emotional investment in an outcome amplifies confirmation bias',
      'Actively seek disconfirming information before finalizing significant decisions',
      'Steel-manning — making the strongest case for the opposition — builds genuine understanding',
    ],
    practicalExercise: 'Choose a belief or preference you hold with confidence. Spend 30 minutes actively seeking the strongest possible arguments against it. Do not look for weak objections — find the best counterarguments available. After the exercise: Has your confidence changed? Have you updated your view? What did the exercise reveal about your information environment?',
    summary: 'Confirmation bias is not a character flaw — it is a feature of human cognition. Knowing it exists and building systematic habits to counteract it is the mark of a genuinely clear thinker.',
  },
  'dcst-4-3': {
    objectives: ['Understand what overthinking is and why it impairs decision quality', 'Learn strategies for making decisions without paralysis'],
    body: [
      'Overthinking is the cognitive trap of processing a decision far beyond the point where additional thinking produces additional clarity. Past a certain threshold, more thinking does not produce better decisions — it produces anxiety, exhaustion, and paralysis. The challenge is that the threshold is invisible from inside the process.',
      'Research by psychologist Barry Schwartz — articulated in The Paradox of Choice — shows that more options and more deliberation correlate with lower satisfaction with outcomes. Maximizers (those who try to find the objectively best option) consistently report lower wellbeing than satisficers (those who look for "good enough"). The pursuit of perfect information and the perfect choice is itself a barrier to good decisions.',
      'One root cause of overthinking is perfectionism — the belief that a wrong decision is worse than no decision at all. This belief is almost always false. A wrong decision can be corrected, learned from, and reversed in most cases. No decision allows situations to deteriorate passively while maintaining the illusion that you still have options. Inaction is itself a choice, with its own consequences.',
      'The most practical antidote to overthinking is *time-boxing your deliberation*. Before starting to evaluate a decision, decide how much time it deserves. A minor operational decision: 10 minutes. A moderate professional decision: one week. A major life decision: one month. When the time box expires, you commit. This forces prioritization of your thinking time and prevents indefinite loops.',
      'The "good enough" standard — borrowed from satisficing theory — is another powerful tool. Define in advance what "good enough" looks like for this decision. Once you identify an option that meets that standard, commit. Continuing to search for something better almost always costs more in time, energy, and opportunity than the marginal improvement could possibly provide.',
    ],
    keyTakeaways: [
      'Overthinking does not improve decisions — past a threshold, it impairs them',
      'Inaction is itself a decision with consequences — it is not a safe default',
      'Time-boxing deliberation prevents indefinite loops and forces commitment',
      'The satisficing standard — "good enough" — consistently outperforms maximizing in wellbeing and efficiency',
    ],
    practicalExercise: 'Identify a decision you have been overthinking. First, define "good enough" for this decision — what would an acceptable outcome look like? Second, set a specific deadline for making the decision (no more than 72 hours from now). Third, identify which of the current options meets the "good enough" standard. Commit to that option before your deadline. Reflect on how it feels to have decided.',
    summary: 'Overthinking is the enemy of action and often masquerades as thoroughness. The discipline of time-boxing and the practice of satisficing frees you from paralysis and restores decision momentum.',
  },
  'dcst-4-4': {
    objectives: ['Assess your understanding of Module 4: Avoiding Cognitive Mistakes'],
    body: ['Answer all questions and submit for feedback.'],
    quizQuestions: [
      {
        question: 'What is the primary problem with making important decisions in high-arousal emotional states?',
        options: ['Decisions made quickly tend to be worse', 'The prefrontal cortex is functionally impaired, reducing rational evaluation', 'Emotions always lead to wrong decisions', 'High-arousal states reduce creativity'],
        correct: 1,
      },
      {
        question: 'What does "steel-manning" an opposing argument mean?',
        options: ['Finding the weakest version of an opposing view to dismiss it', 'Constructing the strongest possible version of the opposing argument', 'Using physical metaphors in debate', 'Delegating difficult arguments to others'],
        correct: 1,
      },
      {
        question: 'What is the "satisficing" approach to decisions?',
        options: ['Always seeking the mathematically optimal choice', 'Making no decision until perfect information is available', 'Choosing an option that meets a "good enough" standard and committing', 'Satisfying the needs of all stakeholders equally'],
        correct: 2,
      },
    ],
    summary: 'Module 4 complete. You now understand how to recognize and manage emotional decisions, confirmation bias, and overthinking. Final module: Problem Solving and Execution.',
  },

  'dcst-5-1': {
    objectives: ['Learn how to decompose complex problems into solvable steps', 'Understand the power of structured problem decomposition'],
    body: [
      'Every complex problem, when examined closely, is a collection of simpler problems. The skill of breaking problems into steps — also called problem decomposition — is the foundation of effective problem-solving in every professional domain.',
      'The first step in decomposition is to clearly state the problem in a single sentence. Not the symptoms. Not the causes. The problem itself. "Our customer retention rate has fallen from 85% to 72% over 18 months." This specificity makes the problem concrete and measurable.',
      'Then ask: "What are the component parts of this problem?" A retention problem might decompose into: product satisfaction issues, customer service failures, competitive alternatives, pricing misalignment, and communication gaps. Each of these is now a smaller, more tractable problem with its own causes and solutions.',
      'Decomposition also reveals which components are within your control and which are not. Separating controllable from uncontrollable factors prevents wasted energy on unchangeable conditions and focuses effort where it can actually make a difference.',
      'The *MECE* principle (Mutually Exclusive, Collectively Exhaustive) from McKinsey consulting provides a useful standard for decomposition. Your components should be MECE: no overlap between categories, and together they should cover the entire problem space. If components overlap or leave gaps, your decomposition is incomplete and will lead to incomplete solutions.',
    ],
    keyTakeaways: [
      'Complex problems are collections of simpler problems — decompose before solving',
      'State the problem specifically and measurably before beginning decomposition',
      'Separate controllable from uncontrollable factors to focus effort effectively',
      'MECE decomposition — mutually exclusive, collectively exhaustive — ensures complete analysis',
    ],
    practicalExercise: 'Take one complex problem from your life or work. Write it in one specific, measurable sentence. Then decompose it into at least four distinct component problems. For each component, ask: "Is this within my control?" and "What are the two or three most likely causes?" You now have a map of the problem space — the precondition for solving it effectively.',
    summary: 'Problems that feel overwhelming in their entirety become manageable when broken into components. Decomposition is not just an analytical tool — it is a psychological intervention that makes action possible.',
  },
  'dcst-5-2': {
    objectives: ['Learn how to translate decisions into specific, executable action plans', 'Understand the elements of an effective action plan'],
    body: [
      'A decision without an action plan is an intention. Intentions do not produce results — actions do. The gap between deciding and doing is where most initiatives fail, most goals go unmet, and most good ideas die. Bridging that gap requires a structured action plan.',
      'An effective action plan has five elements. First, *specific actions* — not "work on the project" but "complete the competitive analysis section of the proposal." Second, *owners* — every action has one person responsible for it. When everyone is responsible, no one is. Third, *deadlines* — specific dates, not "soon" or "by end of month." Fourth, *resources* — what does this action require in terms of time, budget, tools, or support? Fifth, *success criteria* — how will you know this action has been completed to the right standard?',
      'The implementation intention is a research-backed technique for dramatically increasing follow-through. Instead of stating a goal, you state it as an if-then plan: "When [situation], I will [action]." Studies by psychologist Peter Gollwitzer found that implementation intentions increase goal achievement by 200-300% compared to goal-setting alone. "I will complete the competitive analysis" becomes "When I sit down at my desk on Tuesday morning, the first thing I will do is open the competitive analysis document and work on it for 90 minutes before checking email."',
      'Accountability structures multiply action plan effectiveness. Telling someone else your commitment creates social accountability. Weekly check-ins — even brief — create review pressure. Public commitments are more likely to be kept than private ones. The accountability partner does not need to supervise your work; they simply need to know you committed.',
      'Progress tracking is the final element. Without tracking, there is no way to know whether you are on course. Tracking does not need to be complex — a simple checklist, a weekly review, or a progress chart is sufficient. The act of measuring creates momentum: completion feels satisfying and drives further action.',
    ],
    keyTakeaways: [
      'Every action must have a specific owner, deadline, and success criteria',
      'Implementation intentions — if-then plans — increase follow-through by 200-300%',
      'Accountability structures, even simple ones, dramatically increase completion rates',
      'Progress tracking creates momentum and provides early warning of deviation',
    ],
    practicalExercise: 'Take one of your current goals and convert it into a full action plan: List every specific action, assign an owner (even if it is all you), set a deadline for each, identify required resources, and define what "done" looks like. Then convert your first action into an implementation intention: "When [situation], I will [specific action]." Commit to beginning within the next 48 hours.',
    summary: 'An action plan transforms a decision into a system. When you specify who does what, by when, with what resources, and to what standard, execution becomes inevitable rather than aspirational.',
  },
  'dcst-5-3': {
    objectives: ['Learn how to evaluate outcomes for learning and improvement', 'Develop a structured after-action review practice'],
    body: [
      'Most people make a decision, implement it, experience the outcome, and move on. The learning that outcomes could generate — the insight that would make the next decision better — is left on the table. Reviewing outcomes is the discipline that converts experience into expertise.',
      'The military\'s After Action Review (AAR) is one of the most effective outcome review processes ever developed. It asks four questions: What was planned? What actually happened? Why was there a difference? What will we do differently next time? These four questions, applied honestly, produce profound learning from every significant outcome — success and failure alike.',
      'Outcome reviews require psychological safety — the willingness to examine what went wrong without judgment or blame. The most common barrier to honest outcome review is ego protection: we attribute successes to our skill and failures to external circumstances. This attribution error prevents learning and ensures the same mistakes recur.',
      'Regular review cadences build reflection into practice. Weekly: what did I decide and how is it playing out? Monthly: what are the patterns in my decisions and outcomes over the past 30 days? Quarterly: what decisions most significantly shaped this quarter, and what do they reveal about my decision-making tendencies? These reviews, kept brief and consistent, compound into significant self-knowledge over time.',
      'The goal of outcome review is not to be harder on yourself — it is to be more accurate. The most successful people in any field have a distinctive relationship with failure: they treat it as data, not verdict. Each failed decision is information about the world, about their own cognitive patterns, and about what to change. This orientation toward learning converts even poor decisions into long-term assets.',
    ],
    keyTakeaways: [
      'Outcome review converts experience into expertise — skipping it leaves learning on the table',
      'The After Action Review: planned vs. actual, why the difference, what to change',
      'Honest review requires confronting attribution error — our tendency to blame externals for failures',
      'Regular review cadences compound into significant self-knowledge over time',
    ],
    practicalExercise: 'Conduct a personal After Action Review for one significant decision or project from the past three months. Answer all four questions in writing: (1) What was planned? (2) What actually happened? (3) Why was there a difference? (4) What will I do differently next time? Be rigorously honest, particularly in question 3. What does this reveal about your decision-making tendencies?',
    summary: 'Reviewing outcomes is how experience becomes wisdom. Without deliberate reflection, we repeat the same patterns in different disguises. With it, we compound our judgment and become progressively better at the decisions that shape our lives.',
  },
  'dcst-5-4': {
    objectives: ['Complete the final assessment for Course 2: Decision Clarity & Strategic Thinking'],
    body: ['This final assessment covers all five modules. Completion earns your Decision Clarity & Strategic Thinking Certificate.'],
    quizQuestions: [
      {
        question: 'What does the MECE principle in problem decomposition stand for?',
        options: ['Most Effective Cognitive Evaluation', 'Mutually Exclusive, Collectively Exhaustive', 'Multiple Ends, Centralized Execution', 'Managed Evidence for Clear Evaluation'],
        correct: 1,
      },
      {
        question: 'Research by Peter Gollwitzer found that implementation intentions increase goal achievement by approximately:',
        options: ['10-20%', '50-75%', '200-300%', 'They have no significant effect'],
        correct: 2,
      },
      {
        question: 'What is the primary purpose of an After Action Review?',
        options: ['To assign blame for failures', 'To document outcomes for compliance purposes', 'To convert experience into learning by examining planned vs. actual outcomes', 'To celebrate successes and reward the team'],
        correct: 2,
      },
    ],
    summary: 'Congratulations — you have completed Decision Clarity & Strategic Thinking. You now have a comprehensive decision-making system covering clear thinking, frameworks, strategy, bias management, and execution. Your certificate is ready.',
  },
};

// ════════════════════════════════════════
// COURSE 3: Digital Mindfulness & Modern Life Balance
// ════════════════════════════════════════
const DMML_CONTENT: Record<string, LessonContent> = {
  'dmml-1-1': {
    objectives: ["Understand how digital platforms affect attention, focus, and daily behavior.", "Why Digital Distraction Happens"],
    body: [
      "Modern apps and platforms are designed to continuously capture attention.",
      "Notifications, short videos, endless scrolling, and instant updates make it easy to lose focus without realizing it.",
      "For example:",
      "A student opens their phone to reply to one message.",
      "A few minutes later:",
      "* they start watching short videos",
      "* switch between apps",
      "* forget the original task",
      "What was supposed to take 2 minutes becomes 30 minutes of distraction.",
      "This happens because digital platforms are built to encourage continuous engagement.",
      "Common digital distractions include:",
      "\u2022 notifications",
      "\u2022 social media scrolling",
      "\u2022 constant app switching",
      "\u2022 multitasking between screens",
      "Over time, frequent distractions reduce the ability to focus deeply on one task.",
      "A useful principle:",
      "Attention moves where stimulation is strongest.",
      "Learning to manage attention is an important modern skill.",
    ],
    summary: "End of Why Digital Distraction Happens."
  },
  'dmml-1-2': {
    objectives: ["Understand how digital platforms affect attention, focus, and daily behavior.", "The Myth of Multitasking"],
    body: [
      "Many people believe multitasking improves productivity.",
      "In reality, constantly switching between tasks reduces focus and efficiency.",
      "For example:",
      "A student is:",
      "* attending an online lecture",
      "* replying to messages",
      "* checking social media",
      "* watching videos",
      "Although multiple activities are happening at once, the brain is not fully focused on any one task.",
      "This creates:",
      "\u2022 lower concentration",
      "\u2022 more mistakes",
      "\u2022 mental fatigue",
      "Research shows that the brain performs better when attention is focused on one important task at a time.",
      "A better approach is:",
      "\u2022 complete one task",
      "\u2022 then move to the next task",
      "This helps improve both focus and quality of work.",
      "A simple rule:",
      "Focused attention is more effective than divided attention.",
    ],
    summary: "End of The Myth of Multitasking."
  },
  'dmml-1-3': {
    objectives: ["Understand how digital platforms affect attention, focus, and daily behavior.", "Attention Is a Limited Resource"],
    body: [
      "Attention works like energy.",
      "The more it is constantly interrupted, the harder it becomes to focus deeply.",
      "For example:",
      "A person studying for an exam may receive:",
      "* notifications",
      "* messages",
      "* social media updates",
      "Each interruption breaks concentration.",
      "Even short distractions can make it difficult to return to deep focus.",
      "Over time, this creates:",
      "\u2022 shorter attention span",
      "\u2022 mental exhaustion",
      "\u2022 reduced productivity",
      "Strong focus requires periods of uninterrupted attention.",
      "Simple habits can help protect attention:",
      "\u2022 turning off unnecessary notifications",
      "\u2022 keeping the phone away during important work",
      "\u2022 scheduling focused work sessions",
      "A useful principle:",
      "What repeatedly receives your attention shapes your habits and thinking.",
    ],
    summary: "End of Attention Is a Limited Resource."
  },
  'dmml-1-4': {
    objectives: ['Assess your understanding of Module 1'],
    body: ['Answer all questions and submit.'],
    quizQuestions: [
      {
        question: "Why do digital distractions easily capture attention?",
        options: ["Phones are naturally harmful", "Digital platforms are designed to encourage engagement", "Notifications improve focus", "Multitasking improves concentration"],
        correct: 1,
      },
      {
        question: "What is a major problem with multitasking?",
        options: ["It improves deep focus", "It reduces concentration and efficiency", "It increases attention span", "It reduces mental fatigue"],
        correct: 1,
      },
    ],
    summary: 'Module 1 complete.'
  },
  'dmml-2-1': {
    objectives: ["Learn how to use technology more intentionally, reduce unnecessary screen time, and build healthier digital habits without completely avoiding technology.", "Track Where Your Time Goes"],
    body: [
      "Many people underestimate how much time they spend on their phones.",
      "Short periods of scrolling throughout the day can add up to several hours without notice.",
      "For example:",
      "A person checks social media:",
      "* for 5 minutes after waking up",
      "* during meals",
      "* between study sessions",
      "* before sleeping",
      "Individually, each session feels small.",
      "But together, they may total 3\u20135 hours daily.",
      "The first step toward better digital balance is awareness.",
      "Most smartphones now provide:",
      "\u2022 screen time reports",
      "\u2022 app usage statistics",
      "\u2022 daily usage breakdowns",
      "Tracking usage helps answer important questions:",
      "\u2022 Which apps consume the most time?",
      "\u2022 Is the usage intentional or automatic?",
      "\u2022 Which habits reduce productivity?",
      "A useful principle:",
      "You cannot improve habits you do not measure.",
    ],
    summary: "End of Track Where Your Time Goes."
  },
  'dmml-2-2': {
    objectives: ["Learn how to use technology more intentionally, reduce unnecessary screen time, and build healthier digital habits without completely avoiding technology.", "Reduce Unnecessary Notifications"],
    body: [
      "Notifications constantly compete for attention.",
      "Even when ignored, they interrupt concentration and increase mental distraction.",
      "For example:",
      "A student studying for an exam receives:",
      "* social media notifications",
      "* shopping app alerts",
      "* promotional messages",
      "* group chat updates",
      "Each notification pulls attention away from the task.",
      "Over time, this creates fragmented focus.",
      "A more intentional approach is to:",
      "\u2022 turn off non-essential notifications",
      "\u2022 keep only important alerts active",
      "\u2022 schedule specific times to check messages",
      "This reduces unnecessary interruptions and helps create longer periods of focused attention.",
      "A useful rule:",
      "Not every notification deserves immediate attention.",
    ],
    summary: "End of Reduce Unnecessary Notifications."
  },
  'dmml-2-3': {
    objectives: ["Learn how to use technology more intentionally, reduce unnecessary screen time, and build healthier digital habits without completely avoiding technology.", "Create Intentional Usage Habits"],
    body: [
      "Technology becomes harmful when usage becomes automatic instead of intentional.",
      "For example:",
      "Many people unlock their phones without a clear purpose.",
      "A quick check for one message can become:",
      "* endless scrolling",
      "* switching between apps",
      "* consuming random content",
      "Intentional usage means using technology with a specific purpose.",
      "Before opening an app, ask:",
      "\u2022 Why am I opening this app?",
      "\u2022 What task do I want to complete?",
      "\u2022 How much time should I spend here?",
      "Simple habits can improve digital control:",
      "\u2022 keeping the phone away during focused work",
      "\u2022 avoiding screens during meals",
      "\u2022 limiting screen use before sleep",
      "These habits help reduce unconscious digital behavior.",
      "A useful principle:",
      "Use technology as a tool, not as constant stimulation.",
    ],
    summary: "End of Create Intentional Usage Habits."
  },
  'dmml-2-4': {
    objectives: ['Assess your understanding of Module 2'],
    body: ['Answer all questions and submit.'],
    quizQuestions: [
      {
        question: "Why is attention considered a limited resource?",
        options: ["It can handle unlimited interruptions", "Constant interruptions reduce deep focus", "Notifications improve concentration", "Attention does not affect productivity"],
        correct: 1,
      },
      {
        question: "What is the first step toward improving digital habits?",
        options: ["Deleting all apps", "Tracking screen time usage", "Avoiding technology completely", "Buying productivity tools"],
        correct: 1,
      },
      {
        question: "Why should unnecessary notifications be reduced?",
        options: ["They improve multitasking", "They increase concentration breaks and distractions", "They reduce productivity tracking", "They make apps slower"],
        correct: 1,
      },
    ],
    summary: 'Module 2 complete.'
  },
  'dmml-3-1': {
    objectives: ["Learn how to rebuild focus, improve concentration, and reduce attention fatigue in a highly distracting digital environment.", "Deep Focus vs Constant Distraction"],
    body: [
      "Modern digital environments train the brain to constantly switch attention.",
      "Short videos, rapid scrolling, and continuous notifications make it difficult to stay focused on one task for a long time.",
      "For example:",
      "A student starts studying for an exam.",
      "Within a few minutes:",
      "* a message notification appears",
      "* social media is checked",
      "* another app is opened",
      "Even short interruptions reduce concentration.",
      "Deep focus happens when attention stays fully connected to one important task without frequent distractions.",
      "This is when:",
      "\u2022 learning improves",
      "\u2022 productivity increases",
      "\u2022 ideas become clearer",
      "Deep focus requires:",
      "\u2022 uninterrupted time",
      "\u2022 fewer distractions",
      "\u2022 sustained attention",
      "A useful principle:",
      "Focus grows when distractions are reduced consistently.",
    ],
    summary: "End of Deep Focus vs Constant Distraction."
  },
  'dmml-3-2': {
    objectives: ["Learn how to rebuild focus, improve concentration, and reduce attention fatigue in a highly distracting digital environment.", "Protect Your Focus Environment"],
    body: [
      "Focus is strongly influenced by the surrounding environment.",
      "For example:",
      "Trying to study while:",
      "* notifications are active",
      "* multiple tabs are open",
      "* videos are playing in the background",
      "makes concentration more difficult.",
      "A better focus environment includes:",
      "\u2022 clean workspace",
      "\u2022 fewer distractions",
      "\u2022 silent notifications",
      "\u2022 clear task priority",
      "Small environmental changes can improve concentration significantly.",
      "For example:",
      "* keeping the phone away during focused work",
      "* using full-screen mode while studying",
      "* working in quiet spaces",
      "These changes reduce unnecessary attention shifts.",
      "A useful rule:",
      "Your environment influences your attention more than motivation alone.",
    ],
    summary: "End of Protect Your Focus Environment."
  },
  'dmml-3-3': {
    objectives: ["Learn how to rebuild focus, improve concentration, and reduce attention fatigue in a highly distracting digital environment.", "Give Your Brain Time to Recover"],
    body: [
      "Continuous stimulation can mentally exhaust attention.",
      "Many people move constantly between:",
      "* social media",
      "* videos",
      "* music",
      "* messages",
      "* work tasks",
      "without giving the brain time to rest.",
      "As a result:",
      "\u2022 concentration decreases",
      "\u2022 mental fatigue increases",
      "\u2022 focus becomes weaker",
      "Attention recovery requires periods of low stimulation.",
      "Simple recovery habits include:",
      "\u2022 short breaks between deep work sessions",
      "\u2022 walking without using the phone",
      "\u2022 spending time away from screens",
      "\u2022 avoiding excessive content consumption before sleep",
      "These activities help the brain reset and recover attention capacity.",
      "A useful principle:",
      "Rest is necessary for sustained focus.",
    ],
    summary: "End of Give Your Brain Time to Recover."
  },
  'dmml-3-4': {
    objectives: ['Assess your understanding of Module 3'],
    body: ['Answer all questions and submit.'],
    quizQuestions: [
      {
        question: "What is intentional technology use?",
        options: ["Using multiple apps at once", "Using technology with a clear purpose and limit", "Constantly checking notifications", "Spending more time online"],
        correct: 1,
      },
      {
        question: "What is deep focus?",
        options: ["Using multiple apps at the same time", "Maintaining uninterrupted attention on one task", "Constantly switching tasks", "Watching educational videos while studying"],
        correct: 1,
      },
      {
        question: "Why is the focus environment important?",
        options: ["Motivation alone controls attention", "The environment affects concentration and distractions", "Notifications improve focus", "Workspace setup does not matter"],
        correct: 1,
      },
    ],
    summary: 'Module 3 complete.'
  },
  'dmml-4-1': {
    objectives: ["Learn how to build sustainable digital habits that improve focus, sleep, productivity, and overall mental balance.", "Build Device-Free Routines"],
    body: [
      "Many digital habits become automatic because phones are constantly nearby.",
      "For example:",
      "Some people:",
      "* check their phone immediately after waking up",
      "* use screens during meals",
      "* scroll continuously before sleeping",
      "Over time, this creates dependency on constant stimulation.",
      "Building device-free routines helps create healthier boundaries with technology.",
      "Simple examples include:",
      "\u2022 avoiding phone use during meals",
      "\u2022 keeping phones away during study sessions",
      "\u2022 spending the first 30 minutes after waking up without screens",
      "These routines help reduce automatic phone checking and improve awareness.",
      "A useful principle:",
      "Not every moment needs digital stimulation.",
    ],
    summary: "End of Build Device-Free Routines."
  },
  'dmml-4-2': {
    objectives: ["Learn how to build sustainable digital habits that improve focus, sleep, productivity, and overall mental balance.", "Manage Screen Exposure Before Sleep"],
    body: [
      "Screen usage late at night can affect sleep quality.",
      "For example:",
      "Many people use:",
      "* social media",
      "* videos",
      "* messaging apps",
      "immediately before sleeping.",
      "Continuous screen exposure keeps the brain mentally active and makes relaxation more difficult.",
      "Poor sleep can lead to:",
      "\u2022 lower concentration",
      "\u2022 mental fatigue",
      "\u2022 reduced productivity",
      "Healthier habits include:",
      "\u2022 reducing screen usage before bedtime",
      "\u2022 avoiding stimulating content late at night",
      "\u2022 creating a consistent sleep schedule",
      "Even small improvements in nighttime digital habits can improve recovery and focus.",
      "A useful rule:",
      "Better sleep supports better attention and decision-making.",
    ],
    summary: "End of Manage Screen Exposure Before Sleep."
  },
  'dmml-4-3': {
    objectives: ["Learn how to build sustainable digital habits that improve focus, sleep, productivity, and overall mental balance.", "Replace Passive Consumption With Intentional Use"],
    body: [
      "A large amount of digital time is spent consuming content passively.",
      "For example:",
      "* endless scrolling",
      "* random video watching",
      "* repeatedly switching apps without purpose",
      "This often creates mental fatigue without adding real value.",
      "Intentional digital use focuses on:",
      "\u2022 learning",
      "\u2022 communication",
      "\u2022 productivity",
      "\u2022 meaningful entertainment",
      "Before consuming content, ask:",
      "\u2022 Is this useful?",
      "\u2022 Am I choosing this intentionally?",
      "\u2022 Is this helping or simply filling time?",
      "Strong digital habits are built by becoming more conscious of how technology is used.",
      "A useful principle:",
      "Technology should support your goals, not control your attention.",
    ],
    summary: "End of Replace Passive Consumption With Intentional Use."
  },
  'dmml-4-4': {
    objectives: ['Assess your understanding of Module 4'],
    body: ['Answer all questions and submit.'],
    quizQuestions: [
      {
        question: "Why is attention recovery important?",
        options: ["Continuous stimulation improves concentration", "Rest helps restore focus and reduce mental fatigue", "Screen exposure improves sleep quality", "Breaks reduce productivity permanently"],
        correct: 1,
      },
      {
        question: "Why are device-free routines useful?",
        options: ["They eliminate technology completely", "They help reduce automatic digital habits", "They increase screen dependency", "They reduce productivity permanently"],
        correct: 1,
      },
      {
        question: "How can late-night screen usage affect people?",
        options: ["It improves recovery", "It increases sleep quality", "It can reduce sleep quality and focus", "It improves concentration immediately"],
        correct: 2,
      },
    ],
    summary: 'Module 4 complete.'
  },
  'dmml-5-1': {
    objectives: ["Learn how to maintain a healthy balance between digital life, real-world responsibilities, relationships, and personal well-being.", "Balance Online and Offline Life"],
    body: [
      "Technology is now part of daily life.",
      "People use digital platforms for:",
      "* communication",
      "* learning",
      "* entertainment",
      "* work",
      "However, problems begin when digital life completely replaces offline experiences.",
      "For example:",
      "A person may spend hours:",
      "* scrolling social media",
      "* watching videos",
      "* chatting online",
      "but very little time:",
      "* interacting with family",
      "* exercising",
      "* developing real-world skills",
      "* resting properly",
      "Over time, this creates imbalance.",
      "Healthy digital balance means making time for both:",
      "\u2022 online activities",
      "\u2022 offline experiences",
      "Offline activities such as:",
      "* physical exercise",
      "* face-to-face conversations",
      "* hobbies",
      "* time in nature",
      "help improve mental clarity and reduce overstimulation.",
      "A useful principle:",
      "Technology should support life, not replace it.",
    ],
    summary: "End of Balance Online and Offline Life."
  },
  'dmml-5-2': {
    objectives: ["Learn how to maintain a healthy balance between digital life, real-world responsibilities, relationships, and personal well-being.", "Create Boundaries With Technology"],
    body: [
      "Without boundaries, digital usage can expand into every part of the day.",
      "For example:",
      "Many people:",
      "* check phones during conversations",
      "* use screens while eating",
      "* continue working late into the night",
      "This reduces focus, presence, and recovery time.",
      "Healthy boundaries help create more control over digital habits.",
      "Examples of useful boundaries:",
      "\u2022 no phone during meals",
      "\u2022 fixed times for checking social media",
      "\u2022 screen-free time before sleep",
      "\u2022 focused work periods without interruptions",
      "Boundaries are not about avoiding technology completely.",
      "They are about using technology intentionally instead of constantly.",
      "A useful rule:",
      "If technology controls your attention all day, balance becomes difficult.",
    ],
    summary: "End of Create Boundaries With Technology."
  },
  'dmml-5-3': {
    objectives: ["Learn how to maintain a healthy balance between digital life, real-world responsibilities, relationships, and personal well-being.", "Build a Sustainable Digital Lifestyle"],
    body: [
      "Many people try extreme digital detox methods but return to old habits quickly.",
      "Long-term balance is created through sustainable habits, not temporary extremes.",
      "For example:",
      "Instead of:",
      "* deleting every app suddenly",
      "* avoiding technology completely",
      "a sustainable approach would be:",
      "\u2022 reducing unnecessary screen time gradually",
      "\u2022 improving focus habits step by step",
      "\u2022 creating realistic digital boundaries",
      "Small consistent improvements are easier to maintain long-term.",
      "A balanced digital lifestyle should support:",
      "\u2022 productivity",
      "\u2022 learning",
      "\u2022 relationships",
      "\u2022 mental well-being",
      "Technology is most useful when it helps people achieve meaningful goals without controlling their attention constantly.",
      "A useful principle:",
      "Sustainable habits create long-term balance.",
    ],
    summary: "End of Build a Sustainable Digital Lifestyle."
  },
  'dmml-5-4': {
    objectives: ['Assess your understanding of Module 5'],
    body: ['Answer all questions and submit.'],
    quizQuestions: [
      {
        question: "What is intentional technology use?",
        options: ["Endless scrolling", "Using technology consciously for meaningful purposes", "Constant multitasking", "Continuous content consumption"],
        correct: 1,
      },
      {
        question: "Why is balancing online and offline life important?",
        options: ["Technology should replace real-world experiences", "Offline experiences support mental clarity and well-being", "Social media improves all relationships automatically", "Online life is more important than offline life"],
        correct: 1,
      },
      {
        question: "What is the purpose of creating digital boundaries?",
        options: ["To avoid all technology", "To use technology more intentionally and maintain balance", "To increase screen dependency", "To multitask more effectively"],
        correct: 1,
      },
      {
        question: "What is the best approach for long-term digital balance?",
        options: ["Extreme digital detox permanently", "Avoiding all devices", "Building sustainable habits gradually", "Using more productivity apps continuously"],
        correct: 2,
      },
      {
        question: "A student opens a phone to reply to one message but spends 40 minutes scrolling social media.",
        options: ["Lack of internet access", "Digital distraction and unintentional usage", "Excessive studying", "Too much offline activity"],
        correct: 1,
      },
      {
        question: "Why is multitasking often ineffective?",
        options: ["It improves concentration", "It reduces attention quality and focus", "It increases deep work", "It helps memory retention"],
        correct: 1,
      },
      {
        question: "What is a useful first step toward improving digital habits?",
        options: ["Deleting all apps immediately", "Tracking screen time usage", "Avoiding all technology", "Buying a new phone"],
        correct: 1,
      },
      {
        question: "Why should unnecessary notifications be reduced?",
        options: ["They improve productivity", "They interrupt concentration and attention", "They improve deep focus", "They reduce app usage statistics"],
        correct: 1,
      },
      {
        question: "What is deep focus?",
        options: ["Constantly switching between apps", "Working while watching videos", "Maintaining uninterrupted attention on one task", "Multitasking efficiently"],
        correct: 2,
      },
      {
        question: "How can focus environments be improved?",
        options: ["Keeping notifications active", "Opening multiple apps during work", "Reducing distractions and interruptions", "Watching videos while studying"],
        correct: 2,
      },
      {
        question: "Why is attention recovery important?",
        options: ["Continuous stimulation improves concentration", "The brain needs periods of reduced stimulation to recover focus", "Notifications improve mental recovery", "Constant screen exposure improves sleep"],
        correct: 1,
      },
      {
        question: "How can screen usage before sleep affect people?",
        options: ["It improves concentration immediately", "It can reduce sleep quality and recovery", "It improves memory automatically", "It increases deep focus at night"],
        correct: 1,
      },
      {
        question: "What is intentional technology use?",
        options: ["Endless scrolling without purpose", "Using technology consciously for meaningful tasks", "Constant multitasking", "Switching between apps continuously"],
        correct: 1,
      },
      {
        question: "What creates long-term digital balance?",
        options: ["Extreme short-term detox methods", "Avoiding all devices permanently", "Sustainable habits and healthy boundaries", "Constant productivity tracking"],
        correct: 2,
      },
    ],
    summary: 'Congratulations — you have completed Digital Mindfulness & Modern Life Balance.'
  },
};

// Master content lookup — keyed by unit ID
const ALL_LESSON_CONTENT: Record<string, LessonContent> = {
  ...FCC_CONTENT,
  ...DCST_CONTENT,
  ...DMML_CONTENT,
};

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string; border: string }> = {
  reading:     { icon: <BookOpen className="w-4 h-4" />,   label: 'Reading',    color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  reflection:  { icon: <PenLine className="w-4 h-4" />,    label: 'Reflection', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  activity:    { icon: <PlayCircle className="w-4 h-4" />, label: 'Activity',   color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  quiz:        { icon: <HelpCircle className="w-4 h-4" />, label: 'Assessment', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  mindfulness: { icon: <Leaf className="w-4 h-4" />,       label: 'Practice',   color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
};

const PATH_ICONS: Record<string, React.ReactNode> = {
  'foundations-of-clear-communication':      <Users className="w-5 h-5" />,
  'decision-clarity-strategic-thinking':     <Brain className="w-5 h-5" />,
  'digital-mindfulness-modern-life-balance': <Leaf className="w-5 h-5" />,
};

const PATH_CERTIFICATES: Record<string, string> = {
  'foundations-of-clear-communication':      '/CERTIFICATE1.png',
  'decision-clarity-strategic-thinking':     '/CERTIFICATE2.png',
  'digital-mindfulness-modern-life-balance': '/CERTIFICATE3.png',
};

/* ── XP Burst ── */
const XPBurst: React.FC<{ xp: number; onDone: () => void }> = ({ xp, onDone }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, scale: 0.8 }}
    animate={{ opacity: 1, y: -64, scale: 1.1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    onAnimationComplete={onDone}
    className="fixed bottom-24 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm pointer-events-none shadow-lg"
    style={{ background: 'linear-gradient(135deg, #1a5d47, #0f7a55)', color: '#fff' }}
  >
    <Sparkles className="w-4 h-4" />
    +{xp} XP
  </motion.div>
);

/* ──────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────── */
const CoursePlayerPage: React.FC = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Enrollment Gate check
  useEffect(() => {
    if (loading) return;

    const token = localStorage.getItem("token");
    if (!token || !user) {
      toast.error("Please login and enroll in this course first to access lessons.");
      navigate(`/learn/${pathId}`);
      return;
    }

    const enrolled = user.enrolledCourses?.some(e => e.courseId === pathId);
    if (!enrolled) {
      toast.error("Please enroll in this course first to access lessons.");
      navigate(`/learn/${pathId}`);
      return;
    }
  }, [user, loading, pathId, navigate]);

  const [path, setPath] = useState<any>(null);
  const [loadingPath, setLoadingPath] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/admin/certifications`)
      .then(res => res.json())
      .then(data => {
        const found = (Array.isArray(data) ? data : []).find(p => p.id === pathId);
        if (found && !found.modules) {
          found.modules = [
            {
              id: 'm1',
              title: 'Module 1: Introduction',
              description: 'Welcome to this certification.',
              units: [
                { id: 'u1', title: 'Getting Started', type: 'reading', xp: 50, locked: false }
              ]
            }
          ];
        }
        setPath(found);
        setLoadingPath(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingPath(false);
      });
  }, [pathId]);

  // Build modules from JSON data
  const MODULES = (path?.modules ?? []) as Array<{
    id: string;
    title: string;
    description: string;
    units: Array<{ id: string; title: string; type: string; xp: number; locked: boolean; duration?: string; content?: any }>;
  }>;

  const MODULES_WITH_DURATION = MODULES.map(mod => ({
    ...mod,
    shortTitle: mod.title.replace(/^Module \d+:\s*/, ''),
    units: mod.units.map(u => ({ ...u, duration: u.duration || '5 min' })),
  }));

  const allUnits = MODULES_WITH_DURATION.flatMap(m => m.units);
  const firstUnitId = allUnits[0]?.id ?? '';

  const [activeUnitId, setActiveUnitId]     = useState(firstUnitId);
  useEffect(() => {
    if (firstUnitId && !activeUnitId) {
      setActiveUnitId(firstUnitId);
    }
  }, [firstUnitId]);

  const [completedUnits, setCompletedUnits] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    if (user && user.enrolledCourses) {
      const enrollment = user.enrolledCourses.find((e: any) => e.courseId === pathId);
      if (enrollment && enrollment.completedUnits) {
        setCompletedUnits(new Set(enrollment.completedUnits));
      }
    }
  }, [user, pathId]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set([MODULES_WITH_DURATION[0]?.id ?? '']));
  const [rightTab, setRightTab]             = useState<'notes' | 'journal'>('notes');
  const [notes, setNotes]                   = useState<Record<string, string>>({});
  const [journal, setJournal]               = useState<Record<string, string>>({});
  const [xpBurst, setXpBurst]               = useState<{ xp: number; key: number } | null>(null);
  const [totalXP, setTotalXP]               = useState(0);
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [quizAnswers, setQuizAnswers]       = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted]   = useState(false);
  const [quizStarted, setQuizStarted]       = useState(false);
  const [timeLeft, setTimeLeft]             = useState<number | null>(null);
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [certModalOpen, setCertModalOpen]   = useState(false);

  const streak = user?.stats?.streak ?? 0;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizStarted(false);
    setTimeLeft(null);
  }, [activeUnitId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizSubmitted && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev !== null ? prev - 1 : 0);
      }, 1000);
    } else if (timeLeft === 0 && !quizSubmitted) {
      setQuizSubmitted(true);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizSubmitted, timeLeft]);

  const totalUnits     = allUnits.length;
  const progressPct    = totalUnits > 0 ? Math.round((completedUnits.size / totalUnits) * 100) : 0;
  const currentUnitIdx = allUnits.findIndex(u => u.id === activeUnitId);
  const currentUnit    = allUnits[currentUnitIdx];
  const prevUnit       = currentUnitIdx > 0 ? allUnits[currentUnitIdx - 1] : null;
  const nextUnit       = currentUnitIdx < allUnits.length - 1 ? allUnits[currentUnitIdx + 1] : null;

  const typeConf       = currentUnit ? (TYPE_CONFIG[currentUnit.type] ?? TYPE_CONFIG['reading']) : TYPE_CONFIG['reading'];
  const currentModId   = MODULES_WITH_DURATION.find(m => m.units.some(u => u.id === activeUnitId))?.id ?? '';

  const markComplete = useCallback(() => {
    if (completedUnits.has(activeUnitId)) return;
    const unit = allUnits.find(u => u.id === activeUnitId);
    if (!unit) return;
    
    const newCompleted = new Set([...completedUnits, activeUnitId]);
    setCompletedUnits(newCompleted);
    setTotalXP(prev => prev + unit.xp);
    setXpBurst({ xp: unit.xp, key: Date.now() });

    // API Call to save progress
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/enrollments/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: pathId, unitId: activeUnitId })
      }).catch(err => console.error('Error saving progress:', err));
    }

    const isNowAllComplete = allUnits.every(u => newCompleted.has(u.id));

    setTimeout(() => {
      if (nextUnit) {
        setActiveUnitId(nextUnit.id);
        const nm = MODULES_WITH_DURATION.find(m => m.units.some(u => u.id === nextUnit.id));
        if (nm) setExpandedModules(prev => new Set([...prev, nm.id]));
      } else if (isNowAllComplete) {
        setCertModalOpen(true);
      }
    }, 800);
  }, [activeUnitId, completedUnits, allUnits, nextUnit]);

  if (loading || loadingPath) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Loading Course Environment...</p>
      </div>
    );
  }

  if (!path) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Path not found.</p>
          <button onClick={() => navigate('/learn')} className="text-[#0f7a55] hover:underline">← Back to catalog</button>
        </div>
      </div>
    );
  }

  const currentContent = currentUnit?.content ?? { objectives: [], body: ['Content coming soon.'], summary: '' };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Synchronizing Sanctuary...</p>
        </div>
      </div>
    );
  }

  if (!path || MODULES_WITH_DURATION.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Path not found.</p>
          <button onClick={() => navigate('/learn')} className="text-[#0f7a55] hover:underline">← Back to catalog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#ffffff', fontFamily: "'Poppins', sans-serif" }}>

      {/* ═══════════════ LEFT SIDEBAR ═══════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-[272px] flex-shrink-0 flex flex-col h-full overflow-hidden"
            style={{ background: '#ffffff', borderRight: '1px solid #e5ede9' }}
          >
            {/* Top: path info */}
            <div className="p-5" style={{ borderBottom: '1px solid #e5ede9' }}>
              <button
                onClick={() => navigate(`/learn/${pathId}`)}
                className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-[#0f7a55] transition-colors mb-4 group"
              >
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to Overview
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-[10px] text-[#0f7a55] flex-shrink-0"
                  style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                  {PATH_ICONS[pathId ?? ''] ?? <BookOpen className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] text-[#9ca3af] font-semibold uppercase tracking-wider">Learning Path</p>
                  <p className="text-[16px] font-bold text-[#0b1310] truncate">{path.title}</p>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-[13px] mb-1.5 font-medium" style={{ color: '#9ca3af' }}>
                  <span>{completedUnits.size} / {totalUnits} units</span>
                  <span style={{ color: '#0f7a55' }}>{progressPct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e5ede9' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #1a5d47, #0f7a55)' }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-[10px]"
                style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                <Flame className="w-4 h-4 text-[#d97706]" />
                <span className="text-[13px] text-[#d97706] font-bold">{streak} day streak</span>
                <span className="ml-auto text-[12px]" style={{ color: '#9ca3af' }}>{totalXP} XP</span>
              </div>
            </div>

            {/* Curriculum */}
            <div className="flex-1 overflow-y-auto py-2">
              {MODULES_WITH_DURATION.map((mod, mIdx) => {
                const isExpanded  = expandedModules.has(mod.id);
                const modDone     = mod.units.filter(u => completedUnits.has(u.id)).length;
                const isActiveMod = mod.id === currentModId;

                return (
                  <div key={mod.id}>
                    <button
                      onClick={() => setExpandedModules(prev => {
                        const next = new Set(prev);
                        next.has(mod.id) ? next.delete(mod.id) : next.add(mod.id);
                        return next;
                      })}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-[#f5f9f7]"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold flex-shrink-0 transition-colors"
                        style={{
                          background: isActiveMod ? '#ecfdf5' : '#f3f4f6',
                          color: isActiveMod ? '#0f7a55' : '#9ca3af',
                          border: isActiveMod ? '1px solid #a7f3d0' : '1px solid #e5e7eb',
                        }}>
                        {modDone === mod.units.length ? <CheckCircle2 className="w-4 h-4" /> : mIdx + 1}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className={`text-[15px] font-bold truncate ${isActiveMod ? 'text-[#0b1310]' : 'text-[#6b7280]'}`}>{mod.shortTitle}</p>
                        <p className="text-[12px] text-[#9ca3af] font-medium">{modDone}/{mod.units.length} done</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#d1d5db] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {mod.units.map((unit) => {
                            const isActive = unit.id === activeUnitId;
                            const isDone   = completedUnits.has(unit.id);
                            const tc       = TYPE_CONFIG[unit.type] ?? TYPE_CONFIG['reading'];
                            
                            const unitIdx = allUnits.findIndex(u => u.id === unit.id);
                            const previousUnit = unitIdx > 0 ? allUnits[unitIdx - 1] : null;
                            const isLocked = previousUnit ? !completedUnits.has(previousUnit.id) : false;

                            return (
                              <button
                                key={unit.id}
                                disabled={isLocked && !isDone}
                                onClick={() => !isLocked && setActiveUnitId(unit.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 pl-[52px] text-left transition-all"
                                style={{
                                  background: isActive ? '#f0fdf7' : 'transparent',
                                  borderLeft: isActive ? '3px solid #0f7a55' : '3px solid transparent',
                                  opacity: isLocked && !isDone ? 0.4 : 1,
                                }}
                              >
                                <div className="flex-shrink-0" style={{ color: isDone ? '#0f7a55' : tc.color }}>
                                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : isLocked ? <Lock className="w-3.5 h-3.5 text-[#d1d5db]" /> : tc.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-[14px] truncate font-semibold ${isActive ? 'text-[#0b1310] font-bold' : isDone ? 'text-[#9ca3af]' : 'text-[#374151]'}`}>
                                    {unit.title}
                                  </p>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <Clock className="w-3.5 h-3.5 text-[#d1d5db]" />
                                    <span className="text-[11px] text-[#9ca3af] font-medium">{unit.duration}</span>
                                    <span className="ml-auto text-[11px] font-bold" style={{ color: tc.color }}>{unit.xp} XP</span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {mIdx < MODULES_WITH_DURATION.length - 1 && (
                      <div className="mx-4 h-px my-1" style={{ background: '#f3f4f6' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Certificate badge */}
            <div className="p-4" style={{ borderTop: '1px solid #e5ede9' }}>
              {progressPct === 100 ? (
                <button
                  onClick={() => setCertModalOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[12px] text-left transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #0f7a55, #1a9c6d)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(15,122,85,0.25)',
                  }}
                >
                  <Trophy className="w-5 h-5 text-white flex-shrink-0 animate-bounce" />
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-white">Certificate Unlocked!</p>
                    <p className="text-[11px] text-emerald-100 font-medium truncate">Click to view & download</p>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-[12px]"
                  style={{ background: '#f0fdf7', border: '1px solid #a7f3d0' }}>
                  <Trophy className="w-5 h-5 text-[#0f7a55]" />
                  <div>
                    <p className="text-[13px] font-bold text-[#0f7a55]">Certificate Awaits</p>
                    <p className="text-[11px] text-[#6b7280] font-medium">Complete all units to earn</p>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ═══════════════ CENTER CONTENT ═══════════════ */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header */}
        <header
          className="flex-shrink-0 flex items-center gap-4 px-6 py-3.5"
          style={{ background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid #e5ede9', backdropFilter: 'blur(12px)' }}
        >
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-[#f5f9f7] transition-colors text-[#9ca3af] hover:text-[#0b1310]">
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs flex-1 min-w-0" style={{ color: '#9ca3af' }}>
            <span className="font-medium truncate text-[#6b7280]">{path.title}</span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-medium truncate text-[#6b7280]">
              {MODULES_WITH_DURATION.find(m => m.units.some(u => u.id === activeUnitId))?.shortTitle}
            </span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-semibold text-[#0b1310] truncate">{currentUnit?.title}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full flex-shrink-0"
            style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
            <span className="text-xs font-bold text-[#0f7a55]">{totalXP} XP</span>
          </div>

          <button onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className="p-2 rounded-lg hover:bg-[#f5f9f7] transition-colors text-[#9ca3af] hover:text-[#0b1310]">
            <Layers className="w-5 h-5" />
          </button>
        </header>

        {/* Progress bar */}
        <div className="h-1 flex-shrink-0" style={{ background: '#e5ede9' }}>
          <motion.div
            className="h-full"
            style={{ background: 'linear-gradient(90deg, #1a5d47, #0f7a55)' }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Lesson content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 py-10">
            <motion.div
              key={activeUnitId}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Type badge row */}
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: typeConf?.bg, color: typeConf?.color, border: `1px solid ${typeConf?.border}` }}>
                  {typeConf?.icon}
                  {typeConf?.label}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
                  <Clock className="w-3.5 h-3.5" />
                  {currentUnit?.duration}
                </span>
                <span className="flex items-center gap-1.5 text-xs ml-auto font-semibold" style={{ color: '#0f7a55' }}>
                  {currentUnit?.xp} XP
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-[44px] font-extrabold text-[#0b1310] mb-6 leading-tight">
                {currentUnit?.title}
              </h1>

              {/* Objectives */}
              {currentContent.objectives && currentContent.objectives.length > 0 && (
                <div className="mb-8 p-6 rounded-[16px]"
                  style={{ background: '#f0fdf7', border: '1px solid #a7f3d0' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-[#0f7a55]" />
                    <span className="text-base font-extrabold text-[#0f7a55] uppercase tracking-wider">Learning Objectives</span>
                  </div>
                  <ul className="space-y-3">
                    {currentContent.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[18px] text-[#374151] leading-relaxed">
                        <div className="w-2 h-2 rounded-full bg-[#0f7a55] mt-2 flex-shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Body text */}
              {currentUnit?.type !== 'quiz' && currentContent.body && (
                <div className="space-y-6 mb-10">
                  {currentContent.body.map((para, i) => {
                    const imgMatch = para.match(/^!\[(.*?)\]\((.*?)\)$/);
                    if (imgMatch) {
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + i * 0.05 }}
                          className="my-10 rounded-2xl overflow-hidden shadow-lg border border-[#e5ede9]"
                        >
                          <img src={imgMatch[2]} alt={imgMatch[1] || 'Course Image'} className="w-full h-auto object-cover" />
                        </motion.div>
                      );
                    }
                    
                    return (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.05 }}
                        className="text-[20px] md:text-[22px] text-[#2c3733] leading-[1.85] font-light"
                        dangerouslySetInnerHTML={{ __html: para.replace(/\\*(.*?)\\*/g, '<strong style="color:#0f7a55;font-weight:700">$1</strong>') }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Key Takeaways */}
              {currentUnit?.type !== 'quiz' && currentContent.keyTakeaways && currentContent.keyTakeaways.length > 0 && (
                <div className="mb-10 p-6 rounded-[16px]" style={{ background: '#fafafa', border: '1px solid #e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-5">
                    <ListChecks className="w-5 h-5 text-[#0f7a55]" />
                    <h2 className="text-xl font-extrabold text-[#0b1310]">Key Takeaways</h2>
                  </div>
                  <ul className="space-y-3">
                    {currentContent.keyTakeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 text-[18px] text-[#374151] leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-[#0f7a55] flex-shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Practical Exercise */}
              {currentUnit?.type !== 'quiz' && currentContent.practicalExercise && (
                <div className="mb-10 p-6 rounded-[16px]" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <PlayCircle className="w-5 h-5 text-[#2563eb]" />
                    <h2 className="text-xl font-extrabold text-[#2563eb]">Practical Exercise</h2>
                  </div>
                  <p className="text-[18px] text-[#374151] leading-relaxed">{currentContent.practicalExercise}</p>
                </div>
              )}

              {/* Activity steps (fallback) */}
              {currentContent.activitySteps && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-6">
                    <PlayCircle className="w-6 h-6 text-[#059669]" />
                    <h2 className="text-2xl font-extrabold text-[#0b1310]">Practice Steps</h2>
                  </div>
                  <div className="space-y-4">
                    {currentContent.activitySteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                        className="flex items-start gap-4 p-5 rounded-[14px]"
                        style={{ background: '#f8faf9', border: '1px solid #e5ede9' }}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0"
                          style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                          {i + 1}
                        </div>
                        <p className="text-[19px] text-[#374151] leading-relaxed pt-0.5">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reflection prompts */}
              {currentContent.reflectionPrompts && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-6">
                    <PenLine className="w-6 h-6 text-[#7c3aed]" />
                    <h2 className="text-2xl font-extrabold text-[#0b1310]">Reflection Questions</h2>
                  </div>
                  <div className="space-y-5">
                    {currentContent.reflectionPrompts.map((prompt, i) => (
                      <div key={i} className="p-6 rounded-[16px]"
                        style={{ background: '#faf5ff', border: '1px solid #ddd6fe' }}>
                        <p className="text-[18px] text-[#7c3aed] font-semibold mb-4 leading-relaxed">{prompt}</p>
                        <textarea
                          value={reflectionAnswers[`${activeUnitId}-${i}`] ?? ''}
                          onChange={e => setReflectionAnswers(prev => ({ ...prev, [`${activeUnitId}-${i}`]: e.target.value }))}
                          rows={4}
                          placeholder="Write your reflection here..."
                          className="w-full bg-transparent text-[18px] text-[#374151] resize-none outline-none leading-relaxed placeholder-[#c4b5fd]"
                          style={{ caretColor: '#7c3aed' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz */}
              {currentUnit?.type === 'quiz' && currentContent.quizQuestions && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-6">
                    <HelpCircle className="w-6 h-6 text-[#d97706]" />
                    <h2 className="text-2xl font-extrabold text-[#0b1310]">Knowledge Check</h2>
                    <span className="text-sm text-[#9ca3af] ml-2">{currentContent.quizQuestions.length} questions</span>
                    {quizStarted && !quizSubmitted && timeLeft !== null && (
                      <span className={`ml-auto text-sm font-bold flex items-center gap-1.5 ${timeLeft <= 60 ? 'text-red-500' : 'text-[#0f7a55]'}`}>
                        <Clock className="w-4 h-4" />
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {!quizStarted && !quizSubmitted ? (
                    <div className="p-8 text-center rounded-[18px]" style={{ background: '#fafafa', border: '1px solid #e5e7eb' }}>
                      <HelpCircle className="w-12 h-12 text-[#d97706] mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-bold text-[#0b1310] mb-2">Ready to test your knowledge?</h3>
                      <p className="text-[#6b7280] mb-6">You will have {currentContent.quizQuestions.length} minutes to complete this assessment.</p>
                      <button
                        onClick={() => {
                          setQuizStarted(true);
                          setTimeLeft(currentContent.quizQuestions!.length * 60);
                        }}
                        className="px-8 py-3 rounded-full text-sm font-bold transition-all inline-block hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #1a5d47, #0f7a55)', color: '#fff' }}
                      >
                        Start Quiz
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-8">
                        {currentContent.quizQuestions.map((q, qi) => (
                          <div key={qi} className="p-7 rounded-[18px]"
                            style={{ background: '#fafafa', border: '1px solid #e5e7eb' }}>
                            <p className="text-[20px] font-bold text-[#0b1310] mb-5 leading-snug">
                              <span className="text-[#d97706] mr-2">{qi + 1}.</span>{q.question}
                            </p>
                            <div className="space-y-3">
                              {q.options.map((opt, oi) => {
                                const selected = quizAnswers[qi] === oi;
                                const correct  = quizSubmitted && oi === q.correct;
                                const wrong    = quizSubmitted && selected && oi !== q.correct;
                                return (
                                  <button
                                    key={oi}
                                    disabled={quizSubmitted}
                                    onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                                    className="w-full flex items-center gap-3 px-5 py-4 rounded-[12px] text-left transition-all text-[18px]"
                                    style={{
                                      background: correct ? '#ecfdf5' : wrong ? '#fef2f2' : selected ? '#fffbeb' : '#ffffff',
                                      border: correct ? '1px solid #6ee7b7' : wrong ? '1px solid #fca5a5' : selected ? '1px solid #fde68a' : '1px solid #e5e7eb',
                                      color: correct ? '#059669' : wrong ? '#dc2626' : selected ? '#d97706' : '#374151',
                                    }}
                                  >
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                      style={{ border: `1.5px solid ${correct ? '#6ee7b7' : wrong ? '#fca5a5' : selected ? '#fde68a' : '#d1d5db'}` }}>
                                      {correct && <CheckCircle2 className="w-4 h-4 text-[#059669]" />}
                                      {wrong   && <X className="w-3.5 h-3.5 text-[#dc2626]" />}
                                      {selected && !quizSubmitted && <div className="w-3 h-3 rounded-full bg-[#d97706]" />}
                                    </div>
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {!quizSubmitted ? (
                        <button
                          onClick={() => {
                            if (Object.keys(quizAnswers).length === currentContent.quizQuestions!.length) setQuizSubmitted(true);
                          }}
                          disabled={Object.keys(quizAnswers).length < (currentContent.quizQuestions?.length ?? 0)}
                          className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all disabled:opacity-30"
                          style={{ background: 'linear-gradient(135deg, #1a5d47, #0f7a55)', color: '#fff' }}
                        >
                          <ListChecks className="w-4 h-4" />
                          Submit Answers
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-5 rounded-[14px] flex items-center gap-4"
                          style={{ background: '#f0fdf7', border: '1px solid #a7f3d0' }}
                        >
                          <CheckCircle2 className="w-8 h-8 text-[#0f7a55] flex-shrink-0" />
                          <div>
                            <p className="text-[14px] font-bold text-[#0f7a55]">Assessment Complete!</p>
                            <p className="text-[12px] text-[#6b7280]">
                              {Object.entries(quizAnswers).filter(([qi, ans]) => ans === currentContent.quizQuestions![+qi].correct).length} / {currentContent.quizQuestions?.length} correct
                            </p>
                          </div>
                          <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); setQuizStarted(false); setTimeLeft(null); }}
                            className="ml-auto flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-[#0b1310] transition-colors">
                            <RotateCcw className="w-3.5 h-3.5" />Retry
                          </button>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Summary */}
              {currentContent.summary && (
                <div className="mb-10 p-6 rounded-[16px]"
                  style={{ background: '#f0fdf7', border: '1px solid #a7f3d0' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-[#0f7a55] uppercase tracking-wider">Summary</span>
                  </div>
                  <p className="text-[18px] text-[#374151] leading-relaxed italic">{currentContent.summary}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8 pt-8" style={{ borderTop: '1px solid #e5ede9' }}>
                {prevUnit && (
                  <button
                    onClick={() => setActiveUnitId(prevUnit.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-[#6b7280] hover:text-[#0b1310] transition-all"
                    style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                )}

                <button
                  onClick={markComplete}
                  disabled={completedUnits.has(activeUnitId)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all flex-1 justify-center"
                  style={{
                    background: completedUnits.has(activeUnitId) ? '#ecfdf5' : 'linear-gradient(135deg, #1a5d47, #0f7a55)',
                    color: completedUnits.has(activeUnitId) ? '#0f7a55' : '#fff',
                    border: completedUnits.has(activeUnitId) ? '1px solid #a7f3d0' : 'none',
                    boxShadow: completedUnits.has(activeUnitId) ? 'none' : '0 4px 16px rgba(15,122,85,0.2)',
                  }}
                >
                  {completedUnits.has(activeUnitId)
                    ? <><CheckCircle2 className="w-4 h-4" />Completed</>
                    : <><Award className="w-4 h-4" />Mark as Complete</>
                  }
                </button>

                {nextUnit && (
                  <button
                    onClick={() => setActiveUnitId(nextUnit.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                    style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#0f7a55' }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
            <div className="h-12" />
          </div>
        </div>
      </main>

      {/* ═══════════════ RIGHT PANEL ═══════════════ */}
      <AnimatePresence>
        {rightPanelOpen && (
          <motion.aside
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-[296px] flex-shrink-0 flex flex-col h-full overflow-hidden"
            style={{ background: '#ffffff', borderLeft: '1px solid #e5ede9' }}
          >
            {/* Tabs */}
            <div className="flex items-center flex-shrink-0" style={{ borderBottom: '1px solid #e5ede9' }}>
              {([
                { key: 'notes',   icon: <NotebookPen className="w-3.5 h-3.5" />, label: 'Notes'   },
                { key: 'journal', icon: <PenLine className="w-3.5 h-3.5" />,     label: 'Journal' },
              ] as const).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setRightTab(tab.key)}
                  className="flex-1 flex flex-col items-center gap-1 py-3 text-[12px] font-bold uppercase tracking-wider transition-colors"
                  style={{
                    color: rightTab === tab.key ? '#0f7a55' : '#9ca3af',
                    borderBottom: rightTab === tab.key ? '2px solid #0f7a55' : '2px solid transparent',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto">

              {/* NOTES */}
              {rightTab === 'notes' && (
                <div className="p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <NotebookPen className="w-4 h-4 text-[#2563eb]" />
                    <h3 className="text-[15px] font-bold text-[#0b1310]">Lesson Notes</h3>
                    <span className="ml-auto text-[11px] text-[#9ca3af] font-medium">Auto-saved</span>
                  </div>
                  <p className="text-[13px] text-[#9ca3af] mb-3">Notes are saved per lesson.</p>
                  <textarea
                    value={notes[activeUnitId] ?? ''}
                    onChange={e => setNotes(prev => ({ ...prev, [activeUnitId]: e.target.value }))}
                    placeholder="Take notes on this lesson..."
                    className="flex-1 w-full bg-transparent text-[15px] text-[#374151] resize-none outline-none leading-relaxed placeholder-[#d1d5db]"
                    style={{ caretColor: '#2563eb', minHeight: '300px' }}
                  />
                </div>
              )}

              {/* JOURNAL */}
              {rightTab === 'journal' && (
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <PenLine className="w-4 h-4 text-[#7c3aed]" />
                    <h3 className="text-[15px] font-bold text-[#0b1310]">Reflection Journal</h3>
                  </div>
                  <div className="mb-4 p-3.5 rounded-[12px]"
                    style={{ background: '#faf5ff', border: '1px solid #ddd6fe' }}>
                    <p className="text-[13px] text-[#7c3aed] font-semibold mb-1.5">Today's Reflection Prompt</p>
                    <p className="text-[14px] text-[#6b7280] leading-relaxed font-medium">
                      What did this lesson reveal to you? What specific action will you take from what you learned today?
                    </p>
                  </div>
                  <textarea
                    value={journal[activeUnitId] ?? ''}
                    onChange={e => setJournal(prev => ({ ...prev, [activeUnitId]: e.target.value }))}
                    rows={10}
                    placeholder="Begin your reflection..."
                    className="w-full bg-transparent text-[15px] text-[#374151] resize-none outline-none leading-relaxed placeholder-[#c4b5fd]"
                    style={{ caretColor: '#7c3aed' }}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-[#9ca3af] font-medium">{(journal[activeUnitId] ?? '').length} characters</span>
                    <button
                      onClick={() => toast.success('Journal entry saved successfully!')}
                      className="text-[13px] text-[#7c3aed] hover:text-[#5b21b6] transition-colors font-semibold"
                    >
                      Save Entry →
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* XP Burst */}
      <AnimatePresence>
        {xpBurst && (
          <XPBurst key={xpBurst.key} xp={xpBurst.xp} onDone={() => setXpBurst(null)} />
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        courseTitle={path.title}
        userName={user?.name || 'Dedicated Learner'}
        completionDate={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        duration={path.duration}
        certificateId={`NVH-${(pathId || 'CRS').substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`}
      />
    </div>
  );
};

export default CoursePlayerPage;
