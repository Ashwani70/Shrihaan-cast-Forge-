import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5">{label}</span>
    {children}
  </label>
);

const inputCls =
  'w-full border border-input bg-white px-3 py-2.5 text-sm rounded-sm outline-none transition-shadow duration-150 focus:ring-2 focus:ring-accent/60 focus:border-accent';

export const EnquiryModal = ({ open, onClose, product }) => {
  const empty = { name: '', company: '', country: '', email: '', phone: '', product: '', itemCode: '', quantity: '', message: '' };
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...empty, ...f, product: product?.name || '', itemCode: product?.itemCode || '' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Please provide your name and email.');
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/enquiries`, { ...form, source: product ? 'product-quote' : 'quote' });
      toast.success('Enquiry sent. Our team will get back to you shortly.');
      onClose();
      setForm(empty);
    } catch (err) {
      toast.error('Could not send enquiry. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-sm" data-testid="enquiry-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-primary">
            {product ? 'Request a Quote' : 'Request a Quote'}
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary">
            {product ? `${product.name} — ${product.itemCode}` : 'Tell us about your requirement and we will respond with pricing and availability.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2" data-testid="enquiry-form">
          <Field label="Name *"><input data-testid="enquiry-name" required className={inputCls} value={form.name} onChange={set('name')} /></Field>
          <Field label="Company Name"><input data-testid="enquiry-company" className={inputCls} value={form.company} onChange={set('company')} /></Field>
          <Field label="Country"><input data-testid="enquiry-country" className={inputCls} value={form.country} onChange={set('country')} /></Field>
          <Field label="Email *"><input data-testid="enquiry-email" required type="email" className={inputCls} value={form.email} onChange={set('email')} /></Field>
          <Field label="Phone / WhatsApp"><input data-testid="enquiry-phone" className={inputCls} value={form.phone} onChange={set('phone')} /></Field>
          <Field label="Quantity"><input data-testid="enquiry-quantity" className={inputCls} value={form.quantity} onChange={set('quantity')} /></Field>
          <Field label="Product"><input data-testid="enquiry-product" className={inputCls} value={form.product} onChange={set('product')} /></Field>
          <Field label="Item Code"><input data-testid="enquiry-item-code" className={inputCls} value={form.itemCode} onChange={set('itemCode')} /></Field>
          <div className="sm:col-span-2">
            <Field label="Message">
              <textarea data-testid="enquiry-message" rows={4} className={inputCls} value={form.message} onChange={set('message')} />
            </Field>
          </div>
          <button
            data-testid="enquiry-submit-btn"
            type="submit"
            disabled={sending}
            className="sm:col-span-2 bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-5 py-3 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-px hover:shadow-md disabled:opacity-60"
          >
            {sending ? 'Sending…' : 'Send Enquiry'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
