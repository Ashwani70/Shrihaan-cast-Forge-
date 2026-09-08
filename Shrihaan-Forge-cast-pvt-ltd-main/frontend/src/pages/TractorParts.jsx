import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, FileText } from 'lucide-react';
import { TRACTOR_PARTS, visibleProducts } from '../data/tractorParts';

export const TractorCard = ({ product, onQuote, index = 0 }) => (
  <motion.div
    data-testid={`tractor-card-${product.slug}`}
    className="group bg-card border border-border flex flex-col h-full transition-shadow duration-300 hover:shadow-xl"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay: Math.min(index, 12) * 0.04, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4 }}
  >
    {product.hasImage && (
      <Link to={`/tractor-parts/${product.slug}`} data-testid={`tractor-image-link-${product.slug}`} className="block bg-white border-b border-border relative">
        <div className="product-image-container p-2.5">
          <img
            src={product.images[0]}
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
    )}
    <div className="p-4 flex flex-col flex-1">
      <div className="flex items-center gap-2.5">
        {!product.hasImage && (
          <span className="w-9 h-9 shrink-0 blueprint-grid border border-white/10 flex items-center justify-center font-heading font-extrabold text-sm text-accent">
            {product.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </span>
        )}
        <div className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-accent">Forging Component</span>
          <Link to={`/tractor-parts/${product.slug}`} data-testid={`tractor-name-link-${product.slug}`}>
            <h3 className="font-heading font-bold text-base text-primary mt-0.5 leading-snug group-hover:text-accent transition-colors duration-150">
              {product.name}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-1.5 mt-auto">
        <Link
          to={`/tractor-parts/${product.slug}`}
          data-testid={`tractor-view-${product.slug}`}
          className="inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wide border border-primary text-primary px-2 py-2 rounded-sm transition-colors duration-150 hover:bg-primary hover:text-white"
        >
          <FileText className="w-3 h-3" /> View Details
        </Link>
        <button
          data-testid={`tractor-quote-${product.slug}`}
          onClick={() => onQuote({ name: product.name, itemCode: product.itemCode })}
          className="text-[10px] font-bold uppercase tracking-wide bg-accent text-accent-foreground px-2 py-2 rounded-sm transition-colors duration-150 hover:bg-accent/90"
        >
          Request Quote
        </button>
      </div>
    </div>
  </motion.div>
);

export default function TractorParts({ onQuote }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const list = visibleProducts(TRACTOR_PARTS);
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div data-testid="tractor-parts-page">
      <div className="bg-primary">
        <div className="container-x py-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Tractor Parts</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">Forging Components for Tractors &amp; Agricultural Equipment</h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-2xl">
            Precision-forged components — high strength, durable and reliable. Search the range below or request a quote for any part.
          </p>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-x">
          <div className="bg-white border border-border p-4 mb-8 flex" data-testid="tractor-toolbar">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                data-testid="tractor-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tractor parts…"
                className="w-full border border-input pl-9 pr-3 py-2.5 text-sm rounded-sm outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent"
              />
            </div>
          </div>
          <p className="text-xs uppercase tracking-wider text-secondary mb-5" data-testid="tractor-results-count">
            Showing {filtered.length} product{filtered.length === 1 ? '' : 's'}
          </p>
          {filtered.length === 0 ? (
            <div className="bg-white border border-border p-14 text-center" data-testid="tractor-no-results">
              <p className="font-heading font-bold text-primary text-lg">No products found</p>
              <p className="text-sm text-secondary mt-2">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch" data-testid="tractor-grid">
              {filtered.map((p, i) => (
                <TractorCard key={p.slug} product={p} onQuote={onQuote} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
