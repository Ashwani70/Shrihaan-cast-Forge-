import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Award, Globe } from 'lucide-react';
import { SEO, DOMAIN, COMPANY_NAME, ORGANIZATION_SCHEMA } from '../components/SEO';

export default function About({ onQuote }) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'AboutPage',
        '@id': `${DOMAIN}/about#webpage`,
        url: `${DOMAIN}/about`,
        name: `About ${COMPANY_NAME} | Forging & Casting Manufacturer`,
        description: `${COMPANY_NAME} is a manufacturer of high-quality forging and casting components for industrial and engineering applications.`,
      },
    ],
  };

  return (
    <div data-testid="about-page">
      <SEO
        title={`About ${COMPANY_NAME} | Forging & Casting Manufacturer`}
        description={`${COMPANY_NAME} is a manufacturer of high-quality forging and casting components for industrial and engineering applications. We focus on precision, quality, reliability and consistent manufacturing standards.`}
        keywords="Shrihaan Cast & Forge Private Limited, About Shrihaan Cast & Forge, forging manufacturer, casting manufacturer, precision components, industrial components, engineering components"
        canonical="/about"
        schema={schema}
      />

      <div className="bg-primary">
        <div className="container-x py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">About Our Company</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">
            Shrihaan Cast &amp; Forge Private Limited
          </h1>
          <p className="mt-4 text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
            Manufacturer of high-quality forging and casting components for industrial and engineering applications.
          </p>
        </div>
      </div>

      <div className="section-pad bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Company Overview</span>
            <h2 className="mt-2 font-heading font-extrabold text-2xl md:text-3xl text-primary">
              Forging &amp; Casting Component Manufacturing
            </h2>
            <p className="mt-5 text-secondary text-sm md:text-base leading-relaxed">
              <strong>Shrihaan Cast &amp; Forge Private Limited</strong> is a manufacturer of high-quality forging and casting components for industrial and engineering applications. We focus on precision, quality, reliability and consistent manufacturing standards.
            </p>
            <p className="mt-4 text-secondary text-sm md:text-base leading-relaxed">
              Our manufacturing facilities combine forging expertise, closed-die forging, casting capabilities, precision machining, and strict metallurgical quality control. We supply reliable industrial components engineered for demanding mechanical load and dimensional requirements.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 border border-slate-200">
                <Factory className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary text-sm">Forging &amp; Casting Manufacturing</h3>
                <p className="text-xs text-secondary mt-1">Closed die forging, drop hammers, casting facilities, and precision machining.</p>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200">
                <ShieldCheck className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary text-sm">Quality Control</h3>
                <p className="text-xs text-secondary mt-1">Spectro chemical analysis, UTM load testing, dimensional CMM verification.</p>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200">
                <Award className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary text-sm">Precision Engineering</h3>
                <p className="text-xs text-secondary mt-1">Strict dimensional tolerances and engineering standards.</p>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200">
                <Globe className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary text-sm">Customer-Focused Supply</h3>
                <p className="text-xs text-secondary mt-1">Domestic Indian supply and international export capabilities.</p>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {[
                'Precision forging and casting component manufacturing',
                'High-durability industrial and engineering components',
                'Custom component manufacturing according to technical specifications',
                'Strict quality inspection and consistent production standards',
                'Customer-focused B2B supply for Indian and global markets',
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
              alt="Shrihaan Cast & Forge Private Limited precision manufacturing plant"
              loading="lazy"
              className="w-full aspect-[4/3] object-cover border border-border"
            />

            <div className="bg-slate-50 border border-border p-7">
              <h3 className="font-heading font-bold text-lg text-primary">Manufacturing Works &amp; Location</h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                <strong>Works:</strong> Gurdev Nagar Estate Sahnewal, Dehlon Road, Paddi, Ludhiana, Punjab, India - 141206
              </p>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Our manufacturing facilities in Ludhiana, Punjab deliver high-precision cast and forged steel products designed for demanding industrial, automotive, agricultural, and construction applications.
              </p>
            </div>

            <div className="bg-primary p-7 text-white">
              <h3 className="font-heading font-bold text-lg text-white">Quality &amp; Customer Focus</h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Shrihaan Cast &amp; Forge Private Limited focuses on precision manufacturing, reliable quality control, and long-term customer relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
