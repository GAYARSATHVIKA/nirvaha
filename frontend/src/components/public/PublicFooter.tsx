import React from 'react';
import { Link } from 'react-router-dom';

const PublicFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-emerald-900/20 bg-[#060a08]" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4" aria-label="Nirvaha homepage">
              <img
                src="/logo.png"
                alt="Nirvaha logo"
                className="h-10 w-auto"
                width={40}
                height={40}
              />
              <span
                className="text-lg font-bold text-white tracking-wide"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Nirvaha
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              A holistic wellness platform combining ancient spiritual wisdom with modern technology for complete mental and emotional well-being.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Legal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/delete-account" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Delete Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:nirvaha6@gmail.com"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  nirvaha6@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-emerald-900/20 pt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Nirvaha. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
              Privacy
            </Link>
            <span className="text-gray-700" aria-hidden="true">·</span>
            <Link to="/support" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
