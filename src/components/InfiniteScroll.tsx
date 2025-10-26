import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Jennifer Adams',
    role: 'Marketing Director',
    company: 'TechCorp',
    text: 'The marketing courses completely transformed how I approach digital strategy. Highly recommended!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Entrepreneur',
    company: 'StartupHub',
    text: 'Outstanding instructors and practical content. This platform helped me scale my business.',
    rating: 5
  },
  {
    name: 'Sarah Williams',
    role: 'Finance Manager',
    company: 'Global Finance',
    text: 'The financial planning course gave me the tools to make better investment decisions.',
    rating: 5
  },
  {
    name: 'David Thompson',
    role: 'Team Leader',
    company: 'Innovation Labs',
    text: 'Leadership training that actually works. My team performance has improved dramatically.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Operations Manager',
    company: 'LogiTech',
    text: 'The operations course helped me streamline processes and save thousands in costs.',
    rating: 5
  },
  {
    name: 'James Wilson',
    role: 'Business Analyst',
    company: 'DataPro',
    text: 'Excellent analytics training. I can now make data-driven decisions with confidence.',
    rating: 5
  }
];

export function InfiniteScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

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
  }, []);

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied professionals who have transformed their careers
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>

          <div className="h-[600px] overflow-hidden">
            <div ref={scrollRef} className="space-y-6">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-blue-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
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