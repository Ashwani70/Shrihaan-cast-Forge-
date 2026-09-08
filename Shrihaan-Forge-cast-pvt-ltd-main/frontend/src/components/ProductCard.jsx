import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { getCategory } from '../data/products';

export const ProductCard = ({ product, onQuote, index = 0 }) => {
  const cat = getCategory(product.category);
  const base = `/products/${product.category}/${product.slug}`;
  return (
    <motion.div
      data-testid={`product-card-${product.slug}`}
      className="group bg-card border border-border flex flex-col h-full transition-shadow duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 12) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link to={base} data-testid={`product-image-link-${product.slug}`} className="block bg-white border-b border-border relative">
        <div className="product-image-container p-2.5">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{
              opacity: 1,
              filter: 'none',
              mixBlendMode: 'normal',
              visibility: 'visible',
              display: 'block',
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
            className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105 relative z-10"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">{cat?.name}</span>
        <Link to={base} data-testid={`product-name-link-${product.slug}`}>
          <h3 className="font-heading font-bold text-base text-primary mt-1 leading-snug group-hover:text-accent transition-colors duration-150">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-secondary mt-1.5 line-clamp-2">{product.description}</p>
        <p className="text-xs mt-2 font-mono text-slate-500" data-testid={`product-code-${product.slug}`}>
          Item Code: <span className="font-semibold text-foreground">{product.itemCode}</span>
        </p>
        <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-1.5 mt-auto">
          <Link
            to={base}
            data-testid={`view-product-${product.slug}`}
            className="inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wide border border-primary text-primary px-2 py-2 rounded-sm transition-colors duration-150 hover:bg-primary hover:text-white"
          >
            <FileText className="w-3 h-3" /> View Details
          </Link>
          <button
            data-testid={`quote-product-${product.slug}`}
            onClick={() => onQuote(product)}
            className="text-[10px] font-bold uppercase tracking-wide bg-accent text-accent-foreground px-2 py-2 rounded-sm transition-colors duration-150 hover:bg-accent/90"
          >
            Request Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
};
