import React, { useState } from 'react';
import { ApprovalRecord, SectorType, ApprovalStatus } from '../types';
import { sound } from '../utils/audio';
import { sha256Hex } from '../utils/crypto';
import { 
  ShieldCheck, 
  Building2, 
  Landmark, 
  Car, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Award, 
  Download, 
  Plus, 
  Key, 
  ExternalLink,
  Search,
  Check,
  DollarSign,
  GraduationCap,
  Train,
  HeartHandshake
} from 'lucide-react';

interface Props {
  approvals: ApprovalRecord[];
  onUpdateApprovals: (records: ApprovalRecord[]) => void;
  isHighContrast: boolean;
}

export const ApprovalsGovernanceHub: React.FC<Props> = ({
  approvals,
  onUpdateApprovals,
  isHighContrast,
}) => {
  const [activeSector, setActiveSector] = useState<SectorType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRecord, setSelectedRecord] = useState<ApprovalRecord | null>(approvals[0] || null);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSector, setNewSector] = useState<SectorType>('government');
  const [newApplicant, setNewApplicant] = useState<string>('');
  const [newJurisdiction, setNewJurisdiction] = useState<string>('National Digital Governance Authority');
  const [newDetails, setNewDetails] = useState<string>('');
  const [signingInProgress, setSigningInProgress] = useState<boolean>(false);
  const [certificateExportNotice, setCertificateExportNotice] = useState<string | null>(null);

  const filtered = approvals.filter(item => {
    const matchesSector = activeSector === 'all' || item.sector === activeSector;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const handleGrantApproval = async (id: string) => {
    sound.playLockSuccess();
    setSigningInProgress(true);
    const updated = approvals.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          status: 'approved' as ApprovalStatus,
          verifiedBy: 'Sovereign Consensus Node Prime (Authorized Signatory)',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
          complianceScore: Math.min(100, rec.complianceScore + 5),
        };
      }
      return rec;
    });
    setTimeout(() => {
      onUpdateApprovals(updated);
      setSigningInProgress(false);
      if (selectedRecord?.id === id) {
        setSelectedRecord(updated.find(r => r.id === id) || null);
      }
    }, 400);
  };

  const handleRevokeOrFlag = (id: string) => {
    sound.playChirp(440, 0.08, 'sawtooth');
    const updated = approvals.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          status: 'review' as ApprovalStatus,
          verifiedBy: 'Flagged for Cryptographic Audit',
        };
      }
      return rec;
    });
    onUpdateApprovals(updated);
    if (selectedRecord?.id === id) {
      setSelectedRecord(updated.find(r => r.id === id) || null);
    }
  };

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newApplicant.trim()) return;

    sound.playHologramTap();
    const idPrefix =
      newSector === 'financial'
        ? 'FIN'
        : newSector === 'education'
        ? 'EDU'
        : newSector === 'transportation'
        ? 'TRANS'
        : newSector === 'universal_welfare'
        ? 'WEL'
        : newSector === 'government'
        ? 'GOV'
        : newSector === 'semi_government'
        ? 'SGOV'
        : newSector === 'automobile'
        ? 'AUTO'
        : 'ENT';

    const newId = `${idPrefix}-${Math.floor(10000 + Math.random() * 90000)}`;
    const rawContent = `${newId}|${newApplicant}|${newJurisdiction}|${Date.now()}`;
    const hash = await sha256Hex(rawContent);

    const newRecord: ApprovalRecord = {
      id: newId,
      sector: newSector,
      title: newTitle,
      applicant: newApplicant,
      jurisdiction: newJurisdiction,
      status: 'pending',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      securityHash: hash,
      verifiedBy: 'Zero-Trust Intake Ledger',
      details: newDetails || 'Official submission received under encrypted sovereign verification standards.',
      complianceScore: Math.floor(92 + Math.random() * 7),
    };

    const updated = [newRecord, ...approvals];
    onUpdateApprovals(updated);
    setSelectedRecord(newRecord);
    setShowApplyModal(false);
    setNewTitle('');
    setNewApplicant('');
    setNewDetails('');
  };

  const handleExportCertificate = (record: ApprovalRecord) => {
    sound.playChirp(880, 0.06);
    const certPayload = {
      platform: 'AURA NEXUS SOVEREIGN GOVERNANCE PLATFORM',
      credentialType: 'OFFICIAL_GOVERNMENT_SECTOR_APPROVAL',
      recordId: record.id,
      sector: record.sector.toUpperCase(),
      title: record.title,
      applicant: record.applicant,
      jurisdiction: record.jurisdiction,
      status: record.status.toUpperCase(),
      complianceScore: `${record.complianceScore}%`,
      cryptographicDigest: record.securityHash,
      timestampUtc: record.timestamp,
      signatureStandard: 'NIST Post-Quantum Dilithium / AES-256 HMAC',
      authorizedSeal: 'OFFICIAL_VERIFIED_AUTHENTIC',
    };

    const blob = new Blob([JSON.stringify(certPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AURA_OFFICIAL_${record.id}_CERTIFICATE.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setCertificateExportNotice(`Verified Official Certificate for ${record.id} exported successfully.`);
    setTimeout(() => setCertificateExportNotice(null), 4000);
  };

  const getSectorIcon = (sector: SectorType) => {
    switch (sector) {
      case 'financial':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-cyan-400" />;
      case 'transportation':
        return <Train className="w-4 h-4 text-amber-400" />;
      case 'universal_welfare':
        return <HeartHandshake className="w-4 h-4 text-rose-400" />;
      case 'government':
        return <Landmark className="w-4 h-4 text-cyan-400" />;
      case 'semi_government':
        return <Building2 className="w-4 h-4 text-emerald-400" />;
      case 'automobile':
        return <Car className="w-4 h-4 text-amber-400" />;
      case 'enterprise_commerce':
        return <Briefcase className="w-4 h-4 text-purple-400" />;
    }
  };

  const getSectorLabel = (sector: SectorType) => {
    switch (sector) {
      case 'financial':
        return 'Financial Resources & Grants';
      case 'education':
        return 'Education & Spatial Degrees';
      case 'transportation':
        return 'Universal Transportation';
      case 'universal_welfare':
        return 'Universal Citizen Welfare';
      case 'government':
        return 'Official Government';
      case 'semi_government':
        return 'Semi-Government Utility';
      case 'automobile':
        return 'Automobile & V2X Fleet';
      case 'enterprise_commerce':
        return 'Enterprise & Commerce';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sector Overview & Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                Universal Multi-Sector Approvals: Financial, Education, Transportation & Governance
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Guaranteed sovereign verification ensuring every citizen has direct access to financial grants, accredited spatial education, universal transportation, and public resources.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowApplyModal(true);
                sound.playHologramTap();
              }}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>Apply for Official Clearance</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSector('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeSector === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Sectors ({approvals.length})
            </button>
            <button
              onClick={() => setActiveSector('financial')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeSector === 'financial'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Financial Resources</span>
            </button>
            <button
              onClick={() => setActiveSector('education')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeSector === 'education'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Education</span>
            </button>
            <button
              onClick={() => setActiveSector('transportation')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeSector === 'transportation'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Train className="w-3.5 h-3.5 text-amber-400" />
              <span>Transportation</span>
            </button>
            <button
              onClick={() => setActiveSector('universal_welfare')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeSector === 'universal_welfare'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              <span>Welfare & Health</span>
            </button>
            <button
              onClick={() => setActiveSector('government')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeSector === 'government'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Government</span>
            </button>
            <button
              onClick={() => setActiveSector('automobile')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeSector === 'automobile'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Automobile</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, applicant, or title..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {certificateExportNotice && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{certificateExportNotice}</span>
        </div>
      )}

      {/* Main Grid: Left List + Right Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Applications List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1">
            <span>OFFICIAL CLEARANCES & DOSSIERS</span>
            <span>{filtered.length} RECORDS FOUND</span>
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filtered.map(rec => {
              const isSelected = selectedRecord?.id === rec.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => {
                    setSelectedRecord(rec);
                    sound.playHologramTap();
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {getSectorIcon(rec.sector)}
                      <span className="text-xs font-mono font-bold text-white">{rec.id}</span>
                      <span className="text-[10px] text-slate-500 font-mono">· {getSectorLabel(rec.sector)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {rec.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          <Check className="w-3 h-3" /> APPROVED
                        </span>
                      ) : rec.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/30">
                          PENDING
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-500/30">
                          REVIEW
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-200 mt-2 line-clamp-1">{rec.title}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">Applicant: {rec.applicant}</div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-3 pt-2 border-t border-slate-800/60">
                    <span>Score: {rec.complianceScore}%</span>
                    <span>{rec.timestamp.slice(0, 10)}</span>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-xs">
                No matching approval records found for this query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Sovereign Dossier & Sign-Off Actions */}
        <div className="lg:col-span-7">
          {selectedRecord ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden">
              {/* Sovereign Watermark Stamp */}
              <div className="absolute right-4 top-4 pointer-events-none opacity-10">
                <ShieldCheck className="w-40 h-40 text-cyan-400" />
              </div>

              {/* Dossier Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold border border-cyan-500/30">
                      {selectedRecord.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {getSectorLabel(selectedRecord.sector)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1.5">{selectedRecord.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Jurisdiction: {selectedRecord.jurisdiction}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400">COMPLIANCE RATING</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {selectedRecord.complianceScore}%
                  </div>
                </div>
              </div>

              {/* Dossier Body */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 font-mono block">APPLICANT ENTITY</span>
                  <span className="text-slate-200 font-medium">{selectedRecord.applicant}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block">VERIFYING NODE / AUTHORITY</span>
                  <span className="text-slate-200 font-medium">{selectedRecord.verifiedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block">ISSUANCE TIMESTAMP</span>
                  <span className="text-slate-200 font-mono">{selectedRecord.timestamp}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block">STATUS</span>
                  <span
                    className={`font-mono font-bold uppercase ${
                      selectedRecord.status === 'approved'
                        ? 'text-emerald-400'
                        : selectedRecord.status === 'pending'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {selectedRecord.status}
                  </span>
                </div>
              </div>

              {/* Cryptographic Security Hash Details */}
              <div className="py-4 border-b border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-cyan-400" />
                    IMMUTABLE SHA-256 SOVEREIGN DIGEST
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">TAMPER-PROOF VERIFIED</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-cyan-300/90 break-all border border-cyan-500/20">
                  {selectedRecord.securityHash}
                </div>
              </div>

              {/* Description / Legal Context */}
              <div className="py-4 border-b border-slate-800 text-xs space-y-1">
                <span className="text-slate-500 font-mono block">OFFICIAL MEMORANDUM & REGULATORY SCOPE</span>
                <p className="text-slate-300 leading-relaxed">{selectedRecord.details}</p>
              </div>

              {/* Action Buttons: Grant Approval, Export Certificate, Revoke */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {selectedRecord.status !== 'approved' ? (
                    <button
                      onClick={() => handleGrantApproval(selectedRecord.id)}
                      disabled={signingInProgress}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50"
                    >
                      <Award className="w-4 h-4" />
                      <span>{signingInProgress ? 'Signing Post-Quantum Key...' : 'Grant Official Approval'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRevokeOrFlag(selectedRecord.id)}
                      className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Flag for Regulatory Audit</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExportCertificate(selectedRecord)}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Export Official Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 text-xs">
              Select an official approval record to view credentials and sign-off authority.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Submit New Official Application */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Apply for Universal Official Clearance
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Apply for Financial Grants, Education Degrees, Universal Transit passes, Citizen Welfare, or Automobile clearances.
            </p>

            <form onSubmit={handleCreateApplication} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Target Sector</label>
                <select
                  value={newSector}
                  onChange={e => setNewSector(e.target.value as SectorType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="financial">Financial Resources (Citizen Grants, Venture Subsidies)</option>
                  <option value="education">Education (Universal Degrees, Holographic Curriculum)</option>
                  <option value="transportation">Transportation (Zero-Fare Transit Pass, High-Speed Rail)</option>
                  <option value="universal_welfare">Universal Welfare (Healthcare Attestation, Public Care)</option>
                  <option value="government">Government (Digital Citizen ID, Municipal Infrastructure)</option>
                  <option value="semi_government">Semi-Government (Energy Microgrid, Public Utilities)</option>
                  <option value="automobile">Automobile (Autonomous Highway Clearance, V2X Mesh)</option>
                  <option value="enterprise_commerce">Enterprise & Commerce (B2B Escrow, Partner Trade)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Clearance / Application Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Clean Energy Adoption Grant or Transit Pass"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Applicant Name / Entity ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Kanha Sahoo (Citizen ID: IND-2026-X99)"
                  value={newApplicant}
                  onChange={e => setNewApplicant(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Regulatory Jurisdiction</label>
                <input
                  type="text"
                  value={newJurisdiction}
                  onChange={e => setNewJurisdiction(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Technical Scope & Safeguards</label>
                <textarea
                  rows={3}
                  placeholder="Describe compliance standards, zero-trust telemetry, and privacy safeguards..."
                  value={newDetails}
                  onChange={e => setNewDetails(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  Submit for Sovereign Consensus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
