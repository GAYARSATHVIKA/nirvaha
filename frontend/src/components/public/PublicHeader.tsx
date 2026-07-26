import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PublicHeader: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/delete-account', label: 'Delete Account' },
    { path: '/support', label: 'Support' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/20 bg-[#0a0f0c]/95 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            aria-label="Nirvaha — Return to homepage"
          >
            <img
              src="/logo.png"
              alt="Nirvaha logo"
              className="h-10 w-auto object-contain"
              width={40}
              height={40}
            />
            <span
              className="text-xl font-bold tracking-wide text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Nirvaha
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-emerald-600/20 text-emerald-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Nav Toggle — Simple dropdown */}
          <MobileNav navLinks={navLinks} isActive={isActive} />
        </div>
      </nav>
    </header>
  );
};

/* ─── Mobile Navigation ─── */
const MobileNav: React.FC<{
  navLinks: { path: string; label: string }[];
  isActive: (path: string) => boolean;
}> = ({ navLinks, isActive }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <ul className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-emerald-900/30 bg-[#0a0f0c] py-2 shadow-xl">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-emerald-600/20 text-emerald-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicHeader;
