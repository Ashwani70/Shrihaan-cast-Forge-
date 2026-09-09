import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Landmark, HardHat, Layers, Factory, Wrench, Globe, Truck } from 'lucide-react';
import { SEO, DOMAIN } from '../components/SEO';

const INDUSTRIES_DATA = [
  {
    icon: Building2,
    title: 'Construction & Scaffolding',
    description:
      'Complete modular scaffolding systems (Ringlock, Cuplock, Kwikstage), heavy-duty steel props, walk boards, and drop-forged scaffolding couplers engineered for high safety, fast erection, and load-bearing performance.',
  },
  {
    icon: Landmark,
    title: 'Infrastructure & Civil Works',
    description:
      'Heavy shoring components, screw base jacks, U-head plates, and heavy-duty structural support systems for bridges, flyovers, metro lines, and civil engineering megaprojects.',
  },
  {
    icon: Truck,
    title: 'Automotive & Commercial Vehicles',
    description:
      'Precision forged steel automotive components including levers, brackets, hitch pins, linkage components, stub axles, and structural brackets for commercial and heavy utility vehicles.',
  },
  {
    icon: Wrench,
    title: 'Agriculture & Tractor OEM',
    description:
      'High-durability agricultural tractor parts including bale spears, tine guards, eye rods, top link pins, linch pins, lower link balls, and three-point linkage forged assemblies.',
  },
  {
    icon: Factory,
    title: 'Industrial Facilities & Refineries',
    description:
      'Access platforms, heavy guard railings, industrial clamps, and specialized forged structural fittings for petrochemical plants, power stations, and manufacturing complexes.',
  },
  {
    icon: Globe,
    title: 'Export & Global B2B Markets',
    description:
      'Custom forged components manufactured to international standard specifications (EN-74, BS-1139, ASTM, DIN) exported to clients across North America, Europe, Middle East, and Asia-Pacific.',
  },
];

export default function Industries({ onQuote }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${DOMAIN}/industries#webpage`,
    url: `${DOMAIN}/industries`,
    name: 'Industries Served | Shrihaan Cast & Forge Pvt. Ltd.',
    description:
      'Industrial sectors served by Shrihaan Cast & Forge Pvt. Ltd., including automotive, agricultural tractor parts, scaffolding, civil infrastructure, and heavy engineering.',
  };

  return (
    <div data-testid="industries-page">
      <SEO
        title="Industries Served | Forging Manufacturer India"
        description="Shrihaan Cast & Forge Pvt. Ltd. supplies precision forged components to Automotive, Agriculture, Scaffolding, Civil Infrastructure, and Heavy Engineering industries across India and global export markets."
        keywords="industries served, automotive forging components, tractor parts manufacturer, scaffolding components, civil infrastructure shoring, engineering forging components, forging exporter India"
        canonical="/industries"
        schema={schema}
      />

      <div className="bg-primary">
        <div className="container-x py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Market Focus</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">
            Industries We Serve
          </h1>
          <p className="mt-3 text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
            SHRIHAAN CAST &amp; FORGE PVT. LTD. delivers engineered forging and casting solutions designed for demanding industrial, automotive, agricultural, and civil infrastructure applications.
          </p>
        </div>
      </div>

      <div className="section-pad bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES_DATA.map((ind) => (
              <div key={ind.title} className="bg-slate-50 border border-slate-200 p-7 rounded-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 bg-primary text-accent rounded-sm flex items-center justify-center mb-5">
                    <ind.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-primary">{ind.title}</h3>
                  <p className="mt-3 text-sm text-secondary leading-relaxed">{ind.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
                  >
                    Explore Industry Products <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-100 border border-slate-200 p-8 md:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-primary">Looking for Industry-Specific Components?</h3>
              <p className="mt-2 text-sm text-secondary">
                Our engineering team can customize forged steel products to meet exact industry specifications and material grades.
              </p>
            </div>
            <button
              onClick={() => onQuote()}
              className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-8 py-3.5 rounded-sm shrink-0 hover:bg-accent/90 transition-colors"
            >
              Request Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
