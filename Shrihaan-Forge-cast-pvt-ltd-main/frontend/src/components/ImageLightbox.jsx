import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageLightbox = ({ images, index, onClose, onNavigate }) => {
  const [zoom, setZoom] = useState(1);
  useEffect(() => { setZoom(1); }, [index]);
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  if (index == null) return null;
  const many = images.length > 1;

  return (
    <div
      data-testid="image-lightbox"
      className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4" onClick={(e) => e.stopPropagation()}>
        <span className="text-slate-300 text-sm font-semibold">{index + 1} / {images.length}</span>
        <div className="flex items-center gap-2">
          <button data-testid="lightbox-zoom-in" onClick={() => setZoom((z) => Math.min(z + 0.5, 4))} className="text-white p-2 border border-white/20 rounded-sm hover:bg-white/10" aria-label="Zoom in">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button data-testid="lightbox-zoom-out" onClick={() => setZoom((z) => Math.max(z - 0.5, 1))} className="text-white p-2 border border-white/20 rounded-sm hover:bg-white/10" aria-label="Zoom out">
            <ZoomOut className="w-5 h-5" />
          </button>
          <button data-testid="lightbox-close" onClick={onClose} className="text-white p-2 border border-white/20 rounded-sm hover:bg-white/10" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[index]}
          alt="Product preview"
          data-testid="lightbox-image"
          style={{ transform: `scale(${zoom})` }}
          className="max-h-[80vh] max-w-full object-contain transition-transform duration-200 cursor-zoom-in bg-white"
          onClick={() => setZoom((z) => (z === 1 ? 2 : 1))}
        />
      </div>
      {many && (
        <div className="flex items-center justify-center gap-3 pb-6" onClick={(e) => e.stopPropagation()}>
          <button data-testid="lightbox-prev" onClick={() => onNavigate((index - 1 + images.length) % images.length)} className="text-white p-2.5 border border-white/20 rounded-sm hover:bg-white/10" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button data-testid="lightbox-next" onClick={() => onNavigate((index + 1) % images.length)} className="text-white p-2.5 border border-white/20 rounded-sm hover:bg-white/10" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
