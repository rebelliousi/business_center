import React from "react";
import { motion } from "framer-motion";
import { Check, Award, Users, Zap, Target, Trophy, Star } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Industry-Recognized Certifications",
    description: "Earn certificates that are valued by top employers worldwide. Our programs are accredited and industry-aligned.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from seasoned professionals with decades of real-world experience in their fields.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials. Learn anytime, anywhere.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Target,
    title: "Practical Projects",
    description: "Apply your learning through hands-on projects and real-world case studies that build your portfolio.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Trophy,
    title: "Career Support",
    description: "Get access to our career services including resume reviews, interview prep, and job placement assistance.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Star,
    title: "Community & Networking",
    description: "Join a global community of learners and professionals. Build connections that last a lifetime.",
    gradient: "from-yellow-500 to-orange-500"
  }
];

export default function BusinessAdvice() {
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
            Why Choose Us
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
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-8 mb-12 last:mb-0"
            >
              {/* Vertical Line */}
              {index < reasons.length - 1 && (
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
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${reason.gradient} p-1 shadow-lg`}>
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <reason.icon className={`w-7 h-7 bg-gradient-to-br ${reason.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                  </div>
                </div>
                <div className={`absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-gradient-to-br ${reason.gradient} flex items-center justify-center`}>
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
                      {reason.title}
                    </h3>
                    <span className={`px-3 py-1 bg-gradient-to-r ${reason.gradient} text-white text-xs font-bold rounded-full`}>
                      Step {index + 1}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}