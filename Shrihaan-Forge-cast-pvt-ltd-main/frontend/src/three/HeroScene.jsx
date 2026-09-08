import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Sparkles } from '@react-three/drei';
import { PartsModel } from './ProductViewer';

const Spinning = () => {
  const g = useRef();
  useFrame((_, delta) => {
    if (g.current) g.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={g}>
      <PartsModel modelKey="ringlockVertical" mode="solid" />
    </group>
  );
};

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [1.7, 0.75, 2.1], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      shadows
      className="!absolute inset-0"
      data-testid="hero-3d-canvas"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 4]} intensity={2.1} castShadow shadow-mapSize={[1024, 1024]} />
        <spotLight position={[-5, 4, -4]} intensity={1.2} color="#fcd9b0" angle={0.6} penumbra={1} />
        <pointLight position={[0, 1.5, 5]} intensity={0.4} color="#dbeafe" />
        <Spinning />
        <Sparkles count={40} scale={[5, 3, 5]} size={1.6} speed={0.3} opacity={0.4} color="#d97706" position={[0, 0.3, 0]} />
        <ContactShadows position={[0, -0.95, 0]} opacity={0.6} scale={7} blur={2.4} far={2} />
      </Suspense>
    </Canvas>
  );
}
