const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const map = {
  '/poses-for-meditation/easy-1.jpg': '/poses-for-meditation/easy-1.jpg?v=2',
  '/poses-for-meditation/cosmic-2.png': '/poses-for-meditation/cosmic-2.png?v=2',
  '/poses-for-meditation/thunder-3.png': '/poses-for-meditation/thunder-3.png?v=2',
  '/poses-for-meditation/lotus-4.png': '/poses-for-meditation/lotus-4.png?v=2',
  '/poses-for-meditation/corpus-5.png': '/poses-for-meditation/corpus-5.png?v=2',
  '/poses-for-meditation/zen-6.png': '/poses-for-meditation/zen-6.png?v=2',
  '/poses-for-meditation/tree-7.png': '/poses-for-meditation/tree-7.png?v=2',
  '/poses-for-meditation/deep-8.png': '/poses-for-meditation/deep-8.png?v=2',

  '/yoga-for-meditation/bound.-1.png': '/yoga-for-meditation/bound.-1.png?v=2',
  '/yoga-for-meditation/seated-2.png': '/yoga-for-meditation/seated-2.png?v=2',
  '/yoga-for-meditation/staff-3.png': '/yoga-for-meditation/staff-3.png?v=2',
  '/yoga-for-meditation/cow-4.png': '/yoga-for-meditation/cow-4.png?v=2',
  '/yoga-for-meditation/camel-5.png': '/yoga-for-meditation/camel-5.png?v=2',
  '/yoga-for-meditation/cobra-6.png': '/yoga-for-meditation/cobra-6.png?v=2',
  '/yoga-for-meditation/boat-7.png': '/yoga-for-meditation/boat-7.png?v=2',
  '/yoga-for-meditation/seated-twist-8.png': '/yoga-for-meditation/seated-twist-8.png?v=2'
};

async function run() {
  console.log('Updating React components...');
  const pagePath = path.join(__dirname, '../frontend/src/components/pages/MeditationPage.tsx');
  let content = fs.readFileSync(pagePath, 'utf8');
  for (const [oldUrl, newUrl] of Object.entries(map)) {
    content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
  }
  fs.writeFileSync(pagePath, content);

  const circlePath = path.join(__dirname, '../frontend/src/components/MeditationPosesCircle.tsx');
  let circleContent = fs.readFileSync(circlePath, 'utf8');
  for (const [oldUrl, newUrl] of Object.entries(map)) {
    circleContent = circleContent.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
  }
  fs.writeFileSync(circlePath, circleContent);
  console.log('Updated React components!');

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
