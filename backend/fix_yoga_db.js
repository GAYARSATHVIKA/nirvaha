const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

async function fixYogaDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Yoga = require('./models/Yoga');
  
  const allYogas = await Yoga.find({});
  let count = 0;
  
  for (const yoga of allYogas) {
    if (!yoga.imageUrl) continue;
    
    let newUrl = yoga.imageUrl;
    
    // Fix "yoga for meditation" folder name
    if (newUrl.includes('/yoga for meditation/')) {
      newUrl = newUrl.replace('/yoga for meditation/', '/yoga-for-meditation/');
    }
    
    // Fix "poses for medittaion" folder name
    if (newUrl.includes('/poses for medittaion/')) {
      newUrl = newUrl.replace('/poses for medittaion/', '/poses-for-meditation/');
    }
    
    // Fix spaces in filenames for yoga-for-meditation
    if (newUrl.includes('/yoga-for-meditation/seated 2.png')) newUrl = newUrl.replace('seated 2.png', 'seated-2.png');
    if (newUrl.includes('/yoga-for-meditation/staff 3.png')) newUrl = newUrl.replace('staff 3.png', 'staff-3.png');
    // easy 1.jpg etc
    if (newUrl.includes('easy 1.jpg')) newUrl = newUrl.replace('easy 1.jpg', 'easy-1.jpg');
    if (newUrl.includes('thunder 3.png')) newUrl = newUrl.replace('thunder 3.png', 'thunder-3.png');
    if (newUrl.includes('corpus 5.png')) newUrl = newUrl.replace('corpus 5.png', 'corpus-5.png');
    if (newUrl.includes('tree 7.png')) newUrl = newUrl.replace('tree 7.png', 'tree-7.png');
    
    // Add ?v=2 for cache busting if not already there
    if (!newUrl.includes('?v=2')) {
      newUrl += '?v=2';
    }
    
    if (newUrl !== yoga.imageUrl) {
      yoga.imageUrl = newUrl;
      await yoga.save();
      count++;
      console.log(`Updated: ${newUrl}`);
    }
  }
  
  console.log(`Fixed ${count} Yoga documents`);
  mongoose.disconnect();
}

fixYogaDb().catch(console.error);
