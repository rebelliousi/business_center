import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Calendar, ArrowRight, Sparkles, X } from 'lucide-react';
import { useDiscounts } from '../hooks/useDiscounts';
import { useTranslation, Trans } from "react-i18next";

// Çok dilli alanlar için yardımcı fonksiyon
function getTranslated(discount: any, field: string, lang: string) {
  return (
    discount?.[`${field}_${lang}`] ||
    discount?.[field] ||
    discount?.[`${field}_en`] ||
    ""
  );
}

// Tarihi güvenli şekilde formatlayan fonksiyon
function formatSafeDate(dateString: string, locale: string) {
  if (!dateString) return "";
  // DD.MM.YYYY tipi geldiyse çevir
  const parts = dateString.split(".");
  let isoDate = dateString;
  if (parts.length === 3) {
    isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  const dateObj = new Date(isoDate);
  return isNaN(dateObj.getTime()) ? "" : dateObj.toLocaleDateString(locale);
}

function DiscountCard({ discount, index, onLearnMore }: { discount: any; index: number; onLearnMore: (discount: any) => void }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const formattedDate = formatSafeDate(discount.valid_until, i18n.language);

  return (
    <motion.div
      className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-grid-white opacity-10"></div>

      {/* Mobile Layout */}
      <div className="md:hidden relative p-5">
        {/* Badge + Percentage Circle Combined at Top */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Tag className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{t('discounts.cardBadge')}</span>
          </motion.div>

          <motion.div
            className="relative flex-shrink-0"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-white leading-none">
                  {discount.discount_percentage ?? 50}%
                </div>
                <div className="text-[10px] text-blue-100 font-semibold">{t("discounts.off")}</div>
              </div>
            </div>
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 leading-tight">
            {getTranslated(discount, "title", lang)}
          </h3>
          <p className="text-blue-50 text-sm leading-relaxed line-clamp-2">
            {getTranslated(discount, "description", lang)}
          </p>
        </div>

        {/* Date + Button Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-blue-100 flex-1 min-w-0">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs truncate">
              {formattedDate}
            </span>
          </div>
          
          <motion.button
            className="flex items-center gap-1.5 bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors font-semibold text-sm flex-shrink-0"
            onClick={() => onLearnMore(discount)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('discounts.learnMore')}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid relative grid-cols-2 gap-8 p-8">
        <div className="flex flex-col justify-between">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full mb-4"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Tag className="w-4 h-4" />
              <span className="text-sm font-semibold">{t('discounts.cardBadge')}</span>
            </motion.div>

            <h3 className="text-3xl font-bold text-white mb-3">
              {getTranslated(discount, "title", lang)}
            </h3>

            <p className="text-blue-100 mb-6 text-lg">
              {getTranslated(discount, "description", lang)}
            </p>

            <div className="flex items-center gap-2 text-blue-100 mb-6">
              <Calendar className="w-5 h-5" />
              <span>
                {t('discounts.validUntil', { date: formattedDate })}
              </span>
            </div>
          </div>

          <motion.button
            className="flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors font-semibold"
            onClick={() => onLearnMore(discount)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('discounts.learnMore')}
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
                <div className="text-blue-100 text-lg font-semibold">{t("discounts.off")}</div>
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
        className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
}

function DiscountModal({ discount, onClose }: { discount: any, onClose: () => void }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const formattedDate = formatSafeDate(discount.valid_until, i18n.language);

  // Örnek rule ve ekstra info: (gerekirse veriden doldur)
  const rules = [
    t("discounts.ruleOne"),
    t("discounts.ruleTwo"),
    t("discounts.ruleThree"),
    // İstediğin kadar ekleyebilirsin veya discount objesinden alabilirsin.
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-300/40 via-blue-900/50 to-blue-500/70 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="relative z-10 bg-white rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          <button
            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="mb-3 sm:mb-5 pr-8">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-3">
              {getTranslated(discount, "title", lang)}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              {getTranslated(discount, "description", lang)}
            </p>
            <div className="text-blue-700 font-semibold text-lg mb-2">
              {discount.discount_percentage}% {t("discounts.off")}
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Calendar className="w-4 h-4" /> {t('discounts.validUntil', { date: formattedDate })}
            </div>
            <div className="mb-4">
              <div className="font-bold mb-2">{t("discounts.rulesTitle")}</div>
              <ul className="pl-4 list-disc space-y-1 text-sm text-gray-600">
                {rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Discounts() {
  const { data: discounts = [], isLoading: loading, error } = useDiscounts();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedDiscount, setSelectedDiscount] = useState<any | null>(null);

  // Kartlar 5 taneyse özel dizilim uygulanır
  const isFive = discounts.length === 5;

  return (
    <section id='discounts' className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">{t('discounts.badge')}</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            <Trans i18nKey="discounts.title">
              Special <span className="text-blue-600">Discounts</span>
            </Trans>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {t('discounts.subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
            <div className="mt-3 sm:mt-4 text-blue-600 font-semibold text-sm sm:text-base">{t('discounts.loading')}</div>
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12 text-red-500 text-sm sm:text-base">{t('discounts.error')}</div>
        ) : (
          <>
            {isFive ? (
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {discounts.slice(0, 2).map((discount: any, index: number) => (
                    <DiscountCard
                      key={discount.id}
                      discount={discount}
                      index={index}
                      onLearnMore={setSelectedDiscount}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {discounts.slice(2, 4).map((discount: any, index: number) => (
                    <DiscountCard
                      key={discount.id}
                      discount={discount}
                      index={index + 2}
                      onLearnMore={setSelectedDiscount}
                    />
                  ))}
                </div>
                <div className="flex justify-center">
                  <div className="w-full md:w-1/2 lg:w-1/3">
                    <DiscountCard
                      discount={discounts[4]}
                      index={4}
                      onLearnMore={setSelectedDiscount}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {discounts.map((discount: any, index: number) => (
                  <DiscountCard
                    key={discount.id}
                    discount={discount}
                    index={index}
                    onLearnMore={setSelectedDiscount}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {!loading && discounts.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl sm:rounded-2xl mx-4">
            <p className="text-gray-500 text-base sm:text-lg">{t('discounts.noActive')}</p>
          </div>
        )}

        <AnimatePresence>
          {selectedDiscount && (
            <DiscountModal
              discount={selectedDiscount}
              onClose={() => setSelectedDiscount(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}