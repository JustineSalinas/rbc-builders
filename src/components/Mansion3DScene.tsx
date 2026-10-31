"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Colors matching the signature San Fernando luxury villa reference photograph
const STONE_TRAVERTINE = "#ded7cb";
const CONCRETE_PLINTH = "#9e988d";
const CONCRETE_CORE = "#757067";
const REBAR_BRONZE = "#b0854d";
const WALL_STUCCO = "#f5f2eb";
const WALL_TIMBER_WARM = "#6b4423";
const TIMBER_SOFFIT = "#784b28";
const TIMBER_LOUVER = "#5c371b";
const DOOR_MAHOGANY = "#24140b";
const ANALOK_BRONZE = "#2d231b";
const GLASS_PANEL = "#82a8b8";
const ROOF_FASCIA = "#1e1a17";
const GOLD_PULL = "#d4af37";
const WATER_FALL = "#3299a8";
const DRIVEWAY_PAVER = "#cfc9be";
const FOLIAGE_GREEN = "#405232";

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function SanFernandoVillaModel({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);

  // 01 Structural Skeleton groups
  const foundationRef = useRef<THREE.Group>(null);
  const concreteColumnsRef = useRef<THREE.Group>(null);
  const tieBeamsRef = useRef<THREE.Group>(null);
  const floorPlate2FRef = useRef<THREE.Group>(null);
  const roofSkeletonRef = useRef<THREE.Group>(null);
  const rebarPinsRef = useRef<THREE.Group>(null);

  // 02 Standard Enclosure groups
  const stuccoWallsRef = useRef<THREE.Group>(null);
  const standardWindowsRef = useRef<THREE.Group>(null);
  const interiorLightingRef = useRef<THREE.Group>(null);

  // 03 Premium Accents groups
  const timberLouversRef = useRef<THREE.Group>(null);
  const travertinePortalRef = useRef<THREE.Group>(null);
  const bronzeFenestrationRef = useRef<THREE.Group>(null);
  const coveLightingRef = useRef<THREE.Group>(null);

  // 04 Luxury Masterpiece groups
  const pictureFrameBoxRef = useRef<THREE.Group>(null);
  const timberSoffitsRef = useRef<THREE.Group>(null);
  const grandMahoganyDoorRef = useRef<THREE.Group>(null);
  const glassBalconiesRef = useRef<THREE.Group>(null);
  const waterCascadeRef = useRef<THREE.Group>(null);
  const staircaseAtriumRef = useRef<THREE.Group>(null);
  const luxurySpotlightsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // 0.0 -> 0.35: Foundation & Structural Skeleton (Stage 01)
    const fndP = clamp(progress / 0.2, 0, 1);
    if (foundationRef.current) {
      foundationRef.current.scale.set(fndP, fndP, fndP);
      foundationRef.current.visible = fndP > 0.01;
    }

    const colP = clamp((progress - 0.12) / 0.28, 0, 1);
    if (concreteColumnsRef.current) {
      concreteColumnsRef.current.scale.set(1, colP, 1);
      concreteColumnsRef.current.visible = colP > 0.01;
    }

    const beamP = clamp((progress - 0.3) / 0.25, 0, 1);
    if (tieBeamsRef.current) {
      tieBeamsRef.current.scale.set(beamP, 1, beamP);
      tieBeamsRef.current.visible = beamP > 0.01;
    }

    const slab2P = clamp((progress - 0.45) / 0.25, 0, 1);
    if (floorPlate2FRef.current) {
      floorPlate2FRef.current.scale.set(slab2P, 1, slab2P);
      floorPlate2FRef.current.visible = slab2P > 0.01;
    }

    const roofSkelP = clamp((progress - 0.7) / 0.3, 0, 1);
    if (roofSkeletonRef.current) {
      roofSkeletonRef.current.scale.set(roofSkelP, 1, roofSkelP);
      roofSkeletonRef.current.visible = roofSkelP > 0.01;
    }

    // Rebars visible during structural phase
    const rebarP = clamp((progress - 0.2) / 0.4, 0, 1) * (1 - clamp((progress - 1.8) / 0.4, 0, 1));
    if (rebarPinsRef.current) {
      rebarPinsRef.current.scale.set(1, rebarP, 1);
      rebarPinsRef.current.visible = rebarP > 0.01;
    }

    // 1.0 -> 2.0: Standard Enclosure & Stucco Walls (Stage 02)
    const wallsP = clamp((progress - 1.0) / 0.6, 0, 1);
    if (stuccoWallsRef.current) {
      stuccoWallsRef.current.scale.set(1, wallsP, 1);
      stuccoWallsRef.current.visible = wallsP > 0.01;
    }

    const stdWinP = clamp((progress - 1.4) / 0.45, 0, 1) * (1 - clamp((progress - 2.2) / 0.4, 0, 1));
    if (standardWindowsRef.current) {
      standardWindowsRef.current.scale.set(stdWinP, stdWinP, stdWinP);
      standardWindowsRef.current.visible = stdWinP > 0.01;
    }

    const intLightP = clamp((progress - 1.5) / 0.5, 0, 1);
    if (interiorLightingRef.current) {
      interiorLightingRef.current.visible = intLightP > 0.01;
    }

    // 2.0 -> 3.0: Premium Timber Louvers, Travertine Portal & Bronze Glazing (Stage 03)
    const louverP = clamp((progress - 2.0) / 0.5, 0, 1);
    if (timberLouversRef.current) {
      timberLouversRef.current.scale.set(1, louverP, 1);
      timberLouversRef.current.visible = louverP > 0.01;
    }

    const portalP = clamp((progress - 2.15) / 0.45, 0, 1);
    if (travertinePortalRef.current) {
      travertinePortalRef.current.scale.set(1, portalP, 1);
      travertinePortalRef.current.visible = portalP > 0.01;
    }

    const bronzeP = clamp((progress - 2.3) / 0.45, 0, 1);
    if (bronzeFenestrationRef.current) {
      bronzeFenestrationRef.current.scale.set(bronzeP, bronzeP, bronzeP);
      bronzeFenestrationRef.current.visible = bronzeP > 0.01;
    }

    const coveLightP = clamp((progress - 2.4) / 0.45, 0, 1);
    if (coveLightingRef.current) {
      coveLightingRef.current.visible = coveLightP > 0.01;
    }

    // 3.0 -> 4.0: Luxury Picture-Frame Box, Mahogany Door, Water Cascade & Soffits (Stage 04)
    const boxP = clamp((progress - 3.0) / 0.45, 0, 1);
    if (pictureFrameBoxRef.current) {
      pictureFrameBoxRef.current.scale.set(boxP, boxP, boxP);
      pictureFrameBoxRef.current.visible = boxP > 0.01;
    }

    const soffitP = clamp((progress - 3.1) / 0.4, 0, 1);
    if (timberSoffitsRef.current) {
      timberSoffitsRef.current.scale.set(1, 1, soffitP);
      timberSoffitsRef.current.visible = soffitP > 0.01;
    }

    const grandDoorP = clamp((progress - 3.25) / 0.35, 0, 1);
    if (grandMahoganyDoorRef.current) {
      grandMahoganyDoorRef.current.scale.set(1, grandDoorP, 1);
      grandMahoganyDoorRef.current.visible = grandDoorP > 0.01;
    }

    const atriumP = clamp((progress - 3.35) / 0.35, 0, 1);
    if (staircaseAtriumRef.current) {
      staircaseAtriumRef.current.scale.set(atriumP, atriumP, atriumP);
      staircaseAtriumRef.current.visible = atriumP > 0.01;
    }

    const balconyP = clamp((progress - 3.45) / 0.35, 0, 1);
    if (glassBalconiesRef.current) {
      glassBalconiesRef.current.scale.set(balconyP, 1, 1);
      glassBalconiesRef.current.visible = balconyP > 0.01;
    }

    const cascadeP = clamp((progress - 3.55) / 0.35, 0, 1);
    if (waterCascadeRef.current) {
      waterCascadeRef.current.scale.set(cascadeP, cascadeP, cascadeP);
      waterCascadeRef.current.visible = cascadeP > 0.01;
    }

    const luxLightP = clamp((progress - 3.3) / 0.5, 0, 1);
    if (luxurySpotlightsRef.current) {
      luxurySpotlightsRef.current.visible = luxLightP > 0.01;
    }
  });

  // Reusable PBR Materials
  const plinthMat = useMemo(() => new THREE.MeshStandardMaterial({ color: CONCRETE_PLINTH, roughness: 0.95 }), []);
  const concreteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: CONCRETE_CORE, roughness: 0.85 }), []);
  const rebarMat = useMemo(() => new THREE.MeshStandardMaterial({ color: REBAR_BRONZE, metalness: 0.8, roughness: 0.25 }), []);
  const travertineMat = useMemo(() => new THREE.MeshStandardMaterial({ color: STONE_TRAVERTINE, roughness: 0.85 }), []);
  const stuccoMat = useMemo(() => new THREE.MeshStandardMaterial({ color: WALL_STUCCO, roughness: 0.65 }), []);
  const warmTimberMat = useMemo(() => new THREE.MeshStandardMaterial({ color: WALL_TIMBER_WARM, roughness: 0.55 }), []);
  const soffitMat = useMemo(() => new THREE.MeshStandardMaterial({ color: TIMBER_SOFFIT, roughness: 0.5 }), []);
  const louverMat = useMemo(() => new THREE.MeshStandardMaterial({ color: TIMBER_LOUVER, roughness: 0.6 }), []);
  const mahoganyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: DOOR_MAHOGANY, roughness: 0.4 }), []);
  const bronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: ANALOK_BRONZE, metalness: 0.85, roughness: 0.2 }), []);
  const roofMat = useMemo(() => new THREE.MeshStandardMaterial({ color: ROOF_FASCIA, roughness: 0.3 }), []);
  const glassMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: GLASS_PANEL, roughness: 0.03, transmission: 0.75, transparent: true, opacity: 0.88 }),
    []
  );
  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD_PULL, metalness: 0.95, roughness: 0.15 }), []);
  const waterMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: WATER_FALL, roughness: 0.02, transmission: 0.85, transparent: true, opacity: 0.9 }),
    []
  );
  const drivewayMat = useMemo(() => new THREE.MeshStandardMaterial({ color: DRIVEWAY_PAVER, roughness: 0.9 }), []);
  const foliageMat = useMemo(() => new THREE.MeshStandardMaterial({ color: FOLIAGE_GREEN, roughness: 0.9 }), []);

  return (
    <group ref={group} scale={0.96} position={[0, -0.65, 0]} rotation={[0, -Math.PI / 6.5, 0]}>
      {/* ============================================================== */}
      {/* 00. SITE GROUNDS, DRIVEWAY PAVERS & ENTRANCE STAIRS            */}
      {/* ============================================================== */}
      {/* Main Ground Surface */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[6.8, 0.04, 4.4]} />
        <meshStandardMaterial color="#ece7de" roughness={1} />
      </mesh>
      {/* Right Driveway Pavers under Carport */}
      <mesh position={[1.8, 0.01, 0.4]} receiveShadow>
        <boxGeometry args={[2.8, 0.02, 3.2]} />
        <primitive object={drivewayMat} attach="material" />
      </mesh>
      {/* Central Garden Steps leading to front door */}
      <group position={[0.05, 0.06, 1.45]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[1.3, 0.04, 0.5]} />
          <primitive object={drivewayMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.04, -0.15]} receiveShadow>
          <boxGeometry args={[1.2, 0.04, 0.4]} />
          <primitive object={drivewayMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.08, -0.3]} receiveShadow>
          <boxGeometry args={[1.1, 0.04, 0.3]} />
          <primitive object={drivewayMat} attach="material" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 01. BARE SHELL: Foundation, Columns, Beams, Transfer Slabs     */}
      {/* ============================================================== */}
      <group ref={foundationRef}>
        {/* Foundation Plinth */}
        <mesh position={[-0.1, 0.08, 0.1]} receiveShadow>
          <boxGeometry args={[6.0, 0.14, 3.4]} />
          <primitive object={plinthMat} attach="material" />
        </mesh>
      </group>

      {/* Concrete Columns (Ground Floor) */}
      <group ref={concreteColumnsRef} position={[0, 0.15, 0]}>
        {/* Left Living Pavilion Columns */}
        {[
          [-2.6, 0.7, 1.2],
          [-1.3, 0.7, 1.2],
          [-2.6, 0.7, -1.0],
          [-1.3, 0.7, -1.0],
        ].map(([x, y, z], idx) => (
          <mesh key={`col-l-${idx}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.22, 1.4, 0.22]} />
            <primitive object={concreteMat} attach="material" />
          </mesh>
        ))}

        {/* Center Portal Columns (Towering 2-Story Shaft) */}
        {[
          [-0.45, 1.4, 0.8],
          [0.55, 1.4, 0.8],
          [-0.45, 1.4, -0.6],
          [0.55, 1.4, -0.6],
        ].map(([x, y, z], idx) => (
          <mesh key={`col-c-${idx}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.24, 2.8, 0.24]} />
            <primitive object={concreteMat} attach="material" />
          </mesh>
        ))}

        {/* Right Carport & Bedroom Wing Columns */}
        {[
          [1.8, 0.7, 1.2],
          [2.8, 0.7, 1.2],
          [1.8, 0.7, -1.0],
          [2.8, 0.7, -1.0],
        ].map(([x, y, z], idx) => (
          <mesh key={`col-r-${idx}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.22, 1.4, 0.22]} />
            <primitive object={concreteMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Tie-Beams (Linking Columns at First Floor Ceiling) */}
      <group ref={tieBeamsRef}>
        <mesh position={[-1.95, 1.62, 1.2]} castShadow>
          <boxGeometry args={[1.5, 0.18, 0.22]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[2.3, 1.62, 1.2]} castShadow>
          <boxGeometry args={[1.2, 0.18, 0.22]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[-0.1, 1.62, -1.0]} castShadow>
          <boxGeometry args={[5.6, 0.18, 0.22]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
      </group>

      {/* 2nd Floor Transfer Slab (Left Balcony & Right Terrace) */}
      <group ref={floorPlate2FRef}>
        {/* Left Wing 2F Balcony Slab (Extends Forward) */}
        <mesh position={[-1.9, 1.72, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.14, 2.7]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        {/* Right Wing 2F Bedroom & Terrace Slab (Over Carport) */}
        <mesh position={[1.9, 1.72, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.14, 2.7]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
      </group>

      {/* Roof Skeleton & Top Tie-Beams */}
      <group ref={roofSkeletonRef}>
        <mesh position={[-0.1, 3.15, 0.2]} castShadow>
          <boxGeometry args={[6.1, 0.14, 3.1]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
      </group>

      {/* Rebar Pins on Column Heads */}
      <group ref={rebarPinsRef}>
        {[
          [-2.6, 3.25, 1.2],
          [-1.3, 3.25, 1.2],
          [-0.45, 3.25, 0.8],
          [0.55, 3.25, 0.8],
          [1.8, 3.25, 1.2],
          [2.8, 3.25, 1.2],
        ].map(([x, y, z], idx) => (
          <mesh key={`reb-${idx}`} position={[x, y + 0.1, z]}>
            <cylinderGeometry args={[0.015, 0.015, 0.22, 6]} />
            <primitive object={rebarMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 02. STANDARD: Enclosure Walls, Basic Windows & Plaster Finishes */}
      {/* ============================================================== */}
      <group ref={stuccoWallsRef} position={[0, 0.15, 0]}>
        {/* Left Living Pavilion Rear & Side Walls */}
        <mesh position={[-2.7, 0.7, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.16, 1.35, 2.2]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-1.95, 0.7, -0.95]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.35, 0.16]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>

        {/* Left 2F Master Suite Walls */}
        <mesh position={[-2.8, 2.25, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.16, 1.3, 2.4]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-1.95, 2.25, -0.95]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.3, 0.16]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>

        {/* Right Carport Rear Wall (Warm Wood Planking) */}
        <mesh position={[2.1, 0.7, -0.85]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.35, 0.12]} />
          <primitive object={warmTimberMat} attach="material" />
        </mesh>

        {/* Right 2F Bedroom Suite Walls */}
        <mesh position={[2.7, 2.25, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.16, 1.3, 2.4]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[1.9, 2.25, -0.95]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.3, 0.16]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
      </group>

      {/* Standard Temporary Windows */}
      <group ref={standardWindowsRef} position={[0, 0.15, 0]}>
        <mesh position={[-1.95, 0.7, 1.22]}>
          <boxGeometry args={[1.4, 1.2, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
        <mesh position={[1.95, 2.25, 1.22]}>
          <boxGeometry args={[1.4, 1.15, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
      </group>

      {/* Interior Warm Downlights */}
      <group ref={interiorLightingRef}>
        <pointLight position={[-1.9, 1.4, 0.3]} intensity={1.8} color="#ffe2b8" distance={3.0} />
        <pointLight position={[2.1, 1.4, 0.3]} intensity={1.5} color="#ffe2b8" distance={3.0} />
      </group>

      {/* ============================================================== */}
      {/* 03. PREMIUM: Travertine Portal, Vertical Louvers & Bronze Glass */}
      {/* ============================================================== */}
      {/* Central 2-Story Travertine Portal Arch */}
      <group ref={travertinePortalRef} position={[0.05, 0.15, 0]}>
        {/* Left Portal Pillar */}
        <mesh position={[-0.48, 1.45, 0.85]} castShadow receiveShadow>
          <boxGeometry args={[0.32, 2.9, 0.45]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        {/* Right Portal Pillar */}
        <mesh position={[0.55, 1.45, 0.85]} castShadow receiveShadow>
          <boxGeometry args={[0.32, 2.9, 0.45]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        {/* Portal Top Header Beam */}
        <mesh position={[0.035, 2.85, 0.85]} castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.34, 0.45]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
      </group>

      {/* Iconic Right-Wing Vertical Timber Louver Screen (Floor-to-Ceiling 2F) */}
      <group ref={timberLouversRef} position={[0, 0.15, 0]}>
        {[1.25, 1.35, 1.45, 1.55, 1.65, 1.75, 1.85, 1.95, 2.05].map((x, idx) => (
          <mesh key={`louv-${idx}`} position={[x, 2.25, 1.26]} castShadow>
            <boxGeometry args={[0.04, 1.25, 0.08]} />
            <primitive object={louverMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Heavy-Gauge Analok Bronze Sliding Glass Doors (Left Living + 2F) */}
      <group ref={bronzeFenestrationRef} position={[0, 0.15, 0]}>
        {/* Ground Floor Living Sliding Glass Wall */}
        <group position={[-1.95, 0.7, 1.24]}>
          <mesh>
            <boxGeometry args={[1.45, 1.25, 0.03]} />
            <primitive object={glassMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[1.49, 0.04, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.6, 0]}>
            <boxGeometry args={[1.49, 0.04, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[-0.72, 0, 0]}>
            <boxGeometry args={[0.04, 1.25, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0.72, 0, 0]}>
            <boxGeometry args={[0.04, 1.25, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </group>

        {/* 2F Master Suite Sliding Glass Wall */}
        <group position={[-1.95, 2.25, 1.15]}>
          <mesh>
            <boxGeometry args={[1.45, 1.25, 0.03]} />
            <primitive object={glassMat} attach="material" />
          </mesh>
        </group>

        {/* 2F Right Bedroom Sliding Glass */}
        <group position={[2.3, 2.25, 1.2]}>
          <mesh>
            <boxGeometry args={[1.0, 1.25, 0.03]} />
            <primitive object={glassMat} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Perimeter Warm LED Cove Lighting */}
      <group ref={coveLightingRef}>
        <pointLight position={[-1.9, 1.7, 1.3]} intensity={2.2} color="#ffbe6b" distance={2.5} />
        <pointLight position={[2.0, 1.7, 1.3]} intensity={2.0} color="#ffbe6b" distance={2.5} />
      </group>

      {/* ============================================================== */}
      {/* 04. LUXURY: Picture-Frame Box, Timber Soffit, Grand Door, Pool  */}
      {/* ============================================================== */}
      {/* Left Wing Iconic White Architectural Picture-Frame Box */}
      <group ref={pictureFrameBoxRef} position={[-1.95, 2.4, 0.5]}>
        {/* Outer White Cantilever Frame */}
        {/* Bottom Ledge */}
        <mesh position={[0, -0.6, 0.8]} castShadow>
          <boxGeometry args={[2.5, 0.1, 1.6]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        {/* Top Header Ledge */}
        <mesh position={[0, 0.6, 0.8]} castShadow>
          <boxGeometry args={[2.5, 0.1, 1.6]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        {/* Left Vertical Frame */}
        <mesh position={[-1.2, 0, 0.8]} castShadow>
          <boxGeometry args={[0.1, 1.1, 1.6]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        {/* Warm Timber Lining on Inner Balcony Wall */}
        <mesh position={[-1.13, 0, 0.8]}>
          <boxGeometry args={[0.02, 1.08, 1.56]} />
          <primitive object={warmTimberMat} attach="material" />
        </mesh>
      </group>

      {/* Grand Continuous Roof with Timber Battens Underneath */}
      <group ref={timberSoffitsRef} position={[-0.1, 3.25, 0.4]}>
        {/* Dark Architectural Roof Fascia with Curved Left Corner */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[6.4, 0.12, 3.5]} />
          <primitive object={roofMat} attach="material" />
        </mesh>
        {/* Warm Timber Soffit Underneath */}
        <mesh position={[0, -0.07, 0]}>
          <boxGeometry args={[6.36, 0.02, 3.46]} />
          <primitive object={soffitMat} attach="material" />
        </mesh>
      </group>

      {/* Double-Height Glass Staircase Atrium (Behind Left of Stone Portal) */}
      <group ref={staircaseAtriumRef} position={[-0.7, 1.55, 0.75]}>
        <mesh>
          <boxGeometry args={[0.6, 2.65, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
        {/* Interior Illuminated Floating Staircase Steps */}
        {[-0.8, -0.4, 0.0, 0.4, 0.8].map((y, idx) => (
          <mesh key={`stair-${idx}`} position={[0, y, -0.2]}>
            <boxGeometry args={[0.5, 0.05, 0.15]} />
            <meshStandardMaterial color="#faf5ee" roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* 2-Story Grand Mahogany Architectural Pivot Entrance Door */}
      <group ref={grandMahoganyDoorRef} position={[0.05, 1.45, 0.88]}>
        {/* Massive Solid Mahogany Door Slab */}
        <mesh castShadow>
          <boxGeometry args={[0.68, 2.65, 0.08]} />
          <primitive object={mahoganyMat} attach="material" />
        </mesh>
        {/* Vertical Brushed Brass Pull Handle */}
        <mesh position={[0.26, 0, 0.06]}>
          <cylinderGeometry args={[0.016, 0.016, 1.2, 8]} />
          <primitive object={goldMat} attach="material" />
        </mesh>
      </group>

      {/* Frameless Glass Balcony Railings with Lush Planter Foliage */}
      <group ref={glassBalconiesRef}>
        {/* Left Balcony Glass Railing */}
        <group position={[-1.95, 1.95, 1.62]}>
          <mesh>
            <boxGeometry args={[2.3, 0.38, 0.02]} />
            <primitive object={glassMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[2.32, 0.02, 0.03]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          {/* Planter Shrub Spheres along railing */}
          {[-0.8, -0.3, 0.2, 0.7].map((x, idx) => (
            <mesh key={`plant-l-${idx}`} position={[x, -0.08, -0.05]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <primitive object={foliageMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Right Balcony Glass Railing */}
        <group position={[1.9, 1.95, 1.62]}>
          <mesh>
            <boxGeometry args={[2.3, 0.38, 0.02]} />
            <primitive object={glassMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[2.32, 0.02, 0.03]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          {/* Planters */}
          {[-0.7, 0, 0.7].map((x, idx) => (
            <mesh key={`plant-r-${idx}`} position={[x, -0.08, -0.05]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <primitive object={foliageMat} attach="material" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Front Left Illuminated Waterfall & Cascading Reflection Pool */}
      <group ref={waterCascadeRef} position={[-2.4, 0.12, 1.8]}>
        {/* Pool Concrete Retaining Wall */}
        <mesh position={[0, 0.08, 0]} receiveShadow>
          <boxGeometry args={[1.4, 0.2, 0.8]} />
          <primitive object={plinthMat} attach="material" />
        </mesh>
        {/* Water Surface Basin */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.32, 0.02, 0.72]} />
          <primitive object={waterMat} attach="material" />
        </mesh>
        {/* Waterfall Spillway Wall */}
        <mesh position={[0, 0.35, -0.38]} castShadow>
          <boxGeometry args={[1.2, 0.35, 0.06]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        {/* Tropical Palm Planter */}
        <mesh position={[0.8, 0.3, 0.1]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <primitive object={foliageMat} attach="material" />
        </mesh>
      </group>

      {/* Architectural Spotlights (Evening Mood Glow) */}
      <group ref={luxurySpotlightsRef}>
        {/* Upward Spotlight grazing Central Travertine Portal */}
        <pointLight position={[0.05, 0.3, 1.2]} intensity={3.2} color="#ffe5bd" distance={3.8} />
        {/* Water Cascade Turquoise Glow */}
        <pointLight position={[-2.4, 0.25, 1.8]} intensity={3.0} color="#35d6eb" distance={2.5} />
        {/* Carport Warm Sconces */}
        <pointLight position={[2.2, 1.3, 0.5]} intensity={2.0} color="#ffbe6b" distance={3.0} />
      </group>
    </group>
  );
}

export default function Mansion3DScene({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        // Zoomed-out camera so the full mansion, driveway, and waterfall pool fit comfortably without cramping
        camera={{ position: [5.6, 2.9, 6.2], fov: 32 }}
      >
        {/* Soft Warm Alabaster Illumination */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[7, 10, 6]}
          intensity={2.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-5.5}
          shadow-camera-right={5.5}
          shadow-camera-top={5.5}
          shadow-camera-bottom={-5.5}
          color="#fffaf0"
        />
        <directionalLight position={[-6, 5, -5]} intensity={0.9} color="#e5f0ff" />
        <directionalLight position={[0, 8, -6]} intensity={1.2} color="#ffd8ad" />

        <Float speed={0.7} rotationIntensity={0.015} floatIntensity={0.02}>
          <SanFernandoVillaModel progress={progress} />
        </Float>

        <ContactShadows position={[0, -0.66, 0]} opacity={0.6} scale={8.5} blur={2.2} far={3.0} />

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 6}
          rotateSpeed={0.7}
          autoRotate={false}
        />
      </Canvas>

      {/* Floating 3D Interaction Pill */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-10">
        <span className="text-[9.5px] uppercase tracking-widest font-mono text-muted/80 bg-white/85 px-3 py-1 rounded-full border border-black/10 shadow-xs backdrop-blur-xs">
          San Fernando Signature Villa &middot; Drag to Orbit 360&deg;
        </span>
      </div>
    </div>
  );
}
