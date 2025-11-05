import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Users,
  Star,
  Target,
  TrendingUp,
  PieChart,
  Lightbulb,
  BarChart,
  BookOpen,
  Briefcase,
  Activity,
  Globe,
  Compass,
  Layers,
  MessageCircle,
  Shield,
  Rocket,
  Award,
  ClipboardList,
  Diamond,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
} from 'lucide-react';
import { useCourses } from '../hooks/useCourses';
import { useTranslation, Trans } from 'react-i18next';
import SmartCourseRatingBar from '../components/SmartCourseRatingBar';
import { colorClasses } from '../components/colorClasses'; // <-- Dışarıdan import ettik!

const iconList = [
  Star,
  Target,
  Diamond,
  TrendingUp,
  PieChart,
  Lightbulb,
  BarChart,
  BookOpen,
  Briefcase,
  Activity,
  Globe,
  Compass,
  Layers,
  MessageCircle,
  Shield,
  Rocket,
  Award,
  ClipboardList,
];

// Renk kontrol fonksiyonunu güncelliyoruz!
const allowedColors = Object.keys(colorClasses) as Array<keyof typeof colorClasses>;
function getCourseColor(value: string): keyof typeof colorClasses {
  return allowedColors.includes(value as any) ? (value as keyof typeof colorClasses) : "blue";
}

function getTranslated(course: any, field: string, lang: string) {
  return (
    course?.[`${field}_${lang}`] ||
    course?.[field] ||
    course?.[`${field}_en`] ||
    ""
  );
}

export default function Courses() {
  const { data: courses, isLoading, error } = useCourses();
  const [showAll, setShowAll] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  if (isLoading) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <span className="inline-block animate-spin h-6 w-6 sm:h-8 sm:w-8 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full" />
        <div className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 font-semibold">{t("courses.loading")}</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12 sm:py-16 md:py-20 text-sm sm:text-base">{t("courses.error")}</div>;
  }

  const displayedCourses = showAll ? courses : courses?.slice(0, 8);

  return (
    <section id="courses" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            <Trans i18nKey="courses.title">
              Featured <span className="text-blue-600">Courses</span>
            </Trans>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            {t("courses.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {displayedCourses?.map((course, index) => {
            const cardColorKey = getCourseColor(course.color);
            const colors = colorClasses[cardColorKey];
            const Icon = iconList[index % iconList.length];

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-5 md:p-6 lg:p-8 shadow-md sm:shadow-lg border-2 border-transparent ${colors.hover} transition-all cursor-pointer relative overflow-hidden group`}
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${colors.gradient} opacity-10 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 group-hover:scale-150 transition-transform duration-500`}
                />

                <div className={`${colors.bg} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 relative z-10`}>
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${colors.text}`} />
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 relative z-10 line-clamp-2">
                  {getTranslated(course, "title", lang)}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed relative z-10 line-clamp-2 sm:line-clamp-3">
                  {getTranslated(course, "description", lang)}
                </p>

                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 relative z-10">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">
                      {t("courses.duration", { count: course.duration_weeks })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">
                      {t("courses.hours", { count: course.hours })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 relative z-10">
                  {/* Rating bar - renk uyumlu! */}
                  <SmartCourseRatingBar courseId={course.id} compact color={cardColorKey} />
                  <button
                    className={`${colors.text} text-xs sm:text-sm font-semibold hover:underline`}
                    onClick={() => setSelectedCourse(course)}
                  >
                    {t("courses.learnMore")}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* See All / Show Less Button */}
        {courses && courses.length > 8 && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-blue-600 text-blue-600 bg-transparent rounded-full text-sm sm:text-base font-semibold shadow hover:bg-blue-50 hover:text-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? t("courses.showLess") : t("courses.showAll")}
              {showAll ? (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            >
              {/* Modal Background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-300/40 via-blue-900/50 to-blue-500/70 backdrop-blur-[2px]"
                onClick={() => setSelectedCourse(null)}
              />
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="relative z-10 bg-white rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              >
                <button
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedCourse(null)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="mb-4 sm:mb-6 pr-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-3">
                    {getTranslated(selectedCourse, "title", lang)}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                    {getTranslated(selectedCourse, "description", lang)}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("courses.duration", { count: selectedCourse.duration_weeks })}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("courses.students", { count: selectedCourse.students })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                   {/* Modal rating bar - renk uyumlu! */}
                   <SmartCourseRatingBar courseId={selectedCourse.id} color={getCourseColor(selectedCourse.color)} />
                  </div>
                  <div className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">
                    {t("courses.price")}:{" "}
                    {selectedCourse.price ? `${selectedCourse.price} TMT` : t("courses.free")}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}