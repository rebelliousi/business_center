import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useFooterData } from '../hooks/useFooter';
import { useTranslation } from 'react-i18next';

// Çok dilli alanları aktif dile göre döndürür
function getTranslated(obj: any, field: string, lang: string) {
  return (
    obj?.[`${field}_${lang}`] ||
    obj?.[field] ||
    obj?.[`${field}_en`] ||
    ""
  );
}

export default function ContactInfo() {
  const { data: footer, isLoading, error } = useFooterData();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  if (isLoading) {
    return (
      <div className="p-6 sm:p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-3 text-gray-600 text-sm sm:text-base">Loading...</p>
      </div>
    );
  }
  if (error || !footer) {
    return (
      <div className="p-6 sm:p-8 text-center text-red-500 text-sm sm:text-base">
        Contact information could not be loaded.
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        {getTranslated(footer, "name", lang) || "Contact Information"}
      </h3>
      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {/* Gmail Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ x: 8 }}
          className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="bg-blue-100 p-2 sm:p-2.5 md:p-3 rounded-lg shrink-0">
            <Mail className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">
              Gmail
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base break-all">
              {footer.gmail}
            </p>
          </div>
        </motion.div>

        {/* Phone Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ x: 8 }}
          className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="bg-green-100 p-2 sm:p-2.5 md:p-3 rounded-lg shrink-0">
            <Phone className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">
              Phone
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {footer.phone}
            </p>
            {getTranslated(footer, "work_time", lang) && (
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {getTranslated(footer, "work_time", lang)}
              </p>
            )}
          </div>
        </motion.div>

        {/* Office Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ x: 8 }}
          className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="bg-orange-100 p-2 sm:p-2.5 md:p-3 rounded-lg shrink-0">
            <MapPin className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">
              Office
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
              {getTranslated(footer, "address", lang)}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}