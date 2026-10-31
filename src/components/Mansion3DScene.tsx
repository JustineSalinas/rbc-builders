"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Architectural Color Palette matching RBC Builders brand
const CONCRETE_CORE = "#8f897f";
const CONCRETE_PLINTH = "#a39d93";
const REBAR_BRONZE = "#9a7442";
const WALL_STUCCO = "#f0ebe1";
const WALL_STONE = "#b5a895";
const TIMBER_SLAT = "#7a4e26";
const TIMBER_DOOR = "#3b2210";
const ANALOK_BRONZE = "#443425";
const GLASS_CLEAR = "#a3c8d6";
const GLASS_BRONZE = "#879fa8";
const ROOF_FASCIA = "#2a2622";
const GOLD_ACCENT = "#c99a4c";
const POOL_WATER = "#2d98a8";
const GRASS_TERRACE = "#637352";

function MansionModel({ stage }: { stage: number }) {
  const group = useRef<THREE.Group>(null);

  // References for stage elements
  const foundationRef = useRef<THREE.Group>(null);
  const rebarRef = useRef<THREE.Group>(null);
  const wallsRef = useRef<THREE.Group>(null);
  const standardWindowsRef = useRef<THREE.Group>(null);
  const premiumSlatsRef = useRef<THREE.Group>(null);
  const stoneColumnRef = useRef<THREE.Group>(null);
  const luxuryCantileverRef = useRef<THREE.Group>(null);
  const poolRef = useRef<THREE.Group>(null);
  const lightsRef = useRef<THREE.Group>(null);

  // Smooth animation helper
  const animateScaleY = (ref: { current: THREE.Object3D | null }, visible: boolean, speed = 8) => {
    if (!ref.current) return;
    const targetY = visible ? 1 : 0;
    const currentY = ref.current.scale.y;
    ref.current.scale.y = THREE.MathUtils.damp(currentY, targetY, speed, 1 / 30);
    ref.current.visible = ref.current.scale.y > 0.01;
  };

  const animateScaleAll = (ref: { current: THREE.Object3D | null }, visible: boolean, speed = 8) => {
    if (!ref.current) return;
    const target = visible ? 1 : 0;
    const current = ref.current.scale.x;
    const next = THREE.MathUtils.damp(current, target, speed, 1 / 30);
    ref.current.scale.set(next, next, next);
    ref.current.visible = next > 0.01;
  };

  useFrame(() => {
    // 01: Core structure always visible
    animateScaleAll(foundationRef, true, 10);
    animateScaleY(rebarRef, stage < 2, 7);

    // 02: Standard turnkey walls & basic windows
    animateScaleY(wallsRef, stage >= 2, 6);
    animateScaleAll(standardWindowsRef, stage >= 2 && stage < 3, 8);

    // 03: Premium wood slats, stone accents, heavy bronze fenestration
    animateScaleAll(premiumSlatsRef, stage >= 3, 7);
    animateScaleAll(stoneColumnRef, stage >= 3, 7);

    // 04: Luxury cantilever roof extension, panoramic glass, pool & brass details
    animateScaleAll(luxuryCantileverRef, stage >= 4, 6);
    animateScaleAll(poolRef, stage >= 4, 7);
    animateScaleAll(lightsRef, stage >= 3, 6);
  });

  // Reusable materials
  const concreteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: CONCRETE_CORE, roughness: 0.9 }), []);
  const plinthMat = useMemo(() => new THREE.MeshStandardMaterial({ color: CONCRETE_PLINTH, roughness: 0.95 }), []);
  const stuccoMat = useMemo(() => new THREE.MeshStandardMaterial({ color: WALL_STUCCO, roughness: 0.8 }), []);
  const rebarMat = useMemo(() => new THREE.MeshStandardMaterial({ color: REBAR_BRONZE, metalness: 0.7, roughness: 0.3 }), []);
  const timberMat = useMemo(() => new THREE.MeshStandardMaterial({ color: TIMBER_SLAT, roughness: 0.65 }), []);
  const stoneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: WALL_STONE, roughness: 0.95 }), []);
  const bronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: ANALOK_BRONZE, metalness: 0.8, roughness: 0.25 }), []);
  const roofMat = useMemo(() => new THREE.MeshStandardMaterial({ color: ROOF_FASCIA, roughness: 0.4 }), []);
  const glassClearMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: GLASS_CLEAR, roughness: 0.05, transmission: 0.6, transparent: true, opacity: 0.85 }),
    []
  );
  const glassBronzeMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: GLASS_BRONZE, roughness: 0.05, transmission: 0.5, transparent: true, opacity: 0.9 }),
    []
  );
  const poolWaterMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: POOL_WATER, roughness: 0.05, transmission: 0.85, transparent: true, opacity: 0.9 }),
    []
  );
  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD_ACCENT, metalness: 0.85, roughness: 0.2 }), []);

  return (
    <group ref={group} position={[0, -0.65, 0]} rotation={[0, -Math.PI / 5.5, 0]}>
      {/* ============================================================== */}
      {/* 01. BARE SHELL (STAGE 1+): Foundation, Concrete Columns, Beams */}
      {/* ============================================================== */}
      <group ref={foundationRef}>
        {/* Ground Foundation Slab & Site Terrace */}
        <mesh position={[0, 0.04, 0]} receiveShadow>
          <boxGeometry args={[4.4, 0.1, 3.4]} />
          <primitive object={plinthMat} attach="material" />
        </mesh>

        {/* First Floor Concrete Slab Plinth */}
        <mesh position={[-0.2, 0.12, 0.1]} receiveShadow>
          <boxGeometry args={[3.2, 0.08, 2.4]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>

        {/* 6 Structural Columns on Ground Floor */}
        {[
          [-1.6, 0.75, 1.2],
          [-0.2, 0.75, 1.2],
          [1.2, 0.75, 1.2],
          [-1.6, 0.75, -1.0],
          [-0.2, 0.75, -1.0],
          [1.2, 0.75, -1.0],
        ].map(([x, y, z], idx) => (
          <mesh key={`col-gf-${idx}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.18, 1.2, 0.18]} />
            <primitive object={concreteMat} attach="material" />
          </mesh>
        ))}

        {/* First Floor Tie-Beams (Connecting Columns) */}
        <mesh position={[-0.2, 1.35, 1.2]} castShadow>
          <boxGeometry args={[3.0, 0.16, 0.18]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[-0.2, 1.35, -1.0]} castShadow>
          <boxGeometry args={[3.0, 0.16, 0.18]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[-1.6, 1.35, 0.1]} castShadow>
          <boxGeometry args={[0.18, 0.16, 2.2]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[1.2, 1.35, 0.1]} castShadow>
          <boxGeometry args={[0.18, 0.16, 2.2]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>

        {/* Second Floor Cantilevered Concrete Floor Plate */}
        <mesh position={[-0.35, 1.45, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[3.5, 0.12, 2.7]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>

        {/* Second Floor 6 Structural Columns */}
        {[
          [-1.9, 2.05, 1.35],
          [-0.35, 2.05, 1.35],
          [1.2, 2.05, 1.35],
          [-1.9, 2.05, -1.0],
          [-0.35, 2.05, -1.0],
          [1.2, 2.05, -1.0],
        ].map(([x, y, z], idx) => (
          <mesh key={`col-2f-${idx}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.16, 1.15, 0.16]} />
            <primitive object={concreteMat} attach="material" />
          </mesh>
        ))}

        {/* Roof Tie-Beams & Flat Concrete Roof Slab */}
        <mesh position={[-0.35, 2.65, 0.15]} castShadow>
          <boxGeometry args={[3.7, 0.14, 2.9]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
      </group>

      {/* Exposed Rebar Dowels (Highlighted at Stage 1) */}
      <group ref={rebarRef}>
        {[
          [-1.9, 2.75, 1.35],
          [-0.35, 2.75, 1.35],
          [1.2, 2.75, 1.35],
          [-1.9, 2.75, -1.0],
          [1.2, 2.75, -1.0],
        ].map(([x, y, z], idx) => (
          <group key={`rebar-${idx}`} position={[x, y, z]}>
            <mesh position={[-0.04, 0.1, -0.04]}>
              <cylinderGeometry args={[0.012, 0.012, 0.22, 6]} />
              <primitive object={rebarMat} attach="material" />
            </mesh>
            <mesh position={[0.04, 0.1, 0.04]}>
              <cylinderGeometry args={[0.012, 0.012, 0.22, 6]} />
              <primitive object={rebarMat} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 02. STANDARD ENCLOSURE (STAGE 2+): Plaster Walls & Basic Fenestration */}
      {/* ============================================================== */}
      <group ref={wallsRef} position={[0, 0.12, 0]}>
        {/* Ground Floor Exterior Plaster Walls */}
        <mesh position={[-0.9, 0.65, 1.15]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.1, 0.14]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-1.55, 0.65, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 1.1, 2.1]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-0.2, 0.65, -0.95]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 1.1, 0.14]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        {/* Porte-cochère column support */}
        <mesh position={[1.4, 0.65, 1.15]} castShadow>
          <boxGeometry args={[0.22, 1.1, 0.22]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>

        {/* Second Floor Master Suite Plaster Walls */}
        <mesh position={[-1.1, 1.95, 1.3]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.05, 0.14]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-1.85, 1.95, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 1.05, 2.4]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-0.35, 1.95, -0.95]} castShadow receiveShadow>
          <boxGeometry args={[2.9, 1.05, 0.14]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[1.15, 1.95, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 1.05, 2.4]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>

        {/* Standard Front Entrance Doorway */}
        <mesh position={[0.4, 0.55, 1.18]} castShadow>
          <boxGeometry args={[0.5, 0.95, 0.05]} />
          <meshStandardMaterial color={TIMBER_DOOR} roughness={0.7} />
        </mesh>
      </group>

      {/* Standard Basic Casement Windows (Stage 2 only, replaced in 3+) */}
      <group ref={standardWindowsRef} position={[0, 0.12, 0]}>
        <mesh position={[-0.9, 0.7, 1.23]}>
          <boxGeometry args={[0.7, 0.5, 0.03]} />
          <primitive object={glassClearMat} attach="material" />
        </mesh>
        <mesh position={[-1.1, 2.0, 1.38]}>
          <boxGeometry args={[0.8, 0.55, 0.03]} />
          <primitive object={glassClearMat} attach="material" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 03. PREMIUM FINISHES (STAGE 3+): Timber Slats, Analok Bronze & Stone */}
      {/* ============================================================== */}
      <group ref={premiumSlatsRef} position={[0, 0.12, 0]}>
        {/* Vertical Acoustic Timber Slats on Master Suite Facade */}
        {[-1.7, -1.55, -1.4, -1.25, -1.1, -0.95, -0.8, -0.65, -0.5].map((x, idx) => (
          <mesh key={`slat-${idx}`} position={[x, 1.95, 1.38]} castShadow>
            <boxGeometry args={[0.045, 1.05, 0.04]} />
            <primitive object={timberMat} attach="material" />
          </mesh>
        ))}

        {/* Analok Bronze Heavy Sliding Glass Doors (Ground Floor Living) */}
        <group position={[0.4, 0.65, 1.22]}>
          <mesh>
            <boxGeometry args={[1.3, 0.95, 0.03]} />
            <primitive object={glassBronzeMat} attach="material" />
          </mesh>
          {/* Bronze Frame Outline */}
          <mesh position={[0, 0.46, 0]}>
            <boxGeometry args={[1.34, 0.04, 0.05]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.46, 0]}>
            <boxGeometry args={[1.34, 0.04, 0.05]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[-0.65, 0, 0]}>
            <boxGeometry args={[0.04, 0.95, 0.05]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0.65, 0, 0]}>
            <boxGeometry args={[0.04, 0.95, 0.05]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.03, 0.95, 0.05]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </group>

        {/* 2nd Floor Master Suite Analok Bronze Panorama */}
        <group position={[0.2, 1.95, 1.38]}>
          <mesh>
            <boxGeometry args={[1.6, 1.0, 0.03]} />
            <primitive object={glassBronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.49, 0]}>
            <boxGeometry args={[1.64, 0.04, 0.05]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.49, 0]}>
            <boxGeometry args={[1.64, 0.04, 0.05]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Natural Stacked-Stone Structural Column & Planters */}
      <group ref={stoneColumnRef} position={[0, 0.12, 0]}>
        {/* Grand 2-Story Stacked Stone Feature Column */}
        <mesh position={[1.4, 1.3, 1.25]} castShadow receiveShadow>
          <boxGeometry args={[0.38, 2.45, 0.38]} />
          <primitive object={stoneMat} attach="material" />
        </mesh>

        {/* Courtyard Architectural Concrete Planter */}
        <mesh position={[-1.7, 0.15, 1.7]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.28, 0.4]} />
          <primitive object={stoneMat} attach="material" />
        </mesh>
        {/* Sculptural Green Shrub */}
        <mesh position={[-1.7, 0.4, 1.7]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color={GRASS_TERRACE} roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 04. BESPOKE LUXURY (STAGE 4): Grand Cantilever, Marble, Pool */}
      {/* ============================================================== */}
      <group ref={luxuryCantileverRef} position={[0, 0.12, 0]}>
        {/* Extended Cantilever Roof Soffit & Fascia */}
        <mesh position={[-0.3, 2.65, 0.35]} castShadow>
          <boxGeometry args={[4.2, 0.1, 3.4]} />
          <primitive object={roofMat} attach="material" />
        </mesh>
        {/* Timber Soffit Underneath Cantilever */}
        <mesh position={[-0.3, 2.59, 0.35]}>
          <boxGeometry args={[4.16, 0.02, 3.36]} />
          <primitive object={timberMat} attach="material" />
        </mesh>

        {/* Bookmatched Italian Sintered Stone Wall Cladding */}
        <mesh position={[0.4, 0.65, 1.19]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.1, 0.04]} />
          <meshStandardMaterial color="#f7f4ed" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Oversized Luxury Pivot Door with Brass Vertical Pull */}
        <mesh position={[-0.1, 0.62, 1.22]} castShadow>
          <boxGeometry args={[0.6, 1.05, 0.06]} />
          <meshStandardMaterial color="#21150c" roughness={0.4} />
        </mesh>
        <mesh position={[0.15, 0.62, 1.26]}>
          <cylinderGeometry args={[0.012, 0.012, 0.65, 8]} />
          <primitive object={goldMat} attach="material" />
        </mesh>

        {/* Frameless Glass Balcony Railing on 2nd Floor Terrace */}
        <group position={[-0.3, 1.62, 1.52]}>
          <mesh>
            <boxGeometry args={[2.8, 0.35, 0.02]} />
            <primitive object={glassClearMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.17, 0]}>
            <boxGeometry args={[2.82, 0.02, 0.03]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Luxury Courtyard Sun Deck & Turquoise Plunge Pool */}
      <group ref={poolRef} position={[0, 0.06, 0]}>
        {/* Teak Wood Sun Deck */}
        <mesh position={[0.6, 0.04, 1.9]} receiveShadow>
          <boxGeometry args={[1.8, 0.06, 1.3]} />
          <primitive object={timberMat} attach="material" />
        </mesh>
        {/* Sun Deck Plunge Pool Basin */}
        <mesh position={[0.6, -0.01, 1.9]} receiveShadow>
          <boxGeometry args={[1.3, 0.04, 0.9]} />
          <meshStandardMaterial color="#1a5561" />
        </mesh>
        {/* Glowing Turquoise Pool Water Surface */}
        <mesh position={[0.6, 0.05, 1.9]}>
          <boxGeometry args={[1.28, 0.02, 0.88]} />
          <primitive object={poolWaterMat} attach="material" />
        </mesh>
      </group>

      {/* Architectural Mood Lighting (Warm Cove + Pool Glow) */}
      <group ref={lightsRef}>
        {/* Ambient Warm LED Cove under 2nd Floor Cantilever */}
        <pointLight position={[-0.3, 1.4, 1.4]} intensity={stage >= 3 ? 1.8 : 0} color="#ffbe6b" distance={2.5} />
        {/* Warm Downlight over Entrance */}
        <pointLight position={[0.4, 1.25, 1.3]} intensity={stage >= 2 ? 1.2 : 0} color="#ffcca0" distance={2.0} />
        {/* Turquoise Pool Under-Water Glow */}
        <pointLight position={[0.6, 0.2, 1.9]} intensity={stage >= 4 ? 2.5 : 0} color="#38d4e8" distance={2.2} />
      </group>
    </group>
  );
}

export default function Mansion3DScene({ stage }: { stage: number }) {
  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
        camera={{ position: [5.2, 3.4, 5.6], fov: 32 }}
      >
        {/* Soft Alabaster Environment Lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[5, 8, 4]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />
        <directionalLight position={[-4, 3, -4]} intensity={0.4} color="#ffd4a8" />

        <Float speed={1.2} rotationIntensity={0.03} floatIntensity={0.04}>
          <MansionModel stage={stage} />
        </Float>

        {/* Ambient Contact Shadows under the mansion */}
        <ContactShadows position={[0, -0.66, 0]} opacity={0.45} scale={6.5} blur={2.0} far={2.5} />

        {/* Interactive Orbit Drag Controls */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 6}
          rotateSpeed={0.7}
          autoRotate={false}
        />
      </Canvas>

      {/* Floating 3D Interaction Pill */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-10">
        <span className="text-[9px] uppercase tracking-widest font-mono text-muted/70 bg-white/70 px-2.5 py-1 rounded-full border border-black/5 backdrop-blur-xs">
          3D Orbit · Drag to Rotate
        </span>
      </div>
    </div>
  );
}
