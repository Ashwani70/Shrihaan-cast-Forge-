import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { ChevronRight, Maximize2, Mail } from 'lucide-react';
import { getCategory, getProduct, productsByCategory, isCompleteScaffolding, visibleScaffolding, AOR } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ImageLightbox } from '../components/ImageLightbox';

export default function ProductDetail({ onQuote }) {
  const { categorySlug, productSlug } = useParams();
  const location = useLocation();
  const product = getProduct(productSlug);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const gallery = useMemo(() => {
    if (!product) return [];
    return product.gallery || [product.image];
  }, [product]);

  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 900);
      return () => clearTimeout(t);
    }
  }, [location.hash, productSlug]);

  if (!product || product.category !== categorySlug) return <Navigate to="/products" replace />;
  if (!isCompleteScaffolding(product)) {
    return (
      <div className="section-pad" data-testid="product-not-available">
        <div className="container-x max-w-lg text-center py-16">
          <h1 className="font-heading font-extrabold text-3xl text-primary">Product Not Available</h1>
          <p className="mt-3 text-secondary text-sm">This product is not currently available in our catalogue. Please browse our complete product range or request a quote for your requirement.</p>
          <Link
            to="/products"
            data-testid="back-to-products-btn"
            className="mt-8 inline-block bg-primary text-white font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-colors duration-200 hover:bg-accent"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  const cat = getCategory(product.category);
  const related = visibleScaffolding(productsByCategory(product.category).filter((p) => p.slug !== product.slug)).slice(0, 4);
  const hasSpecs = Object.keys(product.specs || {}).length > 0;

  return (
    <div data-testid={`product-detail-${product.slug}`}>
      <div className="bg-white border-b border-border">
        <div className="container-x py-4">
          <nav className="flex items-center gap-1.5 text-xs text-secondary flex-wrap" data-testid="breadcrumbs">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-accent">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/products/${cat.slug}`} className="hover:text-accent">{cat.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          {/* Photo gallery */}
          <div className="scroll-mt-24">
            <button
              data-testid="product-main-image"
              onClick={() => setLightbox(active)}
              className="relative w-full bg-white border border-border aspect-[4/3] flex items-center justify-center p-6 group cursor-zoom-in"
            >
              <img
                src={gallery[active]}
                alt={product.name}
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
                  objectFit: 'contain'
                }}
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute bottom-3 right-3 bg-primary/80 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Maximize2 className="w-4 h-4" />
              </span>
            </button>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-6 gap-2" data-testid="product-thumbnails">
                {gallery.map((g, i) => (
                  <button
                    key={g}
                    data-testid={`thumbnail-${i}`}
                    onClick={() => setActive(i)}
                    className={`bg-white border aspect-square flex items-center justify-center p-1.5 transition-colors duration-150 ${i === active ? 'border-accent' : 'border-border hover:border-secondary'}`}
                  >
                    <img src={g} alt={`${product.name} ${i + 1}`} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-3 text-xs text-slate-400">Click the image to open the full-screen viewer with zoom.</p>
          </div>

          {/* Details */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{cat.name}</span>
            <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-primary" data-testid="product-title">{product.name}</h1>
            <p className="mt-2 text-sm font-mono text-secondary" data-testid="product-item-code">
              Item Code: <span className="font-semibold text-foreground">{product.itemCode || AOR}</span>
            </p>
            <p className="mt-5 text-secondary text-sm md:text-base leading-relaxed">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                data-testid="detail-request-quote-btn"
                onClick={() => onQuote(product)}
                className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md"
              >
                Request a Quote
              </button>
              <button
                data-testid="detail-send-enquiry-btn"
                onClick={() => onQuote(product)}
                className="inline-flex items-center gap-2 border border-primary text-primary font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                <Mail className="w-4 h-4" /> Send Enquiry
              </button>
            </div>

            {/* Specifications */}
            <div className="mt-10" id="specs">
              <h2 className="font-heading font-bold text-lg text-primary mb-4">Technical Specifications</h2>
              <table className="spec-table w-full bg-white" data-testid="specs-table">
                <thead>
                  <tr><th className="w-1/3">Specification</th><th>Details</th></tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold">Item Code</td><td>{product.itemCode || AOR}</td></tr>
                  <tr><td className="font-semibold">Category</td><td>{cat.name}</td></tr>
                  {Object.entries(product.specs || {}).map(([k, v]) => (
                    <tr key={k}><td className="font-semibold">{k}</td><td>{v}</td></tr>
                  ))}
                  {!hasSpecs && !product.variants && (
                    <tr><td className="font-semibold">Technical Details</td><td className="italic text-secondary">{AOR}</td></tr>
                  )}
                </tbody>
              </table>

              {product.variants && (
                <div className="mt-6 overflow-x-auto">
                  <h3 className="font-heading font-bold text-base text-primary mb-3">Available Sizes</h3>
                  <table className="spec-table w-full bg-white min-w-[560px]" data-testid="variants-table">
                    <thead>
                      <tr>{product.variantColumns.map((c) => <th key={c}>{c}</th>)}</tr>
                    </thead>
                    <tbody>
                      {product.variants.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, i) => <td key={i} className={i === 0 ? 'font-mono font-semibold' : ''}>{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical drawing */}
        <div className="container-x mt-16" id="drawing">
          <div className="scroll-mt-24 border border-dashed border-border bg-white p-8" data-testid="drawing-note">
            <h2 className="font-heading font-extrabold text-xl text-primary">Technical Drawing</h2>
            <p className="mt-2 text-sm text-secondary italic">Technical drawing available on request. Contact us with the item code for CAD drawings and dimensional details.</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container-x mt-20" id="related">
            <h2 className="font-heading font-extrabold text-2xl text-primary mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.slug} product={p} onQuote={onQuote} index={i} />)}
            </div>
          </div>
        )}
      </div>

      {lightbox != null && (
        <ImageLightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} onNavigate={(i) => { setLightbox(i); setActive(i); }} />
      )}
    </div>
  );
}

