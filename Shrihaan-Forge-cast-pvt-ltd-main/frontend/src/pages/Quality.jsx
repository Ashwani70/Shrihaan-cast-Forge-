import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair, ShieldCheck, Settings, ClipboardCheck, PackageCheck, Repeat, FileText } from 'lucide-react';
import { SEO, DOMAIN } from '../components/SEO';

const QUALITY_ITEMS = [
  {
    icon: Crosshair,
    title: 'Chemical & Spectro Analysis',
    description:
      'Optical emission spectro chemical analysis verifies exact chemical composition of steel raw material batches (Carbon, Manganese, Silicon, Chromium, Nickel, Molybdenum) prior to forging.',
  },
  {
    icon: ShieldCheck,
    title: 'Dimensional & CMM Inspection',
    description:
      'Precision coordinate measuring machines (CMM) and calibrated gauges ensure every forged part meets exact drawing tolerances and geometric parameters.',
  },
  {
    icon: Settings,
    title: 'Mechanical Load & Tensile Testing',
    description:
      'Universal Testing Machine (UTM) testing verifies yield strength, ultimate tensile strength, elongation, and impact energy to meet high-stress industrial applications.',
  },
  {
    icon: ClipboardCheck,
    title: 'Ultrasonic & Non-Destructive Testing (NDT)',
    description:
      'Ultrasonic flaw detection and Magnetic Particle Inspection (MPI) identify subsurface inclusions, cracks, or voids to guarantee zero structural defects.',
  },
  {
    icon: Repeat,
    title: 'Hardness & Metallurgical Examination',
    description:
      'Rockwell and Brinell hardness testing combined with microstructural grain flow inspection ensure optimum heat treatment response and wear resistance.',
  },
  {
    icon: PackageCheck,
    title: 'EN-74 & BS-1139 Standard Compliance',
    description:
      'Drop forged scaffolding couplers and structural clamps are rigorously tested to EN-74 and BS-1139 standards for safe working load and slip resistance.',
  },
];

export default function Quality({ onQuote }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${DOMAIN}/quality#webpage`,
    url: `${DOMAIN}/quality`,
    name: 'Quality & Inspection | Forging Manufacturer India',
    description:
      'Quality assurance, metallurgical testing, chemical spectro analysis, and ISO compliance standards at Shrihaan Cast & Forge Pvt. Ltd.',
  };

  return (
    <div data-testid="quality-page">
      <SEO
        title="Quality & Inspection | Forging Manufacturer India"
        description="Shrihaan Cast & Forge Pvt. Ltd. maintains rigorous quality control, spectro analysis, ultrasonic NDT, mechanical testing, and EN-74 / BS-1139 compliance for forged steel components."
        keywords="quality assurance forging, NDT ultrasonic testing forgings, spectro chemical analysis steel, EN-74 scaffolding couplers test, ISO quality forging manufacturer Ludhiana, mechanical load testing"
        canonical="/quality"
        schema={schema}
      />

      <div className="bg-primary">
        <div className="container-x py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Quality Assurance</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">
            Quality &amp; Inspection Excellence
          </h1>
          <p className="mt-3 text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
            At SHRIHAAN CAST &amp; FORGE PVT. LTD., quality is engineered into every stage of manufacturing — from raw steel inspection to final load testing and surface treatment.
          </p>
        </div>
      </div>

      <div className="section-pad bg-white">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary">
              Strict Quality Standards &amp; Metallurgical Testing
            </h2>
            <p className="mt-3 text-secondary text-sm md:text-base leading-relaxed">
              Our quality control system ensures that all forged steel components, scaffolding accessories, and agricultural parts comply with stringent international standards and OEM specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {QUALITY_ITEMS.map((q) => (
              <div key={q.title} className="bg-slate-50 border border-slate-200 p-7 rounded-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-primary text-accent rounded-sm flex items-center justify-center mb-5">
                    <q.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-primary">{q.title}</h3>
                  <p className="mt-3 text-sm text-secondary leading-relaxed">{q.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-accent">
                  <FileText className="w-4 h-4" /> Mill Test Certificate (MTC) Available
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-8 md:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-white">Need Test Reports or Material Certificates?</h3>
              <p className="mt-2 text-slate-300 text-sm">
                We supply Mill Test Certificates (EN 10204 3.1) and third-party inspection reports (SGS, TUV, Bureau Veritas) on request.
              </p>
            </div>
            <button
              onClick={() => onQuote()}
              className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-8 py-3.5 rounded-sm shrink-0 hover:bg-accent/90 transition-colors"
            >
              Request Specs &amp; MTC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
