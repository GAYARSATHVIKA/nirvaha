const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Pose = require('../models/Pose');

async function seedPoses() {
  try {
    const frontendPath = path.join(__dirname, '../../frontend/src/components/pages/MeditationPage.tsx');
    const code = fs.readFileSync(frontendPath, 'utf8');

    const p1Start = code.indexOf('const posesSet1 = [');
    const p1End = code.indexOf('  ];', p1Start);
    const p1Code = code.substring(p1Start + 'const posesSet1 = '.length, p1End + 3);

    const p2Start = code.indexOf('const posesSet2 = [');
    const p2End = code.indexOf('  ];', p2Start);
    const p2Code = code.substring(p2Start + 'const posesSet2 = '.length, p2End + 3);

    const evalObj = (str) => new Function('return ' + str)();
    
    const poses1 = evalObj(p1Code);
    const poses2 = evalObj(p2Code);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;

    const mapPose = (p, position, set) => ({
      name: p.label,
      sanskritName: p.sanskrit,
      poseNumber: parseInt(p.num, 10),
      category: 'Poses for Meditation', // default category
      shortCaption: p.description,
      shortIntro: p.sessionInfo,
      spiritualEssence: p.essence,
      ancientOrigin: p.origin,
      mentalBenefits: p.mentalBenefits,
      physicalBenefits: p.physicalBenefits,
      chakraName: p.chakra.split('-')[0].trim(),
      chakraDescription: p.chakra.split('-').slice(1).join('-').trim(),
      imageUrl: p.src,
      set: set,
      position: position,
      status: 'Active',
      show: true
    });

    for (let i = 0; i < poses1.length; i++) {
      const p = mapPose(poses1[i], i + 1, 'Set 1');
      const existing = await Pose.findOne({ name: p.name });
      if (!existing) {
        await Pose.create(p);
        console.log(`Added: ${p.name}`);
        added++;
      }
    }

    for (let i = 0; i < poses2.length; i++) {
      const p = mapPose(poses2[i], i + 1, 'Set 2');
      const existing = await Pose.findOne({ name: p.name });
      if (!existing) {
        await Pose.create(p);
        console.log(`Added: ${p.name}`);
        added++;
      }
    }

    console.log(`Done. ${added} poses seeded successfully.`);
    process.exit(0);
  } catch (e) {
    console.error('Error seeding poses:', e);
    process.exit(1);
  }
}

seedPoses();
