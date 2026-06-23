const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const SoundCard = require('../models/SoundCard');

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
    
    // Evaluate the code
    try {
      return new Function(`return ${arrCode}`)();
    } catch (e) {
      console.log(`Failed to parse ${arrayName}`);
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
      console.log(`Failed to parse ${objName}`);
      return {};
    }
  }

  const staticFallbackSounds = extractObject('STATIC_FALLBACK_SOUNDS') || {};
  const sleepTherapyData = extractArray('sleepTherapyData') || [];
  const focusBoostData = extractArray('focusBoostData') || [];
  const natureSoundsData = extractArray('natureSoundsData') || [];

  const allSounds = [];

  // 1. Add static fallback sounds mapped to moodSlug
  for (const [moodSlug, items] of Object.entries(staticFallbackSounds)) {
    items.forEach(item => {
      allSounds.push({
        title: item.title,
        description: item.description,
        category: item.category,
        frequency: item.frequency,
        duration: parseInt(item.duration) || 0,
        coverImage: item.image || item.thumbnailUrl,
        audioUrl: item.audioUrl,
        artist: item.artist || '',
        moodSlug: moodSlug, // e.g. stress, anxiety
        status: 'Active',
      });
    });
  }

  // 2. Add collection data mapped to collectionSlug
  const collections = [
    { slug: 'sleep', data: sleepTherapyData },
    { slug: 'focus', data: focusBoostData },
    { slug: 'nature', data: natureSoundsData }
  ];

  collections.forEach(col => {
    col.data.forEach(item => {
      allSounds.push({
        title: item.title,
        description: item.description,
        category: item.category,
        frequency: item.frequency,
        duration: parseInt(item.duration) || 0,
        coverImage: item.thumbnailUrl || item.image,
        audioUrl: item.audioUrl,
        artist: item.artist || '',
        collectionSlug: col.slug,
        status: 'Active',
      });
    });
  });

  let addedCount = 0;
  for (const s of allSounds) {
    const existing = await SoundCard.findOne({ title: s.title, moodSlug: s.moodSlug, collectionSlug: s.collectionSlug });
    if (!existing) {
      await SoundCard.create(s);
      console.log(`Added: ${s.title}`);
      addedCount++;
    }
  }

  console.log(`Done. ${addedCount} sounds seeded successfully.`);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
