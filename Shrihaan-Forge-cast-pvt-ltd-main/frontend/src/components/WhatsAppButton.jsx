import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct } from '../data/products';

const NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER;

export const WhatsAppButton = () => {
  const { pathname } = useLocation();

  const href = useMemo(() => {
    let text = 'Hello SHRIHAAN CAST & FORGE, I would like to discuss a product requirement.';
    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] === 'products' && parts.length === 3) {
      const p = getProduct(parts[2]);
      if (p) text = `Hello SHRIHAAN CAST & FORGE, I am interested in ${p.name} (Item Code: ${p.itemCode}). Please share pricing and availability.`;
    }
    return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
  }, [pathname]);

  if (!NUMBER) return null;

  return (
    <motion.a
      data-testid="whatsapp-chat-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[90] group"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-primary text-white text-xs font-semibold px-3 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with our sales team
      </span>
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.186 8.186 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" />
        </svg>
      </span>
    </motion.a>
  );
};
