import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Logo } from '../components/Logo';
import { Trash2, LogOut, RefreshCw } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = 'shrihaan_admin_token';

const STATUS_STYLES = {
  new: 'bg-accent/15 text-accent border-accent/40',
  contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/40',
  closed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40',
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState('all');

  const load = async (t = token) => {
    try {
      const { data } = await axios.get(`${API}/enquiries`, { headers: { Authorization: `Bearer ${t}` } });
      setRows(data);
    } catch {
      setToken(null);
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  useEffect(() => { if (token) load(token); }, [token]);

  const login = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post(`${API}/auth/login`, form);
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
    } catch (err) {
      const d = err.response?.data?.detail;
      setError(typeof d === 'string' ? d : 'Login failed');
    }
  };

  const setStatus = async (id, status) => {
    await axios.patch(`${API}/enquiries/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success(`Marked as ${status}`);
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    await axios.delete(`${API}/enquiries/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setRows((r) => r.filter((x) => x.id !== id));
    toast.success('Enquiry deleted');
  };

  if (!token) {
    return (
      <div className="min-h-[70vh] bg-[#0b1220] flex items-center justify-center px-4" data-testid="admin-login-page">
        <form onSubmit={login} className="w-full max-w-sm bg-primary border border-white/10 p-8" data-testid="admin-login-form">
          <Logo dark />
          <h1 className="mt-6 font-heading font-bold text-white text-lg">Enquiry Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Restricted access — authorized team only.</p>
          <input
            data-testid="admin-email"
            type="email" required placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-6 w-full bg-white/5 border border-white/15 text-white px-3 py-2.5 text-sm rounded-sm outline-none focus:ring-2 focus:ring-accent/60"
          />
          <input
            data-testid="admin-password"
            type="password" required placeholder="Password"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-3 w-full bg-white/5 border border-white/15 text-white px-3 py-2.5 text-sm rounded-sm outline-none focus:ring-2 focus:ring-accent/60"
          />
          {error && <p className="mt-3 text-xs text-red-400" data-testid="admin-login-error">{error}</p>}
          <button data-testid="admin-login-btn" className="mt-5 w-full bg-accent text-white font-bold uppercase tracking-wide text-sm py-3 rounded-sm hover:bg-accent/90 transition-colors duration-150">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  const shown = rows?.filter((r) => filter === 'all' || (r.status || 'new') === filter);
  const counts = rows ? {
    all: rows.length,
    new: rows.filter((r) => !r.status || r.status === 'new').length,
    contacted: rows.filter((r) => r.status === 'contacted').length,
    closed: rows.filter((r) => r.status === 'closed').length,
  } : {};

  return (
    <div className="min-h-screen bg-[#0b1220]" data-testid="admin-dashboard">
      <div className="container-x py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-white">Enquiry Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">All incoming quote requests and contact enquiries.</p>
          </div>
          <div className="flex gap-2">
            <button data-testid="admin-refresh-btn" onClick={() => load()} className="inline-flex items-center gap-2 border border-white/20 text-slate-300 text-xs font-bold uppercase px-4 py-2.5 rounded-sm hover:bg-white/10">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              data-testid="admin-logout-btn"
              onClick={() => { localStorage.removeItem(TOKEN_KEY); setToken(null); setRows(null); }}
              className="inline-flex items-center gap-2 border border-white/20 text-slate-300 text-xs font-bold uppercase px-4 py-2.5 rounded-sm hover:bg-white/10"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5" data-testid="admin-filters">
          {['all', 'new', 'contacted', 'closed'].map((s) => (
            <button
              key={s}
              data-testid={`admin-filter-${s}`}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider border rounded-sm ${filter === s ? 'bg-accent text-white border-accent' : 'bg-white/5 text-slate-400 border-white/15 hover:text-white'}`}
            >
              {s} ({counts[s] ?? 0})
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto border border-white/10">
          <table className="w-full text-sm min-w-[1000px]" data-testid="admin-enquiries-table">
            <thead>
              <tr className="bg-primary text-left">
                {['Date', 'Name', 'Company / Country', 'Contact', 'Product', 'Qty', 'Message', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!shown ? (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-slate-500">Loading…</td></tr>
              ) : shown.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-slate-500" data-testid="admin-empty">No enquiries yet.</td></tr>
              ) : (
                shown.map((r) => (
                  <tr key={r.id} className="border-t border-white/5 text-slate-300 align-top hover:bg-white/[0.03]" data-testid={`admin-row-${r.id}`}>
                    <td className="px-4 py-3 text-xs whitespace-nowrap">{r.timestamp ? new Date(r.timestamp).toLocaleString() : '-'}</td>
                    <td className="px-4 py-3 font-semibold text-white">{r.name}</td>
                    <td className="px-4 py-3 text-xs">{r.company || '-'}<br /><span className="text-slate-500">{r.country || '-'}</span></td>
                    <td className="px-4 py-3 text-xs">{r.email}<br /><span className="text-slate-500">{r.phone || '-'}</span></td>
                    <td className="px-4 py-3 text-xs">{r.product || 'General'}<br /><span className="font-mono text-accent">{r.itemCode || ''}</span></td>
                    <td className="px-4 py-3 text-xs">{r.quantity || '-'}</td>
                    <td className="px-4 py-3 text-xs max-w-[220px]">{r.message || '-'}</td>
                    <td className="px-4 py-3">
                      <select
                        data-testid={`admin-status-${r.id}`}
                        value={r.status || 'new'}
                        onChange={(e) => setStatus(r.id, e.target.value)}
                        className={`text-[11px] font-bold uppercase border px-2 py-1.5 rounded-sm bg-transparent outline-none ${STATUS_STYLES[r.status || 'new']}`}
                      >
                        <option value="new" className="text-black">New</option>
                        <option value="contacted" className="text-black">Contacted</option>
                        <option value="closed" className="text-black">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button data-testid={`admin-delete-${r.id}`} onClick={() => remove(r.id)} className="text-slate-500 hover:text-red-400 transition-colors" aria-label="Delete enquiry">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
