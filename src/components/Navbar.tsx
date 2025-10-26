import { Menu, X, Zap, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Eğer i18n kullanıyorsan import et:
// import { useTranslation } from "react-i18next";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dil dropdown için:
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ru" | "tk">("tk");
  // const { i18n } = useTranslation(); // Eğer i18n ile değiştiriyorsan

  const langRef = useRef<HTMLDivElement>(null);

  // Dış tıklamada dropdown kapanır
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

 const navItems = [
  { name: 'Why Us', href: '#why-us' },
  { name: 'Courses', href: '#courses' },
  { name: 'Teachers', href: '#teachers' },
  { name: 'Insights', href: '#advice' },
  { name: 'Comments', href: '#comments' },
  { name: 'Discounts', href: '#discounts' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

  // Diller ve gösterimleri
  const languages: { code: "en" | "ru" | "tk"; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "tk", label: "TK" },
  ];

  const handleLangChange = (code: "en" | "ru" | "tk") => {
    setLang(code);
    // Eğer i18n kullanıyorsan:
    // i18n.changeLanguage(code);
    setLangOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Blur & glassy background */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
      <nav className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl tracking-tight text-blue-900">Academy</span>
          </a>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-xl text-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>
          {/* Dil Dropdown */}
          <div className="hidden md:block relative" ref={langRef}>
            <button
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition-all focus:outline-none"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={langOpen}
            >
              {languages.find(l => l.code === lang)?.label || "TK"}
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
                        onClick={() => handleLangChange(l.code)}
                        className={`w-full text-left px-5 py-2 text-sm font-semibold hover:bg-blue-50 transition 
                          ${lang === l.code ? "text-blue-600 bg-blue-50" : "text-gray-700"}
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
            className="md:hidden p-2 rounded-xl hover:bg-blue-50 text-blue-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                {/* Mobilde de dil seçici ekle */}
                <div className="relative">
                  <button
                    className="w-full inline-flex items-center justify-between gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition-all focus:outline-none"
                    onClick={() => setLangOpen((v) => !v)}
                  >
                    {languages.find(l => l.code === lang)?.label || "TK"}
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
                              onClick={() => {handleLangChange(l.code); setMobileMenuOpen(false);}}
                              className={`w-full text-left px-5 py-2 text-md font-semibold hover:bg-blue-50 transition 
                                ${lang === l.code ? "text-blue-600 bg-blue-50" : "text-gray-700"}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}