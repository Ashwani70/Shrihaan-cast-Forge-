import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronRight, Maximize2, Mail, CheckCircle2 } from 'lucide-react';
import { getTractorPart, TRACTOR_PARTS, isCompleteProduct, visibleProducts } from '../data/tractorParts';
import { ImageLightbox } from '../components/ImageLightbox';
import { TractorCard } from './TractorParts';

const AOR = 'Available on Request';

export default function TractorPartDetail({ onQuote }) {
  const { slug } = useParams();
  const product = getTractorPart(slug);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  if (!product) return <Navigate to="/products" replace />;
  if (!isCompleteProduct(product)) {
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
  const related = visibleProducts(TRACTOR_PARTS.filter((p) => p.slug !== product.slug)).slice(0, 4);
  const hasSpecs = Object.keys(product.specs || {}).length > 0;

  return (
    <div data-testid={`tractor-detail-${product.slug}`}>
      <div className="bg-white border-b border-border">
        <div className="container-x py-4">
          <nav className="flex items-center gap-1.5 text-xs text-secondary flex-wrap" data-testid="breadcrumbs">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/tractor-parts" className="hover:text-accent">Tractor Parts</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <div>
            {product.hasImage ? (
              <>
                <button
                  data-testid="tractor-main-image"
                  onClick={() => setLightbox(active)}
                  className="relative w-full bg-white border border-border aspect-[4/3] flex items-center justify-center p-6 group cursor-zoom-in"
                >
                  <img
                    src={product.images[active]}
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
                {product.images.length > 1 && (
                  <div className="mt-3 grid grid-cols-6 gap-2" data-testid="tractor-thumbnails">
                    {product.images.map((g, i) => (
                      <button
                        key={g}
                        data-testid={`tractor-thumbnail-${i}`}
                        onClick={() => setActive(i)}
                        className={`bg-white border aspect-square flex items-center justify-center p-1.5 transition-colors duration-150 ${i === active ? 'border-accent' : 'border-border hover:border-secondary'}`}
                      >
                        <img src={g} alt={`${product.name} ${i + 1}`} loading="lazy" className="max-h-full max-w-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-3 text-xs text-slate-400">Click the image to open the full-screen viewer with zoom.</p>
              </>
            ) : (
              <div className="blueprint-grid border border-border aspect-[4/3] flex flex-col items-center justify-center p-8" data-testid="tractor-image-panel">
                <span className="font-heading font-extrabold text-7xl text-accent/80 tracking-tight">
                  {product.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">{product.name}</span>
                <span className="mt-2 text-[10px] uppercase tracking-wider text-slate-500 italic">Product image available on request</span>
              </div>
            )}
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Forging Component · Tractor Parts</span>
            <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-primary" data-testid="tractor-title">{product.name}</h1>
            <p className="mt-5 text-secondary text-sm md:text-base leading-relaxed">{product.description}</p>

            {product.features && (
              <ul className="mt-5 space-y-2.5" data-testid="tractor-features">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                data-testid="tractor-request-quote-btn"
                onClick={() => onQuote({ name: product.name, itemCode: product.itemCode })}
                className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md"
              >
                Request a Quote
              </button>
              <button
                data-testid="tractor-send-enquiry-btn"
                onClick={() => onQuote({ name: product.name, itemCode: product.itemCode })}
                className="inline-flex items-center gap-2 border border-primary text-primary font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                <Mail className="w-4 h-4" /> Send Enquiry
              </button>
            </div>

            <div className="mt-10">
              <h2 className="font-heading font-bold text-lg text-primary mb-4">Specifications</h2>
              <table className="spec-table w-full bg-white" data-testid="tractor-specs-table">
                <thead>
                  <tr><th className="w-1/3">Specification</th><th>Details</th></tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold">Product Name</td><td>{product.name}</td></tr>
                  <tr><td className="font-semibold">Application</td><td>{product.application || AOR}</td></tr>
                  {Object.entries(product.specs || {}).map(([k, v]) => (
                    <tr key={k}><td className="font-semibold">{k}</td><td>{v}</td></tr>
                  ))}
                  {!hasSpecs && (
                    <tr><td className="font-semibold">Technical Details</td><td className="italic text-secondary">{AOR}</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-8 border border-dashed border-border bg-slate-50 p-6" data-testid="tractor-drawing-note">
              <h3 className="font-heading font-bold text-primary text-sm uppercase tracking-wide">Technical Drawing</h3>
              <p className="mt-2 text-sm text-secondary italic">Technical drawing available on request.</p>
            </div>
          </div>
        </div>

        <div className="container-x mt-20">
          <h2 className="font-heading font-extrabold text-2xl text-primary mb-8">More Tractor Parts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => <TractorCard key={p.slug} product={p} onQuote={onQuote} index={i} />)}
          </div>
        </div>
      </div>

      {lightbox != null && (
        <ImageLightbox images={product.images} index={lightbox} onClose={() => setLightbox(null)} onNavigate={(i) => { setLightbox(i); setActive(i); }} />
      )}
    </div>
  );
}
