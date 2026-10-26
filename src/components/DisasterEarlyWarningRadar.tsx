import React, { useState } from 'react';
import { 
  MeteorologicalEarlyWarning, 
  DisasterHazardType, 
  SanitaryWaterNode 
} from '../types';
import { sound } from '../utils/audio';
import { 
  Tornado, 
  Waves, 
  Activity, 
  Flame, 
  Footprints, 
  Droplets, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Download, 
  Compass, 
  Radio, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sun, 
  ThermometerSun, 
  TreePine, 
  Building2, 
  Wind, 
  CloudRain, 
  ChevronRight,
  Zap,
  Globe,
  WavesLadder,
  ShieldAlert,
  Shield
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onDisasterAlert?: (msg: string) => void;
}

export const DisasterEarlyWarningRadar: React.FC<Props> = ({ isHighContrast, onDisasterAlert }) => {
  const [selectedHorizonDays, setSelectedHorizonDays] = useState<number>(30); // 15 to 30 days ahead slider
  const [selectedHazardFilter, setSelectedHazardFilter] = useState<DisasterHazardType | 'all'>('all');
  const [selectedWarning, setSelectedWarning] = useState<MeteorologicalEarlyWarning | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // 15 to 30-Day Predictive Warnings Data including Floods, Hurricanes, Tsunamis, Earthquakes
  const [warnings, setWarnings] = useState<MeteorologicalEarlyWarning[]>([
    {
      id: 'MET-WARN-FLOOD-26D',
      hazardType: 'flood_inundation',
      title: 'Upcoming Megaflood & Glacial Lake Inundation Crisis (Major River Basin Swell)',
      leadTimeDays: 26,
      severityLevel: 'extreme_emergency',
      forecastArrivalDate: '2026-10-31 UTC',
      confidencePercentage: 96.2,
      meteorologicalDepartmentApprovalId: 'MET-GOV-SANCTION-FLOOD-2026-F1',
      meteorologicalSignatory: 'Federal River Basin & Flood Predictive Directorate',
      impactZone: 'Ganges-Brahmaputra Delta & Low-Lying Riverine Floodplains (12 Districts)',
      precursorSensors: [
        'Satellite Altimetry Glacial Lake Expansion (+320 Hectares)',
        'Atmospheric River Water Vapor Influx (Pwat > 68 mm)',
        'Upstream Catchment Soil Saturation Anomaly (98% Saturated)',
      ],
      preventativeMeasures: [
        'Controlled floodgate drainage in upstream hydroelectric reservoirs 20 days prior',
        'Staging amphibious rescue hovercrafts and inflatable medical boats',
        'Reinforcement of earthen levees and sandbag bulwarks at critical bends',
      ],
      sanitaryAndWaterShelters: [
        'High-Ground Flood Shelter Complex Beta (Capacity: 18,000 citizens)',
        'Solar Water Purification Barges (Direct River Filtration: 80,000 L/day)',
        'Sanitary Decontamination Floating Clinics',
      ],
      sha256ClimateDigest: '7a99bb88cc1100223344556677889900aabbccddeeff11223344556677889900',
    },
    {
      id: 'MET-WARN-HURRICANE-27D',
      hazardType: 'hurricane_typhoon',
      title: 'Category 5 Super-Hurricane & Oceanic Storm Surge Vector',
      leadTimeDays: 27,
      severityLevel: 'extreme_emergency',
      forecastArrivalDate: '2026-11-01 UTC',
      confidencePercentage: 95.8,
      meteorologicalDepartmentApprovalId: 'MET-GOV-SANCTION-HURRICANE-2026-H5',
      meteorologicalSignatory: 'World Meteorological Organization (WMO) & NOAA Cyclone Desk',
      impactZone: 'Tropical Marine Corridor & Coastal Maritime Ports (400 km coastline)',
      precursorSensors: [
        'Ocean Thermal Energy Depth Content (>28.5°C down to 80m)',
        'Vertical Wind Shear Decay (< 5 knots favor extreme intensification)',
        'Satellite Microwave Eye Wall Genesis Telemetry',
      ],
      preventativeMeasures: [
        'Mandatory port shutdown and commercial shipping reroute 15 days ahead',
        'Deployment of automated storm surge flood gates along estuary channels',
        'Emergency food rations pre-positioned in elevated bunker vaults',
      ],
      vorticityPressureHpa: 908,
      sanitaryAndWaterShelters: [
        'Sub-terranean Reinforced Hurricane Shelter #01',
        'Desalination Plant Emergency Reserve (4 Million Liters)',
      ],
      sha256ClimateDigest: '556677889900aabbccddeeff11223344556677889900aabbccddeeff11223344',
    },
    {
      id: 'MET-WARN-CYCLONE-25D',
      hazardType: 'tornado_cyclone',
      title: 'Multi-Vortex Tornado Swarm & Cyclone Mesocyclone Genesis',
      leadTimeDays: 25,
      severityLevel: 'extreme_emergency',
      forecastArrivalDate: '2026-10-30 UTC',
      confidencePercentage: 94.6,
      meteorologicalDepartmentApprovalId: 'MET-GOV-SANCTION-CYCLONE-2026-A1',
      meteorologicalSignatory: 'Director General of Meteorological Early Warning Services',
      impactZone: 'Eastern Coastal Belt & Agro-Corridor (180 km radius from vortex)',
      precursorSensors: [
        'Geostationary Thermal IR Satellite Anomalies',
        'Sea Surface Temperature > 31.4°C',
        'Atmospheric Vorticity Inversion Node #42',
      ],
      preventativeMeasures: [
        'Pre-evacuation of mobile home and rural populations 18 days prior',
        'Securing municipal storm barriers and power grid micro-disconnects',
        'Stockpiling 40,000 rations at 24/7 fortified sanitary storm shelters',
      ],
      vorticityPressureHpa: 914,
      sanitaryAndWaterShelters: [
        'Fortified Storm Refuge Hub Alpha (Capacity: 12,000 citizens)',
        'Municipal Desalination Clean Water Depot #04',
        '24/7 Solar-Powered Medical Hygiene Station',
      ],
      sha256ClimateDigest: '8f4321ba99ce10aa34cd1192837465fe9901bcde8833441122aabbccddee0011',
    },
    {
      id: 'MET-WARN-TSUNAMI-22D',
      hazardType: 'tsunami_oceanic',
      title: 'Oceanic Megathrust Tectonic Subduction Strain & Tsunami Wave Hazard',
      leadTimeDays: 22,
      severityLevel: 'extreme_emergency',
      forecastArrivalDate: '2026-10-27 UTC',
      confidencePercentage: 91.2,
      meteorologicalDepartmentApprovalId: 'MET-GOV-SANCTION-TSUNAMI-2026-B8',
      meteorologicalSignatory: 'Indian Ocean & Pacific Tsunami Warning Center Consortium',
      impactZone: 'Coastline Archipelago & Island Community Corridors',
      precursorSensors: [
        'DART-IV Deep-Ocean Bottom Pressure Recorders (BPR)',
        'Subduction Plate Boundary Creep Accelerometer (68 mm/yr displacement)',
        'Acoustic Wave Hydrophone Array Strain Spike',
      ],
      preventativeMeasures: [
        'Automated Coastal Harbor Sirens calibrated for 3-minute alert',
        'Mandatory vertical evacuation route marking on citizen mobile AR maps',
        'High-ground emergency food & medical cache stocking',
      ],
      sanitaryAndWaterShelters: [
        'High-Altitude Ridge Relief Center #09 (Altitude: 85m ASL)',
        'Clean Water Reservoir Storage Tank (2.5 Million Gallons)',
      ],
      sha256ClimateDigest: 'ba1290ffcc33441199aacc887766554433221100ffeeddccbbaa998877665544',
    },
    {
      id: 'MET-WARN-QUAKE-28D',
      hazardType: 'earthquake_tectonic',
      title: 'Magnitude 7.4 Tectonic Fault Stress Concentration & Epicenter Pre-cursor',
      leadTimeDays: 28,
      severityLevel: 'extreme_emergency',
      forecastArrivalDate: '2026-11-02 UTC',
      confidencePercentage: 88.9,
      meteorologicalDepartmentApprovalId: 'MET-GOV-SANCTION-SEISMIC-2026-Q4',
      meteorologicalSignatory: 'National Center for Seismological & Tectonic Hazard Audits',
      impactZone: 'Himalayan Foothills & Inter-Plate Shear Zone',
      precursorSensors: [
        'Sentinel-1 InSAR Interferometry Surface Uplift (4.2 mm/month)',
        'Radon Gas Groundwater Emission Anomaly (+380% baseline)',
        'Ultra-Low Frequency (ULF) Geomagnetic Pre-Earthquake Emissions',
      ],
      preventativeMeasures: [
        'Structural retrofitting audit on bridges and hospitals',
        'Automated gas line shutdown valves placed on standby',
        'Rapid Search & Rescue heavy lifters deployed to regional depots',
      ],
      subductionFaultStressMpa: 78.4,
      sanitaryAndWaterShelters: [
        'Seismic-Reinforced Geodesic Dome Camp 1 (Base Isolation System)',
        'Automated Clean Water Purification Trailers (Capacity: 50,000 L/hr)',
      ],
      sha256ClimateDigest: '11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
    },
    {
      id: 'MET-WARN-BURNING-18D',
      hazardType: 'burning_heatwave_thermal',
      title: 'Extreme Thermal Burning Sensation Index & Wet-Bulb Hyperthermia Crisis',
      leadTimeDays: 18,
      severityLevel: 'severe_watch',
      forecastArrivalDate: '2026-10-23 UTC',
      confidencePercentage: 97.4,
      meteorologicalDepartmentApprovalId: 'MET-GOV-SANCTION-THERMAL-2026-H9',
      meteorologicalSignatory: 'National Climate Center & Planetary Thermal Monitoring Desk',
      impactZone: 'Central Plains & Dense Urban Heat Islands (8 Metropolitan Regions)',
      precursorSensors: [
        'Surface Skin Thermal Radiative Flux Index (Skin Burning Threshold: 12 min)',
        'Wet-Bulb Temperature Forecast: 34.2°C (Human cooling envelope limit)',
        'Solar Ultraviolet Radiation Index: UV-14 (Extreme Carcinogenic Danger)',
      ],
      preventativeMeasures: [
        'Activation of municipal roadside optical misting stations every 200m',
        'Mandatory workplace rest cycles between 11:00 AM and 4:00 PM',
        'Free public distribution of structured electrolyte water',
      ],
      thermalBurningIndexTempC: 49.8,
      sanitaryAndWaterShelters: [
        '24/7 Geothermal Cooling Sanctuary Hub (Main City Square)',
        'Free Pure Electrolyte Water Kiosks #101 through #140',
        'Public Decontamination & Cold Shower Kiosks',
      ],
      sha256ClimateDigest: 'fedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
    },
    {
      id: 'MET-WARN-WILDLIFE-16D',
      hazardType: 'wildlife_corridor_conflict',
      title: 'Elephant & Apex Predator Seasonal Migration Corridor Defense',
      leadTimeDays: 16,
      severityLevel: 'advisory_preparation',
      forecastArrivalDate: '2026-10-21 UTC',
      confidencePercentage: 92.1,
      meteorologicalDepartmentApprovalId: 'MET-GOV-SANCTION-BIO-WILDLIFE-2026-W3',
      meteorologicalSignatory: 'State Forest & Wildlife Bio-Corridor Conservation Board',
      impactZone: 'Forest Fringe Villages & Highway Crossings (Sector 12 to 19)',
      precursorSensors: [
        'Satellite Bio-Telemetry GPS Collars on Alpha Matriarch Herd',
        'Infrared Highway Trail Cameras & Seismic Footstep Detectors',
        'Riparian Water Hole Depletion Drone Telemetry',
      ],
      preventativeMeasures: [
        'Autonomous Acoustic Bee-Sound Repellers active along village fences',
        'Speed reduction on National Highway to 25 km/h during nocturnal transit',
        'Ranger escorts deployed to safeguard both farmers and wildlife',
      ],
      wildlifeMovementRisk: 'Herd of 38 Elephants traversing traditional 400-year migratory corridor',
      sanitaryAndWaterShelters: [
        'Buffer Zone Wildlife Water Reservoir (Preventing Human Village Encroachment)',
        'Community Safe Watchtower & Bio-Fenced Enclosure',
      ],
      sha256ClimateDigest: '3344556677889900aabbccddeeff11223344556677889900aabbccddeeff1122',
    },
    {
      id: 'MET-WARN-SANITARY-20D',
      hazardType: 'sanitary_clean_water_access',
      title: 'Universal Public Sanitary & Pure Drinking Water Security Initiative',
      leadTimeDays: 20,
      severityLevel: 'advisory_preparation',
      forecastArrivalDate: '2026-10-25 UTC',
      confidencePercentage: 99.1,
      meteorologicalDepartmentApprovalId: 'MET-GOV-SANCTION-SANITARY-2026-S1',
      meteorologicalSignatory: 'National Public Health & Potable Water Security Mission',
      impactZone: 'Universal Nationwide Access for All Citizens & Transient Populations',
      precursorSensors: [
        'Aquifer Water Table Nanoparticle Purity Sensors',
        'Automated Municipal Sanitary Cleanliness Optical Scanners',
        'Solar-Powered Reverse Osmosis Health Monitors',
      ],
      preventativeMeasures: [
        'Free 100% citizen access to ultra-purified drinking water (TDS < 80)',
        'Automated self-sterilizing public restrooms with UV-C sanitization',
        'Zero-waste hygienic sanitation packs delivered to transit hubs',
      ],
      sanitaryAndWaterShelters: [
        '24/7 Pure Filtered Water Kiosks (50+ Locations Active)',
        'Autonomous Sanitized Restrooms with Touchless Bio-Locks',
      ],
      sha256ClimateDigest: '99887766554433221100aabbccddeeff99887766554433221100aabbccddeeff',
    },
  ]);

  // Planetary Earth Safety Shield Metrics
  const planetaryShieldMetrics = {
    planetarySafetyIndex: '98.4%',
    riverBasinsMonitored: '4 Major River Basins Under Active Sensor Mesh',
    tectonicPlatesTracked: '12 Continental & Oceanic Faults (InSAR Active)',
    hurricaneWatchZones: 'Atlantic, Pacific & Indian Ocean Corridors',
    tsunamiBuoysActive: '84 DART-IV Deep Ocean Pressure Recorders',
    sanitaryReservesPotable: '14.2M Liters Emergency Water Secured',
  };

  // Sanitary & Clean Water Facilities Directory
  const sanitaryFacilities: SanitaryWaterNode[] = [
    {
      id: 'SAN-WATER-01',
      name: 'Central Metro 24/7 Pure Filtered Water Kiosk',
      type: '24/7 Pure Filtered Water Kiosk',
      distanceKm: 0.3,
      freePublicAccess: true,
      cleanlinessScore: 99.8,
      waterQualityTds: 42,
      capacityPerDay: '20,000 Liters Free Dispensed',
      isSolarPowered: true,
    },
    {
      id: 'SAN-REST-02',
      name: 'Autonomous Self-Sterilizing Public Sanitary Restroom',
      type: 'Autonomous Sanitized Restroom',
      distanceKm: 0.5,
      freePublicAccess: true,
      cleanlinessScore: 98.9,
      waterQualityTds: 50,
      capacityPerDay: 'UV-C Sterilized After Every Visit',
      isSolarPowered: true,
    },
    {
      id: 'SAN-COOL-03',
      name: 'Extreme Heatwave Thermal Cooling & Misting Shelter',
      type: 'Decontamination & Cooling Shelter',
      distanceKm: 0.8,
      freePublicAccess: true,
      cleanlinessScore: 99.5,
      waterQualityTds: 38,
      capacityPerDay: 'Cold Misting & Air Cooled 24/7',
      isSolarPowered: true,
    },
  ];

  const filteredWarnings = warnings.filter(w => {
    const matchesHorizon = w.leadTimeDays <= selectedHorizonDays;
    const matchesHazard = selectedHazardFilter === 'all' || w.hazardType === selectedHazardFilter;
    return matchesHorizon && matchesHazard;
  });

  const handleExportMeteorologicalCertificate = (warning: MeteorologicalEarlyWarning) => {
    sound.playChirp(880, 0.06);
    const certPayload = {
      issuingAuthority: 'NATIONAL METEOROLOGICAL & PLANETARY EARLY WARNING AGENCY',
      sanctionApprovalNumber: warning.meteorologicalDepartmentApprovalId,
      statutorySignatory: warning.meteorologicalSignatory,
      warningTitle: warning.title,
      predictiveLeadTimeNotice: `${warning.leadTimeDays} DAYS ADVANCE NOTICE`,
      predictedArrivalDate: warning.forecastArrivalDate,
      confidenceRate: `${warning.confidencePercentage}% (Peer-Reviewed Satellite Pre-cursor Consensus)`,
      impactZoneCoordinates: warning.impactZone,
      precursorInstrumentsActive: warning.precursorSensors,
      evacuationAndSanitaryShelters: warning.sanitaryAndWaterShelters,
      cryptographicAuditDigest: warning.sha256ClimateDigest,
      legalStatus: 'OFFICIAL_GOVERNMENT_CLIMATE_ADVISORY_APPROVED',
    };

    const blob = new Blob([JSON.stringify(certPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `METEOROLOGICAL_OFFICIAL_${warning.id}_SANCTION.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportNotice(`Official Meteorological Department Sanction for ${warning.id} exported successfully.`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  const getHazardIcon = (type: DisasterHazardType) => {
    switch (type) {
      case 'flood_inundation':
        return <CloudRain className="w-4 h-4 text-blue-400" />;
      case 'hurricane_typhoon':
        return <Wind className="w-4 h-4 text-cyan-400" />;
      case 'tornado_cyclone':
        return <Tornado className="w-4 h-4 text-cyan-400" />;
      case 'tsunami_oceanic':
        return <Waves className="w-4 h-4 text-blue-400" />;
      case 'earthquake_tectonic':
        return <Activity className="w-4 h-4 text-rose-400" />;
      case 'burning_heatwave_thermal':
        return <ThermometerSun className="w-4 h-4 text-amber-400" />;
      case 'wildlife_corridor_conflict':
        return <Footprints className="w-4 h-4 text-emerald-400" />;
      case 'sanitary_clean_water_access':
        return <Droplets className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Future Earth Planetary Safety Shield & Early Warning Radar */}
      <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-5 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
              <h2 className="text-lg font-bold text-white tracking-wide font-mono flex items-center gap-2">
                Future Earth Planetary Safety Shield (Flood, Hurricane, Tsunami, Earthquake & Thermal Defense)
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                  MET DEPT APPROVED
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Global planetary radar detecting upcoming Megafloods, Category-5 Hurricanes, Oceanic Tsunamis, Tectonic Earthquakes, Burning Heatwaves, and Wildlife migrations 15 to 30 days ahead of occurrence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">PLANETARY RESILIENCE</span>
              <span className="text-sm font-bold font-mono text-emerald-400">{planetaryShieldMetrics.planetarySafetyIndex} SECURED</span>
            </div>
          </div>
        </div>

        {/* Planetary Safety Grid Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-[10px] block">FLOOD INUNDATION:</span>
            <span className="text-blue-300 font-bold">4 Basins Monitored</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-[10px] block">HURRICANE TRACKS:</span>
            <span className="text-cyan-300 font-bold">Cat-5 Early Vector</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-[10px] block">TSUNAMI SENSORS:</span>
            <span className="text-blue-400 font-bold">84 DART Buoys Active</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-[10px] block">EARTHQUAKE InSAR:</span>
            <span className="text-rose-400 font-bold">12 Faults Under Watch</span>
          </div>
        </div>

        {/* 15 to 30-Day Horizon Interactive Slider */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              ADVANCE PREDICTIVE HORIZON:
              <strong className="text-cyan-400 text-sm">{selectedHorizonDays} DAYS AHEAD</strong>
              <span className="text-slate-500">(15 to 30 Days Early Detection Window)</span>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px]">15 Days</span>
              <input
                type="range"
                min="15"
                max="30"
                step="1"
                value={selectedHorizonDays}
                onChange={e => setSelectedHorizonDays(Number(e.target.value))}
                className="w-44 accent-cyan-400 cursor-pointer"
              />
              <span className="text-cyan-300 text-[11px]">30 Days</span>
            </div>
          </div>
        </div>

        {/* Hazard Category Filters */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => {
              setSelectedHazardFilter('all');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              selectedHazardFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Hazards ({warnings.length})
          </button>
          <button
            onClick={() => {
              setSelectedHazardFilter('flood_inundation');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedHazardFilter === 'flood_inundation'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-blue-400" />
            <span>Upcoming Floods</span>
          </button>
          <button
            onClick={() => {
              setSelectedHazardFilter('hurricane_typhoon');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedHazardFilter === 'hurricane_typhoon'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hurricanes & Typhoons</span>
          </button>
          <button
            onClick={() => {
              setSelectedHazardFilter('tsunami_oceanic');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedHazardFilter === 'tsunami_oceanic'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-blue-400" />
            <span>Tsunamis</span>
          </button>
          <button
            onClick={() => {
              setSelectedHazardFilter('earthquake_tectonic');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedHazardFilter === 'earthquake_tectonic'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            <span>Earthquakes</span>
          </button>
          <button
            onClick={() => {
              setSelectedHazardFilter('burning_heatwave_thermal');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedHazardFilter === 'burning_heatwave_thermal'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ThermometerSun className="w-3.5 h-3.5 text-amber-400" />
            <span>Burning Heatwave</span>
          </button>
          <button
            onClick={() => {
              setSelectedHazardFilter('wildlife_corridor_conflict');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedHazardFilter === 'wildlife_corridor_conflict'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Footprints className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wildlife</span>
          </button>
          <button
            onClick={() => {
              setSelectedHazardFilter('sanitary_clean_water_access');
              sound.playHologramTap();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              selectedHazardFilter === 'sanitary_clean_water_access'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-teal-400" />
            <span>Sanitary & Water</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Main Grid: Left Early Warnings Dossiers + Right Meteorological Authority Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Predicted Hazards List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1">
            <span>PREDICTIVE CLIMATE & DISASTER ADVISORIES</span>
            <span>{filteredWarnings.length} HAZARDS PROJECTED IN NEXT {selectedHorizonDays} DAYS</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {filteredWarnings.map(warn => {
              const isSelected = selectedWarning?.id === warn.id;
              return (
                <div
                  key={warn.id}
                  onClick={() => {
                    setSelectedWarning(warn);
                    sound.playHologramTap();
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer font-mono text-xs space-y-2.5 ${
                    isSelected
                      ? 'bg-cyan-950/50 border-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {getHazardIcon(warn.hazardType)}
                      <span className="font-bold text-white text-xs">{warn.id}</span>
                      <span className="text-slate-500 text-[10px]">· {warn.leadTimeDays} Days Ahead Notice</span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {warn.confidencePercentage}% CONFIDENCE
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100">{warn.title}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-500 block">Forecast Arrival:</span>
                      <span className="text-amber-300 font-bold">{warn.forecastArrivalDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Meteorological Sanction:</span>
                      <span className="text-emerald-400">{warn.meteorologicalDepartmentApprovalId}</span>
                    </div>
                  </div>

                  {warn.thermalBurningIndexTempC && (
                    <div className="p-2 bg-amber-950/40 border border-amber-500/30 rounded-lg text-amber-300 text-[11px]">
                      Thermal Burning Index: {warn.thermalBurningIndexTempC}°C (Skin burning danger in 12 min)
                    </div>
                  )}

                  {warn.vorticityPressureHpa && (
                    <div className="p-2 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-cyan-300 text-[11px]">
                      Barometric Core Depression: {warn.vorticityPressureHpa} hPa (Category 5 Storm System)
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-500">Zone: {warn.impactZone}</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <span>Inspect Measures</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Meteorological Department Advisory & Sanction Certificate */}
        <div className="lg:col-span-5 space-y-4">
          {selectedWarning ? (
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-md space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-bold text-white text-xs">OFFICIAL METEOROLOGICAL SANCTION</h3>
                    <span className="text-[10px] text-slate-400">{selectedWarning.meteorologicalDepartmentApprovalId}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  APPROVED
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block">ISSUING AUTHORITY & SIGNATORY:</span>
                <span className="text-white font-bold">{selectedWarning.meteorologicalSignatory}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">SATELLITE PRECURSOR INSTRUMENTS ACTIVE:</span>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {selectedWarning.precursorSensors.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400">›</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">PREVENTATIVE LIFE-SAVING PROTOCOLS:</span>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {selectedWarning.preventativeMeasures.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">24/7 SANITARY & WATER REFUGE CENTERS:</span>
                <ul className="space-y-1 text-[11px] text-teal-300">
                  {selectedWarning.sanitaryAndWaterShelters.map((sh, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Droplets className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                      <span>{sh}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleExportMeteorologicalCertificate(selectedWarning)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export Meteorological Sanction Dossier</span>
              </button>
            </div>
          ) : (
            <div className="p-8 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500 text-xs font-mono">
              Select an advance early warning dossier on the left to review satellite sensor data and export meteorological department approvals.
            </div>
          )}

          {/* Universal Public Sanitary & Clean Water Facilities Panel */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-teal-400" />
                Universal Sanitary & Clean Water Hubs
              </h3>
              <span className="text-[10px] text-emerald-400">100% FREE PUBLIC ACCESS</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Guaranteed pure drinking water (TDS &lt; 50) and solar decontamination restrooms accessible for all citizens during extreme climate events.
            </p>

            <div className="space-y-2 pt-1">
              {sanitaryFacilities.map(f => (
                <div key={f.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{f.name}</span>
                    <span className="text-[10px] text-cyan-400">{f.distanceKm} km away</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{f.capacityPerDay}</span>
                    <span className="text-emerald-400 font-bold">Purity Score: {f.cleanlinessScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
