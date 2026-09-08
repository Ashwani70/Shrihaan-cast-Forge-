import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getCategory } from '../data/products';
import { ProductBrowser } from './Products';

export default function CategoryPage({ onQuote }) {
  const { section } = useParams();
  const cat = getCategory(section);
  if (!cat) return <Navigate to="/products" replace />;

  return (
    <div data-testid={`category-page-${cat.slug}`}>
      <div className="bg-primary">
        <div className="container-x py-14">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-5" data-testid="breadcrumbs">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-accent">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-200">{cat.name}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Product Category</span>
              <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">{cat.name}</h1>
              <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">{cat.description}</p>
            </div>
            <div className="hidden md:flex w-64 h-44 bg-white/5 border border-white/10 items-center justify-center p-4 shrink-0">
              <img src={cat.image} alt={cat.name} className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </div>
      </div>
      <div className="section-pad">
        <div className="container-x">
          <ProductBrowser onQuote={onQuote} fixedCategory={cat.slug} />
        </div>
      </div>
    </div>
  );
}
