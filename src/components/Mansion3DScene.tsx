"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Architectural Color Palette matching RBC Builders brand with high contrast & clarity
const CONCRETE_CORE = "#7d7870";
const CONCRETE_PLINTH = "#9e978c";
const REBAR_BRONZE = "#b0854d";
const WALL_STUCCO = "#f5f0e6";
const WALL_STONE = "#bdae99";
const TIMBER_SLAT = "#825026";
const TIMBER_DOOR = "#2b180a";
const ANALOK_BRONZE = "#33261a";
const GLASS_CLEAR = "#a3cad9";
const GLASS_BRONZE = "#708994";
const ROOF_FASCIA = "#1c1916";
const GOLD_ACCENT = "#d6a54f";
const POOL_WATER = "#22a3b8";
const POOL_DECK = "#916035";
const GRASS_TERRACE = "#5a6b48";

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function MansionModel({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);

  // Structural sub-groups
  const foundationGroup = useRef<THREE.Group>(null);
  const colGfGroup = useRef<THREE.Group>(null);
  const beamGfGroup = useRef<THREE.Group>(null);
  const slab2fGroup = useRef<THREE.Group>(null);
  const col2fGroup = useRef<THREE.Group>(null);
  const roofBeamsGroup = useRef<THREE.Group>(null);
  const rebarGroup = useRef<THREE.Group>(null);

  // Enclosure sub-groups
  const wallsGfGroup = useRef<THREE.Group>(null);
  const walls2fGroup = useRef<THREE.Group>(null);
  const standardWindowsGroup = useRef<THREE.Group>(null);
  const standardDoorGroup = useRef<THREE.Group>(null);

  // Premium sub-groups
  const premiumSlatsGroup = useRef<THREE.Group>(null);
  const bronzeFenestrationGroup = useRef<THREE.Group>(null);
  const stoneColumnGroup = useRef<THREE.Group>(null);
  const planterGroup = useRef<THREE.Group>(null);

  // Luxury sub-groups
  const cantileverRoofGroup = useRef<THREE.Group>(null);
  const marbleFacadeGroup = useRef<THREE.Group>(null);
  const luxuryDoorGroup = useRef<THREE.Group>(null);
  const glassBalconyGroup = useRef<THREE.Group>(null);
  const poolGroup = useRef<THREE.Group>(null);
  const lightsGroup = useRef<THREE.Group>(null);

  // Calculate fine-grained animation stages based on progress (0.0 to 4.0)
  // 0.0 - 0.2: Ground & Site Foundation
  // 0.2 - 1.0: 01 Bare Shell (Columns, tie beams, 2F slab, roof skeleton)
  // 1.0 - 2.0: 02 Standard (Enclosure walls, plaster, windows, basic door)
  // 2.0 - 3.0: 03 Premium (Timber slats, Analok bronze, stone column, planters)
  // 3.0 - 4.0: 04 Luxury (Cantilever extension, marble wall, pivot door, pool, lights)

  useFrame(() => {
    // Stage 0 -> 1: Foundation & Concrete Skeleton
    const foundationP = clamp(progress / 0.25, 0, 1);
    if (foundationGroup.current) {
      foundationGroup.current.scale.set(foundationP, foundationP, foundationP);
      foundationGroup.current.visible = foundationP > 0.01;
    }

    const colGfP = clamp((progress - 0.15) / 0.25, 0, 1);
    if (colGfGroup.current) {
      colGfGroup.current.scale.set(1, colGfP, 1);
      colGfGroup.current.visible = colGfP > 0.01;
    }

    const beamGfP = clamp((progress - 0.35) / 0.25, 0, 1);
    if (beamGfGroup.current) {
      beamGfGroup.current.scale.set(beamGfP, 1, beamGfP);
      beamGfGroup.current.visible = beamGfP > 0.01;
    }

    const slab2fP = clamp((progress - 0.5) / 0.25, 0, 1);
    if (slab2fGroup.current) {
      slab2fGroup.current.scale.set(slab2fP, 1, slab2fP);
      slab2fGroup.current.visible = slab2fP > 0.01;
    }

    const col2fP = clamp((progress - 0.65) / 0.25, 0, 1);
    if (col2fGroup.current) {
      col2fGroup.current.scale.set(1, col2fP, 1);
      col2fGroup.current.visible = col2fP > 0.01;
    }

    const roofBeamsP = clamp((progress - 0.8) / 0.25, 0, 1);
    if (roofBeamsGroup.current) {
      roofBeamsGroup.current.scale.set(roofBeamsP, 1, roofBeamsP);
      roofBeamsGroup.current.visible = roofBeamsP > 0.01;
    }

    // Rebars show during structural phase and fade as walls enclose
    const rebarP = clamp((progress - 0.3) / 0.4, 0, 1) * (1 - clamp((progress - 1.8) / 0.5, 0, 1));
    if (rebarGroup.current) {
      rebarGroup.current.scale.set(1, rebarP, 1);
      rebarGroup.current.visible = rebarP > 0.01;
    }

    // Stage 1 -> 2: Walls Enclose (Standard)
    const wallsGfP = clamp((progress - 1.0) / 0.5, 0, 1);
    if (wallsGfGroup.current) {
      wallsGfGroup.current.scale.set(1, wallsGfP, 1);
      wallsGfGroup.current.visible = wallsGfP > 0.01;
    }

    const walls2fP = clamp((progress - 1.35) / 0.5, 0, 1);
    if (walls2fGroup.current) {
      walls2fGroup.current.scale.set(1, walls2fP, 1);
      walls2fGroup.current.visible = walls2fP > 0.01;
    }

    const stdWinP = clamp((progress - 1.5) / 0.4, 0, 1) * (1 - clamp((progress - 2.2) / 0.4, 0, 1));
    if (standardWindowsGroup.current) {
      standardWindowsGroup.current.scale.set(stdWinP, stdWinP, stdWinP);
      standardWindowsGroup.current.visible = stdWinP > 0.01;
    }

    const stdDoorP = clamp((progress - 1.6) / 0.35, 0, 1) * (1 - clamp((progress - 3.2) / 0.3, 0, 1));
    if (standardDoorGroup.current) {
      standardDoorGroup.current.scale.set(1, stdDoorP, 1);
      standardDoorGroup.current.visible = stdDoorP > 0.01;
    }

    // Stage 2 -> 3: Premium (Wood Slats, Analok Bronze, Stone Column)
    const slatsP = clamp((progress - 2.0) / 0.5, 0, 1);
    if (premiumSlatsGroup.current) {
      premiumSlatsGroup.current.scale.set(1, slatsP, 1);
      premiumSlatsGroup.current.visible = slatsP > 0.01;
    }

    const bronzeP = clamp((progress - 2.15) / 0.45, 0, 1);
    if (bronzeFenestrationGroup.current) {
      bronzeFenestrationGroup.current.scale.set(bronzeP, bronzeP, bronzeP);
      bronzeFenestrationGroup.current.visible = bronzeP > 0.01;
    }

    const stoneP = clamp((progress - 2.3) / 0.45, 0, 1);
    if (stoneColumnGroup.current) {
      stoneColumnGroup.current.scale.set(1, stoneP, 1);
      stoneColumnGroup.current.visible = stoneP > 0.01;
    }

    const planterP = clamp((progress - 2.5) / 0.4, 0, 1);
    if (planterGroup.current) {
      planterGroup.current.scale.set(planterP, planterP, planterP);
      planterGroup.current.visible = planterP > 0.01;
    }

    // Stage 3 -> 4: Luxury (Cantilever extension, Marble wall, Pivot door, Pool, Lights)
    const cantileverP = clamp((progress - 3.0) / 0.45, 0, 1);
    if (cantileverRoofGroup.current) {
      cantileverRoofGroup.current.scale.set(1, 1, cantileverP);
      cantileverRoofGroup.current.visible = cantileverP > 0.01;
    }

    const marbleP = clamp((progress - 3.15) / 0.4, 0, 1);
    if (marbleFacadeGroup.current) {
      marbleFacadeGroup.current.scale.set(marbleP, marbleP, marbleP);
      marbleFacadeGroup.current.visible = marbleP > 0.01;
    }

    const luxDoorP = clamp((progress - 3.3) / 0.35, 0, 1);
    if (luxuryDoorGroup.current) {
      luxuryDoorGroup.current.scale.set(1, luxDoorP, 1);
      luxuryDoorGroup.current.visible = luxDoorP > 0.01;
    }

    const balconyP = clamp((progress - 3.4) / 0.35, 0, 1);
    if (glassBalconyGroup.current) {
      glassBalconyGroup.current.scale.set(balconyP, 1, 1);
      glassBalconyGroup.current.visible = balconyP > 0.01;
    }

    const poolP = clamp((progress - 3.5) / 0.4, 0, 1);
    if (poolGroup.current) {
      poolGroup.current.scale.set(poolP, poolP, poolP);
      poolGroup.current.visible = poolP > 0.01;
    }

    const lightsP = clamp((progress - 2.2) / 1.5, 0, 1);
    if (lightsGroup.current) {
      lightsGroup.current.visible = lightsP > 0.01;
    }
  });

  // Reusable materials
  const concreteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: CONCRETE_CORE, roughness: 0.85 }), []);
  const plinthMat = useMemo(() => new THREE.MeshStandardMaterial({ color: CONCRETE_PLINTH, roughness: 0.95 }), []);
  const stuccoMat = useMemo(() => new THREE.MeshStandardMaterial({ color: WALL_STUCCO, roughness: 0.75 }), []);
  const rebarMat = useMemo(() => new THREE.MeshStandardMaterial({ color: REBAR_BRONZE, metalness: 0.75, roughness: 0.3 }), []);
  const timberMat = useMemo(() => new THREE.MeshStandardMaterial({ color: TIMBER_SLAT, roughness: 0.6 }), []);
  const stoneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: WALL_STONE, roughness: 0.95 }), []);
  const bronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: ANALOK_BRONZE, metalness: 0.85, roughness: 0.2 }), []);
  const roofMat = useMemo(() => new THREE.MeshStandardMaterial({ color: ROOF_FASCIA, roughness: 0.35 }), []);
  const glassClearMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: GLASS_CLEAR, roughness: 0.04, transmission: 0.65, transparent: true, opacity: 0.85 }),
    []
  );
  const glassBronzeMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: GLASS_BRONZE, roughness: 0.04, transmission: 0.55, transparent: true, opacity: 0.9 }),
    []
  );
  const poolWaterMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: POOL_WATER, roughness: 0.02, transmission: 0.88, transparent: true, opacity: 0.92 }),
    []
  );
  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD_ACCENT, metalness: 0.9, roughness: 0.15 }), []);

  return (
    <group ref={group} scale={1.22} position={[0, -0.65, 0]} rotation={[0, -Math.PI / 5.2, 0]}>
      {/* ============================================================== */}
      {/* 00. SITE GROUND PLANE & EXCAVATION GRID (ALWAYS VISIBLE)        */}
      {/* ============================================================== */}
      <mesh position={[0, -0.01, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.04, 3.8]} />
        <meshStandardMaterial color="#ebe6dc" roughness={1} />
      </mesh>

      {/* ============================================================== */}
      {/* 01. BARE SHELL: Foundation, Columns, Beams, Concrete Slabs     */}
      {/* ============================================================== */}
      <group ref={foundationGroup}>
        {/* Foundation Plinth */}
        <mesh position={[0, 0.06, 0]} receiveShadow>
          <boxGeometry args={[4.4, 0.12, 3.4]} />
          <primitive object={plinthMat} attach="material" />
        </mesh>

        {/* First Floor Concrete Slab Plinth */}
        <mesh position={[-0.2, 0.14, 0.1]} receiveShadow>
          <boxGeometry args={[3.2, 0.08, 2.4]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
      </group>

      {/* Ground Floor Columns (Rise from 0 height) */}
      <group ref={colGfGroup} position={[0, 0.18, 0]}>
        {[
          [-1.6, 0.6, 1.2],
          [-0.2, 0.6, 1.2],
          [1.2, 0.6, 1.2],
          [-1.6, 0.6, -1.0],
          [-0.2, 0.6, -1.0],
          [1.2, 0.6, -1.0],
        ].map(([x, y, z], idx) => (
          <mesh key={`col-gf-${idx}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.2, 1.2, 0.2]} />
            <primitive object={concreteMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Ground Floor Tie-Beams */}
      <group ref={beamGfGroup}>
        <mesh position={[-0.2, 1.44, 1.2]} castShadow>
          <boxGeometry args={[3.0, 0.18, 0.2]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[-0.2, 1.44, -1.0]} castShadow>
          <boxGeometry args={[3.0, 0.18, 0.2]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[-1.6, 1.44, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.18, 2.2]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[1.2, 1.44, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.18, 2.2]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
      </group>

      {/* 2nd Floor Cantilevered Transfer Slab */}
      <group ref={slab2fGroup}>
        <mesh position={[-0.35, 1.56, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.14, 2.8]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
      </group>

      {/* 2nd Floor Columns */}
      <group ref={col2fGroup} position={[0, 1.63, 0]}>
        {[
          [-1.9, 0.58, 1.35],
          [-0.35, 0.58, 1.35],
          [1.2, 0.58, 1.35],
          [-1.9, 0.58, -1.0],
          [-0.35, 0.58, -1.0],
          [1.2, 0.58, -1.0],
        ].map(([x, y, z], idx) => (
          <mesh key={`col-2f-${idx}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.18, 1.16, 0.18]} />
            <primitive object={concreteMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Roof Beams & Base Flat Slab */}
      <group ref={roofBeamsGroup}>
        <mesh position={[-0.35, 2.85, 0.15]} castShadow>
          <boxGeometry args={[3.8, 0.14, 3.0]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
      </group>

      {/* Exposed Rebar Dowels on Column Tops */}
      <group ref={rebarGroup}>
        {[
          [-1.9, 2.96, 1.35],
          [-0.35, 2.96, 1.35],
          [1.2, 2.96, 1.35],
          [-1.9, 2.96, -1.0],
          [1.2, 2.96, -1.0],
        ].map(([x, y, z], idx) => (
          <group key={`rebar-pin-${idx}`} position={[x, y, z]}>
            <mesh position={[-0.04, 0.12, -0.04]}>
              <cylinderGeometry args={[0.012, 0.012, 0.24, 6]} />
              <primitive object={rebarMat} attach="material" />
            </mesh>
            <mesh position={[0.04, 0.12, 0.04]}>
              <cylinderGeometry args={[0.012, 0.012, 0.24, 6]} />
              <primitive object={rebarMat} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 02. STANDARD: Plaster Walls, Windows, Standard Door            */}
      {/* ============================================================== */}
      <group ref={wallsGfGroup} position={[0, 0.18, 0]}>
        <mesh position={[-0.9, 0.6, 1.15]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.15, 0.15]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-1.55, 0.6, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 1.15, 2.1]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-0.2, 0.6, -0.95]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 1.15, 0.15]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[1.4, 0.6, 1.15]} castShadow>
          <boxGeometry args={[0.24, 1.15, 0.24]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
      </group>

      <group ref={walls2fGroup} position={[0, 1.63, 0]}>
        <mesh position={[-1.1, 0.58, 1.3]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.1, 0.15]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-1.85, 0.58, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 1.1, 2.4]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[-0.35, 0.58, -0.95]} castShadow receiveShadow>
          <boxGeometry args={[2.9, 1.1, 0.15]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
        <mesh position={[1.15, 0.58, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 1.1, 2.4]} />
          <primitive object={stuccoMat} attach="material" />
        </mesh>
      </group>

      {/* Standard Basic Windows */}
      <group ref={standardWindowsGroup} position={[0, 0.18, 0]}>
        <mesh position={[-0.9, 0.65, 1.24]}>
          <boxGeometry args={[0.75, 0.55, 0.03]} />
          <primitive object={glassClearMat} attach="material" />
        </mesh>
        <mesh position={[-1.1, 2.1, 1.39]}>
          <boxGeometry args={[0.85, 0.6, 0.03]} />
          <primitive object={glassClearMat} attach="material" />
        </mesh>
      </group>

      {/* Standard Front Door */}
      <group ref={standardDoorGroup} position={[0, 0.18, 0]}>
        <mesh position={[0.4, 0.52, 1.2]} castShadow>
          <boxGeometry args={[0.5, 0.98, 0.06]} />
          <meshStandardMaterial color={TIMBER_DOOR} roughness={0.7} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 03. PREMIUM: Acoustic Wood Slats, Bronze Fenestration, Stone   */}
      {/* ============================================================== */}
      <group ref={premiumSlatsGroup} position={[0, 1.63, 0]}>
        {[-1.75, -1.6, -1.45, -1.3, -1.15, -1.0, -0.85, -0.7, -0.55].map((x, idx) => (
          <mesh key={`prem-slat-${idx}`} position={[x, 0.58, 1.39]} castShadow>
            <boxGeometry args={[0.05, 1.1, 0.05]} />
            <primitive object={timberMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Analok Bronze Sliding Panels */}
      <group ref={bronzeFenestrationGroup} position={[0, 0.18, 0]}>
        <group position={[0.4, 0.65, 1.24]}>
          <mesh>
            <boxGeometry args={[1.35, 0.98, 0.03]} />
            <primitive object={glassBronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.48, 0]}>
            <boxGeometry args={[1.38, 0.04, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.48, 0]}>
            <boxGeometry args={[1.38, 0.04, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[-0.67, 0, 0]}>
            <boxGeometry args={[0.04, 0.98, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0.67, 0, 0]}>
            <boxGeometry args={[0.04, 0.98, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </group>

        {/* 2F Master Suite Bronze Fenestration */}
        <group position={[0.2, 2.1, 1.4]}>
          <mesh>
            <boxGeometry args={[1.65, 1.05, 0.03]} />
            <primitive object={glassBronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.52, 0]}>
            <boxGeometry args={[1.69, 0.04, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.52, 0]}>
            <boxGeometry args={[1.69, 0.04, 0.06]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </group>
      </group>

      {/* 2-Story Stacked Stone Feature Column */}
      <group ref={stoneColumnGroup} position={[0, 0.18, 0]}>
        <mesh position={[1.4, 1.35, 1.26]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 2.55, 0.4]} />
          <primitive object={stoneMat} attach="material" />
        </mesh>
      </group>

      {/* Garden Planters */}
      <group ref={planterGroup} position={[0, 0.18, 0]}>
        <mesh position={[-1.75, 0.16, 1.7]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.3, 0.42]} />
          <primitive object={stoneMat} attach="material" />
        </mesh>
        <mesh position={[-1.75, 0.42, 1.7]}>
          <sphereGeometry args={[0.2, 10, 10]} />
          <meshStandardMaterial color={GRASS_TERRACE} roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 04. LUXURY: Extended Cantilever, Sintered Marble, Pivot Door,  */}
      {/*     Glass Balconies, Sun Deck & Turquoise Plunge Pool          */}
      {/* ============================================================== */}
      <group ref={cantileverRoofGroup} position={[0, 0, 0]}>
        {/* Extended Cantilever Roof Soffit Reaching Outward */}
        <mesh position={[-0.3, 2.87, 0.45]} castShadow>
          <boxGeometry args={[4.4, 0.12, 3.6]} />
          <primitive object={roofMat} attach="material" />
        </mesh>
        <mesh position={[-0.3, 2.8, 0.45]}>
          <boxGeometry args={[4.36, 0.02, 3.56]} />
          <primitive object={timberMat} attach="material" />
        </mesh>
      </group>

      {/* Sintered Stone Marble Focal Wall */}
      <group ref={marbleFacadeGroup} position={[0, 0.18, 0]}>
        <mesh position={[0.4, 0.65, 1.21]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 1.15, 0.04]} />
          <meshStandardMaterial color="#faf7f0" roughness={0.15} metalness={0.1} />
        </mesh>
      </group>

      {/* Oversized Luxury Pivot Door */}
      <group ref={luxuryDoorGroup} position={[0, 0.18, 0]}>
        <mesh position={[-0.1, 0.62, 1.24]} castShadow>
          <boxGeometry args={[0.62, 1.1, 0.07]} />
          <meshStandardMaterial color="#1a110a" roughness={0.35} />
        </mesh>
        <mesh position={[0.16, 0.62, 1.28]}>
          <cylinderGeometry args={[0.014, 0.014, 0.7, 8]} />
          <primitive object={goldMat} attach="material" />
        </mesh>
      </group>

      {/* Frameless Glass Balcony Railing */}
      <group ref={glassBalconyGroup} position={[0, 1.63, 0]}>
        <group position={[-0.35, 0.22, 1.58]}>
          <mesh>
            <boxGeometry args={[2.9, 0.38, 0.02]} />
            <primitive object={glassClearMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.19, 0]}>
            <boxGeometry args={[2.92, 0.02, 0.03]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Luxury Front Courtyard Plunge Pool & Teak Sun Deck */}
      <group ref={poolGroup} position={[0, 0.08, 0]}>
        <mesh position={[0.6, 0.05, 1.95]} receiveShadow>
          <boxGeometry args={[1.9, 0.08, 1.4]} />
          <meshStandardMaterial color={POOL_DECK} roughness={0.7} />
        </mesh>
        <mesh position={[0.6, -0.01, 1.95]} receiveShadow>
          <boxGeometry args={[1.4, 0.06, 0.95]} />
          <meshStandardMaterial color="#0f3b45" />
        </mesh>
        <mesh position={[0.6, 0.06, 1.95]}>
          <boxGeometry args={[1.38, 0.02, 0.93]} />
          <primitive object={poolWaterMat} attach="material" />
        </mesh>
      </group>

      {/* Architectural Lighting (Active in Premium & Luxury) */}
      <group ref={lightsGroup}>
        <pointLight position={[-0.3, 1.5, 1.45]} intensity={progress >= 2.5 ? 2.2 : 0} color="#ffbe6b" distance={3.0} />
        <pointLight position={[0.4, 1.35, 1.35]} intensity={progress >= 1.5 ? 1.5 : 0} color="#ffcca0" distance={2.5} />
        <pointLight position={[0.6, 0.25, 1.95]} intensity={progress >= 3.2 ? 3.0 : 0} color="#35d6eb" distance={2.6} />
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
        camera={{ position: [4.4, 2.7, 4.8], fov: 36 }}
      >
        {/* Soft Alabaster Sun & Sky Illumination for Maximum Architectural Clarity */}
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[6, 9, 5]}
          intensity={2.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-4.5}
          shadow-camera-right={4.5}
          shadow-camera-top={4.5}
          shadow-camera-bottom={-4.5}
          color="#fffaf0"
        />
        <directionalLight position={[-5, 4, -4]} intensity={0.8} color="#e5f0ff" />
        <directionalLight position={[0, 6, -5]} intensity={1.0} color="#ffd8ad" />

        <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.03}>
          <MansionModel progress={progress} />
        </Float>

        <ContactShadows position={[0, -0.66, 0]} opacity={0.55} scale={7.2} blur={2.0} far={2.8} />

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 6}
          rotateSpeed={0.7}
          autoRotate={false}
        />
      </Canvas>

      {/* Floating 3D Interaction Notice */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-10">
        <span className="text-[9.5px] uppercase tracking-widest font-mono text-muted/80 bg-white/85 px-3 py-1 rounded-full border border-black/10 shadow-xs backdrop-blur-xs">
          3D View &middot; Drag to Orbit 360&deg;
        </span>
      </div>
    </div>
  );
}
