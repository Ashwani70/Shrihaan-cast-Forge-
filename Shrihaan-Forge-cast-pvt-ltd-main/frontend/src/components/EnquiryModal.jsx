import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

const API = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/api`;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s\-()]{7,25}$/;

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5">{label}</span>
    {children}
    {error && <span className="block text-xs text-red-600 font-medium mt-1">{error}</span>}
  </label>
);

const inputCls = (hasError) =>
  `w-full border ${
    hasError ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-accent/60 focus:border-accent'
  } bg-white px-3 py-2.5 text-sm rounded-sm outline-none transition-shadow duration-150 focus:ring-2`;

export const EnquiryModal = ({ open, onClose, product }) => {
  const empty = {
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    product: '',
    itemCode: '',
    quantity: '',
    message: '',
    hp_field: '',
  };

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  useEffect(() => {
    if (open) {
      setForm((f) => ({
        ...empty,
        ...f,
        product: product?.name || '',
        itemCode: product?.itemCode || '',
      }));
      setErrors({});
      setSubmittedMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product]);

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) {
      setErrors({ ...errors, [k]: null });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name || !form.name.trim()) {
      errs.name = 'Full Name is required';
    }
    if (!form.email || !form.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.phone || !form.phone.trim()) {
      errs.phone = 'Phone / WhatsApp Number is required';
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!form.product || !form.product.trim()) {
      errs.product = 'Product Name is required';
    }
    if (!form.message || !form.message.trim()) {
      errs.message = 'Requirements / Message is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();

    // Spam honeypot check
    if (form.hp_field && form.hp_field.trim() !== '') {
      onClose();
      return;
    }

    if (!validate()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    setSending(true);
    setSubmittedMessage('');

    try {
      await axios.post(`${API}/enquiries`, {
        name: form.name.trim(),
        company: form.company.trim(),
        country: form.country.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        product: form.product.trim(),
        itemCode: form.itemCode.trim(),
        quantity: form.quantity.trim(),
        message: form.message.trim(),
        source: product ? 'product-quote' : 'quote',
        hp_field: form.hp_field,
      });

      const successMsg = 'Thank you! Your quote request has been submitted successfully. Our sales team will contact you shortly.';
      toast.success(successMsg);
      setSubmittedMessage(successMsg);
      setForm(empty);

      setTimeout(() => {
        onClose();
        setSubmittedMessage('');
      }, 3000);
    } catch (err) {
      const errorMsg = 'Unable to send your enquiry right now. Please try again or contact sales@shrihaancastforge.com.';
      toast.error(errorMsg);
      setSubmittedMessage(errorMsg);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-sm" data-testid="enquiry-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-primary">
            Request a Quote
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary">
            {product ? `${product.name} — ${product.itemCode || ''}` : 'Tell us about your requirement and we will respond with pricing and availability.'}
          </DialogDescription>
        </DialogHeader>

        {submittedMessage ? (
          <div
            className={`p-4 my-2 text-sm rounded-sm ${
              submittedMessage.includes('Thank you')
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
            data-testid="submission-feedback"
          >
            {submittedMessage}
          </div>
        ) : null}

        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2" data-testid="enquiry-form" noValidate>
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="website_url_hp"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            value={form.hp_field}
            onChange={set('hp_field')}
          />

          <Field label="Full Name *" error={errors.name}>
            <input
              data-testid="enquiry-name"
              required
              className={inputCls(errors.name)}
              value={form.name}
              onChange={set('name')}
              placeholder="Your Full Name"
            />
          </Field>

          <Field label="Company Name">
            <input
              data-testid="enquiry-company"
              className={inputCls(false)}
              value={form.company}
              onChange={set('company')}
              placeholder="Company / Business Name"
            />
          </Field>

          <Field label="Country">
            <input
              data-testid="enquiry-country"
              className={inputCls(false)}
              value={form.country}
              onChange={set('country')}
              placeholder="e.g. India, USA, UAE"
            />
          </Field>

          <Field label="Email Address *" error={errors.email}>
            <input
              data-testid="enquiry-email"
              required
              type="email"
              className={inputCls(errors.email)}
              value={form.email}
              onChange={set('email')}
              placeholder="name@company.com"
            />
          </Field>

          <Field label="Phone / WhatsApp Number *" error={errors.phone}>
            <input
              data-testid="enquiry-phone"
              required
              className={inputCls(errors.phone)}
              value={form.phone}
              onChange={set('phone')}
              placeholder="+91-XXXXXXXXXX"
            />
          </Field>

          <Field label="Quantity">
            <input
              data-testid="enquiry-quantity"
              className={inputCls(false)}
              value={form.quantity}
              onChange={set('quantity')}
              placeholder="e.g. 500 Pcs, 2 Tons"
            />
          </Field>

          <Field label="Product Name *" error={errors.product}>
            <input
              data-testid="enquiry-product"
              required
              className={inputCls(errors.product)}
              value={form.product}
              onChange={set('product')}
              placeholder="Product Name"
            />
          </Field>

          <Field label="Item Code">
            <input
              data-testid="enquiry-item-code"
              className={inputCls(false)}
              value={form.itemCode}
              onChange={set('itemCode')}
              placeholder="e.g. RLS-VS-66-H"
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Message / Requirements *" error={errors.message}>
              <textarea
                data-testid="enquiry-message"
                required
                rows={4}
                className={inputCls(errors.message)}
                value={form.message}
                onChange={set('message')}
                placeholder="Specify requirements, drawings, or destination port..."
              />
            </Field>
          </div>

          <button
            data-testid="enquiry-submit-btn"
            type="submit"
            disabled={sending}
            className="sm:col-span-2 bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-5 py-3 rounded-sm transition-all duration-200 hover:bg-accent/90 hover:-translate-y-px hover:shadow-md disabled:opacity-60"
          >
            {sending ? 'Sending…' : 'SEND ENQUIRY'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

