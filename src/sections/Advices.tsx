import React from "react";
import { motion } from "framer-motion";
import { Check, Award, Users, Zap, Target, Trophy, Star } from "lucide-react";
import { useAdvices, type AdviceType } from "../hooks/useAdvice";

// Ikon stringine göre gradient eşleme
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
  // başka ikonları da ekleyebilirsin
};

export default function BusinessAdvice() {
  const { data: advices, isLoading, error } = useAdvices();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">Advices yüklenirken hata oluştu.</div>;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Advise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
            Your Success is Our Mission
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover what sets us apart and why thousands of professionals choose our platform
          </p>
        </motion.div>

        {/* Vertical Stepper */}
        <div className="max-w-4xl mx-auto">
          {advices?.map((advice: AdviceType, index: number) => {
            const Icon = iconMap[advice.icon] || Award; // default ikon
            const gradient = gradientMap[advice.icon] || "from-blue-500 to-cyan-500"; // default
            return (
              <motion.div
                key={advice.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-8 mb-12 last:mb-0"
              >
                {/* Vertical Line */}
                {index < (advices.length - 1) && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-blue-300 to-transparent" />
                )}

                {/* Icon Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="relative flex-shrink-0"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} p-1 shadow-lg`}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Icon className={`w-7 h-7 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                  <div className={`absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="flex-1 pb-12"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {advice.title}
                      </h3>
                      <span className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white text-xs font-bold rounded-full`}>
                        Step {advice.step || index + 1}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {advice.description}
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