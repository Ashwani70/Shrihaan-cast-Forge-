import { useEffect } from 'react';

export const DOMAIN = 'https://www.shrihaancastforge.com';

export const DEFAULT_KEYWORDS =
  'forging manufacturer in India, steel forging manufacturer, forging company in India, industrial forging manufacturer, precision forging manufacturer, forged components manufacturer, custom forging manufacturer, steel forging parts, automotive forging components, engineering forging components, closed die forging, open die forging, precision forged components, industrial forged parts, forged steel components, forging supplier India, forging exporter India';

export function SEO({
  title = 'Forging Manufacturer in India | Shrihaan Cast & Forge Pvt. Ltd.',
  description = 'SHRIHAAN CAST & FORGE PVT. LTD. is a leading forging manufacturer in India producing precision forged steel components, industrial forgings, scaffolding systems, and tractor components for domestic and international B2B markets.',
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
    setMeta('name', 'theme-color', '#0f172a');

    // Open Graph Tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage}`);

    const currPath = window.location.pathname;
    const targetCanonical = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${DOMAIN}${canonical}`
      : `${DOMAIN}${currPath}`;
    setMeta('property', 'og:url', targetCanonical);

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

// Global Organization & LocalBusiness JSON-LD Schema
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${DOMAIN}/#organization`,
  name: 'Shrihaan Cast & Forge Pvt. Ltd.',
  legalName: 'Shrihaan Cast & Forge Private Limited',
  url: DOMAIN,
  logo: `${DOMAIN}/logo.png`,
  image: `${DOMAIN}/logo.png`,
  description:
    'Leading manufacturer and exporter of precision forged steel components, industrial forgings, scaffolding systems, formwork accessories, and agricultural tractor components in India.',
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.8016,
    longitude: 75.973,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:30',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  sameAs: [],
  priceRange: '$$$',
};
