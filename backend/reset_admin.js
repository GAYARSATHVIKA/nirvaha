require('dotenv').config();
const mongoose = require('mongoose');

const Booking = require('./models/Booking');
const EnrollmentApplication = require('./models/EnrollmentApplication');
const CompanionApplication = require('./models/CompanionApplication');
const MarketplaceRequest = require('./models/MarketplaceRequest');
const User = require('./models/User');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvaha';

async function resetAdminData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    // Delete all bookings (this resets revenue, total bookings, active sessions)
    const bookingResult = await Booking.deleteMany({});
    console.log(`Deleted ${bookingResult.deletedCount} bookings.`);

    // Delete all enrollment applications
    const enrollmentResult = await EnrollmentApplication.deleteMany({});
    console.log(`Deleted ${enrollmentResult.deletedCount} enrollment applications.`);

    // Delete companion applications
    const companionResult = await CompanionApplication.deleteMany({});
    console.log(`Deleted ${companionResult.deletedCount} companion applications.`);

    // Delete marketplace requests
    const marketplaceResult = await MarketplaceRequest.deleteMany({});
    console.log(`Deleted ${marketplaceResult.deletedCount} marketplace requests.`);

    // Delete all users EXCEPT admins
    const userResult = await User.deleteMany({ role: { $ne: 'admin' } });
    console.log(`Deleted ${userResult.deletedCount} non-admin users.`);

    // Also reset stats for the remaining admins just in case
    await User.updateMany(
      { role: 'admin' },
      { 
        $set: { 
          'stats.sessionsPlayed': 0,
          'stats.streak': 0,
          'stats.totalMinutes': 0,
          'stats.wellnessScore': 0,
          enrolledCourses: [],
          sessionHistory: []
        }
      }
    );
    console.log('Reset stats for admin users.');

    console.log('--- RESET COMPLETE ---');
  } catch (error) {
    console.error('Error during reset:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

resetAdminData();
