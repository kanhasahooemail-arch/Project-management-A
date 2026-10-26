/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  HologramMode, 
  PerformanceTier, 
  ApprovalRecord, 
  HabitItem, 
  ConnectedDevice 
} from './types';
import { 
  loadApprovals, 
  saveApprovals, 
  loadHabits, 
  saveHabits, 
  loadDevices, 
  saveDevices 
} from './utils/storage';
import { sound } from './utils/audio';

import { HolographicARCanvas } from './components/HolographicARCanvas';
import { ApprovalsGovernanceHub } from './components/ApprovalsGovernanceHub';
import { SecurityEncryptionCenter } from './components/SecurityEncryptionCenter';
import { DayToDayProductivity } from './components/DayToDayProductivity';
import { EcosystemPartnerships } from './components/EcosystemPartnerships';
import { SpatialAIAssistant } from './components/SpatialAIAssistant';
import { CrossPlatformSync } from './components/CrossPlatformSync';
import { PerformanceBatteryMonitor } from './components/PerformanceBatteryMonitor';
import { SubscriptionModel } from './components/SubscriptionModel';
import { WomenSafetyGuardian } from './components/WomenSafetyGuardian';
import { RoadAccidentLifeSaver } from './components/RoadAccidentLifeSaver';
import { DisasterEarlyWarningRadar } from './components/DisasterEarlyWarningRadar';
import { GlobalGovernmentProtocols } from './components/GlobalGovernmentProtocols';
import { IndianGovAndChildSafetyShield } from './components/IndianGovAndChildSafetyShield';
import { VillageUrbanWelfareGrid } from './components/VillageUrbanWelfareGrid';
import { Storage128GBVault } from './components/Storage128GBVault';
import { UniversalNetworkAccessEngine } from './components/UniversalNetworkAccessEngine';
import { RealTimeLiveSOSCallModal } from './components/RealTimeLiveSOSCallModal';
import { BiometricWebAuthnCenter } from './components/BiometricWebAuthnCenter';
import { EnterpriseConsortiumExperienceHub } from './components/EnterpriseConsortiumExperienceHub';
import { GovApprovedGamingArena } from './components/GovApprovedGamingArena';
import { UniversalMediaCommerceMeetingsHub } from './components/UniversalMediaCommerceMeetingsHub';

import { 
  Box, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Car, 
  Bot, 
  RefreshCw, 
  Zap, 
  CreditCard, 
  Volume2, 
  VolumeX, 
  Eye, 
  Wifi, 
  WifiOff, 
  Layers, 
  Sparkles, 
  Award, 
  Globe, 
  ShieldAlert, 
  Ambulance, 
  HeartPulse, 
  Tornado, 
  Waves, 
  Landmark, 
  Ban, 
  HeartHandshake, 
  Utensils, 
  Home, 
  Infinity, 
  HardDrive, 
  PhoneCall, 
  Radio, 
  Fingerprint, 
  Building2, 
  Factory,
  Gamepad2,
  Coins,
  Trophy,
  BookOpen,
  ShoppingBag,
  Film,
  Music,
  Video
} from 'lucide-react';

type NavTab = 
  | 'hologram' 
  | 'indian_gov_shield'
  | 'village_urban_welfare'
  | 'media_commerce_meetings'
  | 'storage_128gb'
  | 'universal_network'
  | 'biometrics'
  | 'enterprise_consortium'
  | 'gaming_arena'
  | 'girls_safety'
  | 'road_accident'
  | 'earth_disaster'
  | 'gov_protocols'
  | 'approvals' 
  | 'security' 
  | 'productivity' 
  | 'automobile_commerce' 
  | 'spatial_ai' 
  | 'fleet_sync' 
  | 'battery_hardware' 
  | 'affordable_plans';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('hologram');
  const [hologramMode, setHologramMode] = useState<HologramMode>('digital_twin');
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>('balanced');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showLiveSosCallModal, setShowLiveSosCallModal] = useState<boolean>(false);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState<string>('AURA NEXUS Initialized');

  // Persistent storage state
  const [approvals, setApprovals] = useState<ApprovalRecord[]>(() => loadApprovals());
  const [habits, setHabits] = useState<HabitItem[]>(() => loadHabits());
  const [devices, setDevices] = useState<ConnectedDevice[]>(() => loadDevices());

  useEffect(() => {
    saveApprovals(approvals);
  }, [approvals]);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    saveDevices(devices);
  }, [devices]);

  const handleTabSwitch = (tab: NavTab, label: string) => {
    sound.playHologramTap();
    setActiveTab(tab);
    setScreenReaderAnnouncement(`Switched to ${label}`);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playChirp(880, 0.05);
    }
  };

  const toggleOfflineMode = () => {
    sound.playChirp(520, 0.06);
    const nextOffline = !isOffline;
    setIsOffline(nextOffline);
    setScreenReaderAnnouncement(nextOffline ? 'Offline mode enabled. Local encrypted cache active.' : 'Connected to low-latency edge network.');
  };

  return (
    <div className={`min-h-screen text-slate-100 flex flex-col transition-colors duration-200 ${
      isHighContrast ? 'bg-black text-white' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Screen reader live region for accessibility */}
      <div className="sr-only" aria-live="polite">
        {screenReaderAnnouncement}
      </div>

      {/* Top Futuristic Navigation & Global Status Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Box className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-wider text-white flex items-center gap-1.5 font-mono">
                  AURA <span className="text-cyan-400">NEXUS</span>
                </h1>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  SOVEREIGN SPATIAL CORE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Holographic AR · Zero-Trust Encryption · V2X Telemetry · Universal Citizen Approvals
              </p>
            </div>
          </div>

          {/* Quick Status Bar & Accessibility Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {/* Village & Urban Help (Health, Food, Home) Button */}
            <button
              onClick={() => handleTabSwitch('village_urban_welfare', 'Village & Urban Help (Health, Food, Home)')}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.25)]"
              title="100% Free Health Centers, Food/Ration Depots & Housing for Villages and Cities"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>🌾 VILLAGE & URBAN HELP</span>
            </button>

            {/* Lifetime Free Access Pass Button */}
            <button
              onClick={() => handleTabSwitch('affordable_plans', 'Lifetime Free Access Pass ($0)')}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
              title="100% Lifetime Free Access - $0 Forever"
            >
              <Infinity className="w-3.5 h-3.5 text-amber-400" />
              <span>👑 LIFETIME FREE ($0)</span>
            </button>

            {/* Indian Gov Official Sanctions & Anti-Obscenity Quick Button */}
            <button
              onClick={() => handleTabSwitch('indian_gov_shield', 'Government of India Sanctions & Anti-Obscenity Shield')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold flex items-center gap-1.5 transition-all"
              title="Official Government of India Sanctions (MeitY, MHA, CERT-In) & Zero 18+ Adult Content Law Enforcement"
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>🇮🇳 GOI SANCTIONS</span>
            </button>

            {/* Real-Time Live SOS Auto-Connect Call Button */}
            <button
              onClick={() => {
                sound.playPhoneRing();
                setShowLiveSosCallModal(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse"
              title="Immediate Real-Time Live SOS Call Automatically Connected to Police 112"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>📞 LIVE SOS CALL (AUTO-CONNECT)</span>
            </button>

            {/* 128 GB Solid-State Storage Quick Button */}
            <button
              onClick={() => handleTabSwitch('storage_128gb', '128 GB Solid-State Encrypted Storage Vault')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold flex items-center gap-1.5 transition-all"
              title="128 GB Local & Cloud Encrypted Solid-State Storage Vault (NVMe/OPFS)"
            >
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              <span>💾 128 GB STORAGE</span>
            </button>

            {/* Universal Multi-Network Quick Button */}
            <button
              onClick={() => handleTabSwitch('universal_network', 'Universal Multi-Network Gateway (All Networks Access)')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-indigo-500/40 text-indigo-300 font-bold flex items-center gap-1.5 transition-all"
              title="Easily Access All Network Types: 5G, 4G, 2G Village, Satellite LEO, PM-WANI Wi-Fi, BLE Mesh"
            >
              <Radio className="w-3.5 h-3.5 text-indigo-400" />
              <span>🌐 ALL NETWORKS</span>
            </button>

            {/* WebAuthn Hardware Biometrics Quick Button */}
            <button
              onClick={() => handleTabSwitch('biometrics', 'Biometric WebAuthn Passkeys & Hardware Login')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-1.5 transition-all"
              title="Hardware-bound FIDO2 WebAuthn Passkeys & Touch ID / Face ID Login"
            >
              <Fingerprint className="w-3.5 h-3.5 text-purple-400" />
              <span>🔐 WEBAUTHN</span>
            </button>

            {/* Top Industrial, IT & Non-IT Consortium Button */}
            <button
              onClick={() => handleTabSwitch('enterprise_consortium', 'Top Industrial, IT & Non-IT Consortium Experience Access')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1.5 transition-all"
              title="Connect & Experience Top Industrial (Tata, Reliance, Siemens), IT (TCS, Infosys, Google) & Non-IT Leaders"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>🏢 INDUSTRIAL & IT</span>
            </button>

            {/* Trending Online Gaming & Win Profit Arena Button */}
            <button
              onClick={() => handleTabSwitch('gaming_arena', 'Government Approved Trending Gaming & Win Profit Arena')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
              title="MeitY Permissible Skill Gaming - Play Real Games & Win Real Profit with Instant UPI Withdrawal"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
              <span>🎮 WIN & PROFIT GAMING</span>
            </button>

            {/* Free Digital Commons, Food, Shopping & Meetings Hub Button */}
            <button
              onClick={() => handleTabSwitch('media_commerce_meetings', 'Universal Free Media, Food, Shopping & Business Meetings Hub')}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/50 text-indigo-300 font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(99,102,241,0.25)]"
              title="100% Free E-Books, Journals, Magazines, Movies, Songs, Food Items, ONDC Online Shopping & HD Business Meetings"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>📚 FREE MEDIA, FOOD & MEETINGS</span>
            </button>

            {/* Offline / Online Network Indicator */}
            <button
              onClick={toggleOfflineMode}
              className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
                isOffline
                  ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                  : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              }`}
              title="Toggle Offline / Online simulation"
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              <span>{isOffline ? 'OFFLINE (LOCAL CACHE)' : 'EDGE 3.4ms'}</span>
            </button>

            {/* GPU Performance Tier Badge */}
            <button
              onClick={() => {
                const nextTier = performanceTier === 'eco' ? 'balanced' : performanceTier === 'balanced' ? 'ultra' : 'eco';
                setPerformanceTier(nextTier);
                sound.playHologramTap();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-slate-300 flex items-center gap-1.5"
              title="Click to cycle battery/rendering mode"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="uppercase">{performanceTier} MODE</span>
            </button>

            {/* High Contrast Accessibility Toggle */}
            <button
              onClick={() => {
                setIsHighContrast(!isHighContrast);
                sound.playHologramTap();
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                isHighContrast
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Toggle WCAG High Contrast Mode"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Audio Feedback Mute Toggle */}
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-lg border transition-colors ${
                isMuted
                  ? 'bg-slate-900 text-slate-500 border-slate-800'
                  : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
              }`}
              title="Toggle Spatial Web Audio Synthesizer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Global Navigation Bar */}
        <nav className="max-w-7xl mx-auto mt-3 pt-2 border-t border-slate-800/60 overflow-x-auto flex items-center gap-1.5 text-xs font-mono py-1">
          <button
            onClick={() => handleTabSwitch('hologram', 'Holographic AR 3D View')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'hologram'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Hologram 3D AR</span>
          </button>

          <button
            onClick={() => handleTabSwitch('indian_gov_shield', 'Government of India Sanctions & Anti-Obscenity Shield')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'indian_gov_shield'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>🇮🇳 Indian Gov & Zero 18+ Shield</span>
          </button>

          <button
            onClick={() => handleTabSwitch('village_urban_welfare', 'Village & Urban Help (Health, Food, Home)')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'village_urban_welfare'
                ? 'bg-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Village & Urban Help (Health, Food, Home)</span>
          </button>

          <button
            onClick={() => handleTabSwitch('media_commerce_meetings', 'Universal Free Media, Food, Shopping & Business Meetings Hub')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'media_commerce_meetings'
                ? 'bg-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Free Media, Food, Shopping & Meetings</span>
          </button>

          <button
            onClick={() => handleTabSwitch('storage_128gb', '128 GB Solid-State Encrypted Storage Vault')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'storage_128gb'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>128 GB Storage Vault</span>
          </button>

          <button
            onClick={() => handleTabSwitch('universal_network', 'Universal Multi-Network Gateway (All Networks Access)')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'universal_network'
                ? 'bg-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>All Networks Access (5G, 2G, Sat)</span>
          </button>

          <button
            onClick={() => handleTabSwitch('biometrics', 'Biometric WebAuthn Passkeys & Hardware Login')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'biometrics'
                ? 'bg-purple-600 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-purple-400 hover:text-purple-300 hover:bg-purple-950/40'
            }`}
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span>Biometric Passkeys (WebAuthn)</span>
          </button>

          <button
            onClick={() => handleTabSwitch('enterprise_consortium', 'Top Industrial, IT & Non-IT Consortium Experience Access')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'enterprise_consortium'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Industrial & IT Consortium</span>
          </button>

          <button
            onClick={() => handleTabSwitch('gaming_arena', 'Government Approved Trending Gaming & Win Profit Arena')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'gaming_arena'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Trending Gaming & Profit (Gov Approved)</span>
          </button>

          <button
            onClick={() => handleTabSwitch('girls_safety', 'Women & Girls Emergency Safety')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'girls_safety'
                ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Women Safety & CCTV Grid</span>
          </button>

          <button
            onClick={() => handleTabSwitch('road_accident', 'Road Accident & Hospital Ambulance Rescue')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'road_accident'
                ? 'bg-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40'
            }`}
          >
            <Ambulance className="w-3.5 h-3.5" />
            <span>Road Accidents & Hospitals</span>
          </button>

          <button
            onClick={() => handleTabSwitch('earth_disaster', 'Planetary Early Warning Radar (15-30 Days)')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'earth_disaster'
                ? 'bg-sky-600 text-white font-bold shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                : 'text-sky-400 hover:text-sky-300 hover:bg-sky-950/40'
            }`}
          >
            <Tornado className="w-3.5 h-3.5" />
            <span>Earth & Disaster Radar (15-30D)</span>
          </button>

          <button
            onClick={() => handleTabSwitch('gov_protocols', 'Worldwide Government Protocols')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'gov_protocols'
                ? 'bg-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Worldwide Gov Protocols</span>
          </button>

          <button
            onClick={() => handleTabSwitch('approvals', 'Official Universal Approvals')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'approvals'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Universal Approvals ({approvals.length})</span>
          </button>

          <button
            onClick={() => handleTabSwitch('security', 'Zero-Trust E2E Encryption')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Trust Encryption</span>
          </button>

          <button
            onClick={() => handleTabSwitch('productivity', 'Day-to-Day Life & Habits')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'productivity'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Life, Habits & Focus</span>
          </button>

          <button
            onClick={() => handleTabSwitch('automobile_commerce', 'Automobile V2X & Commerce')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'automobile_commerce'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Automobile & Escrow</span>
          </button>

          <button
            onClick={() => handleTabSwitch('spatial_ai', 'Omni-Generational Problem Solver AI (Ancient to Future Generations)')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'spatial_ai'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Omni-Gen AI Assistant (All Eras)</span>
          </button>

          <button
            onClick={() => handleTabSwitch('fleet_sync', 'Fleet Cross-Platform Sync')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'fleet_sync'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Device Fleet Sync</span>
          </button>

          <button
            onClick={() => handleTabSwitch('battery_hardware', 'Battery & Hardware Optimizer')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'battery_hardware'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Battery Optimizer</span>
          </button>

          <button
            onClick={() => handleTabSwitch('affordable_plans', 'Lifetime Free Access Pass ($0 Forever)')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'affordable_plans'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40'
            }`}
          >
            <Infinity className="w-3.5 h-3.5" />
            <span>Lifetime Free Access ($0)</span>
          </button>
        </nav>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {activeTab === 'hologram' && (
          <div className="space-y-6">
            <HolographicARCanvas
              mode={hologramMode}
              onModeChange={setHologramMode}
              performanceTier={performanceTier}
              onPerformanceTierChange={setPerformanceTier}
              isHighContrast={isHighContrast}
            />

            {/* Quick Context Summary Grid Below 3D View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                onClick={() => handleTabSwitch('village_urban_welfare', 'Village & Urban Help (Health, Food, Home)')}
                className="p-4 bg-emerald-950/40 border border-emerald-500/50 hover:border-emerald-400 rounded-2xl cursor-pointer transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  <span>Village & Urban Help</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  Health, Food & Housing
                </div>
                <p className="text-xs text-emerald-200/80 mt-1">
                  100% Free primary clinics, Jan Aushadhi medicines, PDS grain ration & PMAY shelters for all rural & urban citizens.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('indian_gov_shield', 'Government of India Sanctions & Anti-Obscenity Shield')}
                className="p-4 bg-amber-950/40 border border-amber-500/50 hover:border-amber-400 rounded-2xl cursor-pointer transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>Indian Gov & Zero 18+ Shield</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  MeitY & MHA Sanctioned
                </div>
                <p className="text-xs text-amber-200/80 mt-1">
                  100% Zero tolerance for 18+, adults, and porn media. Instant hardware ban & police arrest warrant dispatch.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('girls_safety', 'Women & Girls Emergency Safety')}
                className="p-4 bg-rose-950/40 border border-rose-500/50 hover:border-rose-400 rounded-2xl cursor-pointer transition-all shadow-[0_0_20px_rgba(244,63,94,0.15)]"
              >
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs font-mono">
                  <ShieldAlert className="w-4 h-4 animate-pulse" />
                  <span>Girls Emergency Safety</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  CCTV Mesh Active
                </div>
                <p className="text-xs text-rose-200/80 mt-1">
                  Live CCTV auto-record anywhere, phone sensors & Police 112 / Cyber Cell 1930 dispatch.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('road_accident', 'Road Accident & Hospital Ambulance Rescue')}
                className="p-4 bg-emerald-950/40 border border-emerald-500/50 hover:border-emerald-400 rounded-2xl cursor-pointer transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                  <Ambulance className="w-4 h-4 animate-pulse" />
                  <span>Road Accidents & Hospitals</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  100% Equal Triage
                </div>
                <p className="text-xs text-emerald-200/80 mt-1">
                  Zero VIP bias, instant crash sensor telemetry, green traffic signal clearing & nearest ICU beds.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('earth_disaster', 'Planetary Early Warning Radar')}
                className="p-4 bg-sky-950/40 border border-sky-500/50 hover:border-sky-400 rounded-2xl cursor-pointer transition-all shadow-[0_0_20px_rgba(14,165,233,0.15)]"
              >
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs font-mono">
                  <Tornado className="w-4 h-4 animate-pulse" />
                  <span>Earth & Disaster Radar</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  15 to 30 Days Advance
                </div>
                <p className="text-xs text-sky-200/80 mt-1">
                  Floods, hurricanes, tsunamis, quakes, burning sensation, wildlife & sanitary water warnings.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('gov_protocols', 'Worldwide Government Protocols')}
                className="p-4 bg-indigo-950/40 border border-indigo-500/50 hover:border-indigo-400 rounded-2xl cursor-pointer transition-all shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              >
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs font-mono">
                  <Landmark className="w-4 h-4" />
                  <span>Worldwide Gov Protocols</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  Global Legal & CAD Mesh
                </div>
                <p className="text-xs text-indigo-200/80 mt-1">
                  CAP v1.2, NENA-i3, Judicial CCTV warrants, WMO 30D treaties & multi-country emergency hotlines.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('security', 'Zero-Trust Encryption')}
                className="p-4 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                  <Lock className="w-4 h-4" />
                  <span>People's Data Privacy</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  AES-256 Client Vault
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Zero data stolen. 100% private biometric enclave, zero-knowledge proofs & post-quantum standards.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('approvals', 'Universal Approvals')}
                className="p-4 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sovereign Approvals</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  {approvals.filter(a => a.status === 'approved').length} Active Clearances
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Financial grants, universal education, transit mobility & citizen welfare notarized.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('storage_128gb', '128 GB Solid-State Storage')}
                className="p-4 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono">
                  <HardDrive className="w-4 h-4" />
                  <span>Hardware Solid-State</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  128 GB Storage Vault
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  High-speed NVMe/OPFS partition allocated for offline holographic assets, CCTV video & health DBs.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('universal_network', 'Universal Multi-Network Gateway')}
                className="p-4 bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs font-mono">
                  <Radio className="w-4 h-4" />
                  <span>Universal Gateway</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  All Networks Access
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Instant handshake to 5G SA, 4G LTE, 2G Village EDGE, LEO Satellites, PM-WANI Wi-Fi & P2P Mesh.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('enterprise_consortium', 'Industrial & IT Consortium')}
                className="p-4 bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                  <Building2 className="w-4 h-4" />
                  <span>Global Mega-Conglomerates</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  Industrial, IT & Non-IT
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Live connection & Experience Access into Tata, Reliance, Siemens, TCS, Infosys, Google, SBI & Apollo.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('gaming_arena', 'Trending Gaming & Win Profit Arena')}
                className="p-4 bg-amber-950/40 border border-amber-500/50 hover:border-amber-400 rounded-2xl cursor-pointer transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                  <Gamepad2 className="w-4 h-4 animate-bounce" />
                  <span>Trending Game Arena</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  Win Cash Profit ($0 Fee)
                </div>
                <p className="text-xs text-amber-200/80 mt-1">
                  MeitY approved permissible skill games: Cyber reflex, road safety pilot & AI code sprints with instant UPI payout.
                </p>
              </div>

              <div 
                onClick={() => handleTabSwitch('media_commerce_meetings', 'Universal Free Media, Food, Shopping & Business Meetings Hub')}
                className="p-4 bg-indigo-950/40 border border-indigo-500/50 hover:border-indigo-400 rounded-2xl cursor-pointer transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              >
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs font-mono">
                  <BookOpen className="w-4 h-4" />
                  <span>Digital Commons & Market</span>
                </div>
                <div className="text-xl font-bold font-mono text-white mt-2">
                  Free Media, Food & Meetings
                </div>
                <p className="text-xs text-indigo-200/80 mt-1">
                  100% Free E-Books, academic journals, 4K movies, spatial songs, fresh food items & HD business meeting rooms.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'indian_gov_shield' && (
          <IndianGovAndChildSafetyShield
            isHighContrast={isHighContrast}
            onSecurityAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'village_urban_welfare' && (
          <VillageUrbanWelfareGrid
            isHighContrast={isHighContrast}
            onWelfareAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'media_commerce_meetings' && (
          <UniversalMediaCommerceMeetingsHub
            isHighContrast={isHighContrast}
            onHubAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'storage_128gb' && (
          <Storage128GBVault
            isHighContrast={isHighContrast}
            onStorageAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'universal_network' && (
          <UniversalNetworkAccessEngine
            isHighContrast={isHighContrast}
            onNetworkSwitch={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'biometrics' && (
          <BiometricWebAuthnCenter
            isHighContrast={isHighContrast}
            onBiometricStatusChange={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'enterprise_consortium' && (
          <EnterpriseConsortiumExperienceHub
            isHighContrast={isHighContrast}
            onExperienceNotice={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'gaming_arena' && (
          <GovApprovedGamingArena
            isHighContrast={isHighContrast}
            onGamingAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'girls_safety' && (
          <WomenSafetyGuardian
            isHighContrast={isHighContrast}
            onSecurityAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'road_accident' && (
          <RoadAccidentLifeSaver
            isHighContrast={isHighContrast}
            onEmergencyAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'earth_disaster' && (
          <DisasterEarlyWarningRadar
            isHighContrast={isHighContrast}
            onDisasterAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'gov_protocols' && (
          <GlobalGovernmentProtocols
            isHighContrast={isHighContrast}
            onProtocolNotice={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'approvals' && (
          <ApprovalsGovernanceHub
            approvals={approvals}
            onUpdateApprovals={setApprovals}
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'security' && (
          <SecurityEncryptionCenter
            isHighContrast={isHighContrast}
            onSecurityAlert={msg => setScreenReaderAnnouncement(msg)}
          />
        )}

        {activeTab === 'productivity' && (
          <DayToDayProductivity
            habits={habits}
            onUpdateHabits={setHabits}
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'automobile_commerce' && (
          <EcosystemPartnerships
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'spatial_ai' && (
          <SpatialAIAssistant
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'fleet_sync' && (
          <CrossPlatformSync
            devices={devices}
            onUpdateDevices={setDevices}
            isOffline={isOffline}
            onToggleOffline={toggleOfflineMode}
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'battery_hardware' && (
          <PerformanceBatteryMonitor
            performanceTier={performanceTier}
            onPerformanceTierChange={setPerformanceTier}
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'affordable_plans' && (
          <SubscriptionModel
            isHighContrast={isHighContrast}
          />
        )}
      </main>

      {/* Futuristic Bottom Status Bar */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 px-4 py-3 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              AURA NEXUS GLOBAL CONSENSUS MESH
            </span>
            <span>·</span>
            <span>NIST POST-QUANTUM SAFE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>OFFLINE LOCAL CACHING: READY</span>
            <span>·</span>
            <span>ENTRY-LEVEL HARDWARE OPTIMIZED</span>
          </div>
        </div>
      </footer>

      {/* Real-Time Live SOS Auto-Connect Call Modal */}
      <RealTimeLiveSOSCallModal
        isOpen={showLiveSosCallModal}
        onClose={() => setShowLiveSosCallModal(false)}
        isHighContrast={isHighContrast}
      />
    </div>
  );
}
