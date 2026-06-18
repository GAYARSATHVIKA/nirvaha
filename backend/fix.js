const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const User = require('./models/User');
    const result = await User.updateOne(
      { email: 'dtarun2202@gmail.com' },
      { $set: { isApprovedCompanion: false, companionStatus: null, companionId: null } }
    );
    console.log('Update result:', result);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
