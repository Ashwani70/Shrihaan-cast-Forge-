import React, { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronRight, Search, ArrowRight } from 'lucide-react';
import { DIVISIONS, getDivision, CATEGORIES, categoryCount } from '../data/products';
import { tractorPartsByDivision, visibleProducts } from '../data/tractorParts';
import { TractorCard } from './TractorParts';

export const DivisionCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" data-testid="division-cards">
    {DIVISIONS.map((d, i) => (
      <Link
        key={d.slug}
        to={`/products/${d.slug}`}
        data-testid={`division-card-${d.slug}`}
        className="group bg-white border border-slate-200 rounded-xl p-4 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-accent/40 hover:-translate-y-1"
      >
        <div className={`h-48 sm:h-52 w-full flex items-center justify-center mb-4 rounded-lg overflow-hidden border ${d.image ? 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200/50 border-slate-200/80 p-3' : 'blueprint-grid border-white/10'}`}>
          {d.image ? (
            <img
              src={d.image}
              alt={d.name}
              loading="eager"
              className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="font-heading font-extrabold text-4xl text-accent/80 tracking-tight">
              {d.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </span>
          )}
        </div>
        <span className="font-heading font-extrabold text-accent text-xs">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="font-heading font-bold text-primary text-base mt-1 group-hover:text-accent transition-colors duration-150">{d.heading || d.name}</h3>
        <p className="text-xs text-secondary mt-1.5 line-clamp-3 leading-relaxed flex-1">{d.description}</p>
        <span className="mt-4 text-[11px] font-bold uppercase tracking-wider text-accent inline-flex items-center gap-1 group-hover:gap-1.5 transition-all duration-150">
          View Range <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    ))}
  </div>
);

export default function DivisionPage({ onQuote }) {
  const { section } = useParams();
  const division = getDivision(section);
  const [query, setQuery] = useState('');

  const parts = useMemo(() => {
    if (!division || division.slug === 'scaffolding-parts') return [];
    const list = visibleProducts(tractorPartsByDivision(division.slug));
    const q = query.trim().toLowerCase();
    return q ? list.filter((p) => p.name.toLowerCase().includes(q)) : list;
  }, [division, query]);

  if (!division) return <Navigate to="/products" replace />;
  const title = division.heading || division.name;

  return (
    <div data-testid={`division-page-${division.slug}`}>
      <div className="bg-primary">
        <div className="container-x py-14">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-5" data-testid="breadcrumbs">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-accent">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-200">{title}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Product Division</span>
              <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">{title}</h1>
              <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">{division.description}</p>
            </div>
            {division.image && (
              <div className="hidden md:flex w-64 h-44 bg-white/5 border border-white/10 items-center justify-center p-4 shrink-0 rounded-lg">
                <img src={division.image} alt={title} className="max-h-full max-w-full object-contain filter drop-shadow-md" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-x">
          {division.slug === 'scaffolding-parts' ? (
            <>
              <p className="text-xs uppercase tracking-wider text-secondary mb-5">{CATEGORIES.length} product categories</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" data-testid="scaffolding-categories">
                {CATEGORIES.map((c, i) => (
                  <Link
                    key={c.slug}
                    to={`/products/${c.slug}`}
                    data-testid={`scaf-cat-${c.slug}`}
                    className="group relative bg-white border border-slate-200 rounded-xl p-5 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="absolute top-4 right-5 font-heading font-extrabold text-3xl text-slate-100 group-hover:text-accent/20 transition-colors duration-300 select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="bg-gradient-to-b from-slate-50 to-slate-100 h-44 flex items-center justify-center mb-4 rounded-lg overflow-hidden border border-slate-200/80 p-3">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-primary group-hover:text-accent transition-colors duration-150">{c.name}</h3>
                    <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-secondary group-hover:text-accent inline-flex items-center gap-1 transition-colors duration-150">
                      {categoryCount(c.slug)} Products <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="bg-white border border-border p-4 mb-8 flex" data-testid="division-toolbar">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    data-testid="division-search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${title.toLowerCase()}…`}
                    className="w-full border border-input pl-9 pr-3 py-2.5 text-sm rounded-sm outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent"
                  />
                </div>
              </div>
              <p className="text-xs uppercase tracking-wider text-secondary mb-5" data-testid="division-results-count">
                Showing {parts.length} product{parts.length === 1 ? '' : 's'}
              </p>
              {parts.length === 0 ? (
                <div className="bg-white border border-border p-14 text-center" data-testid="division-no-results">
                  <p className="font-heading font-bold text-primary text-lg">No products found</p>
                  <p className="text-sm text-secondary mt-2">Try a different search term, or request a quote for your requirement.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch" data-testid="division-grid">
                  {parts.map((p, i) => (
                    <TractorCard key={p.slug} product={p} onQuote={onQuote} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
