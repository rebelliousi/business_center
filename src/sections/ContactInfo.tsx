import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Music2 } from 'lucide-react';
import { useFooterData } from '../hooks/useFooter';

export default function ContactInfo() {
  const { data: footer, isLoading, error } = useFooterData();

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error || !footer) {
    return <div className="p-8 text-center text-red-500">Contact information could not be loaded.</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
      <div className="space-y-6">
        <motion.div
          whileHover={{ x: 8 }}
          className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md"
        >
          <div className="bg-blue-100 p-3 rounded-lg shrink-0">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Gmail</h4>
            <p className="text-gray-600">{footer.gmail}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 8 }}
          className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md"
        >
          <div className="bg-green-100 p-3 rounded-lg shrink-0">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
            <p className="text-gray-600">{footer.phone}</p>
            {footer.work_time && <p className="text-gray-600">{footer.work_time}</p>}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 8 }}
          className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md"
        >
          <div className="bg-orange-100 p-3 rounded-lg shrink-0">
            <MapPin className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Office</h4>
            <p className="text-gray-600">{footer.address}</p>
          </div>
        </motion.div>

        
      </div>
    </div>
  );
}