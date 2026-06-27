const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('c:\\Users\\chara\\nirvaha\\backend\\dmml_extract\\DigitalMindfulnessModernLifeBalance.html', 'utf8');
const $ = cheerio.load(html);
console.log($('img').first().parent().html().substring(0, 500));
