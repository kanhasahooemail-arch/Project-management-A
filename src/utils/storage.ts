import { ApprovalRecord, ConnectedDevice, HabitItem, EncryptedPacket } from '../types';

const STORAGE_KEY_APPROVALS = 'aura_nexus_approvals_v1';
const STORAGE_KEY_HABITS = 'aura_nexus_habits_v1';
const STORAGE_KEY_DEVICES = 'aura_nexus_devices_v1';
const STORAGE_KEY_PACKETS = 'aura_nexus_packets_v1';
const STORAGE_KEY_SETTINGS = 'aura_nexus_settings_v1';

export const INITIAL_APPROVALS: ApprovalRecord[] = [
  {
    id: 'GOI-MEITY-9011',
    sector: 'government',
    title: 'Government of India MeitY Sovereign App Sanction & Zero-Tolerance Anti-Obscenity Directive',
    applicant: 'AURA NEXUS National Sovereign Core (Bharat Operational License)',
    jurisdiction: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
    status: 'approved',
    timestamp: '2026-10-06 00:00:00 IST',
    securityHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    verifiedBy: 'Joint Secretary (Cyber Law & Security), Government of India',
    details: 'Official Gazette Sanction under IT Act 2000 & Intermediary Guidelines Rules 2021. Mandates 100% zero-tolerance censorship against any 18+ adult material, pornography photos/videos, or obscene content with automated session lock, hardware ban, and police arrest warrant filing.',
    complianceScore: 100.0,
  },
  {
    id: 'GOI-MHA-1930',
    sector: 'government',
    title: 'MHA Indian Cyber Crime Coordination Centre (I4C) & ERSS-112 Automated Arrest Interconnect',
    applicant: 'National Cyber Crime Emergency Protocol Directorate',
    jurisdiction: 'Ministry of Home Affairs (MHA), Government of India',
    status: 'approved',
    timestamp: '2026-10-05 23:55:00 IST',
    securityHash: '4e89f1092ab5c9018442da91092eacbf771029ba884109ca8812304910ea09bb',
    verifiedBy: 'Director General of Police, National Cyber Crime Coordination Centre (I4C)',
    details: 'Statutory clearance establishing direct API interconnect with National Cyber Crime Reporting Portal (Helpline 1930) and Emergency Response Support System (ERSS-112). Automatically dispatches digital forensic dossiers to nearest Police Stations for rapid suspect apprehension.',
    complianceScore: 100.0,
  },
  {
    id: 'GOI-DPDP-2023',
    sector: 'government',
    title: 'Digital Personal Data Protection Act 2023 (DPDP) Sovereign Citizen Privacy & Child Protection Accord',
    applicant: 'Data Protection Board of India Compliance Division',
    jurisdiction: 'Data Protection Board of India / MeitY',
    status: 'approved',
    timestamp: '2026-10-05 23:30:00 IST',
    securityHash: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
    verifiedBy: 'Chairperson, Data Protection Board of India',
    details: 'Full statutory compliance under DPDP Act Sections 6, 8 & 9. Strict zero-tracking of children, zero third-party telemetry, 100% client-side hardware enclave encryption, and sovereign data residency guarantee.',
    complianceScore: 100.0,
  },
  {
    id: 'TRANS-MED-88102',
    sector: 'transportation',
    title: 'Universal Road Accident Rescue & Egalitarian Hospital Ambulance Green Corridor Clearance',
    applicant: 'National Highway Trauma Rescue & Universal Emergency Medicine Network (Golden Hour Core)',
    jurisdiction: 'Ministry of Road Transport, Highways & National Health Authority',
    status: 'approved',
    timestamp: '2026-10-05 22:30:00 UTC',
    securityHash: '8b72aa9110efca4901ba34da771029ba884109ca8812304910ea09bb771033aa',
    verifiedBy: 'Sovereign Emergency Medical Services & V2X Traffic Authority',
    details: 'Statutory egalitarian clearance guaranteeing 100% equal medical priority for normal citizens and VIPs without discrimination. Mandates automated crash detection (>35G), sub-3 minute ALS ambulance routing with automated traffic Green Corridors, and instant Trauma Doctor telemetry.',
    complianceScore: 100.0,
  },
  {
    id: 'GOV-CCTV-99101',
    sector: 'government',
    title: 'Universal Emergency CCTV Mesh Access & Harassment Prevention Sanction',
    applicant: 'Women & Girls National Public Safety Emergency Network (Nirbhaya Core)',
    jurisdiction: 'Ministry of Home Affairs & National Cyber Crime Directorate',
    status: 'approved',
    timestamp: '2026-10-05 22:15:00 UTC',
    securityHash: '4e89f1092ab5c9018442da91092eacbf771029ba884109ca8812304910ea09bb',
    verifiedBy: 'Sovereign Emergency Authorization Council (Sec 112 Mandate)',
    details: 'Pre-approved statutory clearance granting real-time optical access to municipal, transit, commercial, and residential CCTV camera networks during distress emergencies anywhere, anytime. Video evidence is encrypted client-side and routed exclusively to Police Control & Cyber Crime Cell.',
    complianceScore: 100.0,
  },
  {
    id: 'FIN-55102',
    sector: 'financial',
    title: 'Universal Citizen Financial Empowerment & Green Energy Grant',
    applicant: 'Kanha Sahoo (Citizen Wallet ID: 0x8F9a...44A2)',
    jurisdiction: 'National Sovereign Treasury & Inclusive Fintech Council',
    status: 'approved',
    timestamp: '2026-10-05 21:10:00 UTC',
    securityHash: '3c89b37c89f074d618d3600f91a92e624c9c7f991f868202b28913340f1a7d6e',
    verifiedBy: 'Sovereign Treasury Liquidity Smart Contract #09',
    details: 'Zero-collateral micro-empowerment grant of $5,000 for local clean tech adoption and sustainable venture development with automatic dividend distribution.',
    complianceScore: 99.8,
  },
  {
    id: 'EDU-33041',
    sector: 'education',
    title: 'Global Accredited Holographic Spatial Curriculum & Degree Attestation',
    applicant: 'All-Citizens Open Learning Consortium',
    jurisdiction: 'International Council of Higher Education & Spatial Learning',
    status: 'approved',
    timestamp: '2026-10-05 20:30:15 UTC',
    securityHash: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
    verifiedBy: 'Global Education Verifiable Credentials Network',
    details: 'Universal spatial literacy accreditation recognized across 140 countries. Provides full tuition waiver and holographic classroom access.',
    complianceScore: 100.0,
  },
  {
    id: 'TRANS-99014',
    sector: 'transportation',
    title: 'Universal High-Speed Transit & Clean Mobility Pass (Zero-Fare Access)',
    applicant: 'National Public Commuter Network (Every Citizen)',
    jurisdiction: 'Federal Autonomous Mobility & Public Transit Administration',
    status: 'approved',
    timestamp: '2026-10-05 19:55:00 UTC',
    securityHash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    verifiedBy: 'Inter-City V2X Transit Gateways & Rail Network',
    details: 'Unlimited nationwide zero-emission high-speed rail, magnetic levitation, and electric bus access with accessibility priority boarding.',
    complianceScore: 98.9,
  },
  {
    id: 'WEL-12004',
    sector: 'universal_welfare',
    title: 'Essential Universal Healthcare & Clean Living Attestation',
    applicant: 'Universal Public Welfare & Preventive Health Care Registry',
    jurisdiction: 'World Health & Public Wellbeing Sovereign Organization',
    status: 'approved',
    timestamp: '2026-10-05 18:45:20 UTC',
    securityHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    verifiedBy: 'Universal Health Ledger Biometric Attestation Node',
    details: 'Guaranteed 100% covered telemedicine, biometrics monitoring, preventive medicine, clean nutrition, and emergency spatial evacuation.',
    complianceScore: 99.7,
  },
  {
    id: 'GOV-78902',
    sector: 'government',
    title: 'National Digital Citizen Sovereign Credential',
    applicant: 'Kanha Sahoo (ID: IND-2026-X99)',
    jurisdiction: 'Federal Cyber Infrastructure & Digital Identity Authority',
    status: 'approved',
    timestamp: '2026-10-05 18:22:00 UTC',
    securityHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    verifiedBy: 'Sovereign Consensus Node Alpha-1',
    details: 'Zero-Knowledge cryptographic identity verification confirmed with post-quantum signature.',
    complianceScore: 99.4,
  },
  {
    id: 'SGOV-44109',
    sector: 'semi_government',
    title: 'Smart Municipal Renewable Energy Grid Interconnect',
    applicant: 'Helios Eco-Power Consortium (Semi-Gov Utility)',
    jurisdiction: 'Metropolitan Energy & Clean Mobility Board',
    status: 'approved',
    timestamp: '2026-10-05 19:40:12 UTC',
    securityHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    verifiedBy: 'Regional Smart Grid Dispatcher',
    details: 'Bi-directional microgrid power exchange authorization with automated carbon credit telemetry.',
    complianceScore: 97.8,
  },
  {
    id: 'AUTO-90184',
    sector: 'automobile',
    title: 'Autonomous V2X Mesh Navigation & High-Speed Highway Clearance',
    applicant: 'AURA Cyber-Vehicle Fleet (Model-X HyperDrive)',
    jurisdiction: 'National Department of Autonomous Transportation',
    status: 'approved',
    timestamp: '2026-10-05 20:15:45 UTC',
    securityHash: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    verifiedBy: 'V2X Low-Latency Roadside Optical Beacon 402',
    details: 'Sub-3ms collision avoidance handshake active; battery thermal envelope nominal at 28°C.',
    complianceScore: 99.9,
  },
  {
    id: 'ENT-61233',
    sector: 'enterprise_commerce',
    title: 'Global Cross-Border Escrow & Buying/Selling Partnership Notarization',
    applicant: 'Apex Quantum Trade Corp & Verified Suppliers',
    jurisdiction: 'International Commercial Arbitrage & Secure Escrow Union',
    status: 'approved',
    timestamp: '2026-10-05 21:04:30 UTC',
    securityHash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    verifiedBy: 'Zero-Trust Smart Contract Engine #88',
    details: 'Multi-sig asset tokenization verified; automated tax split and tamper-evident ledger committed.',
    complianceScore: 98.2,
  },
  {
    id: 'GOV-81003',
    sector: 'government',
    title: 'Spatial Holographic Urban Sensor Infrastructure Permit',
    applicant: 'Nexus Telecommunications Infrastructure Corp',
    jurisdiction: 'Municipal Civil Works & Public Telemetry Dept',
    status: 'pending',
    timestamp: '2026-10-05 22:50:00 UTC',
    securityHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    verifiedBy: 'Pending Multi-Party Cryptographic Signatures',
    details: 'Awaiting secondary environmental impact approval on optical sensor dispersion frequency.',
    complianceScore: 92.1,
  },
];

export const INITIAL_HABITS: HabitItem[] = [
  {
    id: 'h1',
    title: 'Circadian Sunlight & Visual Calibration',
    category: 'vitality',
    target: '20 min outdoor photon exposure',
    current: 20,
    max: 20,
    unit: 'min',
    completed: true,
    streakDays: 14,
  },
  {
    id: 'h2',
    title: 'Deep Spatial Focus (Neural Flow State)',
    category: 'focus',
    target: '90 min high-cognition block',
    current: 65,
    max: 90,
    unit: 'min',
    completed: false,
    streakDays: 8,
  },
  {
    id: 'h3',
    title: 'Electrolyte & Micro-Hydration Target',
    category: 'vitality',
    target: '2500 ml structured water',
    current: 2100,
    max: 2500,
    unit: 'ml',
    completed: false,
    streakDays: 22,
  },
  {
    id: 'h4',
    title: 'Automobile Zero-Emission Mobility Mileage',
    category: 'mobility',
    target: '35 km EV regenerative travel',
    current: 35,
    max: 35,
    unit: 'km',
    completed: true,
    streakDays: 19,
  },
  {
    id: 'h5',
    title: 'Civic Micro-Task & Identity Attestation',
    category: 'civic',
    target: 'Daily security handshake check',
    current: 1,
    max: 1,
    unit: 'check',
    completed: true,
    streakDays: 30,
  },
];

export const INITIAL_DEVICES: ConnectedDevice[] = [
  {
    id: 'dev-1',
    name: 'Android Quantum Phone (Pixel / Galaxy)',
    type: 'android',
    status: 'synced',
    latencyMs: 4,
    batteryLevel: 88,
    lastSync: 'Just now',
    encryptionKeyFingerprint: 'SHA256:7a9f...4c1e',
  },
  {
    id: 'dev-2',
    name: 'Spatial AR Visor / Smart Hologram Lens',
    type: 'ar_visor',
    status: 'synced',
    latencyMs: 2,
    batteryLevel: 94,
    lastSync: '1s ago',
    encryptionKeyFingerprint: 'SHA256:bb12...99ee',
  },
  {
    id: 'dev-3',
    name: 'Connected Vehicle Infotainment & V2X Unit',
    type: 'automobile',
    status: 'synced',
    latencyMs: 6,
    batteryLevel: 99,
    lastSync: '5s ago',
    encryptionKeyFingerprint: 'SHA256:fe88...3120',
  },
  {
    id: 'dev-4',
    name: 'Encrypted Workstation / Desktop Terminal',
    type: 'desktop',
    status: 'synced',
    latencyMs: 1,
    batteryLevel: 100,
    lastSync: 'Just now',
    encryptionKeyFingerprint: 'SHA256:09aa...df43',
  },
];

export function loadApprovals(): ApprovalRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_APPROVALS);
    return raw ? JSON.parse(raw) : INITIAL_APPROVALS;
  } catch {
    return INITIAL_APPROVALS;
  }
}

export function saveApprovals(records: ApprovalRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY_APPROVALS, JSON.stringify(records));
  } catch {
    // storage limit or disabled
  }
}

export function loadHabits(): HabitItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HABITS);
    return raw ? JSON.parse(raw) : INITIAL_HABITS;
  } catch {
    return INITIAL_HABITS;
  }
}

export function saveHabits(habits: HabitItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY_HABITS, JSON.stringify(habits));
  } catch {
    //
  }
}

export function loadDevices(): ConnectedDevice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DEVICES);
    return raw ? JSON.parse(raw) : INITIAL_DEVICES;
  } catch {
    return INITIAL_DEVICES;
  }
}

export function saveDevices(devices: ConnectedDevice[]) {
  try {
    localStorage.setItem(STORAGE_KEY_DEVICES, JSON.stringify(devices));
  } catch {
    //
  }
}
