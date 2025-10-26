import { Zap, Github, Twitter, Linkedin, Instagram, Music2 } from 'lucide-react';
import { useFooterData } from '../hooks/useFooter';

export function Footer() {
  const { data: footer, isLoading, error } = useFooterData();

  // Dinamik sosyal medya linkleri (Instagram ve TikTok)
  const dynamicSocialLinks = [
    footer?.instagram && {
      icon: Instagram,
      href: footer.instagram.startsWith('http')
        ? footer.instagram
        : `https://instagram.com/${footer.instagram.replace(/^@/, '')}`,
      label: 'Instagram',
    },
    footer?.tiktok && {
      icon: Music2, // TikTok için uygun bir ikon (lucide-react Music2)
      href: footer.tiktok.startsWith('http')
        ? footer.tiktok
        : `https://tiktok.com/@${footer.tiktok.replace(/^@/, '')}`,
      label: 'TikTok',
    },
  ].filter(Boolean) as {
    icon: React.ElementType;
    href: string;
    label: string;
  }[];

  return (
    <footer className="relative bg-gradient-to-b from-blue-50 to-white border-t border-blue-100">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <a href="#home" className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl tracking-tight text-blue-900 font-semibold">
            {footer?.name || 'Academy'}
          </span>
        </a>
        <p className="text-slate-600 mb-8 max-w-xl text-center leading-relaxed">
          {isLoading
            ? 'Loading...'
            : error || !footer
            ? 'Contact information could not be loaded.'
            : 'Empowering the next generation of business leaders with world-class education.'}
        </p>

        <div className="flex items-center gap-4 mb-8">
          {dynamicSocialLinks.length > 0
            ? dynamicSocialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group"
                  >
                    <Icon className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </a>
                );
              })
            : [
                <a key="Twitter" href="#" aria-label="Twitter" className="w-10 h-10 bg-white rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group">
                  <Twitter className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </a>,
                <a key="LinkedIn" href="#" aria-label="LinkedIn" className="w-10 h-10 bg-white rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group">
                  <Linkedin className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </a>,
                <a key="GitHub" href="#" aria-label="GitHub" className="w-10 h-10 bg-white rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group">
                  <Github className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </a>
              ]
          }
        </div>

      
        <p className="text-sm text-slate-600 border-t border-blue-100 pt-6 w-full text-center">
          © {new Date().getFullYear()} {footer?.name || 'Academy'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}