const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  await db.collection('poses').updateOne({ name: 'Mountain Pose' }, { $set: { imageUrl: '' } });
  console.log('Fixed Mountain Pose image');
  process.exit(0);
});
