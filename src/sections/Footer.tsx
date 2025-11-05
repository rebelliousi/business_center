import { Zap, Github, Twitter, Linkedin, Instagram, Music2, BookOpen } from 'lucide-react';
import { useFooterData } from '../hooks/useFooter';
import { useTranslation } from "react-i18next";
import Logo from '../../public/logo 1.svg'

export function Footer() {
  const { data: footer, isLoading, error } = useFooterData();
  const { t } = useTranslation();

  const dynamicSocialLinks = [
    footer?.instagram && {
      icon: Instagram,
      href: footer.instagram.startsWith('http')
        ? footer.instagram
        : `https://instagram.com/${footer.instagram.replace(/^@/, '')}`,
      label: 'Instagram',
    },
    footer?.tiktok && {
      icon: Music2,
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
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 flex flex-col items-center justify-center">
        {/* Logo & Brand */}
        <a href="#home" className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10   flex items-center justify-center group-hover:scale-105 transition-transform">
            {/* <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> */}
            <img src={Logo} alt=""  className="w-12 h-12  text-white" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl tracking-tight text-blue-900 font-semibold text-center leading-tight">
            {footer?.name || 'Ýokary tehnologiýalaryň işewürligi'}
          </span>
        </a>

        {/* Description */}
        <p className="text-slate-600  mb-3 max-w-xl text-center leading-relaxed text-sm sm:text-base px-4">
          {isLoading
            ? t('footer.loading')
            : error || !footer
            ? t('footer.error')
            : t('footer.description')}
        </p>
         <span className="text-gray-500 italic text-base">
            {t("footer.university_name")}
            </span>

        {/* Social Links */}
        <div className="flex items-center gap-2.5 mt-5 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
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
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group active:scale-95"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </a>
                );
              })
            : [
                // <a 
                //   key="Twitter" 
                //   href="#" 
                //   aria-label="Twitter" 
                //   className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group active:scale-95"
                // >
                //   <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                // </a>,
                // <a 
                //   key="LinkedIn" 
                //   href="#" 
                //   aria-label="LinkedIn" 
                //   className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group active:scale-95"
                // >
                //   <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                // </a>,
                // <a 
                //   key="GitHub" 
                //   href="#" 
                //   aria-label="GitHub" 
                //   className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all group active:scale-95"
                // >
                //   <Github className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                // </a>
              ]
          }
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-slate-600 border-t border-blue-100 pt-4 sm:pt-6 w-full text-center px-4">
          © {new Date().getFullYear()} {footer?.name || 'Academy'}. 
        </p>
      </div>
    </footer>
  );
}