import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';

export function FloatingWhatsApp() {
  return (
    <motion.button
      onClick={() => openWhatsApp()}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/40 hover:scale-110 transition-all"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </motion.button>
  );
}
