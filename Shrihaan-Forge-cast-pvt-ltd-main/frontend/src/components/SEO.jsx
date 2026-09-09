import { useEffect } from 'react';

export const DOMAIN = 'https://www.shrihaancastforge.com';
export const COMPANY_NAME = 'Shrihaan Cast & Forge Private Limited';

export const DEFAULT_KEYWORDS =
  'Shrihaan Cast & Forge Private Limited, Precision Casting, Investment Casting, Steel Casting, Forging Components, Precision Forged Components, Industrial Components, Custom Casting, Custom Forging';

export function SEO({
  title = `${COMPANY_NAME} | Precision Casting & Forging Manufacturer`,
  description = `${COMPANY_NAME} is a precision casting and forging components manufacturer supplying high-quality industrial components for engineering, automotive, machinery and industrial applications.`,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = `${DOMAIN}/logo.png`,
  ogType = 'website',
  noindex = false,
  schema = null,
}) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Helper to set/update meta tag
    const setMeta = (nameAttr, nameVal, contentVal) => {
      let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('name', 'viewport', 'width=device-width, initial-scale=1');
    setMeta('name', 'theme-color', '#111827');

    // Open Graph Tags
    setMeta('property', 'og:site_name', COMPANY_NAME);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage}`;
    setMeta('property', 'og:image', resolvedOgImage);

    const currPath = window.location.pathname;
    const targetCanonical = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${DOMAIN}${canonical}`
      : `${DOMAIN}${currPath}`;
    setMeta('property', 'og:url', targetCanonical);

    // Twitter / X Meta Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', resolvedOgImage);

    // Canonical link tag
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', targetCanonical);

    // JSON-LD Schema
    const schemaId = 'seo-json-ld';
    let scriptEl = document.getElementById(schemaId);
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = schemaId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, keywords, canonical, ogImage, ogType, noindex, schema]);

  return null;
}

// Single clean Organization JSON-LD Schema
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${DOMAIN}/#organization`,
  name: 'Shrihaan Cast & Forge Private Limited',
  legalName: 'Shrihaan Cast & Forge Private Limited',
  url: `${DOMAIN}/`,
  logo: `${DOMAIN}/logo.png`,
  description:
    'Shrihaan Cast & Forge Private Limited is a manufacturer of precision casting and forging components for industrial and engineering applications.',
  telephone: '+91-9115942100',
  email: 'sales@shrihaancastforge.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gurdev Nagar Estate Sahnewal, Dehlon Road, Paddi',
    addressLocality: 'Ludhiana',
    addressRegion: 'Punjab',
    postalCode: '141206',
    addressCountry: 'IN',
  },
};

// WebSite JSON-LD Schema
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${DOMAIN}/#website`,
  name: 'Shrihaan Cast & Forge Private Limited',
  alternateName: 'Shrihaan Cast & Forge',
  url: `${DOMAIN}/`,
};
