import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/common/SEOHead';
import PublicLayout from '@/components/public/PublicLayout';

/*
 * ──────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDERS — Replace before deployment:
 *   [SUPPORT_EMAIL] → official support email (e.g. support@nirvaha.org)
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * VERIFICATION NOTES (from codebase audit):
 *   • Backend route: DELETE /api/users/account  (requires JWT)
 *     → deletes UserSettings document
 *     → deletes User document
 *   • The backend does NOT explicitly delete: Reflections, Community Posts,
 *     Companion Applications, Bookings, Marketplace Requests, etc.
 *   • [NEEDS CONFIRMATION] Whether there is currently a visible
 *     "Delete Account" button in the app UI (e.g. in Profile settings).
 * ──────────────────────────────────────────────────────────────────────────────
 */

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://nirvaha.org';

const DeleteAccountPage: React.FC = () => {
  return (
    <PublicLayout>
      <SEOHead
        title="Delete Your Account — Nirvaha"
        description="Learn how to permanently delete your Nirvaha account and understand what data is removed when you do."
        keywords="Nirvaha delete account, account deletion, remove data, Nirvaha privacy"
        canonical={`${SITE_URL}/delete-account`}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1
            className="mb-3 text-3xl font-bold tracking-wide text-white sm:text-4xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Delete Your Account
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-400">
            Nirvaha respects your right to control your personal data. You can permanently delete
            your account and associated data at any time.
          </p>
        </header>

        {/* ── How to Delete ── */}
        <section id="how-to-delete" className="mb-10">
          <h2
            className="mb-4 text-xl font-bold text-emerald-400"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            How to Delete Your Account
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-300">
            <p>You can delete your Nirvaha account using the following method:</p>

            <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-6">
              <h3 className="mb-3 text-base font-semibold text-white">
                Option 1: Delete from Within the App
              </h3>
              <ol className="ml-5 list-decimal space-y-2 text-gray-300">
                <li>Sign in to your Nirvaha account</li>
                <li>Navigate to your <strong className="text-white">Profile</strong> page</li>
                <li>Go to <strong className="text-white">Settings</strong></li>
                <li>
                  Select <strong className="text-white">Delete Account</strong>
                  {/* NEEDS CONFIRMATION: Verify exact location of delete button in app UI */}
                </li>
                <li>Confirm the deletion when prompted</li>
              </ol>
              <p className="mt-3 text-xs text-gray-500">
                {/* NEEDS CONFIRMATION: The exact location of the Delete Account option
                    in the app UI could not be fully confirmed from the codebase.
                    The backend endpoint exists (DELETE /api/users/account).
                    Please verify and update these steps if needed. */}
                Note: The exact navigation path may vary slightly depending on your app version.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-6">
              <h3 className="mb-3 text-base font-semibold text-white">
                Option 2: Request Deletion via Email
              </h3>
              <p>
                If you are unable to delete your account from within the app, you can request
                account deletion by sending an email to{' '}
                <a
                  href="mailto:nirvaha6@gmail.com"
                  className="text-emerald-400 underline hover:text-emerald-300"
                >
                  nirvaha6@gmail.com
                </a>{' '}
                with the subject line <strong className="text-white">&ldquo;Account Deletion Request&rdquo;</strong>.
              </p>
              <p className="mt-2">
                Please include the email address associated with your Nirvaha account so we can
                locate and process your request. We will respond within a reasonable timeframe.
              </p>
            </div>
          </div>
        </section>

        {/* ── What Gets Deleted ── */}
        <section id="what-gets-deleted" className="mb-10">
          <h2
            className="mb-4 text-xl font-bold text-emerald-400"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            What Data Is Deleted
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-gray-300">
            <p>When your account is deleted, the following data is permanently removed:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Your user account (name, email, profile information)</li>
              <li>Your user settings and preferences</li>
              <li>Your authentication credentials</li>
            </ul>
          </div>
        </section>

        {/* ── What May Be Retained ── */}
        <section id="data-retention" className="mb-10">
          <h2
            className="mb-4 text-xl font-bold text-emerald-400"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Data That May Be Retained
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-gray-300">
            <p>
              Certain data may be retained even after account deletion in the following
              circumstances:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong className="text-white">Anonymized or aggregated data</strong> that cannot
                be linked back to your identity may be retained for analytics and platform
                improvement purposes.
              </li>
              <li>
                <strong className="text-white">Legal obligations</strong> — we may retain
                information if required by applicable law or regulation.
              </li>
            </ul>
          </div>
        </section>

        {/* ── After Deletion ── */}
        <section id="after-deletion" className="mb-10">
          <h2
            className="mb-4 text-xl font-bold text-emerald-400"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            What Happens After Deletion
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-gray-300">
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Your account will be permanently deleted and you will be signed out</li>
              <li>You will no longer be able to sign in with the deleted account</li>
              <li>Your session history, wellness scores, and progress will be removed</li>
              <li>Any active companion applications or marketplace requests associated with your account will become inaccessible</li>
              <li>This action is <strong className="text-white">irreversible</strong> — your data cannot be recovered after deletion</li>
            </ul>
          </div>
        </section>

        {/* ── Need Help ── */}
        <section id="need-help" className="mb-10">
          <h2
            className="mb-4 text-xl font-bold text-emerald-400"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Need Help?
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-gray-300">
            <p>
              If you have questions or need assistance with account deletion, please contact our
              support team:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong className="text-white">Email:</strong>{' '}
                <a
                  href="mailto:nirvaha6@gmail.com"
                  className="text-emerald-400 underline hover:text-emerald-300"
                >
                  nirvaha6@gmail.com
                </a>
              </li>
              <li>
                <strong className="text-white">Support Center:</strong>{' '}
                <Link to="/support" className="text-emerald-400 underline hover:text-emerald-300">
                  Visit our Support page
                </Link>
              </li>
              <li>
                <strong className="text-white">Privacy Policy:</strong>{' '}
                <Link to="/privacy" className="text-emerald-400 underline hover:text-emerald-300">
                  Read our full Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Bottom nav */}
        <div className="mt-12 border-t border-emerald-900/30 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
          <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            &larr; Privacy Policy
          </Link>
          <Link to="/support" className="text-emerald-400 hover:text-emerald-300 transition-colors sm:text-right">
            Support Center &rarr;
          </Link>
        </div>
      </article>
    </PublicLayout>
  );
};

export default DeleteAccountPage;
