import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, categoryCount } from '../data/products';
import { ProductBrowser } from './Products';

export default function Catalogue({ onQuote }) {
  return (
    <div data-testid="catalogue-page">
      <div className="bg-primary">
        <div className="container-x py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Catalogue</span>
            <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">Product Catalogue</h1>
            <p className="mt-3 text-slate-300 max-w-2xl text-sm md:text-base">
              The complete SHRIHAAN CAST &amp; FORGE range — browse by category or search by item code.
            </p>
          </div>
        </div>
      </div>

      <div className="container-x py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px bg-border border border-border" data-testid="catalogue-categories">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/products/${c.slug}`}
              data-testid={`catalogue-cat-${c.slug}`}
              className="group bg-white p-4 flex flex-col items-center text-center transition-colors duration-200 hover:bg-slate-50"
            >
              <div className="h-20 flex items-center justify-center mb-3 overflow-hidden">
                <img src={c.image} alt={c.name} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
              <span className="text-xs font-bold text-primary group-hover:text-accent leading-tight transition-colors duration-150">{c.name}</span>
              <span className="mt-1 text-[10px] uppercase tracking-wider text-slate-400 inline-flex items-center gap-1">
                {categoryCount(c.slug)} items <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container-x pb-16 md:pb-24">
        <ProductBrowser onQuote={onQuote} />
      </div>
    </div>
  );
}
