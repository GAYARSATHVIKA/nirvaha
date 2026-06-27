const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('c:\\Users\\chara\\nirvaha\\backend\\dmml_extract\\DigitalMindfulnessModernLifeBalance.html', 'utf8');
const $ = cheerio.load(html);
let t = '';
$('body').find('p, img').each((_, el) => {
  if (el.tagName === 'img') t += `[IMG src=${$(el).attr('src')}]\n`;
  else if ($(el).text().trim()) t += `[${el.tagName}] ${$(el).text().substring(0,30)}\n`;
});
fs.writeFileSync('test_html3_full.txt', t);
