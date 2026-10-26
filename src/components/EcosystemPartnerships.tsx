import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { 
  Car, 
  BatteryCharging, 
  Gauge, 
  MapPin, 
  Radio, 
  Briefcase, 
  ShoppingCart, 
  ArrowRightLeft, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  Building2,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
}

interface TradeOrder {
  id: string;
  item: string;
  buyer: string;
  seller: string;
  amount: string;
  status: 'escrow_locked' | 'settled' | 'delivering';
  v2xRoute: string;
}

export const EcosystemPartnerships: React.FC<Props> = ({ isHighContrast }) => {
  const [activeTab, setActiveTab] = useState<'automobile' | 'commerce'>('automobile');
  const [orders, setOrders] = useState<TradeOrder[]>([
    {
      id: 'TRD-7701',
      item: '120 kWh Solid-State Cyber Battery Packs (10 Units)',
      buyer: 'Apex EV Fleet Corporation',
      seller: 'Quantum Cell Manufacturing Ltd',
      amount: '$148,000 USD (USDC Escrow)',
      status: 'escrow_locked',
      v2xRoute: 'Corridor 80 Autonomous Freight Transit',
    },
    {
      id: 'TRD-7702',
      item: 'LiDAR Optical Sensors 64-Beam (Semi-Gov Municipal Order)',
      buyer: 'Metropolitan Smart Transit Dept',
      seller: 'Photonix Navigation Systems',
      amount: '$89,500 USD',
      status: 'settled',
      v2xRoute: 'Metro City Drone Delivery Hub 4',
    },
    {
      id: 'TRD-7703',
      item: 'Microgrid Renewable Energy Credits (500 MWh)',
      buyer: 'Urban Civic Infrastructure',
      seller: 'Helios Eco-Consortium',
      amount: '$42,200 USD',
      status: 'settled',
      v2xRoute: 'Direct Grid Smart Interconnect #9',
    },
  ]);

  const [settlementNotice, setSettlementNotice] = useState<string | null>(null);

  const handleSettleOrder = (id: string) => {
    sound.playLockSuccess();
    setOrders(prev =>
      prev.map(ord => (ord.id === id ? { ...ord, status: 'settled' } : ord))
    );
    setSettlementNotice(`Smart Contract escrow for order ${id} settled with zero-knowledge cryptographic signature.`);
    setTimeout(() => setSettlementNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Ecosystem Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                Automobile V2X Telemetry & Enterprise Commercial Ecosystem
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Direct partnership network bridging connected vehicles, automated fleet logistics, buying/selling companies, and smart contract escrow.
            </p>
          </div>

          {/* Toggle between Automobile V2X and Commerce Escrow */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                setActiveTab('automobile');
                sound.playHologramTap();
              }}
              className={`px-3.5 py-1.5 rounded-lg font-mono font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'automobile'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Connected Automobiles & V2X</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('commerce');
                sound.playHologramTap();
              }}
              className={`px-3.5 py-1.5 rounded-lg font-mono font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'commerce'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Buying / Selling Marketplace</span>
            </button>
          </div>
        </div>

        {settlementNotice && (
          <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{settlementNotice}</span>
          </div>
        )}
      </div>

      {activeTab === 'automobile' ? (
        /* Automobile Telemetry & V2X Mesh Section */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Battery & Powertrain Envelope */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
                EV SOLID-STATE BATTERY
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">HEALTH: 99.4%</span>
            </div>

            <div className="text-center py-4">
              <div className="text-4xl font-mono font-bold text-white">92%</div>
              <div className="text-xs text-slate-400 mt-1">Estimated Range: 640 km</div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">Thermal Envelope:</span>
                <span className="text-slate-200">26.8°C (Optimal)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">Regen Efficiency:</span>
                <span className="text-emerald-400">38.4 kWh Recovered</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">Fast Charge V2G:</span>
                <span className="text-cyan-400">Bi-directional Ready</span>
              </div>
            </div>
          </div>

          {/* Card 2: V2X Low-Latency Mesh Telemetry */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-cyan-400" />
                V2X ROADSIDE OPTICAL MESH
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">SUB-2MS LATENCY</span>
            </div>

            <div className="text-center py-4">
              <div className="text-4xl font-mono font-bold text-cyan-300">128 km/h</div>
              <div className="text-xs text-slate-400 mt-1">Autonomous Cruising Vector</div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">Nearby Connected EVs:</span>
                <span className="text-slate-200">14 Vehicles Linked</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">LiDAR Raycast Density:</span>
                <span className="text-emerald-400">1.2M points/sec</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">Collision Probability:</span>
                <span className="text-emerald-400">0.00001% (Zero Defect)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Government Transportation Clearance */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                SOVEREIGN HIGHWAY PERMIT
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">CLEARED</span>
            </div>

            <div className="text-center py-4">
              <div className="text-2xl font-mono font-bold text-emerald-400">PERMIT AUTO-90184</div>
              <div className="text-xs text-slate-400 mt-1">Autonomous National Corridor Authorized</div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">Toll Micro-Settlement:</span>
                <span className="text-slate-200">Auto-Deducted ($0.12/km)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">Emission Standard:</span>
                <span className="text-emerald-400">Zero Emission Certified</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-500">Safety Multi-Sig:</span>
                <span className="text-cyan-400">Verified by Sovereign Node</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Buying / Selling & Enterprise Escrow Marketplace Section */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              Verified Commercial Escrow Orders & B2B/P2P Settlements
            </h3>
            <span className="text-xs font-mono text-slate-400">ANTI-THEFT SECURE CONTRACT</span>
          </div>

          <div className="space-y-3">
            {orders.map(order => (
              <div
                key={order.id}
                className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded">
                      {order.id}
                    </span>
                    <h4 className="text-sm font-semibold text-white">{order.item}</h4>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-2">
                    <span>Buyer: <strong className="text-slate-300">{order.buyer}</strong></span>
                    <span>·</span>
                    <span>Seller: <strong className="text-slate-300">{order.seller}</strong></span>
                    <span>·</span>
                    <span>Route: <strong className="text-slate-300">{order.v2xRoute}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">AMOUNT</span>
                    <span className="text-white font-bold">{order.amount}</span>
                  </div>

                  <div>
                    {order.status === 'settled' ? (
                      <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> SETTLED
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSettleOrder(order.id)}
                        className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all"
                      >
                        Release Escrow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
