import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';
import { 
  PhoneCall, 
  PhoneOff, 
  ShieldAlert, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Radio, 
  CheckCircle2, 
  Clock, 
  Siren, 
  AlertOctagon, 
  FileCheck2, 
  HardDrive, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Car, 
  Ambulance, 
  Eye, 
  Lock,
  MessageSquare
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isHighContrast: boolean;
  emergencyReason?: string;
  locationAddress?: string;
  assignedService?: 'police_112' | 'ambulance_108' | 'women_safety_1091' | 'cyber_cell_1930';
}

interface TranscriptItem {
  id: string;
  sender: 'dispatcher' | 'citizen' | 'system';
  time: string;
  text: string;
}

export const RealTimeLiveSOSCallModal: React.FC<Props> = ({
  isOpen,
  onClose,
  isHighContrast,
  emergencyReason = 'Critical Emergency SOS Triggered',
  locationAddress = 'Central Ring Road, Near Pink Police Booth #4',
  assignedService = 'police_112'
}) => {
  const [callStatus, setCallStatus] = useState<'dialing' | 'connected' | 'ended'>('dialing');
  const [callDurationSec, setCallDurationSec] = useState<number>(0);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState<boolean>(false);
  const [isSirenBlasting, setIsSirenBlasting] = useState<boolean>(false);
  const [isSilentCovertMode, setIsSilentCovertMode] = useState<boolean>(false);
  const [responderEtaSec, setResponderEtaSec] = useState<number>(135);
  const [storageLoggedMb, setStorageLoggedMb] = useState<number>(14.2);

  // Transcript items
  const [transcript, setTranscript] = useState<TranscriptItem[]>([
    {
      id: 'tx-1',
      sender: 'system',
      time: '00:00',
      text: 'SYSTEM: Telephony handshake established over 5G/Satellite Emergency QoS Slice. Carrier zero-rated.'
    }
  ]);

  // Audio waveform visualizer state
  const [audioLevels, setAudioLevels] = useState<number[]>([40, 65, 30, 85, 95, 60, 45, 70, 90, 50, 65, 35]);

  // Timer & Call Lifecycle
  useEffect(() => {
    if (!isOpen) {
      setCallStatus('dialing');
      setCallDurationSec(0);
      return;
    }

    // Play ringing tone
    sound.playPhoneRing();
    const connectTimer = setTimeout(() => {
      sound.playCallConnected();
      sound.playRadioBeep();
      setCallStatus('connected');

      // Dispatcher greeting
      const greetingText = assignedService === 'ambulance_108'
        ? 'National Trauma Dispatch 108: Dr. Sharma on the line. Ambulance ALS-04 en route with oxygen and ICU ventilator. Stay calm.'
        : 'Police Control Room 112: Officer Meera Rathore (Badge #DL-8821) on duty. Live GPS coordinates and optical CCTV locked. Pink Patrol Car PCR-42 dispatched.';

      setTranscript(prev => [
        ...prev,
        {
          id: 'tx-2',
          sender: 'dispatcher',
          time: '00:02',
          text: greetingText
        }
      ]);

      // Speak greeting if Web Speech API available and not in covert mode
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && !isSilentCovertMode) {
        try {
          const u = new SpeechSynthesisUtterance('Emergency Control Room 112 connected. Patrol car dispatched to your location.');
          u.rate = 1.05;
          window.speechSynthesis.speak(u);
        } catch {
          // ignore
        }
      }
    }, 1200);

    return () => clearTimeout(connectTimer);
  }, [isOpen, assignedService, isSilentCovertMode]);

  // Call duration counter & dynamic transcript progression
  useEffect(() => {
    if (!isOpen || callStatus !== 'connected') return;

    const interval = setInterval(() => {
      setCallDurationSec(prev => {
        const next = prev + 1;
        setStorageLoggedMb(m => parseFloat((m + 0.15).toFixed(2)));
        setResponderEtaSec(eta => Math.max(12, eta - 1));

        // Randomize audio wave bars
        setAudioLevels([
          Math.floor(20 + Math.random() * 75),
          Math.floor(30 + Math.random() * 65),
          Math.floor(40 + Math.random() * 55),
          Math.floor(25 + Math.random() * 70),
          Math.floor(50 + Math.random() * 50),
          Math.floor(35 + Math.random() * 60),
          Math.floor(45 + Math.random() * 55),
          Math.floor(20 + Math.random() * 80),
          Math.floor(60 + Math.random() * 40),
          Math.floor(30 + Math.random() * 70),
          Math.floor(25 + Math.random() * 65),
          Math.floor(40 + Math.random() * 50),
        ]);

        // Push periodic live radio updates
        if (next === 6) {
          sound.playRadioBeep();
          setTranscript(t => [
            ...t,
            {
              id: `tx-${Date.now()}`,
              sender: 'dispatcher',
              time: '00:06',
              text: 'DISPATCHER: Unit PCR-42 is 500 meters away at North Ring Junction. Traffic signals cleared. Keep phone in hand.'
            }
          ]);
        } else if (next === 14) {
          sound.playRadioBeep();
          setTranscript(t => [
            ...t,
            {
              id: `tx-${Date.now()}`,
              sender: 'dispatcher',
              time: '00:14',
              text: 'DISPATCHER: High-Street CCTV CAM-401 confirms optical sight of the area. We have full visual coverage.'
            }
          ]);
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, callStatus]);

  const handleEndCall = () => {
    sound.playPhoneRing();
    setCallStatus('ended');
    if (isSirenBlasting) {
      sound.stopEmergencySiren();
      setIsSirenBlasting(false);
    }
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleToggleSiren = () => {
    if (isSirenBlasting) {
      sound.stopEmergencySiren();
      setIsSirenBlasting(false);
    } else {
      sound.startEmergencySiren();
      setIsSirenBlasting(true);
      setTranscript(t => [
        ...t,
        {
          id: `tx-${Date.now()}`,
          sender: 'system',
          time: formatTime(callDurationSec),
          text: 'SYSTEM: 110dB High-Intensity Emergency Deterrent Siren & Strobe Activated on device.'
        }
      ]);
    }
  };

  const handleSendQuickNote = (noteText: string) => {
    sound.playHologramTap();
    setTranscript(t => [
      ...t,
      {
        id: `tx-${Date.now()}`,
        sender: 'citizen',
        time: formatTime(callDurationSec),
        text: `CITIZEN: ${noteText}`
      }
    ]);

    // Dispatcher acknowledgment
    setTimeout(() => {
      sound.playRadioBeep();
      setTranscript(t => [
        ...t,
        {
          id: `tx-${Date.now() + 1}`,
          sender: 'dispatcher',
          time: formatTime(callDurationSec + 1),
          text: `DISPATCHER: Roger that, message received ("${noteText}"). Officers updated on radio.`
        }
      ]);
    }, 900);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className={`w-full max-w-2xl rounded-3xl border-2 shadow-[0_0_60px_rgba(244,63,94,0.4)] overflow-hidden transition-all ${
        isHighContrast
          ? 'bg-black border-rose-500 text-white'
          : 'bg-gradient-to-b from-slate-950 via-slate-900 to-rose-950/40 border-rose-500/70'
      }`}>
        {/* Top Emergency Flash Header */}
        <div className="bg-rose-600 px-6 py-3.5 flex items-center justify-between text-white font-mono shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
            <span className="font-black text-sm tracking-wider uppercase">
              REAL-TIME LIVE EMERGENCY SOS CALL AUTOMATICALLY CONNECTED
            </span>
          </div>
          <span className="text-xs font-bold bg-black/40 px-2.5 py-1 rounded-lg">
            PRIORITY 1 CAD DISPATCH
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Call Status & Officer Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/90 border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                  callStatus === 'connected'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  <PhoneCall className="w-7 h-7" />
                </div>
                {callStatus === 'connected' && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black font-mono text-white">
                    {callStatus === 'dialing' ? 'CONNECTING DISPATCHER...' : 'POLICE 112 LIVE LINE ACTIVE'}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    ENCRYPTED 2-WAY
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans mt-0.5">
                  Officer Meera Rathore · Pink Women Patrol Unit PCR-42 · Badge #DL-8821
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    CALL TIME: {formatTime(callDurationSec)}
                  </span>
                  <span>·</span>
                  <span className="text-cyan-300 font-bold">
                    PATROL ETA: {Math.floor(responderEtaSec / 60)}m {responderEtaSec % 60}s
                  </span>
                </div>
              </div>
            </div>

            {/* Storage Vault Blackbox Status */}
            <div className="sm:text-right font-mono text-xs text-slate-400 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
              <span className="text-[10px] text-slate-500 block">128 GB EVIDENCE BLACKBOX:</span>
              <span className="text-emerald-400 font-bold flex items-center sm:justify-end gap-1 mt-0.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                {storageLoggedMb} MB STREAMED (AES-256)
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Partition: part-cctv (Tamper-Proof)
              </span>
            </div>
          </div>

          {/* Real-Time Audio Stream Waveform Visualizer */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                <span className="text-white font-bold">LIVE DUPLEX AUDIO STREAM & MICROPHONE FEED</span>
              </div>
              <span className="text-emerald-400 font-bold">48 kHz ULTRA-CLEAR HD VOIP</span>
            </div>

            {/* Pulsing Audio Waves */}
            <div className="h-14 flex items-center justify-center gap-1.5 px-4 bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800/80">
              {audioLevels.map((lvl, idx) => (
                <div
                  key={idx}
                  style={{ height: `${lvl}%` }}
                  className={`w-2.5 rounded-full transition-all duration-150 ${
                    callStatus === 'connected'
                      ? idx % 2 === 0 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.5)]'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
              <span>MIC SENSITIVITY: 100%</span>
              <span className="text-rose-400 font-bold">
                {isSilentCovertMode ? 'COVERT SILENT LISTEN ACTIVE' : 'SPEAKERPHONE AMPLIFIED'}
              </span>
              <span>CARRIER LATENCY: 2.1 ms</span>
            </div>
          </div>

          {/* Real-Time Live Transcript Log */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                LIVE AUDIO TRANSCRIPTION & CAD LOG
              </span>
              <span className="text-[10px] text-slate-500">AUTOMATICALLY NOTARIZED</span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
              {transcript.map(item => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-xl border ${
                    item.sender === 'dispatcher'
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                      : item.sender === 'citizen'
                      ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 mb-1">
                    <span className="font-bold uppercase tracking-wider">{item.sender}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="font-sans text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Silent Communication Buttons (For when citizen cannot speak) */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 block">
              ONE-TOUCH SILENT TELEGRAPH (Transmits to Dispatcher Immediately):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSendQuickNote('Followed by unknown person on bike. Need immediate intercept.')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/40 text-xs font-mono transition-colors"
              >
                🚨 "Someone following me"
              </button>
              <button
                onClick={() => handleSendQuickNote('Cornered in quiet alleyway. Send siren patrol vehicle.')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-mono transition-colors"
              >
                ⚠️ "Trapped in alley"
              </button>
              <button
                onClick={() => handleSendQuickNote('Injured citizen at location. Need ambulance ICU.')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors"
              >
                🚑 "Medical Injury"
              </button>
              <button
                onClick={() => handleSendQuickNote('Police car has arrived safely. Situation secured.')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 text-xs font-mono transition-colors"
              >
                ✅ "Police arrived / Safe"
              </button>
            </div>
          </div>

          {/* Bottom Call Controls & Safety Toggles */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              {/* Mic Toggle */}
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3 rounded-2xl border transition-all ${
                  isMicMuted
                    ? 'bg-rose-950/80 text-rose-400 border-rose-500/50'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Speaker Toggle */}
              <button
                onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                className={`p-3 rounded-2xl border transition-all ${
                  isSpeakerMuted
                    ? 'bg-amber-950/80 text-amber-400 border-amber-500/50'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title={isSpeakerMuted ? 'Unmute Speaker' : 'Mute Speaker'}
              >
                {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* High-Decibel Deterrent Siren Button */}
              <button
                onClick={handleToggleSiren}
                className={`px-4 py-3 rounded-2xl border font-mono font-bold text-xs flex items-center gap-2 transition-all ${
                  isSirenBlasting
                    ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-pulse'
                    : 'bg-slate-900 text-rose-400 border-rose-500/40 hover:bg-rose-950/40'
                }`}
              >
                <Siren className="w-4 h-4" />
                <span>{isSirenBlasting ? 'STOP SIREN' : 'BLAST 110dB SIREN'}</span>
              </button>

              {/* Covert Silent Mode */}
              <button
                onClick={() => setIsSilentCovertMode(!isSilentCovertMode)}
                className={`px-3 py-3 rounded-2xl border font-mono text-xs flex items-center gap-1.5 transition-all ${
                  isSilentCovertMode
                    ? 'bg-purple-950 text-purple-300 border-purple-500/50 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="Mute all outgoing sound on device for safety while keeping mic open to dispatcher"
              >
                <Eye className="w-4 h-4" />
                <span>SILENT MODE</span>
              </button>
            </div>

            {/* End Emergency Call Button */}
            <button
              onClick={handleEndCall}
              className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-black text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all"
            >
              <PhoneOff className="w-5 h-5" />
              <span>END CALL & MARK SAFE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
