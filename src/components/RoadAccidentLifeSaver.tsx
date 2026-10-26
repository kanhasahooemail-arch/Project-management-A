import React, { useState, useEffect } from 'react';
import { 
  HospitalNode, 
  AmbulanceUnit, 
  RoadAccidentRecord 
} from '../types';
import { sound } from '../utils/audio';
import { sha256Hex } from '../utils/crypto';
import { 
  Ambulance, 
  HeartPulse, 
  Stethoscope, 
  Hospital, 
  MapPin, 
  Radio, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Activity, 
  Phone, 
  Users, 
  Flame, 
  CheckCircle2, 
  Zap, 
  Cctv, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  BadgeAlert,
  Car
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onEmergencyAlert?: (msg: string) => void;
}

export const RoadAccidentLifeSaver: React.FC<Props> = ({ isHighContrast, onEmergencyAlert }) => {
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({
    lat: 28.6215,
    lng: 77.2180,
  });
  const [crashLocationAddress, setCrashLocationAddress] = useState<string>('National Highway 48, Mile Marker 24B (Near Outer Ring Overpass)');

  // Accident State
  const [accidentActive, setAccidentActive] = useState<boolean>(false);
  const [selectedSeverity, setSelectedSeverity] = useState<'code_red_critical' | 'code_yellow_serious' | 'code_green_minor'>('code_red_critical');
  const [collisionType, setCollisionType] = useState<'multi_vehicle' | 'two_wheeler_tumble' | 'pedestrian_hit' | 'vehicle_rollover'>('multi_vehicle');
  const [impactGForce, setImpactGForce] = useState<number>(44.2);
  const [currentAccidentRecord, setCurrentAccidentRecord] = useState<RoadAccidentRecord | null>(null);

  // Green Corridor and Ambulance Telemetry
  const [greenCorridorActive, setGreenCorridorActive] = useState<boolean>(true);
  const [ambulanceEtaSeconds, setAmbulanceEtaSeconds] = useState<number>(180);
  const [ambulanceMovingSpeed, setAmbulanceMovingSpeed] = useState<number>(94);

  // Doctor Video/Telemedicine State
  const [doctorConnected, setDoctorConnected] = useState<boolean>(false);
  const [cprMetronomeRunning, setCprMetronomeRunning] = useState<boolean>(false);
  const [cprBeatCount, setCprBeatCount] = useState<number>(0);

  // Hospital Nodes List
  const nearbyHospitals: HospitalNode[] = [
    {
      id: 'HOSP-01',
      name: 'Apex Super-Specialty & Level-1 Trauma Critical Care Center',
      distanceKm: 1.4,
      etaMinutes: 3,
      traumaLevel: 'Level 1 Trauma ICU',
      emergencyBedsAvailable: 8,
      icuAvailable: 4,
      doctorOnDuty: 'Dr. Ananya Sen (Chief Trauma Surgeon)',
      specialtyDoctor: 'Neuro & Vascular Emergency Team Ready',
      contactNumber: '102 / 011-26598800',
      ambulanceUnitsReady: 6,
      greenCorridorActive: true,
      lat: 28.6240,
      lng: 77.2195,
    },
    {
      id: 'HOSP-02',
      name: 'Metropolitan Government General Hospital (Universal Life Wing)',
      distanceKm: 2.2,
      etaMinutes: 5,
      traumaLevel: 'Level 2 Emergency Trauma',
      emergencyBedsAvailable: 14,
      icuAvailable: 6,
      doctorOnDuty: 'Dr. Vivek Murthy (Emergency Medicine Lead)',
      specialtyDoctor: 'Orthopedic & Cardiac Resuscitation Team',
      contactNumber: '108 / 011-23365522',
      ambulanceUnitsReady: 8,
      greenCorridorActive: true,
      lat: 28.6180,
      lng: 77.2110,
    },
    {
      id: 'HOSP-03',
      name: 'Civil Emergency Trauma Hospital & Burns Unit',
      distanceKm: 3.5,
      etaMinutes: 7,
      traumaLevel: 'Community Emergency Center',
      emergencyBedsAvailable: 19,
      icuAvailable: 8,
      doctorOnDuty: 'Dr. Priya Nambiar (Trauma Registrar)',
      specialtyDoctor: 'Emergency Surgical Triage Unit',
      contactNumber: '112 / 102',
      ambulanceUnitsReady: 4,
      greenCorridorActive: false,
      lat: 28.6310,
      lng: 77.2250,
    },
  ];

  // Assigned Ambulance Info
  const assignedAmbulanceData: AmbulanceUnit = {
    id: 'AMB-ICU-ALS-09',
    vehicleType: 'Advanced Life Support (ALS) ICU Ambulance',
    driverName: 'Officer R. Rathore (Emergency Response Unit)',
    paramedicDoctor: 'Dr. Kabir Mehta (Critical Care Flight Paramedic)',
    etaMinutes: 3,
    distanceKm: 1.2,
    oxygenLevelPercent: 100,
    ventilatorActive: true,
    greenCorridorRouteApproved: true,
    liveSpeedKmh: 94,
  };

  // Ambulance ETA Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (accidentActive && ambulanceEtaSeconds > 0) {
      interval = setInterval(() => {
        setAmbulanceEtaSeconds(prev => Math.max(0, prev - 1));
        setAmbulanceMovingSpeed(prev => Math.round(90 + (Math.random() - 0.5) * 8));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [accidentActive, ambulanceEtaSeconds]);

  // CPR Metronome Effect (100-120 BPM sound chirps)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cprMetronomeRunning) {
      interval = setInterval(() => {
        sound.playChirp(800, 0.04, 'triangle');
        setCprBeatCount(prev => prev + 1);
      }, 550); // ~110 beats per minute
    }
    return () => clearInterval(interval);
  }, [cprMetronomeRunning]);

  const triggerRoadAccidentRescue = async (triggerType: string) => {
    sound.startEmergencySiren();
    setAccidentActive(true);
    setDoctorConnected(true);
    setAmbulanceEtaSeconds(180);

    const hospital = nearbyHospitals[0];
    const raw = `${currentCoords.lat}|${currentCoords.lng}|${selectedSeverity}|${collisionType}|${Date.now()}`;
    const hash = await sha256Hex(raw);

    const record: RoadAccidentRecord = {
      id: `MED-TRAUMA-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      severity: selectedSeverity,
      locationAddress: crashLocationAddress,
      coordinates: currentCoords,
      gForceImpact: impactGForce,
      collisionType: collisionType,
      assignedHospital: hospital,
      assignedAmbulance: assignedAmbulanceData,
      teleDoctorName: hospital.doctorOnDuty,
      patientEquitablePolicy: 'Universal Egalitarian Access - 100% Equal Priority for Normal & VIP Citizens',
      trafficGreenCorridorStatus: 'engaged_all_signals_cleared',
      status: 'ambulance_en_route',
      evidenceCctvLocked: true,
      sha256DossierDigest: hash,
    };

    setCurrentAccidentRecord(record);

    if (onEmergencyAlert) {
      onEmergencyAlert(`ROAD CRASH DETECTED: ${triggerType}. Hospital alerted, ALS Ambulance dispatched with Green Corridor.`);
    }

    // Stop siren after 4 seconds
    setTimeout(() => {
      sound.stopEmergencySiren();
    }, 3500);
  };

  const handleStandDownRescue = () => {
    sound.playChirp(440, 0.08);
    setAccidentActive(false);
    setDoctorConnected(false);
    setCprMetronomeRunning(false);
    setCprBeatCount(0);
    setCurrentAccidentRecord(null);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="space-y-6">
      {/* Universal Equal Access Charter Banner */}
      <div className="bg-slate-900/90 border border-emerald-500/50 rounded-2xl p-5 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <HeartPulse className="w-6 h-6 text-emerald-400 animate-pulse" />
              <h2 className="text-lg font-bold text-white tracking-wide font-mono flex items-center gap-2">
                Road Accident Emergency Network (Golden Hour Lifesaver)
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                  V2X HOSPITALS & AMBULANCES
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Automatic road crash detection accessing nearest hospitals, dispatching Advanced ICU Ambulances with traffic Green Corridors, and connecting emergency doctors in real-time.
            </p>
          </div>

          {/* Egalitarian Non-Discrimination Policy Badge */}
          <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-center gap-2 text-xs font-mono">
            <Users className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-white font-bold block">100% Equal Medical Priority</span>
              <span className="text-emerald-400 text-[11px]">Normal People & VIPs Treated Exactly Equal</span>
            </div>
          </div>
        </div>

        {/* Live Highway & GPS Telemetry */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-400">CRASH HIGHWAY LOCATION:</span>
            <strong className="text-white">{crashLocationAddress}</strong>
            <span className="text-slate-500">·</span>
            <span className="text-cyan-400">{currentCoords.lat}° N, {currentCoords.lng}° E</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LEVEL-1 TRAUMA NETWORKS SYNCED</span>
          </div>
        </div>
      </div>

      {/* Main Crash Trigger & Live Dispatch Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Automated Collision Trigger & Impact G-Force */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400" />
                Real-Time Accident Sensor & Severity Triage
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                SUB-2MS DISPATCH
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Activated automatically upon vehicle impact deceleration (&gt;35G), airbag trigger, or single-tap bystander assistance.
            </p>

            {/* Severity and Collision Type Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Medical Severity Code</label>
                <select
                  value={selectedSeverity}
                  onChange={e => setSelectedSeverity(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option value="code_red_critical">Code Red: Critical Life Danger / Unconscious</option>
                  <option value="code_yellow_serious">Code Yellow: Serious Trauma / Fracture / Bleeding</option>
                  <option value="code_green_minor">Code Green: Stable / Minor Injuries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Collision Classification</label>
                <select
                  value={collisionType}
                  onChange={e => setCollisionType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option value="multi_vehicle">Multi-Vehicle Highway Collision</option>
                  <option value="two_wheeler_tumble">Motorcycle / Two-Wheeler High-Speed Skid</option>
                  <option value="pedestrian_hit">Pedestrian Hit & Injured</option>
                  <option value="vehicle_rollover">Vehicle Rollover / Structural Crash</option>
                </select>
              </div>
            </div>
          </div>

          {/* Central Mega Accident Rescue Trigger Button */}
          <div className="my-4 text-center">
            {!accidentActive ? (
              <button
                onClick={() => triggerRoadAccidentRescue('Manual One-Tap Collision Emergency Call')}
                className="relative group w-48 h-48 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-mono font-black text-xl shadow-[0_0_50px_rgba(16,185,129,0.4)] hover:shadow-[0_0_70px_rgba(16,185,129,0.7)] transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center mx-auto border-4 border-emerald-400/50"
              >
                <Ambulance className="w-12 h-12 mb-1 animate-pulse" />
                <span>DISPATCH RESCUE</span>
                <span className="text-[10px] font-normal tracking-widest text-emerald-200 mt-1">HOSPITAL & DOCTOR</span>
              </button>
            ) : (
              /* Active Rescue HUD */
              <div className="p-6 bg-slate-950 rounded-2xl border border-emerald-500/50 space-y-4 text-left font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-sm font-bold text-white">RESCUE IN PROGRESS: {currentAccidentRecord?.id}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/40">
                    AMBULANCE ETA: {formatSeconds(ambulanceEtaSeconds)}
                  </span>
                </div>

                {/* Live Ambulance Speed & Green Corridor */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-500 text-[10px] block">AMBULANCE SPEED:</span>
                    <span className="text-cyan-400 font-bold text-sm">{ambulanceMovingSpeed} km/h</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-500 text-[10px] block">TRAFFIC CORRIDOR:</span>
                    <span className="text-emerald-400 font-bold text-sm">ALL GREEN CLEAR</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-500 text-[10px] block">ICU BED BOOKED:</span>
                    <span className="text-white font-bold text-sm">BED #04 LOCKED</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] text-slate-400">
                    Lead Doctor: <strong className="text-slate-200">{currentAccidentRecord?.teleDoctorName}</strong> (Live Audio/Video Linked)
                  </span>
                  <button
                    onClick={handleStandDownRescue}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700"
                  >
                    Victim Safe / Stand Down
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Simulation Bar for Phone Inertial Sensors */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-400">TEST ACCIDENT DETECTION:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setImpactGForce(48.5);
                  triggerRoadAccidentRescue('Simulated High-Speed 48G Impact Deceleration Spike');
                }}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate 45G Crash Spike</span>
              </button>

              <button
                onClick={() => {
                  setCollisionType('two_wheeler_tumble');
                  triggerRoadAccidentRescue('Simulated Motorbike High-Speed Skid & Inversion');
                }}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1"
              >
                <Car className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate Bike Skid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Nearest Hospitals & Trauma ICU Standby */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Hospital className="w-4 h-4 text-emerald-400" />
              Nearest Hospitals & Trauma ICUs
            </h3>
            <span className="text-xs font-mono text-emerald-400">3 HOSPITALS SYNCED</span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {nearbyHospitals.map(hosp => (
              <div
                key={hosp.id}
                className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors text-xs font-mono space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-white text-xs">{hosp.name}</h4>
                    <span className="text-[10px] text-emerald-400 uppercase font-semibold block mt-0.5">
                      {hosp.traumaLevel}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                    ETA {hosp.etaMinutes} MINS ({hosp.distanceKm} km)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Doctor On Duty:</span>
                    <span className="text-white font-medium">{hosp.doctorOnDuty}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ICU Beds Free:</span>
                    <span className="text-emerald-400 font-bold">{hosp.icuAvailable} Beds (No Delay)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-400">Hotline: {hosp.contactNumber}</span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    <Ambulance className="w-3.5 h-3.5" />
                    <span>{hosp.ambulanceUnitsReady} Ambulances Ready</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Telemedicine Bridge with Doctor */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/30 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-cyan-400" />
                Live Trauma Doctor Guidance
              </span>
              <span className="text-emerald-400 text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                DR. ANANYA SEN ON-CALL
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              &quot;Keep the patient&apos;s neck immobilized. If unconscious without pulse, begin rhythmic chest compressions now. The ALS ICU ambulance is approaching your mile marker.&quot;
            </p>

            {/* Interactive CPR Metronome Widget */}
            <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">CPR RHYTHM COMPRESSION BEAT:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {cprMetronomeRunning ? `${cprBeatCount} Beats (110 BPM)` : 'Ready to Assist'}
                </span>
              </div>

              <button
                onClick={() => setCprMetronomeRunning(!cprMetronomeRunning)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors ${
                  cprMetronomeRunning
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                {cprMetronomeRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{cprMetronomeRunning ? 'Pause Beat' : 'Start 110 BPM Audio'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
