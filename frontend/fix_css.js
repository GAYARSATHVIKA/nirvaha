const fs = require('fs');
const path = 'c:/Users/chara/nirvaha/frontend/src/index.css';
let content = fs.readFileSync(path, 'utf8');

// The weird characters start after "font-family: 'Poppins', sans-serif !important;"
const target = "} !important;";
const lines = content.split('\n');

let cleanedLines = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('i') && lines[i].includes('m') && lines[i].includes('g') && lines[i].includes('e') && lines[i].includes('m') && lines[i].includes('o') && i > lines.length - 10) {
     skip = true;
  }
  if (!skip) {
    cleanedLines.push(lines[i]);
  }
}

// Alternatively just use the line number from the view_file.
// It started at line 3958 (0-indexed 3957).
// Let's just truncate the file at the last closing brace of the Poppins rule.

let contentBytes = fs.readFileSync(path);
// Instead of messing with string matching, we'll just slice the array of strings up to the line we know is good.
let stringContent = contentBytes.toString('utf8');
let goodLines = stringContent.split('\n');

let safeLines = [];
for (let i = 0; i < goodLines.length; i++) {
  if (goodLines[i].includes('i\u0000m\u0000g') || goodLines[i].includes('i m g') || goodLines[i].includes('font-family: \'Poppins\'') && i > 3950) {
      // Just take everything up to the line * {
      // We know line 3955 is * {
      // So we can just take the first 3957 lines
  }
}

let finalLines = goodLines.slice(0, 3957);
fs.writeFileSync(path, finalLines.join('\n'));
console.log('Fixed CSS');
