import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { DIVISIONS } from '../data/products';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products', dropdown: true },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/industries', label: 'Industries' },
  { to: '/quality', label: 'Quality' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const Header = ({ onQuote }) => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const goAnchor = (anchor) => {
    setOpen(false);
    navigate('/');
    setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const linkCls = ({ isActive }) =>
    `text-[13px] font-semibold tracking-wide uppercase transition-colors duration-200 hover:text-accent ${
      isActive ? 'text-accent' : 'text-slate-200'
    }`;

  return (
    <header data-testid="site-header" className="sticky top-0 z-50 bg-primary/95 backdrop-blur-xl border-b border-white/10">
      <div className="bg-black/30 border-b border-white/5 py-1.5 text-xs text-slate-300">
        <div className="container-x flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <a href="tel:+919115942100" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>+91-9115942100</span>
            </a>
            <a href="mailto:sales@shrihaancastforge.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span>sales@shrihaancastforge.com</span>
            </a>
          </div>
          <div className="hidden md:block text-slate-400 text-[11px]">
            Gurdev Nagar Estate Sahnewal, Dehlon Road, Paddi, Ludhiana, Punjab, India - 141206
          </div>
        </div>
      </div>
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" data-testid="header-logo" aria-label="SHRIHAAN CAST & FORGE PVT. LTD. home">
          <Logo dark />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" data-testid="desktop-nav">
          {NAV.map((item) =>
            item.anchor ? (
              <button
                key={item.label}
                data-testid={`nav-${item.label.toLowerCase()}`}
                onClick={() => goAnchor(item.anchor)}
                className="text-[13px] font-semibold tracking-wide uppercase text-slate-200 transition-colors duration-200 hover:text-accent"
              >
                {item.label}
              </button>
            ) : item.dropdown ? (
              <div key={item.label} className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
                <NavLink to={item.to} data-testid="nav-products" className={linkCls}>
                  <span className="flex items-center gap-1">
                    Products <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </NavLink>
                {drop && (
                  <div className="absolute left-0 top-full pt-2 w-64" data-testid="products-dropdown">
                    <div className="bg-white border border-border shadow-xl py-2">
                      {DIVISIONS.map((d) => (
                        <Link
                          key={d.slug}
                          to={`/products/${d.slug}`}
                          data-testid={`dropdown-${d.slug}`}
                          onClick={() => setDrop(false)}
                          className="block px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-slate-50 hover:text-accent transition-colors duration-150"
                        >
                          {d.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={item.label} to={item.to} data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`} className={linkCls}>
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            data-testid="header-request-quote-btn"
            onClick={() => onQuote()}
            className="hidden sm:inline-flex items-center bg-accent text-accent-foreground text-[13px] font-bold uppercase tracking-wide px-5 py-2.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-px hover:shadow-md"
          >
            Request a Quote
          </button>
          <button
            data-testid="mobile-menu-btn"
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-primary border-t border-white/10" data-testid="mobile-menu">
          <div className="container-x py-4 flex flex-col gap-1">
            {NAV.map((item) =>
              item.anchor ? (
                <button
                  key={item.label}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  onClick={() => goAnchor(item.anchor)}
                  className="text-left py-2.5 text-sm font-semibold uppercase tracking-wide text-slate-200 hover:text-accent"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm font-semibold uppercase tracking-wide text-slate-200 hover:text-accent"
                >
                  {item.label}
                </Link>
              )
            )}
            <button
              data-testid="mobile-request-quote-btn"
              onClick={() => { setOpen(false); onQuote(); }}
              className="mt-2 bg-accent text-accent-foreground text-sm font-bold uppercase tracking-wide px-5 py-3 rounded-sm"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
