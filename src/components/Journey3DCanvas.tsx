"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const seg = (p: number, a: number, b: number) => ease(clamp((p - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export interface Journey3DHandle {
  setProgress: (p: number) => void;
}

interface Journey3DCanvasProps {
  initialProgress?: number;
  progress?: number;
  onInit?: (handle: Journey3DHandle) => void;
}

export default function Journey3DCanvas({
  initialProgress = 0,
  progress,
  onInit,
}: Journey3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Journey3DHandle | null>(null);

  useEffect(() => {
    if (progress !== undefined && engineRef.current) {
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

    // Performance-tuned pixel ratio (1.25x max) for buttery 60 FPS
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = false;

    const PAPER = new THREE.Color("#ebe5da");
    const DUSK = new THREE.Color("#2a3344");
    const bgColor = new THREE.Color().copy(PAPER);
    const scene = new THREE.Scene();
    scene.background = bgColor;
    scene.fog = new THREE.Fog(PAPER.clone(), 45, 95);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 200);

    // ── Architectural Directional & Ambient Lighting ──
    const hemi = new THREE.HemisphereLight("#fffcf5", "#d4c8b5", 1.6);
    const sun = new THREE.DirectionalLight("#fff3e0", 2.2);
    sun.position.set(-16, 26, 20);

    // Interior Warm Sconces & Chandelier Glow
    const warmA = new THREE.PointLight("#ffb867", 0, 20, 1.8);
    warmA.position.set(-1.8, 2.8, 3.2);
    const warmB = new THREE.PointLight("#ffb867", 0, 18, 1.8);
    warmB.position.set(3.5, 5.5, 3.0);
    const waterGlow = new THREE.PointLight("#2fd6eb", 0, 12, 2.0);
    waterGlow.position.set(-4.5, 0.4, 6.5);
    scene.add(hemi, sun, warmA, warmB, waterGlow);

    // ── Material Palette ──
    const std = (color: string, o = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, ...o });

    const M = {
      ground: std("#e5ded2", { roughness: 1 }),
      board: std("#dfd7c8", { roughness: 0.95 }),
      blueprintWall: std("#2c241d", { roughness: 0.9 }),
      earth: std("#69513d", { roughness: 1, transparent: true, opacity: 0 }),
      concrete: std("#cfc7bc"),
      plaster: std("#f3ede2"),
      charcoal: std("#36322e", { roughness: 0.7 }),
      travertine: std("#d8d0c2", { roughness: 0.95 }), // Signature Travertine Portal
      mahogany: std("#2b180d", { roughness: 0.75 }),
      timber: std("#946237", { roughness: 0.6 }),
      soffit: std("#b57e47", { roughness: 0.55 }),
      glass: std("#212b36", {
        roughness: 0.08,
        metalness: 0.35,
        emissive: new THREE.Color("#ffc983"),
        emissiveIntensity: 0,
      }),
      rail: std("#9fb2bd", { roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.4 }),
      massing: std("#fbf7ee", { roughness: 0.9, transparent: true, opacity: 0 }),
      lawn: std("#778759", { roughness: 1, transparent: true, opacity: 0 }),
      drive: std("#c7bfb1", { roughness: 0.95, transparent: true, opacity: 0 }),
      deck: std("#9e7146", { roughness: 0.7, transparent: true, opacity: 0 }),
      water: std("#369caa", {
        roughness: 0.05,
        metalness: 0.1,
        emissive: new THREE.Color("#2fb6c9"),
        emissiveIntensity: 0,
        transparent: true,
        opacity: 0,
      }),
      leaf: std("#586b4a", { roughness: 0.9, flatShading: true }),
      trunk: std("#614937"),
      stake: std("#c49f75"),
      led: new THREE.MeshBasicMaterial({ color: "#ffe0b2", transparent: true, opacity: 0 }),
      sunball: new THREE.MeshBasicMaterial({ color: "#d4a76a", transparent: true, opacity: 0 }),
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
      mat: THREE.Material
    ) => {
      const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      g.translate(0, (y1 - y0) / 2, 0);
      const m = new THREE.Mesh(g, mat);
      m.position.set((x0 + x1) / 2, y0, (z0 + z1) / 2);
      return m;
    };

    const flat = (x0: number, x1: number, z0: number, z1: number, y: number, mat: THREE.Material) => {
      const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0);
      g.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(g, mat);
      m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
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

    const strokes = (
      edges: [number, number, number, number, number?, number?][],
      mat: THREE.LineBasicMaterial,
      a: number,
      b: number,
      { jitter = 0, piece = 0.35, y = 0.05, alwaysVisible = false } = {}
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
          const e = alwaysVisible ? 1 : seg(p, a, b);
          l.visible = alwaysVisible || e > 0;
          g.setDrawRange(0, Math.floor((total * (alwaysVisible ? 1 : e)) / 2) * 2);
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

    // ── The Ground Site & Drafting Board Base ──
    add(flat(-50, 50, -50, 50, 0, M.ground));

    // Raised Architectural Blueprint Board (Visible immediately right in front of camera)
    const draftingBoard = add(box(-12, 13, -0.04, 0.02, -8, 8, M.board));
    items.push({
      update: (p) => {
        // Subtle presence at start, blends into landscape later
        draftingBoard.visible = p < 6.2;
      },
    });

    const grid = add(new THREE.GridHelper(30, 30, "#b8aa97", "#d0c5b4"));
    grid.position.set(0, 0.03, 0);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.65;
    items.push({
      update: (p) => {
        const op = 0.65 * (1 - seg(p, 4.4, 5.2));
        (grid.material as THREE.Material).opacity = Math.max(op, 0);
        grid.visible = op > 0.01;
      },
    });

    // ── 01 · Consultation: Authentic Architectural Blueprint Plan with Visible Walls ──
    // Solid 3D wall footprints that are visible IMMEDIATELY from p = 0.0 (no blank void!)
    const bpWall1 = add(box(-7.6, -7.2, 0.03, 0.28, -3.8, 3.2, M.blueprintWall));
    const bpWall2 = add(box(-7.2, 3.4, 0.03, 0.28, -3.8, -3.4, M.blueprintWall));
    const bpWall3 = add(box(-7.2, 3.4, 0.03, 0.28, 2.8, 3.2, M.blueprintWall));
    const bpWall4 = add(box(3.0, 3.4, 0.03, 0.28, -3.8, 3.2, M.blueprintWall));
    const bpWall5 = add(box(3.4, 9.4, 0.03, 0.28, -3.8, -3.4, M.blueprintWall)); // Carport wall
    const bpWall6 = add(box(3.4, 9.4, 0.03, 0.28, 3.8, 4.2, M.blueprintWall));

    // Interior room partition walls
    const bpWall7 = add(box(-2.5, -2.2, 0.03, 0.22, -3.8, 0.5, M.blueprintWall));
    const bpWall8 = add(box(-2.5, 3.2, 0.03, 0.22, 0.2, 0.5, M.blueprintWall));

    [bpWall1, bpWall2, bpWall3, bpWall4, bpWall5, bpWall6, bpWall7, bpWall8].forEach((w) => {
      items.push({
        update: (p) => {
          // Immediately solid at p=0, fades out gracefully when massing rises at p=2.2-2.6
          const e = 1 - seg(p, 2.2, 2.6);
          w.visible = e > 0.01;
          w.scale.y = Math.max(e, 0.01);
        },
      });
    });

    // Drafted Pencil Ink Lines on top of walls (always visible from p = 0.0)
    const pencil = ink("#4a3e33", 0.95);
    fade(pencil, 0, 0.05, 0.95, [4.2, 5.0]);
    const sketch = [
      ...rect(-7.8, 3.6, -4, 3.4, 0.6),
      ...rect(3.4, 9.6, -4, 4.4, 0.5),
      ...rect(-6.4, 6.4, -4.2, 3.0, 0.6),
      ...rect(-2.5, 3.2, 0.2, 3.2, 0.3),
    ];
    strokes(sketch, pencil, 0, 0.5, { jitter: 0.03, alwaysVisible: true });

    // ── 02 · Site Visit: Property Boundary Stakes, North Arrow & Sun Path Arc ──
    const lotMat = ink("#1f1711");
    fade(lotMat, 1.0, 1.15, 0.85, [6.0, 6.6]);
    strokes(rect(-12, 13, -7, 10), lotMat, 1.0, 1.5, { piece: 0.4 });

    // 4 Corner Survey Stakes with Flags
    [
      [-12, -7],
      [13, -7],
      [13, 10],
      [-12, 10],
    ].forEach(([x, z], i) => {
      const s = new THREE.Group();
      s.position.set(x, 0, z);
      const post = box(-0.12, 0.12, 0, 1.5, -0.12, 0.12, M.stake);
      post.position.set(0, 0, 0);
      s.add(post);
      const flag = box(0, 0.6, 1.1, 1.45, -0.02, 0.02, std("#b38152"));
      flag.position.set(0.3, 1.1, 0);
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

    // North Compass on Ground
    const northShape = new THREE.Shape([
      new THREE.Vector2(0, 1.5),
      new THREE.Vector2(0.7, -0.8),
      new THREE.Vector2(0, -0.3),
      new THREE.Vector2(-0.7, -0.8),
    ]);
    const north = new THREE.Mesh(
      new THREE.ShapeGeometry(northShape),
      new THREE.MeshBasicMaterial({
        color: "#211a14",
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    north.rotation.x = -Math.PI / 2;
    north.position.set(10.5, 0.06, -5.0);
    add(north);
    fade(north.material as THREE.Material & { opacity: number }, 1.25, 1.55, 0.9, [4.4, 5.0]);

    // Sun Arc Across the Sky
    const arcPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 36; i++) {
      const a = (Math.PI * i) / 36;
      arcPts.push(new THREE.Vector3(Math.cos(a) * 15, Math.sin(a) * 11 + 0.3, -2));
    }
    const arcMat = ink("#a67c52");
    fade(arcMat, 1.2, 1.3, 0.85, [3.2, 3.8]);
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

    // Glowing Golden Sun Ball
    const sunBall = add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), M.sunball));
    fade(M.sunball, 1.35, 1.5, 0.95, [3.0, 3.5]);
    items.push({
      update: (p) => {
        const t = seg(p, 1.3, 2.0);
        const idx = Math.min(Math.floor(t * (arcPts.length - 1)), arcPts.length - 1);
        sunBall.position.copy(arcPts[idx]);
      },
    });

    // ── 03 · Design Development: 3D Architectural Massing Volumes ──
    rise(box(-7.6, 3.4, 0, 3.4, -3.8, 3.2, M.massing), 2.05, 2.45);
    rise(box(3.4, 9.4, 0, 3.4, -3.8, 4.2, M.massing), 2.2, 2.6);
    rise(box(-6.2, 6.4, 3.4, 6.8, -4.2, 3.0, M.massing), 2.4, 2.85);
    fade(M.massing, 2.0, 2.15, 0.95, [3.2, 3.75]);

    const mLines = ink("#2a211a");
    fade(mLines, 2.05, 2.15, 0.85, [4.8, 5.2]);
    const massEdges: [number, number, number, number, number?, number?][] = [
      ...rect(-7.6, 3.4, -3.8, 3.2).map(([x0, z0, x1, z1]) => [x0, z0, x1, z1, 3.4, 3.4] as [number, number, number, number, number, number]),
      ...rect(3.4, 9.4, -3.8, 4.2).map(([x0, z0, x1, z1]) => [x0, z0, x1, z1, 3.4, 3.4] as [number, number, number, number, number, number]),
      ...rect(-6.2, 6.4, -4.2, 3.0).map(([x0, z0, x1, z1]) => [x0, z0, x1, z1, 6.8, 6.8] as [number, number, number, number, number, number]),
    ];
    strokes(massEdges, mLines, 2.15, 2.85, { piece: 0.4 });

    // ── 04 · Plans & Permits: Technical Blueprint Dimensions ──
    const dimMat = ink("#9b2f24");
    fade(dimMat, 3.0, 3.15, 0.9, [4.4, 4.9]);
    const dims: [number, number, number, number][] = [
      [-7.6, 4.6, 3.4, 4.6],
      [3.4, 4.6, 9.4, 4.6],
      [10.4, -3.8, 10.4, 4.2],
      [-8.6, -3.8, -8.6, 3.2],
    ];
    strokes(dims, dimMat, 3.05, 3.65, { piece: 0.35 });

    // ── 05 · Groundbreaking: Excavated Soil Trenches & Rebar Pins ──
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
      const pad = box(x - 0.7, x + 0.7, 0, 0.35, z - 0.7, z + 0.7, M.concrete);
      add(pad);
      items.push({
        update: (p) => {
          const e = seg(p, 4.15 + i * 0.03, 4.45 + i * 0.03);
          pad.visible = e > 0.01;
          pad.scale.y = Math.max(e, 0.01);
        },
      });
      const bar = box(x - 0.06, x + 0.06, 0.35, 1.9, z - 0.06, z + 0.06, M.charcoal);
      add(bar);
      items.push({
        update: (p) => {
          const e = seg(p, 4.5 + i * 0.04, 4.8 + i * 0.04) * (1 - seg(p, 5.05, 5.2));
          bar.visible = e > 0.01;
          bar.scale.y = Math.max(e, 0.01);
        },
      });
    });

    // ── 06 · Construction: Concrete Columns, Travertine Portal & Luxury Villa Structure ──
    COLS.forEach(([x, z], i) =>
      rise(box(x - 0.22, x + 0.22, 0.35, 3.4, z - 0.22, z + 0.22, M.concrete), 5.0 + i * 0.02, 5.25 + i * 0.02)
    );
    rise(box(-8.4, 9.6, 0, 0.3, -4.4, 4.4, M.concrete), 5.0, 5.15); // Foundation plinth
    rise(box(-7.6, 3.4, 0.3, 3.4, -3.8, 3.2, M.plaster), 5.22, 5.45); // GF Stucco walls
    rise(box(-9, 9.8, 3.4, 3.75, -4.6, 4.8, M.concrete), 5.4, 5.5); // 2F Transfer slab
    rise(box(-8.8, 9.6, 3.36, 3.4, -4.4, 4.6, M.soffit), 5.45, 5.52); // Timber under-soffit
    rise(box(-6.2, 6.4, 3.75, 6.8, -4.2, 3.0, M.charcoal), 5.5, 5.72); // 2F Upper pavilion
    rise(box(-7.4, 8.0, 6.8, 7.15, -5.2, 4.4, M.concrete), 5.7, 5.8); // Continuous roof slab
    rise(box(-7.2, 7.8, 6.76, 6.8, -5.0, 4.2, M.soffit), 5.74, 5.8); // Timber batten under-soffit

    // Signature Travertine Stone Entrance Portal Tower (Prominent 2-story shaft)
    rise(box(-1.6, -0.2, 0, 7.0, 2.8, 4.0, M.travertine), 5.3, 5.7);
    // Grand Oversized Mahogany Pivot Door
    rise(box(-1.3, -0.5, 0.3, 4.2, 3.96, 4.04, M.mahogany), 5.6, 5.85);

    // Panoramic Floor-to-Ceiling Glass Fenestration
    [
      [-7.3, -1.9, 0.5, 3.2, 3.2, 3.26],
      [-0.1, 3.2, 0.5, 3.2, 3.2, 3.26],
      [-5.9, -1.9, 4.0, 6.5, 3.0, 3.06],
      [-0.1, 1.3, 4.0, 6.5, 3.0, 3.06],
      [-7.66, -7.6, 0.5, 3.2, -3.4, 2.8],
      [-6.26, -6.2, 4.0, 6.5, -3.8, 2.6],
    ].forEach(([x0, x1, y0, y1, z0, z1], i) =>
      rise(box(x0, x1, y0, y1, z0, z1, M.glass), 5.72 + i * 0.03, 5.85 + i * 0.03)
    );

    // Acoustic Vertical Timber Louvers on 2F
    for (let i = 0; i < 18; i++) {
      const x = 1.7 + i * 0.26;
      rise(box(x, x + 0.09, 3.85, 6.7, 3.06, 3.22, M.timber), 5.78 + i * 0.008, 5.9 + i * 0.008);
    }

    // Frameless Glass Balustrades
    rise(box(9.5, 9.56, 3.75, 4.85, -4.4, 4.6, M.rail), 5.85, 5.95);
    rise(box(6.4, 9.56, 3.75, 4.85, 4.54, 4.6, M.rail), 5.85, 5.95);

    // ── 07 · Turnover: Dusk Illumination, Cascading Waterfall Pool & Twilight Atmosphere ──
    [
      [-9, 9.8, 3.24, 3.36, 4.66, 4.82],
      [-7.4, 8.0, 6.64, 6.76, 4.26, 4.42],
      [9.66, 9.82, 3.24, 3.36, -4.6, 4.8],
      [7.86, 8.02, 6.64, 6.76, -5.2, 4.4],
      [-9.02, -8.86, 3.24, 3.36, -4.6, 4.8],
      [-7.42, -7.26, 6.64, 6.76, -5.2, 4.4],
    ].forEach(([x0, x1, y0, y1, z0, z1]) => add(box(x0, x1, y0, y1, z0, z1, M.led)));
    fade(M.led, 6.35, 6.7);

    add(flat(-14, 14, 4.8, 12, 0.012, M.lawn));
    fade(M.lawn, 6.05, 6.35);
    add(flat(5.4, 12, 4.4, 12, 0.016, M.drive));
    fade(M.drive, 6.05, 6.3);
    add(flat(-10, -1, 5.4, 10, 0.018, M.deck));
    fade(M.deck, 6.1, 6.35);
    add(flat(-9, -2, 6, 9.5, 0.024, M.water));
    fade(M.water, 6.15, 6.4);

    // Tropical Trees
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

    // Twilight Sky Dome Shader
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(140, 24, 12),
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
            vec3 top = vec3(0.06, 0.08, 0.15);
            vec3 mid = vec3(0.18, 0.22, 0.35);
            vec3 hor = vec3(0.92, 0.55, 0.32);
            vec3 c = mix(hor, mid, smoothstep(0.0, 0.16, h));
            c = mix(c, top, smoothstep(0.16, 0.7, h));
            gl_FragColor = vec4(c, uO);
          }
        `,
      })
    );
    sky.renderOrder = -1;
    add(sky);

    const hemiDay = { sky: new THREE.Color("#fffcf5"), gnd: new THREE.Color("#d4c8b5") };
    const hemiDusk = { sky: new THREE.Color("#566485"), gnd: new THREE.Color("#251c14") };

    items.push({
      update: (p) => {
        const d = seg(p, 6.0, 6.6);
        const on = seg(p, 6.3, 6.8);
        bgColor.copy(PAPER).lerp(DUSK, d);
        if (scene.fog) scene.fog.color.copy(bgColor);
        hemi.color.copy(hemiDay.sky).lerp(hemiDusk.sky, d);
        hemi.groundColor.copy(hemiDay.gnd).lerp(hemiDusk.gnd, d);
        hemi.intensity = lerp(1.6, 0.95, d);
        sun.intensity = lerp(2.2, 0.75, d);
        sun.color.set("#fff3e0").lerp(new THREE.Color("#ffba75"), d);
        M.glass.emissiveIntensity = 0.8 * on;
        M.water.emissiveIntensity = 0.95 * on;
        warmA.intensity = 70 * on;
        warmB.intensity = 55 * on;
        waterGlow.intensity = 40 * on;
        sky.material.uniforms.uO.value = d;
        sky.visible = d > 0.01;
        M.ground.color.set("#e5ded2").lerp(new THREE.Color("#4a4238"), d);
      },
    });

    // ── Spacious Cinematic Camera Spline Path (Villa fully framed, classy & zoomed out) ──
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const camPath = new THREE.CatmullRomCurve3(
      [
        V(14.0, 22.0, 20.0), // 0: Blueprint drafting axonometric view (full drafting board visible)
        V(19.0, 18.0, 22.0), // 1: Sweeping around site survey stakes & sun arc
        V(20.0, 15.0, 24.0), // 2: Alabaster massing volumes rising
        V(18.0, 13.0, 24.0), // 3: Technical elevation with PRC stamp
        V(17.0, 13.0, 22.0), // 4: Excavation trenches & foundation rebar cages
        V(18.0, 11.0, 25.0), // 5: Construction of columns, travertine portal & louvers
        V(16.5, 8.5, 25.0),  // 6: Dusk beauty angle looking at villa standing proud
        V(16.5, 8.5, 25.0),  // 7: Clamped at final beauty angle
      ],
      false,
      "centripetal"
    );

    const lookPath = new THREE.CatmullRomCurve3(
      [
        V(0.5, 0.2, 0.0),   // 0: Center of blueprint
        V(0.5, 0.8, 0.5),   // 1: Center of site
        V(0.5, 2.0, 0.5),   // 2: Massing center
        V(0.5, 2.2, 0.5),   // 3: Elevation center
        V(0.5, 1.2, 0.5),   // 4: Footing center
        V(0.5, 2.5, 0.5),   // 5: Travertine portal center
        V(0.5, 2.8, 0.5),   // 6: Completed villa facade center
        V(0.5, 2.8, 0.5),   // 7: Completed villa facade center
      ],
      false,
      "centripetal"
    );

    let dirty = true;
    let drawn = -2;
    let target = initialProgress;
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
      // Adaptive FOV: Wider framing on mobile screens so villa is never cropped
      camera.fov = w < 768 ? 39 : w / h < 1.35 ? 35 : 30;
      camera.updateProjectionMatrix();
      dirty = true;
    }

    function draw() {
      const t = clamp(shown / 7);
      camPath.getPoint(t, pos);
      lookPath.getPoint(t, look);

      const drift = lean.x * 0.04;
      const dx = pos.x - look.x;
      const dz = pos.z - look.z;
      const c = Math.cos(drift);
      const s = Math.sin(drift);
      pos.x = look.x + dx * c - dz * s;
      pos.z = look.z + dx * s + dz * c;
      pos.y += lean.y * 0.6;

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
      // Critically damped follow: zero sluggish lag, tracks scroll wheel with 60fps fluidity
      const k = Math.min(1, dt * 26);
      shown = shown < 0 ? target : shown + (target - shown) * k;
      if (Math.abs(target - shown) < 0.0002) shown = target;

      const lx = lean.x;
      const ly = lean.y;
      const before = drawn;
      lean.x += (lean.tx - lean.x) * 0.12;
      lean.y += (lean.ty - lean.y) * 0.12;

      if (
        shown === before &&
        Math.abs(lean.x - lx) < 1e-4 &&
        Math.abs(lean.y - ly) < 1e-4 &&
        !dirty
      ) {
        return;
      }
      dirty = false;
      drawn = shown;
      draw();
    }

    // Mouse Parallax Lean
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

    // IntersectionObserver: Pause rendering when off-screen (0% idle CPU/GPU)
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          dirty = true;
          if (!running) {
            running = true;
            last = 0;
            raf = requestAnimationFrame(frame);
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(canvas);

    raf = requestAnimationFrame(frame);

    // Expose engine handle to parent component and internal ref
    const handle: Journey3DHandle = {
      setProgress: (p: number) => {
        target = clamp(p, 0, 7);
        dirty = true;
      },
    };
    engineRef.current = handle;
    onInit?.(handle);

    // If progress prop was provided initially, apply it immediately
    if (progress !== undefined) {
      target = clamp(progress, 0, 7);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
    };
  }, [initialProgress, progress, onInit]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block cursor-grab active:cursor-grabbing select-none"
    />
  );
}
