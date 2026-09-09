import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { DIVISIONS } from '../data/products';

export const Footer = ({ onQuote }) => (
  <footer data-testid="site-footer" className="bg-primary text-slate-300">
    <div className="container-x py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <Logo dark />
        <p className="mt-5 text-sm leading-relaxed text-slate-400">
          Engineering-focused B2B manufacturer of forging, casting, scaffolding, shoring and industrial engineering products for demanding applications.
        </p>
        <button
          data-testid="footer-request-quote-btn"
          onClick={() => onQuote()}
          className="mt-6 inline-flex bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-px"
        >
          Request a Quote
        </button>
      </div>
      <div>
        <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {[
            ['/', 'Home'],
            ['/about', 'About Us'],
            ['/products', 'Products'],
            ['/capabilities', 'Capabilities'],
            ['/industries', 'Industries'],
            ['/quality', 'Quality'],
            ['/catalogue', 'Catalogue'],
            ['/contact', 'Contact Us'],
          ].map(([to, label]) => (
            <li key={label}>
              <Link to={to} data-testid={`footer-link-${label.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-accent transition-colors duration-150">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">Products</h4>
        <ul className="space-y-2 text-sm">
          {DIVISIONS.map((d) => (
            <li key={d.slug}>
              <Link to={`/products/${d.slug}`} data-testid={`footer-cat-${d.slug}`} className="hover:text-accent transition-colors duration-150">
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="leading-relaxed">Gurdev Nagar Estate Sahnewal, Dehlon Road, Paddi, Ludhiana, Punjab, India - 141206</li>
          <li>Email: <a href="mailto:sales@shrihaancastforge.com" className="text-slate-300 hover:text-accent transition-colors">sales@shrihaancastforge.com</a></li>
          <li>Phone: <a href="tel:+919115942100" className="text-slate-300 hover:text-accent transition-colors">+91-9115942100</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span data-testid="footer-copyright">© {new Date().getFullYear()} Shrihaan Cast &amp; Forge Private Limited. All Rights Reserved.</span>
        <span>Forging · Casting · Scaffolding · Shoring · Industrial Engineering Products</span>
      </div>
    </div>
  </footer>
);
