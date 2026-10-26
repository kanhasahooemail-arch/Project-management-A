import React, { useState, useEffect } from 'react';
import { PerformanceTier, PerformanceMetrics } from '../types';
import { sound } from '../utils/audio';
import { 
  Battery, 
  BatteryCharging, 
  Cpu, 
  Zap, 
  Thermometer, 
  Gauge, 
  Radio, 
  ShieldCheck,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

interface Props {
  performanceTier: PerformanceTier;
  onPerformanceTierChange: (tier: PerformanceTier) => void;
  isHighContrast: boolean;
}

export const PerformanceBatteryMonitor: React.FC<Props> = ({
  performanceTier,
  onPerformanceTierChange,
  isHighContrast,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: performanceTier === 'eco' ? 30 : performanceTier === 'balanced' ? 60 : 118,
    batteryPercent: 88,
    isCharging: false,
    powerConsumptionWatts: performanceTier === 'eco' ? 2.4 : performanceTier === 'balanced' ? 5.1 : 12.8,
    latencyMs: 3.4,
    jitterMs: 0.6,
    gpuLoadPercent: performanceTier === 'eco' ? 22 : performanceTier === 'balanced' ? 48 : 86,
    memoryUsageMb: performanceTier === 'eco' ? 142 : performanceTier === 'balanced' ? 284 : 512,
  });

  // Query real Battery API if supported
  useEffect(() => {
    let batteryObj: any = null;
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        batteryObj = battery;
        const updateBatteryInfo = () => {
          setMetrics(prev => ({
            ...prev,
            batteryPercent: Math.round(battery.level * 100),
            isCharging: battery.charging,
          }));
        };
        updateBatteryInfo();
        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);
      }).catch(() => {
        // Battery API permission restricted
      });
    }

    // Dynamic metrics fluctuation simulation based on chosen performance tier
    const interval = setInterval(() => {
      setMetrics(prev => {
        const targetFps = performanceTier === 'eco' ? 30 : performanceTier === 'balanced' ? 60 : 120;
        const jitter = (Math.random() - 0.5) * 2;
        return {
          ...prev,
          fps: Math.max(28, Math.round(targetFps + jitter)),
          latencyMs: +(3.2 + Math.random() * 0.8).toFixed(1),
          jitterMs: +(0.4 + Math.random() * 0.4).toFixed(1),
          powerConsumptionWatts:
            performanceTier === 'eco'
              ? +(2.2 + Math.random() * 0.3).toFixed(1)
              : performanceTier === 'balanced'
              ? +(4.8 + Math.random() * 0.6).toFixed(1)
              : +(12.2 + Math.random() * 1.2).toFixed(1),
          gpuLoadPercent:
            performanceTier === 'eco'
              ? Math.round(20 + Math.random() * 5)
              : performanceTier === 'balanced'
              ? Math.round(45 + Math.random() * 7)
              : Math.round(82 + Math.random() * 8),
        };
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [performanceTier]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                Hardware & Battery Optimization Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Adaptive rendering engine optimizes power draw for entry-level mobile devices while unlocking ultra-fidelity for dedicated spatial headsets and workstations.
            </p>
          </div>

          {/* Tier Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => {
                onPerformanceTierChange('eco');
                sound.playHologramTap();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                performanceTier === 'eco'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ECO (30 FPS)
            </button>
            <button
              onClick={() => {
                onPerformanceTierChange('balanced');
                sound.playHologramTap();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                performanceTier === 'balanced'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BALANCED (60 FPS)
            </button>
            <button
              onClick={() => {
                onPerformanceTierChange('ultra');
                sound.playHologramTap();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                performanceTier === 'ultra'
                  ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ULTRA (120 FPS)
            </button>
          </div>
        </div>

        {/* Tier Details Pill */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-300">
            Active Mode:{' '}
            <strong className="text-cyan-400 uppercase">
              {performanceTier === 'eco'
                ? 'Adaptive Battery Saver (Entry-Level Device Calibrated)'
                : performanceTier === 'balanced'
                ? 'Standard High Fidelity Mobile'
                : 'Unrestricted Holographic Spatial Master'}
            </strong>
          </div>
          <div className="text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Thermal envelope safe (&lt; 34°C)</span>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Battery Draw & Percentage */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              {metrics.isCharging ? (
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
              ) : (
                <Battery className="w-4 h-4 text-emerald-400" />
              )}
              BATTERY LEVEL
            </span>
            <span className="text-emerald-400 font-bold">{metrics.batteryPercent}%</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">{metrics.powerConsumptionWatts} W</div>
          <div className="text-[11px] font-mono text-slate-400">
            Estimated Draw ({performanceTier === 'eco' ? '-65% power conservation' : 'Normal draw'})
          </div>
        </div>

        {/* Metric 2: FPS Frame Pacing */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-cyan-400" />
              FRAME RATE
            </span>
            <span className="text-cyan-400 font-bold">LOD ACTIVE</span>
          </div>
          <div className="text-2xl font-mono font-bold text-cyan-300">{metrics.fps} FPS</div>
          <div className="text-[11px] font-mono text-slate-400">
            Target Cap: {performanceTier === 'eco' ? '30 FPS' : performanceTier === 'balanced' ? '60 FPS' : '120 FPS'}
          </div>
        </div>

        {/* Metric 3: Low-Latency Network Ping */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-purple-400" />
              EDGE NETWORK LATENCY
            </span>
            <span className="text-purple-400 font-bold">5G / OPTICAL</span>
          </div>
          <div className="text-2xl font-mono font-bold text-purple-300">{metrics.latencyMs} ms</div>
          <div className="text-[11px] font-mono text-slate-400">Jitter: ±{metrics.jitterMs} ms (Sub-second sync)</div>
        </div>

        {/* Metric 4: GPU Load */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-400" />
              GPU UTILIZATION
            </span>
            <span className="text-amber-400 font-bold">{metrics.gpuLoadPercent}%</span>
          </div>
          <div className="text-2xl font-mono font-bold text-amber-300">{metrics.memoryUsageMb} MB</div>
          <div className="text-[11px] font-mono text-slate-400">VRAM footprint within mobile budget</div>
        </div>
      </div>
    </div>
  );
};
