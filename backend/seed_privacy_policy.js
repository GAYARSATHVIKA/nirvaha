const mongoose = require('mongoose');
require('dotenv').config();
const Page = require('./models/Page');

const contentHtml = `
<section>
    <h3 style="font-size: 1.125rem; font-weight: 700; color: #065f46; margin-bottom: 0.5rem;">1. Introduction</h3>
    <p>Nirvaha respects and protects user privacy. This Privacy Policy explains what information is collected, how it is used, stored, and protected when using the Nirvaha application.</p>
</section>
<br/>
<section>
    <h3 style="font-size: 1.125rem; font-weight: 700; color: #065f46; margin-bottom: 0.5rem;">2. Information We Collect</h3>
    <div style="margin-top: 1rem;">
        <p style="margin-bottom: 1rem;">
            <strong>Account Information:</strong> When creating an account, we collect your email address, authentication provider information, a unique user identifier, and an optional name. This information is utilized for account creation, authentication, managing user preferences, and facilitating account recovery.
        </p>
        <p style="margin-bottom: 1rem;">
            <strong>Reflection Content:</strong> When using the reflection features, we collect your text entries, voice transcripts, reflection history, and user-selected emotional states. This data enables us to generate meaningful reflections, improve personalization, and provide you with pattern awareness.
        </p>
        <p style="margin-bottom: 1rem;">
            <strong>Community Content:</strong> When participating in the anonymous reflection space, we collect your post content, interaction activity, and reflection insights to maintain community functionality, ensure moderation, and promote safety.
        </p>
        <p>
            <strong>Usage Information:</strong> We automatically collect diagnostic and usage information, such as your device model, operating system, application version, feature usage, and session activity. This information is essential to improve application performance, detect bugs, and enhance the overall user experience.
        </p>
    </div>
</section>
<br/>
<section>
    <h3 style="font-size: 1.125rem; font-weight: 700; color: #065f46; margin-bottom: 0.5rem;">3. Data Sharing</h3>
    <p>Nirvaha does not sell personal data, nor is user data shared with advertisers. Information may be processed by trusted third-party service providers solely to operate and maintain the Nirvaha application. These trusted partners include authentication providers, cloud hosting providers, analytics providers, and AI infrastructure providers.</p>
</section>
<br/>
<section>
    <h3 style="font-size: 1.125rem; font-weight: 700; color: #065f46; margin-bottom: 0.5rem;">4. Data Security</h3>
    <p>Nirvaha employs industry-standard security measures to protect your information, including encryption of data in transit, secure authentication protocols, and strict access controls. However, please note that no electronic transmission or storage system can guarantee absolute security.</p>
</section>
<br/>
<section>
    <h3 style="font-size: 1.125rem; font-weight: 700; color: #065f46; margin-bottom: 0.5rem;">5. User Rights & Account Deletion</h3>
    <p style="margin-bottom: 0.5rem;">Users maintain the right to access their account information, update profile details, and request the deletion of their personal data.</p>
    <p>
        You may permanently delete your account at any time by navigating to <strong>Settings → Privacy & Data → Delete Account</strong>. Account deletion permanently removes your account information, preferences, reflection history, voice transcripts, and community activity. Please note that certain data may remain temporarily in secure backups as required for security, legal, or operational purposes.
    </p>
</section>
<br/>
<section>
    <h3 style="font-size: 1.125rem; font-weight: 700; color: #065f46; margin-bottom: 0.5rem;">6. Children's Privacy</h3>
    <p>Nirvaha is intended strictly for users aged 18 years and older. Users below the minimum required age should not use the service or submit any personal information through the application.</p>
</section>
`;

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvaha');
  
  const existing = await Page.findOne({ slug: 'privacy-policy' });
  if (existing) {
    await Page.updateOne({ slug: 'privacy-policy' }, { content: contentHtml });
    console.log('Updated privacy-policy');
  } else {
    await Page.create({
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: contentHtml,
      isActive: true,
      description: 'The privacy policy for Nirvaha.',
      color: '#065f46'
    });
    console.log('Created privacy-policy');
  }
  process.exit(0);
}
run();
