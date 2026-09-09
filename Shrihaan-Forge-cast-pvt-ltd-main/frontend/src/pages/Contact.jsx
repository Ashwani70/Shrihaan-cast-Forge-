import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { MapPin, Mail, Phone, Clock, Globe } from 'lucide-react';
import { SEO, DOMAIN, ORGANIZATION_SCHEMA } from '../components/SEO';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  'w-full border border-input bg-white px-3 py-2.5 text-sm rounded-sm outline-none transition-shadow duration-150 focus:ring-2 focus:ring-accent/60 focus:border-accent';

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5">{label}</span>
    {children}
  </label>
);

export default function Contact({ onQuote }) {
  const empty = { name: '', company: '', country: '', email: '', phone: '', product: '', quantity: '', message: '' };
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Please provide your name and email.');
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/enquiries`, { ...form, source: 'contact' });
      toast.success('Enquiry sent. Our team will get back to you shortly.');
      setForm(empty);
    } catch {
      toast.error('Could not send enquiry. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'ContactPage',
        '@id': `${DOMAIN}/contact#webpage`,
        url: `${DOMAIN}/contact`,
        name: 'Contact Forging Manufacturer in India | Shrihaan Cast & Forge',
        description:
          'Contact Shrihaan Cast & Forge Pvt. Ltd. manufacturing unit in Ludhiana, Punjab, India for technical enquiries, custom forging quotes, and export orders.',
      },
    ],
  };

  return (
    <div data-testid="contact-page">
      <SEO
        title="Contact Forging Manufacturer in India | Shrihaan Cast & Forge"
        description="Get in touch with Shrihaan Cast & Forge Pvt. Ltd. in Ludhiana, Punjab, India for B2B enquiries, custom forging solutions, scaffolding product pricing, and international export orders."
        keywords="Contact Shrihaan Cast & Forge, forging supplier contact Ludhiana, steel forging quote, scaffolding manufacturer address Ludhiana Punjab, export enquiry forging"
        canonical="/contact"
        schema={schema}
      />

      <div className="bg-primary">
        <div className="container-x py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Contact &amp; Location</span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl md:text-4xl text-white">
            Contact SHRIHAAN CAST &amp; FORGE PVT. LTD.
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl text-sm md:text-base">
            Send us your product requirements, quantities and destination — our engineering team will respond with specifications, pricing and lead times.
          </p>
        </div>
      </div>

      <div className="section-pad bg-white">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white border border-border p-6 md:p-8">
            <h2 className="font-heading font-bold text-xl text-primary mb-6">Send an Enquiry</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="contact-form">
              <Field label="Name *"><input data-testid="contact-name" required className={inputCls} value={form.name} onChange={set('name')} /></Field>
              <Field label="Company"><input data-testid="contact-company" className={inputCls} value={form.company} onChange={set('company')} /></Field>
              <Field label="Country"><input data-testid="contact-country" className={inputCls} value={form.country} onChange={set('country')} /></Field>
              <Field label="Email *"><input data-testid="contact-email" required type="email" className={inputCls} value={form.email} onChange={set('email')} /></Field>
              <Field label="Phone / WhatsApp"><input data-testid="contact-phone" className={inputCls} value={form.phone} onChange={set('phone')} /></Field>
              <Field label="Quantity"><input data-testid="contact-quantity" className={inputCls} value={form.quantity} onChange={set('quantity')} /></Field>
              <div className="sm:col-span-2">
                <Field label="Product Interest"><input data-testid="contact-product" className={inputCls} placeholder="e.g. Ringlock System, Steel Props, Couplers, Tractor Parts…" value={form.product} onChange={set('product')} /></Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Message"><textarea data-testid="contact-message" rows={5} className={inputCls} value={form.message} onChange={set('message')} /></Field>
              </div>
              <div className="sm:col-span-2 flex flex-wrap gap-3">
                <button
                  data-testid="contact-send-enquiry-btn"
                  type="submit"
                  disabled={sending}
                  className="bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Send Enquiry'}
                </button>
                <button
                  data-testid="contact-request-quote-btn"
                  type="button"
                  onClick={() => onQuote()}
                  className="border border-primary text-primary font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-sm transition-colors duration-200 hover:bg-primary hover:text-white"
                >
                  Request Quote
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-5">
            <div className="bg-primary p-7 text-slate-300 rounded-sm" data-testid="contact-info-card">
              <h3 className="font-heading font-bold text-white text-lg">Head Office &amp; Works</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3"><MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span>Gurdev Nagar Estate Sahnewal, Dehlon Road, Paddi, Ludhiana, Punjab, India - 141206</span></li>
                <li className="flex gap-3"><Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" /><a href="mailto:sales@shrihaancastforge.com" className="hover:text-accent transition-colors">sales@shrihaancastforge.com</a></li>
                <li className="flex gap-3"><Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" /><a href="tel:+919115942100" className="hover:text-accent transition-colors">+91-9115942100</a></li>
                <li className="flex gap-3"><Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span>Monday – Saturday: 9:00 AM – 6:30 PM (IST)</span></li>
                <li className="flex gap-3"><Globe className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span>Supply Areas: All India + Export to Europe, Americas, Middle East &amp; Asia</span></li>
              </ul>
            </div>
            <div className="bg-white border border-border p-7 rounded-sm">
              <h3 className="font-heading font-bold text-primary">For Faster Quotes</h3>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Include the item code from our catalogue, required quantity and destination country. Item codes are listed on every product page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
