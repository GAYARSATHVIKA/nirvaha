const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Certification = require('./models/Certification');

dotenv.config();

async function updateCert() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const modules = JSON.parse(fs.readFileSync('parsed_modules_dcst.json', 'utf8'));

  const certId = 'decision-clarity-strategic-thinking';
  let cert = await Certification.findOne({ id: certId });
  
  if (!cert) {
    cert = new Certification({
      id: certId,
      title: 'Decision Clarity & Strategic Thinking',
      description: 'Learn how to think clearly, make better decisions, and approach problems with structured reasoning in academic, professional, and personal situations.',
      image: '/images/cert-dcst.jpg',
      feel: 'Clear, Strategic, Confident',
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
  
  console.log('Updated Certification: Decision Clarity & Strategic Thinking');
  process.exit(0);
}

updateCert().catch(console.error);
