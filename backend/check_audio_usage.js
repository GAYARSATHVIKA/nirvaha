const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const SoundCard = require('./models/SoundCard');
const Meditation = require('./models/Meditation');
const WellnessSession = require('./models/WellnessSession');

const UPLOADS_DIR = path.join(__dirname, 'uploads');

async function checkAllUsage() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nirvaha';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Get all files from uploads directory
    const files = fs.readdirSync(UPLOADS_DIR);
    
    let unusedCount = 0;
    let usedCount = 0;

    console.log(`Checking ${files.length} files...`);

    for (const file of files) {
      const regex = new RegExp(file, 'i');
      
      const soundCardMatches = await SoundCard.find({ audioUrl: regex });
      const meditationMatches = await Meditation.find({ audioUrl: regex });
      const wellnessMatches = await WellnessSession.find({
        $or: [
          { audioSource: regex },
          { 'seasons.episodes.videoUrl': regex }
        ]
      });

      const totalMatches = soundCardMatches.length + meditationMatches.length + wellnessMatches.length;

      if (totalMatches === 0) {
        unusedCount++;
        // console.log(`Unused: ${file}`);
      } else {
        usedCount++;
        console.log(`\nUSED: ${file}`);
        if (soundCardMatches.length > 0) console.log(` - SoundCard: ${soundCardMatches.map(s => s.title)}`);
        if (meditationMatches.length > 0) console.log(` - Meditation: ${meditationMatches.map(m => m.title)}`);
        if (wellnessMatches.length > 0) console.log(` - WellnessSession: ${wellnessMatches.map(w => w.title)}`);
      }
    }

    console.log(`\nSummary:`);
    console.log(`Total files: ${files.length}`);
    console.log(`Currently used: ${usedCount}`);
    console.log(`Currently UNUSED: ${unusedCount}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkAllUsage();
