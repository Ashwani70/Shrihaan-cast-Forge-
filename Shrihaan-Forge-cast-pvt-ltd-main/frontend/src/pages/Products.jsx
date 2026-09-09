import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES, PRODUCTS, visibleScaffolding } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { DivisionCards } from './DivisionPage';
import { SEO, DOMAIN } from '../components/SEO';

export const ProductBrowser = ({ onQuote, fixedCategory = null, title = 'Product Catalogue', kicker = 'All Products' }) => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const category = fixedCategory || params.get('category') || '';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return visibleScaffolding(PRODUCTS).filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      const specs = Object.entries(p.specs || {}).map(([k, v]) => `${k} ${v}`).join(' ');
      const variants = (p.variants || []).flat().join(' ');
      return `${p.name} ${p.itemCode} ${p.description} ${specs} ${variants}`.toLowerCase().includes(q);
    });
  }, [query, category]);

  return (
    <div>
      <div className="bg-white border border-border p-4 mb-8 flex flex-col md:flex-row gap-3" data-testid="catalogue-toolbar">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            data-testid="product-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product name or item code…"
            className="w-full border border-input pl-9 pr-3 py-2.5 text-sm rounded-sm outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent"
          />
        </div>
        {!fixedCategory && (
          <select
            data-testid="category-filter-select"
            value={category}
            onChange={(e) => setParams(e.target.value ? { category: e.target.value } : {})}
            className="border border-input px-3 py-2.5 text-sm rounded-sm bg-white outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent md:w-72"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      <p className="text-xs uppercase tracking-wider text-secondary mb-5" data-testid="results-count">
        Showing {filtered.length} product{filtered.length === 1 ? '' : 's'}
      </p>

      {filtered.length === 0 ? (
        <div className="bg-white border border-border p-14 text-center" data-testid="no-results">
          <p className="font-heading font-bold text-primary text-lg">No products found</p>
          <p className="text-sm text-secondary mt-2">Try a different search term or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch" data-testid="product-grid">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} onQuote={onQuote} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Products({ onQuote }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${DOMAIN}/products#webpage`,
    url: `${DOMAIN}/products`,
    name: 'Forged Components & Industrial Forgings | Shrihaan Cast & Forge',
    description:
      'Explore precision forged components, steel forgings, scaffolding systems, and tractor parts manufactured by Shrihaan Cast & Forge Pvt. Ltd. India.',
  };

  return (
    <div data-testid="products-page" className="section-pad">
      <SEO
        title="Forged Components & Industrial Forgings | Shrihaan Cast & Forge"
        description="Comprehensive product range of precision steel forgings, industrial components, Ringlock, Cuplock scaffolding systems, steel props, drop forged couplers, and tractor agricultural parts manufactured by Shrihaan Cast & Forge Pvt. Ltd."
        keywords="Forged Components, Industrial Forgings, Steel Forgings Manufacturer, Scaffolding Systems, Ringlock System, Cuplock System, Steel Props, Drop Forged Couplers, Agricultural Tractor Parts"
        canonical="/products"
        schema={schema}
      />

      <div className="container-x">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Products</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-primary">Our Product Range</h1>
          <p className="mt-3 text-secondary text-sm md:text-base max-w-2xl">
            Five product divisions — forging parts, tractor linkage, agriculture parts, auto parts and scaffolding systems. Choose a division to explore its products.
          </p>
        </div>
        <DivisionCards />
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="font-heading font-extrabold text-2xl text-primary">Scaffolding Parts Catalogue</h2>
            <p className="mt-2 text-secondary text-sm max-w-2xl">
              Search the complete scaffolding and shoring range by product name, item code or specification.
            </p>
          </div>
          <ProductBrowser onQuote={onQuote} />
        </div>
      </div>
    </div>
  );
}
