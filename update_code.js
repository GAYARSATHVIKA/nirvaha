const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'frontend/src/components/MeditationPosesCircle.tsx',
  'frontend/src/components/pages/MeditationPage.tsx',
  'backend/scripts/seed_yoga_originals.js',
  'backend/scripts/seed_poses_from_frontend.js'
];

for (const relPath of filesToUpdate) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace spaces in the paths
  content = content.replace(/\/poses for medittaion\/([a-zA-Z0-9]+) (\d+)\.(png|jpg)/g, '/poses-for-meditation/$1-$2.$3');
  content = content.replace(/\/yoga for meditation\/([a-zA-Z0-9.]+?) (\d+)\.(png|jpg)/g, '/yoga-for-meditation/$1-$2.$3');
  
  // Just in case there are other exact matches without the regex grouping
  content = content.replace(/poses for medittaion/g, 'poses-for-meditation');
  content = content.replace(/yoga for meditation/g, 'yoga-for-meditation');
  
  // Replace specific file names with spaces
  const map = {
    'easy 1.jpg': 'easy-1.jpg',
    'cosmic 2.png': 'cosmic-2.png',
    'thunder 3.png': 'thunder-3.png',
    'lotus 4.png': 'lotus-4.png',
    'corpus 5.png': 'corpus-5.png',
    'zen 6.png': 'zen-6.png',
    'tree 7.png': 'tree-7.png',
    'deep 8.png': 'deep-8.png',
    'bound. 1.png': 'bound.-1.png',
    'seated 2.png': 'seated-2.png',
    'staff 3.png': 'staff-3.png',
    'cow 4.png': 'cow-4.png',
    'camel 5.png': 'camel-5.png',
    'cobra 6.png': 'cobra-6.png',
    'boat 7.png': 'boat-7.png',
    'seated twist 8.png': 'seated-twist-8.png'
  };
  
  for (const [oldName, newName] of Object.entries(map)) {
    content = content.split(oldName).join(newName);
  }
  
  fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Code files updated.");
