const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const SoundCard = require('../models/SoundCard');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const frontendFile = path.join(__dirname, '../../frontend/src/components/pages/SoundHealingPage.tsx');
  const code = fs.readFileSync(frontendFile, 'utf8');

  function extractArray(arrayName) {
    const startIdx = code.indexOf(`const ${arrayName} = [`);
    if (startIdx === -1) return null;
    const endIdx = code.indexOf('];', startIdx);
    const arrCode = code.substring(startIdx + `const ${arrayName} = `.length, endIdx + 1);
    try {
      return new Function(`return ${arrCode}`)();
    } catch (e) {
      return [];
    }
  }

  const fallbackLibrary = extractArray('fallbackLibrary') || [];
  
  let added = 0;
  for (const item of fallbackLibrary) {
    // Check if it already exists
    const existing = await SoundCard.findOne({ title: item.title });
    if (!existing) {
      await SoundCard.create({
        title: item.title,
        description: item.description,
        category: item.category,
        frequency: item.frequency,
        duration: parseInt(item.duration) || 0,
        coverImage: item.thumbnailUrl,
        audioUrl: item.audioUrl,
        artist: item.artist || '',
        collectionSlug: 'meditation', // Fallback library has meditation items
        status: 'Active'
      });
      console.log(`Added missing sound: ${item.title}`);
      added++;
    }
  }
  
  console.log(`Finished adding ${added} missing sounds.`);
  process.exit(0);
}
seed();
