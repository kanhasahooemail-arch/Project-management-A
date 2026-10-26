export type HologramMode = 
  | 'digital_twin' 
  | 'automobile_v2x' 
  | 'smart_city_gov' 
  | 'quantum_vault' 
  | 'habit_matrix'
  | 'earth_planetary_shield';

export type PerformanceTier = 'ultra' | 'balanced' | 'eco';

export type SectorType = 
  | 'government' 
  | 'semi_government' 
  | 'financial' 
  | 'education' 
  | 'transportation' 
  | 'universal_welfare' 
  | 'automobile' 
  | 'enterprise_commerce';

export type ApprovalStatus = 'approved' | 'pending' | 'review' | 'flagged';

export interface ApprovalRecord {
  id: string;
  sector: SectorType;
  title: string;
  applicant: string;
  jurisdiction: string;
  status: ApprovalStatus;
  timestamp: string;
  securityHash: string;
  verifiedBy: string;
  details: string;
  complianceScore: number;
}

export interface HabitItem {
  id: string;
  title: string;
  category: 'vitality' | 'focus' | 'mobility' | 'civic';
  target: string;
  current: number;
  max: number;
  unit: string;
  completed: boolean;
  streakDays: number;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'android' | 'ios' | 'ar_visor' | 'automobile' | 'desktop';
  status: 'online' | 'synced' | 'pending_sync' | 'offline';
  latencyMs: number;
  batteryLevel: number;
  lastSync: string;
  encryptionKeyFingerprint: string;
}

export interface EncryptedPacket {
  id: string;
  sender: string;
  recipient: string;
  sector: SectorType;
  cipherPayload: string;
  iv: string;
  sha256Digest: string;
  timestamp: string;
  verified: boolean;
}

export interface PerformanceMetrics {
  fps: number;
  batteryPercent: number;
  isCharging: boolean;
  powerConsumptionWatts: number;
  latencyMs: number;
  jitterMs: number;
  gpuLoadPercent: number;
  memoryUsageMb: number;
}

export type HarassmentType = 
  | 'stalking_physical'
  | 'cyber_stalking_harassment'
  | 'eve_teasing_public_transit'
  | 'night_travel_deviation'
  | 'online_blackmail_doxxing'
  | 'domestic_threat_danger'
  | 'imminent_assault_emergency';

export interface PoliceStationNode {
  id: string;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  contactNumber: string;
  stationHead: string;
  cyberCellUnit: string;
  lat: number;
  lng: number;
  isPinkPoliceBooth: boolean;
  activePatrolCars: number;
}

export interface CctvCameraNode {
  id: string;
  name: string;
  poleLocation: string;
  distanceMeters: number;
  status: 'live_recording' | 'standby' | 'police_relaying';
  resolution: string;
  fps: number;
  panTiltZoom: string;
  opticalFacing: string;
  evidenceClipDurationSec: number;
  evidenceSha256: string;
  isNightVisionInfrared: boolean;
}

export interface SafetyAlertRecord {
  id: string;
  timestamp: string;
  type: HarassmentType;
  coordinates: { lat: number; lng: number; accuracyM: number };
  resolvedAddress: string;
  nearestStation: PoliceStationNode;
  cyberCellTicketId: string;
  status: 'dispatched' | 'patrol_en_route' | 'verified_safe' | 'evidence_archived';
  evidenceHash: string;
  contactsNotified: string[];
  audioRecordingCaptured: boolean;
}

export interface AutoEnableSafetyConfig {
  shakeToSos: boolean;
  screamAudioDecibelTrigger: boolean;
  routeDeviationAnomaly: boolean;
  heartRateSpikeAutoTrigger: boolean;
  triplePowerButtonEmulation: boolean;
  silentGuardianMode: boolean;
  emergencyContacts: { name: string; phone: string; relation: string }[];
}

export interface HospitalNode {
  id: string;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  traumaLevel: 'Level 1 Trauma ICU' | 'Level 2 Emergency Trauma' | 'Community Emergency Center';
  emergencyBedsAvailable: number;
  icuAvailable: number;
  doctorOnDuty: string;
  specialtyDoctor: string;
  contactNumber: string;
  ambulanceUnitsReady: number;
  greenCorridorActive: boolean;
  lat: number;
  lng: number;
}

export interface AmbulanceUnit {
  id: string;
  vehicleType: 'Advanced Life Support (ALS) ICU Ambulance' | 'Basic Life Support (BLS)' | 'Air Medevac Helicopter';
  driverName: string;
  paramedicDoctor: string;
  etaMinutes: number;
  distanceKm: number;
  oxygenLevelPercent: number;
  ventilatorActive: boolean;
  greenCorridorRouteApproved: boolean;
  liveSpeedKmh: number;
}

export interface RoadAccidentRecord {
  id: string;
  timestamp: string;
  severity: 'code_red_critical' | 'code_yellow_serious' | 'code_green_minor';
  locationAddress: string;
  coordinates: { lat: number; lng: number };
  gForceImpact: number;
  collisionType: 'multi_vehicle' | 'two_wheeler_tumble' | 'pedestrian_hit' | 'vehicle_rollover';
  assignedHospital: HospitalNode;
  assignedAmbulance: AmbulanceUnit;
  teleDoctorName: string;
  patientEquitablePolicy: 'Universal Egalitarian Access - 100% Equal Priority for Normal & VIP Citizens';
  trafficGreenCorridorStatus: 'engaged_all_signals_cleared';
  status: 'ambulance_en_route' | 'doctor_triage_active' | 'transporting_to_icu' | 'stabilized';
  evidenceCctvLocked: boolean;
  sha256DossierDigest: string;
}

export type DisasterHazardType = 
  | 'flood_inundation'
  | 'hurricane_typhoon'
  | 'tornado_cyclone'
  | 'tsunami_oceanic'
  | 'earthquake_tectonic'
  | 'burning_heatwave_thermal'
  | 'wildlife_corridor_conflict'
  | 'sanitary_clean_water_access';

export interface MeteorologicalEarlyWarning {
  id: string;
  hazardType: DisasterHazardType;
  title: string;
  leadTimeDays: number; // 15 to 30 days ahead
  severityLevel: 'extreme_emergency' | 'severe_watch' | 'advisory_preparation';
  forecastArrivalDate: string;
  confidencePercentage: number;
  meteorologicalDepartmentApprovalId: string;
  meteorologicalSignatory: string;
  impactZone: string;
  precursorSensors: string[];
  preventativeMeasures: string[];
  thermalBurningIndexTempC?: number;
  subductionFaultStressMpa?: number;
  vorticityPressureHpa?: number;
  wildlifeMovementRisk?: string;
  sanitaryAndWaterShelters: string[];
  sha256ClimateDigest: string;
}

export interface SanitaryWaterNode {
  id: string;
  name: string;
  type: '24/7 Pure Filtered Water Kiosk' | 'Autonomous Sanitized Restroom' | 'Decontamination & Cooling Shelter';
  distanceKm: number;
  freePublicAccess: boolean;
  cleanlinessScore: number;
  waterQualityTds: number;
  capacityPerDay: string;
  isSolarPowered: boolean;
}

export type GovernmentProtocolCategory = 
  | 'sovereign_defense' 
  | 'emergency_dispatch' 
  | 'digital_identity' 
  | 'civil_surveillance' 
  | 'planetary_disaster' 
  | 'public_health_sanitation' 
  | 'inter_governmental';

export interface GovernmentProtocolRecord {
  id: string;
  code: string;
  name: string;
  category: GovernmentProtocolCategory;
  authority: string;
  jurisdiction: string;
  treatyStandard: string;
  cryptographicStandard: string;
  complianceLevel: 'MANDATORY_FEDERAL' | 'INTER_GOVERNMENTAL_TREATY' | 'STATUTORY_CIVIL_CODE';
  status: 'enforced_active' | 'ratified_in_mesh' | 'cross_border_sync';
  description: string;
  legalArticle: string;
  sha256VerificationProof: string;
}

export interface WorldwideRegion {
  id: string;
  name: string;
  flag: string;
  code: string;
  primaryEmergencyHotline: string;
  policeDirect: string;
  medicalAmbulance: string;
  fireDisaster: string;
  cyberCellDepartment: string;
  dataSovereigntyFramework: string;
  satelliteRelayBand: string;
  activeProtocolsCount: number;
  edgeLatencyMs: number;
  activeStatus: 'ONLINE_FULL_MESH' | 'EDGE_RELAY_ACTIVE';
}

export interface IndianGovApprovalSanction {
  id: string;
  ministry: string;
  sanctionOrderNumber: string;
  legalActStandard: string;
  gazetteNotificationRef: string;
  signatoryAuthority: string;
  issueDate: string;
  statutoryScope: string;
  verificationSha256: string;
  status: 'OFFICIALLY_GAZETTED_AND_SANCTIONED' | 'CERTIFIED_COMPLIANT';
}

export type ProhibitedContentType = 
  | '18_plus_adult_pornographic_media'
  | 'obscene_video_or_photo'
  | 'deepfake_sexual_harassment'
  | 'bad_sensation_vulgar_assault'
  | 'child_safety_violation_pocso';

export interface AntiObscenityInterceptionRecord {
  id: string;
  timestamp: string;
  prohibitedType: ProhibitedContentType;
  detectedContext: string;
  offenderDeviceHash: string;
  offenderIpMasked: string;
  actionTaken: 'INSTANT_PERMANENT_ACCESS_BLOCK_AND_POLICE_DISPATCH';
  hardwareLockApplied: boolean;
  statutoryActViolated: string;
  firNumber: string;
  dispatchedToCyberCell: string;
  dispatchedToPoliceStation: string;
  policeArrestWarrantStatus: 'ARREST_WARRANT_ISSUED_EN_ROUTE' | 'APPREHENSION_LOGGED';
  evidenceSha256Digest: string;
}

export type AreaType = 'rural_village' | 'urban_city';

export type WelfarePillar = 'health_medical' | 'food_nutrition' | 'home_shelter' | 'clean_water_utilities';

export interface WelfareResourceNode {
  id: string;
  name: string;
  areaType: AreaType;
  pillar: WelfarePillar;
  address: string;
  distanceKm: number;
  contactPhone: string;
  availableCapacity: string;
  is100PercentFree: boolean;
  operatingHours: string;
  officerInCharge: string;
  servicesProvided: string[];
  lat: number;
  lng: number;
}

export interface EmergencyHelpRequest {
  id: string;
  timestamp: string;
  applicantName: string;
  contactPhone: string;
  areaType: AreaType;
  pillar: WelfarePillar;
  specificNeed: string;
  familyMembersCount: number;
  urgencyLevel: 'immediate_critical' | 'same_day_relief' | 'scheduled_support';
  locationAddress: string;
  status: 'relief_kit_dispatched' | 'volunteer_officer_en_route' | 'completed_verified';
  assignedReliefNode: string;
}

export interface StoragePartition {
  id: string;
  name: string;
  category: 
    | 'holographic_ar' 
    | 'safety_cctv_blackbox' 
    | 'disaster_radar' 
    | 'welfare_health_records' 
    | 'accident_v2x_telemetry' 
    | 'biometric_quantum_enclave' 
    | 'system_offline_cache';
  allocatedGb: number;
  usedGb: number;
  encrypted: boolean;
  encryptionStandard: string;
  fileCount: number;
  lastSync: string;
  color: string;
  description: string;
}

export interface HardwareStorageVault128GB {
  totalCapacityGb: 128;
  allocatedGb: number;
  usedGb: number;
  freeGb: number;
  fileSystemType: string;
  storageDriveModel: string;
  driveHealth: string;
  tbwWritten: string;
  readSpeedMbps: number;
  writeSpeedMbps: number;
  isEncryptedAtRest: boolean;
  hardwarePasskeyBound: boolean;
  trimActive: boolean;
  partitions: StoragePartition[];
}

export type NetworkTierType = 
  | 'cellular_2g_edge'
  | 'cellular_3g_4g'
  | 'cellular_5g_ultra'
  | 'satellite_leo_direct'
  | 'wifi_pm_wani'
  | 'offline_ble_mesh'
  | 'lora_radio_frequency'
  | 'zero_rated_emergency';

export interface NetworkNodeProfile {
  id: string;
  name: string;
  type: NetworkTierType;
  category: 'cellular' | 'satellite' | 'wifi' | 'mesh_p2p' | 'radio_frequency' | 'government_zero_rated';
  carrierOrStandard: string;
  signalStrengthPercent: number;
  latencyMs: number;
  downloadSpeed: string;
  uploadSpeed: string;
  isZeroRatedFree: boolean;
  status: 'connected_active' | 'standby_ready' | 'available_to_request';
  compressionRatio: string;
  supportedServices: string[];
  encryption: string;
  coverageScope: string;
  description: string;
}

export interface NetworkAccessRequest {
  id: string;
  timestamp: string;
  targetNetworkId: string;
  networkName: string;
  status: 'requesting' | 'authenticated_granted' | 'switched_active';
  handshakeLatencyMs: number;
  assignedIpOrNodeId: string;
  carrierConfirmationCode: string;
}

export type CompanySectorCategory = 
  | 'top_industrial_heavy' 
  | 'top_it_software' 
  | 'top_non_it_enterprise';

export interface EnterpriseCompanyNode {
  id: string;
  name: string;
  tickerOrBrand: string;
  sectorCategory: CompanySectorCategory;
  industryType: string;
  headquarters: string;
  globalPresence: string;
  marketCapOrScale: string;
  connectedStatus: 'LIVE_INTEGRATED' | 'STRATEGIC_PARTNER';
  experienceFeatureTitle: string;
  experienceDescription: string;
  telemetryMetrics: { label: string; value: string }[];
  interactiveActionLabel: string;
  interactiveActionFeedback: string;
  esgAndGovCertification: string;
  tags: string[];
}

export interface SkillGameItem {
  id: string;
  title: string;
  category: 'esports_speed_reflex' | 'ai_code_puzzles' | 'civic_clean_energy' | 'road_safety_pilot';
  skillType: string;
  dailyPrizePool: string;
  entryFee: string; // 100% Free Sponsored by CSR & Gov Innovation Funds
  maxWinPerRound: string;
  activePlayersCount: number;
  trendingRank: number;
  difficulty: 'Casual Skill' | 'Pro Speed' | 'Master Arena';
  description: string;
  gameRuleSnippet: string;
  meitySrbVerificationId: string;
  iconName: string;
}

export interface PlayerWalletState {
  totalProfitWon: number;
  withdrawableBalance: number;
  totalMatchesWon: number;
  rankBadge: string;
  tdsCertificateAvailable: boolean;
  recentPayouts: {
    id: string;
    amount: string;
    method: string;
    status: 'transferred_immediate' | 'processing';
    timestamp: string;
    utrNumber: string;
  }[];
}

export type DigitalMediaType = 'ebook' | 'journal' | 'magazine' | 'movie' | 'song';

export interface DigitalMediaItem {
  id: string;
  title: string;
  type: DigitalMediaType;
  genreOrSubject: string;
  authorOrArtist: string;
  publisherOrStudio: string;
  year: number;
  fileSizeOrDuration: string;
  is100PercentFree: boolean;
  isFamilySafe: boolean;
  coverAccent: string;
  description: string;
  sampleQuoteOrTrack: string;
  offlineCached: boolean;
}

export type CommerceCategory = 'food_grocery' | 'fresh_farm' | 'handloom_crafts' | 'electronics' | 'medicines';

export interface CommerceProductItem {
  id: string;
  title: string;
  category: CommerceCategory;
  sellerName: string;
  sellerLocation: string;
  price: string;
  originalPrice: string;
  discountBadge: string;
  isZeroCommissionOndc: boolean;
  isFairPriceSubsidized: boolean;
  rating: number;
  deliveryEstimate: string;
  description: string;
  badge: string;
  inStock: boolean;
}

export type MeetingRoomType = 
  | 'boardroom_executive' 
  | 'investor_pitch' 
  | 'team_standup' 
  | 'academic_lecture' 
  | 'partnership_negotiation' 
  | 'townhall_public';

export interface BusinessMeetingRoom {
  id: string;
  title: string;
  meetingType: MeetingRoomType;
  hostName: string;
  hostOrganization: string;
  participantsCount: number;
  maxCapacity: number;
  encryptionStandard: string;
  isRecordingActive: boolean;
  meetingCode: string;
  aiMinuteTakerActive: boolean;
  status: 'live_active' | 'scheduled' | 'concluded';
  agendaItems: string[];
}

export interface PartnershipProposal {
  id: string;
  title: string;
  partnerA: string;
  partnerB: string;
  industrySector: string;
  partnershipScope: string;
  status: 'negotiating' | 'approved_digitally_signed' | 'active_consortium';
  smartContractHash: string;
  signedDate: string;
  annualValueEstimated: string;
}



