import React, { useState } from 'react';
import { 
  AreaType, 
  WelfarePillar, 
  WelfareResourceNode, 
  EmergencyHelpRequest 
} from '../types';
import { sound } from '../utils/audio';
import { 
  Home, 
  HeartPulse, 
  Utensils, 
  Droplets, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Search, 
  AlertTriangle, 
  Clock, 
  Send, 
  Plus, 
  Download, 
  Share2, 
  Building2, 
  TreePine, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  Truck, 
  Calendar, 
  ChevronRight,
  Ambulance,
  BadgeAlert,
  Award,
  Zap,
  Wheat
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onWelfareAlert?: (msg: string) => void;
}

export const VillageUrbanWelfareGrid: React.FC<Props> = ({ isHighContrast, onWelfareAlert }) => {
  const [selectedArea, setSelectedArea] = useState<AreaType | 'all'>('all');
  const [selectedPillar, setSelectedPillar] = useState<WelfarePillar | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Emergency Help Dispatch Modal State
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [helpApplicantName, setHelpApplicantName] = useState<string>('');
  const [helpPhone, setHelpPhone] = useState<string>('');
  const [helpArea, setHelpArea] = useState<AreaType>('rural_village');
  const [helpPillar, setHelpPillar] = useState<WelfarePillar>('food_nutrition');
  const [helpDetails, setHelpDetails] = useState<string>('Urgent dry ration and baby milk needed for elderly grandparents and 2 children.');
  const [helpFamilyCount, setHelpFamilyCount] = useState<number>(4);
  const [helpUrgency, setHelpUrgency] = useState<'immediate_critical' | 'same_day_relief'>('immediate_critical');
  const [helpLocation, setHelpLocation] = useState<string>('Village Rampur Block #3, Near Panchayat Hall');
  const [recentDispatchedRequest, setRecentDispatchedRequest] = useState<EmergencyHelpRequest | null>(null);

  // Directory of Free Welfare & Relief Resources across Rural Villages & Urban Cities
  const [resources] = useState<WelfareResourceNode[]>([
    {
      id: 'RES-RURAL-HEALTH-01',
      name: 'Gram Panchayat Primary Health Center & Ayushman Arogya Mandir',
      areaType: 'rural_village',
      pillar: 'health_medical',
      address: 'Panchayat Health Complex, Village Belpada (Gram Ward 2)',
      distanceKm: 0.8,
      contactPhone: '104 / 0674-2391002',
      availableCapacity: '12 Emergency Beds · 4 Doctors On Duty · Jan Aushadhi Medicines Free',
      is100PercentFree: true,
      operatingHours: '24 Hours Emergency · OPD 8:00 AM - 5:00 PM',
      officerInCharge: 'Dr. Anita Mohapatra (Medical Officer)',
      servicesProvided: [
        'Free Consultations & Blood Diagnostics',
        'Jan Aushadhi 100% Free Generic Medicine Dispensation',
        'Maternal, Child & Infant Immunization',
        'Mobile Health Van Village Lane Visits',
      ],
      lat: 20.2961,
      lng: 85.8245,
    },
    {
      id: 'RES-URBAN-HEALTH-02',
      name: 'Metropolitan City Civil Hospital & Trauma ICU Care Unit',
      areaType: 'urban_city',
      pillar: 'health_medical',
      address: 'Ring Road Civil Hospital Sector 4, Central Metro Ward',
      distanceKm: 1.4,
      contactPhone: '108 / 112',
      availableCapacity: '48 ICU Beds · 12 ALS Ambulances Ready · Zero VIP Bias',
      is100PercentFree: true,
      operatingHours: '24/7 Open Round the Clock',
      officerInCharge: 'Dr. Rajesh Verma (Chief Medical Superintendent)',
      servicesProvided: [
        'Advanced Trauma & Emergency ICU Stabilization',
        'Zero-Expense Dialysis, Oxygen & Cardiac Care',
        '24/7 Emergency Blood Bank & Free Surgery Suite',
        'Telemedicine Video Consultation Desk',
      ],
      lat: 28.6139,
      lng: 77.2090,
    },
    {
      id: 'RES-RURAL-FOOD-03',
      name: 'Pradhan Mantri Garib Kalyan Free Ration Depot & Grain Bank',
      areaType: 'rural_village',
      pillar: 'food_nutrition',
      address: 'Cooperative Society Grain Store, Khurda Rural Block 7',
      distanceKm: 0.5,
      contactPhone: '1967 (Toll-Free National Food Line)',
      availableCapacity: '4,200 Quintals Rice, Wheat & Pulses Ready · 100% Free Allowance',
      is100PercentFree: true,
      operatingHours: 'Daily 7:00 AM - 6:00 PM',
      officerInCharge: 'Shri Rameshwar Sahu (PDS Supply Inspector)',
      servicesProvided: [
        '5 kg Free Rice/Wheat + 1 kg Pulses per family member monthly',
        'Doorstep Grain Delivery for Elderly & Differently-Abled',
        'Fortified Vitamin-Enriched Cooking Oil & Iodine Salt Kits',
        'Child Nutrition Anganwadi Supplementary Food Packs',
      ],
      lat: 20.1809,
      lng: 85.6215,
    },
    {
      id: 'RES-URBAN-FOOD-04',
      name: 'Annapurna Community Kitchen & Urban Hot Meal Center',
      areaType: 'urban_city',
      pillar: 'food_nutrition',
      address: 'Near Central Railway Station Overbridge, Ward 12',
      distanceKm: 0.9,
      contactPhone: '1800-180-2026',
      availableCapacity: '8,000 Fresh Cooked Meals Prepared Daily (Breakfast, Lunch & Dinner)',
      is100PercentFree: true,
      operatingHours: 'Meal Times: 7:00-9:30 AM | 12:00-3:00 PM | 7:00-10:00 PM',
      officerInCharge: 'Smt. Sunita Das (Civic Kitchen Coordinator)',
      servicesProvided: [
        '100% Free Hot Nutritious Thali for Laborers, Homeless & Commuters',
        'Mobile Food Distribution Van for Urban Slums & Migrant Camps',
        'Pure UV Filtered Clean Drinking Water Dispenser',
        'Packaged Dry Meals for Night Workers & Children',
      ],
      lat: 28.6448,
      lng: 77.2167,
    },
    {
      id: 'RES-RURAL-HOME-05',
      name: 'Gramin PMAY Pucca Housing Allotment & Cyclone-Resistant Sanctuary',
      areaType: 'rural_village',
      pillar: 'home_shelter',
      address: 'Panchayat Bhavan High Grounds, Coastal Village Sector B',
      distanceKm: 1.1,
      contactPhone: '14420 / 0674-2391000',
      availableCapacity: '1,200 Citizen Emergency Bunk Capacity · 85 Pucca Homes Allotted',
      is100PercentFree: true,
      operatingHours: '24/7 Cyclone/Flood Refuge Active · Office: 9:00 AM - 5:00 PM',
      officerInCharge: 'BDO Pravat Kumar (Block Development Officer)',
      servicesProvided: [
        'PMAY-Gramin ₹1.3 Lakh - ₹1.5 Lakh Direct Cash Grant for Pucca House Construction',
        '24/7 Fortified Storm, Flood & Rain Shelter with Solar Power Backup',
        'Clean Mattress, Fresh Blankets, Mosquito Nets & Hygienic Bathrooms',
        'Free House Roof Repair Tarp & Metal Sheet Kits for Poor Households',
      ],
      lat: 19.8135,
      lng: 85.8312,
    },
    {
      id: 'RES-URBAN-HOME-06',
      name: 'Municipal 24/7 Urban Night Shelter (Rain Basera) & Transit Home',
      areaType: 'urban_city',
      pillar: 'home_shelter',
      address: 'G.T. Road Bus Terminal Complex, Sector 9',
      distanceKm: 0.7,
      contactPhone: '14420 / 112',
      availableCapacity: '250 Clean Bunk Beds · Separate Women & Family Enclosure',
      is100PercentFree: true,
      operatingHours: '24/7 Round the Clock Check-In',
      officerInCharge: 'Mohammad Farooq (Municipal Shelter Superintendent)',
      servicesProvided: [
        '100% Free Clean Sleeping Pods, Bedding & Secure Lockers',
        'Hot Water Showers, Soap, Disinfectants & Laundry',
        'Daily Free Breakfast & Evening Dinner Provided',
        'Legal Aid & Urban Migrant Worker Registration Desk',
      ],
      lat: 28.6502,
      lng: 77.2301,
    },
    {
      id: 'RES-RURAL-WATER-07',
      name: 'Jal Jeevan Mission Solar Potable Water Plant & Purification Station',
      areaType: 'rural_village',
      pillar: 'clean_water_utilities',
      address: 'Village Water Tank Square, Rampur Village',
      distanceKm: 0.3,
      contactPhone: '1800-11-2026',
      availableCapacity: '40,000 Liters Tested Potable Water Dispensed Daily (TDS: 45)',
      is100PercentFree: true,
      operatingHours: '24/7 Automated Touchless Taps',
      officerInCharge: 'Er. Deepak Jena (Rural Water Supply Engineer)',
      servicesProvided: [
        '100% Free Potable Drinking Water Piped to Every Village Home',
        'Solar-Powered Continuous UV + Ultrafiltration Plant',
        'Automated Water Purity Sensor with Real-Time Quality Display',
        'Emergency Water Tanker Dispatch to Distant Agricultural Hamlets',
      ],
      lat: 20.3012,
      lng: 85.8119,
    },
    {
      id: 'RES-URBAN-WATER-08',
      name: 'Smart City Pure Water ATM & Touchless Bio-Sanitation Complex',
      areaType: 'urban_city',
      pillar: 'clean_water_utilities',
      address: 'Public Park Metro Interchange Gate 2',
      distanceKm: 0.4,
      contactPhone: '1800-180-1122',
      availableCapacity: '25,000 Liters Free Dispensed · 16 Self-Sterilizing Toilets',
      is100PercentFree: true,
      operatingHours: '24/7 Open for All Citizens',
      officerInCharge: 'Pooja Kashyap (Urban Sanitation Executive)',
      servicesProvided: [
        'Free Pure Chilled / Normal Drinking Water Dispenser',
        'UV-C Automatic Self-Sanitizing Restrooms for Women, Men & Accessible',
        'Free Sanitary Napkin Dispenser & Hygiene Product Kits',
        'Emergency Cellphone Charging & Public Wi-Fi Spot',
      ],
      lat: 28.6291,
      lng: 77.2183,
    },
  ]);

  const filteredResources = resources.filter(res => {
    const matchesArea = selectedArea === 'all' || res.areaType === selectedArea;
    const matchesPillar = selectedPillar === 'all' || res.pillar === selectedPillar;
    const matchesSearch = 
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.servicesProvided.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesArea && matchesPillar && matchesSearch;
  });

  const handleSubmitHelpRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpApplicantName.trim() || !helpPhone.trim()) {
      alert('Please provide your name and phone number so the local relief officer can reach you.');
      return;
    }

    sound.startEmergencySiren();
    setTimeout(() => sound.stopEmergencySiren(), 1500);

    const token = `RELIEF-${helpArea === 'rural_village' ? 'GAON' : 'SHAHAR'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest: EmergencyHelpRequest = {
      id: token,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      applicantName: helpApplicantName,
      contactPhone: helpPhone,
      areaType: helpArea,
      pillar: helpPillar,
      specificNeed: helpDetails,
      familyMembersCount: helpFamilyCount,
      urgencyLevel: helpUrgency,
      locationAddress: helpLocation,
      status: 'relief_kit_dispatched',
      assignedReliefNode: helpArea === 'rural_village' ? 'Gram Panchayat Relief Officer & Mobile Health Van' : 'Municipal Ward Relief Van #04',
    };

    setRecentDispatchedRequest(newRequest);
    setShowHelpModal(false);

    if (onWelfareAlert) {
      onWelfareAlert(`🚨 EMERGENCY RELIEF DISPATCHED [Token: ${token}]. Direct delivery of ${helpPillar.replace(/_/g, ' ')} initiated to ${helpLocation}.`);
    }
  };

  const handleDialHelpline = (number: string, title: string) => {
    sound.playChirp(880, 0.08);
    alert(`[DIRECT GOVERNMENT CITIZEN HELPLINE]\n\nConnecting you immediately to:\n${title}\nPhone: ${number}\n\n100% Free Toll-Free Service across all village and urban mobile networks.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Village & Urban Universal Welfare Grid */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast 
          ? 'bg-black border-emerald-400 text-white' 
          : 'bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <span>UNIVERSAL CITIZEN RELIEF & BASIC HUMAN NEEDS GRID</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center gap-1">
                <TreePine className="w-3.5 h-3.5 text-amber-400" />
                <span>RURAL VILLAGE (GRAM) + URBAN CITY (NAGAR)</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>100% FREE FOR ALL CITIZENS</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              Essential Health, Food & Housing for Every Human Being
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl font-sans leading-relaxed">
              No citizen shall ever go hungry, homeless, or without life-saving medicine. 
              Connecting every remote village (Gram Panchayat) and dense urban center (Nagar Nigam) directly to 
              <strong> 100% free primary healthcare, emergency medicines, free daily food/rations, and safe pucca housing & night shelters</strong> with zero middlemen.
            </p>
          </div>

          {/* Quick SOS Emergency Relief Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                setShowHelpModal(true);
                sound.playHologramTap();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all animate-pulse"
            >
              <HeartHandshake className="w-5 h-5" />
              <span>REQUEST IMMEDIATE FREE HELP</span>
            </button>
          </div>
        </div>

        {/* 4 Essential Toll-Free Government Helplines */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <button
            onClick={() => handleDialHelpline('108', 'Free Emergency Medical Ambulance')}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition-all"
          >
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <Ambulance className="w-3.5 h-3.5" />
              <span>FREE HEALTH & AMBULANCE</span>
            </div>
            <div className="text-base font-bold text-white mt-0.5">Dial 108 / 104</div>
          </button>

          <button
            onClick={() => handleDialHelpline('1967', 'National Food & Free Ration Helpline')}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition-all"
          >
            <div className="text-[10px] text-amber-400 flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5" />
              <span>FREE FOOD & GRAIN</span>
            </div>
            <div className="text-base font-bold text-white mt-0.5">Dial 1967 / PDS</div>
          </button>

          <button
            onClick={() => handleDialHelpline('14420', 'National Housing & Shelter Helpline')}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition-all"
          >
            <div className="text-[10px] text-cyan-400 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>FREE HOUSING & SHELTER</span>
            </div>
            <div className="text-base font-bold text-white mt-0.5">Dial 14420 / PMAY</div>
          </button>

          <button
            onClick={() => handleDialHelpline('1800-11-2026', 'Jal Jeevan Mission Clean Water')}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition-all"
          >
            <div className="text-[10px] text-sky-400 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5" />
              <span>POTABLE CLEAN WATER</span>
            </div>
            <div className="text-base font-bold text-white mt-0.5">1800-11-2026</div>
          </button>
        </div>
      </div>

      {/* Recent Dispatched Relief Banner if user applied */}
      {recentDispatchedRequest && (
        <div className="p-4 bg-emerald-950/80 border-2 border-emerald-500 rounded-2xl space-y-2 font-mono text-xs text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>OFFICIAL RELIEF DISPATCH CONFIRMED: TOKEN #{recentDispatchedRequest.id}</span>
            </div>
            <button
              onClick={() => setRecentDispatchedRequest(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕ Dismiss
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
            <div>
              <span className="text-slate-400">APPLICANT: </span>
              <span className="text-white font-bold">{recentDispatchedRequest.applicantName} ({recentDispatchedRequest.contactPhone})</span>
            </div>
            <div>
              <span className="text-slate-400">CATEGORY: </span>
              <span className="text-amber-300 font-bold uppercase">{recentDispatchedRequest.pillar.replace(/_/g, ' ')}</span>
            </div>
            <div>
              <span className="text-slate-400">DISPATCH STATUS: </span>
              <span className="text-emerald-300 font-bold">RELIEF UNIT EN ROUTE</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 bg-black/50 p-2.5 rounded-lg border border-emerald-900">
            {recentDispatchedRequest.specificNeed} — Destination: {recentDispatchedRequest.locationAddress}. Relief Officer assigned: {recentDispatchedRequest.assignedReliefNode}.
          </p>
        </div>
      )}

      {/* Filter Matrix: Area Type (Village vs City) + Essential Pillar (Health, Food, Home, Water) */}
      <div className={`p-5 rounded-2xl border ${
        isHighContrast ? 'bg-black border-slate-700' : 'bg-slate-900/80 border-slate-800'
      } space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Area Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 font-mono text-xs">
            <span className="text-slate-400 mr-1 text-[11px]">LOCATION:</span>
            <button
              onClick={() => setSelectedArea('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedArea === 'all'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Regions (Unified)
            </button>

            <button
              onClick={() => setSelectedArea('rural_village')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedArea === 'rural_village'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-950 text-amber-300 hover:text-white border border-slate-800'
              }`}
            >
              <TreePine className="w-3.5 h-3.5" />
              <span>🌾 Rural Villages (Gram)</span>
            </button>

            <button
              onClick={() => setSelectedArea('urban_city')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedArea === 'urban_city'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-950 text-cyan-300 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>🏙️ Urban Cities (Nagar)</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinic, ration, home, water..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* 4 Pillars Filter Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          <button
            onClick={() => setSelectedPillar('health_medical')}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedPillar === 'health_medical'
                ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <HeartPulse className="w-4 h-4" />
              <span>1. HEALTH & CLINIC</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">Free Doctors, Jan Aushadhi, ICU</div>
          </button>

          <button
            onClick={() => setSelectedPillar('food_nutrition')}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedPillar === 'food_nutrition'
                ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Utensils className="w-4 h-4" />
              <span>2. FOOD & RATION</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">Free Grains, Hot Meals, Kitchens</div>
          </button>

          <button
            onClick={() => setSelectedPillar('home_shelter')}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedPillar === 'home_shelter'
                ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Home className="w-4 h-4" />
              <span>3. HOME & SHELTER</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">PMAY Housing, 24/7 Night Shelters</div>
          </button>

          <button
            onClick={() => setSelectedPillar('clean_water_utilities')}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedPillar === 'clean_water_utilities'
                ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5 text-sky-400 font-bold">
              <Droplets className="w-4 h-4" />
              <span>4. WATER & SANITATION</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">Jal Jeevan, Clean Bio-Toilets</div>
          </button>
        </div>
      </div>

      {/* Directory of Free Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map(res => (
          <div
            key={res.id}
            className={`p-5 rounded-2xl border transition-all ${
              isHighContrast
                ? 'bg-black border-emerald-400 text-white'
                : 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40 backdrop-blur-md'
            } space-y-3`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    res.areaType === 'rural_village'
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                  }`}>
                    {res.areaType === 'rural_village' ? '🌾 RURAL VILLAGE (GRAM)' : '🏙️ URBAN CITY (NAGAR)'}
                  </span>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                    100% FREE RELIEF
                  </span>

                  <span className="text-[10px] font-mono text-slate-400">
                    {res.distanceKm} km away
                  </span>
                </div>

                <h4 className="text-base font-bold font-mono text-white mt-1">
                  {res.name}
                </h4>
              </div>

              <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                {res.pillar === 'health_medical' && <HeartPulse className="w-4 h-4 text-emerald-400" />}
                {res.pillar === 'food_nutrition' && <Utensils className="w-4 h-4 text-amber-400" />}
                {res.pillar === 'home_shelter' && <Home className="w-4 h-4 text-cyan-400" />}
                {res.pillar === 'clean_water_utilities' && <Droplets className="w-4 h-4 text-sky-400" />}
              </div>
            </div>

            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div className="flex items-start gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{res.address}</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{res.operatingHours}</span>
              </div>
            </div>

            {/* Capacity & Supplies */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono">
              <span className="text-slate-500 block text-[10px]">CURRENT SUPPLIES / CAPACITY:</span>
              <span className="text-emerald-300 font-semibold">{res.availableCapacity}</span>
            </div>

            {/* Services bullets */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-mono text-slate-500">AVAILABLE 100% FREE FOR CITIZENS:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-300 font-mono">
                {res.servicesProvided.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => handleDialHelpline(res.contactPhone, res.name)}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Directly: {res.contactPhone.split('/')[0]}</span>
              </button>

              <button
                onClick={() => {
                  sound.playHologramTap();
                  alert(`[OFFICIAL RELIEF DISPATCH DIRECTORY]\n\nResource: ${res.name}\nAddress: ${res.address}\nOfficer In Charge: ${res.officerInCharge}\nHelpline: ${res.contactPhone}\n\nAll services guaranteed 100% free under National Civic Welfare Protection standard.`);
                }}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Officer Info</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Help Request Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-emerald-500/50 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold font-mono text-white">
                  Request Immediate Free Citizen Help
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              Enter your location and need below. This request is instantly dispatched to your nearest Gram Panchayat Secretary or Municipal Ward Relief Unit for direct assistance.
            </p>

            <form onSubmit={handleSubmitHelpRequest} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    value={helpApplicantName}
                    onChange={(e) => setHelpApplicantName(e.target.value)}
                    placeholder="e.g. Ramesh Sahoo"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Mobile / Phone Number:</label>
                  <input
                    type="tel"
                    required
                    value={helpPhone}
                    onChange={(e) => setHelpPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Area Location Type:</label>
                  <select
                    value={helpArea}
                    onChange={(e) => setHelpArea(e.target.value as AreaType)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="rural_village">🌾 Rural Village Area (Gram Panchayat)</option>
                    <option value="urban_city">🏙️ Urban City / Town (Nagar Nigam)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Essential Need Category:</label>
                  <select
                    value={helpPillar}
                    onChange={(e) => setHelpPillar(e.target.value as WelfarePillar)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="food_nutrition">🌾 Free Food & Ration Support</option>
                    <option value="health_medical">🏥 Urgent Health / Doctor / Medicine</option>
                    <option value="home_shelter">🏠 Free Home / Shelter Tonight</option>
                    <option value="clean_water_utilities">💧 Clean Water & Utilities</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Family Members Count:</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={helpFamilyCount}
                    onChange={(e) => setHelpFamilyCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Urgency Level:</label>
                  <select
                    value={helpUrgency}
                    onChange={(e) => setHelpUrgency(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="immediate_critical">🚨 Immediate Critical (Within 1 hour)</option>
                    <option value="same_day_relief">⏳ Same Day Relief (Today)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Exact Village / Street Landmark Address:</label>
                <input
                  type="text"
                  required
                  value={helpLocation}
                  onChange={(e) => setHelpLocation(e.target.value)}
                  placeholder="e.g. Village Rampur, Near Old Shiva Temple Ward 3"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Describe What Is Needed:</label>
                <textarea
                  rows={2}
                  value={helpDetails}
                  onChange={(e) => setHelpDetails(e.target.value)}
                  placeholder="e.g. No food at home for kids, elderly mother has high fever, need doctor van..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Immediate Relief</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
