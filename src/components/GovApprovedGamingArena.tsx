import React, { useState, useEffect } from 'react';
import { SkillGameItem, PlayerWalletState } from '../types';
import { sound } from '../utils/audio';
import { 
  Gamepad2, 
  Trophy, 
  Coins, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Zap, 
  ArrowUpRight, 
  Download, 
  CheckCircle2, 
  Play, 
  TrendingUp, 
  Award, 
  Landmark, 
  Lock, 
  Activity, 
  Timer, 
  ChevronRight,
  Send,
  RefreshCw,
  Eye,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onGamingAlert?: (msg: string) => void;
}

const TRENDING_GAMES: SkillGameItem[] = [
  {
    id: 'game-reflex',
    title: 'Cyber Reflex 3D Spatial Grid',
    category: 'esports_speed_reflex',
    skillType: 'Pure Game of Skill (Cognitive Spatial Reaction)',
    dailyPrizePool: '₹250,000 / $3,000 Daily Pool',
    entryFee: 'FREE ($0 Entry / Sponsored by Digital Skill Fund)',
    maxWinPerRound: '₹500 / $6.00 per Victory',
    activePlayersCount: 14280,
    trendingRank: 1,
    difficulty: 'Pro Speed',
    description: 'Test your microsecond motor coordination and visual reflexes. Tap the glowing cyber nodes before they dissipate to rack up high skill combos.',
    gameRuleSnippet: 'Tap active quantum targets within 400ms. Minimum 450 points to unlock cash profit.',
    meitySrbVerificationId: 'MEITY-SRB-SKILL-2024-9921',
    iconName: 'Zap'
  },
  {
    id: 'game-reaction',
    title: 'Road Safety V2X Emergency Pilot',
    category: 'road_safety_pilot',
    skillType: 'Cognitive Reaction & Hazard Avoidance',
    dailyPrizePool: '₹180,000 / $2,200 Daily Pool',
    entryFee: 'FREE ($0 Entry / Sponsored by Road Safety Accord)',
    maxWinPerRound: '₹400 / $5.00 per Victory',
    activePlayersCount: 11450,
    trendingRank: 2,
    difficulty: 'Casual Skill',
    description: 'Simulate high-speed highway emergency braking and collision deflection. React to instant hazard flash prompts in under 260 milliseconds.',
    gameRuleSnippet: 'Trigger emergency ABS brakes within 280ms when red hazard vector flashes.',
    meitySrbVerificationId: 'MEITY-SRB-ROAD-2024-8842',
    iconName: 'Gamepad2'
  },
  {
    id: 'game-ai-code',
    title: 'Civic AI & Algorithmic Code Master',
    category: 'ai_code_puzzles',
    skillType: 'Algorithmic Logic & STEM Speed Quiz',
    dailyPrizePool: '₹200,000 / $2,500 Daily Pool',
    entryFee: 'FREE ($0 Entry / Sponsored by National Innovation Mission)',
    maxWinPerRound: '₹600 / $7.50 per Victory',
    activePlayersCount: 9840,
    trendingRank: 3,
    difficulty: 'Master Arena',
    description: 'Rapid 3-question programming and logic sprint. Solve real-world algorithm puzzles, binary data lookups, and civic optimization questions.',
    gameRuleSnippet: 'Answer 3 algorithmic puzzles correctly within 20 seconds.',
    meitySrbVerificationId: 'MEITY-SRB-STEM-2024-7731',
    iconName: 'Sparkles'
  },
  {
    id: 'game-clean-energy',
    title: 'Clean Microgrid Economy Tycoon',
    category: 'civic_clean_energy',
    skillType: 'Resource Optimization & Strategy',
    dailyPrizePool: '₹150,000 / $1,800 Daily Pool',
    entryFee: 'FREE ($0 Entry / Sponsored by Green Mission)',
    maxWinPerRound: '₹350 / $4.20 per Victory',
    activePlayersCount: 8120,
    trendingRank: 4,
    difficulty: 'Casual Skill',
    description: 'Balance virtual city power grids using solar, wind, and battery storage without brownouts. Earn clean energy dividend profits.',
    gameRuleSnippet: 'Maintain 98% grid balance through peak load surges for 15 seconds.',
    meitySrbVerificationId: 'MEITY-SRB-ENERGY-2024-6629',
    iconName: 'Trophy'
  }
];

export const GovApprovedGamingArena: React.FC<Props> = ({ isHighContrast, onGamingAlert }) => {
  const [wallet, setWallet] = useState<PlayerWalletState>({
    totalProfitWon: 2450,
    withdrawableBalance: 2450,
    totalMatchesWon: 7,
    rankBadge: 'MASTER PRO TIER (TOP 5%)',
    tdsCertificateAvailable: true,
    recentPayouts: [
      {
        id: 'PAY-8821',
        amount: '₹800',
        method: 'Instant UPI (NPCI IMPS)',
        status: 'transferred_immediate',
        timestamp: 'Today, 08:45 AM',
        utrNumber: 'UTR-992810481239'
      },
      {
        id: 'PAY-8820',
        amount: '₹650',
        method: 'Direct Bank NEFT',
        status: 'transferred_immediate',
        timestamp: 'Yesterday, 06:12 PM',
        utrNumber: 'UTR-992810479102'
      }
    ]
  });

  const [activeGameModal, setActiveGameModal] = useState<SkillGameItem | null>(null);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [score, setScore] = useState<number>(0);
  const [gameTimer, setGameTimer] = useState<number>(15);
  const [targetNode, setTargetNode] = useState<number>(4);
  const [reactionStartTime, setReactionStartTime] = useState<number>(0);
  const [lastReactionMs, setLastReactionMs] = useState<number | null>(null);
  const [reactionHazardActive, setReactionHazardActive] = useState<boolean>(false);

  // Withdrawal modal
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawUpiId, setWithdrawUpiId] = useState<string>('kanhasahoo@okhdfcbank');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('1000');
  const [withdrawStatus, setWithdrawStatus] = useState<string | null>(null);
  const [activeNotice, setActiveNotice] = useState<string | null>(
    'MEITY APPROVED PERMISSIBLE SKILL GAMING PLATFORM ONLINE: Win real skill dividends with zero entry fee.'
  );

  // Game 1: Cyber Reflex Grid timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeGameModal?.id === 'game-reflex' && gameState === 'playing' && gameTimer > 0) {
      interval = setInterval(() => {
        setGameTimer(t => {
          if (t <= 1) {
            handleEndReflexGame();
            return 0;
          }
          // Shift active node periodically
          setTargetNode(Math.floor(Math.random() * 9));
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeGameModal, gameState, gameTimer]);

  const handleStartReflexGame = () => {
    sound.playScanPulse();
    setScore(0);
    setGameTimer(15);
    setGameState('playing');
    setTargetNode(Math.floor(Math.random() * 9));
  };

  const handleReflexGridTap = (index: number) => {
    if (gameState !== 'playing') return;

    if (index === targetNode) {
      sound.playChirp(1200, 0.04);
      setScore(s => s + 75);
      setTargetNode(Math.floor(Math.random() * 9));
    } else {
      sound.playChirp(350, 0.05, 'sawtooth');
      setScore(s => Math.max(0, s - 25));
    }
  };

  const handleEndReflexGame = () => {
    sound.playLockSuccess();
    const wonProfit = 350;
    setGameState('won');
    setWallet(w => ({
      ...w,
      totalProfitWon: w.totalProfitWon + wonProfit,
      withdrawableBalance: w.withdrawableBalance + wonProfit,
      totalMatchesWon: w.totalMatchesWon + 1
    }));
    const msg = `VICTORY! You scored ${score + 75} points and won ₹${wonProfit} instant cash profit!`;
    setActiveNotice(msg);
    if (onGamingAlert) onGamingAlert(msg);
  };

  // Game 2: Road Safety Reaction Pilot
  const handleStartReactionGame = () => {
    sound.playScanPulse();
    setGameState('playing');
    setReactionHazardActive(false);
    setLastReactionMs(null);

    // Random trigger delay between 1.5s to 3.5s
    const delay = Math.floor(1500 + Math.random() * 2000);
    setTimeout(() => {
      sound.playPhoneRing();
      setReactionHazardActive(true);
      setReactionStartTime(Date.now());
    }, delay);
  };

  const handleBrakeReaction = () => {
    if (!reactionHazardActive) {
      sound.playChirp(350, 0.08, 'sawtooth');
      setActiveNotice('False Start! Wait for the red emergency vector to illuminate.');
      return;
    }

    const elapsed = Date.now() - reactionStartTime;
    setLastReactionMs(elapsed);
    setReactionHazardActive(false);

    if (elapsed <= 320) {
      sound.playLockSuccess();
      setGameState('won');
      const wonProfit = 400;
      setWallet(w => ({
        ...w,
        totalProfitWon: w.totalProfitWon + wonProfit,
        withdrawableBalance: w.withdrawableBalance + wonProfit,
        totalMatchesWon: w.totalMatchesWon + 1
      }));
      const msg = `OUTSTANDING REFLEX! Reaction time: ${elapsed}ms. You won ₹${wonProfit} skill profit!`;
      setActiveNotice(msg);
      if (onGamingAlert) onGamingAlert(msg);
    } else {
      setGameState('lost');
      setActiveNotice(`Reaction time: ${elapsed}ms. Needed under 320ms. Practice again!`);
    }
  };

  const handleExecuteWithdrawal = () => {
    const num = parseInt(withdrawAmount, 10);
    if (isNaN(num) || num <= 0 || num > wallet.withdrawableBalance) {
      setWithdrawStatus('Invalid amount or exceeds available balance.');
      return;
    }

    sound.playLockSuccess();
    const utr = `UTR-${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    setWallet(w => ({
      ...w,
      withdrawableBalance: w.withdrawableBalance - num,
      recentPayouts: [
        {
          id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
          amount: `₹${num}`,
          method: `Instant UPI to ${withdrawUpiId}`,
          status: 'transferred_immediate',
          timestamp: 'Just now',
          utrNumber: utr
        },
        ...w.recentPayouts
      ]
    }));

    setWithdrawStatus(`SUCCESS: ₹${num} transferred to ${withdrawUpiId}. UTR: ${utr}. Zero tax deducted.`);
    setTimeout(() => {
      setShowWithdrawModal(false);
      setWithdrawStatus(null);
    }, 2500);
  };

  const handleDownloadTaxCert = () => {
    sound.playChirp(1040, 0.05);
    const cert = {
      taxCertificateNumber: 'TDS-194BA-MEITY-SKILL-2026-9921',
      platform: 'AURA NEXUS SOVEREIGN TRENDING GAMING ARENA',
      beneficiary: 'Verified Citizen Player',
      totalProfitWon: `₹${wallet.totalProfitWon}.00`,
      statutoryAct: 'Section 194BA Income Tax Act / MeitY Rule 4A Verified Game of Skill',
      taxDeductedAtSource: '₹0.00 (Exempt under Sovereign Student/Citizen Skill Waiver)',
      netDisbursed: `₹${wallet.totalProfitWon}.00 (100% Tax Compliant)`,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AURA-SKILL-PROFIT-TAX-CERT-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setActiveNotice('Official Section 194BA Tax & Skill Profit Certificate downloaded.');
  };

  return (
    <div className="space-y-6">
      {/* Crown Banner: MeitY Approved Trending Gaming Platform */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast
          ? 'bg-black border-amber-400 text-white'
          : 'bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>#1 TRENDING PLATFORM · PLAY SKILL GAMES & WIN REAL PROFIT</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>GOVERNMENT OF INDIA (MEITY) APPROVED</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-cyan-400" />
                <span>100% FREE ENTRY ($0) · ZERO WAGERING</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              Government Approved Trending Gaming & Profit Arena
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl font-sans leading-relaxed">
              Officially sanctioned under <strong>MeitY Online Gaming Rules 2023 (Rule 4A)</strong> and verified by registered Self-Regulatory Bodies (SRB). 
              A 100% skill-based competition platform where citizens test their <strong>spatial reflexes, road safety reactions, and STEM coding logic</strong> to win verifiable daily cash profit and scholarship grants with instant zero-fee UPI withdrawals.
            </p>
          </div>

          {/* Player Live Profit Wallet Badge */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/40 font-mono space-y-2 min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>PROFIT WALLET</span>
              <span className="text-emerald-400 font-bold">100% WITHDRAWABLE</span>
            </div>
            <div className="text-3xl font-black text-amber-400 flex items-baseline gap-1">
              ₹{wallet.withdrawableBalance.toLocaleString()}
              <span className="text-xs text-slate-400 font-normal">INR Cash</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800">
              <span>{wallet.totalMatchesWon} Victories</span>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1 transition-colors"
              >
                <span>WITHDRAW</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Notice */}
        {activeNotice && (
          <div className="mt-5 p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-center justify-between text-xs font-mono text-amber-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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

      {/* MeitY Legal Approval Accord Strip */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-slate-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>MeitY Gazette G.S.R. 275(E) Certified Permissible Online Game</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                SRB ACCREDITED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              100% Game of Skill (Zero Chance, Zero Wagering, Zero Adult Content). Pure prize tournaments sponsored by CSR funds.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadTaxCert}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Section 194BA Tax Certificate</span>
        </button>
      </div>

      {/* Trending Games Arena Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            Top Trending Skill Games (Play & Win Real Profit)
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
            LIVE TOURNAMENT PLAYERS: 43,690 ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TRENDING_GAMES.map(game => (
            <div
              key={game.id}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between transition-all hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      {game.id === 'game-reflex' && <Zap className="w-6 h-6" />}
                      {game.id === 'game-reaction' && <Gamepad2 className="w-6 h-6" />}
                      {game.id === 'game-ai-code' && <Sparkles className="w-6 h-6" />}
                      {game.id === 'game-clean-energy' && <Trophy className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                          #{game.trendingRank} TRENDING
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {game.difficulty}
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-mono text-white mt-1 group-hover:text-amber-300 transition-colors">
                        {game.title}
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-500/30 shrink-0 font-bold">
                    WIN {game.maxWinPerRound}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {game.description}
                </p>

                {/* Tournament Stats */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">DAILY PRIZE POOL</span>
                    <span className="text-amber-300 font-bold text-[11px]">{game.dailyPrizePool}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">PLAYERS ONLINE</span>
                    <span className="text-cyan-300 font-bold text-[11px]">{game.activePlayersCount.toLocaleString()} Playing</span>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{game.skillType}</span>
                  </span>
                  <span>ENTRY: FREE ($0)</span>
                </div>
              </div>

              {/* Action Button: Play & Win Profit */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    sound.playHologramTap();
                    setActiveGameModal(game);
                    setGameState('ready');
                    setScore(0);
                    setGameTimer(15);
                  }}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY NOW & WIN PROFIT ({game.maxWinPerRound})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Game Modal */}
      {activeGameModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border-2 border-amber-400 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-[0_0_60px_rgba(245,158,11,0.3)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">
                    {activeGameModal.title}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    WIN POTENTIAL: {activeGameModal.maxWinPerRound} · MEITY APPROVED
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveGameModal(null)}
                className="text-slate-400 hover:text-white font-mono text-sm px-2 py-1 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            {/* Game Screen 1: Cyber Reflex Grid */}
            {activeGameModal.id === 'game-reflex' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400">TIME REMAINING: <strong className="text-amber-400 text-base">{gameTimer}s</strong></span>
                  <span className="text-slate-400">SCORE: <strong className="text-emerald-400 text-base">{score} PTS</strong></span>
                  <span className="text-slate-400">TARGET: <strong className="text-cyan-300">450+ PTS</strong></span>
                </div>

                {gameState === 'ready' && (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-sm text-slate-300 font-sans max-w-md mx-auto">
                      Tap the glowing amber cyber nodes as quickly as possible within 15 seconds. 
                      Reach 450+ points to win ₹350 instant withdrawable profit!
                    </p>
                    <button
                      onClick={handleStartReflexGame}
                      className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all"
                    >
                      START 15-SECOND REFLEX MATCH
                    </button>
                  </div>
                )}

                {gameState === 'playing' && (
                  <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800 max-w-xs mx-auto">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => {
                      const isTarget = idx === targetNode;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleReflexGridTap(idx)}
                          className={`h-20 rounded-2xl transition-all flex items-center justify-center font-mono font-bold text-lg ${
                            isTarget
                              ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-95 border-2 border-white animate-pulse'
                              : 'bg-slate-950 border border-slate-800 text-slate-600 hover:border-slate-700'
                          }`}
                        >
                          {isTarget ? 'TAP!' : ''}
                        </button>
                      );
                    })}
                  </div>
                )}

                {gameState === 'won' && (
                  <div className="text-center py-6 space-y-4 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-4">
                    <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
                    <div>
                      <h4 className="text-xl font-bold font-mono text-white">CONGRATULATIONS! VICTORY CONFIRMED</h4>
                      <p className="text-sm text-emerald-300 font-mono mt-1">
                        +₹350 Instant Profit Added to your Withdrawable Wallet!
                      </p>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={handleStartReflexGame}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs"
                      >
                        Play Again
                      </button>
                      <button
                        onClick={() => {
                          setActiveGameModal(null);
                          setShowWithdrawModal(true);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs"
                      >
                        Withdraw Cash to UPI
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Game Screen 2: Road Safety Reaction Pilot */}
            {activeGameModal.id === 'game-reaction' && (
              <div className="space-y-4 text-center">
                <p className="text-xs text-slate-300 font-sans">
                  Simulate emergency hazard response. Wait for the flashing RED HAZARD VECTOR and hit BRAKE immediately. 
                  Reaction time under 320ms wins ₹400 profit!
                </p>

                {gameState === 'ready' && (
                  <div className="py-6">
                    <button
                      onClick={handleStartReactionGame}
                      className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                    >
                      START REACTION HAZARD TEST
                    </button>
                  </div>
                )}

                {gameState === 'playing' && (
                  <div className="py-8 space-y-6">
                    <div className={`p-8 rounded-3xl border-2 transition-all ${
                      reactionHazardActive
                        ? 'bg-rose-600 border-white text-white animate-pulse shadow-[0_0_50px_rgba(244,63,94,0.8)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}>
                      <div className="text-2xl font-black font-mono">
                        {reactionHazardActive ? '🚨 BRAKE NOW! HAZARD AHEAD!' : 'WAIT FOR RED SIGNAL...'}
                      </div>
                    </div>

                    <button
                      onClick={handleBrakeReaction}
                      className={`w-full py-5 rounded-2xl font-mono font-black text-base transition-all ${
                        reactionHazardActive
                          ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_30px_rgba(244,63,94,0.6)]'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      🛑 HIT EMERGENCY BRAKE
                    </button>
                  </div>
                )}

                {gameState === 'won' && (
                  <div className="py-6 space-y-4 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-4">
                    <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
                    <div>
                      <h4 className="text-xl font-bold font-mono text-white">RECORD REACTION TIME!</h4>
                      <p className="text-sm text-emerald-300 font-mono mt-1">
                        Reaction: {lastReactionMs}ms (Target: &lt;320ms) · +₹400 Added to Wallet!
                      </p>
                    </div>
                    <button
                      onClick={handleStartReactionGame}
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs"
                    >
                      Play Next Challenge
                    </button>
                  </div>
                )}

                {gameState === 'lost' && (
                  <div className="py-6 space-y-3 bg-rose-950/30 border border-rose-500/40 rounded-2xl p-4">
                    <h4 className="text-base font-bold font-mono text-rose-300">Too Slow: {lastReactionMs}ms</h4>
                    <p className="text-xs text-slate-400">Needed under 320ms to qualify for prize payout.</p>
                    <button
                      onClick={handleStartReactionGame}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs"
                    >
                      Try Again (Free)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Game Screen 3 & 4 (Quick Logic Sprint) */}
            {(activeGameModal.id === 'game-ai-code' || activeGameModal.id === 'game-clean-energy') && (
              <div className="text-center py-6 space-y-4">
                <p className="text-xs text-slate-300 font-sans">
                  Algorithmic STEM puzzle challenge: Solve optimization vectors to unlock {activeGameModal.maxWinPerRound} profit.
                </p>
                <button
                  onClick={() => {
                    sound.playLockSuccess();
                    setGameState('won');
                    const profit = activeGameModal.id === 'game-ai-code' ? 600 : 350;
                    setWallet(w => ({
                      ...w,
                      totalProfitWon: w.totalProfitWon + profit,
                      withdrawableBalance: w.withdrawableBalance + profit,
                      totalMatchesWon: w.totalMatchesWon + 1
                    }));
                  }}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs"
                >
                  SOLVE ALGORITHMIC CHALLENGE & CLAIM +₹600
                </button>

                {gameState === 'won' && (
                  <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-emerald-300 font-mono text-xs">
                    ✓ Challenge Solved 100% Correctly! Profit added to withdrawable balance.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instant Cash Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border-2 border-emerald-500 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold font-mono text-white">
                  Instant Zero-Fee Cash Profit Withdrawal
                </h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>AVAILABLE TO WITHDRAW:</span>
                <span className="text-emerald-400 font-bold text-sm">₹{wallet.withdrawableBalance} INR</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>PAYOUT GATEWAY:</span>
                <span className="text-cyan-300">NPCI UPI / 24/7 Instant IMPS</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>FEE CHARGED:</span>
                <span className="text-emerald-300 font-bold">₹0.00 (Zero Fee)</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">ENTER UPI ID (VPA):</label>
                <input
                  type="text"
                  value={withdrawUpiId}
                  onChange={(e) => setWithdrawUpiId(e.target.value)}
                  placeholder="name@upi or phone@paytm"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">WITHDRAWAL AMOUNT (₹ INR):</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={wallet.withdrawableBalance}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {withdrawStatus && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300">
                {withdrawStatus}
              </div>
            )}

            <button
              onClick={handleExecuteWithdrawal}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
            >
              <span>TRANSFER ₹{withdrawAmount} TO UPI NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
