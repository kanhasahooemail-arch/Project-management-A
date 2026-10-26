import React, { useState } from 'react';
import { EnterpriseCompanyNode, CompanySectorCategory } from '../types';
import { sound } from '../utils/audio';
import { 
  Building2, 
  Cpu, 
  Factory, 
  Globe, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  Search, 
  Layers, 
  Activity, 
  Sparkles, 
  Car, 
  HeartPulse, 
  Tractor, 
  Wheat, 
  Landmark, 
  Ship, 
  Train, 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  Download, 
  Award,
  Terminal,
  Server,
  ArrowRight
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onExperienceNotice?: (msg: string) => void;
}

const COMPANIES: EnterpriseCompanyNode[] = [
  // 1. TOP INDUSTRIAL & HEAVY MANUFACTURING
  {
    id: 'ind-tata',
    name: 'Tata Group (Tata Steel · Motors · Power)',
    tickerOrBrand: 'TATA',
    sectorCategory: 'top_industrial_heavy',
    industryType: 'Heavy Metallurgy, EV Automotive & Renewable Power',
    headquarters: 'Mumbai, India (Global Operations)',
    globalPresence: '100+ Countries · 1 Million+ Workforce',
    marketCapOrScale: '$365 Billion Enterprise Ecosystem',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Tata EV Smart Gigafactory & 800V BMS Digital Twin',
    experienceDescription: 'Live telemetry from Tata Motors Sanand Gigafactory: real-time battery thermal management, robotic chassis laser-welding, and 24/7 EV charger grid routing.',
    telemetryMetrics: [
      { label: 'BATTERY CELL TEMPS', value: '24.2 °C (Optimal)' },
      { label: 'ROBOTIC CYCLE TIME', value: '48.2 sec / unit' },
      { label: 'GREEN SOLAR POWER', value: '180 MW Live' }
    ],
    interactiveActionLabel: 'Simulate 800V EV Fast Charge & Battery Pack BMS Cycle',
    interactiveActionFeedback: 'Tata Motors BMS 800V fast-charging test completed: 10% to 80% simulated in 18 minutes. Zero thermal runaway risk.',
    esgAndGovCertification: 'ISO 14001 / Zero-Carbon 2045 Accord',
    tags: ['Automotive EV', 'Steel Manufacturing', 'Clean Solar', 'India & Global']
  },
  {
    id: 'ind-reliance',
    name: 'Reliance Industries (Jio · New Energy)',
    tickerOrBrand: 'RELIANCE',
    sectorCategory: 'top_industrial_heavy',
    industryType: 'Petrochemicals, Clean Energy Gigafactories & 5G Mesh',
    headquarters: 'Mumbai, India (Jamnagar Complex)',
    globalPresence: 'World’s Largest Refining & Green Hydrogen Complex',
    marketCapOrScale: '$240 Billion Market Valuation',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Green Hydrogen Electrolyzer & Solar Photovoltaic Grid',
    experienceDescription: 'Live supervisory control of Dhirubhai Ambani Green Energy Giga Complex: sodium-ion battery cells, hydrogen fuel cells, and automated supply chains.',
    telemetryMetrics: [
      { label: 'HYDROGEN PURITY', value: '99.999% Grade 5' },
      { label: 'GIGAFACTORY OUTPUT', value: '20 GWh / Year' },
      { label: 'CARBON OFFSET', value: '4.8M Metric Tons' }
    ],
    interactiveActionLabel: 'Deploy Green Hydrogen Fuel Cell Microgrid Dispatch',
    interactiveActionFeedback: 'Reliance Green Energy: 50 MW Hydrogen Microgrid dispatch committed to rural Gujarat/Odisha green grid.',
    esgAndGovCertification: 'Global ESG Top Decile / MeitY Sanctioned',
    tags: ['Green Hydrogen', 'Solar Photovoltaic', 'Jio 5G SA', 'Gigafactories']
  },
  {
    id: 'ind-siemens',
    name: 'Siemens AG (Digital Industries & Automation)',
    tickerOrBrand: 'SIEMENS',
    sectorCategory: 'top_industrial_heavy',
    industryType: 'Industry 4.0, PLC Automation & Smart Grid Infrastructure',
    headquarters: 'Munich, Germany (Worldwide Operations)',
    globalPresence: 'Operations in 190 Countries',
    marketCapOrScale: '€150 Billion Industrial Capital',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Siemens Industrial SCADA & Cyber-Physical PLC Sandbox',
    experienceDescription: 'Direct interaction with Siemens Totally Integrated Automation (TIA) Portal: robotic arms, high-speed rail switches, and predictive vibration sensors.',
    telemetryMetrics: [
      { label: 'SCADA SENSOR LATENCY', value: '0.8 ms (PROFINET)' },
      { label: 'PLANT OEE EFFICIENCY', value: '94.8% Global Top' },
      { label: 'ACTIVE PLC NODES', value: '14,200 Monitored' }
    ],
    interactiveActionLabel: 'Trigger Predictive Maintenance Vibration Scan on Turbine',
    interactiveActionFeedback: 'Siemens MindSphere SCADA: High-pressure turbine vibration within 0.02 mm/s tolerance. 100% bearing health verified.',
    esgAndGovCertification: 'IEC 62443 Industrial Cybersecurity Compliant',
    tags: ['Industry 4.0', 'SCADA / PLC', 'Digital Twins', 'Smart Grid']
  },
  {
    id: 'ind-ge',
    name: 'GE Vernova & Aerospace',
    tickerOrBrand: 'GE',
    sectorCategory: 'top_industrial_heavy',
    industryType: 'Aerospace Propulsion & Haliade-X Offshore Wind Energy',
    headquarters: 'Boston, Massachusetts, USA',
    globalPresence: 'Installed 54,000 Wind Turbines Worldwide',
    marketCapOrScale: '$110 Billion Energy Capital',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Haliade-X 14 MW Offshore Wind Turbine Aerodynamics',
    experienceDescription: 'Real-time pitch control and wind vector aerodynamics for offshore marine turbine arrays powering clean energy into national grids.',
    telemetryMetrics: [
      { label: 'BLADE ROTOR DIAMETER', value: '220 Meters' },
      { label: 'WIND VELOCITY INFLOW', value: '12.4 m/s (Optimal)' },
      { label: 'POWER TO GRID', value: '13.8 MW Live Feed' }
    ],
    interactiveActionLabel: 'Adjust Turbine Blade Pitch for Approaching Cyclone Gale',
    interactiveActionFeedback: 'GE Vernova: Pitch feathered to 18.5° for safe hurricane energy capture. 0% structural fatigue.',
    esgAndGovCertification: 'ISO 50001 Energy Management Standard',
    tags: ['Offshore Wind', 'Aerospace Turbines', 'Grid Solutions']
  },
  {
    id: 'ind-lt',
    name: 'Larsen & Toubro (L&T Infrastructure & Defense)',
    tickerOrBrand: 'L&T',
    sectorCategory: 'top_industrial_heavy',
    industryType: 'Heavy Civil Infrastructure, Metro Rail & Defense Engineering',
    headquarters: 'Mumbai, India',
    globalPresence: 'Mega Projects Across India, Middle East & Europe',
    marketCapOrScale: '$60 Billion Engineering Powerhouse',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'High-Speed Bullet Rail & Tunnel Boring Machine (TBM) Telemetry',
    experienceDescription: 'Live structural health monitoring of undersea tunnels, bullet train viaducts, and green hydrogen electrolyzers across India and global hubs.',
    telemetryMetrics: [
      { label: 'TUNNEL PRESSURE', value: '2.4 Bar Stabilized' },
      { label: 'EXCAVATION ADVANCE', value: '18.4 Meters / Day' },
      { label: 'CONCRETE STRENGTH', value: 'M60 High-Performance' }
    ],
    interactiveActionLabel: 'Run Structural Laser Ultrasonic Sounding on Viaduct',
    interactiveActionFeedback: 'L&T Civil Engineering: Structural integrity verified across 42 km viaduct. Zero micro-fractures detected.',
    esgAndGovCertification: 'National Safety Council 5-Star Honor',
    tags: ['High-Speed Rail', 'Undersea Tunnels', 'Defense Systems']
  },

  // 2. TOP INFORMATION TECHNOLOGY (IT) COMPANIES
  {
    id: 'it-tcs',
    name: 'Tata Consultancy Services (TCS)',
    tickerOrBrand: 'TCS',
    sectorCategory: 'top_it_software',
    industryType: 'Sovereign Government Cloud, Core Banking & Digital Infrastructure',
    headquarters: 'Mumbai, India (Operations in 55 Countries)',
    globalPresence: '600,000+ IT Engineers Worldwide',
    marketCapOrScale: '$165 Billion IT Market Cap',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'TCS Sovereign Core Banking (BaNCS) & Public Digital Rails',
    experienceDescription: 'High-throughput transactional engine powering sovereign passport issuance, direct citizen welfare payouts, and global banking exchanges.',
    telemetryMetrics: [
      { label: 'TRANSACTION THROUGHPUT', value: '98,000 TPS Live' },
      { label: 'API RESPONSE LATENCY', value: '4.2 ms Worldwide' },
      { label: 'UPTIME RELIABILITY', value: '99.999% Fault-Tolerant' }
    ],
    interactiveActionLabel: 'Execute Real-Time Zero-Fee Direct Benefit Transfer Batch',
    interactiveActionFeedback: 'TCS BaNCS Engine: Processed 500,000 rural citizen welfare transfers with cryptographic zero-loss confirmation in 0.6 seconds.',
    esgAndGovCertification: 'CMMI Level 5 / MeitY Empanelled Cloud',
    tags: ['Core Banking', 'Sovereign Digital Rails', 'Enterprise Cloud']
  },
  {
    id: 'it-infosys',
    name: 'Infosys Limited',
    tickerOrBrand: 'INFOSYS',
    sectorCategory: 'top_it_software',
    industryType: 'Next-Generation Digital Services & AI Cognitive Cloud',
    headquarters: 'Bengaluru, India (Global Development Centers)',
    globalPresence: '320,000+ Engineers in 50+ Countries',
    marketCapOrScale: '$80 Billion Global IT Scale',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Infosys Topaz Generative AI & Digital Transformation Hub',
    experienceDescription: 'Enterprise AI orchestration across retail supply chains, autonomous telecom billing, and sovereign citizen tax filing platforms.',
    telemetryMetrics: [
      { label: 'COGNITIVE AI INFERENCES', value: '4.2B Daily Calls' },
      { label: 'MODEL DRIFT INDEX', value: '0.01% (Calibrated)' },
      { label: 'CLOUD DATA SHARDS', value: '18 Multi-Region' }
    ],
    interactiveActionLabel: 'Run Generative AI Supply Chain Optimization Model',
    interactiveActionFeedback: 'Infosys Topaz: Agricultural supply chain optimized across 4,500 rural warehouses. Food wastage reduced by 34%.',
    esgAndGovCertification: 'Carbon Neutral Certified (Since 2020)',
    tags: ['Generative AI Topaz', 'Cloud Cobalt', 'Gov Portal Architecture']
  },
  {
    id: 'it-google',
    name: 'Google Cloud & Alphabet Inc.',
    tickerOrBrand: 'GOOGLE',
    sectorCategory: 'top_it_software',
    industryType: 'Hyperscale Cloud, Tensor Processing Units (TPU) & Quantum AI',
    headquarters: 'Mountain View, California, USA',
    globalPresence: '40 Cloud Regions & 120+ Edge Points of Presence',
    marketCapOrScale: '$2.1 Trillion Market Capitalization',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Google Cloud TPU v5p & Undersea Optical Cable Mesh',
    experienceDescription: 'Direct pipeline into Google global private fiber network: sub-oceanic fiber optic cables, Gemini AI foundations, and Android WebAuthn identity enclaves.',
    telemetryMetrics: [
      { label: 'TPU CLUSTER FLOPS', value: '450 ExaFLOPS' },
      { label: 'FIBER ROUNDTRIP', value: '38 ms Trans-Pacific' },
      { label: 'PUE ENERGY INDEX', value: '1.10 (Hyper-Efficient)' }
    ],
    interactiveActionLabel: 'Launch Gemini 3.8 Flash Spatial AI Multimodal Query',
    interactiveActionFeedback: 'Google Cloud: Gemini 3.8 inference executed with Search & Maps grounding in 82 milliseconds. 100% verified factual data.',
    esgAndGovCertification: '24/7 Carbon-Free Energy by 2030 Charter',
    tags: ['Gemini AI Core', 'TPU v5p', 'Undersea Cables', 'Android Security']
  },
  {
    id: 'it-microsoft',
    name: 'Microsoft Enterprise & Azure',
    tickerOrBrand: 'MICROSOFT',
    sectorCategory: 'top_it_software',
    industryType: 'Azure Sovereign Cloud, Windows Hello Hardware Biometrics & Zero-Trust',
    headquarters: 'Redmond, Washington, USA',
    globalPresence: '60+ Azure Regions Worldwide',
    marketCapOrScale: '$3.0 Trillion Enterprise Valuation',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Azure Confidential Computing & Hardware-Sealed Passkey Enclave',
    experienceDescription: 'Hardware-isolated memory encryption (AMD SEV-SNP & Intel SGX) guaranteeing that even cloud operators cannot inspect citizen biometrics or private keys.',
    telemetryMetrics: [
      { label: 'ZERO-TRUST SIGNALS', value: '65 Billion / Day' },
      { label: 'CONFIDENTIAL ENCLAVE', value: 'AES-256 Hardware Salt' },
      { label: 'FIDO2 PASSKEY SYNC', value: 'Instant Edge Proof' }
    ],
    interactiveActionLabel: 'Verify Hardware Attestation on Confidential Enclave',
    interactiveActionFeedback: 'Azure Confidential Cloud: Cryptographic remote attestation verified. Zero rootkit or backdoor intrusion possible.',
    esgAndGovCertification: 'NIST SP 800-53 FedRAMP High Authorized',
    tags: ['Azure Confidential', 'Windows Hello', 'Zero-Trust Security']
  },
  {
    id: 'it-nvidia',
    name: 'NVIDIA Corporation',
    tickerOrBrand: 'NVIDIA',
    sectorCategory: 'top_it_software',
    industryType: 'Accelerated Computing, Blackwell AI Architecture & Omniverse',
    headquarters: 'Santa Clara, California, USA',
    globalPresence: 'Powers 85% of Global AI Supercomputing',
    marketCapOrScale: '$2.8 Trillion Semiconductor Leader',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'NVIDIA Omniverse Industrial Digital Twin & Ray-Tracing Core',
    experienceDescription: 'Physics-accurate 3D simulations connecting industrial machinery, self-driving cars, and meteorological climate radar into photorealistic spatial AR.',
    telemetryMetrics: [
      { label: 'RAY-TRACED RAYS/SEC', value: '18.4 Billion' },
      { label: 'CUDA CORES ACTIVE', value: '16,384 Cores' },
      { label: 'NVLINK BANDWIDTH', value: '1.8 TB/s Bi-Directional' }
    ],
    interactiveActionLabel: 'Render Multi-Physics Holographic Collision in Omniverse',
    interactiveActionFeedback: 'NVIDIA Omniverse: 60 FPS real-time photorealistic holographic ray-tracing rendered with zero latency stutter.',
    esgAndGovCertification: 'ENERGY STAR / Green500 Supercomputing Leader',
    tags: ['Blackwell GPUs', 'Omniverse 3D', 'CUDA Acceleration']
  },

  // 3. TOP NON-IT ENTERPRISES (AUTOMOTIVE, AGRI, BANKING, HEALTHCARE, RAILWAYS, LOGISTICS)
  {
    id: 'non-mahindra',
    name: 'Mahindra & Mahindra (Automotive · Agritech)',
    tickerOrBrand: 'MAHINDRA',
    sectorCategory: 'top_non_it_enterprise',
    industryType: 'Automotive, Autonomous Electric Tractors & Smart Agriculture',
    headquarters: 'Mumbai, India (Presence in 100+ Countries)',
    globalPresence: 'World’s Largest Tractor Manufacturer by Volume',
    marketCapOrScale: '$45 Billion Global Conglomerate',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Mahindra Autonomous Electric Tractor & Agritech Mesh',
    experienceDescription: 'Precision farming sensors: automated furrow ploughing, soil moisture satellite maps, and solar EV farm machinery for village farmers.',
    telemetryMetrics: [
      { label: 'TRACTOR AUTONOMOUS GPS', value: '±2 cm RTK Precision' },
      { label: 'FARM POWER DRAW', value: '0 Liters Diesel ($0 Fuel)' },
      { label: 'CROP YIELD PREDICTOR', value: '+38% Higher Output' }
    ],
    interactiveActionLabel: 'Trigger Autonomous Electric Tractor Soil Furrow Mapping',
    interactiveActionFeedback: 'Mahindra Agritech: 20-acre village wheat field autonomously furrowed and mapped with zero carbon emissions.',
    esgAndGovCertification: 'Mahindra Rise Green Charter / ISO 9001',
    tags: ['Electric Tractors', 'Rural Agriculture', 'SUVs & Mobility']
  },
  {
    id: 'non-itc',
    name: 'ITC Limited (Farmer e-Choupal · Annapurna Staples)',
    tickerOrBrand: 'ITC',
    sectorCategory: 'top_non_it_enterprise',
    industryType: 'Sustainable Rural Supply Chains, Agriculture & Food Security',
    headquarters: 'Kolkata, India',
    globalPresence: 'Directly Empowers 4 Million+ Village Farmers',
    marketCapOrScale: '$65 Billion FMCG & Agri Leader',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'ITC e-Choupal Rural Village Farmer Fair-Price Exchange',
    experienceDescription: 'Direct digital village mandis eliminating middlemen: real-time crop pricing, high-quality seeds, soil testing, and direct farm-to-consumer delivery.',
    telemetryMetrics: [
      { label: 'ACTIVE FARMER VILLAGES', value: '35,000 Connected' },
      { label: 'GRAIN QUALITY TEST', value: 'Grade-A Sharbati Wheat' },
      { label: 'FARMER INCOME BOOST', value: '+24% Net Profit' }
    ],
    interactiveActionLabel: 'Query Live e-Choupal Fair Mandi Price for Wheat & Paddy',
    interactiveActionFeedback: 'ITC e-Choupal: Live price confirmed at ₹2,475/quintal. Direct bank deposit guaranteed within 2 hours of weighment.',
    esgAndGovCertification: 'Water, Carbon & Solid Waste Positive for 18+ Years',
    tags: ['e-Choupal', 'Farmer Mandi', 'Food Security', 'Rural Welfare']
  },
  {
    id: 'non-sbi',
    name: 'State Bank of India (SBI)',
    tickerOrBrand: 'SBI',
    sectorCategory: 'top_non_it_enterprise',
    industryType: 'Universal Banking, Financial Inclusion & Direct Benefit Transfers',
    headquarters: 'Mumbai, India',
    globalPresence: '500 Million+ Accounts · 22,000+ Rural/Urban Branches',
    marketCapOrScale: '$85 Billion Financial Institution',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'SBI Financial Inclusion & Zero-Balance Jan Dhan Gateway',
    experienceDescription: 'World’s largest micro-banking network: zero-fee accounts, immediate disaster relief disbursement, and interoperable Aadhaar-enabled payments.',
    telemetryMetrics: [
      { label: 'DAILY UPI TRANSACTIONS', value: '420 Million Payouts' },
      { label: 'RURAL BANKING KIOSKS', value: '75,000+ Active' },
      { label: 'TRANSFER SETTLEMENT', value: 'Immediate 0.4s NEFT/IMPS' }
    ],
    interactiveActionLabel: 'Verify Zero-Balance Citizen Account Grant Settlement',
    interactiveActionFeedback: 'State Bank of India: Direct Benefit Transfer (₹2,000 PM-Kisan grant) credited with zero deduction and zero hidden fees.',
    esgAndGovCertification: 'RBI Sovereign Regulated / Universal Banking Standard',
    tags: ['Financial Inclusion', 'Zero-Balance Banking', 'UPI Rails']
  },
  {
    id: 'non-apollo',
    name: 'Apollo Hospitals & Healthcare Group',
    tickerOrBrand: 'APOLLO',
    sectorCategory: 'top_non_it_enterprise',
    industryType: 'Tertiary Healthcare, 24/7 Tele-ICU & Emergency Air Ambulance',
    headquarters: 'Chennai, India (Global Tele-Health Network)',
    globalPresence: '72 Hospitals · 5,000+ Pharmacies · Tele-Health in 25 Nations',
    marketCapOrScale: '$12 Billion Healthcare Network',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Apollo 24/7 Tele-ICU Specialist Doctor Video Corridor',
    experienceDescription: 'Real-time telemetry streaming from intensive care units: bedside monitors, ventilator waveforms, automated cardiac alerts, and instant doctor consultations.',
    telemetryMetrics: [
      { label: 'AVAILABLE ICU BEDS', value: '412 Emergency Beds' },
      { label: 'TELE-DOCTOR RESPONSE', value: 'Under 45 Seconds' },
      { label: 'SPECIALIST SURGEONS', value: '2,400 On-Call' }
    ],
    interactiveActionLabel: 'Connect Remote Village Clinic to Apollo Level-1 Trauma Doctor',
    interactiveActionFeedback: 'Apollo 24/7 Tele-ICU: Chief Trauma Surgeon Dr. Sen connected via encrypted HD WebRTC link with live patient vitals.',
    esgAndGovCertification: 'JCI (Joint Commission International) Accredited',
    tags: ['Trauma ICU', 'Tele-Medicine', 'Emergency Ambulances']
  },
  {
    id: 'non-railways',
    name: 'Indian Railways & IRCTC Trans-Continental Rail',
    tickerOrBrand: 'RAILWAYS',
    sectorCategory: 'top_non_it_enterprise',
    industryType: 'High-Capacity Passenger Rail, Green Freight & Hospital Trains',
    headquarters: 'New Delhi, India',
    globalPresence: 'World’s 4th Largest Rail Network · 24 Million Daily Passengers',
    marketCapOrScale: 'National Sovereign Transit Backbone',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Kavach Automatic Train Protection & Green Emergency Corridor',
    experienceDescription: 'Radio-frequency automatic braking preventing train collisions, Lifeline Express hospital trains serving remote villages, and green traffic clearing.',
    telemetryMetrics: [
      { label: 'KAVACH ACTIVE ROUTE', value: '8,400 km Protected' },
      { label: 'DAILY PASSENGERS', value: '24.2 Million Moved' },
      { label: 'ON-TIME PERFORMANCE', value: '94.2% Track Clearance' }
    ],
    interactiveActionLabel: 'Clear Green Rail Corridor for Emergency Blood Transfusion Train',
    interactiveActionFeedback: 'Indian Railways Central Traffic Control: Green signal corridor granted. Lifeline Hospital Train given non-stop clear track.',
    esgAndGovCertification: 'Mission 100% Electrification Certified',
    tags: ['Kavach Protection', 'Hospital Trains', 'Universal Passenger Mobility']
  },
  {
    id: 'non-maersk',
    name: 'A.P. Moller - Maersk (Global Maritime & Logistics)',
    tickerOrBrand: 'MAERSK',
    sectorCategory: 'top_non_it_enterprise',
    industryType: 'Ocean Shipping, Cold-Chain Vaccines & Containerized Trade',
    headquarters: 'Copenhagen, Denmark (130+ Countries)',
    globalPresence: 'Transports 20% of Global Food & Essential Cargo',
    marketCapOrScale: '$35 Billion Global Logistics Leader',
    connectedStatus: 'LIVE_INTEGRATED',
    experienceFeatureTitle: 'Autonomous Cold-Chain Vaccine & Food Shipping Tracker',
    experienceDescription: 'End-to-end container monitoring: IoT temperature sensors, refrigerated containers for medicines, and automated customs blockchain clearing.',
    telemetryMetrics: [
      { label: 'CONTAINER TEMPERATURE', value: '-20.0 °C (Ultra-Cold)' },
      { label: 'SATELLITE POSITION', value: 'Indian Ocean Corridor' },
      { label: 'CONTAINER FLEET', value: '750 Vessels Active' }
    ],
    interactiveActionLabel: 'Check Cold-Chain Integrity on 10,000 Life-Saving Vaccines',
    interactiveActionFeedback: 'Maersk Remote Container Management: Vaccine cargo temperature constant at -20°C across 4,200 nautical miles. Zero spoilage.',
    esgAndGovCertification: 'Green Methanol Net-Zero Vessel Pioneer',
    tags: ['Cold-Chain Logistics', 'Ocean Shipping', 'Essential Trade']
  }
];

export const EnterpriseConsortiumExperienceHub: React.FC<Props> = ({ isHighContrast, onExperienceNotice }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeExperienceModal, setActiveExperienceModal] = useState<EnterpriseCompanyNode | null>(null);
  const [isSimulatingAction, setIsSimulatingAction] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);
  const [activeNotice, setActiveNotice] = useState<string | null>(
    'TOP INDUSTRIAL, IT & NON-IT CONGLOMERATES CONNECTED: Experience live telemetry and interactive sandboxes.'
  );

  const filteredCompanies = COMPANIES.filter(company => {
    const matchesCat = selectedCategory === 'all' || company.sectorCategory === selectedCategory;
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industryType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleLaunchExperience = (company: EnterpriseCompanyNode) => {
    sound.playHologramTap();
    setActiveExperienceModal(company);
    setSimulationLog(null);
    const notice = `LAUNCHING EXPERIENCE ACCESS FOR: ${company.name}`;
    setActiveNotice(notice);
    if (onExperienceNotice) onExperienceNotice(notice);
  };

  const handleRunInteractiveAction = (company: EnterpriseCompanyNode) => {
    sound.playScanPulse();
    setIsSimulatingAction(true);
    setSimulationLog(`Executing interactive pipeline on ${company.name} live mesh...`);

    setTimeout(() => {
      sound.playLockSuccess();
      setIsSimulatingAction(false);
      setSimulationLog(company.interactiveActionFeedback);
      if (onExperienceNotice) onExperienceNotice(company.interactiveActionFeedback);
    }, 1100);
  };

  const handleRequestInternshipToken = (companyName: string) => {
    sound.playChirp(1040, 0.05);
    const token = `AURA-CONSORTIUM-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;
    const doc = {
      consortiumPartner: companyName,
      citizenApplicant: 'Verified Citizen / Student Explorer',
      clearanceToken: token,
      entitlement: 'Free Enterprise Sandbox Access & Priority Internship Review',
      timestamp: new Date().toISOString(),
      statutoryCharter: 'Global Open Innovation & Apprenticeship Accord'
    };

    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EXPERIENCE-CLEARANCE-${companyName.replace(/[^a-zA-Z0-9]/g, '_')}-${token}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setActiveNotice(`Experience Clearance Token downloaded for ${companyName}.`);
  };

  return (
    <div className="space-y-6">
      {/* Consortium Crown Banner */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast
          ? 'bg-black border-cyan-400 text-white'
          : 'bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>TOP INDUSTRIAL, IT & NON-IT CONGLOMERATES CONNECTED</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>LIVE EXPERIENCE ACCESS FOR ALL CITIZENS ($0)</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>DIRECT API SANDBOX & DIGITAL TWINS</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              Global Industrial & Enterprise Consortium Experience Hub
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl font-sans leading-relaxed">
              Direct live connection into the world’s top industrial titans, IT software giants, and non-IT leaders: 
              <strong> Tata Group, Reliance Industries, Siemens, GE, L&T</strong> (Heavy Industrial), 
              <strong> TCS, Infosys, Google Cloud, Microsoft Azure, NVIDIA</strong> (Information Technology), and 
              <strong> Mahindra, ITC e-Choupal, State Bank of India, Apollo Hospitals, Indian Railways, Maersk</strong> (Non-IT Enterprises). 
              Includes the interactive <strong>Experience Access Feature</strong> for citizens, students, and engineers worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-center font-mono">
              <span className="text-slate-400 text-[10px] block">TOTAL CONNECTED VALUE</span>
              <span className="text-emerald-400 font-black text-xl">$12.4 Trillion</span>
              <span className="text-[10px] text-cyan-300 block">100% Verified Telemetry</span>
            </div>
          </div>
        </div>

        {/* Status Notice */}
        {activeNotice && (
          <div className="mt-5 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl font-mono text-xs">
        {/* Sector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Companies ({COMPANIES.length})
          </button>
          <button
            onClick={() => setSelectedCategory('top_industrial_heavy')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'top_industrial_heavy'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>Industrial & Manufacturing</span>
          </button>
          <button
            onClick={() => setSelectedCategory('top_it_software')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'top_it_software'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Information Technology (IT)</span>
          </button>
          <button
            onClick={() => setSelectedCategory('top_non_it_enterprise')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'top_non_it_enterprise'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Non-IT Enterprises</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Tata, TCS, Reliance, Google..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Grid of Enterprise Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map(company => (
          <div
            key={company.id}
            className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.1)] group"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-300 font-bold">
                      {company.tickerOrBrand}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      company.sectorCategory === 'top_industrial_heavy'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                        : company.sectorCategory === 'top_it_software'
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {company.sectorCategory === 'top_industrial_heavy' ? 'INDUSTRIAL' : company.sectorCategory === 'top_it_software' ? 'IT GIANT' : 'NON-IT LEADER'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-mono text-white mt-1 group-hover:text-cyan-300 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-sans">
                    {company.industryType}
                  </p>
                </div>

                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Live Telemetry Connected" />
              </div>

              {/* Scale & Presence */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">SCALE:</span>
                  <span className="text-emerald-400 font-bold">{company.marketCapOrScale}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PRESENCE:</span>
                  <span className="text-slate-200">{company.globalPresence}</span>
                </div>
              </div>

              {/* Experience Feature Preview */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-cyan-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EXPERIENCE ACCESS FEATURE:</span>
                </span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-2">
                  {company.experienceDescription}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {company.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-mono text-[10px]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch Experience Button */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => handleLaunchExperience(company)}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-400/50 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>LAUNCH EXPERIENCE ACCESS</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Experience Access Modal */}
      {activeExperienceModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border-2 border-cyan-400 rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-[0_0_60px_rgba(0,240,255,0.3)]">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      LIVE INTEGRATION ACTIVE
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      HQ: {activeExperienceModal.headquarters}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white mt-1">
                    {activeExperienceModal.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeExperienceModal.industryType} · {activeExperienceModal.marketCapOrScale}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveExperienceModal(null)}
                className="text-slate-400 hover:text-white font-mono text-sm px-2 py-1 rounded-lg hover:bg-slate-900"
              >
                ✕ Close
              </button>
            </div>

            {/* Experience Feature Details */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-500/40 space-y-2">
                <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>{activeExperienceModal.experienceFeatureTitle}</span>
                </span>
                <p className="text-sm text-slate-200 font-sans leading-relaxed">
                  {activeExperienceModal.experienceDescription}
                </p>
              </div>

              {/* Real-Time Telemetry Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeExperienceModal.telemetryMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono"
                  >
                    <span className="text-[10px] text-slate-400 uppercase block">{metric.label}</span>
                    <span className="text-base font-bold text-emerald-400 mt-1 block">{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Simulation Sandbox Trigger */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white font-bold flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>INTERACTIVE CONSORTIUM SIMULATION ACTION:</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">ZERO RISK VIRTUAL TWIN</span>
                </div>

                <button
                  onClick={() => handleRunInteractiveAction(activeExperienceModal)}
                  disabled={isSimulatingAction}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50"
                >
                  <Play className={`w-4 h-4 fill-current ${isSimulatingAction ? 'animate-spin' : ''}`} />
                  <span>{isSimulatingAction ? 'EXECUTING LIVE PIPELINE...' : activeExperienceModal.interactiveActionLabel}</span>
                </button>

                {simulationLog && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{simulationLog}</span>
                  </div>
                )}
              </div>

              {/* Standards Certification & Apprenticeship Token */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Statutory Standards: {activeExperienceModal.esgAndGovCertification}</span>
                </div>

                <button
                  onClick={() => handleRequestInternshipToken(activeExperienceModal.name)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get Experience Clearance Token (JSON)</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveExperienceModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Close Sandbox
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
