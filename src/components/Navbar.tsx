import { Menu, X, Zap } from 'lucide-react';
import { Button } from '../components/HeroButton';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Courses', href: '#courses' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Insights', href: '#advice' },
    { name: 'About', href: '#about' },
  ];

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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/40 transition-all">
              Get Started
            </Button>
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
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500">
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}