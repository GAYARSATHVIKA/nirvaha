const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('c:\\Users\\chara\\nirvaha\\backend\\dmml_extract\\DigitalMindfulnessModernLifeBalance.html', 'utf8');
const $ = cheerio.load(html);

const elements = $('body').find('p, h1, h2, h3, h4, h5, h6, ul, ol');

let i = 0;
elements.each((_, el) => {
    if (i > 30) return;
    const text = $(el).text().trim();
    const imgs = $(el).find('img').length;
    if (text || imgs > 0) {
        console.log(`[${el.tagName}] text: ${text.substring(0, 30)}, images: ${imgs}`);
        if (imgs > 0) {
            $(el).find('img').each((_, img) => {
                console.log(`  --> src: ${$(img).attr('src')}`);
            });
        }
        i++;
    }
});
