"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#ff5a1f";
const WALL = "#ebe6dc";
const WALL_DARK = "#d8d2c5";
const CONCRETE = "#9a958c";
const GLASS = "#8fb8c9";
const ROOF = "#2c2c29";
const GRASS = "#3a4a33";
const FRAME = "#55504a";

/** 0 = Inquiry, 1 = Design, 2 = Permits, 3 = Financing, 4 = Groundbreaking, 5 = Construction, 6 = Turnover */
function House({ step }: { step: number }) {
  const group = useRef<THREE.Group>(null);
  const pin = useRef<THREE.Group>(null);
  const blueprint = useRef<THREE.Group>(null);
  const permit = useRef<THREE.Group>(null);
  const financing = useRef<THREE.Group>(null);
  const foundation = useRef<THREE.Group>(null);
  const walls = useRef<THREE.Group>(null);
  const roof = useRef<THREE.Group>(null);
  const details = useRef<THREE.Group>(null);

  const show = (ref: { current: THREE.Object3D | null }, visible: boolean) => {
    if (!ref.current) return;
    const target = visible ? 1 : 0;
    ref.current.visible = visible || ref.current.scale.x > 0.02;
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, target, 6, 1 / 30);
    ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, target, 6, 1 / 30);
    ref.current.scale.z = THREE.MathUtils.damp(ref.current.scale.z, target, 6, 1 / 30);
  };

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1;

    show(pin, step === 0);
    show(blueprint, step >= 1 && step <= 3);
    show(permit, step >= 2 && step <= 3);
    show(financing, step === 3);
    show(foundation, step >= 4);
    show(walls, step >= 5);
    show(roof, step >= 5);
    show(details, step >= 6);
  });

  return (
    <group ref={group} position={[0, -0.55, 0]}>
      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[3.4, 48]} />
        <meshStandardMaterial color={GRASS} roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1.6]}>
        <planeGeometry args={[0.9, 1.6]} />
        <meshStandardMaterial color="#8a8578" roughness={0.9} />
      </mesh>

      {/* stage 0: site survey pin */}
      <group ref={pin} scale={0}>
        <mesh position={[0.6, 0.3, 0.6]}>
          <cylinderGeometry args={[0.015, 0.015, 0.6, 6]} />
          <meshStandardMaterial color={ACCENT} />
        </mesh>
        <mesh position={[0.6, 0.6, 0.6]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.09, 0.14, 4]} />
          <meshStandardMaterial color={ACCENT} />
        </mesh>
      </group>

      {/* stage 1-3: blueprint footprint */}
      <group ref={blueprint} scale={0}>
        <lineSegments position={[0, 0.01, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.2, 0.02, 2.0)]} />
          <lineBasicMaterial color="#9a958c" />
        </lineSegments>
      </group>

      {/* stage 2-3: permit stamp */}
      <group ref={permit} scale={0} position={[1.5, 0.9, 0]}>
        <mesh>
          <torusGeometry args={[0.16, 0.018, 8, 24]} />
          <meshStandardMaterial color={ACCENT} />
        </mesh>
        <mesh position={[-0.05, -0.02, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.02, 0.02]} />
          <meshStandardMaterial color={ACCENT} />
        </mesh>
        <mesh position={[0.03, 0.03, 0]} rotation={[0, 0, -Math.PI / 3.2]}>
          <boxGeometry args={[0.18, 0.02, 0.02]} />
          <meshStandardMaterial color={ACCENT} />
        </mesh>
      </group>

      {/* stage 3: financing icon */}
      <group ref={financing} scale={0} position={[-1.5, 0.9, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.05, 24]} />
          <meshStandardMaterial color={ACCENT} metalness={0.3} roughness={0.4} />
        </mesh>
      </group>

      {/* stage 4+: foundation slab */}
      <group ref={foundation} scale={0}>
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.3, 0.12, 2.1]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.95} />
        </mesh>
      </group>

      {/* stage 5+: walls */}
      <group ref={walls} scale={0} position={[0, 0.12, 0]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.1, 1.2, 1.9]} />
          <meshStandardMaterial color={WALL} roughness={0.8} />
        </mesh>
        {/* corner pilasters for a less "boxy" read */}
        <mesh position={[-1.05, 0.6, 0.95]} castShadow>
          <boxGeometry args={[0.14, 1.22, 0.14]} />
          <meshStandardMaterial color={WALL_DARK} roughness={0.75} />
        </mesh>
        <mesh position={[1.05, 0.6, 0.95]} castShadow>
          <boxGeometry args={[0.14, 1.22, 0.14]} />
          <meshStandardMaterial color={WALL_DARK} roughness={0.75} />
        </mesh>
        {/* entry portico */}
        <mesh position={[0, 0.32, 1.15]} castShadow>
          <boxGeometry args={[0.7, 0.64, 0.3]} />
          <meshStandardMaterial color={WALL_DARK} roughness={0.7} />
        </mesh>
      </group>

      {/* stage 5+: gable roof */}
      <group ref={roof} scale={0} position={[0, 1.18, 0]}>
        <mesh position={[-0.55, 0.28, 0]} rotation={[0, 0, Math.PI / 5.2]} castShadow>
          <boxGeometry args={[1.35, 0.06, 2.1]} />
          <meshStandardMaterial color={ROOF} roughness={0.55} metalness={0.15} />
        </mesh>
        <mesh position={[0.55, 0.28, 0]} rotation={[0, 0, -Math.PI / 5.2]} castShadow>
          <boxGeometry args={[1.35, 0.06, 2.1]} />
          <meshStandardMaterial color={ROOF} roughness={0.55} metalness={0.15} />
        </mesh>
        {/* chimney */}
        <mesh position={[0.6, 0.55, -0.55]} castShadow>
          <boxGeometry args={[0.18, 0.55, 0.18]} />
          <meshStandardMaterial color={WALL_DARK} roughness={0.85} />
        </mesh>
      </group>

      {/* stage 6: windows, door, finishing details */}
      <group ref={details} scale={0} position={[0, 0.12, 0]}>
        {/* door */}
        <mesh position={[0, 0.32, 1.31]}>
          <boxGeometry args={[0.36, 0.64, 0.03]} />
          <meshStandardMaterial color="#3a2e22" roughness={0.6} />
        </mesh>
        {/* windows, left + right, each with a frame */}
        {[-0.65, 0.65].map((x) => (
          <group key={x} position={[x, 0.65, 0.96]}>
            <mesh>
              <boxGeometry args={[0.46, 0.4, 0.03]} />
              <meshPhysicalMaterial
                color={GLASS}
                roughness={0.08}
                metalness={0.1}
                transparent
                opacity={0.8}
                transmission={0.35}
              />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(0.46, 0.4, 0.03)]} />
              <lineBasicMaterial color={FRAME} />
            </lineSegments>
            <mesh>
              <boxGeometry args={[0.02, 0.4, 0.034]} />
              <meshStandardMaterial color={FRAME} />
            </mesh>
            <mesh>
              <boxGeometry args={[0.46, 0.02, 0.034]} />
              <meshStandardMaterial color={FRAME} />
            </mesh>
          </group>
        ))}
        {/* upper-floor window */}
        <mesh position={[0, 1.0, 0.96]}>
          <boxGeometry args={[0.5, 0.28, 0.03]} />
          <meshPhysicalMaterial color={GLASS} roughness={0.08} transparent opacity={0.8} transmission={0.35} />
        </mesh>
        {/* small shrubs */}
        {[-0.95, 0.95].map((x) => (
          <mesh key={x} position={[x, 0.08, 1.35]} castShadow>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#4a5a3c" roughness={1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function ConstructionScene({ step }: { step: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [4.2, 2.1, 4.6], fov: 30 }}
    >
      <color attach="background" args={["#141413"]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={3.5}
        shadow-camera-bottom={-3.5}
      />
      <directionalLight position={[-3, 2, -3]} intensity={0.25} color="#ff8a4c" />

      <Float speed={1.1} rotationIntensity={0} floatIntensity={0.1}>
        <House step={step} />
      </Float>

      <ContactShadows position={[0, -0.63, 0]} opacity={0.5} scale={6} blur={2.4} far={2} />
      <Environment preset="city" environmentIntensity={0.45} />
    </Canvas>
  );
}
