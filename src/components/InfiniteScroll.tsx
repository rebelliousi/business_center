import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Star } from 'lucide-react';
import { useComments, type CommentType } from '../hooks/useComments';
import { useTranslation } from "react-i18next";

export function InfiniteScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: testimonials = [], isLoading, error } = useComments();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    if (!scrollRef.current || !testimonials.length) return;

    const items = scrollRef.current.children;
    const itemHeight = items[0]?.clientHeight || 0;
    const totalHeight = itemHeight * items.length;

    gsap.to(scrollRef.current, {
      y: -totalHeight / 2,
      duration: 20,
      ease: 'none',
      repeat: -1,
      modifiers: {
        y: (y: string) => {
          const val = parseFloat(y);
          return `${val % (totalHeight / 2)}px`;
        }
      }
    });
  }, [testimonials]);

  if (isLoading) {
    return (
      <div className="py-12 sm:py-16 md:py-20 text-center">
        <span className="inline-block animate-spin h-6 w-6 sm:h-8 sm:w-8 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full" />
        <div className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 font-semibold">{t("comments.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 sm:py-16 md:py-20 text-center text-red-500 text-sm sm:text-base">
        {t("comments.error")}
      </div>
    );
  }

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  function getTranslated(comment: any, field: string) {
    return (
      comment?.[`${field}_${lang}`] ||
      comment?.[field] ||
      comment?.[`${field}_en`] ||
      ""
    );
  }

  return (
    <section id='comments' className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            {t("comments.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            {t("comments.subtitle")}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Gradient Overlays - Responsive heights */}
          <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 md:h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-32 bg-gradient-to-t from-white to-transparent z-10"></div>

          {/* Scroll Container - Responsive height */}
          <div className="h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
            <div ref={scrollRef} className="space-y-3 sm:space-y-4 md:space-y-6">
              {duplicatedTestimonials.map((testimonial: CommentType, index: number) => (
                <div
                  key={testimonial.id ?? index}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md sm:shadow-lg border border-blue-100"
                >
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                    {Array.from({ length: Math.min(testimonial.rating, 5) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  {/* Comment Text */}
                  <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-4 sm:line-clamp-none">
                    "{getTranslated(testimonial, "text")}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                      {testimonial.name?.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 truncate">
                        {getTranslated(testimonial, "role")} {t("comments.at")} {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}