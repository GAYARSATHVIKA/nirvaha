const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Certification = require('./models/Certification');

dotenv.config();

async function updateCert() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const modules = JSON.parse(fs.readFileSync('parsed_modules_fcc.json', 'utf8'));

  const certId = 'foundations-clear-communication';
  let cert = await Certification.findOne({ id: certId });
  
  if (!cert) {
    cert = new Certification({
      id: certId,
      title: 'Foundations of Clear Communication',
      description: 'Learn how to communicate ideas clearly, speak confidently in professional settings, ask effective questions, and handle difficult conversations.',
      image: '/images/cert-comm.jpg',
      feel: 'Clear, Confident, Professional',
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
  
  console.log('Updated Certification: Foundations of Clear Communication');
  process.exit(0);
}

updateCert().catch(console.error);
