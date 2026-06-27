const mongoose = require('mongoose');
require('dotenv').config({ path: 'backend/.env' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Pose = require('./backend/models/Pose');
  const poses = await Pose.find();
  let count = 0;
  for (const p of poses) {
    if (p.imageUrl && (p.imageUrl.includes('poses for medittaion') || p.imageUrl.includes('yoga for meditation'))) {
      let newUrl = p.imageUrl
        .replace('poses for medittaion', 'poses-for-meditation')
        .replace('yoga for meditation', 'yoga-for-meditation');
      
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
        newUrl = newUrl.replace(oldName, newName);
      }
      
      if (newUrl !== p.imageUrl) {
        p.imageUrl = newUrl;
        await p.save();
        count++;
      }
    }
  }
  console.log(`Updated ${count} poses in DB.`);
  await mongoose.disconnect();
}

run().catch(console.error);
