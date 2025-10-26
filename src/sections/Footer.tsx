import { Zap, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Courses', href: '#courses' },
    { name: 'Pricing', href: '#' },
    { name: 'Enterprise', href: '#' },
    { name: 'Partnerships', href: '#' },
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#advice' },
    { name: 'Press Kit', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Licenses', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-blue-50 to-white border-t border-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl tracking-tight text-blue-900">Academy</span>
            </a>
            <p className="text-slate-600 mb-6 max-w-xs leading-relaxed">
              Empowering the next generation of business leaders with world-class education.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group"
                  >
                    <Icon className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-blue-900">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-blue-900">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-blue-900">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-blue-900">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Status
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Changelog
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
