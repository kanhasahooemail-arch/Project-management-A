import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HologramMode, PerformanceTier } from '../types';
import { sound } from '../utils/audio';
import { 
  Camera, 
  Maximize2, 
  RotateCw, 
  Zap, 
  Layers, 
  Radio, 
  Eye, 
  Cpu, 
  HandMetal,
  Compass,
  Activity,
  ShieldCheck,
  Battery,
  Globe
} from 'lucide-react';

interface Props {
  mode: HologramMode;
  onModeChange: (mode: HologramMode) => void;
  performanceTier: PerformanceTier;
  onPerformanceTierChange: (tier: PerformanceTier) => void;
  isHighContrast: boolean;
}

export const HolographicARCanvas: React.FC<Props> = ({
  mode,
  onModeChange,
  performanceTier,
  onPerformanceTierChange,
  isHighContrast,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [gestureMode, setGestureMode] = useState<boolean>(false);
  const [activeNodeInfo, setActiveNodeInfo] = useState<{ title: string; value: string; desc: string } | null>({
    title: 'Holographic Core Alpha',
    value: '99.98% Coherence',
    desc: 'Sub-4ms spatial latency via edge network relay'
  });
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.008);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [compassAngle, setCompassAngle] = useState<number>(42);

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraObjRef = useRef<THREE.PerspectiveCamera | null>(null);
  const hologramGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);
    cameraObjRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: performanceTier !== 'eco',
      powerPreference: performanceTier === 'eco' ? 'low-power' : 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(performanceTier === 'eco' ? 1 : Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Ambient and Point lights with cyber colors
    const ambientLight = new THREE.AmbientLight(0x00f0ff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10b981, 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0x8b5cf6, 2.0, 50);
    secondaryLight.position.set(-5, -5, 5);
    scene.add(secondaryLight);

    // Create Hologram Object Group
    const group = new THREE.Group();
    hologramGroupRef.current = group;
    scene.add(group);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraObjRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraObjRef.current.aspect = w / h;
      cameraObjRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [performanceTier]);

  // Build model geometry based on selected hologram mode
  useEffect(() => {
    const group = hologramGroupRef.current;
    const scene = sceneRef.current;
    if (!group || !scene) return;

    // Clear old children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
    }

    const primaryColor = isHighContrast ? 0x00ffff : 0x00f0ff;
    const secondaryColor = isHighContrast ? 0x00ff66 : 0x10b981;
    const accentColor = 0xa855f7;

    if (mode === 'digital_twin') {
      // 1. Digital Twin Avatar (Torso, head, neural aura, vital nodes)
      const headGeo = new THREE.IcosahedronGeometry(0.7, 2);
      const headMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.3;
      group.add(head);

      const torsoGeo = new THREE.CylinderGeometry(0.5, 0.7, 1.8, 8, 4, true);
      const torsoMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      const torso = new THREE.Mesh(torsoGeo, torsoMat);
      torso.position.y = -0.3;
      group.add(torso);

      // Vital Nodes (Heart rate node, neural node)
      const vitalGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const vitalMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
      const heartNode = new THREE.Mesh(vitalGeo, vitalMat);
      heartNode.position.set(0.15, 0.1, 0.4);
      group.add(heartNode);

      // Gyro concentric energy rings
      [1.4, 1.8, 2.2].forEach((radius, i) => {
        const ringGeo = new THREE.RingGeometry(radius - 0.02, radius, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: i === 0 ? primaryColor : secondaryColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.45 - i * 0.1,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2 + (i * 0.2);
        group.add(ring);
      });
    } else if (mode === 'automobile_v2x') {
      // 2. Connected Cyber EV Chassis with V2X radar beam & battery pack
      const bodyGeo = new THREE.BoxGeometry(3.2, 0.7, 1.6);
      const bodyMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      const cabinGeo = new THREE.ConeGeometry(1.2, 0.7, 4);
      const cabinMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      });
      const cabin = new THREE.Mesh(cabinGeo, cabinMat);
      cabin.rotation.y = Math.PI / 4;
      cabin.position.set(-0.2, 0.7, 0);
      group.add(cabin);

      // 4 Wheels
      const wheelGeo = new THREE.TorusGeometry(0.35, 0.1, 12, 24);
      const wheelMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const positions = [
        [-1.1, -0.4, 0.85],
        [1.1, -0.4, 0.85],
        [-1.1, -0.4, -0.85],
        [1.1, -0.4, -0.85],
      ];
      positions.forEach(([x, y, z]) => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.position.set(x, y, z);
        group.add(wheel);
      });

      // Battery Chassis Underbelly
      const batGeo = new THREE.BoxGeometry(2.4, 0.15, 1.3);
      const batMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 });
      const bat = new THREE.Mesh(batGeo, batMat);
      bat.position.y = -0.35;
      group.add(bat);

      // LiDAR beam wave
      const radarGeo = new THREE.ConeGeometry(2.0, 3.5, 32, 1, true);
      const radarMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const radar = new THREE.Mesh(radarGeo, radarMat);
      radar.rotation.z = -Math.PI / 2;
      radar.position.set(2.4, 0, 0);
      group.add(radar);
    } else if (mode === 'smart_city_gov') {
      // 3. Smart City & Gov Infrastructure Grid
      const gridHelper = new THREE.GridHelper(6, 16, primaryColor, 0x1e293b);
      gridHelper.position.y = -1.2;
      group.add(gridHelper);

      // Towers of varying heights
      for (let i = 0; i < 18; i++) {
        const h = 0.6 + Math.random() * 2.2;
        const bGeo = new THREE.BoxGeometry(0.35, h, 0.35);
        const bMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? primaryColor : secondaryColor,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
        });
        const building = new THREE.Mesh(bGeo, bMat);
        const angle = (i / 18) * Math.PI * 2;
        const radius = 0.8 + Math.random() * 1.6;
        building.position.set(Math.cos(angle) * radius, -1.2 + h / 2, Math.sin(angle) * radius);
        group.add(building);
      }

      // Civic Central Hub Dome
      const domeGeo = new THREE.SphereGeometry(0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.set(0, -1.2, 0);
      group.add(dome);
    } else if (mode === 'quantum_vault') {
      // 4. Encrypted Quantum Vault (Icosahedron core + dual cryptographic rings)
      const coreGeo = new THREE.OctahedronGeometry(1.4, 1);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      const innerGeo = new THREE.DodecahedronGeometry(0.8, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.6,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      group.add(inner);

      // 3 Orbital Encryption Shard Rings
      [2.0, 2.4, 2.8].forEach((r, idx) => {
        const ringGeo = new THREE.RingGeometry(r - 0.03, r, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: idx === 0 ? 0x00f0ff : idx === 1 ? 0x10b981 : 0xa855f7,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = (idx * Math.PI) / 3;
        ring.rotation.y = (idx * Math.PI) / 4;
        group.add(ring);
      });
    } else if (mode === 'earth_planetary_shield') {
      // 6. Earth Planetary Shield & Disaster Radar (Rotating 3D Globe with seismic, hurricane, and tsunami vectors)
      const globeGeo = new THREE.SphereGeometry(1.6, 24, 24);
      const globeMat = new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      const globe = new THREE.Mesh(globeGeo, globeMat);
      group.add(globe);

      // Core Tectonic Core (Molten inner core)
      const coreGeo = new THREE.IcosahedronGeometry(0.7, 1);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xf97316,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Planetary Atmospheric Safety Shield Sphere
      const shieldGeo = new THREE.SphereGeometry(2.1, 16, 16);
      const shieldMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const shield = new THREE.Mesh(shieldGeo, shieldMat);
      group.add(shield);

      // Seismic Fault Ring (Ring of Fire)
      const faultRingGeo = new THREE.RingGeometry(1.68, 1.74, 48);
      const faultRingMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const faultRing = new THREE.Mesh(faultRingGeo, faultRingMat);
      faultRing.rotation.x = Math.PI / 3;
      faultRing.rotation.y = Math.PI / 6;
      group.add(faultRing);

      // Hurricane Swirl Orbit (Cyan/White)
      const hurricaneGeo = new THREE.TorusGeometry(1.9, 0.04, 8, 32);
      const hurricaneMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.7,
      });
      const hurricane = new THREE.Mesh(hurricaneGeo, hurricaneMat);
      hurricane.rotation.x = -Math.PI / 4;
      group.add(hurricane);

      // Tsunami Ocean Buoy Sentinel Nodes (3 orbital markers)
      [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].forEach((ang) => {
        const buoyGeo = new THREE.OctahedronGeometry(0.12, 0);
        const buoyMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const buoy = new THREE.Mesh(buoyGeo, buoyMat);
        buoy.position.set(Math.cos(ang) * 1.85, Math.sin(ang) * 0.4, Math.sin(ang) * 1.85);
        group.add(buoy);
      });
    } else {
      // 5. Day-to-Day Habit & Productivity Matrix (4 Gyroscopic Orbits with glowing spheres)
      const categories = [
        { name: 'Vitality & Health', color: 0x10b981, radius: 1.2 },
        { name: 'Neural Flow Focus', color: 0x00f0ff, radius: 1.8 },
        { name: 'Clean Mobility (EV)', color: 0x38bdf8, radius: 2.3 },
        { name: 'Civic Sovereign Duty', color: 0xf59e0b, radius: 2.8 },
      ];

      categories.forEach((cat, idx) => {
        const ringGeo = new THREE.RingGeometry(cat.radius - 0.02, cat.radius, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: cat.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2 + idx * 0.25;
        ring.rotation.y = idx * 0.35;
        group.add(ring);

        // Orbiting habit node
        const sphereGeo = new THREE.SphereGeometry(0.16, 12, 12);
        const sphereMat = new THREE.MeshBasicMaterial({ color: cat.color });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.set(cat.radius * Math.cos(idx * 1.5), 0, cat.radius * Math.sin(idx * 1.5));
        ring.add(sphere);
      });
    }

    // Particle Cloud (Count dynamically adapted based on Performance Tier)
    if (particlesRef.current) {
      scene.remove(particlesRef.current);
      particlesRef.current.geometry.dispose();
    }

    const particleCount = performanceTier === 'eco' ? 600 : performanceTier === 'balanced' ? 2200 : 5000;
    const partGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 12;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const partMat = new THREE.PointsMaterial({
      size: performanceTier === 'eco' ? 0.03 : 0.045,
      color: primaryColor,
      transparent: true,
      opacity: performanceTier === 'eco' ? 0.35 : 0.6,
    });

    const particles = new THREE.Points(partGeo, partMat);
    particlesRef.current = particles;
    scene.add(particles);

    sound.playHologramTap();
  }, [mode, performanceTier, isHighContrast]);

  // Main Render Loop with Eco-throttling & Gesture emulation
  useEffect(() => {
    const fpsLimit = performanceTier === 'eco' ? 30 : 60;
    const interval = 1000 / fpsLimit;

    const animate = (currentTime: number) => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = currentTime - lastFrameTimeRef.current;
      if (delta < interval) return;
      lastFrameTimeRef.current = currentTime - (delta % interval);

      if (hologramGroupRef.current) {
        hologramGroupRef.current.rotation.y += rotationSpeed;
        hologramGroupRef.current.rotation.x = Math.sin(currentTime * 0.0008) * 0.12;

        if (gestureMode) {
          // Gesture modulation: gentle wave and expansion
          const scale = 1 + Math.sin(currentTime * 0.002) * 0.08;
          hologramGroupRef.current.scale.set(scale * zoomLevel, scale * zoomLevel, scale * zoomLevel);
        } else {
          hologramGroupRef.current.scale.set(zoomLevel, zoomLevel, zoomLevel);
        }
      }

      if (particlesRef.current && performanceTier !== 'eco') {
        particlesRef.current.rotation.y -= 0.001;
      }

      setCompassAngle(prev => (prev + 0.1) % 360);

      if (rendererRef.current && sceneRef.current && cameraObjRef.current) {
        rendererRef.current.render(sceneRef.current, cameraObjRef.current);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [performanceTier, rotationSpeed, zoomLevel, gestureMode]);

  // Camera toggle (real AR video stream)
  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setCameraError(null);
      return;
    }

    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        sound.playLockSuccess();
      }
    } catch (err: unknown) {
      console.warn('Camera access denied or unavailable; switching to simulated AR matrix pass-through', err);
      setCameraActive(true); // Active in simulated mode
      setCameraError('Real optical sensor access restricted. Active in Neural Spatial AR Passthrough simulation mode.');
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const initialSpeed = rotationSpeed;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const diff = moveEvent.clientX - startX;
      setRotationSpeed(initialSpeed + diff * 0.0001);
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col select-none">
      {/* Real AR Camera Video Layer or Cybernetic Passthrough Grid */}
      {cameraActive && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover opacity-60 filter contrast-125 saturate-150"
          />
          {/* Simulated HUD grid lines when camera is active */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        </div>
      )}

      {/* Top Holographic Navigation Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 text-xs">
        {/* Hologram Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => onModeChange('digital_twin')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all flex items-center gap-1.5 ${
              mode === 'digital_twin'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Digital Twin</span>
          </button>

          <button
            onClick={() => onModeChange('automobile_v2x')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all flex items-center gap-1.5 ${
              mode === 'automobile_v2x'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Automobile V2X</span>
          </button>

          <button
            onClick={() => onModeChange('smart_city_gov')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all flex items-center gap-1.5 ${
              mode === 'smart_city_gov'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gov & Smart City</span>
          </button>

          <button
            onClick={() => onModeChange('quantum_vault')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all flex items-center gap-1.5 ${
              mode === 'quantum_vault'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Quantum Vault</span>
          </button>

          <button
            onClick={() => onModeChange('habit_matrix')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all flex items-center gap-1.5 ${
              mode === 'habit_matrix'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Habit Matrix</span>
          </button>

          <button
            onClick={() => onModeChange('earth_planetary_shield')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all flex items-center gap-1.5 ${
              mode === 'earth_planetary_shield'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Earth Shield 3D</span>
          </button>
        </div>

        {/* Battery & Performance Optimizer Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-700">
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-300">GPU Mode:</span>
            <button
              onClick={() => onPerformanceTierChange('eco')}
              className={`px-1.5 py-0.5 text-[10px] rounded font-mono ${
                performanceTier === 'eco'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="30 FPS Cap, low particle count for minimal battery consumption on entry-level phones"
            >
              ECO (30)
            </button>
            <button
              onClick={() => onPerformanceTierChange('balanced')}
              className={`px-1.5 py-0.5 text-[10px] rounded font-mono ${
                performanceTier === 'balanced'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BAL (60)
            </button>
            <button
              onClick={() => onPerformanceTierChange('ultra')}
              className={`px-1.5 py-0.5 text-[10px] rounded font-mono ${
                performanceTier === 'ultra'
                  ? 'bg-purple-500 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ULTRA
            </button>
          </div>

          {/* AR Camera Pass-through Button */}
          <button
            onClick={toggleCamera}
            className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all ${
              cameraActive
                ? 'bg-red-500/20 text-red-300 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                : 'bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/40'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{cameraActive ? 'AR Pass-Through ON' : 'Enable AR Cam'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Spatial HUD Overlay Elements */}
      <div className="absolute top-16 left-4 z-10 pointer-events-none">
        <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3 max-w-xs text-xs font-mono text-cyan-300 shadow-lg">
          <div className="flex items-center justify-between text-[10px] text-cyan-400/70 border-b border-cyan-500/20 pb-1 mb-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE TELEMETRY
            </span>
            <span>FREQ: 5.8 GHz</span>
          </div>
          <div className="text-sm font-semibold text-white tracking-wide">{activeNodeInfo?.title}</div>
          <div className="text-emerald-400 text-xs font-bold mt-0.5">{activeNodeInfo?.value}</div>
          <div className="text-slate-400 text-[11px] mt-1 leading-snug">{activeNodeInfo?.desc}</div>
        </div>
      </div>

      {/* Camera fallback notice if real camera is blocked */}
      {cameraError && (
        <div className="absolute top-16 right-4 z-10 max-w-xs bg-amber-950/80 border border-amber-500/40 rounded-xl p-2.5 text-[11px] font-mono text-amber-200">
          {cameraError}
        </div>
      )}

      {/* AR Reticle & Spatial Crosshair HUD */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
        <div className="w-48 h-48 border border-cyan-500/20 rounded-full flex items-center justify-center relative">
          <div className="absolute w-2 h-2 border-t-2 border-l-2 border-cyan-400 top-0 left-0" />
          <div className="absolute w-2 h-2 border-t-2 border-r-2 border-cyan-400 top-0 right-0" />
          <div className="absolute w-2 h-2 border-b-2 border-l-2 border-cyan-400 bottom-0 left-0" />
          <div className="absolute w-2 h-2 border-b-2 border-r-2 border-cyan-400 bottom-0 right-0" />
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Bottom Interactive HUD Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/80 backdrop-blur-md border-t border-cyan-500/20 text-xs">
        {/* Gesture Tracking & Air-Pinch Controller */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setGestureMode(!gestureMode);
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all ${
              gestureMode
                ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'text-slate-300 bg-slate-800/80 hover:bg-slate-700/80'
            }`}
          >
            <HandMetal className="w-3.5 h-3.5" />
            <span>{gestureMode ? 'Gesture Tracking Active' : 'Enable Air-Pinch'}</span>
          </button>

          <button
            onClick={() => {
              setRotationSpeed(prev => (prev === 0 ? 0.008 : 0));
              sound.playChirp(600, 0.05);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white flex items-center gap-1 font-mono"
            title="Toggle Continuous Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{rotationSpeed === 0 ? 'Paused' : 'Spinning'}</span>
          </button>
        </div>

        {/* Spatial Depth & Zoom Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <span>ZOOM:</span>
            <input
              type="range"
              min="0.5"
              max="1.8"
              step="0.05"
              value={zoomLevel}
              onChange={e => setZoomLevel(parseFloat(e.target.value))}
              className="w-20 accent-cyan-400 cursor-pointer"
            />
            <span className="text-cyan-300 w-8">{Math.round(zoomLevel * 100)}%</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/80">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>BEARING: {Math.round(compassAngle)}° NE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
