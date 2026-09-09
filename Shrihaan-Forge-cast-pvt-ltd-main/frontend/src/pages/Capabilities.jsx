import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Wrench, Cpu, Gauge, Layers, Flame } from 'lucide-react';
import { SEO, DOMAIN } from '../components/SEO';

const CAPABILITIES_LIST = [
  {
    icon: Flame,
    title: 'Closed Die Forging & Drop Forging',
    description:
      'State-of-the-art drop forging hammers and closed-die forging presses capable of producing high-density, high-tensile steel forged components ranging from 0.1 kg to 25 kg with minimal material waste and superior grain flow alignement.',
  },
  {
    icon: Cpu,
    title: 'Precision CNC & VMC Machining',
    description:
      'Advanced multi-axis CNC machining centers, turning lathes, and vertical machining centers (VMC) ensuring strict dimensional tolerances (up to ±0.01mm) for critical automotive and industrial applications.',
  },
  {
    icon: Layers,
    title: 'Custom Tooling & Die Manufacturing',
    description:
      'In-house CAD/CAM design and high-precision CNC die shop. We engineer custom forging dies, punches, and fixtures for rapid prototype development and volume production.',
  },
  {
    icon: Gauge,
    title: 'Heat Treatment & Metallurgy Control',
    description:
      'Controlled heat treatment facilities offering normalizing, hardening, tempering, and stress relieving to optimize hardness, toughness, and mechanical performance of forged steel components.',
  },
  {
    icon: Shield,
    title: 'Surface Finishing & Protective Coatings',
    description:
      'Comprehensive surface finishing options including hot-dip galvanizing (HDG), electro-galvanizing, zinc plating, shot blasting, powder coating, and anti-corrosion painting compliant with international standards.',
  },
  {
    icon: Wrench,
    title: 'Automated Assembly & Welding',
    description:
      'Automated robotic welding lines, thread rolling, and precision assembly for scaffolding systems, steel props, couplers, and heavy-duty agricultural assemblies.',
  },
];

export default function Capabilities({ onQuote }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${DOMAIN}/capabilities#webpage`,
    url: `${DOMAIN}/capabilities`,
    name: 'Forging Manufacturing Capabilities | Shrihaan Cast & Forge Pvt. Ltd.',
    description:
      'Explore advanced closed die forging, drop forging, precision CNC machining, heat treatment, and custom tooling capabilities at Shrihaan Cast & Forge Pvt. Ltd.',
  };

  return (
    <div data-testid="capabilities-page">
      <SEO
        title="Forging Manufacturing Capabilities | Shrihaan Cast & Forge"
        description="Comprehensive forging manufacturing capabilities including closed die forging, drop forging, CNC machining, heat treatment, and custom tooling at Shrihaan Cast & Forge Pvt. Ltd. India."
        keywords="forging manufacturing capabilities, closed die forging, drop forging manufacturer, precision CNC machining, custom forging solutions, heat treatment steel forgings, forging facility India"
        canonical="/capabilities"
        schema={schema}
      />

      <div className="bg-primary">
        <div className="container-x py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Manufacturing Excellence</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">
            Forging &amp; Engineering Capabilities
          </h1>
          <p className="mt-3 text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
            SHRIHAAN CAST &amp; FORGE PVT. LTD. operates modern manufacturing infrastructure equipped with advanced closed-die forging presses, CNC machining centers, and comprehensive heat treatment facilities in Ludhiana, Punjab, India.
          </p>
        </div>
      </div>

      <div className="section-pad bg-white">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary">
              State-of-the-Art Production Facility
            </h2>
            <p className="mt-3 text-secondary text-sm md:text-base leading-relaxed">
              We specialize in custom forging and volume manufacturing of high-strength steel components for automotive OEMs, tractor manufacturers, construction contractors, and industrial equipment builders worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPABILITIES_LIST.map((cap) => (
              <div key={cap.title} className="bg-slate-50 border border-slate-200 p-6 rounded-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-4">
                    <cap.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-primary">{cap.title}</h3>
                  <p className="mt-3 text-sm text-secondary leading-relaxed">{cap.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                  <CheckCircle2 className="w-4 h-4 text-accent" /> Certified Quality Standard
                </div>
              </div>
            ))}
          </div>

          {/* Custom OEM Forging Banner */}
          <div className="mt-16 bg-primary text-white p-8 md:p-12 rounded-sm grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Custom Forging Solutions</span>
              <h3 className="mt-2 font-heading font-extrabold text-2xl md:text-3xl text-white">
                Have a Custom Sample or Technical Drawing?
              </h3>
              <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed">
                We manufacture custom forged steel components tailored to customer drawings, material specifications, and exact tolerances. Send us your CAD models or sample components for engineering evaluation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                onClick={() => onQuote()}
                className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-accent/90 text-center"
              >
                Request Custom Quote
              </button>
              <Link
                to="/contact"
                className="border border-white/40 text-white font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-white/10 text-center"
              >
                Contact Engineering Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
