const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Sound = require('../models/Sound');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

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

  function extractObject(objName) {
    const startIdx = code.indexOf(`const ${objName}: Record<string, any[]> = {`);
    if (startIdx === -1) return null;
    let braceCount = 0;
    let endIdx = -1;
    let startParseIdx = code.indexOf('{', startIdx);
    for (let i = startParseIdx; i < code.length; i++) {
      if (code[i] === '{') braceCount++;
      if (code[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIdx = i;
          break;
        }
      }
    }
    const objCode = code.substring(startParseIdx, endIdx + 1);
    try {
      return new Function(`return ${objCode}`)();
    } catch (e) {
      return {};
    }
  }

  const staticFallbackSounds = extractObject('STATIC_FALLBACK_SOUNDS') || {};
  const sleepTherapyData = extractArray('sleepTherapyData') || [];
  const focusBoostData = extractArray('focusBoostData') || [];
  const natureSoundsData = extractArray('natureSoundsData') || [];
  const fallbackLibrary = extractArray('fallbackLibrary') || [];

  const allSounds = [];

  // 1. Add static fallback sounds mapped to mood
  for (const [moodSlug, items] of Object.entries(staticFallbackSounds)) {
    items.forEach(item => {
      allSounds.push({
        title: item.title,
        description: item.description,
        category: item.category,
        frequency: item.frequency || '',
        duration: parseInt(item.duration) || 0,
        thumbnailUrl: item.image || item.thumbnailUrl || '',
        audioUrl: item.audioUrl || '',
        artist: item.artist || '',
        mood: [moodSlug],
        status: 'Active',
      });
    });
  }

  // 2. Add collection data
  const collections = [
    { slug: 'sleep', data: sleepTherapyData },
    { slug: 'focus', data: focusBoostData },
    { slug: 'nature', data: natureSoundsData },
    { slug: 'meditation', data: fallbackLibrary }
  ];

  collections.forEach(col => {
    col.data.forEach(item => {
      allSounds.push({
        title: item.title,
        description: item.description,
        category: item.category,
        frequency: item.frequency || '',
        duration: parseInt(item.duration) || 0,
        thumbnailUrl: item.thumbnailUrl || item.image || '',
        audioUrl: item.audioUrl || '',
        artist: item.artist || '',
        mood: [col.slug],
        status: 'Active',
      });
    });
  });

  let addedCount = 0;
  for (const s of allSounds) {
    // Look up existing Sound by title
    const existing = await Sound.findOne({ title: s.title });
    if (!existing) {
      await Sound.create(s);
      console.log(`Added to Admin Sounds: ${s.title}`);
      addedCount++;
    } else {
      // Just update it if it's there
      await Sound.updateOne({ title: s.title }, { $set: s });
      console.log(`Updated Admin Sounds: ${s.title}`);
    }
  }

  console.log(`Done. ${addedCount} sounds seeded successfully to Admin Sound model.`);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
