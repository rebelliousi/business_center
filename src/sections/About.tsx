import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Zap, Globe } from 'lucide-react';
import { useAbout } from '../hooks/useAbout';
import { useTranslation } from "react-i18next";

// Yardımcı: Çok dilli alanları göster
function getTranslated(obj: any, field: string, lang: string) {
  return (
    obj?.[`${field}_${lang}`] ||
    obj?.[field] ||
    obj?.[`${field}_en`] ||
    ""
  );
}

export default function About() {
  const { data: aboutArr, isLoading, error } = useAbout();
  const about = aboutArr?.[0];
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center py-20 sm:py-32">
          <span className="inline-block animate-spin h-8 w-8 sm:h-10 sm:w-10 border-4 border-blue-600 border-t-transparent rounded-full" />
          <div className="mt-3 sm:mt-4 text-blue-600 font-semibold text-sm sm:text-base">{t("about.loading")}</div>
        </div>
      </section>
    );
  }

  if (error || !about) {
    return (
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center py-20 sm:py-32">
          <p className="text-base sm:text-lg text-red-500">{t("about.error")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-12 sm:py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            {getTranslated(about, "main_title", lang)}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {getTranslated(about, "main_subtitle", lang)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16">
          {/* Sol taraf - Dinamik içerik */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Mobile: İllüstrasyon üstte gösterilir */}
            <div className="lg:hidden mb-8">
              <motion.div
                className="relative max-w-xs mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <svg viewBox="0 0 400 400" className="w-full h-auto">
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  <motion.g
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <circle cx="200" cy="200" r="120" fill="#EFF6FF" />
                    <rect x="140" y="150" width="120" height="100" rx="10" fill="#3B82F6" />
                    <rect x="160" y="170" width="30" height="4" rx="2" fill="white" opacity="0.7" />
                    <rect x="160" y="180" width="50" height="4" rx="2" fill="white" opacity="0.7" />
                    <rect x="160" y="190" width="40" height="4" rx="2" fill="white" opacity="0.7" />
                    <circle cx="230" cy="190" r="15" fill="white" opacity="0.3" />
                    <path d="M220 185 L225 195 L240 180" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <rect x="150" y="220" width="20" height="20" fill="#10B981" opacity="0.8" />
                    <rect x="175" y="220" width="20" height="20" fill="#F59E0B" opacity="0.8" />
                    <rect x="200" y="220" width="20" height="20" fill="#EF4444" opacity="0.8" />
                    <rect x="225" y="220" width="20" height="20" fill="#8B5CF6" opacity="0.8" />
                  </motion.g>

                  <motion.circle
                    cx="80"
                    cy="120"
                    r="20"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <animate attributeName="cy" values="120;110;120" dur="2s" repeatCount="indefinite" />
                  </motion.circle>

                  <motion.circle
                    cx="320"
                    cy="280"
                    r="20"
                    fill="#F59E0B"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <animate attributeName="cy" values="280;290;280" dur="2s" repeatCount="indefinite" />
                  </motion.circle>
                </svg>
              </motion.div>
            </div>

            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              {getTranslated(about, "main_body", lang)}
            </p>

            <div className="space-y-4 sm:space-y-6">
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-3 sm:gap-4 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {getTranslated(about, "mission_title", lang)}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {getTranslated(about, "mission_text", lang)}
                  </p>
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-3 sm:gap-4 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {getTranslated(about, "vision_title", lang)}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {getTranslated(about, "vision_text", lang)}
                  </p>
                </div>
              </motion.div>

              {/* Values Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-3 sm:gap-4 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {getTranslated(about, "values_title", lang)}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {getTranslated(about, "values_text", lang)}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Sağ taraf - İllüstrasyon (Desktop only) */}
          <motion.div
            className="hidden lg:block relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-auto">
              <motion.circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="10,5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <motion.g
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <circle cx="200" cy="200" r="120" fill="#EFF6FF" />
                <rect x="140" y="150" width="120" height="100" rx="10" fill="#3B82F6" />
                <rect x="160" y="170" width="30" height="4" rx="2" fill="white" opacity="0.7" />
                <rect x="160" y="180" width="50" height="4" rx="2" fill="white" opacity="0.7" />
                <rect x="160" y="190" width="40" height="4" rx="2" fill="white" opacity="0.7" />
                <circle cx="230" cy="190" r="15" fill="white" opacity="0.3" />
                <path d="M220 185 L225 195 L240 180" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                <rect x="150" y="220" width="20" height="20" fill="#10B981" opacity="0.8" />
                <rect x="175" y="220" width="20" height="20" fill="#F59E0B" opacity="0.8" />
                <rect x="200" y="220" width="20" height="20" fill="#EF4444" opacity="0.8" />
                <rect x="225" y="220" width="20" height="20" fill="#8B5CF6" opacity="0.8" />
              </motion.g>

              <motion.circle
                cx="80"
                cy="120"
                r="20"
                fill="#10B981"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <animate attributeName="cy" values="120;110;120" dur="2s" repeatCount="indefinite" />
              </motion.circle>

              <motion.circle
                cx="320"
                cy="280"
                r="20"
                fill="#F59E0B"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <animate attributeName="cy" values="280;290;280" dur="2s" repeatCount="indefinite" />
              </motion.circle>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}