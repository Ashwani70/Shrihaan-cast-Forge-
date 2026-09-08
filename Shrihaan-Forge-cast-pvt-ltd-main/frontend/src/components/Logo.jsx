import React from 'react';

export const LogoMark = ({ className = 'h-10 w-auto' }) => (
  <img
    src="/logo-dark-header.png"
    alt="SHRIHAAN CAST & FORGE PVT. LTD."
    className={`object-contain ${className}`}
  />
);

export const Logo = ({ dark = false, className = '' }) => (
  <span className={`inline-flex items-center ${className}`}>
    <img
      src={dark ? '/logo-dark-header.png' : '/logo.png'}
      alt="SHRIHAAN CAST & FORGE PVT. LTD."
      className="h-10 sm:h-12 w-auto object-contain transition-opacity duration-200 hover:opacity-90"
    />
  </span>
);
