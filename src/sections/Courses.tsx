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
} from 'lucide-react';
import { useCourses } from '../hooks/useCourses';
import { useTranslation, Trans } from 'react-i18next';

// Otomatik icon atama için ikon listesi
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

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    hover: 'hover:border-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    hover: 'hover:border-green-600',
    gradient: 'from-green-500 to-emerald-500',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    hover: 'hover:border-orange-600',
    gradient: 'from-amber-500 to-orange-500',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    hover: 'hover:border-purple-600',
    gradient: 'from-purple-500 to-pink-500',
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
    hover: 'hover:border-yellow-600',
    gradient: 'from-yellow-400 to-orange-400',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    hover: 'hover:border-red-600',
    gradient: 'from-rose-500 to-red-500',
  },
};

export default function Courses() {
  const { data: courses, isLoading, error } = useCourses();
  const [showAll, setShowAll] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        <div className="mt-4 text-blue-600 font-semibold">{t("courses.loading")}</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{t("courses.error")}</div>;
  }

  // Gösterilecek kurslar (8 veya tamamı)
  const displayedCourses = showAll ? courses : courses?.slice(0, 8);

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <Trans i18nKey="courses.title">
              Featured <span className="text-blue-600">Courses</span>
            </Trans>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("courses.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCourses?.map((course, index) => {
            const colors = colorClasses[course.color as keyof typeof colorClasses] || colorClasses.blue;
            const Icon = iconList[index % iconList.length];

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent ${colors.hover} transition-all cursor-pointer relative overflow-hidden group`}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
                />

                <div className={`${colors.bg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative z-10`}>
                  <Icon className={`w-8 h-8 ${colors.text}`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{course.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed relative z-10">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 relative z-10">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {t("courses.duration", { count: course.duration_weeks })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {t("courses.students", { count: course.students })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                  </div>
                  <button
                    className={`${colors.text} font-semibold hover:underline`}
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
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 bg-transparent rounded-full font-semibold shadow hover:bg-blue-50 hover:text-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? t("courses.showLess") : t("courses.showAll")}
              {showAll ? (
                <ChevronUp className="w-5 h-5 ml-1" />
              ) : (
                <ChevronDown className="w-5 h-5 ml-1" />
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
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              {/* Modal Arka planı */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-300/40 via-blue-900/50 to-blue-500/70 backdrop-blur-[2px]"
                onClick={() => setSelectedCourse(null)}
              />
              {/* Modal İçerik */}
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full"
              >
                <button
                  className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => setSelectedCourse(null)}
                  aria-label="Close"
                >
                  <X />
                </button>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">{selectedCourse.title}</h3>
                  <p className="text-gray-700 mb-6">{selectedCourse.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" /> {t("courses.duration", { count: selectedCourse.duration_weeks })}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Users className="w-4 h-4" /> {t("courses.students", { count: selectedCourse.students })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{selectedCourse.rating}</span>
                  </div>
                  <div className="text-xl font-semibold text-blue-700 mb-2">
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