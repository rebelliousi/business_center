import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!langOpen) return;
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [langOpen]);

  // Mobile menu açıkken body scroll'u engelle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { key: 'courses', href: '#courses' },
    { key: 'teachers', href: '#teachers' },
    { key: 'insights', href: '#advice' },
    { key: 'comments', href: '#comments' },
    { key: 'discounts', href: '#discounts' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ];

  const languages = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "tk", label: "TK" },
  ];

  const handleLangChange = (code: "en" | "ru" | "tk") => {
    i18n.changeLanguage(code);
    setLangOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
      <nav className="relative container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md sm:shadow-lg shadow-blue-500/20 sm:shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="px-4 py-2 rounded-xl text-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>

          {/* Dil Dropdown Desktop */}
          <div className="hidden md:block relative" ref={langRef}>
            <button
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition-all focus:outline-none"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={langOpen}
            >
              {languages.find(l => l.code === i18n.language)?.label || "TK"}
              <ChevronDown className={`w-4 h-4 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg ring-1 ring-blue-100 overflow-hidden z-50"
                >
                  {languages.map(l => (
                    <li key={l.code}>
                      <button
                        onClick={() => handleLangChange(l.code as "en" | "ru" | "tk")}
                        className={`w-full text-left px-5 py-2 text-sm font-semibold hover:bg-blue-50 transition 
                          ${i18n.language === l.code ? "text-blue-600 bg-blue-50" : "text-gray-700"}
                        `}
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-blue-50 text-blue-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Dropdown Style */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 'calc(100vh - 80px)' }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 overflow-y-auto overflow-x-hidden"
            >
              <div className="flex flex-col gap-1 sm:gap-1.5">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </motion.a>
                ))}

                {/* Language Selector Mobile - Divider */}
                <div className="border-t border-gray-200 my-2 sm:my-2.5" />

                {/* Language Selector Mobile */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.03 + 0.1 }}
                >
                  <button
                    className="w-full inline-flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all focus:outline-none text-sm sm:text-base"
                    onClick={() => setLangOpen((v) => !v)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm opacity-90">Language:</span>
                      <span>{languages.find(l => l.code === i18n.language)?.label || "TK"}</span>
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {langOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="mt-1.5 sm:mt-2 bg-white rounded-lg sm:rounded-xl shadow-lg ring-1 ring-blue-100 overflow-hidden"
                      >
                        {languages.map((l, index) => (
                          <motion.li 
                            key={l.code}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => {
                                handleLangChange(l.code as "en" | "ru" | "tk");
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-semibold hover:bg-blue-50 transition-all 
                                ${i18n.language === l.code ? "text-blue-600 bg-blue-50" : "text-gray-700"}
                              `}
                            >
                              <span className="flex items-center justify-between">
                                <span>{l.label}</span>
                                {i18n.language === l.code && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-600 rounded-full"
                                  />
                                )}
                              </span>
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}