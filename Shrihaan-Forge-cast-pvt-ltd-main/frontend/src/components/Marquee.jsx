import React from 'react';

export const Marquee = ({ items, dark = true }) => {
  const row = [...items, ...items];
  return (
    <div
      data-testid="editorial-marquee"
      className={`overflow-hidden border-y select-none ${dark ? 'bg-[#0c1322] border-white/10' : 'bg-white border-border'}`}
    >
      <div className="marquee-track flex w-max items-center py-5">
        {row.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className={`font-heading font-extrabold uppercase tracking-[0.25em] text-sm md:text-base ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
              {item}
            </span>
            <span className="mx-8 w-2 h-2 rotate-45 bg-accent shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
};
