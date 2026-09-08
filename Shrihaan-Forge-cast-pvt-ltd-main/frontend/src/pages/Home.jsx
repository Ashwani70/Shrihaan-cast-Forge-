import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building2, Landmark, HardHat, Layers, Factory, Wrench, Crosshair, Repeat, ShieldCheck, Settings, ClipboardCheck, PackageCheck } from 'lucide-react';
import { PRODUCTS, DIVISIONS, visibleScaffolding } from '../data/products';
import { TRACTOR_PARTS, visibleProducts } from '../data/tractorParts';
import { ProductCard } from '../components/ProductCard';
import { TractorCard } from './TractorParts';
import { Reveal, MaskedLine, EASE } from '../components/Reveal';
import { Marquee } from '../components/Marquee';

const HERO_IMG = 'https://images.unsplash.com/photo-1600684249816-38cdfcf95c17?q=85&w=1600';
const QUALITY_IMG = 'https://images.unsplash.com/photo-1700727448575-6f1680cd7d75?q=85&w=800';

const INDUSTRIES = [
  { icon: Building2, name: 'Construction', text: 'Scaffolding systems, props and access products for building construction sites.' },
  { icon: Landmark, name: 'Infrastructure', text: 'Shoring and support systems for bridges, roads and large civil infrastructure works.' },
  { icon: HardHat, name: 'Scaffolding', text: 'Complete Ringlock, Cuplock and Kwikstage modular scaffolding ranges.' },
  { icon: Layers, name: 'Formwork', text: 'Formwork accessories, strip clamps and framework support products.' },
  { icon: Factory, name: 'Industrial Projects', text: 'Access and support equipment for plants, refineries and industrial facilities.' },
  { icon: Wrench, name: 'Engineering Projects', text: 'Cast, forged and pressed engineering components for project requirements.' },
];

const QUALITY_POINTS = [
  { icon: Crosshair, name: 'Precision', text: 'Precision manufacturing with automated welding processes for consistent, dimensionally accurate components.' },
  { icon: Repeat, name: 'Consistency', text: 'Controlled production processes deliver uniform quality across every batch.' },
  { icon: ShieldCheck, name: 'Durability', text: 'High-tensile S355 grade steel tubes with a minimum yield strength of 50,000 PSI.' },
  { icon: Settings, name: 'Engineering', text: 'Engineering-led product design across casting, forging and fabrication.' },
  { icon: ClipboardCheck, name: 'Quality Control', text: 'Strict inspection standards applied across the manufacturing process.' },
  { icon: PackageCheck, name: 'Reliability', text: 'Reliable industrial products built to perform in demanding applications.' },
];

const SectionTitle = ({ kicker, title, light = false, index }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3">
      {index && <span className="font-heading font-extrabold text-accent text-sm">{index}</span>}
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{kicker}</span>
      <span className="h-px flex-1 max-w-16 bg-accent/50" />
    </div>
    <h2 className={`mt-3 font-heading font-extrabold text-3xl md:text-4xl ${light ? 'text-white' : 'text-primary'}`}>{title}</h2>
  </div>
);

const MARQUEE_ITEMS = ['Ringlock System', 'Cuplock System', 'Kwikstage System', 'Steel Props', 'Screw Base Jacks', 'Forged Couplers', 'Walk Boards', 'Frame Systems', 'Formwork Accessories'];

export default function Home({ onQuote }) {
  const featuredScaffolding = visibleScaffolding(
    PRODUCTS.filter((p) => ['ringlock-vertical', 'light-duty-prop', 'british-type-right-angle-coupler', 'cuplock-vertical'].includes(p.slug))
  );
  const featuredTractor = visibleProducts(
    TRACTOR_PARTS.filter((p) => ['bale-spear-double', 'double-tine-guard-gc255', 'eye-rod-gc271', 'scaffold-cup-gc286'].includes(p.slug))
  );

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div data-testid="home-page">
      {/* HERO — cinematic */}
      <section ref={heroRef} className="relative blueprint-grid overflow-hidden" data-testid="hero-section">
        <motion.img
          src={HERO_IMG}
          alt="Industrial forging press"
          style={{ y: heroImgY }}
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/80 to-[#0b1220]/30 pointer-events-none" />

        {/* CAD callout overlays */}
        <div className="absolute right-[8%] top-[22%] hidden lg:block pointer-events-none animate-fade-up" style={{ animationDelay: '1.2s' }}>
          <div className="flex items-center gap-2">
            <span className="w-10 h-px bg-accent" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-slate-300 uppercase bg-primary/60 px-2 py-1">Ringlock · Cuplock · Kwikstage</span>
          </div>
        </div>
        <div className="absolute right-[16%] bottom-[26%] hidden lg:block pointer-events-none animate-fade-up" style={{ animationDelay: '1.6s' }}>
          <div className="flex items-center gap-2">
            <span className="w-10 h-px bg-accent" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-slate-300 uppercase bg-primary/60 px-2 py-1">S355 High-Tensile Steel</span>
          </div>
        </div>

        <motion.div style={{ y: heroContentY, opacity: heroFade }} className="container-x relative py-24 md:py-36 z-10">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-accent border border-accent/40 px-3 py-1.5 rounded-sm"
            >
              Casting · Forging · Scaffolding · Shoring
            </motion.span>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05]">
              <MaskedLine delay={0.15}>PRECISION ENGINEERED.</MaskedLine>
              <MaskedLine delay={0.32} className="text-accent">BUILT FOR PERFORMANCE.</MaskedLine>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed max-w-xl"
            >
              Advanced casting, forging and engineering solutions designed for demanding industrial and construction applications.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/products"
                data-testid="hero-explore-products-btn"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                data-testid="hero-request-quote-btn"
                onClick={() => onQuote()}
                className="inline-flex items-center gap-2 border border-white/40 text-white font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Request a Quote
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Marquee items={MARQUEE_ITEMS} />

      {/* INTRO STRIP */}
      <section className="bg-white border-b border-border">
        <div className="container-x py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['5', 'Product Divisions'], [String(PRODUCTS.length + TRACTOR_PARTS.length) + '+', 'Products'], ['EN-74 / BS-1139', 'Coupler Standard'], ['S355', 'High-Tensile Steel Tubes']].map(([v, l], i) => (
            <Reveal key={l} delay={i * 0.08}>
              <div className="font-heading font-extrabold text-2xl md:text-3xl text-primary">{v}</div>
              <div className="text-xs uppercase tracking-wider text-secondary mt-1">{l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-pad" data-testid="home-about">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src="/products/forging-factory-banner.webp" alt="Precision forging manufacturing plant" className="w-full border border-border object-cover aspect-[4/3]" />
            <div className="absolute -bottom-5 -right-5 bg-accent text-accent-foreground px-6 py-4 hidden md:block">
              <div className="font-heading font-extrabold text-lg leading-tight">SHRIHAAN</div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase">Cast &amp; Forge Pvt. Ltd.</div>
            </div>
          </div>
          <div>
            <SectionTitle kicker="About Us · Forging Components Manufacturer" title="An Engineering-Focused Forging Manufacturer" />
            <p className="text-secondary leading-relaxed text-sm md:text-base">
              SHRIHAAN CAST &amp; FORGE PVT. LTD. is an engineering-focused manufacturer of forged components serving automotive, tractor, agricultural and industrial applications. We manufacture high-strength, precision-forged components designed to meet demanding OEM and industrial requirements.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Precision forged components for demanding applications',
                'Automotive, tractor and agricultural components',
                'Consistent quality and dimensional accuracy',
                'Custom forging solutions for OEM requirements'
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 w-2 h-2 bg-accent shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              data-testid="home-about-link"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary border-b-2 border-accent pb-1 hover:text-accent transition-colors duration-150"
            >
              More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE — divisions */}
      <section className="relative py-20 md:py-24 bg-[#071322] border-y border-slate-800/80 overflow-hidden" data-testid="home-categories">
        {/* Subtle background ambient illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/15 via-transparent to-transparent pointer-events-none" />

        <div className="container-x relative z-10">
          {/* Centered Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-teal-400 block mb-3">
              ENGINEERED PRODUCTS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Precision-Built Products for Every Project
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full" />
          </div>

          {/* 5 Vertical Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
            {DIVISIONS.map((d, i) => (
              <motion.div
                key={d.slug}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="h-full"
              >
                <Link
                  to={`/products/${d.slug}`}
                  data-testid={`category-card-${d.slug}`}
                  className="group relative flex flex-col h-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#071c2b] border border-teal-500/30 shadow-2xl shadow-black/80 hover:border-teal-400/80 hover:shadow-teal-900/50 transition-all duration-300"
                >
                  {/* Top Image Container — 300px desktop height, seamless dark navy studio background */}
                  <div className="relative h-[280px] sm:h-[300px] md:h-[320px] w-full bg-[#0a2334] overflow-hidden flex items-center justify-center p-2 border-b border-teal-500/30">
                    {d.image ? (
                      <img
                        src={d.image}
                        alt={d.name}
                        loading="eager"
                        style={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '320px',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          display: 'block',
                          opacity: 1,
                        }}
                        className="relative z-10 w-full h-full max-w-full max-h-full object-contain object-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <span className="font-heading font-extrabold text-4xl text-slate-300 tracking-tight">
                        {d.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                      </span>
                    )}
                  </div>

                  {/* Bottom Content Container — Teal to Dark Navy gradient with high-contrast text */}
                  <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 bg-gradient-to-b from-[#0a3845] via-[#072432] to-[#04121d] text-white">
                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-white mb-3 group-hover:text-teal-300 transition-colors duration-200">
                        {d.heading || d.name}
                      </h3>
                      <p className="text-sm text-slate-200/95 font-normal leading-relaxed mb-6">
                        {d.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-teal-500/30 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-teal-300 group-hover:text-white transition-colors duration-200">
                        Know More <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Products Link */}
          <div className="mt-12 text-center">
            <Link
              to="/products"
              data-testid="categories-view-all"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors duration-150 py-2.5 px-6 rounded-full border border-teal-500/30 hover:border-teal-400/60 bg-teal-950/30"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-pad" data-testid="home-featured">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionTitle kicker="Engineered Products" title="Featured Products" />
            <Link to="/catalogue" data-testid="featured-catalogue-link" className="text-sm font-bold uppercase tracking-wide text-accent hover:text-accent/80 inline-flex items-center gap-1.5 mb-10">
              Browse Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {featuredScaffolding.map((p, i) => (
              <ProductCard key={p.slug} product={p} onQuote={onQuote} index={i} />
            ))}
            {featuredTractor.map((p, i) => (
              <TractorCard key={p.slug} product={p} onQuote={onQuote} index={i + 4} />
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="section-pad bg-primary" data-testid="industries-section">
        <div className="container-x">
          <SectionTitle kicker="Applications" title="Industries We Serve" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.07} className="h-full">
                <div data-testid={`industry-${ind.name.toLowerCase().replace(/\s/g, '-')}`} className="bg-primary p-8 group hover:bg-[#1b2436] transition-colors duration-300 h-full">
                  <ind.icon className="w-8 h-8 text-accent transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.6} />
                  <h3 className="mt-4 font-heading font-bold text-white text-lg">{ind.name}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{ind.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY — numbered manifesto chapters */}
      <section id="quality" className="section-pad bg-white border-b border-border" data-testid="quality-section">
        <div className="container-x grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <SectionTitle kicker="Quality & Engineering" title="Uncompromising Quality, By Design" />
            <p className="text-secondary text-sm md:text-base leading-relaxed">
              We deliver uncompromising quality through precision manufacturing, robust materials, and strict standards — ensuring reliable, durable engineering solutions that perform across demanding industrial applications.
            </p>
            <Reveal delay={0.15}>
              <img src={QUALITY_IMG} alt="Quality control inspection" loading="lazy" className="mt-8 w-full aspect-[4/3] object-cover border border-border" />
            </Reveal>
          </div>
          <div className="lg:col-span-3 self-start border-t border-border">
            {QUALITY_POINTS.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.06}>
                <div data-testid={`quality-${q.name.toLowerCase().replace(/\s/g, '-')}`} className="group flex items-start gap-6 py-6 border-b border-border transition-colors duration-300 hover:bg-slate-50 px-2 md:px-4">
                  <span className="font-heading font-extrabold text-3xl md:text-4xl text-slate-200 group-hover:text-accent transition-colors duration-300 select-none leading-none mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-primary text-lg flex items-center gap-3">
                      {q.name}
                      <q.icon className="w-5 h-5 text-accent" strokeWidth={1.6} />
                    </h3>
                    <p className="mt-1.5 text-sm text-secondary leading-relaxed max-w-lg">{q.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary" data-testid="home-cta">
        <div className="container-x py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-white">Need pricing, specifications or bulk quantities?</h2>
            <p className="mt-2 text-slate-400 text-sm md:text-base">Send us your requirement — our team responds with product details and a competitive quote.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button data-testid="cta-request-quote-btn" onClick={() => onQuote()} className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg">
              Request a Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
