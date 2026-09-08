import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function About({ onQuote }) {
  return (
    <div data-testid="about-page">
      <div className="bg-primary">
        <div className="container-x py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">About Us</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">SHRIHAAN CAST &amp; FORGE PVT. LTD.</h1>
          <p className="mt-4 text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
            An engineering-focused manufacturer of high-strength, precision-forged components serving automotive, tractor, agricultural, and industrial applications.
          </p>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary">An Engineering-Focused Forging Manufacturer</h2>
            <p className="mt-5 text-secondary text-sm md:text-base leading-relaxed">
              SHRIHAAN CAST &amp; FORGE PVT. LTD. is an engineering-focused manufacturer of forged components serving automotive, tractor, agricultural and industrial applications. We manufacture high-strength, precision-forged components designed to meet demanding OEM and industrial requirements.
            </p>
            <p className="mt-4 text-secondary text-sm md:text-base leading-relaxed">
              Our advanced closed-die and open-die forging processes, combined with precision CNC machining and rigorous quality inspection, deliver dimensionally accurate steel components engineered for superior strength, structural integrity, and long service life.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Precision forged components for demanding applications',
                'Automotive, tractor and agricultural components',
                'Consistent quality and dimensional accuracy',
                'Custom forging solutions for OEM requirements'
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" data-testid="about-explore-products" className="inline-flex items-center gap-2 bg-primary text-white font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <button data-testid="about-request-quote" onClick={() => onQuote()} className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-0.5">
                Request a Quote
              </button>
            </div>
          </div>
          <div className="space-y-5">
            <img src="/products/forging-factory-banner.webp" alt="Precision forging manufacturing plant" className="w-full aspect-[4/3] object-cover border border-border" />
            <div className="bg-white border border-border p-7">
              <h3 className="font-heading font-bold text-lg text-primary">Forging Excellence &amp; OEM Engineering</h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Our commitment to quality is paramount. We utilize state-of-the-art forging presses and automated machinery to ensure exceptional consistency, high tensile strength, and exact tolerances across every production batch.
              </p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Our high-strength forged steel components meet rigorous industrial standards, verified through metallurgical inspection, dimensional verification, and mechanical load testing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
