import React from "react";
import { motion } from "framer-motion";
import { Check, Award, Users, Zap, Target, Trophy, Star } from "lucide-react";
import { useAdvices, type AdviceType } from "../hooks/useAdvice";
import { useTranslation } from "react-i18next";

const gradientMap: Record<string, string> = {
  "award": "from-blue-500 to-cyan-500",
  "users": "from-purple-500 to-pink-500",
  "zap": "from-orange-500 to-red-500",
  "target": "from-green-500 to-emerald-500",
  "trophy": "from-indigo-500 to-purple-500",
  "star": "from-yellow-500 to-orange-500",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "award": Award,
  "users": Users,
  "zap": Zap,
  "target": Target,
  "trophy": Trophy,
  "star": Star,
};

function getTranslated(advice: any, field: string, lang: string) {
  return (
    advice?.[`${field}_${lang}`] ||
    advice?.[field] ||
    advice?.[`${field}_en`] ||
    ""
  );
}

export default function BusinessAdvice() {
  const { data: advices, isLoading, error } = useAdvices();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  if (isLoading) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <span className="inline-block animate-spin h-6 w-6 sm:h-8 sm:w-8 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full" />
        <div className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 font-semibold">{t("advice.loading")}</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12 sm:py-16 md:py-20 text-sm sm:text-base">{t("advice.error")}</div>;
  }

  return (
    <section id="advice" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t("advice.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent px-2">
            {t("advice.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4 leading-relaxed">
            {t("advice.subtitle")}
          </p>
        </motion.div>

        {/* Vertical Stepper */}
        <div className="max-w-4xl mx-auto">
          {advices?.map((advice: AdviceType, index: number) => {
            const Icon = iconMap[advice.icon] || Award;
            const gradient = gradientMap[advice.icon] || "from-blue-500 to-cyan-500";
            return (
              <motion.div
                key={advice.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 last:mb-0"
              >
                {/* Vertical Line - Hidden on mobile if too small */}
                {index < (advices.length - 1) && (
                  <div className="absolute left-5 sm:left-6 md:left-7 lg:left-8 top-14 sm:top-16 md:top-18 lg:top-20 w-0.5 h-full bg-gradient-to-b from-blue-300 to-transparent" />
                )}

                {/* Icon Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="relative flex-shrink-0"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${gradient} p-0.5 sm:p-1 shadow-md sm:shadow-lg`}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                  <div className={`absolute -right-0.5 -bottom-0.5 sm:-right-1 sm:-bottom-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="flex-1 pb-8 sm:pb-10 md:pb-12"
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all pr-2 sm:pr-0">
                        {getTranslated(advice, "title", lang)}
                      </h3>
                      <span className={`self-start sm:self-auto px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 bg-gradient-to-r ${gradient} text-white text-[10px] sm:text-xs font-bold rounded-full flex-shrink-0`}>
                        {t("advice.step", { count: advice.step || index + 1 })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                      {getTranslated(advice, "description", lang)}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}