"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#ff5a1f";
const WALL = "#e9e4da";
const CONCRETE = "#9a958c";
const GLASS = "#8fb8c9";
const ROOF = "#2a2a28";

function House({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const foundation = useRef<THREE.Mesh>(null);
  const walls = useRef<THREE.Group>(null);
  const roof = useRef<THREE.Mesh>(null);
  const details = useRef<THREE.Group>(null);
  const crane = useRef<THREE.Group>(null);

  // progress: 0..1 across the 7 steps
  const pin = THREE.MathUtils.smoothstep(progress, 0.0, 0.14);
  const foundationP = THREE.MathUtils.smoothstep(progress, 0.5, 0.64);
  const wallsP = THREE.MathUtils.smoothstep(progress, 0.64, 0.82);
  const roofP = THREE.MathUtils.smoothstep(progress, 0.78, 0.9);
  const detailsP = THREE.MathUtils.smoothstep(progress, 0.88, 1.0);
  const craneP = 1 - THREE.MathUtils.smoothstep(progress, 0.92, 1.0);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
    }
    if (foundation.current) {
      const s = Math.max(0.001, foundationP);
      foundation.current.scale.set(1, s, 1);
      (foundation.current.material as THREE.MeshStandardMaterial).opacity = foundationP;
    }
    if (walls.current) {
      const s = Math.max(0.001, wallsP);
      walls.current.scale.set(1, s, 1);
      walls.current.visible = wallsP > 0.01;
    }
    if (roof.current) {
      roof.current.position.y = THREE.MathUtils.lerp(2.4, 1.85, roofP);
      (roof.current.material as THREE.MeshStandardMaterial).opacity = roofP;
      roof.current.visible = roofP > 0.01;
    }
    if (details.current) {
      details.current.visible = detailsP > 0.01;
      details.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
        if (mat && "opacity" in mat) mat.opacity = detailsP;
      });
    }
    if (crane.current) {
      crane.current.visible = craneP > 0.02;
      crane.current.position.y = -2 + craneP * 2;
    }
  });

  const wallGeo = useMemo(() => new THREE.BoxGeometry(2.2, 1, 2.2), []);

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* site marker (stage 1) */}
      <mesh position={[0, -0.05, 0]} visible={pin > 0.02}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color={ACCENT} transparent opacity={pin} />
      </mesh>

      {/* foundation slab */}
      <mesh ref={foundation} position={[0, -0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.3, 2.4]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.9} transparent />
      </mesh>

      {/* walls */}
      <group ref={walls} position={[0, 0.4, 0]}>
        <mesh geometry={wallGeo} castShadow receiveShadow>
          <meshStandardMaterial color={WALL} roughness={0.75} metalness={0.02} />
        </mesh>
      </group>

      {/* roof */}
      <mesh ref={roof} position={[0, 1.85, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.85, 0.9, 4]} />
        <meshStandardMaterial color={ROOF} roughness={0.5} metalness={0.1} transparent />
      </mesh>

      {/* finishing details: windows + door */}
      <group ref={details} position={[0, 0.4, 0]}>
        <mesh position={[0, 0.1, 1.11]}>
          <boxGeometry args={[0.5, 0.75, 0.02]} />
          <meshPhysicalMaterial
            color={GLASS}
            roughness={0.05}
            metalness={0.2}
            transparent
            opacity={0.85}
            transmission={0.4}
          />
        </mesh>
        <mesh position={[-0.65, 0.2, 1.11]}>
          <boxGeometry args={[0.4, 0.4, 0.02]} />
          <meshPhysicalMaterial color={GLASS} roughness={0.05} transparent opacity={0.85} transmission={0.4} />
        </mesh>
        <mesh position={[0.65, 0.2, 1.11]}>
          <boxGeometry args={[0.4, 0.4, 0.02]} />
          <meshPhysicalMaterial color={GLASS} roughness={0.05} transparent opacity={0.85} transmission={0.4} />
        </mesh>
        <mesh position={[0, 0.1, 1.11]}>
          <boxGeometry args={[0.02, 0.75, 0.02]} />
          <meshStandardMaterial color={ACCENT} transparent />
        </mesh>
      </group>

      {/* crane, visible only while actively building */}
      <group ref={crane} position={[-2, 0, -1.6]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.4, 6]} />
          <meshStandardMaterial color="#3a3a36" />
        </mesh>
        <mesh position={[0.6, 2.3, 0]}>
          <boxGeometry args={[1.4, 0.04, 0.04]} />
          <meshStandardMaterial color="#3a3a36" />
        </mesh>
        <mesh position={[-0.15, 2.1, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.04]} />
          <meshStandardMaterial color={ACCENT} />
        </mesh>
      </group>
    </group>
  );
}

export default function ConstructionScene({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [3.6, 2.4, 4.2], fov: 32 }}
    >
      <color attach="background" args={["#141413"]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#ff8a4c" />

      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.15}>
        <House progress={progress} />
      </Float>

      <ContactShadows position={[0, -0.62, 0]} opacity={0.55} scale={6} blur={2.2} far={2} />
      <Environment preset="city" environmentIntensity={0.5} />
    </Canvas>
  );
}
