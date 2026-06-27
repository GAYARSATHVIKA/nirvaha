const fs = require('fs');
const cheerio = require('cheerio');

const courses = [
  {
    id: 'dmml',
    name: 'digital-mindfulness',
    jsonPath: 'parsed_modules.json',
    htmlPath: 'c:\\Users\\chara\\nirvaha\\backend\\dmml_extract\\DigitalMindfulnessModernLifeBalance.html'
  },
  {
    id: 'dcst',
    name: 'decision-clarity',
    jsonPath: 'parsed_modules_dcst.json',
    htmlPath: 'c:\\Users\\chara\\nirvaha\\backend\\dcst_extract\\DecisionClarityStrategicThinking.html'
  },
  {
    id: 'fcc',
    name: 'foundations-clear-communication',
    jsonPath: 'parsed_modules_fcc.json',
    htmlPath: 'c:\\Users\\chara\\nirvaha\\backend\\fcc_extract\\FoundationsofClearCommunication.docx.html'
  }
];

function cleanString(str) {
  return str.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').trim();
}

for (const course of courses) {
  console.log(`Processing ${course.id}...`);
  if (!fs.existsSync(course.htmlPath)) {
    console.log(` HTML not found for ${course.id}`);
    continue;
  }
  
  const modules = JSON.parse(fs.readFileSync(course.jsonPath, 'utf8'));
  const html = fs.readFileSync(course.htmlPath, 'utf8');
  const $ = cheerio.load(html);
  
  const elements = $('body').find('p, h1, h2, h3, h4, h5, h6, ul, ol, div, img').toArray();
  let htmlIdx = 0;
  
  for (const mod of modules) {
    for (const unit of mod.units) {
      if (unit.type !== 'reading' || !unit.content || !unit.content.body) continue;
      
      const newBody = [];
      for (const line of unit.content.body) {
        const cleanedLine = cleanString(line);
        if (!cleanedLine) continue;
        
        let foundLine = false;
        let tempIdx = Math.max(0, htmlIdx - 1);
        let collectedImages = [];
        let lookahead = 0;
        
        while (tempIdx < elements.length && lookahead < 500) {
          const el = elements[tempIdx];
          const nodeText = cleanString($(el).text());
          
          if (el.name === 'img' || el.tagName === 'img') {
             const src = $(el).attr('src');
             if (src) {
               const filename = src.split('/').pop();
               collectedImages.push(`![image](/images/courses/${course.id}/${filename})`);
             }
          }
          
          tempIdx++;
          lookahead++;
          
          if (nodeText && (nodeText.includes(cleanedLine) || cleanedLine.includes(nodeText))) {
            foundLine = true;
            break;
          }
        }
        
        if (foundLine) {
          if (collectedImages.length > 0) {
            console.log(`Found ${collectedImages.length} images before line: ${cleanedLine.substring(0,20)}`);
          }
          for (const img of collectedImages) {
            if (!newBody.includes(img)) newBody.push(img);
          }
          newBody.push(line);
          htmlIdx = tempIdx;
        } else {
          newBody.push(line);
        }
      }
      unit.content.body = newBody;
    }
  }
  
  fs.writeFileSync(`injected_${course.id}.json`, JSON.stringify(modules, null, 2));
  console.log(` Saved injected_${course.id}.json`);
}
