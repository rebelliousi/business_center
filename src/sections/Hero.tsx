import { Button } from '../components/HeroButton';
import { ArrowRight, Sparkles, Contact } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { useSiteStats } from '../hooks/useStats';
import type { SiteStats } from '../hooks/useStats';

export function Hero() {
  const { t } = useTranslation();

  // SiteStats API'den veriyi alıyoruz
  const { data, isLoading, isError } = useSiteStats();

  // İstatistik alanları ve çeviri label'ları tanımlanır
  const statDefs = [
    { key: "teachers", label: t("teachersLabel", "Teachers") },
    { key: "courses", label: t("coursesLabel", "Courses") },
   
  ];

  // Görüntülenecek değerlerin tipini doğru işle
  const formatValue = (key: keyof SiteStats, stats: SiteStats): string => {
    const value = stats[key];
    if (key === "success_rate") {
      return typeof value === "number" ? `${value.toFixed(2)}%` : `${value}%`;
    }
    if (key === "avg_rating") {
      return typeof value === "number" ? value.toFixed(2) : value;
    }
    return String(value ?? "");
  };

  // API'den gelen veri array ise ilk elemanı kullan, obje ise direkt kullan
  const statsObj = Array.isArray(data) ? data[0] : data;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Arka plan efektleri */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 blue-gradient-mesh" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-3 sm:px-4 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 border border-blue-200 mb-6 sm:mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            <span className="text-xs sm:text-sm text-blue-700 font-medium">{t("badge")}</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-5 md:mb-6 tracking-tight text-blue-950 leading-tight"
          >
            {t("heading1")}
            <br />
            <span className="text-blue-gradient">{t("heading2")}</span>
          </motion.h1>

          {/* Açıklama */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-slate-600 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-2 leading-relaxed"
          >
            {t("desc")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 px-2"
          >
            <Button 
              onClick={() => {
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg" 
              className="w-full sm:w-auto rounded-full px-6 py-3 sm:px-8 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg bg-gradient-to-r from-blue-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-blue-500/40 transition-all group"
            >
              {t("startLearning")}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto rounded-full px-6 py-3 sm:px-8 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700"
            >
              <Contact className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {t("contactUs")}
            </Button>
          </motion.div>

          {/* Stats - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-2xl mx-auto px-2"
          >
            {isLoading && (
              statDefs.map((stat, index) => (
                <motion.div key={stat.key} className="blue-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}>
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 text-blue-gradient font-semibold animate-pulse bg-blue-50 rounded w-16 h-7" />
                  <div className="text-xs sm:text-sm text-slate-600 leading-tight">{stat.label}</div>
                </motion.div>
              ))
            )}
            {isError && (
              <div className="col-span-4 text-red-500 font-bold text-center">Failed to load stats.</div>
            )}
            {!isLoading && !isError && statsObj && (
              statDefs.map((stat, index) => (
                <motion.div key={stat.key} initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="blue-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 text-blue-gradient font-bold">
                    {formatValue(stat.key as keyof SiteStats, statsObj)}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 leading-tight">{stat.label}</div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator - Mobile'da gizli */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-blue-300 flex items-start justify-center p-1.5 sm:p-2">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500" />
        </div>
      </motion.div>
    </section>
  );
}