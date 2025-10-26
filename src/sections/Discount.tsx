import { motion } from 'framer-motion';
import { Tag, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useDiscounts } from '../hooks/useDiscounts';

function DiscountCard({ discount, index }: { discount: any; index: number }) {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl overflow-hidden shadow-xl group"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-grid-white opacity-10"></div>

      <div className="relative grid md:grid-cols-2 gap-8 p-8">
        <div className="flex flex-col justify-between">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full mb-4"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Tag className="w-4 h-4" />
              <span className="text-sm font-semibold">Special Offer</span>
            </motion.div>

            <h3 className="text-3xl font-bold text-white mb-3">
              {discount.title}
            </h3>

            <p className="text-blue-100 mb-6 text-lg">
              {discount.description}
            </p>

            <div className="flex items-center gap-2 text-blue-100 mb-6">
              <Calendar className="w-5 h-5" />
              <span>Valid until {new Date(discount.valid_until).toLocaleDateString()}</span>
            </div>
          </div>

          <motion.button
            className="flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Claim Offer
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl font-bold text-white mb-2">
                  {discount.discount_percentage ?? 50}%
                </div>
                <div className="text-blue-100 text-lg font-semibold">OFF</div>
              </div>
            </div>

            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
}

export default function Discounts() {
  const { data: discounts = [], isLoading: loading, error } = useDiscounts();

  // Kartlar 5 taneyse özel dizilim uygulanır
  const isFive = discounts.length === 5;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Limited Time Offers</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Special <span className="text-blue-600">Discounts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take advantage of our exclusive offers and start your learning journey today
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {isFive ? (
              <div className="flex flex-col gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {discounts.slice(0, 2).map((discount: any, index: number) => (
                    <DiscountCard key={discount.id} discount={discount} index={index} />
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {discounts.slice(2, 4).map((discount: any, index: number) => (
                    <DiscountCard key={discount.id} discount={discount} index={index + 2} />
                  ))}
                </div>
                <div className="flex justify-center">
                  <div className="w-full md:w-1/2 lg:w-1/3">
                    <DiscountCard discount={discounts[4]} index={4} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {discounts.map((discount: any, index: number) => (
                  <DiscountCard key={discount.id} discount={discount} index={index} />
                ))}
              </div>
            )}
          </>
        )}

        {!loading && discounts.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 text-lg">No active discounts at the moment. Check back soon!</p>
          </div>
        )}

       
      </div>
    </section>
  );
}