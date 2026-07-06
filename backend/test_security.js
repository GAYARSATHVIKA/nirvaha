const { moderateText } = require('./utils/moderation');

console.log("--- Testing Moderation Utility ---");

const testCases = [
  "Hello, how are you?",
  "This is a wonderful community.",
  "I hate this bs shit!", // Cuss word
  "I don't know what to do, I want to kill myself.", // Crisis word
  "Just feeling a bit down today.", // Normal sad text
  "Stop being such a bitch" // Cuss word
];

testCases.forEach((text, index) => {
  const result = moderateText(text);
  console.log(`\nTest ${index + 1}: "${text}"`);
  console.log(`Approved: ${result.approved}`);
  if (!result.approved) {
    console.log(`Reason: ${result.reason}`);
    console.log(`Type: ${result.type}`);
  }
});
