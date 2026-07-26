import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/common/SEOHead';
import PublicLayout from '@/components/public/PublicLayout';

/*
 * ──────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDERS — Replace before deployment:
 *   [SUPPORT_EMAIL] → official support email (e.g. support@nirvaha.org)
 * ──────────────────────────────────────────────────────────────────────────────
 */

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://nirvaha.org';

/* ─── Support topic card ─── */
const SupportCard: React.FC<{
  icon: string;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-6 transition-colors hover:border-emerald-700/40">
    <div className="mb-3 flex items-center gap-3">
      <span className="text-2xl" role="img" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-base font-semibold text-white">{title}</h3>
    </div>
    <div className="space-y-2 text-sm leading-relaxed text-gray-300">{children}</div>
  </div>
);

const SupportPage: React.FC = () => {
  return (
    <PublicLayout>
      <SEOHead
        title="Support Center — Nirvaha"
        description="Get help with your Nirvaha account, privacy questions, account deletion, notifications, and more. Contact our support team for assistance."
        keywords="Nirvaha support, help center, account help, privacy questions, delete account help, Nirvaha contact"
        canonical={`${SITE_URL}/support`}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Page Header */}
        <header className="mb-14 text-center">
          <h1
            className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Support Center
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-400">
            We&rsquo;re here to help. Find answers to common questions or get in touch with our
            support team.
          </p>
        </header>

        {/* ── Support Topics Grid ── */}
        <section aria-label="Support topics" className="mb-14">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* General Support */}
            <SupportCard icon="🧘" title="General Support">
              <p>
                Nirvaha is a holistic wellness platform that combines ancient spiritual wisdom with
                modern technology. If you need help navigating the platform, exploring meditation
                sessions, sound healing, or any other feature, please reach out to us.
              </p>
              <p>
                <strong className="text-white">Common topics:</strong> Getting started, navigating
                the dashboard, using meditation and sound healing features, learning paths and
                certifications.
              </p>
            </SupportCard>

            {/* Account Assistance */}
            <SupportCard icon="👤" title="Account Assistance">
              <p>
                Need help with your account? We can assist with sign-in issues, profile updates,
                password resets, and other account-related questions.
              </p>
              <p>
                <strong className="text-white">Sign-in help:</strong> If you&rsquo;re having trouble
                signing in or accessing your profile, try resetting your password or contact our support team.
              </p>
            </SupportCard>

            {/* Privacy Questions */}
            <SupportCard icon="🔒" title="Privacy Questions">
              <p>
                Your privacy matters to us. If you have questions about how Nirvaha collects, uses,
                or protects your data, please review our Privacy Policy or contact us directly.
              </p>
              <p>
                <Link
                  to="/privacy"
                  className="text-emerald-400 underline hover:text-emerald-300"
                >
                  Read our full Privacy Policy &rarr;
                </Link>
              </p>
            </SupportCard>

            {/* Account Deletion */}
            <SupportCard icon="🗑️" title="Account Deletion">
              <p>
                You can permanently delete your Nirvaha account and associated data at any time.
                We&rsquo;ve documented the complete process, including what data is removed and what
                may be retained.
              </p>
              <p>
                <Link
                  to="/delete-account"
                  className="text-emerald-400 underline hover:text-emerald-300"
                >
                  View account deletion instructions &rarr;
                </Link>
              </p>
            </SupportCard>

            {/* Notifications */}
            <SupportCard icon="🔔" title="Notifications">
              <p>
                Nirvaha may send you in-app notifications related to your wellness journey, session
                reminders, community activity, and companion updates.
              </p>
              <p>
                <strong className="text-white">Managing notifications:</strong> You can adjust your
                notification preferences from your Profile settings within the app. Browser
                notification permissions can be managed through your browser settings.
              </p>
            </SupportCard>

            {/* Technical Issues */}
            <SupportCard icon="⚙️" title="Technical Issues">
              <p>
                Experiencing a bug, loading issue, or unexpected behavior? Please include the
                following when contacting us:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-gray-400">
                <li>What you were trying to do</li>
                <li>What happened instead</li>
                <li>Your browser name and version</li>
                <li>Any error messages you saw</li>
              </ul>
            </SupportCard>
          </div>
        </section>

        {/* ── Contact Section ── */}
        <section id="contact" className="mb-14">
          <h2
            className="mb-6 text-center text-2xl font-bold text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Contact Us
          </h2>

          <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-8 text-center">
            <p className="mb-6 text-sm leading-relaxed text-gray-300">
              Can&rsquo;t find what you&rsquo;re looking for? Our support team is ready to help.
              Send us an email and we&rsquo;ll get back to you as soon as possible.
            </p>

            <a
              href="mailto:nirvaha6@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all hover:bg-emerald-500 hover:shadow-emerald-900/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#0a0f0c]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email: nirvaha6@gmail.com
            </a>

            <p className="mt-4 text-xs text-gray-500">
              We typically respond within 1–2 business days.
            </p>
          </div>
        </section>

        {/* ── Quick Links ── */}
        <section aria-label="Quick links">
          <h2
            className="mb-6 text-center text-xl font-bold text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Quick Links
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/"
              className="rounded-lg border border-emerald-900/30 px-5 py-2.5 text-gray-300 transition-colors hover:border-emerald-700/40 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/privacy"
              className="rounded-lg border border-emerald-900/30 px-5 py-2.5 text-gray-300 transition-colors hover:border-emerald-700/40 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/delete-account"
              className="rounded-lg border border-emerald-900/30 px-5 py-2.5 text-gray-300 transition-colors hover:border-emerald-700/40 hover:text-white"
            >
              Delete Account
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-emerald-900/30 px-5 py-2.5 text-gray-300 transition-colors hover:border-emerald-700/40 hover:text-white"
            >
              Sign In
            </Link>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default SupportPage;
