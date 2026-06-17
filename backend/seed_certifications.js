const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Certification = require('./models/Certification');
const fs = require('fs');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  
  const rawData = fs.readFileSync('../frontend/src/data/learningPaths.json');
  const data = JSON.parse(rawData);
  
  for (const path of data.learningPaths) {
    const existing = await Certification.findOne({ id: path.id });
    if (!existing) {
      console.log(`Seeding: ${path.title}`);
      await Certification.create({
        id: path.id,
        title: path.title,
        description: path.description,
        image: '',
        feel: '',
        cta: '',
        price: 0
      });
    } else {
      console.log(`Already exists: ${path.title}`);
    }
  }
  
  console.log('Done seeding certifications.');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
