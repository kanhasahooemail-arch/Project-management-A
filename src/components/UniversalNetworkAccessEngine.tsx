import React, { useState } from 'react';
import { NetworkNodeProfile, NetworkTierType, NetworkAccessRequest } from '../types';
import { sound } from '../utils/audio';
import { 
  Wifi, 
  WifiOff, 
  Radio, 
  Satellite, 
  Smartphone, 
  Share2, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  Activity, 
  Signal, 
  Cpu, 
  Sliders, 
  Check, 
  ArrowUpDown, 
  Globe, 
  HeartHandshake, 
  Send,
  Download,
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onNetworkSwitch?: (msg: string) => void;
}

const DEFAULT_NETWORKS: NetworkNodeProfile[] = [
  {
    id: 'net-5g',
    name: '5G Ultra-Low Latency & Emergency QoS Slicing',
    type: 'cellular_5g_ultra',
    category: 'cellular',
    carrierOrStandard: 'Global 5G Standalone (5G SA) / 3GPP Rel-18',
    signalStrengthPercent: 98,
    latencyMs: 2.4,
    downloadSpeed: '1,250 Mbps',
    uploadSpeed: '280 Mbps',
    isZeroRatedFree: false,
    status: 'connected_active',
    compressionRatio: 'Adaptive Lossless (1.2x)',
    supportedServices: ['4K Holographic AR', 'Ambulance V2X Green Corridors', 'Real-Time Biometric Auth', 'Omni-Gen Spatial AI'],
    encryption: '5G-AKA / AES-256-GCM',
    coverageScope: 'Metro Cities, Highway Corridors, Smart Urban Centers',
    description: 'Sub-3ms network slicing with priority traffic reservation for emergency police and hospital ambulances.'
  },
  {
    id: 'net-4g',
    name: '4G LTE Universal Mobile Carrier Band',
    type: 'cellular_3g_4g',
    category: 'cellular',
    carrierOrStandard: 'Universal LTE (Bands 1, 3, 5, 8, 40, 41)',
    signalStrengthPercent: 92,
    latencyMs: 18.0,
    downloadSpeed: '85 Mbps',
    uploadSpeed: '24 Mbps',
    isZeroRatedFree: false,
    status: 'standby_ready',
    compressionRatio: 'Brotli Dynamic (3.4x)',
    supportedServices: ['Holographic 3D View', 'Women Safety CCTV Mesh', 'Disaster Radar', 'Welfare Grid'],
    encryption: 'EPS-AKA / AES-128-GCM',
    coverageScope: '99.4% Global Population & Semi-Urban Towns',
    description: 'Standard ubiquitous cellular connection for day-to-day productivity and fleet sync.'
  },
  {
    id: 'net-2g',
    name: '2G / EDGE Rural Village Low-Bandwidth Mode',
    type: 'cellular_2g_edge',
    category: 'cellular',
    carrierOrStandard: 'GSM 900 / 1800 Extreme Micro-Packet (9.6 kbps)',
    signalStrengthPercent: 88,
    latencyMs: 140.0,
    downloadSpeed: '128 kbps',
    uploadSpeed: '48 kbps',
    isZeroRatedFree: true,
    status: 'available_to_request',
    compressionRatio: 'Extreme Micro-Telemetry (24.0x)',
    supportedServices: ['Women SOS Emergency', 'Village Clinic Appointments', 'PDS Ration Stock Lookup', '15-30D Disaster Bulletins'],
    encryption: 'A5/3 Kasumi + Zero-Trust Payload Sealed',
    coverageScope: 'Remote Rural Villages, Mountain Hamlets, Coastal Fishermen',
    description: 'Engineered specifically for low-end feature phones and patchy village cell reception with 8-byte telemetry packets.'
  },
  {
    id: 'net-sat',
    name: 'Satellite Direct-to-Device (LEO Constellation)',
    type: 'satellite_leo_direct',
    category: 'satellite',
    carrierOrStandard: 'NavIC / ISRO GSAT-7 & Starlink / Iridium SBD Relay',
    signalStrengthPercent: 85,
    latencyMs: 42.0,
    downloadSpeed: '22 Mbps',
    uploadSpeed: '8 Mbps',
    isZeroRatedFree: true,
    status: 'available_to_request',
    compressionRatio: 'Zstandard Optimized (6.5x)',
    supportedServices: ['Off-Grid SOS Beacon', 'Planetary Early Warning Radar', 'Disaster Triage Dispatch', 'Satellite GPS Caching'],
    encryption: 'Quantum-Resistant Kyber / AES-256',
    coverageScope: '100% Planetary Oceans, Deserts, Forests & Polar Zones',
    description: 'Direct satellite-to-phone connectivity that functions when earthquakes or cyclones destroy terrestrial cellular towers.'
  },
  {
    id: 'net-wifi',
    name: 'Public Wi-Fi & BharatNet / PM-WANI Village Mesh',
    type: 'wifi_pm_wani',
    category: 'wifi',
    carrierOrStandard: 'IEEE 802.11ax (Wi-Fi 6/7) & Free Gram Panchayat Hotspots',
    signalStrengthPercent: 95,
    latencyMs: 6.2,
    downloadSpeed: '200 Mbps',
    uploadSpeed: '120 Mbps',
    isZeroRatedFree: true,
    status: 'available_to_request',
    compressionRatio: 'Direct Pass-through',
    supportedServices: ['100% Free Public Access', 'Village Tele-Medicine', 'Farmer Mandi Crops', 'Offline Video & 128GB Sync'],
    encryption: 'WPA3-Enterprise / SAE',
    coverageScope: 'Gram Panchayat Offices, Public Schools, Bus Terminals, Railway Stations',
    description: 'Government-subsidized high-speed optical fiber Wi-Fi kiosks offering free high-speed downloads for all citizens.'
  },
  {
    id: 'net-ble',
    name: 'Local Bluetooth BLE & Wi-Fi Direct Off-Grid Mesh',
    type: 'offline_ble_mesh',
    category: 'mesh_p2p',
    carrierOrStandard: 'Bluetooth 5.4 Long Range & Wi-Fi Aware P2P',
    signalStrengthPercent: 100,
    latencyMs: 1.1,
    downloadSpeed: '2.5 Mbps',
    uploadSpeed: '2.5 Mbps',
    isZeroRatedFree: true,
    status: 'available_to_request',
    compressionRatio: 'Binary Bitmask (12.0x)',
    supportedServices: ['Local Walkie-Talkie Audio', 'Village Disaster Evacuation Hops', 'Zero-Infrastructure Chat', '100m Peer Relay'],
    encryption: 'ECDH Curve25519 Peer-to-Peer',
    coverageScope: 'Local Neighborhood (100m to 1km multi-hop peer relay)',
    description: 'Zero-cell tower mesh network hopping from phone to phone during total blackout or cellular grid collapse.'
  },
  {
    id: 'net-lora',
    name: 'LoRaWAN Long-Range Citizen Radio Frequency',
    type: 'lora_radio_frequency',
    category: 'radio_frequency',
    carrierOrStandard: 'LoRa 868 / 915 MHz ISM Band & VHF Emergency Beacon',
    signalStrengthPercent: 82,
    latencyMs: 350.0,
    downloadSpeed: '5.4 kbps',
    uploadSpeed: '5.4 kbps',
    isZeroRatedFree: true,
    status: 'available_to_request',
    compressionRatio: 'Compact Delta Telemetry (40.0x)',
    supportedServices: ['Agricultural Soil Moisture', 'Wildlife Perimeter Intrusion', 'River Flood Guages', 'SOS Chirps'],
    encryption: 'AES-128 Hardware Crypt',
    coverageScope: '15 km Line-of-Sight Rural Farmlands & Forest Corridors',
    description: 'Ultra-low-power radio wave communication that operates on coin-cell batteries over miles of rural terrain.'
  },
  {
    id: 'net-zerorated',
    name: 'Zero-Rated Emergency Carrier Gateway (0 Balance)',
    type: 'zero_rated_emergency',
    category: 'government_zero_rated',
    carrierOrStandard: 'Telecom Sovereign Accord: TRAI / FCC / ITU Mandate',
    signalStrengthPercent: 96,
    latencyMs: 15.0,
    downloadSpeed: '15 Mbps',
    uploadSpeed: '5 Mbps',
    isZeroRatedFree: true,
    status: 'available_to_request',
    compressionRatio: 'Mandatory Public Whitelist',
    supportedServices: ['Police 112 Emergency', '1930 Cyber Fraud Lock', 'Ambulance SOS', 'Health Center Consultation'],
    encryption: 'Telecom Carrier Sovereign Tunnel',
    coverageScope: 'Every SIM Card & Network Provider Worldwide',
    description: 'Statutory mandate ensuring citizens can access life-saving services even with zero account balance and no active recharge.'
  }
];

export const UniversalNetworkAccessEngine: React.FC<Props> = ({ isHighContrast, onNetworkSwitch }) => {
  const [networks, setNetworks] = useState<NetworkNodeProfile[]>(DEFAULT_NETWORKS);
  const [activeNetworkId, setActiveNetworkId] = useState<string>('net-5g');
  const [isRequestingAccess, setIsRequestingAccess] = useState<string | null>(null);
  const [accessRequestsHistory, setAccessRequestsHistory] = useState<NetworkAccessRequest[]>([]);
  const [activeNotice, setActiveNotice] = useState<string | null>(
    'ALL NETWORK TYPES DETECTED: 5G SA, 4G LTE, 2G Village EDGE, Satellite LEO, PM-WANI Wi-Fi, and Zero-Data modes active.'
  );
  const [autoFailoverEnabled, setAutoFailoverEnabled] = useState<boolean>(true);
  const [dataCompressionMode, setDataCompressionMode] = useState<'ultra_light' | 'adaptive' | 'high_fidelity'>('adaptive');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [lastPingTest, setLastPingTest] = useState<{
    latency: number;
    jitter: number;
    packetLoss: number;
    timestamp: string;
  }>({
    latency: 2.4,
    jitter: 0.3,
    packetLoss: 0.0,
    timestamp: 'Just now'
  });

  const activeNetwork = networks.find(n => n.id === activeNetworkId) || networks[0];

  const handleRequestAccess = (net: NetworkNodeProfile) => {
    sound.playScanPulse();
    setIsRequestingAccess(net.id);
    setActiveNotice(`Requesting instant access to ${net.name}... Performing carrier cryptographic handshake.`);

    setTimeout(() => {
      // Complete handshake
      sound.playLockSuccess();
      const updated = networks.map(n => {
        if (n.id === net.id) {
          return { ...n, status: 'connected_active' as const };
        }
        return { ...n, status: 'standby_ready' as const };
      });

      setNetworks(updated);
      setActiveNetworkId(net.id);
      setIsRequestingAccess(null);

      const reqRecord: NetworkAccessRequest = {
        id: `REQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        timestamp: new Date().toLocaleTimeString(),
        targetNetworkId: net.id,
        networkName: net.name,
        status: 'switched_active',
        handshakeLatencyMs: net.latencyMs,
        assignedIpOrNodeId: `NODE-${Math.floor(1000 + Math.random() * 9000)}.SOVEREIGN.AURA`,
        carrierConfirmationCode: `AUTH-OK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
      };

      setAccessRequestsHistory(prev => [reqRecord, ...prev.slice(0, 7)]);
      const notice = `SUCCESSFULLY CONNECTED TO: ${net.name} (${net.downloadSpeed}, ${net.latencyMs}ms).`;
      setActiveNotice(notice);

      // Sound chirp
      sound.playChirp(880, 0.05);

      if (onNetworkSwitch) {
        onNetworkSwitch(notice);
      }
    }, 850);
  };

  const handleRunPingDiagnostic = () => {
    sound.playHologramTap();
    const lat = activeNetwork.latencyMs + Math.floor(Math.random() * 2);
    const jit = parseFloat((0.2 + Math.random() * 0.4).toFixed(1));
    const loss = 0.0;

    setLastPingTest({
      latency: lat,
      jitter: jit,
      packetLoss: loss,
      timestamp: 'Just now'
    });

    sound.playLockSuccess();
    setActiveNotice(`Diagnostic Ping to ${activeNetwork.name}: ${lat}ms Latency, ${jit}ms Jitter, 0.0% Packet Loss.`);
  };

  const filteredNetworks = filterCategory === 'all' 
    ? networks 
    : networks.filter(n => n.category === filterCategory);

  const getNetworkIcon = (type: NetworkTierType) => {
    switch (type) {
      case 'cellular_5g_ultra':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'cellular_3g_4g':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'cellular_2g_edge':
        return <Radio className="w-5 h-5 text-amber-400" />;
      case 'satellite_leo_direct':
        return <Satellite className="w-5 h-5 text-purple-400" />;
      case 'wifi_pm_wani':
        return <Wifi className="w-5 h-5 text-sky-400" />;
      case 'offline_ble_mesh':
        return <Share2 className="w-5 h-5 text-rose-400" />;
      case 'lora_radio_frequency':
        return <Signal className="w-5 h-5 text-orange-400" />;
      case 'zero_rated_emergency':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Globe className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Universal Network Crown Banner */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast
          ? 'bg-black border-cyan-400 text-white'
          : 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>ALL NETWORK TYPES EASILY ACCESSIBLE (ONE-TAP CONNECT)</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ZERO-DATA EMERGENCY BALANCE GUARANTEED</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center gap-1">
                <Satellite className="w-3.5 h-3.5 text-purple-400" />
                <span>DIRECT SATELLITE & BLE MESH RESILIENCE</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              Universal Multi-Network Gateway & Access Engine
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl font-sans leading-relaxed">
              Seamlessly request and connect to any network protocol on Earth: 
              <strong> 5G Ultra-Low Latency</strong> in cities, <strong>2G EDGE Micro-Packets</strong> in rural villages, 
              <strong> LEO Satellites (NavIC/Starlink)</strong> during disasters, <strong>Free BharatNet PM-WANI Wi-Fi</strong>, 
              and <strong>Off-Grid Peer-to-Peer Bluetooth Mesh</strong>. 
              Always accessible with 100% zero-cost emergency whitelisting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleRunPingDiagnostic}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
            >
              <Activity className="w-4 h-4 text-slate-950" />
              <span>TEST NETWORK DIAGNOSTIC PING</span>
            </button>

            <button
              onClick={() => {
                setAutoFailoverEnabled(!autoFailoverEnabled);
                sound.playHologramTap();
              }}
              className={`w-full sm:w-auto px-4 py-3 rounded-2xl border font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                autoFailoverEnabled
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>AUTO-FAILOVER: {autoFailoverEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Current Active Network Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40">
              {getNetworkIcon(activeNetwork.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">{activeNetwork.name}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  CURRENTLY ACTIVE
                </span>
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Standard: {activeNetwork.carrierOrStandard} · Encryption: {activeNetwork.encryption}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">DOWN / UP SPEED</span>
              <span className="text-cyan-300 font-bold">{activeNetwork.downloadSpeed} / {activeNetwork.uploadSpeed}</span>
            </div>
            <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">LATENCY</span>
              <span className="text-emerald-400 font-bold">{lastPingTest.latency} ms</span>
            </div>
            <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">SIGNAL QUALITY</span>
              <span className="text-white font-bold">{activeNetwork.signalStrengthPercent}% (5/5 Bars)</span>
            </div>
            <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">ZERO-DATA ACCESS</span>
              <span className="text-emerald-300 font-bold">100% Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Live Notification Bar */}
        {activeNotice && (
          <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{activeNotice}</span>
            </div>
            <button
              onClick={() => setActiveNotice(null)}
              className="text-slate-500 hover:text-white text-[11px]"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Network Category Filter & Compression Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl font-mono text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-400 text-[11px] mr-1">FILTER:</span>
          {['all', 'cellular', 'satellite', 'wifi', 'mesh_p2p', 'government_zero_rated'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg uppercase tracking-wider text-[11px] transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400 text-[11px]">DATA COMPRESSION:</span>
          <select
            value={dataCompressionMode}
            onChange={(e) => {
              setDataCompressionMode(e.target.value as any);
              sound.playHologramTap();
            }}
            className="bg-slate-950 border border-slate-700 text-cyan-300 text-[11px] rounded-lg px-2.5 py-1 font-mono focus:outline-none focus:border-cyan-400"
          >
            <option value="ultra_light">Ultra-Light (2G / Sat Village Mode - 24x)</option>
            <option value="adaptive">Adaptive Auto-Bandwidth (Recommended)</option>
            <option value="high_fidelity">Uncompressed 4K Full Stream (5G / Fiber)</option>
          </select>
        </div>
      </div>

      {/* Grid of All Available Networks with Easy Access Request Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNetworks.map(network => {
          const isCurrent = network.id === activeNetworkId;
          const isPending = isRequestingAccess === network.id;

          return (
            <div
              key={network.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      {getNetworkIcon(network.type)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                        {network.name}
                      </h3>
                      <div className="text-xs font-mono text-cyan-400 mt-0.5">
                        {network.carrierOrStandard}
                      </div>
                    </div>
                  </div>

                  {isCurrent ? (
                    <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-mono font-bold text-[10px] tracking-wider uppercase">
                      ACTIVE
                    </span>
                  ) : network.isZeroRatedFree ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-mono text-[10px]">
                      100% FREE $0
                    </span>
                  ) : null}
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {network.description}
                </p>

                {/* Network Telemetry Specs Grid */}
                <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">THROUGHPUT</span>
                    <span className="text-white font-bold text-[11px]">{network.downloadSpeed}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">LATENCY</span>
                    <span className="text-emerald-400 font-bold text-[11px]">{network.latencyMs} ms</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">SIGNAL</span>
                    <span className="text-cyan-300 font-bold text-[11px]">{network.signalStrengthPercent}%</span>
                  </div>
                </div>

                {/* Coverage Scope */}
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500 block text-[10px] uppercase">Coverage Scope:</span>
                  <span className="text-slate-200">{network.coverageScope}</span>
                </div>

                {/* Services Supported Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {network.supportedServices.map((svc, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px]"
                    >
                      ✓ {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Easily Access Request */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                {isCurrent ? (
                  <div className="w-full py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Connected & Routing Traffic</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRequestAccess(network)}
                    disabled={isPending}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-500/40 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] disabled:opacity-50"
                  >
                    <Send className={`w-3.5 h-3.5 ${isPending ? 'animate-bounce' : ''}`} />
                    <span>{isPending ? 'Requesting Handshake & Authorizing...' : 'Request Network Access & Connect'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Network Access Requests Audit History */}
      {accessRequestsHistory.length > 0 && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Recent Network Access Requests & Handshake Audit Log
            </h3>
            <span className="text-xs font-mono text-emerald-400">100% CARRIER CLEARANCE</span>
          </div>

          <div className="space-y-2">
            {accessRequestsHistory.map(req => (
              <div
                key={req.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-bold">{req.networkName}</span>
                  <span className="text-slate-500">({req.assignedIpOrNodeId})</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                  <span>CODE: {req.carrierConfirmationCode}</span>
                  <span>HANDSHAKE: {req.handshakeLatencyMs}ms</span>
                  <span className="text-slate-500">{req.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
