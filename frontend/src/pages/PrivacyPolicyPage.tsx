import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/common/SEOHead';
import PublicLayout from '@/components/public/PublicLayout';



const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://nirvaha.org';

/* ─── Section helper ─── */
const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({
  id,
  title,
  children,
}) => (
  <section id={id} className="mb-10">
    <h2 className="mb-4 text-xl font-bold text-emerald-400" style={{ fontFamily: "'Cinzel', serif" }}>
      {title}
    </h2>
    <div className="space-y-3 text-sm leading-relaxed text-gray-300">{children}</div>
  </section>
);

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PublicLayout>
      <SEOHead
        title="Privacy Policy — Nirvaha"
        description="Read Nirvaha's Privacy Policy to understand how we collect, use, and protect your personal information when you use our wellness platform."
        keywords="Nirvaha privacy policy, data protection, personal information, wellness app privacy"
        canonical={`${SITE_URL}/privacy`}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1
            className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Privacy Policy
          </h1>
        </header>

        {/* ── Introduction ── */}
        <Section id="introduction" title="1. Introduction">
          <p>
            Nirvaha (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
            operates the Nirvaha wellness platform, accessible via web browser and mobile devices.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you use Nirvaha.
          </p>
          <p>
            By accessing or using Nirvaha, you agree to the collection and use of information
            in accordance with this Privacy Policy. If you do not agree, please discontinue use
            of the platform.
          </p>
        </Section>

        {/* ── Information We Collect ── */}
        <Section id="information-collected" title="2. Information We Collect">
          <h3 className="font-semibold text-white text-base mt-2">2.1 Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li><strong className="text-white">Email address</strong> — required for account creation and authentication</li>
            <li><strong className="text-white">Name</strong> — required for your profile</li>
            <li><strong className="text-white">Password</strong> — stored in hashed form using bcrypt; we never store plaintext passwords</li>
          </ul>

          <h3 className="font-semibold text-white text-base mt-4">2.2 Profile Information (Optional)</h3>
          <p>You may optionally provide:</p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>Mobile phone number</li>
            <li>Age</li>
            <li>Gender</li>
            <li>Address / location</li>
            <li>Education background</li>
            <li>Health condition information</li>
            <li>Profile biography</li>
            <li>Profile avatar image</li>
          </ul>

          <h3 className="font-semibold text-white text-base mt-4">2.3 User-Generated Content</h3>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li><strong className="text-white">Reflection entries</strong> — text-based reflections you submit through the platform</li>
            <li><strong className="text-white">Voice reflections</strong> — audio recordings you provide for speech-to-text processing</li>
            <li><strong className="text-white">Community posts</strong> — content you share in the community space</li>
            <li><strong className="text-white">Mood data</strong> — mood information you choose to record</li>
          </ul>

          <h3 className="font-semibold text-white text-base mt-4">2.4 Usage and Activity Data</h3>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>Session history (meditation, sound healing, and other wellness sessions)</li>
            <li>Wellness scores and streaks</li>
            <li>Course enrollment and progress data</li>
            <li>Activity logs and weekly usage minutes</li>
          </ul>
        </Section>

        {/* ── How We Use Your Information ── */}
        <Section id="how-we-use" title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>Create and manage your Nirvaha account</li>
            <li>Authenticate your identity when you sign in</li>
            <li>Provide personalized wellness content and recommendations</li>
            <li>Process and respond to your reflection entries</li>
            <li>Convert voice reflections to text for the platform's features</li>
            <li>Track your wellness progress (sessions, streaks, scores)</li>
            <li>Enable community features and companion mentorship</li>
            <li>Manage course enrollments and certifications</li>
            <li>Respond to support inquiries</li>
            <li>Improve and optimize the platform</li>
          </ul>
        </Section>

        {/* ── Firebase & Third-Party Services ── */}
        <Section id="third-party-services" title="4. Firebase and Third-Party Services">
          <h3 className="font-semibold text-white text-base mt-2">4.1 Firebase Authentication</h3>
          <p>
            We use <strong className="text-white">Google Firebase Authentication</strong> to manage
            user sign-in. Firebase Authentication supports email/password login, Google OAuth, and
            GitHub OAuth. When you sign in, Firebase processes your authentication credentials in
            accordance with{' '}
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              Google&rsquo;s Privacy Policy
            </a>.
          </p>

          <h3 className="font-semibold text-white text-base mt-4">4.2 Firebase Analytics / Google Analytics</h3>
          <p>
            We use <strong className="text-white">Firebase Analytics (Google Analytics)</strong> to
            understand how users interact with the platform. This service may collect information
            such as pages visited, session duration, and general device/browser information.
            Analytics data is processed in accordance with Google&rsquo;s privacy practices.
          </p>

          <h3 className="font-semibold text-white text-base mt-4">4.3 AI-Powered Features</h3>
          <p>
            Nirvaha includes an AI chatbot feature for wellness guidance. Conversations with the
            AI assistant are processed to provide responses but are not used for advertising or
            shared with unrelated third parties.
          </p>

          <h3 className="font-semibold text-white text-base mt-4">4.4 Cloud Infrastructure</h3>
          <p>
            Our backend services are hosted on cloud infrastructure providers. Your data is
            transmitted securely to and stored on these services to operate the platform.
          </p>
        </Section>

        {/* ── Device Permissions ── */}
        <Section id="device-permissions" title="5. Device Permissions">
          <p>Nirvaha may request the following device permissions:</p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>
              <strong className="text-white">Microphone</strong> — used exclusively for the voice
              reflection feature (speech-to-text processing). Audio is processed for transcription
              and is not stored permanently unless you save the resulting text reflection.
            </li>
            <li>
              <strong className="text-white">File/Media access</strong> — used for uploading
              profile avatars and any media files you choose to share.
            </li>
          </ul>
          <p>
            All permissions are optional. You can deny or revoke permissions at any time through
            your browser or device settings. Denying permissions may limit certain features.
          </p>
        </Section>

        {/* ── Data Sharing ── */}
        <Section id="data-sharing" title="6. Data Sharing">
          <p>
            <strong className="text-white">Nirvaha does not sell your personal data.</strong>
          </p>
          <p>We may share your information only in these limited circumstances:</p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>
              <strong className="text-white">Service providers</strong> — with third-party services
              that help us operate the platform (Firebase, cloud hosting, analytics), only to the
              extent necessary for those services to function.
            </li>
            <li>
              <strong className="text-white">Community features</strong> — content you voluntarily
              post in community spaces may be visible to other authenticated users.
            </li>
            <li>
              <strong className="text-white">Legal requirements</strong> — if required by applicable
              law, regulation, legal process, or governmental request.
            </li>
          </ul>
          <p>We do not share your data for advertising purposes.</p>
        </Section>

        {/* ── Data Security ── */}
        <Section id="data-security" title="7. Data Security">
          <p>We implement reasonable security measures to protect your information:</p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>Passwords are hashed using bcrypt before storage</li>
            <li>Authentication sessions use JSON Web Tokens (JWT)</li>
            <li>Data is encrypted in transit using HTTPS/TLS</li>
            <li>Access to user data is restricted to authenticated and authorized requests</li>
          </ul>
          <p>
            While we strive to protect your information, no method of electronic transmission or
            storage is 100% secure. We cannot guarantee absolute security.
          </p>
        </Section>

        {/* ── Data Retention ── */}
        <Section id="data-retention" title="8. Data Retention">
          <p>
            We retain your personal information for as long as your account is active or as needed
            to provide you with our services. If you delete your account, your personal data
            (including your user profile, settings, and session history) will be permanently removed
            from our systems.
          </p>
          <p>
            We may retain certain anonymized or aggregated data that cannot be used to identify you
            for analytics and platform improvement purposes.
          </p>
        </Section>

        {/* ── Account Deletion ── */}
        <Section id="account-deletion" title="9. Account Deletion">
          <p>
            You have the right to delete your Nirvaha account at any time. When you delete your
            account, the following data is permanently removed:
          </p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>Your user account and profile information</li>
            <li>Your user settings and preferences</li>
          </ul>
          <p>
            For detailed instructions on how to delete your account, please visit our{' '}
            <Link to="/delete-account" className="text-emerald-400 underline hover:text-emerald-300">
              Account Deletion page
            </Link>.
          </p>
          <p>
            You may also contact us at{' '}
            <a href="mailto:nirvaha6@gmail.com" className="text-emerald-400 underline hover:text-emerald-300">
              {/* PLACEHOLDER: Replace nirvaha6@gmail.com */}
              nirvaha6@gmail.com
            </a>{' '}
            to request account deletion.
          </p>
        </Section>

        {/* ── Your Rights ── */}
        <Section id="your-rights" title="10. Your Rights">
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Withdraw consent for data processing</li>
            <li>Object to certain data processing activities</li>
            <li>Request data portability</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:nirvaha6@gmail.com" className="text-emerald-400 underline hover:text-emerald-300">
              nirvaha6@gmail.com
            </a>.
          </p>
        </Section>

        {/* ── Children's Privacy ── */}
        <Section id="childrens-privacy" title="11. Children's Privacy">
          <p>
            Nirvaha is not directed at children under the age of 13. We do not knowingly collect
            personal information from children under 13. If you believe we have inadvertently
            collected information from a child under 13, please contact us immediately at{' '}
            <a href="mailto:nirvaha6@gmail.com" className="text-emerald-400 underline hover:text-emerald-300">
              nirvaha6@gmail.com
            </a>{' '}
            and we will take steps to delete such information.
          </p>
        </Section>

        {/* ── Changes to This Policy ── */}
        <Section id="changes" title="12. Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or for other operational, legal, or regulatory reasons. We will post the updated policy
            on this page and update the &ldquo;Effective Date&rdquo; at the top.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically. Your continued use of
            Nirvaha after changes are posted constitutes your acceptance of the updated policy.
          </p>
        </Section>

        {/* ── Contact Us ── */}
        <Section id="contact" title="13. Contact Us">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our
            data practices, please contact us:
          </p>
          <ul className="ml-5 list-disc space-y-1.5 text-gray-300">
            <li>
              <strong className="text-white">Email:</strong>{' '}
              <a href="mailto:nirvaha6@gmail.com" className="text-emerald-400 underline hover:text-emerald-300">
                nirvaha6@gmail.com
              </a>
            </li>
            <li>
              <strong className="text-white">Support page:</strong>{' '}
              <Link to="/support" className="text-emerald-400 underline hover:text-emerald-300">
                {SITE_URL}/support
              </Link>
            </li>
          </ul>
        </Section>

        {/* Bottom nav */}
        <div className="mt-12 border-t border-emerald-900/30 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
          <Link to="/delete-account" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            &larr; Account Deletion Information
          </Link>
          <Link to="/support" className="text-emerald-400 hover:text-emerald-300 transition-colors sm:text-right">
            Support Center &rarr;
          </Link>
        </div>
      </article>
    </PublicLayout>
  );
};

export default PrivacyPolicyPage;
