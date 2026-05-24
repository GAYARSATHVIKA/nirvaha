import { motion } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Navigation({ currentPage, onNavigate, theme = "light" }: { currentPage: string; onNavigate?: (page: string) => void; theme?: "light" | "dark" }) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresMenuOpen, setFeaturesMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Visibility logic
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveredAtTop, setIsHoveredAtTop] = useState(false);
  const [isForceHidden, setIsForceHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Listen for custom toggle events from other pages
    const handleToggleNav = (e: any) => {
      if (e.detail?.hide !== undefined) {
        setIsForceHidden(e.detail.hide);
        setIsVisible(!e.detail.hide);
      }
    };

    window.addEventListener("nirvaha-toggle-nav", handleToggleNav);

    const handleScroll = () => {
      if (isForceHidden) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Reveal if mouse is over the top bar area (80px threshold)
      if (e.clientY <= 80) {
        setIsHoveredAtTop(true);
      } else {
        setIsHoveredAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("nirvaha-toggle-nav", handleToggleNav);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isForceHidden]);

  // Broadcast menu state for other components (like ChatbotPage)
  useEffect(() => {
    const isAnyMenuOpen = featuresMenuOpen || profileMenuOpen;
    window.dispatchEvent(new CustomEvent('nirvaha-menu-open', { detail: { isOpen: isAnyMenuOpen } }));
  }, [featuresMenuOpen, profileMenuOpen]);

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Use React Router navigation
      switch (page) {
        case 'home':
          navigate('/dashboard/overview');
          break;
        case 'overview':
          navigate('/dashboard/overview');
          break;
        case 'meditation':
          navigate('/dashboard/meditation');
          break;
        case 'sound':
          navigate('/dashboard/sound');
          break;
        case 'chatbot':
          navigate('/dashboard/chatbot');
          break;
        case 'community':
          navigate('/dashboard/community');
          break;
        case 'marketplace':
          navigate('/dashboard/marketplace');
          break;
        case 'companion':
          navigate('/dashboard/companion');
          break;
        case 'profile':
          navigate('/dashboard/profile');
          break;
        default:
          navigate(`/dashboard/${page}`);
      }
    }
    setMobileMenuOpen(false);
    setFeaturesMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const featureItems = [
    { id: "meditation", label: "Meditation" },
    { id: "sound", label: "Sound Healing" },
    { id: "chatbot", label: "AI Guide" },
    { id: "community", label: "Community" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: (isVisible || isHoveredAtTop || featuresMenuOpen || profileMenuOpen) ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-sm transition-all duration-300"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(6, 10, 8, 0.75)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(229, 231, 235, 0.8)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigate("home")}
            >
              <img
                src="/logo.png"
                alt="Nirvaha Logo"
                className="h-10 w-auto rounded-md object-contain drop-shadow-sm"
              />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Home */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate("home")}
                className={`flex items-center gap-2 px-4 py-2 transition-all ${
                  theme === 'dark'
                    ? (currentPage === "home" ? "text-emerald-400 font-bold" : "text-white/70 hover:text-white")
                    : (currentPage === "home" ? "text-black font-bold" : "text-black/70 hover:text-black")
                }`}
              >
                <span className="text-sm font-bold uppercase tracking-wider">Home</span>
              </motion.button>

              {/* Features Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFeaturesMenuOpen(!featuresMenuOpen)}
                  onMouseEnter={() => setFeaturesMenuOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2 transition-all ${
                    theme === 'dark'
                      ? (["meditation", "sound", "chatbot", "community"].includes(currentPage) ? "text-emerald-400 font-bold" : "text-white/70 hover:text-white")
                      : (["meditation", "sound", "chatbot", "community"].includes(currentPage) ? "text-black font-bold" : "text-black/70 hover:text-black")
                  }`}
                >
                  <span className="text-sm font-bold uppercase tracking-wider">Features</span>
                  <ChevronDown className={`w-4 h-4 transition-colors ${theme === 'dark' ? 'text-white/70' : 'text-teal-600'}`} />
                </motion.button>

                {featuresMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setFeaturesMenuOpen(false)}
                    className={`absolute top-full left-0 mt-2 w-64 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border ${
                      theme === 'dark'
                        ? 'bg-[#0a0f0d]/95 border-white/10 text-white'
                        : 'bg-white/95 border-gray-200 text-black'
                    }`}
                  >
                    {featureItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4, backgroundColor: theme === 'dark' ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)" }}
                        onClick={() => {
                          handleNavigate(item.id);
                          setFeaturesMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                          currentPage === item.id
                            ? (theme === 'dark' ? "bg-emerald-950/40 text-emerald-400" : "bg-emerald-50 text-emerald-700")
                            : (theme === 'dark' ? "text-emerald-100/75 hover:text-white" : "text-teal-700")
                        }`}
                      >
                        <span>{item.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Marketplace */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate("marketplace")}
                className={`flex items-center gap-2 px-4 py-2 transition-all ${
                  theme === 'dark'
                    ? (currentPage === "marketplace" ? "text-emerald-400 font-bold" : "text-white/70 hover:text-white")
                    : (currentPage === "marketplace" ? "text-black font-bold" : "text-black/70 hover:text-black")
                }`}
              >
                <span className="text-sm font-bold uppercase tracking-wider">Marketplace</span>
              </motion.button>

              {/* Companion */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate("companion")}
                className={`flex items-center gap-2 px-4 py-2 transition-all ${
                  theme === 'dark'
                    ? (currentPage === "companion" ? "text-emerald-400 font-bold" : "text-white/70 hover:text-white")
                    : (currentPage === "companion" ? "text-black font-bold" : "text-black/70 hover:text-black")
                }`}
              >
                <span className="text-sm font-bold uppercase tracking-wider">Companion</span>
              </motion.button>
            </div>

            {/* Profile Dropdown (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  onMouseEnter={() => setProfileMenuOpen(true)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-2xl hover:shadow-lg transition-all ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-white/5'
                      : 'bg-gradient-to-br from-emerald-50 to-teal-50'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                    <span className="text-lg">{user?.name?.charAt(0).toUpperCase() || '🧘'}</span>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm ${theme === 'dark' ? 'text-emerald-200' : 'text-teal-800'}`}>{user?.name || 'Guest'}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-teal-600'}`} />
                </motion.button>

                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setProfileMenuOpen(false)}
                    className={`absolute top-full right-0 mt-2 w-72 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border ${
                      theme === 'dark'
                        ? 'bg-[#0a0f0d]/95 border-emerald-950/80 text-white'
                        : 'bg-white/95 border-emerald-200/30'
                    }`}
                  >
                    <div className={`p-4 border-b ${
                      theme === 'dark'
                        ? 'border-emerald-950/80 bg-gradient-to-br from-emerald-950/20 to-teal-950/20'
                        : 'border-emerald-200/30 bg-gradient-to-br from-emerald-50/40 to-teal-50/40'
                    }`}>
                      <p className={`text-sm font-semibold mb-0.5 truncate ${theme === 'dark' ? 'text-emerald-200' : 'text-teal-800'}`}>{user?.name || 'Guest User'}</p>
                      <p className={`text-xs truncate ${theme === 'dark' ? 'text-emerald-400/60' : 'text-teal-600'}`} title={user?.email || ''}>{user?.email || 'No email'}</p>
                    </div>

                    <motion.button
                      whileHover={{ x: 4, backgroundColor: theme === 'dark' ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)" }}
                      onClick={() => {
                        handleNavigate("profile");
                        setProfileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                        currentPage === "profile"
                          ? (theme === 'dark' ? "bg-emerald-950/40 text-emerald-400" : "bg-emerald-50 text-emerald-700")
                          : (theme === 'dark' ? "text-emerald-200/80 hover:text-white" : "text-teal-700")
                      }`}
                    >
                      <span>My Profile</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ x: 4, backgroundColor: theme === 'dark' ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)" }}
                      className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                        theme === 'dark' ? "text-emerald-200/80 hover:text-white" : "text-teal-700"
                      }`}
                    >
                      <span>Settings</span>
                    </motion.button>

                    <div className={`border-t ${theme === 'dark' ? 'border-emerald-950/85' : 'border-emerald-200/30'}`}>
                      <motion.button
                        whileHover={{ x: 4, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                        onClick={() => {
                          handleLogout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-6 py-3 text-rose-600 transition-all"
                      >
                        <span>Sign Out</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-2xl flex items-center justify-center ${
                theme === 'dark' ? 'bg-emerald-950/50 text-emerald-400 border border-white/5' : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-[76px] left-0 right-0 z-40 lg:hidden backdrop-blur-xl border-b shadow-xl max-h-[calc(100vh-76px)] overflow-y-auto ${
            theme === 'dark' ? 'bg-[#0a0f0d]/95 border-emerald-950/80' : 'bg-white/95 border-emerald-200/30'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
            {/* Profile Section */}
            <div className={`mb-4 p-4 rounded-2xl ${
              theme === 'dark' ? 'bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-white/5' : 'bg-gradient-to-br from-emerald-50 to-teal-50'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                  <span className="text-2xl">{user?.name?.charAt(0).toUpperCase() || '🧘'}</span>
                </div>
                <div>
                  <p className={theme === 'dark' ? 'text-emerald-200' : 'text-teal-800'}>{user?.name || 'Guest User'}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-teal-600'}`}>View Profile</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleNavigate("profile");
                  setMobileMenuOpen(false);
                }}
                className={`w-full py-2 rounded-xl text-sm ${
                  theme === 'dark' ? 'bg-[#080d0b]/80 border border-white/5 text-emerald-400' : 'bg-white text-teal-800'
                }`}
              >
                Go to Profile
              </motion.button>
            </div>

            {/* Home */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleNavigate("home");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${currentPage === "home"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : (theme === 'dark' ? "text-emerald-200 hover:bg-emerald-950/40" : "text-teal-700 hover:bg-emerald-50")
                }`}
            >
              <span>Home</span>
            </motion.button>

            {/* Features */}
            <div className="space-y-2">
              <div className={`px-6 py-3 text-lg rounded-2xl ${theme === 'dark' ? 'text-emerald-400 font-bold' : 'text-teal-600'}`}>Features</div>
              {featureItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${currentPage === item.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                    : (theme === 'dark' ? "text-emerald-200/80 hover:bg-emerald-950/40" : "text-teal-700 hover:bg-emerald-50")
                    }`}
                >
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Marketplace */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleNavigate("marketplace");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${currentPage === "marketplace"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : (theme === 'dark' ? "text-emerald-200 hover:bg-emerald-950/40" : "text-teal-700 hover:bg-emerald-50")
                }`}
            >
              <span>Marketplace</span>
            </motion.button>

            {/* Companion */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleNavigate("companion");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${currentPage === "companion"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : (theme === 'dark' ? "text-emerald-200 hover:bg-emerald-950/40" : "text-teal-700 hover:bg-emerald-50")
                }`}
            >
              <span>Companion</span>
            </motion.button>

            {/* Sign Out */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                theme === 'dark' ? 'text-rose-400 hover:bg-rose-950/30' : 'text-rose-600 hover:bg-rose-50'
              }`}
            >
              <span>Sign Out</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  );
}