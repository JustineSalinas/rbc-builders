"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const seg = (p: number, a: number, b: number) => ease(clamp((p - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Journey3DCanvasProps {
  progress: number; // 0.0 to 7.0
  onStampChange?: (show: boolean) => void;
  onFinaleChange?: (show: boolean) => void;
  onPhaseChange?: (phase: string, stepIndex: number) => void;
}

const PHASES = [
  "Consultation",
  "Site visit & schematic design",
  "Design development",
  "Plans & permits",
  "Groundbreaking",
  "Construction",
  "Turnover",
];

export default function Journey3DCanvas({
  progress,
  onStampChange,
  onFinaleChange,
  onPhaseChange,
}: Journey3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const initialProgressRef = useRef(progress);
  const engineRef = useRef<{
    setProgress: (p: number) => void;
    setVisible: (v: boolean) => void;
  } | null>(null);

  // Sync incoming progress prop with the internal smooth Three.js engine
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const PAPER = new THREE.Color("#ece6dc");
    const DUSK = new THREE.Color("#1c2230");
    const bgColor = new THREE.Color().copy(PAPER);
    const scene = new THREE.Scene();
    scene.background = bgColor;
    scene.fog = new THREE.Fog(PAPER.clone(), 70, 140);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 300);

    // ── Lighting ──
    const hemi = new THREE.HemisphereLight("#fffaf2", "#d8cbb8", 1.5);
    const sun = new THREE.DirectionalLight("#fff1dc", 2.4);
    sun.position.set(-18, 30, 22);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, {
      left: -22,
      right: 22,
      top: 22,
      bottom: -22,
      near: 1,
      far: 90,
    });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;

    // Architectural Interior Chandeliers & Sconces
    const warmA = new THREE.PointLight("#ffb867", 0, 22, 1.6);
    warmA.position.set(-2, 2.6, 6.5);
    const warmB = new THREE.PointLight("#ffb867", 0, 20, 1.6);
    warmB.position.set(4, 6.2, 5.5);
    scene.add(hemi, sun, warmA, warmB);

    // ── Materials ──
    const std = (color: string, o = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, ...o });

    const M = {
      ground: std("#e9e2d6", { roughness: 1 }),
      earth: std("#7a6450", { roughness: 1, transparent: true, opacity: 0 }),
      concrete: std("#d6cfc4"),
      plaster: std("#efe9df"),
      charcoal: std("#3d3a37", { roughness: 0.7 }),
      stone: std("#ded7cb", { roughness: 0.95 }), // Travertine Stone Portal
      timber: std("#9c6a3c", { roughness: 0.6 }),
      soffit: std("#b8834f", { roughness: 0.55 }),
      glass: std("#25303a", {
        roughness: 0.08,
        metalness: 0.3,
        emissive: new THREE.Color("#ffc983"),
        emissiveIntensity: 0,
      }),
      rail: std("#9fb2bd", { roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.35 }),
      massing: std("#fbf8f3", { roughness: 0.9, transparent: true, opacity: 0 }),
      lawn: std("#7f8f60", { roughness: 1, transparent: true, opacity: 0 }),
      drive: std("#cbc3b6", { roughness: 0.95, transparent: true, opacity: 0 }),
      deck: std("#a87a4e", { roughness: 0.7, transparent: true, opacity: 0 }),
      water: std("#3f9fb0", {
        roughness: 0.05,
        metalness: 0.1,
        emissive: new THREE.Color("#2fb6c9"),
        emissiveIntensity: 0,
        transparent: true,
        opacity: 0,
      }),
      leaf: std("#617552", { roughness: 0.9, flatShading: true }),
      trunk: std("#6d5440"),
      stake: std("#c9a47a"),
      led: new THREE.MeshBasicMaterial({ color: "#ffd9a3", transparent: true, opacity: 0 }),
      sunball: new THREE.MeshBasicMaterial({ color: "#c9a47a", transparent: true, opacity: 0 }),
    };

    const ink = (color: string, opacity = 0) =>
      new THREE.LineBasicMaterial({ color, transparent: true, opacity });

    // ── Animation Items Registry ──
    const items: { update: (p: number) => void }[] = [];
    const add = <T extends THREE.Object3D>(o: T): T => {
      scene.add(o);
      return o;
    };

    const box = (
      x0: number,
      x1: number,
      y0: number,
      y1: number,
      z0: number,
      z1: number,
      mat: THREE.Material,
      shadow = true
    ) => {
      const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      g.translate(0, (y1 - y0) / 2, 0);
      const m = new THREE.Mesh(g, mat);
      m.position.set((x0 + x1) / 2, y0, (z0 + z1) / 2);
      m.castShadow = shadow;
      m.receiveShadow = true;
      return m;
    };

    const flat = (x0: number, x1: number, z0: number, z1: number, y: number, mat: THREE.Material) => {
      const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0);
      g.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(g, mat);
      m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
      m.receiveShadow = true;
      return m;
    };

    const rise = (m: THREE.Mesh, a: number, b: number) => {
      add(m);
      items.push({
        update: (p) => {
          const e = seg(p, a, b);
          m.visible = e > 0.002;
          m.scale.y = Math.max(e, 0.002);
        },
      });
      return m;
    };

    const fade = (
      mat: THREE.Material & { opacity: number },
      a: number,
      b: number,
      max = 1,
      out?: [number, number]
    ) => {
      items.push({
        update: (p) => {
          mat.opacity = max * seg(p, a, b) * (out ? 1 - seg(p, out[0], out[1]) : 1);
        },
      });
    };

    // Pencil/ink drafting strokes cut into segments for smooth drawRange reveals
    const strokes = (
      edges: [number, number, number, number, number?, number?][],
      mat: THREE.LineBasicMaterial,
      a: number,
      b: number,
      { jitter = 0, piece = 0.3, y = 0.04 } = {}
    ) => {
      const pos: number[] = [];
      const j = () => (Math.random() - 0.5) * jitter;
      edges.forEach(([x0, z0, x1, z1, y0 = y, y1 = y]) => {
        const len = Math.hypot(x1 - x0, z1 - z0, y1 - y0);
        const n = Math.max(1, Math.round(len / piece));
        for (let i = 0; i < n; i++) {
          const t0 = i / n;
          const t1 = (i + 1) / n;
          pos.push(
            lerp(x0, x1, t0) + j(),
            lerp(y0, y1, t0),
            lerp(z0, z1, t0) + j(),
            lerp(x0, x1, t1) + j(),
            lerp(y0, y1, t1),
            lerp(z0, z1, t1) + j()
          );
        }
      });
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      const l = add(new THREE.LineSegments(g, mat));
      const total = pos.length / 3;
      items.push({
        update: (p) => {
          const e = seg(p, a, b);
          l.visible = e > 0;
          g.setDrawRange(0, Math.floor((total * e) / 2) * 2);
        },
      });
      return l;
    };

    const rect = (x0: number, x1: number, z0: number, z1: number, over = 0): [number, number, number, number][] => [
      [x0 - over, z0, x1 + over, z0],
      [x1, z0 - over, x1, z1 + over],
      [x1 + over, z1, x0 - over, z1],
      [x0, z1 + over, x0, z0 - over],
    ];

    // ── The Ground Site ──
    add(flat(-60, 60, -60, 60, 0, M.ground));
    const grid = add(new THREE.GridHelper(40, 40, "#bfb3a3", "#d3c9bb"));
    grid.position.set(0, 0.01, 2);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0;
    items.push({
      update: (p) => {
        const op = 0.55 * seg(p, 1, 1.5) * (1 - seg(p, 4.4, 5.2));
        (grid.material as THREE.Material).opacity = op;
        grid.visible = op > 0.01;
      },
    });

    // ── 01 · Consultation: The Footprint Sketched in Architectural Pencil ──
    const pencil = ink("#7d6d5d");
    fade(pencil, 0, 0.15, 0.9, [4.3, 5.1]);
    const sketch = [
      ...rect(-8, 3.6, -4, 3.6, 0.7),
      ...rect(3.6, 9.6, -4, 4.4, 0.5),
      ...rect(-6.2, 6.4, -4.2, 3.0, 0.6),
    ];
    strokes(sketch, pencil, 0.05, 0.85, { jitter: 0.07 });
    strokes(sketch, pencil, 0.3, 0.98, { jitter: 0.16 });

    // ── 02 · Site Visit: Property Boundary, Stakes, North Arrow, Sun Path Arc ──
    const lotMat = ink("#2a211a");
    fade(lotMat, 1.0, 1.1, 0.7, [6.2, 6.8]);
    strokes(rect(-14, 14, -8, 12), lotMat, 1.0, 1.55, { piece: 0.45 });

    [
      [-14, -8],
      [14, -8],
      [14, 12],
      [-14, 12],
    ].forEach(([x, z], i) => {
      const s = new THREE.Group();
      s.position.set(x, 0, z);
      const post = box(-0.12, 0.12, 0, 1.4, -0.12, 0.12, M.stake);
      post.position.set(0, 0, 0);
      s.add(post);
      const flag = box(0, 0.6, 1.05, 1.35, -0.02, 0.02, std("#a07a55"));
      flag.position.set(0.3, 1.05, 0);
      s.add(flag);
      add(s);
      items.push({
        update: (p) => {
          const e = seg(p, 1.15 + i * 0.08, 1.45 + i * 0.08) * (1 - seg(p, 5.6, 6.2));
          s.visible = e > 0.01;
          s.scale.setScalar(Math.max(e, 0.01));
        },
      });
    });

    // North Arrow Compass on Ground
    const northShape = new THREE.Shape([
      new THREE.Vector2(0, 1.4),
      new THREE.Vector2(0.7, -0.8),
      new THREE.Vector2(0, -0.3),
      new THREE.Vector2(-0.7, -0.8),
    ]);
    const north = new THREE.Mesh(
      new THREE.ShapeGeometry(northShape),
      new THREE.MeshBasicMaterial({
        color: "#2a211a",
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    north.rotation.x = -Math.PI / 2;
    north.position.set(11.5, 0.05, -5.5);
    add(north);
    fade(north.material as THREE.Material & { opacity: number }, 1.3, 1.6, 0.85, [4.4, 5]);

    // Sun Path Arc Across the Sky
    const arcPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 48; i++) {
      const a = (Math.PI * i) / 48;
      arcPts.push(new THREE.Vector3(Math.cos(a) * 17, Math.sin(a) * 13 + 0.2, -3));
    }
    const arcMat = ink("#a07a55");
    fade(arcMat, 1.2, 1.3, 0.8, [3.2, 3.8]);
    const arcEdges: [number, number, number, number, number?, number?][] = [];
    for (let i = 0; i < arcPts.length - 1; i++) {
      arcEdges.push([
        arcPts[i].x,
        arcPts[i].z,
        arcPts[i + 1].x,
        arcPts[i + 1].z,
        arcPts[i].y,
        arcPts[i + 1].y,
      ]);
    }
    strokes(arcEdges, arcMat, 1.25, 1.85, { piece: 0.5 });

    // Glowing Sun Ball Traversing Arc
    const sunBall = add(new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), M.sunball));
    fade(M.sunball, 1.35, 1.5, 0.9, [3.0, 3.5]);
    items.push({
      update: (p) => {
        const t = seg(p, 1.3, 2.0);
        const idx = Math.min(Math.floor(t * (arcPts.length - 1)), arcPts.length - 1);
        sunBall.position.copy(arcPts[idx]);
      },
    });

    // ── 03 · Design Development: White Architectural Massing Volumes ──
    rise(box(-7.6, 3.4, 0, 3.4, -3.8, 3.2, M.massing), 2.05, 2.45);
    rise(box(3.4, 9.4, 0, 3.4, -3.8, 4.2, M.massing), 2.2, 2.6);
    rise(box(-6.2, 6.4, 3.4, 6.8, -4.2, 3.0, M.massing), 2.4, 2.85);
    fade(M.massing, 2.0, 2.15, 0.95, [3.2, 3.75]);

    // Massing Outline Ink Strokes
    const mLines = ink("#2a211a");
    fade(mLines, 2.05, 2.15, 0.85, [4.8, 5.2]);
    const massEdges: [number, number, number, number, number?, number?][] = [
      ...rect(-7.6, 3.4, -3.8, 3.2).map(([x0, z0, x1, z1]) => [x0, z0, x1, z1, 3.4, 3.4] as [number, number, number, number, number, number]),
      ...rect(3.4, 9.4, -3.8, 4.2).map(([x0, z0, x1, z1]) => [x0, z0, x1, z1, 3.4, 3.4] as [number, number, number, number, number, number]),
      ...rect(-6.2, 6.4, -4.2, 3.0).map(([x0, z0, x1, z1]) => [x0, z0, x1, z1, 6.8, 6.8] as [number, number, number, number, number, number]),
    ];
    strokes(massEdges, mLines, 2.15, 2.85, { piece: 0.35 });

    // ── 04 · Plans & Permits: Technical Blueprint Dimensions & Ink Drafting ──
    const dimMat = ink("#9b2f24");
    fade(dimMat, 3.0, 3.15, 0.85, [4.4, 4.9]);
    const dims: [number, number, number, number][] = [
      [-7.6, 5.0, 3.4, 5.0],
      [3.4, 5.0, 9.4, 5.0],
      [10.8, -3.8, 10.8, 4.2],
      [-9.0, -3.8, -9.0, 3.2],
    ];
    strokes(dims, dimMat, 3.05, 3.65, { piece: 0.3 });

    // ── 05 · Groundbreaking: Earth Excavation, Concrete Footings & Rebar Pins ──
    const earthBox = box(-8.6, 9.8, -0.45, 0.05, -4.6, 4.6, M.earth);
    add(earthBox);
    fade(M.earth, 4.0, 4.2, 0.95, [5.1, 5.4]);

    const COLS: [number, number][] = [
      [-7.2, -3.4],
      [-7.2, 2.8],
      [-2.4, -3.4],
      [-2.4, 2.8],
      [3.0, -3.4],
      [3.0, 2.8],
      [9.0, -3.4],
      [9.0, 3.8],
      [4.0, 3.8],
      [-0.8, 4.0],
      [0.8, 4.0],
    ];

    COLS.forEach(([x, z], i) => {
      // Footing pad
      const pad = box(x - 0.7, x + 0.7, 0, 0.35, z - 0.7, z + 0.7, M.concrete);
      add(pad);
      items.push({
        update: (p) => {
          const e = seg(p, 4.15 + i * 0.03, 4.45 + i * 0.03);
          pad.visible = e > 0.01;
          pad.scale.y = Math.max(e, 0.01);
        },
      });
      // Vertical Rebar Pins
      const bar = box(x - 0.05, x + 0.05, 0.35, 1.9, z - 0.05, z + 0.05, M.stone, false);
      add(bar);
      items.push({
        update: (p) => {
          const e = seg(p, 4.5 + i * 0.04, 4.8 + i * 0.04) * (1 - seg(p, 5.05, 5.2));
          bar.visible = e > 0.01;
          bar.scale.y = Math.max(e, 0.01);
        },
      });
    });

    // ── 06 · Construction: Structural Skeleton, Travertine Portal & Luxury Enclosure ──
    COLS.forEach(([x, z], i) =>
      rise(box(x - 0.22, x + 0.22, 0.35, 3.4, z - 0.22, z + 0.22, M.concrete), 5.0 + i * 0.02, 5.25 + i * 0.02)
    );
    // Plinth
    rise(box(-8.4, 9.6, 0, 0.3, -4.4, 4.4, M.concrete), 5.0, 5.15);
    // Ground Floor Stucco Walls
    rise(box(-7.6, 3.4, 0.3, 3.4, -3.8, 3.2, M.plaster), 5.22, 5.45);
    // 2F Transfer Slab
    rise(box(-9, 9.8, 3.4, 3.75, -4.6, 4.8, M.concrete), 5.4, 5.5);
    // 2F Timber Under-Soffit
    rise(box(-8.8, 9.6, 3.36, 3.4, -4.4, 4.6, M.soffit, false), 5.45, 5.52);
    // 2F Upper Pavilion
    rise(box(-6.2, 6.4, 3.75, 6.8, -4.2, 3.0, M.charcoal), 5.5, 5.72);
    // Main Continuous Roof Slab
    rise(box(-7.4, 8.0, 6.8, 7.15, -5.2, 4.4, M.concrete), 5.7, 5.8);
    // Continuous Timber Batten Under-Soffit
    rise(box(-7.2, 7.8, 6.76, 6.8, -5.0, 4.2, M.soffit, false), 5.74, 5.8);
    // Signature Travertine Stone Portal Tower
    rise(box(-1.6, -0.3, 0, 7.0, 3.0, 3.9, M.stone), 5.3, 5.7);

    // Floor-to-Ceiling Panoramic Glass Fenestration
    [
      [-7.3, -1.9, 0.5, 3.2, 3.2, 3.26],
      [-0.1, 3.2, 0.5, 3.2, 3.2, 3.26],
      [-5.9, -1.9, 4.0, 6.5, 3.0, 3.06],
      [-0.1, 1.3, 4.0, 6.5, 3.0, 3.06],
      [-7.66, -7.6, 0.5, 3.2, -3.4, 2.8],
      [-6.26, -6.2, 4.0, 6.5, -3.8, 2.6],
    ].forEach(([x0, x1, y0, y1, z0, z1], i) =>
      rise(box(x0, x1, y0, y1, z0, z1, M.glass, false), 5.72 + i * 0.03, 5.85 + i * 0.03)
    );

    // Acoustic Vertical Timber Louver Screen on 2F
    for (let i = 0; i < 18; i++) {
      const x = 1.7 + i * 0.26;
      rise(box(x, x + 0.09, 3.85, 6.7, 3.06, 3.22, M.timber), 5.78 + i * 0.008, 5.9 + i * 0.008);
    }

    // Frameless Glass Balustrade Rails
    rise(box(9.5, 9.56, 3.75, 4.85, -4.4, 4.6, M.rail, false), 5.85, 5.95);
    rise(box(6.4, 9.56, 3.75, 4.85, 4.54, 4.6, M.rail, false), 5.85, 5.95);

    // ── 07 · Turnover: Warm LED Soffits, Cascading Waterfall Pool & Twilight Sky ──
    [
      [-9, 9.8, 3.24, 3.36, 4.66, 4.82],
      [-7.4, 8.0, 6.64, 6.76, 4.26, 4.42],
      [9.66, 9.82, 3.24, 3.36, -4.6, 4.8],
      [7.86, 8.02, 6.64, 6.76, -5.2, 4.4],
      [-9.02, -8.86, 3.24, 3.36, -4.6, 4.8],
      [-7.42, -7.26, 6.64, 6.76, -5.2, 4.4],
    ].forEach(([x0, x1, y0, y1, z0, z1]) => add(box(x0, x1, y0, y1, z0, z1, M.led, false)));
    fade(M.led, 6.35, 6.7);

    // Landscaping, Driveway, Timber Deck, Cascading Waterfall Pool
    add(flat(-14, 14, 4.8, 12, 0.012, M.lawn));
    fade(M.lawn, 6.05, 6.35);
    add(flat(5.4, 12, 4.4, 12, 0.016, M.drive));
    fade(M.drive, 6.05, 6.3);
    add(flat(-10, -1, 5.4, 10, 0.018, M.deck));
    fade(M.deck, 6.1, 6.35);
    add(flat(-9, -2, 6, 9.5, 0.024, M.water));
    fade(M.water, 6.15, 6.4);

    // Tropical Trees & Foliage
    [
      [-12, -6, 1.2],
      [12.5, -6.5, 1],
      [-12.5, 3, 0.9],
      [13, 2, 1.1],
      [-3, -7.5, 0.8],
      [5, -7.2, 0.95],
    ].forEach(([x, z, s], i) => {
      const t = new THREE.Group();
      t.position.set(x, 0, z);
      const tr = box(-0.15, 0.15, 0, 2.2, -0.15, 0.15, M.trunk);
      t.add(tr);
      tr.position.set(0, 0, 0);
      const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 0), M.leaf);
      c.position.y = 3;
      c.castShadow = true;
      t.add(c);
      add(t);
      items.push({
        update: (p) => {
          const e = seg(p, 6.05 + i * 0.05, 6.4 + i * 0.05);
          t.visible = e > 0.01;
          t.scale.setScalar(Math.max(e, 0.01) * s);
        },
      });
    });

    // ── Twilight Sky Dome Shader ──
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(140, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        transparent: true,
        fog: false,
        uniforms: { uO: { value: 0 } },
        vertexShader: `
          varying vec3 vP;
          void main(){
            vP = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vP;
          uniform float uO;
          void main(){
            float h = clamp(vP.y, -0.1, 1.0);
            vec3 top = vec3(0.07, 0.09, 0.16);
            vec3 mid = vec3(0.20, 0.24, 0.38);
            vec3 hor = vec3(0.93, 0.56, 0.34);
            vec3 c = mix(hor, mid, smoothstep(0.0, 0.16, h));
            c = mix(c, top, smoothstep(0.16, 0.7, h));
            gl_FragColor = vec4(c, uO);
          }
        `,
      })
    );
    sky.renderOrder = -1;
    add(sky);

    // Dusk Lighting & Atmosphere Transition
    const hemiDay = { sky: new THREE.Color("#fffaf2"), gnd: new THREE.Color("#d8cbb8") };
    const hemiDusk = { sky: new THREE.Color("#5a6a8c"), gnd: new THREE.Color("#2a2018") };

    items.push({
      update: (p) => {
        const d = seg(p, 6.0, 6.6);
        const on = seg(p, 6.3, 6.8);
        bgColor.copy(PAPER).lerp(DUSK, d);
        if (scene.fog) scene.fog.color.copy(bgColor);
        hemi.color.copy(hemiDay.sky).lerp(hemiDusk.sky, d);
        hemi.groundColor.copy(hemiDay.gnd).lerp(hemiDusk.gnd, d);
        hemi.intensity = lerp(1.5, 0.55, d);
        sun.intensity = lerp(2.4, 0.25, d);
        sun.color.set("#fff1dc").lerp(new THREE.Color("#ff9f5a"), d);
        M.glass.emissiveIntensity = 0.75 * on;
        M.water.emissiveIntensity = 0.9 * on;
        warmA.intensity = 70 * on;
        warmB.intensity = 55 * on;
        sky.material.uniforms.uO.value = d;
        sky.visible = d > 0.01;
        M.ground.color.set("#e9e2d6").lerp(new THREE.Color("#5b5348"), d);
      },
    });

    // ── Smooth Cinematic Camera Spline Path ──
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const camPath = new THREE.CatmullRomCurve3(
      [
        V(0.5, 40, 9),   // 0: Blueprint top-down overview
        V(6, 34, 20),    // 1: Angling over site
        V(22, 22, 28),   // 2: Sweeping around massing
        V(28, 13, 24),   // 3: Technical elevation
        V(6, 31, 24),    // 4: Groundbreaking overview
        V(24, 12, 26),   // 5: Construction angle
        V(23, 8.5, 22),  // 6: Eye level
        V(23, 3.4, 29),  // 7: Ground level dusk looking up at villa standing proud
      ],
      false,
      "centripetal"
    );

    const lookPath = new THREE.CatmullRomCurve3(
      [
        V(0, 0, 1.5),
        V(0, 0, 2),
        V(0, 1.5, 1.5),
        V(0, 3, 0.5),
        V(0, 0.5, 1.5),
        V(0, 1.5, 1),
        V(0, 3, 0),
        V(0.5, 4.4, 0),
      ],
      false,
      "centripetal"
    );

    // ── Loop, Resize & Pointer Controls ──
    let dirty = true;
    let drawn = -2;
    let target = initialProgressRef.current;
    let shown = -1;
    let running = true;
    let visible = true;
    let raf = 0;
    let last = 0;
    const lean = { x: 0, y: 0, tx: 0, ty: 0 };
    const pos = new THREE.Vector3();
    const look = new THREE.Vector3();

    function resize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 1.2 ? 38 : 30;
      camera.updateProjectionMatrix();
      dirty = true;
    }

    function draw() {
      const t = clamp(shown / 7);
      camPath.getPoint(t, pos);
      lookPath.getPoint(t, look);

      const drift = lean.x * 0.05;
      const dx = pos.x - look.x;
      const dz = pos.z - look.z;
      const c = Math.cos(drift);
      const s = Math.sin(drift);
      pos.x = look.x + dx * c - dz * s;
      pos.z = look.z + dx * s + dz * c;
      pos.y += lean.y * 0.7;

      camera.position.copy(pos);
      camera.lookAt(look);

      items.forEach((it) => it.update(shown));
      renderer.render(scene, camera);
    }

    function frame(now: number) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!visible) return;

      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      const k = 1 - Math.pow(0.0025, dt);
      shown = shown < 0 ? target : shown + (target - shown) * k;
      if (Math.abs(target - shown) < 0.0005) shown = target;

      const lx = lean.x;
      const ly = lean.y;
      const before = drawn;
      lean.x += (lean.tx - lean.x) * 0.05;
      lean.y += (lean.ty - lean.y) * 0.05;

      if (shown === before && Math.abs(lean.x - lx) < 1e-4 && Math.abs(lean.y - ly) < 1e-4 && !dirty) {
        return;
      }
      dirty = false;
      drawn = shown;
      draw();
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      lean.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      lean.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };

    const onPointerLeave = () => {
      lean.tx = 0;
      lean.ty = 0;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(frame);

    engineRef.current = {
      setProgress: (p: number) => {
        target = clamp(p, 0, 7);
        // Callbacks for stamp, phase, and finale
        const stepIdx = Math.min(Math.floor(p), 6);
        onPhaseChange?.(PHASES[stepIdx], stepIdx);
        onStampChange?.(p >= 3.35 && p <= 4.85);
        onFinaleChange?.(p >= 6.5);
      },
      setVisible: (v: boolean) => {
        visible = v;
        dirty = true;
      },
    };

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
      renderer.dispose();
    };
  }, [onFinaleChange, onPhaseChange, onStampChange]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block cursor-grab active:cursor-grabbing select-none"
    />
  );
}
