import React, { useEffect, useState, Suspense, lazy } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Lenis from 'lenis';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EnquiryModal } from '@/components/EnquiryModal';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ChatWidget } from '@/components/ChatWidget';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Products from '@/pages/Products';
import SectionRouter from '@/pages/SectionRouter';
import ProductDetail from '@/pages/ProductDetail';
import Catalogue from '@/pages/Catalogue';
import Contact from '@/pages/Contact';
import TractorParts from '@/pages/TractorParts';
import TractorPartDetail from '@/pages/TractorPartDetail';

import Capabilities from '@/pages/Capabilities';
import Industries from '@/pages/Industries';
import Quality from '@/pages/Quality';
import { SEO } from '@/components/SEO';

const Admin = lazy(() => import('@/pages/Admin'));

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.includes('#')) window.scrollTo(0, 0);
    if (window.gtag) window.gtag('event', 'page_view', { page_path: pathname });
  }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="container-x py-24 text-center" data-testid="not-found-page">
    <SEO title="Page Not Found | Shrihaan Cast & Forge Pvt. Ltd." description="The page you are looking for could not be found." noindex={true} />
    <h1 className="font-heading font-extrabold text-4xl text-primary">404</h1>
    <p className="mt-3 text-secondary">The page you are looking for does not exist.</p>
  </div>
);

function App() {
  const [quote, setQuote] = useState({ open: false, product: null });
  const openQuote = (product = null) => setQuote({ open: true, product });
  const closeQuote = () => setQuote({ open: false, product: null });

  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
        <SmoothScroll />
        <ScrollToTop />
        <Header onQuote={openQuote} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onQuote={openQuote} />} />
            <Route path="/about" element={<About onQuote={openQuote} />} />
            <Route path="/capabilities" element={<Capabilities onQuote={openQuote} />} />
            <Route path="/industries" element={<Industries onQuote={openQuote} />} />
            <Route path="/quality" element={<Quality onQuote={openQuote} />} />
            <Route path="/products" element={<Products onQuote={openQuote} />} />
            <Route path="/products/:section" element={<SectionRouter onQuote={openQuote} />} />
            <Route path="/products/:categorySlug/:productSlug" element={<ProductDetail onQuote={openQuote} />} />
            <Route path="/tractor-parts" element={<TractorParts onQuote={openQuote} />} />
            <Route path="/tractor-parts/:slug" element={<TractorPartDetail onQuote={openQuote} />} />
            <Route path="/catalogue" element={<Catalogue onQuote={openQuote} />} />
            <Route path="/contact" element={<Contact onQuote={openQuote} />} />
            <Route path="/admin" element={<Suspense fallback={null}><SEO title="Admin | Shrihaan Cast & Forge" noindex={true} /><Admin /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer onQuote={openQuote} />
        <EnquiryModal open={quote.open} product={quote.product} onClose={closeQuote} />
        <WhatsAppButton />
        <ChatWidget onQuote={openQuote} />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
