import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Users, Award, Zap, TrendingUp } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";

const icons = [Target, Users, Zap, Award, TrendingUp];
const iconColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-blue-500"
];

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const reasons = t("whyChooseUs.reasons", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section id="why-us" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            <Trans i18nKey="whyChooseUs.title">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Us</span>
            </Trans>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            {t("whyChooseUs.subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line - Desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-transparent" />

          {/* Steps */}
          <div className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16">
            {reasons.map((reason, index) => {
              const Icon = icons[index];
              const color = iconColors[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 sm:gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 w-full ${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Icon with Number Badge - Mobile */}
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${color} flex-shrink-0`}>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        {/* Number Badge - Mobile only */}
                        <div className="flex lg:hidden items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-blue-200 shadow-sm">
                          <span className="text-sm sm:text-base font-bold text-blue-600">{index + 1}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {reason.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Icon - Desktop only */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-blue-200 items-center justify-center shadow-lg z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-blue-600" />
                    </motion.div>
                  </div>

                  {/* Illustration Placeholder - Desktop only */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}