import React from 'react';

export const LogoMark = ({ className = 'h-12 w-auto' }) => (
  <img
    src="/logo-dark-header.png?v=2"
    alt="SHRIHAAN CAST & FORGE PRIVATE LIMITED"
    className={`object-contain ${className}`}
  />
);

export const Logo = ({ dark = false, className = '' }) => (
  <span className="inline-flex items-center py-1">
    <span className="sr-only">SHRIHAAN CAST &amp; FORGE PRIVATE LIMITED</span>
    <img
      src={dark ? '/logo-dark-header.png?v=2' : '/logo.png?v=2'}
      alt="SHRIHAAN CAST & FORGE PRIVATE LIMITED"
      className={`h-11 sm:h-14 w-auto object-contain transition-all duration-200 hover:opacity-95 filter drop-shadow-sm ${className}`}
    />
  </span>
);

