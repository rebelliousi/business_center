import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useSendForm } from '../hooks/useSendForm';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import ContactInfo from './ContactInfo';
import { useTranslation, Trans } from "react-i18next";

export default function Contact() {
  const [formData, setFormData] = useState({
    username: '',
    gmail: '',
    comment: '',
  });

  // Modal için state
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyData, setVerifyData] = useState({ gmail: '', verification_code: '' });

  const { t } = useTranslation();

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
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <Trans i18nKey="contact.title">
              Get In <span className="text-blue-600">Touch</span>
            </Trans>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("contact.sendMessage")}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder={t("contact.name")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gmail" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.gmail")}
                  </label>
                  <input
                    type="email"
                    id="gmail"
                    name="gmail"
                    value={formData.gmail}
                    onChange={handleChange}
                    placeholder={t("contact.gmail")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.comment")}
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t("contact.comment")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    required
                  />
                </div>

                {isSuccess && (
                  <div className="text-blue-600 font-semibold">
                    {t("contact.sent")}
                  </div>
                )}
                {isError && (
                  <div className="text-red-600 font-semibold">
                    {typeof error === 'object' && error !== null && 'message' in error
                      ? (error as any).message
                      : t("contact.error")}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-60"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full" />
                  ) : (
                    <>
                      {t("contact.send")}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="space-y-6">
                <motion.div>
                  <ContactInfo />
                </motion.div>
              </div>
            </div>

            {/* Illustration (remains the same) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* ... SVG ... */}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close"
            >×</button>
            <div className="flex flex-col items-center gap-2 mb-6">
              <ShieldCheck className="w-10 h-10 text-blue-600" />
              <h3 className="text-2xl font-bold">{t("contact.verifyTitle")}</h3>
              <p className="text-gray-600 text-center text-sm">
                {t("contact.verifyPrompt")}
              </p>
            </div>
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label htmlFor="gmail" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("contact.gmail")}
                </label>
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  value={verifyData.gmail}
                  onChange={handleVerifyChange}
                  placeholder={t("contact.gmail")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="verification_code" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("contact.code")}
                </label>
                <input
                  type="text"
                  id="verification_code"
                  name="verification_code"
                  value={verifyData.verification_code}
                  onChange={handleVerifyChange}
                  placeholder={t("contact.code")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
              {isVerifySuccess && (
                <div className="text-green-600 font-semibold">
                  {t("contact.verifySuccess")}
                </div>
              )}
              {isVerifyError && (
                <div className="text-red-600 font-semibold">
                  {typeof verifyError === 'object' && verifyError !== null && 'message' in verifyError
                    ? (verifyError as any).message
                    : t("contact.verifyError")}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-60"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full" />
                ) : (
                  <>
                    {t("contact.verify")}
                    <ShieldCheck className="w-5 h-5" />
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