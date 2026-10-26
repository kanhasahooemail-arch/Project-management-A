import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { 
  CreditCard, 
  Check, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Building2, 
  Key, 
  Download,
  CheckCircle2,
  HeartHandshake,
  Users,
  GraduationCap,
  Coffee,
  Award,
  Infinity,
  Gift,
  Share2
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
}

type TierKey = 'lifetime_free' | 'free_citizen' | 'subsidized_waiver' | 'community_supporter';

export const SubscriptionModel: React.FC<Props> = ({ isHighContrast }) => {
  const [activeTier, setActiveTier] = useState<TierKey>('lifetime_free');
  const [activatedNotice, setActivatedNotice] = useState<string | null>(
    'LIFETIME 100% FREE ACCESS IS CURRENTLY ACTIVE FOR YOU. Zero fees forever.'
  );
  const [lifetimePassToken, setLifetimePassToken] = useState<string>(
    'AURA-LIFETIME-PASS-2026-INFINITY-SOVEREIGN-KEY'
  );
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const handleClaimLifetimeFree = () => {
    sound.playLockSuccess();
    setActiveTier('lifetime_free');
    const token = `AURA-LIFETIME-PASS-${Math.random().toString(36).substring(2, 9).toUpperCase()}-INFINITY`;
    setLifetimePassToken(token);
    setActivatedNotice('LIFETIME 100% FREE ACCESS PASS CONFIRMED! Valid forever with zero expiry and zero renewal fees.');
    setShowCertificateModal(true);
  };

  const handleExportLifetimeCertificate = () => {
    sound.playChirp(1040, 0.05);
    const cert = {
      passName: 'AURA NEXUS SOVEREIGN CITIZEN LIFETIME FREE ACCESS CERTIFICATE',
      beneficiary: 'Universal Citizen (All Village & Urban Citizens)',
      price: '$0.00 / INR ₹0.00 (100% FREE FOR LIFE)',
      validity: 'PERMANENT LIFETIME VALIDITY (NO EXPIRY / NO RENEWAL REQUIRED)',
      cryptographicToken: lifetimePassToken,
      guaranteedEntitlements: [
        '100% Lifetime Free 128 GB High-Speed Encrypted Solid-State Storage Vault (OPFS/NVMe)',
        '100% Lifetime Free Women & Girls Emergency Safety (CCTV, Police 112, Cyber Cell 1930)',
        '100% Lifetime Free Road Accident Ambulance & Hospital Rescue with Zero VIP Bias',
        '100% Lifetime Free Village & Urban Relief (Primary Healthcare, Free Ration, PMAY Housing)',
        '100% Lifetime Free Earth & Disaster Radar (15-30 Day Advanced Floods, Quakes, Tsunamis)',
        '100% Lifetime Free 3D Holographic AR Spatial Engine & Offline Caching',
        '100% Lifetime Free AES-256 Zero-Trust Client Encryption & Biometric Enclave',
        '100% Lifetime Free Omni-Generational AI Advanced Assistant (Gemini 3.8 Flash)',
      ],
      sovereignCharter: 'GOVERNMENT OF INDIA & GLOBAL UNIVERSAL CITIZEN PROTECTION ACCORD',
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AURA-LIFETIME-FREE-PASS-${lifetimePassToken}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Crown Jewel Banner: Lifetime Free Universal Access */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast
          ? 'bg-black border-emerald-400 text-white'
          : 'bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-900 border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.2)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <Infinity className="w-4 h-4 text-emerald-400" />
                <span>100% LIFETIME FREE ACCESS GUARANTEED</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>$0 FOREVER · NO EXPIRY · NO CREDIT CARD</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>UNIVERSAL PUBLIC GOOD CHARTER</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              Lifetime Free Access Pass for Every Human Being
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl font-sans leading-relaxed">
              Every citizen in every village, town, and city has <strong>100% lifetime free access</strong> to all advanced features of AURA NEXUS. 
              There are no hidden charges, no trial periods, and no subscription renewals. 
              Universal health safety, disaster radars, girls' emergency protection, food/housing aid, and spatial AI are guaranteed human rights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleClaimLifetimeFree}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all"
            >
              <Award className="w-5 h-5 text-slate-950" />
              <span>CLAIM LIFETIME FREE CERTIFICATE</span>
            </button>
          </div>
        </div>

        {/* Active Token Bar */}
        <div className="mt-5 p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ACTIVE STATUS: LIFETIME UNLIMITED SOVEREIGN ACCESS (ALL MODULES UNLOCKED)</span>
          </div>
          <div className="bg-slate-900 px-3 py-1 rounded text-cyan-300 border border-cyan-500/30 text-[11px]">
            PASSPORT KEY: {lifetimePassToken}
          </div>
        </div>
      </div>

      {/* Grid of Plans: Featuring Lifetime Free as the Sovereign Standard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Tier 1: Lifetime Free Universal Sovereign Plan */}
        <div
          className={`rounded-3xl p-6 border flex flex-col justify-between transition-all relative overflow-hidden ${
            activeTier === 'lifetime_free'
              ? 'bg-slate-900/90 border-emerald-500/80 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-mono font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            PRIMARY STANDARD
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <Infinity className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Universal Free For Life</span>
              </div>
              <h3 className="text-xl font-bold font-mono text-white mt-1">
                Lifetime Sovereign Pass
              </h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-mono font-black text-emerald-400">$0</span>
                <span className="text-sm font-mono text-slate-400">/ forever lifetime free</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                Permanent full access for every citizen worldwide. No payment method, no renewal, and no expiration date.
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-200 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Full Lifetime Offline Local Caching</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Women Safety SOS & 24/7 CCTV Mesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Road Accident Hospital Ambulance Rescue</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Village & Urban Health, Food & Home Relief</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>15–30 Day Earth Meteorological Disaster Radar</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Omni-Generational Gemini 3.8 AI Assistant</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>AES-256 Client-Side Zero-Trust Enclave</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleClaimLifetimeFree}
            className="mt-6 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            ✓ Lifetime Free Active ($0)
          </button>
        </div>

        {/* Tier 2: Subsidized Student, Senior & Village Farmer Waiver */}
        <div
          className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
            activeTier === 'subsidized_waiver'
              ? 'bg-slate-900/90 border-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
              : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40'
          }`}
        >
          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>State & Public Subsidy</span>
              </div>
              <h3 className="text-xl font-bold font-mono text-white mt-1">
                Student & Farmer Waiver
              </h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-mono font-black text-cyan-300">$0</span>
                <span className="text-sm font-mono text-slate-400">/ 100% subsidized</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                State-sponsored education, agricultural grain subsidy, and elder welfare waiver for rural farmers and school youth.
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-200 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>All Lifetime Sovereign Free benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Priority Spatial AI educational tutor</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Farmer crop weather & market mandi prices</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Accredited certificate notarization</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleClaimLifetimeFree()}
            className="mt-6 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 transition-all"
          >
            Claim Subsidized Pass ($0)
          </button>
        </div>

        {/* Tier 3: Voluntary Community Solidarity Supporter */}
        <div
          className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
            activeTier === 'community_supporter'
              ? 'bg-slate-900/90 border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
              : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40'
          }`}
        >
          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-mono text-purple-400 uppercase font-bold flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Voluntary Solidarity</span>
              </div>
              <h3 className="text-xl font-bold font-mono text-white mt-1">
                Community Supporter
              </h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-mono font-black text-purple-300">Optional</span>
                <span className="text-sm font-mono text-slate-400">/ pay-if-you-wish</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                For affluent citizens or enterprises who voluntarily wish to fund public servers, clean water pumps, and village clinics.
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-200 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Funds 10 village children's education</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sponsors 100 free meals at Annapurna kitchens</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Public Civic Philanthropy badge on profile</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleClaimLifetimeFree()}
            className="mt-6 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)]"
          >
            Support Public Mesh (Optional)
          </button>
        </div>
      </div>

      {/* Lifetime Free Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border-2 border-emerald-500 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold font-mono text-white">
                  Sovereign Citizen Lifetime Free Pass
                </h3>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-slate-400">PLAN:</span>
                <span className="text-emerald-300 font-bold">100% LIFETIME FREE ACCESS PASS</span>
              </div>
              <div className="flex justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-slate-400">BENEFICIARY:</span>
                <span className="text-white font-bold">Universal Citizen (All Rural & Urban Regions)</span>
              </div>
              <div className="flex justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-slate-400">FEES CHARGED:</span>
                <span className="text-emerald-400 font-black text-sm">$0.00 / ₹0.00 FOREVER</span>
              </div>
              <div className="flex justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-slate-400">VALIDITY PERIOD:</span>
                <span className="text-cyan-300 font-bold">PERMANENT (NO EXPIRY / NO RENEWAL)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] mb-1">CRYPTOGRAPHIC PASSPORT HASH:</span>
                <span className="text-emerald-400 bg-black/60 p-2 rounded block break-all text-[11px] border border-emerald-900">
                  {lifetimePassToken}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 font-sans flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Guaranteed under the Universal Public Good Charter. You will never be asked to pay or provide payment information.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Dismiss
              </button>
              <button
                onClick={handleExportLifetimeCertificate}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Pass Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
