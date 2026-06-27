const mongoose = require('mongoose');
const fs = require('fs');

const Certification = require('./models/Certification');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvaha', { useNewUrlParser: true, useUnifiedTopology: true });

async function updateDb() {
  const coursesData = [
    { id: 'digital-mindfulness-modern-life-balance', file: 'injected_dmml.json' },
    { id: 'decision-clarity-strategic-thinking', file: 'injected_dcst.json' },
    { id: 'foundations-of-clear-communication', file: 'injected_fcc.json' }
  ];
  
  for (const c of coursesData) {
    if (!fs.existsSync(c.file)) continue;
    
    console.log(`Updating course ${c.id}...`);
    const modulesData = JSON.parse(fs.readFileSync(c.file, 'utf8'));
    
    const course = await Certification.findOne({ id: c.id });
    if (!course) {
      console.log(`Course ${c.id} not found in DB!`);
      continue;
    }
    
    for (let i = 0; i < modulesData.length; i++) {
      const modData = modulesData[i];
      const dbMod = course.modules.find(m => m.id === modData.id) || course.modules[i];
      
      if (!dbMod) continue;
      
      for (let j = 0; j < modData.units.length; j++) {
        const unitData = modData.units[j];
        const dbUnit = dbMod.units.find(u => u.id === unitData.id) || dbMod.units[j];
        
        if (!dbUnit) continue;
        
        if (unitData.type === 'reading' && unitData.content && unitData.content.body) {
           dbUnit.content.body = unitData.content.body;
        }
      }
    }
    await course.save();
  }
  
  console.log('Database updated!');
  mongoose.disconnect();
}

updateDb().catch(console.error);
