import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const QUICK_PROMPTS = [
  'Which screw jack suits a 600 mm height?',
  'What Ringlock ledger sizes do you have?',
  'Show me forged coupler item codes',
];

export const ChatWidget = ({ onQuote }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const listRef = useRef(null);
  const sessionRef = useRef(null);

  if (!sessionRef.current) {
    sessionRef.current = localStorage.getItem('shrihaan_chat_session') || (() => {
      const id = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem('shrihaan_chat_session', id);
      return id;
    })();
  }

  useEffect(() => {
    if (open && messages.length === 0) {
      fetch(`${API}/assistant/history/${sessionRef.current}`)
        .then((r) => r.json())
        .then((rows) => setMessages(rows.map((r) => ({ role: r.role, text: r.text }))))
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || streaming) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: msg }, { role: 'assistant', text: '' }]);
    setStreaming(true);
    try {
      const res = await fetch(`${API}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionRef.current, message: msg }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const events = buf.split('\n\n');
        buf = events.pop();
        for (const ev of events) {
          if (!ev.startsWith('data: ')) continue;
          const payload = ev.slice(6);
          if (payload === '[DONE]') continue;
          try {
            const { t } = JSON.parse(payload);
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { role: 'assistant', text: copy[copy.length - 1].text + t };
              return copy;
            });
          } catch {}
        }
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: 'assistant', text: 'Connection issue — please try again or use Request a Quote.' };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      <motion.button
        data-testid="ai-assistant-btn"
        onClick={() => setOpen(!open)}
        aria-label="AI Product Assistant"
        className="fixed bottom-6 left-6 z-[90] flex items-center gap-2 bg-primary text-white pl-3.5 pr-4 py-3.5 rounded-full shadow-xl border border-white/15"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5 text-accent" />}
        <span className="text-xs font-bold uppercase tracking-wide hidden sm:inline">{open ? 'Close' : 'Product Assistant'}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="ai-assistant-panel"
            className="fixed bottom-24 left-4 sm:left-6 z-[90] w-[calc(100vw-2rem)] max-w-[400px] bg-white border border-border shadow-2xl flex flex-col overflow-hidden rounded-sm"
            style={{ height: 'min(560px, calc(100vh - 8rem))' }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-primary px-4 py-3.5 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <div>
                <p className="text-white font-heading font-bold text-sm leading-none">AI Product Assistant</p>
                <p className="text-slate-400 text-[10px] mt-1">Answers from the official catalogue only</p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50" data-testid="ai-assistant-messages">
              {messages.length === 0 && (
                <div className="text-center pt-6">
                  <p className="text-sm font-semibold text-primary">Ask about any catalogue product</p>
                  <p className="text-xs text-secondary mt-1 px-6">Sizes, item codes, materials, finishes — grounded in the SHRIHAAN catalogue. Pricing via Request a Quote.</p>
                  <div className="mt-4 space-y-2 px-2">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q}
                        data-testid={`quick-prompt-${QUICK_PROMPTS.indexOf(q)}`}
                        onClick={() => send(q)}
                        className="block w-full text-left text-xs bg-white border border-border px-3 py-2.5 rounded-sm hover:border-accent hover:text-accent transition-colors duration-150"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap rounded-sm ${
                      m.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-border text-foreground'
                    }`}
                  >
                    {m.text || (streaming && i === messages.length - 1 ? <span className="inline-block w-2 h-4 bg-accent/60 animate-pulse" /> : '')}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-3 bg-white">
              <div className="flex gap-2">
                <input
                  data-testid="ai-assistant-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Ask about products, sizes, item codes…"
                  className="flex-1 border border-input px-3 py-2.5 text-sm rounded-sm outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent"
                />
                <button
                  data-testid="ai-assistant-send-btn"
                  onClick={() => send()}
                  disabled={streaming}
                  className="bg-accent text-white px-4 rounded-sm hover:bg-accent/90 transition-colors duration-150 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <button data-testid="ai-assistant-quote-link" onClick={() => { setOpen(false); onQuote(); }} className="mt-2 text-[11px] font-bold uppercase tracking-wide text-accent hover:text-accent/80">
                Need pricing? Request a Quote →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
