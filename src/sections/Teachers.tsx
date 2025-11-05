import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useTeachers, type TeacherType } from '../hooks/useTeachers';
import { useTranslation, Trans } from 'react-i18next';

const avatarColors = {
  blue:    "#3b82f6",
  green:   "#10b981",
  orange:  "#f59e0b",
  purple:  "#8b5cf6",
  red:     "#ef4444",
  yellow:  "#eab308",
  teal:    "#14b8a6",
  indigo:  "#6366f1",
  pink:    "#ec4899",
  cyan:    "#06b6d4",
} as const;

type AvatarColor = keyof typeof avatarColors;

function getTranslated(teacher: any, field: string, lang: string) {
  return (
    teacher?.[`${field}_${lang}`] ||
    teacher?.[field] ||
    teacher?.[`${field}_en`] ||
    ""
  );
}

export default function Teachers() {
  const { data: teachers, isLoading, error } = useTeachers();
  const [showAll, setShowAll] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  if (isLoading) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <span className="inline-block animate-spin h-6 w-6 sm:h-8 sm:w-8 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full" />
        <div className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 font-semibold">{t("teachers.loading")}</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12 sm:py-16 md:py-20 text-sm sm:text-base">{t("teachers.error")}</div>;
  }

  const displayedTeachers = showAll ? teachers : teachers?.slice(0, 4);

  return (
    <section id="teachers" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            <Trans i18nKey="teachers.title">
              Meet Our <span className="text-blue-600">Expert Instructors</span>
            </Trans>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            {t("teachers.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {displayedTeachers?.map((teacher: TeacherType, index: number) => {
            const color = (teacher.color in avatarColors ? teacher.color : 'blue') as AvatarColor;
            return (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md sm:shadow-lg border border-blue-100"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  {/* Avatar */}
                  <motion.div whileHover={{ rotate: 5 }} className="shrink-0">
                    <svg 
                      width="80" 
                      height="80" 
                      viewBox="0 0 120 120"
                      className="sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]"
                    >
                      <defs>
                        <linearGradient id={`grad-${teacher.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: avatarColors[color], stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: avatarColors[color], stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <circle cx="60" cy="60" r="58" fill={`url(#grad-${teacher.id})`} />
                      <circle cx="60" cy="45" r="20" fill="white" opacity="0.9" />
                      <ellipse cx="60" cy="95" rx="30" ry="35" fill="white" opacity="0.9" />
                      <rect x="35" y="30" width="10" height="8" rx="2" fill={avatarColors[color]} opacity="0.8" />
                      <rect x="75" y="30" width="10" height="8" rx="2" fill={avatarColors[color]} opacity="0.8" />
                      <path d="M 50 55 Q 60 60 70 55" stroke={avatarColors[color]} strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left w-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      {teacher.name} {teacher.surname}
                    </h3>
                    <p className="text-sm sm:text-base text-blue-600 font-semibold mb-2">
                      {getTranslated(teacher, "role", lang)}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-3">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{t("teachers.experience", { count: Number(teacher.experience) })}</span>
                    </div>

                    {/* Expertise Box */}
                    <div className="bg-white rounded-lg p-2.5 sm:p-3 mb-3">
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                        {t("teachers.expertise")}:
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                        {getTranslated(teacher, "expertise", lang)}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {getTranslated(teacher, "description", lang)}
                    </p>

                    {/* LinkedIn Button
                    <button className="inline-flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors text-xs sm:text-sm md:text-base">
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{t("teachers.viewProfile")}</span>
                    </button> */}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* See All / Show Less Button */}
        {teachers && teachers.length > 4 && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-blue-600 text-blue-600 bg-transparent rounded-full text-sm sm:text-base font-semibold shadow hover:bg-blue-50 hover:text-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? t("teachers.showLess") : t("teachers.showAll")}
              {showAll ? (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}