import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { useRateCourse } from '../hooks/useRateCourse';
import { useTranslation } from 'react-i18next';
import { colorClasses } from '../components/colorClasses';

type UserRatingInfo = {
  rating: number;
  created_at: string;
};

export interface SmartCourseRatingBarProps {
  courseId: number | string;
  ratingData?: {
    average_rating: number;
    rating_count: number;
  };
  compact?: boolean;
  color?: keyof typeof colorClasses;
}

export const SmartCourseRatingBar: React.FC<SmartCourseRatingBarProps> = ({
  courseId,
  ratingData,
  compact = false,
  color = "blue"
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<UserRatingInfo | null>(null);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = colorClasses[color] || colorClasses.blue;
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkIsMobile = () =>
      typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
    setIsMobileDevice(checkIsMobile());
    const cb = () => setIsMobileDevice(checkIsMobile());
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
  }, []);

  const averageRating = ratingData?.average_rating ?? 0;
  const totalVotes = ratingData?.rating_count ?? 0;

  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const rateCourse = useRateCourse();

  useEffect(() => {
    const savedRating = localStorage.getItem(`course_rating_${courseId}`);
    if (savedRating) {
      setUserRating(JSON.parse(savedRating));
    }
  }, [courseId]);

  const openTooltip = () => setShowInfoTooltip(true);
  const closeTooltip = () => setShowInfoTooltip(false);

  // Stars
  const renderStars = () => {
    const displayRating = hoveredRating ?? (userRating ? userRating.rating : 0);
    const isInteractive = !userRating && !isSubmitting;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <motion.button
            key={i}
            disabled={!isInteractive}
            aria-label={t("courses.rate_star", { count: i })}
            onClick={() => isInteractive && handleStarClick(i)}
            onMouseEnter={isInteractive ? () => setHoveredRating(i) : undefined}
            onMouseLeave={isInteractive ? () => setHoveredRating(null) : undefined}
            className={`
              relative
              ${isInteractive ? 'cursor-pointer' : 'cursor-default'}
              transition-all duration-200
              ${compact ? 'text-sm' : 'text-base'}
              ${i <= Math.round(displayRating)
                ? colors.text + ' drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]'
                : 'text-gray-300'
              }
              ${isInteractive && !userRating ? 'hover:' + colors.text : ''}
            `}
            whileHover={isInteractive ? { scale: 1.15 } : undefined}
            whileTap={isInteractive ? { scale: 0.95 } : undefined}
          >
            ★
          </motion.button>
        ))}
      </div>
    );
  };

  const handleStarClick = async (rating: number) => {
    if (userRating || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await rateCourse.mutateAsync({ course: Number(courseId), rating });
      // NOT: Multi-rating güncellenmesi için parentda hook refetch edilebilir!
    } catch (e) { }
    const ratingInfo: UserRatingInfo = {
      rating,
      created_at: new Date().toISOString()
    };
    localStorage.setItem(`course_rating_${courseId}`, JSON.stringify(ratingInfo));
    setUserRating(ratingInfo);
    setIsSubmitting(false);
  };

  // Tooltip
  const InfoTooltip = () =>
    <motion.div
      initial={{ opacity: 0, y: 5, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`absolute bottom-full mb-2 z-50 w-max max-w-[160px] right-0 ${isMobileDevice ? 'translate-x-8 left-2' : ''}`}
      onMouseEnter={() => !isMobileDevice && openTooltip()}
      onMouseLeave={() => !isMobileDevice && closeTooltip()}
    >
      <div className={`backdrop-blur-lg border ${colors.text}/60 bg-white/95 ${colors.text} text-xs px-3 py-2 rounded-xl shadow-xl relative`}>
        <div className="flex flex-col items-center space-y-2">
          <div className={`${colors.text} font-semibold text-xs`}>
            {t('courses.your_rating')}
          </div>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map(i => (
              <span
                key={i}
                className={`text-base ${
                  i <= userRating!.rating
                    ? colors.text + ' drop-shadow'
                    : 'text-gray-400'
                }`}
              >
                ★
              </span>
            ))}
            <span className={`ml-2 font-bold text-sm ${colors.bg} text-${color} px-2 py-1 rounded`}>
              {userRating!.rating}/5
            </span>
          </div>
          <div className="text-gray-600 text-[11px] text-center leading-tight pt-1 border-t border-gray-200 w-full">
            {t("courses.rating_date", {
              date: new Date(userRating!.created_at)
                .toLocaleDateString(lang, { month: 'short', day: 'numeric', year: 'numeric' })
            })}
          </div>
        </div>
        <div className="absolute top-full left-4 transform -translate-x-1/2 border-4 border-transparent border-t-white/95"></div>
      </div>
    </motion.div>;

  useEffect(() => {
    if (!showInfoTooltip || !isMobileDevice) return;
    const close = (e: TouchEvent | MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.info-tooltip-trigger') && !target.closest('.info-tooltip-content')) {
        setShowInfoTooltip(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, [showInfoTooltip, isMobileDevice]);

  if (compact) {
    return (
      <div className="relative inline-flex items-center gap-2">
        {renderStars()}
        <div className="flex items-center gap-1">
          <span className={`flex items-center gap-1 text-xs font-bold ${colors.text}`}>
            {averageRating.toFixed(1)}
            <span className={`${colors.text} font-semibold text-[11px]`}>
              ({totalVotes})
            </span>
          </span>
          {userRating && (
            <div className="relative">
              <motion.button
                className="info-tooltip-trigger text-gray-500 hover:text-gray-400 transition-all duration-200 p-1 rounded-full hover:bg-gray-100"
                onMouseEnter={() => !isMobileDevice && openTooltip()}
                onMouseLeave={() => !isMobileDevice && closeTooltip()}
                onClick={e => isMobileDevice && setShowInfoTooltip(prev => !prev)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={-1}
              >
                <Info size={14} />
              </motion.button>
              <AnimatePresence>
                {showInfoTooltip && (
                  <div className="info-tooltip-content">
                    <InfoTooltip />
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        {!userRating && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-[10px] font-semibold px-2 py-1 rounded-full ${colors.bg} ${colors.text} border border-gray-200`}
          >
            {t("courses.rate")}
          </motion.span>
        )}
        {rateCourse.isError && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-[10px] font-medium"
          >
            {t("courses.error")}
          </motion.span>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-3">
      {renderStars()}
      <div className="flex items-center gap-2">
        <span className="flex flex-col items-start justify-center">
          <span className={`flex items-center gap-1 text-base font-bold ${colors.text}`}>
            {averageRating.toFixed(1)}
            <span className={`${colors.text} font-semibold text-sm`}>
              ({totalVotes})
            </span>
          </span>
        </span>
        {userRating && (
          <div className="relative">
            <motion.button
              className="info-tooltip-trigger text-gray-500 hover:text-gray-400 transition-all duration-200 p-1 rounded-full hover:bg-gray-100"
              onMouseEnter={() => !isMobileDevice && openTooltip()}
              onMouseLeave={() => !isMobileDevice && closeTooltip()}
              onClick={e => isMobileDevice && setShowInfoTooltip(prev => !prev)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              tabIndex={-1}
            >
              <Info size={16} />
            </motion.button>
            <AnimatePresence>
              {showInfoTooltip && (
                <div className="info-tooltip-content">
                  <InfoTooltip />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      {!userRating && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${colors.bg} ${colors.text} border border-gray-200`}
        >
          {t("courses.rate")}
        </motion.span>
      )}
      {rateCourse.isError && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-xs font-medium"
        >
          {t("courses.error")}
        </motion.span>
      )}
    </div>
  );
};

export default SmartCourseRatingBar;