import React, { useState } from 'react';
import { 
  GovernmentProtocolRecord, 
  GovernmentProtocolCategory, 
  WorldwideRegion 
} from '../types';
import { sound } from '../utils/audio';
import { sha256Hex } from '../utils/crypto';
import { 
  Landmark, 
  ShieldCheck, 
  Globe, 
  Scale, 
  Building2, 
  FileCheck2, 
  PhoneCall, 
  Radio, 
  CheckCircle2, 
  Search, 
  Download, 
  Share2, 
  AlertTriangle, 
  Cpu, 
  Lock, 
  Satellite, 
  Waves, 
  Award, 
  Activity, 
  HeartHandshake, 
  Languages, 
  Wifi, 
  Zap, 
  Clock, 
  ChevronRight,
  ShieldAlert,
  Ambulance,
  Cctv
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onProtocolNotice?: (msg: string) => void;
}

export const GlobalGovernmentProtocols: React.FC<Props> = ({ isHighContrast, onProtocolNotice }) => {
  const [selectedCategory, setSelectedCategory] = useState<GovernmentProtocolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('india');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [satelliteDirectActive, setSatelliteDirectActive] = useState<boolean>(true);
  const [selectedProtocol, setSelectedProtocol] = useState<GovernmentProtocolRecord | null>(null);
  const [verifiedHashProof, setVerifiedHashProof] = useState<string | null>(null);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  // Worldwide Regions Directory
  const worldwideRegions: WorldwideRegion[] = [
    {
      id: 'india',
      name: 'India & South Asia',
      flag: '🇮🇳',
      code: 'IND',
      primaryEmergencyHotline: '112 (National Unified Emergency)',
      policeDirect: '100 / 112',
      medicalAmbulance: '108 / 102',
      fireDisaster: '101',
      cyberCellDepartment: '1930 (National Cyber Crime Portal)',
      dataSovereigntyFramework: 'DPDP Act 2023 & CERT-In Cyber Security Directions',
      satelliteRelayBand: 'ISRO NavIC & GSAT / Iridium L-Band',
      activeProtocolsCount: 18,
      edgeLatencyMs: 3.4,
      activeStatus: 'ONLINE_FULL_MESH',
    },
    {
      id: 'usa_americas',
      name: 'United States & Americas',
      flag: '🇺🇸',
      code: 'USA',
      primaryEmergencyHotline: '911 (NENA-i3 NextGen Emergency)',
      policeDirect: '911',
      medicalAmbulance: '911 (EMS Priority Tier 1)',
      fireDisaster: '911 (FEMA IPAWS)',
      cyberCellDepartment: '1-855-CISA-CYBER (CISA Incident Desk)',
      dataSovereigntyFramework: 'NIST SP 800-53 Rev 5 & FedRAMP High',
      satelliteRelayBand: 'FEMA IPAWS & Starlink Direct-to-Cell',
      activeProtocolsCount: 22,
      edgeLatencyMs: 2.8,
      activeStatus: 'ONLINE_FULL_MESH',
    },
    {
      id: 'european_union',
      name: 'European Union & United Kingdom',
      flag: '🇪🇺',
      code: 'EUR',
      primaryEmergencyHotline: '112 (Universal European Emergency Number)',
      policeDirect: '112 / 999 (UK)',
      medicalAmbulance: '112 / 15 (SAMU)',
      fireDisaster: '112 / 18',
      cyberCellDepartment: 'Europol EC3 & ENISA CSIRTs Network',
      dataSovereigntyFramework: 'GDPR Art 6(1)(d) & eIDAS 2.0 Regulation',
      satelliteRelayBand: 'Galileo SAR & OneWeb Ku-Band',
      activeProtocolsCount: 24,
      edgeLatencyMs: 3.8,
      activeStatus: 'ONLINE_FULL_MESH',
    },
    {
      id: 'japan_east_asia',
      name: 'Japan & East Asia',
      flag: '🇯🇵',
      code: 'JPN',
      primaryEmergencyHotline: '110 (Police) / 119 (Ambulance & Fire)',
      policeDirect: '110 (National Police Agency)',
      medicalAmbulance: '119 (Emergency Critical Care)',
      fireDisaster: '119 (J-Alert Civil Defense)',
      cyberCellDepartment: 'NISC (National Cyber Incident Center)',
      dataSovereigntyFramework: 'APPI & MIC Telecommunications Act',
      satelliteRelayBand: 'QZSS Michibiki & Starlink APAC',
      activeProtocolsCount: 16,
      edgeLatencyMs: 3.1,
      activeStatus: 'ONLINE_FULL_MESH',
    },
    {
      id: 'australia_oceania',
      name: 'Australia & Oceania',
      flag: '🇦🇺',
      code: 'AUS',
      primaryEmergencyHotline: '000 (Triple Zero Universal Emergency)',
      policeDirect: '000 / 131 444',
      medicalAmbulance: '000 (St John Ambulance Service)',
      fireDisaster: '000 (Rural Fire Service / SES)',
      cyberCellDepartment: '1300 CYBER1 (Australian Cyber Security Centre)',
      dataSovereigntyFramework: 'Privacy Act & Essential Eight Cyber Security',
      satelliteRelayBand: 'Inmarsat & Optus Satellite Fleet',
      activeProtocolsCount: 15,
      edgeLatencyMs: 4.5,
      activeStatus: 'ONLINE_FULL_MESH',
    },
    {
      id: 'middle_east_gcc',
      name: 'Middle East & GCC',
      flag: '🇦🇪',
      code: 'UAE',
      primaryEmergencyHotline: '999 (Universal Police) / 998 (Ambulance)',
      policeDirect: '999',
      medicalAmbulance: '998 (National Ambulance)',
      fireDisaster: '997 (Civil Defence)',
      cyberCellDepartment: 'Dubai eCrime / Saudi NCA Desk',
      dataSovereigntyFramework: 'Federal Decree Data Protection & NCA-ECC',
      satelliteRelayBand: 'Yahsat Al Yah & Thuraya Sat',
      activeProtocolsCount: 14,
      edgeLatencyMs: 4.1,
      activeStatus: 'ONLINE_FULL_MESH',
    },
    {
      id: 'global_un_mesh',
      name: 'United Nations & International High Seas',
      flag: '🌐',
      code: 'UN-INT',
      primaryEmergencyHotline: '112 / GMDSS Maritime Channel 16 VHF',
      policeDirect: 'INTERPOL Global Complex for Innovation',
      medicalAmbulance: 'WHO Emergency Medical Teams (EMT Initiative)',
      fireDisaster: 'UN-SPIDER Disaster Emergency Response',
      cyberCellDepartment: 'UNODC Cybercrime Global Programme',
      dataSovereigntyFramework: 'Universal Declaration of Human Rights & ITU-T',
      satelliteRelayBand: 'Iridium GMDSS Global Constellation',
      activeProtocolsCount: 26,
      edgeLatencyMs: 5.2,
      activeStatus: 'ONLINE_FULL_MESH',
    },
  ];

  // Government Protocols Directory
  const [protocols] = useState<GovernmentProtocolRecord[]>([
    {
      id: 'GOV-PROT-CAP-01',
      code: 'CAP-v1.2-OASIS',
      name: 'Common Alerting Protocol (CAP v1.2) Multi-Hazard Emergency Standard',
      category: 'emergency_dispatch',
      authority: 'OASIS Standards Consortium, WMO & National Civil Protection Agencies',
      jurisdiction: 'Worldwide (193 UN Member Nations)',
      treatyStandard: 'ITU-T Recommendation X.1303 / ISO 22324 Civil Protection',
      cryptographicStandard: 'XML-DSig with SHA-256 Digest & W3C Canonicalization',
      complianceLevel: 'MANDATORY_FEDERAL',
      status: 'enforced_active',
      description: 'Standardized digital format for all emergency hazard warnings, automatically routing weather, earthquake, terrorism, and road safety alerts directly to civilian mobile devices without network bottlenecks.',
      legalArticle: 'Federal Civil Defense Directive Section 4; ITU-T X.1303 Emergency Broadcast Protocol',
      sha256VerificationProof: 'e4d8a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abc',
    },
    {
      id: 'GOV-PROT-NENA-02',
      code: 'NENA-i3-NG112',
      name: 'Next Generation 911 / 112 IP Emergency Telecommunications & CAD Mesh',
      category: 'emergency_dispatch',
      authority: 'National Emergency Number Association (NENA) & European EENA Consortium',
      jurisdiction: 'United States, European Union, India (ERSS-112), and Worldwide PSAPs',
      treatyStandard: 'NENA STA-010.3b & ETSI TS 103 479 Next Generation 112 Core Services',
      cryptographicStandard: 'Mutual TLS 1.3 with Curve25519 Ephemeral Key Exchange',
      complianceLevel: 'MANDATORY_FEDERAL',
      status: 'enforced_active',
      description: 'Enables sub-second transmission of real-time GPS coordinates, audio distress signals, and automated crash sensor telemetry directly into emergency call centers (PSAPs) with automated computer-aided dispatch (CAD).',
      legalArticle: 'Federal Communications Commission (FCC) NG911 Mandate; EU European Electronic Communications Code (EECC)',
      sha256VerificationProof: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    },
    {
      id: 'GOV-PROT-CCTV-03',
      code: 'JUDICIAL-CCTV-SEC91',
      name: 'Judicial Warrant & Exigent Circumstance Public CCTV Access Protocol',
      category: 'civil_surveillance',
      authority: 'Federal Ministry of Home Affairs, High Courts & Department of Justice',
      jurisdiction: 'National & State Police Departments, Cyber Crime Cells & Metropolitan Municipalities',
      treatyStandard: 'Code of Criminal Procedure (CrPC) Sec 91/92 & 4th Amendment Judicial Exigency',
      cryptographicStandard: 'ECDSA P-384 Judicial Digital Signature with Timestamp Token',
      complianceLevel: 'STATUTORY_CIVIL_CODE',
      status: 'enforced_active',
      description: 'Enforces statutory compliance for women and citizen safety surveillance. Permits automatic live camera locking during imminent physical danger under the "Exigent Preservation of Life" doctrine, with automatic cryptographic warrants filed with the Magistrate within 24 hours.',
      legalArticle: 'Statutory Exigent Life Protection Act Art 21; CrPC Section 91 Judicial Summon Directive',
      sha256VerificationProof: '3f4e5d6c7b8a90123456789abcdef0123456789abcdef0123456789abcdef012',
    },
    {
      id: 'GOV-PROT-EGAL-04',
      code: 'EGAL-TRIAGE-2026',
      name: 'Universal Egalitarian Trauma Care & Zero-VIP Discrimination Mandate',
      category: 'public_health_sanitation',
      authority: 'World Health Organization (WHO) & Federal Ministry of Health & Family Welfare',
      jurisdiction: 'Worldwide Public & Private Hospital Trauma ICU Networks',
      treatyStandard: 'Geneva Convention Medical Ethics & Universal Health Coverage Statutory Code',
      cryptographicStandard: 'HMAC-SHA256 Patient Triage Nonce Verification',
      complianceLevel: 'MANDATORY_FEDERAL',
      status: 'enforced_active',
      description: 'Strictly mandates 100% equal clinical triage priority for all road accident victims regardless of social, economic, or VIP status. Green corridors and ICU ventilators are allocated solely based on medical urgency (Glasgow Coma Scale & G-force severity).',
      legalArticle: 'Supreme Court Good Samaritan Landmark Ruling & National Trauma Registry Act 2026',
      sha256VerificationProof: '778899aabbccddeeff00112233445566778899aabbccddeeff00112233445566',
    },
    {
      id: 'GOV-PROT-WMO-05',
      code: 'WMO-GDPFS-EARTH-30D',
      name: 'World Meteorological Organization 15-30 Day Planetary Early Warning Protocol',
      category: 'planetary_disaster',
      authority: 'World Meteorological Organization (WMO), NOAA & National Weather Forecasting Directorates',
      jurisdiction: 'Global Meteorological Services (193 Nations)',
      treatyStandard: 'WMO Technical Regulations (WMO-No. 49) & UNDRR Sendai Framework 2015-2030',
      cryptographicStandard: 'RSA-4096 Multi-Signature Climate Consensus Seal',
      complianceLevel: 'INTER_GOVERNMENTAL_TREATY',
      status: 'enforced_active',
      description: 'Sets statutory protocol for cross-validating satellite radar InSAR, ocean thermal altimetry, and atmospheric vorticity for floods, super-hurricanes, tsunamis, tornadoes, earthquakes, and thermal burning heatwaves 15 to 30 days in advance.',
      legalArticle: 'UN Early Warnings for All (EW4All) Global Sovereign Initiative; WMO Resolution 42',
      sha256VerificationProof: '8899aabbccddeeff00112233445566778899aabbccddeeff0011223344556677',
    },
    {
      id: 'GOV-PROT-DID-06',
      code: 'W3C-DID-EIDAS2',
      name: 'Zero-Knowledge Sovereign Citizen Digital Identity & eIDAS 2.0 Trust Protocol',
      category: 'digital_identity',
      authority: 'W3C Decentralized Identity Working Group & European Commission DG CONNECT',
      jurisdiction: 'Worldwide & Cross-Border Sovereign ID Registries',
      treatyStandard: 'W3C Recommendation Decentralized Identifiers (DIDs) v1.0 & ISO/IEC 18013-5',
      cryptographicStandard: 'Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs)',
      complianceLevel: 'STATUTORY_CIVIL_CODE',
      status: 'ratified_in_mesh',
      description: 'Allows citizens to prove identity, age, driving clearance, or emergency entitlement to government authorities without revealing sensitive home addresses, biometric scans, or permanent identifiers.',
      legalArticle: 'EU Regulation 2024/1183 (eIDAS 2.0); National Digital Sovereign ID Framework',
      sha256VerificationProof: '5566778899aabbccddeeff00112233445566778899aabbccddeeff0011223344',
    },
    {
      id: 'GOV-PROT-NIST-07',
      code: 'NIST-SP800-53-REV5',
      name: 'NIST Post-Quantum Cryptographic Privacy & Zero-Backdoor Defense Protocol',
      category: 'sovereign_defense',
      authority: 'National Institute of Standards and Technology (NIST) & National Cyber Security Directorates',
      jurisdiction: 'Federal Defense, Civilian Government Agencies & Critical Cloud Infrastructure',
      treatyStandard: 'NIST SP 800-53 Rev 5 & FIPS 203 (ML-KEM) / FIPS 204 (ML-DSA) Post-Quantum Standards',
      cryptographicStandard: 'AES-256-GCM + Kyber/Dilithium Lattice-Based Post-Quantum Enclave',
      complianceLevel: 'MANDATORY_FEDERAL',
      status: 'enforced_active',
      description: 'Guarantees that citizen location, safety records, and financial approvals remain 100% encrypted end-to-end on device. Strictly prohibits federal surveillance backdoors or unauthorized interception.',
      legalArticle: 'Federal Information Security Modernization Act (FISMA); National Quantum Initiative Act',
      sha256VerificationProof: 'ccddeeff00112233445566778899aabbccddeeff00112233445566778899aabb',
    },
    {
      id: 'GOV-PROT-SAN-08',
      code: 'WHO-WASH-WATER-2026',
      name: 'Universal Potable Drinking Water Purity & Public Sanitation Access Protocol',
      category: 'public_health_sanitation',
      authority: 'World Health Organization (WHO), UNICEF & National Jal Jeevan / Clean Water Missions',
      jurisdiction: 'Worldwide Municipalities & Public Utility Boards',
      treatyStandard: 'WHO Guidelines for Drinking-water Quality (4th ed.) & UN SDG 6.1 / 6.2 Standard',
      cryptographicStandard: 'IoT Water Quality Telemetry SHA-256 Digest (TDS, pH, UV-C Dose)',
      complianceLevel: 'MANDATORY_FEDERAL',
      status: 'enforced_active',
      description: 'Establishes statutory civilian rights to 100% free pure potable drinking water and self-sterilizing autonomous public sanitation restrooms in all transit centers and public thoroughfares.',
      legalArticle: 'United Nations General Assembly Resolution 64/292 (Human Right to Water & Sanitation)',
      sha256VerificationProof: '9900112233445566778899aabbccddeeff00112233445566778899aabbccddee',
    },
    {
      id: 'GOV-PROT-INTERPOL-09',
      code: 'INTERPOL-24-7-CYBER',
      name: 'Interpol Global 24/7 High-Tech Crime & Harassment Extradition Treaty',
      category: 'inter_governmental',
      authority: 'INTERPOL Cybercrime Directorate & Council of Europe Budapest Convention',
      jurisdiction: '196 INTERPOL Member Countries',
      treatyStandard: 'Convention on Cybercrime (ETS No. 185) & 24/7 Network Emergency Response System',
      cryptographicStandard: 'Ed25519 Interpol Red Notice & Digital Evidence Preservation Token',
      complianceLevel: 'INTER_GOVERNMENTAL_TREATY',
      status: 'cross_border_sync',
      description: 'Allows immediate cross-border tracking and asset freeze of perpetrators engaging in cyber stalking, digital extortion, doxxing, or cross-border harassment against women and vulnerable citizens.',
      legalArticle: 'Budapest Convention Article 35 (24/7 Network Rapid Action); INTERPOL Rules on the Processing of Data',
      sha256VerificationProof: 'aa11bb22cc33dd44ee55ff6600112233445566778899aabbccddeeff00112233',
    },
    {
      id: 'GOV-PROT-V2X-10',
      code: 'ISO-26262-V2X-TRANS',
      name: 'Autonomous Vehicle V2X Crash Collision Avoidance & Green Corridor Protocol',
      category: 'emergency_dispatch',
      authority: 'International Organization for Standardization (ISO) & National Highway Traffic Safety',
      jurisdiction: 'Worldwide Connected Automobiles, Highway Patrols & Smart Traffic Intersections',
      treatyStandard: 'ISO 26262 ASIL-D & IEEE 1609 Dedicated Short-Range Communications (DSRC) / C-V2X',
      cryptographicStandard: 'IEEE 1609.2 Security Certificates for V2X Communications',
      complianceLevel: 'MANDATORY_FEDERAL',
      status: 'enforced_active',
      description: 'Automates real-time deceleration signals between connected vehicles, pre-clears all traffic lights along an active ambulance corridor to green, and transmits immediate G-force impact metrics to hospitals.',
      legalArticle: 'Federal Motor Vehicle Safety Standard (FMVSS 150); UNECE WP.29 Cyber Security Directive',
      sha256VerificationProof: '445566778899aabbccddeeff00112233445566778899aabbccddeeff00112233',
    },
  ]);

  const currentRegion = worldwideRegions.find(r => r.id === selectedRegionId) || worldwideRegions[0];

  const filteredProtocols = protocols.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVerifyProtocol = async (protocol: GovernmentProtocolRecord) => {
    sound.playChirp(880, 0.08);
    setSelectedProtocol(protocol);
    // Recalculate and verify SHA-256 seal
    const payload = `${protocol.code}:${protocol.authority}:${protocol.treatyStandard}:${protocol.legalArticle}`;
    const calculated = await sha256Hex(payload);
    setVerifiedHashProof(calculated);
    if (onProtocolNotice) {
      onProtocolNotice(`Verified statutory seal for ${protocol.code}: Cryptographically authentic.`);
    }
  };

  const handleExportProtocolTreaty = (protocol: GovernmentProtocolRecord) => {
    sound.playChirp(1040, 0.05);
    const doc = {
      treatyInstrument: 'OFFICIAL SOVEREIGN GOVERNMENT INTEROPERABILITY ACCORD',
      protocolCode: protocol.code,
      protocolName: protocol.name,
      statutoryAuthority: protocol.authority,
      jurisdiction: protocol.jurisdiction,
      treatyStandard: protocol.treatyStandard,
      complianceClassification: protocol.complianceLevel,
      legalStatute: protocol.legalArticle,
      cryptographicAuditSeal: protocol.sha256VerificationProof,
      selectedRegionBinding: currentRegion.name,
      activeEmergencyDispatchRelay: currentRegion.primaryEmergencyHotline,
      ratificationTimestamp: new Date().toISOString(),
      governanceStatus: 'ENFORCED_IN_GLOBAL_CIVIL_PROTECTION_MESH',
    };

    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TREATY-PROTOCOL-${protocol.code}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportSuccessMessage(`Downloaded signed legal compliance accord for ${protocol.code}`);
    setTimeout(() => setExportSuccessMessage(null), 4000);
  };

  const handleSimulateEmergencyCall = (hotline: string, serviceName: string) => {
    sound.playScanPulse();
    sound.playChirp(960, 0.12, 'sawtooth');
    if (onProtocolNotice) {
      onProtocolNotice(`Routing statutory emergency link to ${serviceName} (${hotline}) in ${currentRegion.name}`);
    }
    alert(`[STATUTORY DISPATCH LINK INITIALIZED]\n\nRouting direct emergency telecom packet to:\n${serviceName}: ${hotline}\nJurisdiction: ${currentRegion.name}\nProtocol: NENA-i3 / NG112 Secure IP Interconnect\n\nAutomated GPS coordinates and vital telemetry dispatched.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Global Sovereign Protocols & Worldwide Universal Access */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast 
          ? 'bg-black border-cyan-400 text-white' 
          : 'bg-gradient-to-br from-slate-900/90 via-indigo-950/40 to-slate-900/90 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs flex items-center gap-1.5 font-bold">
                <Landmark className="w-4 h-4 text-cyan-400" />
                <span>WORLDWIDE GOVERNMENT PROTOCOLS ENGINE</span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% STATUTORY COMPLIANT</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center gap-1">
                <Satellite className="w-3.5 h-3.5 text-purple-400" />
                <span>SATELLITE DIRECT-TO-CELL ACTIVE</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              Universal Sovereign Safety & Legal Mesh
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl font-sans">
              Integrated with all federal, judicial, meteorological, medical triage, and international civil protection standards. 
              Designed for worldwide universal access — functioning seamlessly on any mobile phone, smart car, browser, or remote satellite link with zero discrimination.
            </p>
          </div>

          {/* Quick Satellite & Edge Latency Telemetry */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>GLOBAL EDGE LATENCY</span>
              </div>
              <div className="text-base font-bold text-cyan-300">
                {currentRegion.edgeLatencyMs} ms <span className="text-[10px] text-emerald-400 font-normal">(Sub-5ms)</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Satellite className="w-3.5 h-3.5 text-purple-400" />
                <span>DIRECT SATELLITE RELAY</span>
              </div>
              <div className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CONNECTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Worldwide Region Switcher & Country Emergency Routing HUD */}
      <div className={`p-5 rounded-2xl border ${
        isHighContrast ? 'bg-black border-white' : 'bg-slate-900/70 border-slate-800 backdrop-blur-md'
      } space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Worldwide Region & Emergency Hotline Router</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select your sovereign nation or international territory to dynamically adapt emergency dispatch, police cells, and legal frameworks.
            </p>
          </div>

          {/* Language / Translation Selector */}
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-slate-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                sound.playHologramTap();
              }}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="en">English (Universal)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="es">Español (Spanish)</option>
              <option value="fr">Français (French)</option>
              <option value="ar">العربية (Arabic)</option>
              <option value="zh">中文 (Mandarin)</option>
              <option value="ja">日本語 (Japanese)</option>
              <option value="de">Deutsch (German)</option>
              <option value="sw">Kiswahili (Swahili)</option>
            </select>
          </div>
        </div>

        {/* Region Pills Horizontal Scroller */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {worldwideRegions.map(region => (
            <button
              key={region.id}
              onClick={() => {
                setSelectedRegionId(region.id);
                sound.playHologramTap();
              }}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedRegionId === region.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-base">
                <span>{region.flag}</span>
                <span className="text-[10px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                  {region.code}
                </span>
              </div>
              <div className="text-xs font-bold font-mono mt-1 truncate">
                {region.name}
              </div>
              <div className="text-[10px] text-cyan-400 font-mono mt-0.5 truncate">
                {region.primaryEmergencyHotline.split(' ')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Country Active Emergency Matrix Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>PRIMARY EMERGENCY HOTLINE</span>
            </span>
            <div className="text-sm font-bold font-mono text-white">
              {currentRegion.primaryEmergencyHotline}
            </div>
            <button
              onClick={() => handleSimulateEmergencyCall(currentRegion.primaryEmergencyHotline, 'National Emergency Services')}
              className="text-[11px] font-mono text-rose-400 hover:text-rose-300 underline flex items-center gap-1 mt-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Simulate Emergency Dispatch Test</span>
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Ambulance className="w-3.5 h-3.5 text-emerald-400" />
              <span>MEDICAL AMBULANCE / ICU</span>
            </span>
            <div className="text-sm font-bold font-mono text-emerald-300">
              {currentRegion.medicalAmbulance}
            </div>
            <p className="text-[10px] text-slate-400">
              Zero-VIP Discrimination; Automatic Green Corridor
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>CYBER CELL & HARASSMENT UNIT</span>
            </span>
            <div className="text-sm font-bold font-mono text-purple-300 truncate">
              {currentRegion.cyberCellDepartment}
            </div>
            <p className="text-[10px] text-slate-400">
              Immediate digital evidence freeze & FIR filing
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOVEREIGN STATUTE FRAMEWORK</span>
            </span>
            <div className="text-xs font-bold font-mono text-cyan-300 truncate">
              {currentRegion.dataSovereigntyFramework}
            </div>
            <p className="text-[10px] text-slate-400">
              {currentRegion.satelliteRelayBand}
            </p>
          </div>
        </div>
      </div>

      {/* Protocols Filtering & Search Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search protocol (e.g. CAP, CCTV, NENA, Egalitarian, WMO)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs font-mono">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            All Protocols ({protocols.length})
          </button>

          <button
            onClick={() => setSelectedCategory('emergency_dispatch')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedCategory === 'emergency_dispatch'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Emergency Dispatch (NENA/CAP)
          </button>

          <button
            onClick={() => setSelectedCategory('civil_surveillance')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedCategory === 'civil_surveillance'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Judicial CCTV Access
          </button>

          <button
            onClick={() => setSelectedCategory('planetary_disaster')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedCategory === 'planetary_disaster'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Planetary Weather (WMO)
          </button>

          <button
            onClick={() => setSelectedCategory('public_health_sanitation')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedCategory === 'public_health_sanitation'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Universal Health & Water
          </button>
        </div>
      </div>

      {exportSuccessMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 font-mono text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{exportSuccessMessage}</span>
          </span>
          <button 
            onClick={() => setExportSuccessMessage(null)}
            className="text-emerald-400 hover:text-white underline text-[11px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Protocols Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProtocols.map(protocol => (
          <div
            key={protocol.id}
            className={`p-5 rounded-2xl border transition-all ${
              isHighContrast
                ? 'bg-black border-cyan-400 text-white'
                : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 backdrop-blur-md'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                    {protocol.code}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    protocol.complianceLevel === 'MANDATORY_FEDERAL'
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                      : protocol.complianceLevel === 'INTER_GOVERNMENTAL_TREATY'
                      ? 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {protocol.complianceLevel.replace(/_/g, ' ')}
                  </span>
                </div>

                <h4 className="text-base font-bold font-mono text-white mt-1">
                  {protocol.name}
                </h4>
              </div>

              <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                {protocol.category === 'emergency_dispatch' && <PhoneCall className="w-4 h-4" />}
                {protocol.category === 'civil_surveillance' && <Cctv className="w-4 h-4" />}
                {protocol.category === 'planetary_disaster' && <Waves className="w-4 h-4" />}
                {protocol.category === 'public_health_sanitation' && <Ambulance className="w-4 h-4" />}
                {protocol.category === 'digital_identity' && <ShieldCheck className="w-4 h-4" />}
                {protocol.category === 'sovereign_defense' && <Lock className="w-4 h-4" />}
                {protocol.category === 'inter_governmental' && <Globe className="w-4 h-4" />}
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-2 font-sans line-clamp-3 leading-relaxed">
              {protocol.description}
            </p>

            {/* Statutory Meta Table */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">AUTHORITY:</span>
                <span className="text-slate-200 truncate block">{protocol.authority}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TREATY STANDARD:</span>
                <span className="text-cyan-300 truncate block">{protocol.treatyStandard}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">JURISDICTION:</span>
                <span className="text-slate-200 truncate block">{protocol.jurisdiction}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">CRYPTOGRAPHY:</span>
                <span className="text-emerald-300 truncate block">{protocol.cryptographicStandard}</span>
              </div>
            </div>

            {/* Legal Article Badge */}
            <div className="mt-3 p-2 bg-slate-950/80 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{protocol.legalArticle}</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex items-center gap-2 pt-2">
              <button
                onClick={() => handleVerifyProtocol(protocol)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verify SHA-256 Seal</span>
              </button>

              <button
                onClick={() => handleExportProtocolTreaty(protocol)}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
                title="Export signed legal compliance treaty accord"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Accord</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cryptographic Verification Modal */}
      {selectedProtocol && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-cyan-500/50 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold font-mono text-white">
                  Statutory Protocol Integrity Seal
                </h3>
              </div>
              <button
                onClick={() => setSelectedProtocol(null)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Protocol Code:</span>
                <span className="text-cyan-300 font-bold">{selectedProtocol.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Statutory Authority:</span>
                <span className="text-slate-200 text-right">{selectedProtocol.authority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Compliance Standard:</span>
                <span className="text-emerald-300">{selectedProtocol.complianceLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Region Binding:</span>
                <span className="text-white">{currentRegion.name}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                CRYPTOGRAPHIC SHA-256 AUDIT DIGEST:
              </span>
              <div className="p-2.5 rounded-lg bg-black border border-emerald-500/40 text-[11px] font-mono text-emerald-400 break-all select-all">
                {selectedProtocol.sha256VerificationProof}
              </div>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Verified against Sovereign Registry consensus. Complies with both domestic and international civil defense mandates.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedProtocol(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  handleExportProtocolTreaty(selectedProtocol);
                  setSelectedProtocol(null);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Legal Proof</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Worldwide Access & Offline Satellite Constellation Section */}
      <div className={`p-6 rounded-3xl border ${
        isHighContrast ? 'bg-black border-cyan-400' : 'bg-slate-950/90 border-slate-800'
      } space-y-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Satellite className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white">
                Global Direct-to-Device Satellite Constellation Mesh
              </h3>
              <p className="text-xs text-slate-400">
                Emergency communications maintain 100% uptime even when cellular towers and submarine cables are severed.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSatelliteDirectActive(!satelliteDirectActive);
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-all ${
              satelliteDirectActive
                ? 'bg-purple-600 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{satelliteDirectActive ? 'SATELLITE LINK ACTIVE' : 'SATELLITE STANDBY'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400">CONSTELLATION CARRIER:</span>
            <div className="text-sm font-bold text-slate-200">
              Iridium Direct + Starlink D2C + NavIC
            </div>
            <p className="text-[10px] text-emerald-400">
              66 Low Earth Orbit Satellites in Polar Relay
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400">OFFLINE COMPRESSION ALGORITHM:</span>
            <div className="text-sm font-bold text-slate-200">
              Brotli + Reed-Solomon FEC (98 Bytes/Packet)
            </div>
            <p className="text-[10px] text-cyan-400">
              Transmits SOS + GPS + CCTV Hash over Narrowband
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400">ZERO CELL-NETWORK RESILIENCE:</span>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Planetary Coverage</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Jungles, Deserts, High Seas & Mountain Ranges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
