import { motion } from 'framer-motion';
import { Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useSendForm } from '../hooks/useSendForm';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import ContactInfo from './ContactInfo';
import { useTranslation, Trans } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    gmail: '',
    comment: '',
  });

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyData, setVerifyData] = useState({ gmail: '', verification_code: '' });

  const { mutate, isPending, isSuccess, isError, error, reset } = useSendForm();
  const {
    mutate: verifyMutate,
    isPending: isVerifying,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
    reset: verifyReset,
  } = useVerifyEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        setFormData({ username: '', gmail: '', comment: '' });
        setVerifyData({ gmail: formData.gmail, verification_code: '' });
        setShowVerifyModal(true);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (isSuccess || isError) reset();
  };

  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyData({
      ...verifyData,
      [e.target.name]: e.target.value,
    });
    if (isVerifySuccess || isVerifyError) verifyReset();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    verifyMutate(verifyData);
  };

  const closeModal = () => {
    setShowVerifyModal(false);
    verifyReset();
    setVerifyData({ gmail: '', verification_code: '' });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            <Trans i18nKey="contact.title">
              Get In <span className="text-blue-600">Touch</span>
            </Trans>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("contact.sendMessage")}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <label htmlFor="username" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder={t("contact.name")}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gmail" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    {t("contact.gmail")}
                  </label>
                  <input
                    type="email"
                    id="gmail"
                    name="gmail"
                    value={formData.gmail}
                    onChange={handleChange}
                    placeholder={t("contact.gmail")}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comment" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    {t("contact.comment")}
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t("contact.comment")}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm sm:text-base"
                    required
                  />
                </div>
                {isSuccess && (
                  <div className="text-blue-600 font-semibold text-sm sm:text-base">
                    {t("contact.sent")}
                  </div>
                )}
                {isError && (
                  <div className="text-red-600 font-semibold text-sm sm:text-base">
                    {typeof error === 'object' && error !== null && 'message' in error
                      ? (error as any).message
                      : t("contact.error")}
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-60 text-sm sm:text-base"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white rounded-full" />
                  ) : (
                    <>
                      {t("contact.send")}
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Section - Contact Info & Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <div className="space-y-4 sm:space-y-6">
                <motion.div>
                  <ContactInfo />
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* SVG - Always visible with responsive sizing */}
              <svg viewBox="0 0 400 300" className="w-full h-auto max-w-sm sm:max-w-md md:max-w-full mx-auto">
                <defs>
                  <linearGradient id="contact-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect width="400" height="300" fill="#eff6ff" rx="16" />
                <circle cx="200" cy="150" r="100" fill="url(#contact-grad)" opacity="0.1" />
                <circle cx="200" cy="150" r="70" fill="url(#contact-grad)" opacity="0.2" />
                <motion.g
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <rect x="120" y="90" width="160" height="120" rx="12" fill="url(#contact-grad)" />
                  <rect x="135" y="105" width="130" height="70" rx="8" fill="white" opacity="0.3" />
                  <line x1="145" y1="130" x2="245" y2="130" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <line x1="145" y1="145" x2="225" y2="145" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <line x1="145" y1="160" x2="235" y2="160" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="200" cy="190" r="8" fill="white" />
                </motion.g>
                <motion.circle
                  cx="80"
                  cy="80"
                  r="25"
                  fill="#10b981"
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <path d="M 70 80 L 77 87 L 90 72" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <motion.circle
                  cx="320"
                  cy="220"
                  r="25"
                  fill="#f59e0b"
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
                <rect x="310" y="212" width="20" height="16" rx="2" fill="white" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Verify Modal - Mobile Optimized */}
      {showVerifyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 max-w-md w-full relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 sm:right-4 text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl font-bold"
              aria-label="Close"
            >×</button>
            
            <div className="flex flex-col items-center gap-2 mb-5 sm:mb-6">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              <h3 className="text-xl sm:text-2xl font-bold text-center">{t("contact.verifyTitle")}</h3>
              <p className="text-gray-600 text-center text-xs sm:text-sm">
                {t("contact.verifyPrompt")}
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="modal-gmail" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  {t("contact.gmail")}
                </label>
                <input
                  type="email"
                  id="modal-gmail"
                  name="gmail"
                  value={verifyData.gmail}
                  onChange={handleVerifyChange}
                  placeholder={t("contact.gmail")}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="verification_code" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  {t("contact.code")}
                </label>
                <input
                  type="text"
                  id="verification_code"
                  name="verification_code"
                  value={verifyData.verification_code}
                  onChange={handleVerifyChange}
                  placeholder={t("contact.code")}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base"
                  required
                />
              </div>
              {isVerifySuccess && (
                <div className="text-green-600 font-semibold text-sm sm:text-base">
                  {t("contact.verifySuccess")}
                </div>
              )}
              {isVerifyError && (
                <div className="text-red-600 font-semibold text-sm sm:text-base">
                  {typeof verifyError === 'object' && verifyError !== null && 'message' in verifyError
                    ? (verifyError as any).message
                    : t("contact.verifyError")}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-60 text-sm sm:text-base"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <span className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white rounded-full" />
                ) : (
                  <>
                    {t("contact.verify")}
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}