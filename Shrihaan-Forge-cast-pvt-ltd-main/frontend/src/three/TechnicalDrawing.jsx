import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import { PartsModel } from './ProductViewer';
import { buildModel } from './models';

const VIEWS = {
  FRONT: { pos: [0, 0, 6], up: [0, 1, 0] },
  SIDE: { pos: [6, 0, 0], up: [0, 1, 0] },
  TOP: { pos: [0, 6, 0.001], up: [0, 0, -1] },
  ISOMETRIC: { pos: [3.4, 2.6, 3.4], up: [0, 1, 0] },
};

const ZoomFit = ({ fit }) => {
  const { camera, size } = useThree();
  useEffect(() => {
    const scale = 1.7 / fit;
    camera.zoom = size.height / (fit * scale * 1.45);
    camera.updateProjectionMatrix();
  }, [camera, size, fit]);
  return null;
};

export default function TechnicalDrawing({ modelKey, params, itemCode, specs = {} }) {
  const [view, setView] = useState('FRONT');
  const modelData = useMemo(() => (modelKey && modelKey !== 'imagePanel' ? buildModel(modelKey, params) : null), [modelKey, params]);
  const dimEntries = Object.entries(specs).filter(([k]) => /length|size|width|od|plate|height/i.test(k));

  return (
    <div data-testid="technical-drawing" className="border border-white/10 blueprint-grid relative overflow-hidden" style={{ minHeight: 380 }}>
      <div className="absolute top-3 left-3 z-20 font-mono text-[10px] tracking-[0.18em] text-slate-400 uppercase">
        Technical Drawing {itemCode ? `· ${itemCode}` : ''}
      </div>
      <div className="absolute top-3 right-3 z-20 flex gap-1">
        {Object.keys(VIEWS).map((v) => (
          <button
            key={v}
            data-testid={`cad-view-${v.toLowerCase()}`}
            onClick={() => setView(v)}
            className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-sm transition-colors duration-150 ${
              view === v ? 'bg-accent text-white border-accent' : 'bg-white/5 text-slate-400 border-white/15 hover:text-white'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {modelData ? (
        <Canvas key={view} gl={{ antialias: true, alpha: true }} style={{ height: 380 }}>
          <Suspense fallback={null}>
            <OrthographicCamera makeDefault position={VIEWS[view].pos} up={VIEWS[view].up} near={-10} far={50} />
            <ZoomFit fit={modelData.fit} />
            <PartsModel modelKey={modelKey} params={params} mode="cad" />
            <OrbitControls enableRotate={false} enableZoom enablePan={false} makeDefault />
          </Suspense>
        </Canvas>
      ) : (
        <div className="h-[380px] flex items-center justify-center">
          <p className="font-mono text-xs text-slate-400 uppercase tracking-[0.18em]">Technical drawing available on request</p>
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 z-20 bg-primary/85 backdrop-blur border-t border-white/10 px-4 py-2.5 flex flex-wrap items-center gap-x-5 gap-y-1">
        {dimEntries.length > 0 ? (
          dimEntries.slice(0, 4).map(([k, v]) => (
            <span key={k} className="font-mono text-[10px] text-slate-300 uppercase tracking-wider">
              {k}: <span className="text-accent">{String(v).slice(0, 40)}</span>
            </span>
          ))
        ) : (
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Dimensions available on request</span>
        )}
      </div>
    </div>
  );
}
