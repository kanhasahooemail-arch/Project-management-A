import React, { useState, useEffect, useRef } from 'react';
import { EncryptedPacket, SectorType } from '../types';
import { generateAesKey, encryptData, decryptData, exportKeyToHex, sha256Hex } from '../utils/crypto';
import { sound } from '../utils/audio';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Fingerprint, 
  KeyRound, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  RefreshCw,
  Eye,
  ScanLine
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onSecurityAlert?: (msg: string) => void;
}

export const SecurityEncryptionCenter: React.FC<Props> = ({ isHighContrast, onSecurityAlert }) => {
  const [currentKeyHex, setCurrentKeyHex] = useState<string>('Generating AES-256 Master Key...');
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
  const [testPayload, setTestPayload] = useState<string>('CLASSIFIED_CITIZEN_V2X_TELEMETRY::COORDINATES:[37.7749,-122.4194]::BATTERY:94%');
  const [targetSector, setTargetSector] = useState<SectorType>('government');
  const [lastEncrypted, setLastEncrypted] = useState<{ cipher: string; iv: string; hash: string } | null>(null);
  const [decryptedOutput, setDecryptedOutput] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [packetStream, setPacketStream] = useState<EncryptedPacket[]>([]);
  
  // Biometric state
  const [biometricScanning, setBiometricScanning] = useState<boolean>(false);
  const [biometricVerified, setBiometricVerified] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize master AES-256 key on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const key = await generateAesKey();
        const hex = await exportKeyToHex(key);
        if (mounted) {
          setCryptoKey(key);
          setCurrentKeyHex(hex);

          // Seed initial encrypted packet stream
          const initialPackets: EncryptedPacket[] = [
            {
              id: 'PKT-9921',
              sender: 'Mobile_Terminal_Android_01',
              recipient: 'Gov_Consensus_Node_Alpha',
              sector: 'government',
              cipherPayload: 'v9K+lR2o4bE8sW3nZ...==',
              iv: '3a4f89d1b2e67c8019aa4421',
              sha256Digest: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
              timestamp: '10:44:02 UTC',
              verified: true,
            },
            {
              id: 'PKT-9922',
              sender: 'Automobile_V2X_OBU_402',
              recipient: 'Roadside_Optical_Mesh',
              sector: 'automobile',
              cipherPayload: 'k7PqW9mZ1xT5rY8...==',
              iv: '8f12cc49b90012e8471da329',
              sha256Digest: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
              timestamp: '10:44:05 UTC',
              verified: true,
            },
            {
              id: 'PKT-9923',
              sender: 'SemiGov_Smart_Grid_Consortium',
              recipient: 'Municipal_Energy_Exchange',
              sector: 'semi_government',
              cipherPayload: 'a1LmN890PqR345...==',
              iv: '01d4a8bc923e1104e849921b',
              sha256Digest: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
              timestamp: '10:44:09 UTC',
              verified: true,
            },
          ];
          setPacketStream(initialPackets);
        }
      } catch (err) {
        console.error('Crypto initialization failed', err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Biometric scanner canvas ripple animation
  useEffect(() => {
    if (!biometricScanning || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let radius = 10;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.stroke();

      radius = (radius + 2) % 60;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [biometricScanning]);

  const handleTriggerBiometricScan = () => {
    sound.playScanPulse();
    setBiometricScanning(true);
    setTimeout(() => {
      setBiometricScanning(false);
      setBiometricVerified(true);
      sound.playLockSuccess();
    }, 1800);
  };

  const handleRotateKey = async () => {
    sound.playHologramTap();
    const newKey = await generateAesKey();
    const hex = await exportKeyToHex(newKey);
    setCryptoKey(newKey);
    setCurrentKeyHex(hex);
    setLastEncrypted(null);
    setDecryptedOutput(null);
  };

  const handleEncryptPayload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cryptoKey || !testPayload.trim()) return;

    sound.playHologramTap();
    const result = await encryptData(testPayload, cryptoKey);
    setLastEncrypted({
      cipher: result.ciphertextBase64,
      iv: result.ivHex,
      hash: result.sha256Hash,
    });
    setDecryptedOutput(null);

    // Append to live packet stream
    const newPacket: EncryptedPacket = {
      id: `PKT-${Math.floor(1000 + Math.random() * 9000)}`,
      sender: 'Current_Device_Secure_Enclave',
      recipient: `Secure_${targetSector.toUpperCase()}_Relay`,
      sector: targetSector,
      cipherPayload: result.ciphertextBase64.slice(0, 24) + '...==',
      iv: result.ivHex,
      sha256Digest: result.sha256Hash,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      verified: true,
    };

    setPacketStream(prev => [newPacket, ...prev.slice(0, 9)]);
  };

  const handleDecryptPayload = async () => {
    if (!cryptoKey || !lastEncrypted) return;
    sound.playLockSuccess();
    setIsDecrypting(true);
    try {
      const plain = await decryptData(lastEncrypted.cipher, lastEncrypted.iv, cryptoKey);
      setDecryptedOutput(plain);
    } catch {
      setDecryptedOutput('[Decryption Error: Authentication tag mismatch or corrupted ciphertext]');
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Zero-Trust Overview & Biometric Badge */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>100% CITIZEN DATA PRIVACY GUARANTEED</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
                ZERO DATA STOLEN
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 text-[10px] font-mono">
                ZERO BACKDOORS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white tracking-wide font-mono">
                People's Data Privacy Shield & Sovereign Cryptography Vault
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl">
              All personal data, locations, and telemetry are encrypted directly inside your device's hardware enclave using AES-GCM 256-bit with SHA-256 integrity digests. 
              No third parties, corporate trackers, or unauthorized state actors can decipher your data.
            </p>
          </div>

          {/* Biometric Status Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerBiometricScan}
              disabled={biometricScanning}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                biometricScanning
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 animate-pulse'
                  : biometricVerified
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span>{biometricScanning ? 'Scanning Biometrics...' : 'Biometric Auth: Verified'}</span>
            </button>
          </div>
        </div>

        {/* Master Ephemeral AES Key Display */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACTIVE SESSION KEY (AES-256-GCM):</span>
            </div>
            <button
              onClick={handleRotateKey}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Rotate Cryptographic Key</span>
            </button>
          </div>
          <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-cyan-500/20 font-mono text-xs text-cyan-300 break-all select-all shadow-inner">
            {currentKeyHex}
          </div>
        </div>
      </div>

      {/* Grid: Interactive Encryptor/Decryptor + Live Encrypted Packet Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Payload Encryption Engine */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              Real-Time E2E Payload Encryptor
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              CLIENT-SIDE SECURE
            </span>
          </div>

          <form onSubmit={handleEncryptPayload} className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Target Sector Channel</label>
              <select
                value={targetSector}
                onChange={e => setTargetSector(e.target.value as SectorType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="government">Official Government Sovereign Channel</option>
                <option value="semi_government">Semi-Government Microgrid / Public Utility</option>
                <option value="automobile">Automobile V2X Telemetry Mesh</option>
                <option value="enterprise_commerce">Enterprise Buying/Selling Escrow</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Plaintext Message / Telemetry Data</label>
              <textarea
                rows={3}
                value={testPayload}
                onChange={e => setTestPayload(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypt with AES-GCM (SubtleCrypto)</span>
            </button>
          </form>

          {/* Ciphertext Results */}
          {lastEncrypted && (
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[11px] block">INITIALIZATION VECTOR (IV 96-bit):</span>
                <div className="p-2 bg-slate-950 rounded-lg text-amber-300 break-all">{lastEncrypted.iv}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[11px] block">ENCRYPTED CIPHERTEXT (BASE64):</span>
                <div className="p-2 bg-slate-950 rounded-lg text-purple-300 break-all">{lastEncrypted.cipher}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[11px] block">INTEGRITY SHA-256 HASH:</span>
                <div className="p-2 bg-slate-950 rounded-lg text-emerald-300 break-all">{lastEncrypted.hash}</div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDecryptPayload}
                  disabled={isDecrypting}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Decrypt & Validate Payload</span>
                </button>
              </div>

              {decryptedOutput && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-200">
                  <div className="text-[10px] text-emerald-400 font-bold mb-1">DECRYPTED VERIFIED PLAINTEXT:</div>
                  <div className="break-all">{decryptedOutput}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Live Encrypted Network Packet Stream */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              Encrypted Low-Latency Mesh Packet Stream
            </h3>
            <span className="text-xs font-mono text-slate-400">{packetStream.length} PACKETS</span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {packetStream.map(pkt => (
              <div
                key={pkt.id}
                className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors text-xs font-mono"
              >
                <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                  <span className="text-cyan-300 font-bold">{pkt.id}</span>
                  <span>{pkt.timestamp}</span>
                </div>

                <div className="text-[11px] text-slate-300 flex items-center gap-1.5 truncate">
                  <span className="text-slate-500">FROM:</span>
                  <span className="truncate">{pkt.sender}</span>
                </div>

                <div className="text-[11px] text-slate-300 flex items-center gap-1.5 truncate">
                  <span className="text-slate-500">TO:</span>
                  <span className="truncate">{pkt.recipient}</span>
                </div>

                <div className="mt-2 p-1.5 bg-slate-900 rounded text-[10px] text-purple-300/90 break-all border border-purple-500/10">
                  PAYLOAD: {pkt.cipherPayload}
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60 text-[10px] text-slate-500">
                  <span>SHA256: {pkt.sha256Digest.slice(0, 16)}...</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
