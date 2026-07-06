const CUSS_WORDS = [
  // General Profanity
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'pussy',
  'motherfucker', 'wanker', 'bollocks', 'piss', 'cock', 'crap', 'twat', 'prick',
  'douchebag', 'jackass', 'dipshit', 'bullshit', 'horseshit', 'shithead',
  'fuckhead', 'arsehole', 'arse', 'spastic', 'dumbass', 'asshat',
  
  // Sexual & NSFW Content
  'sex', 'porn', 'porno', 'pornography', 'xxx', 'nude', 'nudes', 'naked', 
  'boobs', 'tits', 'vagina', 'penis', 'clitoris', 'dildo', 'vibrator', 'masturbate',
  'masturbation', 'orgasm', 'ejaculate', 'sperm', 'semen', 'blowjob', 'handjob',
  'titjob', 'cum', 'cumshot', 'gangbang', 'threesome', 'hooker', 'escort',
  'prostitute', 'prostitution', 'incest', 'bestiality', 'pedophile', 'pedo',
  'fetish', 'bdsm', 'kink', 'horny', 'slut', 'whore', 'skank', 'tramp', 
  'schlong', 'pecker', 'booty', 'milf', 'onlyfans',
  
  // Slurs & Hate Speech
  'nigger', 'nigga', 'faggot', 'retard', 'racist', 'sexist', 'homophobic', 'transphobic',
  
  // Spam, Illegal & Violence
  'scam', 'casino', 'viagra', 'rape', 'terrorist', 'bomb',
];

const CRISIS_WORDS = [
  'suicide', 'kill myself', 'want to die', 'end my life', 
  'harm myself', 'cut myself', 'kms', 'suicidal'
];

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function moderateText(text) {
  if (!text) return { approved: true };
  const lower = text.toLowerCase();

  for (const word of CUSS_WORDS) {
    const regex = new RegExp('\\b' + escapeRegExp(word) + '\\b', 'i');
    if (regex.test(lower)) {
      return {
        approved: false,
        reason: 'Your message contains inappropriate language. Please edit and try again.',
        type: 'cuss'
      };
    }
  }

  for (const word of CRISIS_WORDS) {
    const regex = new RegExp('\\b' + escapeRegExp(word) + '\\b', 'i');
    if (regex.test(lower)) {
      return {
        approved: false,
        reason: 'It sounds like you might be going through a difficult time. Please know you are not alone. Consider reaching out to a crisis helpline or a trusted professional.',
        type: 'crisis'
      };
    }
  }

  return { approved: true };
}

module.exports = {
  CUSS_WORDS,
  CRISIS_WORDS,
  moderateText,
};
