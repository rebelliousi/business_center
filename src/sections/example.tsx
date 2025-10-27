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

export default function Teachers() {
  const { data: teachers, isLoading, error } = useTeachers();
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        <div className="mt-4 text-blue-600 font-semibold">{t("teachers.loading")}</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{t("teachers.error")}</div>;
  }

  const displayedTeachers = showAll ? teachers : teachers?.slice(0, 4);

  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <Trans i18nKey="teachers.title">
              Meet Our <span className="text-blue-600">Expert Instructors</span>
            </Trans>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("teachers.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
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
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100"
              >
                <div className="flex items-start gap-6">
                  <motion.div whileHover={{ rotate: 5 }} className="shrink-0">
                    <svg width="120" height="120" viewBox="0 0 120 120">
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

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {teacher.name} {teacher.surname}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">{teacher.role}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Award className="w-4 h-4" />
                    <span>{t("teachers.experience", { count: Number(teacher.experience) })}</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 mb-3">
                      <p className="text-sm font-semibold text-gray-700 mb-1">{t("teachers.expertise")}:</p>
                      <p className="text-sm text-gray-600">{teacher.expertise}</p>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{teacher.description}</p>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                      <Linkedin className="w-5 h-5" />
                      <span>{t("teachers.viewProfile")}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* See All / Show Less Button */}
        {teachers && teachers.length > 4 && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3 border-1 border-blue-600 text-blue-600 bg-transparent rounded-full font-semibold shadow hover:bg-blue-50 hover:text-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? t("teachers.showLess") : t("teachers.showAll")}
              {showAll ? (
                <ChevronUp className="w-5 h-5 ml-1" />
              ) : (
                <ChevronDown className="w-5 h-5 ml-1" />
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}