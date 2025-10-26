import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { useCourses } from '../hooks/useCourses';

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
  // React Query ile backend'den kurs verisini çekiyoruz
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">Kurslar yüklenirken hata oluştu.</div>;
  }

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
            Featured <span className="text-blue-600">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive selection of business courses designed to accelerate your professional growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course, index) => {
            const colors = colorClasses[course.color as keyof typeof colorClasses] || colorClasses.blue;
            // icon otomatik atanıyor, backend'den alınmıyor!
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
                {/* Decorative gradient circle */}
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
                      {typeof course.duration_weeks === "number"
                        ? `${course.duration_weeks} weeks`
                        : course.duration_weeks}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                  </div>
                  <button className={`${colors.text} font-semibold hover:underline`}>
                    Learn More →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}