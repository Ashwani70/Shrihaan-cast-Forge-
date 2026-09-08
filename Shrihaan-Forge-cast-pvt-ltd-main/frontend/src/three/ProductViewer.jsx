import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Edges, Html, Sparkles } from '@react-three/drei';
import { RotateCw, ZoomIn, ZoomOut, Grid3x3, Ruler, Maximize, RefreshCw, Layers, Camera } from 'lucide-react';
import { buildModel } from './models';

const useMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setM(mq.matches);
    const fn = (e) => setM(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return m;
};

const PartMesh = ({ part, mode, tRef }) => {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    const t = tRef.current;
    const ex = part.ex || [0, 0, 0];
    ref.current.position.set(part.p[0] + ex[0] * t, part.p[1] + ex[1] * t, part.p[2] + ex[2] * t);
  });
  const geo = useMemo(() => {
    switch (part.t) {
      case 'box': return <boxGeometry args={part.a} />;
      case 'torus': return <torusGeometry args={part.a} />;
      case 'sphere': return <sphereGeometry args={part.a} />;
      default: return <cylinderGeometry args={part.a} />;
    }
  }, [part]);
  return (
    <mesh
      ref={ref}
      position={part.p}
      rotation={part.r || [0, 0, 0]}
      quaternion={part.q || new THREE.Quaternion()}
      castShadow={mode === 'solid'}
      receiveShadow={mode === 'solid'}
    >
      {geo}
      {mode === 'cad' ? (
        <>
          <meshBasicMaterial color="#0b1220" />
          <Edges scale={1.02} color="#94a3b8" />
        </>
      ) : mode === 'wire' ? (
        <meshBasicMaterial color="#d97706" wireframe />
      ) : (
        <meshStandardMaterial color={part.c} metalness={part.metal ?? 0.88} roughness={part.rough ?? 0.34} />
      )}
    </mesh>
  );
};

export const PartsModel = ({ modelKey, params, mode = 'solid', exploded = false, rotateRef }) => {
  const data = useMemo(() => buildModel(modelKey, params), [modelKey, params]);
  const tRef = useRef(0);
  const group = useRef();
  useFrame(() => {
    tRef.current = THREE.MathUtils.lerp(tRef.current, exploded ? 1 : 0, 0.07);
  });
  if (!data) return null;
  const scale = 1.7 / data.fit;
  return (
    <group ref={group} scale={scale} position={[0, (-data.fit * scale) / 2, 0]}>
      {data.parts.map((p, i) => (
        <PartMesh key={i} part={p} mode={mode} tRef={tRef} />
      ))}
    </group>
  );
};

export const ImagePanel3D = ({ url, mode }) => {
  const tex = useLoader(THREE.TextureLoader, url);
  return (
    <group position={[0, -0.1, 0]}>
      <mesh castShadow={mode === 'solid'}>
        <boxGeometry args={[1.7, 1.3, 0.05]} />
        {mode === 'solid'
          ? <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.4} />
          : <meshBasicMaterial color="#0b1220" wireframe={mode === 'wire'} />}
        {mode === 'cad' && <Edges scale={1.02} color="#94a3b8" />}
      </mesh>
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[1.58, 1.2]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.0, 16]} />
        {mode === 'solid' ? <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.4} /> : <meshBasicMaterial color="#d97706" wireframe={mode === 'wire'} />}
      </mesh>
      <mesh position={[0, -1.66, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.04, 24]} />
        {mode === 'solid' ? <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.4} /> : <meshBasicMaterial color={mode === 'wire' ? '#d97706' : '#0b1220'} />}
      </mesh>
    </group>
  );
};

const LightRig = ({ mobile }) => (
  <>
    <ambientLight intensity={0.55} />
    <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow={!mobile} shadow-mapSize={[1024, 1024]} />
    <spotLight position={[-5, 4, -4]} intensity={1.1} color="#fcd9b0" angle={0.6} penumbra={1} />
    <pointLight position={[0, 2, 5]} intensity={0.35} color="#dbeafe" />
  </>
);

const CtrlBtn = ({ testid, onClick, active, label, children }) => (
  <button
    data-testid={testid}
    onClick={onClick}
    title={label}
    aria-label={label}
    className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider border transition-colors duration-200 rounded-sm ${
      active ? 'bg-accent text-white border-accent' : 'bg-white/5 text-slate-300 border-white/15 hover:bg-white/15 hover:text-white'
    }`}
  >
    {children}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default function ProductViewer({ modelKey, params, image, name, itemCode, specs = {}, cinematic = true, onQuote }) {
  const mobile = useMobile();
  const wrap = useRef(null);
  const controls = useRef(null);
  const [manualMode, setManualMode] = useState(null);
  const [rotate, setRotate] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [phase, setPhase] = useState(cinematic ? 0 : 3);

  useEffect(() => {
    if (!cinematic) return undefined;
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1900);
    const t3 = setTimeout(() => setPhase(3), 2900);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [cinematic, modelKey]);

  const mode = manualMode || (phase < 2 ? 'wire' : 'solid');
  const modelData = useMemo(() => (modelKey && modelKey !== 'imagePanel' ? buildModel(modelKey, params) : null), [modelKey, params]);
  const callouts = Object.entries(specs).slice(0, 4);

  const zoomBy = (f) => {
    const c = controls.current;
    if (!c) return;
    const cam = c.object;
    const dir = cam.position.clone().sub(c.target).multiplyScalar(f);
    cam.position.copy(c.target.clone().add(dir));
    c.update();
  };

  const fullscreen = () => {
    if (!document.fullscreenElement) wrap.current?.requestFullscreen?.();
    else document.exitFullscreen();
  };

  return (
    <div ref={wrap} className="relative blueprint-grid border border-white/10 overflow-hidden select-none" data-testid="product-3d-viewer" style={{ minHeight: 420 }}>
      {/* blueprint sweep overlay during cinematic */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-10"
        style={{ opacity: phase === 0 ? 1 : 0, background: 'radial-gradient(ellipse at 50% 45%, rgba(217,119,6,0.12), transparent 60%)' }}
      />
      <div className="absolute top-3 left-3 z-20 font-mono text-[10px] tracking-[0.18em] text-slate-400 uppercase">
        3D Visualization {itemCode ? `· ${itemCode}` : ''}
      </div>
      <div className="absolute top-3 right-3 z-20 font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase hidden sm:block">
        {name}
      </div>

      <Canvas
        dpr={mobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [2.6, 1.5, 2.6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        shadows={!mobile}
        className="!absolute inset-0"
        style={{ height: '100%', minHeight: 420 }}
      >
        <Suspense fallback={null}>
          <LightRig mobile={mobile} />
          {modelData ? (
            <PartsModel modelKey={modelKey} params={params} mode={mode} exploded={exploded} />
          ) : (
            image && <ImagePanel3D url={image} mode={mode} />
          )}
          {phase >= 1 && !mobile && <Sparkles count={26} scale={[4, 2.5, 4]} size={1.4} speed={0.25} opacity={0.35} color="#d97706" position={[0, 0.4, 0]} />}
          <ContactShadows position={[0, -0.95, 0]} opacity={0.55} scale={6} blur={2.2} far={2} />
          {mode !== 'solid' && <gridHelper args={[6, 24, '#d97706', '#1e293b']} position={[0, -0.94, 0]} />}
          {manualMode === 'wire' || manualMode === 'cad'
            ? callouts.map(([k, v], i) => (
                <Html key={k} position={[0.75, 0.7 - i * 0.42, 0]} className="pointer-events-none" zIndexRange={[10, 0]}>
                  <div className="flex items-center gap-2 -translate-x-full">
                    <span className="bg-primary/90 border border-accent/40 text-[10px] font-mono text-slate-200 px-2 py-1 whitespace-nowrap">
                      {k}: <span className="text-accent">{String(v).slice(0, 26)}</span>
                    </span>
                    <span className="w-6 h-px bg-accent" />
                  </div>
                </Html>
              ))
            : null}
          <OrbitControls
            ref={controls}
            makeDefault
            autoRotate={rotate && phase >= 2}
            autoRotateSpeed={1.4}
            enablePan
            minDistance={1.2}
            maxDistance={7}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Controls */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-1.5 px-2" data-testid="viewer-controls">
        <CtrlBtn testid="viewer-rotate-btn" label="Rotate" active={rotate} onClick={() => setRotate(!rotate)}><RotateCw className="w-3.5 h-3.5" /></CtrlBtn>
        <CtrlBtn testid="viewer-zoom-in-btn" label="Zoom +" onClick={() => zoomBy(0.8)}><ZoomIn className="w-3.5 h-3.5" /></CtrlBtn>
        <CtrlBtn testid="viewer-zoom-out-btn" label="Zoom −" onClick={() => zoomBy(1.25)}><ZoomOut className="w-3.5 h-3.5" /></CtrlBtn>
        <CtrlBtn testid="viewer-wireframe-btn" label="Wireframe" active={manualMode === 'wire'} onClick={() => setManualMode(manualMode === 'wire' ? null : 'wire')}><Grid3x3 className="w-3.5 h-3.5" /></CtrlBtn>
        <CtrlBtn testid="viewer-technical-btn" label="Technical" active={manualMode === 'cad'} onClick={() => setManualMode(manualMode === 'cad' ? null : 'cad')}><Ruler className="w-3.5 h-3.5" /></CtrlBtn>
        {modelData?.explode && (
          <CtrlBtn testid="viewer-exploded-btn" label="Exploded" active={exploded} onClick={() => setExploded(!exploded)}><Layers className="w-3.5 h-3.5" /></CtrlBtn>
        )}
        <CtrlBtn testid="viewer-reset-btn" label="Reset" onClick={() => { controls.current?.reset(); setManualMode(null); setExploded(false); }}><RefreshCw className="w-3.5 h-3.5" /></CtrlBtn>
        <CtrlBtn testid="viewer-fullscreen-btn" label="Fullscreen" onClick={fullscreen}><Maximize className="w-3.5 h-3.5" /></CtrlBtn>
      </div>

      {cinematic && phase >= 3 && onQuote && (
        <button
          data-testid="viewer-quote-btn"
          onClick={onQuote}
          className="absolute bottom-16 right-4 z-20 bg-accent text-white text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-sm shadow-lg transition-all duration-500 hover:bg-accent/90 animate-fade-up"
        >
          Request a Quote
        </button>
      )}
    </div>
  );
}
