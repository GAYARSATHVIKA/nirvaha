const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const SoundCard = require('./models/SoundCard');
const Meditation = require('./models/Meditation');
const WellnessSession = require('./models/WellnessSession');

const UPLOADS_DIR = path.join(__dirname, 'uploads');

async function cleanupUploads() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nirvaha';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const files = fs.readdirSync(UPLOADS_DIR);
    let deletedCount = 0;
    let keptCount = 0;

    console.log(`Scanning ${files.length} files in uploads directory...`);

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
        // File is unused, delete it
        const filePath = path.join(UPLOADS_DIR, file);
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log(`🗑️ Deleted unused file: ${file}`);
      } else {
        // File is used, keep it
        keptCount++;
        console.log(`✅ Kept used file: ${file}`);
      }
    }

    console.log(`\nCleanup Complete!`);
    console.log(`Total files scanned: ${files.length}`);
    console.log(`Files safely deleted: ${deletedCount}`);
    console.log(`Files kept (in use): ${keptCount}`);

  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

cleanupUploads();
