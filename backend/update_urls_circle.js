const fs = require('fs');
const path = require('path');

const map = {
  // Poses for Meditation
  '/poses-for-meditation/easy-1.jpg': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/cosmic-2.png': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/thunder-3.png': 'https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/lotus-4.png': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/corpus-5.png': 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/zen-6.png': 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/tree-7.png': 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/deep-8.png': 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop'
};

const pagePath = path.join(__dirname, '../frontend/src/components/MeditationPosesCircle.tsx');
let content = fs.readFileSync(pagePath, 'utf8');
for (const [oldUrl, newUrl] of Object.entries(map)) {
  content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
}
fs.writeFileSync(pagePath, content);
console.log('Updated MeditationPosesCircle.tsx!');
