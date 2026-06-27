const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Certification = require('./models/Certification');

dotenv.config();

async function updateCert() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const modules = JSON.parse(fs.readFileSync('parsed_modules.json', 'utf8'));

  const certId = 'digital-mindfulness-modern-life-balance';
  let cert = await Certification.findOne({ id: certId });
  
  if (!cert) {
    cert = new Certification({
      id: certId,
      title: 'Digital Mindfulness & Modern Life Balance',
      description: 'Learn how to manage digital distractions, improve focus, build healthier technology habits, and create better balance between digital life and real-world priorities.',
      image: '/images/cert-dmml.jpg',
      feel: 'Focused, Balanced, Aware',
      cta: 'Start Journey',
      isFree: true,
      price: 0,
      skillLevel: 'Beginner',
      duration: 'Self-paced',
      certificate: 'Professional Certificate'
    });
  }

  cert.modules = modules;
  await cert.save();
  
  console.log('Updated Certification: Digital Mindfulness & Modern Life Balance');
  process.exit(0);
}

updateCert().catch(console.error);
