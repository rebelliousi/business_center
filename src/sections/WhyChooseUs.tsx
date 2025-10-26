import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Users, Award, Zap, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Industry-Relevant Content",
    description: "Learn skills that employers are actively seeking. Our curriculum is designed with input from leading businesses.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from professionals with decades of real-world business experience and proven track records.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials. Learn from anywhere, anytime.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    title: "Recognized Certificates",
    description: "Earn certificates that are valued by employers worldwide and showcase your expertise.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "95% of our graduates report career advancement within 6 months of course completion.",
    color: "from-indigo-500 to-blue-500"
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">BusinessEdu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the best business education experience with proven results
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-transparent" />

          {/* Steps */}
          <div className="space-y-16">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.color} mb-4`}>
                      <reason.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                  </motion.div>
                </div>

                {/* Center Icon */}
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

                {/* Illustration Placeholder */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}