import React, { useState } from 'react';
import { ConnectedDevice } from '../types';
import { sound } from '../utils/audio';
import { 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Glasses, 
  Car, 
  Laptop, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Cloud, 
  CloudOff, 
  Database,
  ArrowUpDown,
  DownloadCloud,
  Check
} from 'lucide-react';

interface Props {
  devices: ConnectedDevice[];
  onUpdateDevices: (devs: ConnectedDevice[]) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  isHighContrast: boolean;
}

export const CrossPlatformSync: React.FC<Props> = ({
  devices,
  onUpdateDevices,
  isOffline,
  onToggleOffline,
  isHighContrast,
}) => {
  const [syncingAll, setSyncingAll] = useState<boolean>(false);
  const [pendingChangesCount, setPendingChangesCount] = useState<number>(0);
  const [cloudBackupStatus, setCloudBackupStatus] = useState<string | null>(null);

  const handleSyncAll = () => {
    sound.playHologramTap();
    setSyncingAll(true);
    setTimeout(() => {
      const updated = devices.map(d => ({
        ...d,
        status: (isOffline ? 'pending_sync' : 'synced') as any,
        lastSync: 'Just now',
        latencyMs: isOffline ? 0 : Math.floor(2 + Math.random() * 4),
      }));
      onUpdateDevices(updated);
      setSyncingAll(false);
      setPendingChangesCount(0);
      sound.playLockSuccess();
    }, 900);
  };

  const handleCreateBackup = () => {
    sound.playChirp(880, 0.05);
    setCloudBackupStatus('Encrypting local snapshot & uploading to Zero-Trust Cloud Relay...');
    setTimeout(() => {
      setCloudBackupStatus('Encrypted Cloud Backup Committed. Multi-Region Replicated.');
      sound.playLockSuccess();
      setTimeout(() => setCloudBackupStatus(null), 4000);
    }, 1200);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'android':
      case 'ios':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'ar_visor':
        return <Glasses className="w-5 h-5 text-purple-400" />;
      case 'automobile':
        return <Car className="w-5 h-5 text-amber-400" />;
      case 'desktop':
        return <Laptop className="w-5 h-5 text-emerald-400" />;
      default:
        return <Laptop className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sync Status Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {isOffline ? (
                <WifiOff className="w-5 h-5 text-amber-400" />
              ) : (
                <Wifi className="w-5 h-5 text-cyan-400" />
              )}
              <h2 className="text-lg font-bold text-white tracking-wide">
                Cross-Platform Device Fleet & Real-Time Sync Hub
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Seamless synchronization between mobile devices, AR glasses, automobiles, and workstations with local offline caching.
            </p>
          </div>

          {/* Sync & Offline Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleOffline}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                isOffline
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isOffline ? <CloudOff className="w-4 h-4 text-amber-400" /> : <Cloud className="w-4 h-4 text-cyan-400" />}
              <span>{isOffline ? 'Offline Mode Active' : 'Switch to Offline'}</span>
            </button>

            <button
              onClick={handleSyncAll}
              disabled={syncingAll}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncingAll ? 'animate-spin' : ''}`} />
              <span>{syncingAll ? 'Syncing Fleet...' : 'Sync All Nodes'}</span>
            </button>
          </div>
        </div>

        {/* Offline Queue Notice */}
        {isOffline && (
          <div className="mt-4 p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-center justify-between">
            <span>
              Network disconnected. Local caching engine active: all records, approvals, and habits persist in encrypted storage and will reconcile automatically when restored.
            </span>
            <span className="font-mono font-bold bg-amber-900/60 px-2 py-0.5 rounded text-[11px]">
              QUEUE: {pendingChangesCount} PENDING
            </span>
          </div>
        )}

        {cloudBackupStatus && (
          <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{cloudBackupStatus}</span>
          </div>
        )}
      </div>

      {/* Grid: Connected Devices + Local Caching & Backup Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Connected Devices Fleet */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-cyan-400" />
              Connected Device Fleet ({devices.length})
            </h3>
            <span className="text-xs font-mono text-emerald-400">SUB-5MS LATENCY MESH</span>
          </div>

          <div className="space-y-3">
            {devices.map(device => (
              <div
                key={device.id}
                className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    {getDeviceIcon(device.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{device.name}</h4>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/60 px-1.5 py-0.5 rounded">
                        {device.type}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1">
                      Key Fingerprint: {device.encryptionKeyFingerprint}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">LATENCY</span>
                    <span className="text-emerald-400 font-bold">
                      {isOffline ? '0 ms (Local)' : `${device.latencyMs} ms`}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">BATTERY</span>
                    <span className="text-slate-200">{device.batteryLevel}%</span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">STATUS</span>
                    <span
                      className={`font-bold ${
                        isOffline
                          ? 'text-amber-400'
                          : device.status === 'synced'
                          ? 'text-emerald-400'
                          : 'text-cyan-400'
                      }`}
                    >
                      {isOffline ? 'CACHED' : 'LIVE SYNC'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Local Caching & Cloud Backup Engine */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              Local Caching & Cloud Snapshot
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Encrypted browser storage with automated zero-knowledge cloud snapshot replication.
            </p>

            <div className="mt-4 space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 text-[11px] block">STORAGE DRIVER:</span>
                <span className="text-slate-200">IndexedDB / Persistent LocalStorage</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 text-[11px] block">OFFLINE READINESS:</span>
                <span className="text-emerald-400">100% Autonomous Functionality</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 text-[11px] block">LAST CLOUD COMMITTED:</span>
                <span className="text-slate-300">Today, 23:20 UTC (Zero-Knowledge)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateBackup}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
          >
            <DownloadCloud className="w-4 h-4 text-cyan-400" />
            <span>Generate Encrypted Cloud Snapshot</span>
          </button>
        </div>
      </div>
    </div>
  );
};
