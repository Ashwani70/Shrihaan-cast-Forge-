import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Award, Globe } from 'lucide-react';
import { SEO, DOMAIN } from '../components/SEO';

export default function About({ onQuote }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${DOMAIN}/about#webpage`,
    url: `${DOMAIN}/about`,
    name: 'About Shrihaan Cast & Forge | Forging Manufacturer India',
    description:
      'Shrihaan Cast & Forge Pvt. Ltd. is an engineering-focused manufacturer of precision forged steel components, scaffolding systems, and agricultural tractor parts based in Ludhiana, Punjab, India.',
  };

  return (
    <div data-testid="about-page">
      <SEO
        title="About Shrihaan Cast & Forge | Forging Manufacturer India"
        description="Learn about Shrihaan Cast & Forge Pvt. Ltd., a premier steel forging manufacturer in Ludhiana, Punjab, India specializing in precision forged steel components, scaffolding systems, and tractor parts for domestic & international markets."
        keywords="About Shrihaan Cast & Forge, forging manufacturer Ludhiana Punjab, steel forging company India, precision forged components manufacturer, scaffolding manufacturer India, tractor parts forging"
        canonical="/about"
        schema={schema}
      />

      <div className="bg-primary">
        <div className="container-x py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">About Our Company</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">
            SHRIHAAN CAST &amp; FORGE PVT. LTD.
          </h1>
          <p className="mt-4 text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
            An engineering-focused manufacturer of high-strength, precision-forged steel components, modular scaffolding systems, and agricultural tractor parts serving domestic and international B2B buyers.
          </p>
        </div>
      </div>

      <div className="section-pad bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Manufacturing Heritage</span>
            <h2 className="mt-2 font-heading font-extrabold text-2xl md:text-3xl text-primary">
              Leading Steel Forging &amp; Engineering Solutions
            </h2>
            <p className="mt-5 text-secondary text-sm md:text-base leading-relaxed">
              <strong>SHRIHAAN CAST &amp; FORGE PVT. LTD.</strong> is an established <strong>steel forging manufacturer in India</strong> headquartered in Ludhiana, Punjab. We engineer high-performance forged steel parts, heavy-duty scaffolding components, and three-point tractor linkage assemblies built to rigorous global standards.
            </p>
            <p className="mt-4 text-secondary text-sm md:text-base leading-relaxed">
              Our integrated manufacturing setup encompasses closed-die drop forging hammers, multi-axis CNC &amp; VMC machining, controlled heat treatment, automated welding lines, and rigorous surface finishing facilities.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 border border-slate-200">
                <Factory className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary text-sm">Advanced Infrastructure</h3>
                <p className="text-xs text-secondary mt-1">Closed die forging, drop hammers, and precision CNC machinery.</p>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200">
                <ShieldCheck className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary text-sm">Quality Commitment</h3>
                <p className="text-xs text-secondary mt-1">Spectro chemical analysis, UTM load testing, NDT ultrasonic testing.</p>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200">
                <Award className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary text-sm">Standard Compliance</h3>
                <p className="text-xs text-secondary mt-1">Scaffolding couplers manufactured to EN-74 and BS-1139 standards.</p>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200">
                <Globe className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary text-sm">Pan-India &amp; Export</h3>
                <p className="text-xs text-secondary mt-1">Supplying Indian OEMs and international clients worldwide.</p>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {[
                'Precision closed die steel forging & custom OEM development',
                'Comprehensive product range across scaffolding, props, and tractor parts',
                'High-tensile S355 grade steel tube fabrication and automated welding',
                'In-house CAD/CAM tooling design and die shop',
                'Full metallurgical testing with Mill Test Certificates (EN 10204 3.1)',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/products"
                data-testid="about-explore-products"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                data-testid="about-request-quote"
                onClick={() => onQuote()}
                className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-0.5"
              >
                Request a Quote
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <img
              src="/products/forging-factory-banner.webp"
              alt="Precision forging manufacturing plant of Shrihaan Cast & Forge Pvt. Ltd."
              loading="lazy"
              className="w-full aspect-[4/3] object-cover border border-border"
            />

            <div className="bg-slate-50 border border-border p-7">
              <h3 className="font-heading font-bold text-lg text-primary">Manufacturing Location &amp; Works</h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                <strong>Works:</strong> Gurdev Nagar Estate Sahnewal, Dehlon Road, Paddi, Ludhiana, Punjab, India - 141206
              </p>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Located in Ludhiana\'s industrial hub, our manufacturing facility boasts proximity to major steel mills and freight corridors, facilitating rapid raw material sourcing and efficient global shipping via seaport terminals.
              </p>
            </div>

            <div className="bg-primary p-7 text-white">
              <h3 className="font-heading font-bold text-lg text-white">Why B2B Buyers Choose Us</h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                We combine technical engineering expertise with competitive B2B pricing, dependable delivery schedules, and strict adherence to technical drawings and material specifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
