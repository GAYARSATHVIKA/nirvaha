const fs = require('fs');
const cheerio = require('cheerio');

const docs = [
  { name: 'dmml', file: 'c:\\Users\\chara\\nirvaha\\backend\\dmml_extract\\DigitalMindfulnessModernLifeBalance.html' },
  { name: 'dcst', file: 'c:\\Users\\chara\\nirvaha\\backend\\dcst_extract\\DecisionClarityStrategicThinking.html' },
  { name: 'fcc', file: 'c:\\Users\\chara\\nirvaha\\backend\\fcc_extract\\FoundationsofClearCommunication.html' }
];

for (const doc of docs) {
  if (fs.existsSync(doc.file)) {
    const html = fs.readFileSync(doc.file, 'utf8');
    const $ = cheerio.load(html);
    console.log(`--- ${doc.name} ---`);
    $('img').each((_, img) => console.log($(img).attr('src')));
  } else {
    console.log(`Not found: ${doc.file}`);
  }
}
