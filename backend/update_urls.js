const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const map = {
  // Poses for Meditation
  '/poses-for-meditation/easy-1.jpg': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/cosmic-2.png': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/thunder-3.png': 'https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/lotus-4.png': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/corpus-5.png': 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/zen-6.png': 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/tree-7.png': 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=800&auto=format&fit=crop',
  '/poses-for-meditation/deep-8.png': 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop',

  // Yoga for Meditation
  '/yoga-for-meditation/bound.-1.png': 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop',
  '/yoga-for-meditation/seated-2.png': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
  '/yoga-for-meditation/staff-3.png': 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=800&auto=format&fit=crop',
  '/yoga-for-meditation/cow-4.png': 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=800&auto=format&fit=crop',
  '/yoga-for-meditation/camel-5.png': 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800&auto=format&fit=crop',
  '/yoga-for-meditation/cobra-6.png': 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=800&auto=format&fit=crop',
  '/yoga-for-meditation/boat-7.png': 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop',
  '/yoga-for-meditation/seated-twist-8.png': 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=800&auto=format&fit=crop'
};

async function run() {
  console.log('Updating MeditationPage.tsx...');
  const pagePath = path.join(__dirname, '../frontend/src/components/pages/MeditationPage.tsx');
  let content = fs.readFileSync(pagePath, 'utf8');
  for (const [oldUrl, newUrl] of Object.entries(map)) {
    content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
  }
  fs.writeFileSync(pagePath, content);
  console.log('Updated MeditationPage.tsx!');

  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  const Pose = require(path.join(__dirname, 'models/Pose'));
  let count = 0;
  for (const [oldUrl, newUrl] of Object.entries(map)) {
    const res = await Pose.updateMany({ imageUrl: oldUrl }, { $set: { imageUrl: newUrl } });
    count += res.modifiedCount;
  }
  console.log(`Updated ${count} poses in DB!`);
  mongoose.disconnect();
}

run().catch(console.error);
