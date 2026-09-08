import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Ruler, FileText } from 'lucide-react';
import { PRODUCTS, getModel, getCategory } from '../data/products';

const GROUPS = [
  { key: 'all', label: 'All', cats: null },
  { key: 'ringlock', label: 'Ringlock', cats: ['ringlock-system', 'ringlock-accessories'] },
  { key: 'cuplock', label: 'Cuplock', cats: ['cuplock-system'] },
  { key: 'kwikstage', label: 'Kwikstage', cats: ['kwikstage-system'] },
  { key: 'jacks', label: 'Screw Jacks', cats: ['screw-base-jacks'] },
  { key: 'props', label: 'Steel Props', cats: ['steel-props'] },
  { key: 'couplers', label: 'Couplers', cats: ['forged-pressed-couplers'] },
  { key: 'frames', label: 'Frames', cats: ['frames'] },
  { key: 'accessories', label: 'Accessories', cats: ['support-railings', 'ladders-brackets-gates-accessories', 'walk-boards-steel-planks', 'framework-accessories'] },
];

const MiniViewer = ({ product, cad }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const model = getModel(product.slug);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: '200px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="blueprint-grid relative h-56 overflow-hidden" data-testid={`gallery3d-viewer-${product.slug}`}>
      {visible ? (
        <Canvas dpr={[1, 1.25]} camera={{ position: [2.4, 1.4, 2.4], fov: 40 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 6, 4]} intensity={1.5} />
            <spotLight position={[-5, 4, -4]} intensity={1} color="#fcd9b0" angle={0.6} penumbra={1} />
            {model.key !== 'imagePanel' ? (
              <PartsModelLazy modelKey={model.key} params={model.params} mode={cad ? 'cad' : 'solid'} />
            ) : (
              <ImagePanelLazy url={product.image} mode={cad ? 'cad' : 'solid'} />
            )}
            <ContactShadows position={[0, -0.95, 0]} opacity={0.5} scale={5} blur={2.2} far={2} />
            <OrbitControls makeDefault autoRotate autoRotateSpeed={1.6} enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="h-full flex items-center justify-center">
          <img src={product.image} alt={product.name} loading="lazy" className="max-h-32 object-contain opacity-70" />
        </div>
      )}
      <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">3D Visualization</span>
    </div>
  );
};

// lazily reuse the heavy renderer from ProductViewer module (already code-split)
const PartsModelLazy = (props) => {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    import('../three/ProductViewer').then((m) => setComp(() => m.PartsModel));
  }, []);
  return Comp ? <Comp {...props} /> : null;
};
const ImagePanelLazy = (props) => {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    import('../three/ProductViewer').then((m) => setComp(() => m.ImagePanel3D));
  }, []);
  return Comp ? <Comp {...props} /> : null;
};

const GalleryCard = ({ product, onQuote, index }) => {
  const [cad, setCad] = useState(false);
  const cat = getCategory(product.category);
  const base = `/products/${product.category}/${product.slug}`;
  return (
    <div className="bg-primary border border-white/10 flex flex-col group" data-testid={`gallery3d-card-${product.slug}`}>
      <MiniViewer product={product} cad={cad} />
      <div className="p-4 flex flex-col flex-1 border-t border-white/10">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">{cat?.name}</span>
        <h3 className="font-heading font-bold text-white text-sm mt-1 leading-snug">{product.name}</h3>
        <p className="text-[11px] font-mono text-slate-500 mt-1">{product.itemCode}</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5 mt-auto">
          <button
            data-testid={`gallery3d-technical-${product.slug}`}
            onClick={() => setCad(!cad)}
            className={`inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wide border px-2 py-2 rounded-sm transition-colors duration-150 ${cad ? 'bg-accent text-white border-accent' : 'border-white/20 text-slate-300 hover:bg-white/10'}`}
          >
            <Ruler className="w-3 h-3" /> {cad ? '3D View' : 'Technical'}
          </button>
          <Link
            to={base}
            data-testid={`gallery3d-specs-${product.slug}`}
            className="inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wide border border-white/20 text-slate-300 px-2 py-2 rounded-sm transition-colors duration-150 hover:bg-white/10"
          >
            <FileText className="w-3 h-3" /> Specs
          </Link>
          <button
            data-testid={`gallery3d-quote-${product.slug}`}
            onClick={() => onQuote(product)}
            className="col-span-2 text-[10px] font-bold uppercase tracking-wide bg-accent text-white px-2 py-2 rounded-sm transition-colors duration-150 hover:bg-accent/90"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Gallery3D({ onQuote }) {
  const [group, setGroup] = useState('all');
  const filtered = useMemo(() => {
    const g = GROUPS.find((x) => x.key === group);
    return g && g.cats ? PRODUCTS.filter((p) => g.cats.includes(p.category)) : PRODUCTS;
  }, [group]);

  return (
    <div data-testid="gallery3d-page" className="bg-[#0b1220] min-h-screen">
      <div className="container-x py-14 md:py-20">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Interactive</span>
        <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">3D Product Gallery</h1>
        <p className="mt-3 text-slate-400 text-sm md:text-base max-w-2xl">
          Every catalogue product as an interactive 3D visualization — drag to rotate, switch to Technical view for a CAD-style outline. Visualizations are generated from catalogue data and imagery.
        </p>

        <div className="mt-8 flex flex-wrap gap-1.5" data-testid="gallery3d-filters">
          {GROUPS.map((g) => (
            <button
              key={g.key}
              data-testid={`gallery3d-filter-${g.key}`}
              onClick={() => setGroup(g.key)}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider border rounded-sm transition-colors duration-150 ${
                group === g.key ? 'bg-accent text-white border-accent' : 'bg-white/5 text-slate-400 border-white/15 hover:text-white'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-wider text-slate-500" data-testid="gallery3d-count">
          {filtered.length} products
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <GalleryCard key={p.slug} product={p} onQuote={onQuote} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
