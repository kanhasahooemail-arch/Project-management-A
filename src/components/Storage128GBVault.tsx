import React, { useState } from 'react';
import { HardwareStorageVault128GB, StoragePartition } from '../types';
import { sound } from '../utils/audio';
import { 
  HardDrive, 
  Database, 
  ShieldCheck, 
  Zap, 
  Trash2, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Lock, 
  Sparkles, 
  Cpu, 
  Eye, 
  FileCheck, 
  Server, 
  Gauge,
  PlusCircle,
  Smartphone,
  Check
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onStorageAlert?: (msg: string) => void;
}

const INITIAL_PARTITIONS: StoragePartition[] = [
  {
    id: 'part-ar',
    name: 'Holographic 3D AR Assets & Digital Twins',
    category: 'holographic_ar',
    allocatedGb: 35.0,
    usedGb: 28.4,
    encrypted: true,
    encryptionStandard: 'AES-256-GCM Hardware Sealed',
    fileCount: 1420,
    lastSync: '4 mins ago',
    color: 'bg-cyan-500',
    description: '3D spatial geometry meshes, automobile chassis models, and planetary globe wireframes.'
  },
  {
    id: 'part-cctv',
    name: 'Women Safety SOS CCTV Blackbox Loop',
    category: 'safety_cctv_blackbox',
    allocatedGb: 25.0,
    usedGb: 18.2,
    encrypted: true,
    encryptionStandard: 'ChaCha20-Poly1305 + Tamper Proof',
    fileCount: 389,
    lastSync: '1 min ago',
    color: 'bg-rose-500',
    description: 'Encrypted rolling incident recordings, audio distress evidence, and transit CCTV snippets.'
  },
  {
    id: 'part-radar',
    name: 'Planetary 15-30D Disaster Radar Offline DB',
    category: 'disaster_radar',
    allocatedGb: 20.0,
    usedGb: 14.8,
    encrypted: true,
    encryptionStandard: 'AES-256 Zero-Knowledge',
    fileCount: 840,
    lastSync: '12 mins ago',
    color: 'bg-sky-500',
    description: 'Precursor seismic logs, satellite Doppler radar tiles, ocean buoys, and 30-day hurricane models.'
  },
  {
    id: 'part-welfare',
    name: 'Village & Urban Welfare (Health, Food, Home) DB',
    category: 'welfare_health_records',
    allocatedGb: 15.0,
    usedGb: 8.6,
    encrypted: true,
    encryptionStandard: 'NIST SP 800-88 Compliant',
    fileCount: 2950,
    lastSync: '8 mins ago',
    color: 'bg-emerald-500',
    description: 'Offline primary health center directories, Jan Aushadhi stock, PDS ration registries, PMAY housing.'
  },
  {
    id: 'part-v2x',
    name: 'Road Accident Crash Telemetry & Ambulance V2X',
    category: 'accident_v2x_telemetry',
    allocatedGb: 12.0,
    usedGb: 6.4,
    encrypted: true,
    encryptionStandard: 'ISO 26262 ASIL-D Encrypted',
    fileCount: 612,
    lastSync: 'Just now',
    color: 'bg-amber-500',
    description: 'High-frequency G-force crash sensor streams, green corridor traffic dispatch logs, and ICU telemetry.'
  },
  {
    id: 'part-bio',
    name: 'Biometric WebAuthn Passkeys & Quantum Enclave',
    category: 'biometric_quantum_enclave',
    allocatedGb: 5.0,
    usedGb: 2.1,
    encrypted: true,
    encryptionStandard: 'FIDO2 WebAuthn / Kyber-1024',
    fileCount: 18,
    lastSync: 'Active',
    color: 'bg-purple-500',
    description: 'Hardware-bound private passkey credentials, TPM/Secure Enclave certificates, and sovereign citizen tokens.'
  },
  {
    id: 'part-sys',
    name: 'Universal OS Offline Cache & System Buffer',
    category: 'system_offline_cache',
    allocatedGb: 6.0,
    usedGb: 4.5,
    encrypted: true,
    encryptionStandard: 'Client-Side Hardware Salted',
    fileCount: 4200,
    lastSync: 'Continuous',
    color: 'bg-slate-400',
    description: 'Service workers, offline web app manifests, spatial audio synthesizers, and translation models.'
  }
];

export const Storage128GBVault: React.FC<Props> = ({ isHighContrast, onStorageAlert }) => {
  const [partitions, setPartitions] = useState<StoragePartition[]>(INITIAL_PARTITIONS);
  const [isSpeedTesting, setIsSpeedTesting] = useState<boolean>(false);
  const [speedTestResults, setSpeedTestResults] = useState<{
    readSpeed: number;
    writeSpeed: number;
    iops: number;
    latencyUs: number;
  } | null>({
    readSpeed: 3450,
    writeSpeed: 2980,
    iops: 480000,
    latencyUs: 12
  });
  const [isTrimming, setIsTrimming] = useState<boolean>(false);
  const [activeNotice, setActiveNotice] = useState<string | null>(
    '128 GB HIGH-SPEED SOLID-STATE STORAGE VAULT ONLINE: Fully encrypted at rest (AES-256 / OPFS).'
  );
  const [selectedPartition, setSelectedPartition] = useState<string | null>(null);

  // Compute total usage
  const totalAllocated = partitions.reduce((sum, p) => sum + p.allocatedGb, 0); // 118 GB
  const totalUsed = parseFloat(partitions.reduce((sum, p) => sum + p.usedGb, 0).toFixed(1)); // ~83.0 GB
  const unallocatedGb = parseFloat((128.0 - totalAllocated).toFixed(1)); // 10.0 GB free unpartitioned
  const totalFreeGb = parseFloat((128.0 - totalUsed).toFixed(1)); // ~45.0 GB available space

  const handleRunSpeedTest = () => {
    sound.playScanPulse();
    setIsSpeedTesting(true);
    setActiveNotice('Running 128 GB Solid-State Storage benchmark (Sequential Read/Write + 4K Random IOPS)...');

    setTimeout(() => {
      const read = Math.floor(3400 + Math.random() * 180);
      const write = Math.floor(2900 + Math.random() * 160);
      const iops = Math.floor(470000 + Math.random() * 25000);
      const lat = Math.floor(10 + Math.random() * 4);

      setSpeedTestResults({
        readSpeed: read,
        writeSpeed: write,
        iops: iops,
        latencyUs: lat
      });
      setIsSpeedTesting(false);
      sound.playLockSuccess();
      const msg = `128 GB Storage Benchmark: ${read} MB/s Read, ${write} MB/s Write. 100% NVMe/OPFS Health.`;
      setActiveNotice(msg);
      if (onStorageAlert) onStorageAlert(msg);
    }, 1200);
  };

  const handleTrimClean = () => {
    sound.playChirp(720, 0.08);
    setIsTrimming(true);
    setActiveNotice('Executing hardware TRIM command and zero-knowledge garbage collection...');

    setTimeout(() => {
      // Reclaim 0.8 GB from caches
      setPartitions(prev => prev.map(p => {
        if (p.category === 'system_offline_cache') {
          return { ...p, usedGb: parseFloat(Math.max(2.0, p.usedGb - 0.6).toFixed(1)) };
        }
        if (p.category === 'holographic_ar') {
          return { ...p, usedGb: parseFloat(Math.max(15.0, p.usedGb - 0.4).toFixed(1)) };
        }
        return p;
      }));
      setIsTrimming(false);
      sound.playLockSuccess();
      const msg = '128 GB Storage Optimized: 1.0 GB reclaimed via TRIM. Flash endurance refreshed.';
      setActiveNotice(msg);
      if (onStorageAlert) onStorageAlert(msg);
    }, 1100);
  };

  const handleExportPartitionManifest = () => {
    sound.playChirp(1040, 0.05);
    const manifest = {
      storageDeviceName: 'AURA NEXUS 128 GB SOVEREIGN HARDWARE VAULT',
      capacityGb: 128.0,
      totalUsedGb: totalUsed,
      totalFreeGb: totalFreeGb,
      fileSystem: 'W3C Origin Private File System (OPFS) / NVMe UFS 4.0 Subsystem',
      encryptionScheme: 'AES-256-GCM + NIST Post-Quantum Kyber Key Sealed',
      smartHealthStatus: '100% HEALTHY / ZERO BAD SECTORS',
      timestamp: new Date().toISOString(),
      partitions: partitions.map(p => ({
        id: p.id,
        name: p.name,
        allocatedGb: `${p.allocatedGb} GB`,
        usedGb: `${p.usedGb} GB`,
        encryption: p.encryptionStandard,
        fileCount: p.fileCount,
        lastSync: p.lastSync,
      }))
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AURA-128GB-STORAGE-VAULT-MANIFEST-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setActiveNotice('128 GB Storage Manifest & Partition Checksums exported.');
  };

  const handleSimulateDataWrite = (partitionId: string) => {
    sound.playHologramTap();
    setPartitions(prev => prev.map(p => {
      if (p.id === partitionId) {
        const nextUsed = parseFloat(Math.min(p.allocatedGb, p.usedGb + 0.3).toFixed(1));
        return { ...p, usedGb: nextUsed, fileCount: p.fileCount + 12, lastSync: 'Just now' };
      }
      return p;
    }));
    sound.playChirp(880, 0.04);
  };

  return (
    <div className="space-y-6">
      {/* 128 GB Storage Crown Header */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast
          ? 'bg-black border-cyan-400 text-white'
          : 'bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                <span>128 GB SOLID-STATE HARDWARE STORAGE ADDED & ACTIVE</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% ENCRYPTED AT REST (AES-256)</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>NVMe / OPFS 3,450 MB/s THROUGHPUT</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              128 GB Sovereign Solid-State Storage Vault
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl font-sans leading-relaxed">
              Equipped with a high-capacity <strong>128 GB hardware-bound storage partition</strong> built on 
              W3C Origin Private File System (OPFS) and local NVMe solid-state caching. 
              Safeguards all offline emergency modules: 4K holographic assets, women's safety CCTV recordings, 
              15-30 day disaster radar tiles, village/urban welfare directories, and biometric credentials with zero cloud dependency.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleRunSpeedTest}
              disabled={isSpeedTesting}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50"
            >
              <Gauge className={`w-4 h-4 ${isSpeedTesting ? 'animate-spin' : ''}`} />
              <span>{isSpeedTesting ? 'TESTING 128 GB BUS...' : 'RUN SPEED BENCHMARK'}</span>
            </button>

            <button
              onClick={handleTrimClean}
              disabled={isTrimming}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isTrimming ? 'animate-spin' : ''}`} />
              <span>{isTrimming ? 'TRIMMING...' : 'TRIM OPTIMIZE'}</span>
            </button>

            <button
              onClick={handleExportPartitionManifest}
              className="w-full sm:w-auto p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center transition-all"
              title="Export 128 GB Storage Manifest (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 128 GB Storage Usage Visualizer Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-base">{totalUsed} GB USED</span>
              <span className="text-slate-400">OF</span>
              <span className="text-cyan-400 font-bold text-base">128.0 GB TOTAL CAPACITY</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 text-[11px]">
                {totalFreeGb} GB AVAILABLE ({Math.round((totalFreeGb / 128) * 100)}% FREE)
              </span>
            </div>
            <div className="text-slate-400 text-[11px]">
              STORAGE HEALTH: <span className="text-emerald-400 font-bold">100% OPTIMAL</span> · TRIM ENGINE: <span className="text-cyan-300">ACTIVE</span>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="w-full h-4 rounded-full bg-slate-950 overflow-hidden flex border border-slate-800 p-0.5 shadow-inner">
            {partitions.map(p => {
              const pct = (p.usedGb / 128.0) * 100;
              return (
                <div
                  key={p.id}
                  style={{ width: `${pct}%` }}
                  className={`${p.color} h-full transition-all duration-300 relative group cursor-pointer`}
                  title={`${p.name}: ${p.usedGb} GB`}
                  onClick={() => setSelectedPartition(p.id)}
                />
              );
            })}
            {/* Free Space */}
            <div 
              style={{ width: `${(totalFreeGb / 128.0) * 100}%` }}
              className="bg-slate-800/60 h-full transition-all"
              title={`Free Space: ${totalFreeGb} GB`}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-300 pt-1">
            {partitions.map(p => (
              <div 
                key={p.id}
                onClick={() => setSelectedPartition(selectedPartition === p.id ? null : p.id)}
                className={`flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors ${
                  selectedPartition === p.id ? 'font-bold text-white underline underline-offset-4' : ''
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                <span>{p.name.split(' ')[0]} ({p.usedGb} GB)</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span>Available ({totalFreeGb} GB)</span>
            </div>
          </div>
        </div>

        {/* Status Notice */}
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

      {/* Storage Benchmark & Hardware Controller Quick Stats */}
      {speedTestResults && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-400">SEQUENTIAL READ</div>
            <div className="text-2xl font-mono font-black text-cyan-400 mt-1 flex items-baseline gap-1">
              {speedTestResults.readSpeed} <span className="text-xs text-slate-400 font-normal">MB/s</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">PCIe 4.0 NVMe Bus Speed</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-400">SEQUENTIAL WRITE</div>
            <div className="text-2xl font-mono font-black text-purple-400 mt-1 flex items-baseline gap-1">
              {speedTestResults.writeSpeed} <span className="text-xs text-slate-400 font-normal">MB/s</span>
            </div>
            <div className="text-[10px] text-purple-300 font-mono mt-1">Direct AES-256 Crypto Bus</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-400">4K RANDOM IOPS</div>
            <div className="text-2xl font-mono font-black text-emerald-400 mt-1 flex items-baseline gap-1">
              {speedTestResults.iops.toLocaleString()} <span className="text-xs text-slate-400 font-normal">IOPS</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Instant AR Asset Streaming</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-400">SECTOR ACCESS LATENCY</div>
            <div className="text-2xl font-mono font-black text-amber-400 mt-1 flex items-baseline gap-1">
              {speedTestResults.latencyUs} <span className="text-xs text-slate-400 font-normal">μs</span>
            </div>
            <div className="text-[10px] text-amber-300 font-mono mt-1">Microsecond Flash Response</div>
          </div>
        </div>
      )}

      {/* Partitions Detailed Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              128 GB Storage Partition Manager & Directory Map
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Each module maintains an isolated, encrypted partition to guarantee offline availability even in zero-network scenarios.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
            TOTAL PARTITIONS: {partitions.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {partitions.map(partition => {
            const isSelected = selectedPartition === partition.id;
            const percentageUsed = Math.round((partition.usedGb / partition.allocatedGb) * 100);

            return (
              <div
                key={partition.id}
                onClick={() => setSelectedPartition(isSelected ? null : partition.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-3.5 h-3.5 rounded-full ${partition.color} shrink-0`} />
                    <div>
                      <h4 className="text-sm font-bold font-mono text-white">
                        {partition.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                        {partition.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                    {partition.usedGb} / {partition.allocatedGb} GB
                  </span>
                </div>

                {/* Meter */}
                <div className="mt-4 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>CAPACITY UTILIZATION</span>
                    <span className="text-white font-bold">{percentageUsed}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${percentageUsed}%` }}
                      className={`h-full ${partition.color}`}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{partition.encryptionStandard}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{partition.fileCount.toLocaleString()} FILES</span>
                    <span>·</span>
                    <span>SYNC: {partition.lastSync}</span>
                  </div>
                </div>

                {/* Interactive Action Button */}
                <div className="mt-3 pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSimulateDataWrite(partition.id);
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-mono flex items-center gap-1 transition-colors"
                  >
                    <PlusCircle className="w-3 h-3 text-cyan-400" />
                    <span>Cache New Data (+300 MB)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
