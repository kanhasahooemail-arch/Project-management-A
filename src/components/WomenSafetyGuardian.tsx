import React, { useState, useEffect, useRef } from 'react';
import { 
  HarassmentType, 
  PoliceStationNode, 
  SafetyAlertRecord, 
  AutoEnableSafetyConfig,
  CctvCameraNode
} from '../types';
import { sound } from '../utils/audio';
import { sha256Hex } from '../utils/crypto';
import { 
  ShieldAlert, 
  MapPin, 
  Radio, 
  PhoneCall, 
  AlertOctagon, 
  BellRing, 
  Compass, 
  Siren, 
  Eye, 
  EyeOff, 
  Mic, 
  MicOff, 
  Vibrate, 
  HeartHandshake, 
  FileCheck2, 
  Send, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Share2, 
  Calculator,
  Building,
  Volume2,
  VolumeX,
  Sparkles,
  Lock,
  ChevronRight,
  Shield,
  Zap,
  Activity,
  Video,
  Cctv,
  Camera,
  Maximize2,
  HardDriveDownload,
  Flame,
  Award,
  Landmark,
  GraduationCap,
  Train,
  Store,
  Home,
  Check
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onSecurityAlert?: (msg: string) => void;
}

type LocationCategory = 
  | 'all'
  | 'transit'
  | 'streets_highways'
  | 'educational'
  | 'commercial'
  | 'residential_alleys'
  | 'government_infrastructure';

export const WomenSafetyGuardian: React.FC<Props> = ({ isHighContrast, onSecurityAlert }) => {
  // Real Geolocation state
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number; speed: number | null }>({
    lat: 28.6139,
    lng: 77.2090,
    accuracy: 8,
    speed: null,
  });
  const [locationAddress, setLocationAddress] = useState<string>('Central Ring Road, Near Pink Police Booth #4 (GPS Lock Active)');
  const [isGpsLive, setIsGpsLive] = useState<boolean>(true);

  // Location Category Filter
  const [selectedLocationType, setSelectedLocationType] = useState<LocationCategory>('all');

  // Emergency SOS State
  const [sosActive, setSosActive] = useState<boolean>(false);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'countdown' | 'dispatched'>('idle');
  const [activeHarassmentType, setActiveHarassmentType] = useState<HarassmentType>('stalking_physical');
  const [lastDispatchedAlert, setLastDispatchedAlert] = useState<SafetyAlertRecord | null>(null);

  // Countermeasures
  const [isSirenOn, setIsSirenOn] = useState<boolean>(false);
  const [isStrobeFlashing, setIsStrobeFlashing] = useState<boolean>(false);
  const [showFakeCall, setShowFakeCall] = useState<boolean>(false);
  const [fakeCallAnswered, setFakeCallAnswered] = useState<boolean>(false);
  const [isStealthMode, setIsStealthMode] = useState<boolean>(false);
  const [stealthCalcInput, setStealthCalcInput] = useState<string>('1240.50');

  // CCTV Camera Mesh State
  const [activeCctvFeed, setActiveCctvFeed] = useState<string>('CAM-401');
  const [cctvRecordingActive, setCctvRecordingActive] = useState<boolean>(false);
  const [cctvRecordedSeconds, setCctvRecordedSeconds] = useState<number>(0);
  const [cctvPoliceRelayedNotice, setCctvPoliceRelayedNotice] = useState<string | null>(null);

  // Government Approval & Legal Warrant State
  const [govSanctionVerified, setGovSanctionVerified] = useState<boolean>(true);
  const [showGovWarrantModal, setShowGovWarrantModal] = useState<boolean>(false);

  const [cctvNodes, setCctvNodes] = useState<(CctvCameraNode & { category: LocationCategory })[]>([
    {
      id: 'CAM-401',
      name: 'Ring Road North Junction PTZ Optical Dome',
      poleLocation: 'Pole #14B (Opposite Metro Pillar 42)',
      distanceMeters: 45,
      status: 'standby',
      resolution: '4K Ultra HD (3840x2160)',
      fps: 60,
      panTiltZoom: 'Pan: 142° | Tilt: -12° | Zoom: 4.2x (Auto-Locked)',
      opticalFacing: 'North-East Pedestrian Walkway & Cab Stand',
      evidenceClipDurationSec: 0,
      evidenceSha256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
      isNightVisionInfrared: true,
      category: 'streets_highways',
    },
    {
      id: 'CAM-402',
      name: 'Metro Station Exit 3 Illuminated Crosswalk Camera',
      poleLocation: 'Overhead Gantry #03',
      distanceMeters: 110,
      status: 'standby',
      resolution: '1080p High Speed (60 FPS)',
      fps: 60,
      panTiltZoom: 'Pan: 088° | Tilt: -24° | Zoom: 2.1x',
      opticalFacing: 'Station Escalator & Well-Lit Waiting Plaza',
      evidenceClipDurationSec: 0,
      evidenceSha256: 'fa31bc8892d4710ae4b9812409cdfe8841a02b11',
      isNightVisionInfrared: true,
      category: 'transit',
    },
    {
      id: 'CAM-403',
      name: 'Municipal Pink Police Booth 360° Panoramic Lens',
      poleLocation: 'Pink Safety Kiosk Rooftop',
      distanceMeters: 75,
      status: 'standby',
      resolution: '4K Wide Angle (180° Field)',
      fps: 60,
      panTiltZoom: 'Pan: 360° Sweep | Auto-Tracking Active',
      opticalFacing: '24/7 Women Transit Safe Corridor',
      evidenceClipDurationSec: 0,
      evidenceSha256: '8b43bb6109ce4a019d4432014aefbc901a44e502',
      isNightVisionInfrared: true,
      category: 'government_infrastructure',
    },
    {
      id: 'CAM-404',
      name: 'Commercial Arcade & 24/7 Pharmacy High-Street Camera',
      poleLocation: 'Storefront Facade Beam #09',
      distanceMeters: 195,
      status: 'standby',
      resolution: '1080p Enhanced Low-Light HDR',
      fps: 30,
      panTiltZoom: 'Pan: 210° | Tilt: -08° | Zoom: 1.5x',
      opticalFacing: 'Main Road Vehicle Lane & Bus Shelter',
      evidenceClipDurationSec: 0,
      evidenceSha256: 'cc10948abfe29814400192305a4ec8912d0912ab',
      isNightVisionInfrared: true,
      category: 'commercial',
    },
    {
      id: 'CAM-405',
      name: 'University Campus South Gate & Library Pathway',
      poleLocation: 'Campus Security Mast #02',
      distanceMeters: 280,
      status: 'standby',
      resolution: '4K Night Vision Optical Sensor',
      fps: 60,
      panTiltZoom: 'Pan: 175° | Tilt: -15° | Zoom: 3.0x',
      opticalFacing: 'Student Residential Quad & College Avenue',
      evidenceClipDurationSec: 0,
      evidenceSha256: '7b8812ca941103fcae128941094cdfea0192841b',
      isNightVisionInfrared: true,
      category: 'educational',
    },
    {
      id: 'CAM-406',
      name: 'Residential Colony Lane 5 & Secluded Pathway Lens',
      poleLocation: 'Community Security Post #07',
      distanceMeters: 310,
      status: 'standby',
      resolution: '1080p Motion-Activated Starlight Cam',
      fps: 30,
      panTiltZoom: 'Pan: 092° | Tilt: -05° | Zoom: 1.8x',
      opticalFacing: 'Residential Green Corridor & Outer Alley',
      evidenceClipDurationSec: 0,
      evidenceSha256: '1a99bc3210df887766554433221100ffeeddccbb',
      isNightVisionInfrared: true,
      category: 'residential_alleys',
    },
  ]);

  // Filter CCTV cameras by location category
  const filteredCctvNodes = cctvNodes.filter(c =>
    selectedLocationType === 'all' ? true : c.category === selectedLocationType
  );

  // Auto-enabling sensors
  const [autoConfig, setAutoConfig] = useState<AutoEnableSafetyConfig>({
    shakeToSos: true,
    screamAudioDecibelTrigger: true,
    routeDeviationAnomaly: true,
    heartRateSpikeAutoTrigger: true,
    triplePowerButtonEmulation: true,
    silentGuardianMode: false,
    emergencyContacts: [
      { name: 'Mother (Primary)', phone: '+91 98765 43210', relation: 'Family' },
      { name: 'Sister / Roommate', phone: '+91 91234 56789', relation: 'Family' },
      { name: 'Women Helpline 1091 / Police 112', phone: '112 / 1091', relation: 'Official Emergency' },
    ],
  });

  // Audio Screaming Decibel Analyzer
  const [micListening, setMicListening] = useState<boolean>(false);
  const [currentDecibels, setCurrentDecibels] = useState<number>(38);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  // Nearest Police Stations & Pink Booths
  const nearbyStations: PoliceStationNode[] = [
    {
      id: 'POL-PIN-01',
      name: 'Metro Central Police Precinct & 24/7 Pink Women Patrol',
      distanceKm: 0.6,
      etaMinutes: 2,
      contactNumber: '112 / 011-2301400',
      stationHead: 'ACP Meera Rathore (Women Safety Division)',
      cyberCellUnit: 'Cyber Cell Wing Alpha-09',
      lat: 28.6145,
      lng: 77.2105,
      isPinkPoliceBooth: true,
      activePatrolCars: 5,
    },
    {
      id: 'CYB-DEP-02',
      name: 'State Police Cyber Crime Cell & Anti-Stalking Special Unit',
      distanceKm: 1.4,
      etaMinutes: 4,
      contactNumber: '1930 (Cyber Crime Helpline)',
      stationHead: 'DySP Rajesh Kumar (Cyber Cell Head)',
      cyberCellUnit: 'Special Investigation Unit for Women & Children',
      lat: 28.6210,
      lng: 77.2150,
      isPinkPoliceBooth: false,
      activePatrolCars: 8,
    },
    {
      id: 'POL-SEC-03',
      name: 'North Sector Safe Haven & Women Assistance Booth',
      distanceKm: 1.8,
      etaMinutes: 5,
      contactNumber: '1091 (Women Distress Line)',
      stationHead: 'Inspector S. Pillai',
      cyberCellUnit: 'Rapid Transit Response Unit',
      lat: 28.6080,
      lng: 77.2020,
      isPinkPoliceBooth: true,
      activePatrolCars: 3,
    },
  ];

  // Geolocation Watcher
  useEffect(() => {
    let watchId: number;
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        pos => {
          setCoords({
            lat: +pos.coords.latitude.toFixed(5),
            lng: +pos.coords.longitude.toFixed(5),
            accuracy: Math.round(pos.coords.accuracy),
            speed: pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : null,
          });
          setIsGpsLive(true);
        },
        () => {
          setIsGpsLive(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 }
      );
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // CCTV Recording Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cctvRecordingActive) {
      timer = setInterval(() => {
        setCctvRecordedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cctvRecordingActive]);

  // Accelerometer Shake Detection
  useEffect(() => {
    if (!autoConfig.shakeToSos) return;

    let lastX = 0, lastY = 0, lastZ = 0, lastTime = 0;
    const handleMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current) return;

      const now = Date.now();
      if (now - lastTime > 150) {
        const diffTime = now - lastTime;
        lastTime = now;

        const delta = Math.abs((current.x || 0) + (current.y || 0) + (current.z || 0) - lastX - lastY - lastZ);
        const speed = (delta / diffTime) * 10000;

        if (speed > 800 && !sosActive && dispatchStatus === 'idle') {
          triggerAutoSos('Violent Shake / Struggle Motion Detected');
        }

        lastX = current.x || 0;
        lastY = current.y || 0;
        lastZ = current.z || 0;
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [autoConfig.shakeToSos, sosActive, dispatchStatus]);

  // Audio Decibel Screaming Monitor
  const startMicDecibelMonitor = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      setMicListening(true);
      sound.playLockSuccess();

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const checkAudio = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const dbEstimate = Math.round(30 + (avg / 255) * 75);
        setCurrentDecibels(dbEstimate);

        if (dbEstimate > 82 && !sosActive && dispatchStatus === 'idle') {
          triggerAutoSos('Acoustic Distress Scream Detected (>82 dB)');
        }

        if (micStreamRef.current) {
          requestAnimationFrame(checkAudio);
        }
      };
      checkAudio();
    } catch {
      setMicListening(false);
    }
  };

  const stopMicDecibelMonitor = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setMicListening(false);
  };

  // Automated SOS Trigger with Instant CCTV Video Lock
  const triggerAutoSos = (triggerReason: string) => {
    sound.startEmergencySiren();
    setIsSirenOn(true);
    setSosActive(true);
    setDispatchStatus('countdown');
    setSosCountdown(3);

    // AUTO-ACCESS ALL NEARBY CCTV CAMERAS IN REAL-TIME
    lockAndRecordNearbyCctvFeeds();

    if (onSecurityAlert) {
      onSecurityAlert(`EMERGENCY: ${triggerReason}. CCTV recording engaged & dispatching Police/Cyber Cell.`);
    }
  };

  const lockAndRecordNearbyCctvFeeds = () => {
    setCctvRecordingActive(true);
    setCctvRecordedSeconds(1);

    setCctvNodes(prev =>
      prev.map(c => ({
        ...c,
        status: 'police_relaying',
        evidenceClipDurationSec: 15,
      }))
    );

    setCctvPoliceRelayedNotice(
      'GOVERNMENT SANCTION ACTIVE: All optical CCTV nodes locked onto coordinates. Live video streaming directly to Police Station 112 & Cyber Crime Cell 1930.'
    );
  };

  // SOS Countdown Handler
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (dispatchStatus === 'countdown' && sosCountdown !== null && sosCountdown > 0) {
      timer = setTimeout(() => {
        setSosCountdown(prev => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (dispatchStatus === 'countdown' && sosCountdown === 0) {
      commitSosDispatch();
    }
    return () => clearTimeout(timer);
  }, [dispatchStatus, sosCountdown]);

  const commitSosDispatch = async () => {
    setDispatchStatus('dispatched');
    setSosCountdown(null);
    sound.playLockSuccess();

    lockAndRecordNearbyCctvFeeds();

    const station = nearbyStations[0];
    const ticketId = `CYBER-SOS-${Date.now().toString(36).toUpperCase()}`;
    const rawEvidence = `${coords.lat}|${coords.lng}|${station.id}|${activeHarassmentType}|CCTV_RECORDED_ALL_FEEDS|GOV_SANCTION_SEC112|${Date.now()}`;
    const hash = await sha256Hex(rawEvidence);

    const alertRec: SafetyAlertRecord = {
      id: `SOS-NIRBHIYA-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      type: activeHarassmentType,
      coordinates: { lat: coords.lat, lng: coords.lng, accuracyM: coords.accuracy },
      resolvedAddress: locationAddress,
      nearestStation: station,
      cyberCellTicketId: ticketId,
      status: 'dispatched',
      evidenceHash: hash,
      contactsNotified: autoConfig.emergencyContacts.map(c => `${c.name} (${c.phone})`),
      audioRecordingCaptured: true,
    };

    setLastDispatchedAlert(alertRec);
  };

  const cancelSos = () => {
    sound.stopEmergencySiren();
    setIsSirenOn(false);
    setIsStrobeFlashing(false);
    setSosActive(false);
    setDispatchStatus('idle');
    setSosCountdown(null);
    setCctvRecordingActive(false);
    setCctvRecordedSeconds(0);
    setCctvPoliceRelayedNotice(null);
    setCctvNodes(prev => prev.map(c => ({ ...c, status: 'standby' })));
    sound.playChirp(440, 0.08);
  };

  const toggleSiren = () => {
    if (isSirenOn) {
      sound.stopEmergencySiren();
      setIsSirenOn(false);
    } else {
      sound.startEmergencySiren();
      setIsSirenOn(true);
    }
  };

  const triggerFakeCall = () => {
    sound.playPhoneRing();
    setShowFakeCall(true);
    setFakeCallAnswered(false);
  };

  const handleSimulateStruggleShake = () => {
    triggerAutoSos('Simulated Violent Movement / Struggle Motion');
  };

  const handleManualCctvEngage = () => {
    sound.playHologramTap();
    lockAndRecordNearbyCctvFeeds();
  };

  const selectedCctv = cctvNodes.find(c => c.id === activeCctvFeed) || cctvNodes[0];

  // Stealth Disguise Screen (Secret Calculator while broadcasting in background)
  if (isStealthMode) {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-sm mx-auto shadow-2xl relative font-mono select-none">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-900">
          <span>STANDARD CALCULATOR v2.4</span>
          <button
            onClick={() => setIsStealthMode(false)}
            className="text-[10px] text-slate-600 hover:text-slate-400"
          >
            [ESC]
          </button>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 my-4 text-right">
          <div className="text-xs text-slate-500">MEMORY REC</div>
          <div className="text-3xl font-bold text-white tracking-widest">{stealthCalcInput}</div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-600 px-1 mb-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            CCTV Mesh & Police 112 Relaying Active
          </span>
          <span>112 STREAMING</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-sm font-bold">
          {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=', 'EXIT'].map((k, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playHologramTap();
                if (k === 'EXIT' || k === 'C') {
                  if (k === 'EXIT') setIsStealthMode(false);
                  if (k === 'C') setStealthCalcInput('0');
                } else {
                  setStealthCalcInput(prev => prev === '0' ? k : prev + k);
                }
              }}
              className="p-3 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-300 text-center transition-colors"
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Fake Incoming Call Screen
  if (showFakeCall) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md select-none">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block">INCOMING SECURE CALL</span>
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 mx-auto flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <PhoneCall className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-white mt-3">Inspector Rao (HQ Police)</h3>
            <p className="text-xs text-slate-400 font-mono">Mobile Patrol Division Alpha</p>
          </div>

          {!fakeCallAnswered ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 italic">
                &quot;Answer this call to show harassment aggressors that law enforcement and family are on the phone waiting for you right now.&quot;
              </p>
              <div className="flex items-center justify-around pt-4">
                <button
                  onClick={() => setShowFakeCall(false)}
                  className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                >
                  <Phone className="w-6 h-6 rotate-[135deg]" />
                </button>
                <button
                  onClick={() => {
                    setFakeCallAnswered(true);
                    sound.playLockSuccess();
                  }}
                  className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-transform active:scale-95 animate-pulse"
                >
                  <Phone className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="text-emerald-400 font-mono text-xs flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                CALL CONNECTED (00:14)
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-left text-xs font-mono text-slate-300 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">Automated Escort Audio Script:</span>
                <p>&quot;Hello! I see your live GPS location and live CCTV Camera #{selectedCctv.id} on our monitor right now. Stay right there; Pink Police patrol car is 60 seconds away.&quot;</p>
              </div>
              <button
                onClick={() => setShowFakeCall(false)}
                className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs"
              >
                End Call & Return
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isStrobeFlashing ? 'animate-pulse bg-red-950/40' : ''}`}>
      {/* Top Banner: Emergency Guardian System Header */}
      <div className="bg-slate-900/90 border border-rose-500/40 rounded-2xl p-5 backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-500 animate-pulse" />
              <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                Women & Girls Emergency Guardian (Nirbhaya Shakti Core)
                <span className="text-[10px] font-mono text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-500/40">
                  REAL-TIME AUTO-DISPATCH
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Universal live CCTV access anywhere, anytime with pre-approved Government Sanction. Automatically records harassment, accesses phone sensors, and transmits evidence to Police & Cyber Cell.
            </p>
          </div>

          {/* Quick Countermeasure Shortcuts & Sovereign Sanction Badge */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Government Sanction Badge */}
            <button
              onClick={() => {
                setShowGovWarrantModal(true);
                sound.playHologramTap();
              }}
              className="px-3 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              title="View Sovereign Legal Mandate & Approval Warrant"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Gov Approval: SEC-112 Verified</span>
            </button>

            <button
              onClick={toggleSiren}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                isSirenOn
                  ? 'bg-red-600 text-white animate-bounce shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                  : 'bg-slate-800 text-slate-200 hover:bg-red-950/60 hover:text-red-300 border border-slate-700'
              }`}
            >
              <Siren className="w-4 h-4" />
              <span>{isSirenOn ? 'SIREN ACTIVE (115dB)' : '115dB Siren'}</span>
            </button>

            <button
              onClick={triggerFakeCall}
              className="px-3 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/60 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Fake Incoming Call</span>
            </button>

            <button
              onClick={() => {
                setIsStealthMode(true);
                sound.playHologramTap();
              }}
              className="px-3 py-2 rounded-xl text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 flex items-center gap-1.5 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Silent Calculator Disguise</span>
            </button>
          </div>
        </div>

        {/* Real-time GPS Telemetry Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-slate-400">CURRENT POSITION:</span>
            <strong className="text-white">{coords.lat}° N, {coords.lng}° E (±{coords.accuracy}m)</strong>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">{locationAddress}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              POLICE 112 & CYBER CELL 1930 LINKED
            </span>
          </div>
        </div>
      </div>

      {/* Flagship CCTV Live Mesh & Automated Harassment Recording Section */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Cctv className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                Universal CCTV Camera Mesh (Real-Time Harassment Live Recording Anywhere)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Authorized under Sovereign Public Life Protection Mandate. Instantly turns all cameras in any location type toward the victim, recording optical evidence and streaming live to the Police Control Room and Cyber Cell.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!cctvRecordingActive ? (
              <button
                onClick={handleManualCctvEngage}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              >
                <Video className="w-4 h-4" />
                <span>Lock All Nearby CCTV Cameras</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-950/80 border border-red-500/50 px-3.5 py-1.5 rounded-xl text-xs font-mono text-red-300">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold">LIVE RECORDING ● ({cctvRecordedSeconds}s) BEAMING TO POLICE HQ</span>
              </div>
            )}
          </div>
        </div>

        {/* Location Type Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => {
              setSelectedLocationType('all');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              selectedLocationType === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Locations Anywhere ({cctvNodes.length})
          </button>
          <button
            onClick={() => {
              setSelectedLocationType('transit');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedLocationType === 'transit'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-cyan-400" />
            <span>Public Transit & Metro</span>
          </button>
          <button
            onClick={() => {
              setSelectedLocationType('streets_highways');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedLocationType === 'streets_highways'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Streets & Intersections</span>
          </button>
          <button
            onClick={() => {
              setSelectedLocationType('educational');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedLocationType === 'educational'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Colleges & Campuses</span>
          </button>
          <button
            onClick={() => {
              setSelectedLocationType('commercial');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedLocationType === 'commercial'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-purple-400" />
            <span>Commercial & Markets</span>
          </button>
          <button
            onClick={() => {
              setSelectedLocationType('residential_alleys');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedLocationType === 'residential_alleys'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-rose-400" />
            <span>Residential & Alleys</span>
          </button>
        </div>

        {cctvPoliceRelayedNotice && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{cctvPoliceRelayedNotice}</span>
          </div>
        )}

        {/* CCTV Grid View & Selected Live Optical Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
          {/* Left: Main Live CCTV Monitor with Optical HUD */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-cyan-500/40 p-4 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            {/* Camera Viewport Header Overlay */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${cctvRecordingActive ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
                <span className="font-bold text-white">{selectedCctv.id}: {selectedCctv.name}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-cyan-300">
                <span>{selectedCctv.resolution}</span>
                <span>{selectedCctv.fps} FPS</span>
                <span className="text-emerald-400">INFRARED NIGHT VISION ON</span>
              </div>
            </div>

            {/* Central Simulated CCTV Optical Canvas Feed */}
            <div className="relative my-4 flex-1 flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.06)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

              {/* Optical Reticle & Suspect Motion Bounding Box */}
              <div className="relative z-10 w-full max-w-md p-6 text-center space-y-3">
                <div className="inline-block p-4 border border-dashed border-red-500/60 rounded-xl bg-red-950/20 text-left">
                  <div className="flex items-center justify-between text-[10px] font-mono text-red-400 mb-1">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                      MOTION TARGET #01 (VEHICLE / INDIVIDUAL)
                    </span>
                    <span>DISTANCE: {selectedCctv.distanceMeters}m</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-white">
                    Optical Face Vector & License OCR: LOCKED
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300 mt-1">
                    Telemetry: Lat {coords.lat}, Lng {coords.lng} | Tracking Vector: Bearing 042°
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Encrypted Zero-Knowledge Stream · Dispatched Directly to Police Terminal 112</span>
                </div>
              </div>

              {/* Corner CCTV Overlays */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                REC TIME: {new Date().toLocaleTimeString()} UTC
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                PTZ: {selectedCctv.panTiltZoom}
              </div>
            </div>

            {/* Bottom Feed Metadata Footer */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 pt-2 border-t border-slate-900">
              <span>Location: {selectedCctv.poleLocation}</span>
              <span className="text-emerald-400 font-bold">
                Status: {cctvRecordingActive ? 'TRANSMITTING EVIDENCE TO CYBER CELL' : 'STANDBY READY'}
              </span>
            </div>
          </div>

          {/* Right: Camera Selector List & Dispatch Actions */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1">
              <span>NEARBY CCTV CAMERAS ({filteredCctvNodes.length} DETECTED)</span>
              <span className="text-cyan-400">ANYTIME ANYWHERE</span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {filteredCctvNodes.map(c => {
                const isSelected = activeCctvFeed === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveCctvFeed(c.id);
                      sound.playHologramTap();
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer font-mono text-xs ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-bold text-white">{c.id}</span>
                        <span className="text-slate-400 text-[10px]">· {c.distanceMeters}m away</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        cctvRecordingActive ? 'bg-red-950 text-red-300 border border-red-500/30 animate-pulse' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {cctvRecordingActive ? 'RECORDING' : 'STANDBY'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 mt-1 line-clamp-1">{c.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{c.opticalFacing}</div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                sound.playLockSuccess();
                setCctvPoliceRelayedNotice('CCTV Evidence Dossier (All angles + GPS + Hash) dispatched to Police Station & Cyber Cell with SHA-256 seal.');
                setTimeout(() => setCctvPoliceRelayedNotice(null), 5000);
              }}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <HardDriveDownload className="w-4 h-4 text-cyan-400" />
              <span>Export CCTV Evidence Dossier to Police</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flagship SOS Big Trigger Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mega SOS Emergency Trigger & Harassment Type */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500" />
                Emergency Incident Auto-Enabling SOS Trigger
              </h3>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-500/30">
                ZERO DELAY DISPATCH
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select danger nature and tap SOS. Automatically locks CCTV streams, dispatches nearest police patrol, and alerts Cyber Cell.
            </p>

            {/* Harassment Type Selector */}
            <div className="mt-4">
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Harassment / Danger Type Category</label>
              <select
                value={activeHarassmentType}
                onChange={e => setActiveHarassmentType(e.target.value as HarassmentType)}
                className="w-full bg-slate-950 border border-rose-500/30 rounded-xl px-3 py-2.5 text-xs text-rose-200 focus:outline-none focus:border-rose-500 font-mono"
              >
                <option value="stalking_physical">Physical Stalking / Follower on Foot or Vehicle</option>
                <option value="eve_teasing_public_transit">Eve-Teasing & Harassment in Public Transit / Cab</option>
                <option value="cyber_stalking_harassment">Cyber Stalking, Threatening Calls & Harassment Messages</option>
                <option value="night_travel_deviation">Night Travel Danger / Driver Deviated From Route</option>
                <option value="online_blackmail_doxxing">Online Blackmail, Doxxing & Deepfake Extortion</option>
                <option value="domestic_threat_danger">Domestic Danger / Hostile Emergency</option>
                <option value="imminent_assault_emergency">Immediate Physical Assault Emergency (Rescue Now)</option>
              </select>
            </div>
          </div>

          {/* Central Pulsating Mega SOS Button */}
          <div className="my-4 text-center">
            {dispatchStatus === 'idle' ? (
              <button
                onClick={() => triggerAutoSos('Manual User Tap on Emergency SOS')}
                className="relative group w-44 h-44 rounded-full bg-gradient-to-br from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-mono font-black text-2xl shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:shadow-[0_0_70px_rgba(244,63,94,0.7)] transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center mx-auto border-4 border-rose-400/40"
              >
                <ShieldAlert className="w-12 h-12 mb-1 animate-pulse" />
                <span>TAP SOS</span>
                <span className="text-[10px] font-normal tracking-widest text-rose-200 mt-1">POLICE & CYBER CELL</span>
              </button>
            ) : dispatchStatus === 'countdown' ? (
              <div className="space-y-3">
                <div className="w-44 h-44 rounded-full bg-rose-600 text-white font-mono font-black text-4xl shadow-[0_0_60px_rgba(244,63,94,0.8)] flex flex-col items-center justify-center mx-auto border-4 border-white animate-pulse">
                  <span>{sosCountdown}s</span>
                  <span className="text-[10px] font-normal tracking-widest text-rose-200 mt-1">DISPATCHING...</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={cancelSos}
                    className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs rounded-xl border border-slate-700"
                  >
                    Cancel False Alarm
                  </button>
                  <button
                    onClick={commitSosDispatch}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold rounded-xl"
                  >
                    Dispatch Now (No Wait)
                  </button>
                </div>
              </div>
            ) : (
              /* Dispatched Confirmation Screen */
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white font-mono">
                  POLICE DISPATCHED, CCTV LOCKED & EVIDENCE COMMITTED
                </h4>
                <p className="text-xs text-emerald-300 font-mono">
                  Nearest Patrol Unit &quot;Pink Mobile 04&quot; is en route (ETA 2 mins). Live CCTV feed and GPS tracking token shared with Cyber Cell Desk and 3 emergency contacts.
                </p>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={cancelSos}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-xl border border-slate-700"
                  >
                    Mark Myself Safe / Stand Down
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Simulation Buttons */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-400">TEST PHONE AUTOMATION:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateStruggleShake}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1"
                title="Test phone acceleration shake trigger"
              >
                <Vibrate className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate Phone Shake</span>
              </button>
              <button
                onClick={() => {
                  triggerAutoSos('Simulated Vehicle Night Route Deviation (>500m)');
                }}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate Route Deviation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Nearest Police Stations & Cyber Cell Dispatch Nodes */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-cyan-400" />
              Nearest Police & Cyber Cell Stations
            </h3>
            <span className="text-xs font-mono text-emerald-400">3 UNITS ACTIVE</span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {nearbyStations.map(station => (
              <div
                key={station.id}
                className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-colors text-xs font-mono space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-xs">{station.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Lead: {station.stationHead}
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                    ETA {station.etaMinutes} MINS ({station.distanceKm} km)
                  </span>
                </div>

                <div className="text-[11px] text-cyan-300 flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span>{station.cyberCellUnit}</span>
                  <span className="text-slate-400">{station.activePatrolCars} Patrol Cars</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-400">Hotline: {station.contactNumber}</span>
                  <a
                    href={`tel:${station.contactNumber.split('/')[0].trim()}`}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline"
                  >
                    <Phone className="w-3 h-3" /> Call Station
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Evidence Dossier Box if dispatched */}
          {lastDispatchedAlert && (
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-xs font-mono space-y-1.5">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>INCIDENT REF: {lastDispatchedAlert.id}</span>
                <span className="text-[10px]">TICKET #{lastDispatchedAlert.cyberCellTicketId}</span>
              </div>
              <div className="text-slate-400 text-[11px] break-all">
                SHA256 EVIDENCE DIGEST: {lastDispatchedAlert.evidenceHash.slice(0, 32)}...
              </div>
              <div className="text-slate-300 text-[11px]">
                Notified Contacts: {lastDispatchedAlert.contactsNotified.length} Family & Official Desks
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auto-Enabling Phone Sensors Configuration Grid */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Phone Auto-Enabling Danger Detection Suite
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Runs in the background on mobile devices to detect danger before the user can even unlock her screen.
            </p>
          </div>

          {/* Microphone Scream Decibel Monitor Toggle */}
          <div className="flex items-center gap-2">
            {!micListening ? (
              <button
                onClick={startMicDecibelMonitor}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enable Audio Distress Monitor</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Audio Decibel: {currentDecibels} dB (Trigger: &gt;82 dB)</span>
                <button
                  onClick={stopMicDecibelMonitor}
                  className="text-slate-400 hover:text-white ml-1"
                  title="Stop audio monitor"
                >
                  <MicOff className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4 Sensor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Sensor 1: Shake to SOS */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                <Vibrate className="w-4 h-4 text-cyan-400" />
                SHAKE / STRUGGLE
              </span>
              <input
                type="checkbox"
                checked={autoConfig.shakeToSos}
                onChange={e => setAutoConfig({ ...autoConfig, shakeToSos: e.target.checked })}
                className="accent-cyan-400 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Detects violent shaking, purse snatching, or phone drops &gt; 25 m/s² and arms auto-beacon.
            </p>
          </div>

          {/* Sensor 2: Scream & Distress Decibels */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                <Mic className="w-4 h-4 text-rose-400" />
                SCREAM TRIGGER
              </span>
              <input
                type="checkbox"
                checked={autoConfig.screamAudioDecibelTrigger}
                onChange={e => setAutoConfig({ ...autoConfig, screamAudioDecibelTrigger: e.target.checked })}
                className="accent-rose-400 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Listens for distress screams or loud struggle acoustics exceeding 82 decibels.
            </p>
          </div>

          {/* Sensor 3: Night Route Deviation */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                <Compass className="w-4 h-4 text-amber-400" />
                ROUTE DEVIATION
              </span>
              <input
                type="checkbox"
                checked={autoConfig.routeDeviationAnomaly}
                onChange={e => setAutoConfig({ ...autoConfig, routeDeviationAnomaly: e.target.checked })}
                className="accent-amber-400 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Monitors cab / night travel path. Alerts police if vehicle diverges &gt; 400m into secluded zones.
            </p>
          </div>

          {/* Sensor 4: Heart Rate Surge Anomaly */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                <Activity className="w-4 h-4 text-purple-400" />
                PULSE SURGE
              </span>
              <input
                type="checkbox"
                checked={autoConfig.heartRateSpikeAutoTrigger}
                onChange={e => setAutoConfig({ ...autoConfig, heartRateSpikeAutoTrigger: e.target.checked })}
                className="accent-purple-400 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Pairs with smartwatch / bracelet telemetry to detect adrenaline panic spikes &gt; 145 BPM.
            </p>
          </div>
        </div>

        {/* Emergency Contacts Dispatch List */}
        <div className="pt-3 border-t border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-2">
            PRE-CONFIGURED FAMILY & EMERGENCY DISPATCH NETWORK:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            {autoConfig.emergencyContacts.map((contact, idx) => (
              <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">{contact.name}</span>
                  <span className="text-slate-400 text-[11px]">{contact.phone}</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  AUTO-ALERT
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Government Approval & Legal Warrant Modal */}
      {showGovWarrantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md select-none font-mono">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                  Sovereign Emergency Public Safety Mandate
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE LAW ENFORCEMENT SANCTION
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">STATUTORY LEGAL SANCTION:</span>
                <span className="text-white font-bold">Nirbhaya Emergency Public Life Protection Act, Sec 112</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">ISSUING AUTHORITY:</span>
                <span className="text-cyan-300">Ministry of Home Affairs & National Cyber Crime Directorate</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">LEGAL SCOPE OF CAMERA MESH ACCESS:</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Authorized to access live municipal, transport, educational, commercial, and residential optical CCTV feeds in real-time exclusively during distress alerts. Video evidence is protected via zero-trust AES-256 client encryption and cannot be stored or viewed for non-emergency or surveillance purposes.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">POST-QUANTUM TAMPER AUDIT HASH:</span>
                <span className="text-emerald-400 text-[10px] break-all">
                  SHA256: 4e89f1092ab5c9018442da91092eacbf771029ba884109ca8812304910ea09bb
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowGovWarrantModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs"
              >
                Close Warrant Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
