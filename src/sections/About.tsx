import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Zap, Globe } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">Our Platform</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering professionals worldwide with world-class business education
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Sol taraf - Önceki sağdaki yazılı içerik */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
           
           
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded in 2020, EduBusiness has grown to become the world's leading
              online business education platform. Our mission is to democratize
              access to world-class business education and empower professionals
              worldwide to achieve their career goals.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Mission
                  </h3>
                  <p className="text-gray-600">
                    To make premium business education accessible to everyone,
                    everywhere, and transform careers through practical learning.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Vision
                  </h3>
                  <p className="text-gray-600">
                    To become the global standard for online business education
                    and create a community of successful entrepreneurs and leaders.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Values
                  </h3>
                  <p className="text-gray-600">
                    Excellence, innovation, accessibility, and student success
                    guide everything we do. We're committed to your growth.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sağ taraf - İllüstrasyon */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-auto">
              <motion.circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="10,5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <motion.g
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <circle cx="200" cy="200" r="120" fill="#EFF6FF" />

                <rect x="140" y="150" width="120" height="100" rx="10" fill="#3B82F6" />

                <rect x="160" y="170" width="30" height="4" rx="2" fill="white" opacity="0.7" />
                <rect x="160" y="180" width="50" height="4" rx="2" fill="white" opacity="0.7" />
                <rect x="160" y="190" width="40" height="4" rx="2" fill="white" opacity="0.7" />

                <circle cx="230" cy="190" r="15" fill="white" opacity="0.3" />
                <path d="M220 185 L225 195 L240 180" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />

                <rect x="150" y="220" width="20" height="20" fill="#10B981" opacity="0.8" />
                <rect x="175" y="220" width="20" height="20" fill="#F59E0B" opacity="0.8" />
                <rect x="200" y="220" width="20" height="20" fill="#EF4444" opacity="0.8" />
                <rect x="225" y="220" width="20" height="20" fill="#8B5CF6" opacity="0.8" />
              </motion.g>

              <motion.circle
                cx="80"
                cy="120"
                r="20"
                fill="#10B981"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <animate attributeName="cy" values="120;110;120" dur="2s" repeatCount="indefinite" />
              </motion.circle>

              <motion.circle
                cx="320"
                cy="280"
                r="20"
                fill="#F59E0B"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <animate attributeName="cy" values="280;290;280" dur="2s" repeatCount="indefinite" />
              </motion.circle>
            </svg>
          </motion.div>
        </div>

        
        
      </div>
    </section>
  );
}