const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Certification = require('./models/Certification');

dotenv.config();

// The exact hardcoded content from the frontend
const FCC_CONTENT = {
  'fcc-1-1': {
    objectives: ['Understand what clear communication is', 'Identify the cost of poor communication'],
    body: ['Clear communication is the ability to transmit ideas, instructions, and emotions with minimal distortion.', 'When we fail to communicate clearly, it leads to misunderstandings, lost time, and frustration.'],
    summary: 'Clear communication bridges the gap between your intent and their understanding.',
  },
  'fcc-1-2': {
    objectives: ['Identify your core message', 'Eliminate unnecessary jargon'],
    body: ['Before you speak or write, ask yourself: "What is the single most important thing I need them to know?"', 'Jargon creates unnecessary cognitive load. Use plain language whenever possible.'],
    summary: 'Clarity starts with a focused message and plain language.',
  },
  'fcc-2-1': {
    objectives: ['Learn the concept of active listening', 'Practice reflective responses'],
    body: ['Listening is not just waiting for your turn to speak.', 'Active listening involves fully concentrating, understanding, responding, and then remembering what is being said.'],
    summary: 'True communication requires active, empathetic listening.',
  },
  'fcc-2-2': {
    objectives: ['Understand tone and body language'],
    body: ['Studies show that a significant portion of communication is non-verbal.', 'Your tone of voice, posture, and eye contact often speak louder than the words you choose.'],
    summary: 'Align your non-verbal cues with your spoken words for maximum impact.',
  },
  'fcc-3-1': {
    objectives: ['Complete the final assessment for Course 1: Foundations of Clear Communication'],
    body: ['This final assessment covers all the modules you have completed. By passing this quiz, you will demonstrate your understanding of clear communication.'],
    quizQuestions: [
      {
        question: 'What is the primary goal of clear communication?',
        options: ['To sound intelligent and professional', 'To transmit ideas with minimal distortion', 'To persuade people to agree with you', 'To use as much specialized jargon as possible'],
        correct: 1,
      },
      {
        question: 'Which of the following is NOT a component of active listening?',
        options: ['Concentrating fully on the speaker', 'Waiting patiently for your turn to speak', 'Responding reflectively', 'Remembering what was said'],
        correct: 1,
      },
      {
        question: 'Why is plain language preferred over jargon?',
        options: ['It reduces unnecessary cognitive load', 'It makes the speaker seem more authoritative', 'It hides a lack of deep knowledge', 'It is required by law in most businesses'],
        correct: 0,
      },
    ],
    summary: 'Congratulations! You have completed the Foundations of Clear Communication course.',
  },
};

const DCST_CONTENT = {
  'dcst-1-1': {
    objectives: ['Understand cognitive biases', 'Learn how to step back before deciding'],
    body: ['Decision making is often clouded by cognitive biases — systematic patterns of deviation from norm or rationality in judgment.', 'Recognizing biases like Confirmation Bias or the Sunk Cost Fallacy is the first step toward clarity.'],
    summary: 'Awareness of your own biases allows for more objective decision making.',
  },
  'dcst-1-2': {
    objectives: ['Apply the First Principles thinking model'],
    body: ['First Principles thinking involves breaking down a complicated problem into its most basic, foundational truths.', 'Instead of reasoning by analogy (doing what has been done before), you build up your solution from scratch.'],
    summary: 'First Principles thinking helps you bypass assumptions and find innovative solutions.',
  },
  'dcst-2-1': {
    objectives: ['Learn how to map out secondary and tertiary consequences'],
    body: ['First-order thinking is fast and easy. It looks only at the immediate result.', 'Second-order thinking asks, "And then what?" It considers the consequences of the consequences.'],
    summary: 'Strategic decisions require second and third-order thinking.',
  },
  'dcst-3-1': {
    objectives: ['Complete the final assessment for Course 2: Decision Clarity & Strategic Thinking'],
    body: ['This final assessment covers all the modules you have completed. Passing this quiz earns you the Strategic Thinking Certificate.'],
    quizQuestions: [
      {
        question: 'What is the "Sunk Cost Fallacy"?',
        options: ['The belief that previous investments justify continuing a failing project', 'The tendency to search for information that confirms your preconceptions', 'The assumption that complicated solutions are always better', 'The habit of making decisions too quickly'],
        correct: 0,
      },
      {
        question: 'What does "First Principles" thinking involve?',
        options: ['Reasoning by analogy and looking at competitors', 'Breaking a problem down to its most basic, foundational truths', 'Always going with your first instinct or gut feeling', 'Asking the first person you see for advice'],
        correct: 1,
      },
      {
        question: 'Which question best represents Second-Order Thinking?',
        options: ['What is the easiest solution?', 'How much will this cost today?', 'And then what?', 'Who is to blame for this problem?'],
        correct: 2,
      },
    ],
    summary: 'Congratulations! You have completed Decision Clarity & Strategic Thinking.',
  },
};

const DMML_CONTENT = {
  'dmml-1-1': {
    objectives: ['Recognize the signs of digital overwhelm', 'Understand the attention economy'],
    body: ['Modern applications are designed using the same psychological principles as slot machines.', 'The "Attention Economy" treats human attention as a scarce commodity that corporations compete to harvest.'],
    summary: 'Understanding the mechanics of digital platforms helps you regain control of your attention.',
  },
  'dmml-1-2': {
    objectives: ['Audit your digital intake', 'Define a digital baseline'],
    body: ['You cannot manage what you do not measure. A digital audit involves tracking exactly where your screen time goes.', 'Once audited, you can establish a baseline of necessary technology use versus compulsive use.'],
    summary: 'A digital audit reveals the truth about your technology habits.',
  },
  'dmml-2-1': {
    objectives: ['Establish boundaries with your devices', 'Create tech-free zones'],
    body: ['Physical boundaries create psychological boundaries. For example, keeping your phone out of the bedroom improves sleep quality.', 'Designate specific "tech-free" zones in your home, such as the dining table.'],
    summary: 'Intentional friction between you and your devices reduces compulsive checking.',
  },
  'dmml-2-2': {
    objectives: ['Reclaim deep work sessions', 'Embrace boredom'],
    body: ['Deep work requires prolonged periods of uninterrupted concentration.', 'Boredom is not a problem to be solved with a screen; it is the space where creativity and reflection happen.'],
    summary: 'Allowing yourself to be bored re-sensitizes your brain to lower-dopamine activities.',
  },
  'dmml-5-4': {
    objectives: ['Complete the final assessment for Course 3: Digital Mindfulness & Modern Life Balance'],
    body: ['This final assessment covers all five modules. Completion earns your Digital Mindfulness & Modern Life Balance Certificate.'],
    quizQuestions: [
      {
        question: 'What is the primary mechanism through which variable reward schedules make digital scrolling compulsive?',
        options: ['They always deliver interesting content', 'The unpredictable nature of rewards drives continued behavior seeking the next reward', 'They limit the amount of time you can spend on a platform', 'They create a fear of missing out'],
        correct: 1,
      },
      {
        question: 'What does the creation-to-consumption ratio reflect about your digital life?',
        options: ['How much content you produce versus how much you consume', 'The ratio of paid to free apps you use', 'How many platforms you create accounts on', 'The time spent creating files versus reading them'],
        correct: 0,
      },
      {
        question: 'According to this course, what is the most accurate measure of success in building a sustainable digital lifestyle?',
        options: ['Total daily screen time under two hours', 'Number of apps deleted from your phone', 'Quality of attention, depth of relationships, and presence in life', 'Frequency of device-free days'],
        correct: 2,
      },
    ],
    summary: 'Congratulations — you have completed Digital Mindfulness & Modern Life Balance.',
  },
};

const MODULE_DATA = {
  'foundations-of-clear-communication': [
    {
      id: 'fcc-m1',
      title: 'Module 1: The Anatomy of Clarity',
      description: 'Understand the fundamental building blocks of clear communication and why it matters.',
      units: [
        { id: 'fcc-1-1', title: 'What is Clear Communication?', type: 'reading', xp: 50, duration: '5 min' },
        { id: 'fcc-1-2', title: 'The Core Message Principle', type: 'reading', xp: 50, duration: '5 min' },
      ],
    },
    {
      id: 'fcc-m2',
      title: 'Module 2: The Receptive End',
      description: 'Communication is a two-way street. Learn how to actively receive information.',
      units: [
        { id: 'fcc-2-1', title: 'Active Listening', type: 'reading', xp: 50, duration: '8 min' },
        { id: 'fcc-2-2', title: 'Non-Verbal Dynamics', type: 'reading', xp: 50, duration: '5 min' },
      ],
    },
    {
      id: 'fcc-m3',
      title: 'Module 3: Certification Assessment',
      description: 'Prove your mastery to unlock your certificate.',
      units: [
        { id: 'fcc-3-1', title: 'Final Quiz', type: 'quiz', xp: 100, duration: '10 min', locked: false },
      ],
    },
  ],
  'decision-clarity-strategic-thinking': [
    {
      id: 'dcst-m1',
      title: 'Module 1: Removing the Fog',
      description: 'Identify the biases and mental traps that cloud judgment.',
      units: [
        { id: 'dcst-1-1', title: 'Cognitive Biases 101', type: 'reading', xp: 50, duration: '6 min' },
        { id: 'dcst-1-2', title: 'First Principles Thinking', type: 'reading', xp: 50, duration: '8 min' },
      ],
    },
    {
      id: 'dcst-m2',
      title: 'Module 2: Mapping the Future',
      description: 'Learn how to project the consequences of your decisions over time.',
      units: [
        { id: 'dcst-2-1', title: 'Second-Order Consequences', type: 'reading', xp: 50, duration: '7 min' },
      ],
    },
    {
      id: 'dcst-m3',
      title: 'Module 3: Certification Assessment',
      description: 'Prove your mastery to unlock your certificate.',
      units: [
        { id: 'dcst-3-1', title: 'Final Quiz', type: 'quiz', xp: 100, duration: '10 min', locked: false },
      ],
    },
  ],
  'digital-mindfulness-modern-life-balance': [
    {
      id: 'dmml-m1',
      title: 'Module 1: The Attention Economy',
      description: 'Understand the landscape of digital distraction and why it feels so compelling.',
      units: [
        { id: 'dmml-1-1', title: 'Hijacking the Mind', type: 'reading', xp: 50, duration: '5 min' },
        { id: 'dmml-1-2', title: 'The Digital Audit', type: 'activity', xp: 80, duration: '15 min' },
      ],
    },
    {
      id: 'dmml-m2',
      title: 'Module 2: Reclaiming Space',
      description: 'Practical strategies for creating boundaries with your technology.',
      units: [
        { id: 'dmml-2-1', title: 'Friction and Boundaries', type: 'reading', xp: 50, duration: '6 min' },
        { id: 'dmml-2-2', title: 'The Value of Boredom', type: 'reading', xp: 50, duration: '5 min' },
      ],
    },
    {
      id: 'dmml-m5',
      title: 'Module 5: Certification Assessment',
      description: 'Prove your mastery to unlock your certificate.',
      units: [
        { id: 'dmml-5-4', title: 'Final Quiz', type: 'quiz', xp: 100, duration: '10 min', locked: false },
      ],
    },
  ],
};

const ALL_CONTENT = { ...FCC_CONTENT, ...DCST_CONTENT, ...DMML_CONTENT };

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const certs = await Certification.find();
  for (const cert of certs) {
    if (MODULE_DATA[cert.id]) {
      const modulesToInject = MODULE_DATA[cert.id];
      const populatedModules = modulesToInject.map(mod => {
        return {
          id: mod.id,
          title: mod.title,
          description: mod.description,
          units: mod.units.map(u => {
            const contentObj = ALL_CONTENT[u.id] || { objectives: [], body: [], summary: '' };
            return {
              id: u.id,
              title: u.title,
              type: u.type,
              xp: u.xp,
              locked: u.locked || false,
              duration: u.duration,
              content: contentObj
            };
          })
        };
      });
      cert.modules = populatedModules;
      cert.skillLevel = 'Beginner';
      cert.duration = 'Self-paced';
      await cert.save();
      console.log(`Migrated content for: ${cert.title}`);
    }
  }
  
  console.log('Migration complete');
  process.exit(0);
}

migrate().catch(console.error);
