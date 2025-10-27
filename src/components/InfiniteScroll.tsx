import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Star } from 'lucide-react';
import { useComments, type CommentType } from '../hooks/useComments';
import { useTranslation } from "react-i18next";

export function InfiniteScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: testimonials = [], isLoading, error } = useComments();
  const { t } = useTranslation();

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
      <div className="py-20 text-center">
        <span className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        <div className="mt-4 text-blue-600 font-semibold">{t("comments.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {t("comments.error")}
      </div>
    );
  }

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id='comments' className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("comments.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("comments.subtitle")}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>

          <div className="h-[600px] overflow-hidden">
            <div ref={scrollRef} className="space-y-6">
              {duplicatedTestimonials.map((testimonial: CommentType, index: number) => (
                <div
                  key={testimonial.id ?? index}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border border-blue-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: Math.min(testimonial.rating, 5) }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name?.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} {t("comments.at")} {testimonial.company}
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