import React, { useState } from 'react';
import { 
  DigitalMediaItem, 
  DigitalMediaType, 
  CommerceProductItem, 
  CommerceCategory, 
  BusinessMeetingRoom, 
  MeetingRoomType, 
  PartnershipProposal 
} from '../types';
import { sound } from '../utils/audio';
import { 
  BookOpen, 
  FileText, 
  Newspaper, 
  Film, 
  Music, 
  ShoppingBag, 
  Video, 
  Users2, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Play, 
  Pause, 
  Search, 
  Eye, 
  ShoppingCart, 
  CheckCircle2, 
  Building2, 
  HeartHandshake, 
  Utensils, 
  Wheat, 
  Coins, 
  Tv, 
  PhoneCall, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Monitor, 
  FileCheck2, 
  HardDrive,
  Award,
  Zap,
  Tag,
  ArrowRight
} from 'lucide-react';

interface Props {
  isHighContrast: boolean;
  onHubAlert?: (msg: string) => void;
}

const DIGITAL_MEDIA_ITEMS: DigitalMediaItem[] = [
  // E-Books
  {
    id: 'med-ebk-01',
    title: 'Universal Quantum Mechanics & Spatial AR Principles',
    type: 'ebook',
    genreOrSubject: 'Advanced Physics & Spatial Computing',
    authorOrArtist: 'Dr. Vikram Sarabhai Academy of Sciences',
    publisherOrStudio: 'Open Science Foundation',
    year: 2025,
    fileSizeOrDuration: '24 MB · 480 Pages',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-cyan-900 to-blue-950',
    description: 'Comprehensive graduate textbook on quantum entanglement, photonic waveguides, and spatial 3D holographic rendering.',
    sampleQuoteOrTrack: 'Chapter 4: Photonic light fields reconstruct depth through diffraction interference with sub-wavelength precision.',
    offlineCached: true
  },
  {
    id: 'med-ebk-02',
    title: 'The Great Indian Civilizational Heritage & Republic Accord',
    type: 'ebook',
    genreOrSubject: 'History, Constitutional Law & Philosophy',
    authorOrArtist: 'National Archives & Sovereign Heritage Board',
    publisherOrStudio: 'Public Citizen Press',
    year: 2024,
    fileSizeOrDuration: '18 MB · 620 Pages',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-amber-900 to-orange-950',
    description: 'An exhaustive exploration of ancient democratic councils, maritime trade routes of the Indian Ocean, and constitutional liberty.',
    sampleQuoteOrTrack: 'Preamble: We, the people, resolve to secure for all citizens justice, equality, liberty, and universal fraternity.',
    offlineCached: false
  },
  // Journals
  {
    id: 'med-jrn-01',
    title: 'Journal of Planetary Climate Modeling & Seismic Forecasting',
    type: 'journal',
    genreOrSubject: 'Earth Sciences & Geophysics',
    authorOrArtist: 'Prof. Ananya Sen, IIT Kharagpur Geophysical Lab',
    publisherOrStudio: 'Peer-Reviewed Indian Journal of Earth Sciences',
    year: 2026,
    fileSizeOrDuration: '12 MB · Vol. 48, Issue 3',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-emerald-900 to-teal-950',
    description: 'Breakthrough research on 15-30 day advance megaflood, earthquake fault-line stress, and cyclone cyclogenesis early warnings.',
    sampleQuoteOrTrack: 'Abstract: Ocean subduction acoustic telemetry enables multi-week predictive horizons with 94.2% statistical confidence.',
    offlineCached: true
  },
  {
    id: 'med-jrn-02',
    title: 'Lancet Public Health: Rural Primary Care & Nutritional Security',
    type: 'journal',
    genreOrSubject: 'Medical Research & Healthcare Policy',
    authorOrArtist: 'All India Institute of Medical Sciences (AIIMS)',
    publisherOrStudio: 'Universal Medical Review',
    year: 2025,
    fileSizeOrDuration: '8 MB · Special Issue',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-rose-900 to-red-950',
    description: 'Egalitarian community health models, maternal safety protocols, and zero-cost generic pharmaceuticals.',
    sampleQuoteOrTrack: 'Conclusion: Decentralized telemedicine kiosks reduced rural emergency triage latency from 4 hours to 8 minutes.',
    offlineCached: false
  },
  // Magazines
  {
    id: 'med-mag-01',
    title: 'Global Tech & Clean Energy Frontiers (October 2026)',
    type: 'magazine',
    genreOrSubject: 'Technology, Hydrogen Gigafactories & AI',
    authorOrArtist: 'Frontier Science Editorial Consortium',
    publisherOrStudio: 'Horizon Media Group',
    year: 2026,
    fileSizeOrDuration: '45 MB · High-Res Color Edition',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-purple-900 to-indigo-950',
    description: 'Features inside stories on Tata EV Gigafactories, Reliance green hydrogen electrolyzers, and NVIDIA Blackwell supercomputers.',
    sampleQuoteOrTrack: 'Cover Story: How decentralized microgrids and sodium-ion batteries are powering 600,000 villages with 100% clean solar.',
    offlineCached: true
  },
  // Movies & Documentaries
  {
    id: 'med-mov-01',
    title: 'The Silent Blue: Oceans, Tsunamis & Coastal Guardians',
    type: 'movie',
    genreOrSubject: '4K Ultra-HD Feature Documentary (All Ages / Family Safe)',
    authorOrArtist: 'National Geographic & Ministry of Earth Sciences',
    publisherOrStudio: 'Sovereign Cinema Labs',
    year: 2025,
    fileSizeOrDuration: '1h 48m · 4K Spatial Audio Stream',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-blue-900 to-sky-950',
    description: 'A breathtaking cinematic journey into oceanic depths, tsunami warning buoys, coral conservation, and coastal fishing villages.',
    sampleQuoteOrTrack: 'Narrator: Across fifteen thousand kilometers of coastline, acoustic sensors guard the lives of sixty million coastal souls.',
    offlineCached: false
  },
  {
    id: 'med-mov-02',
    title: 'Voices of the Soil: Organic Farmers & Village Revolution',
    type: 'movie',
    genreOrSubject: 'Inspirational Rural Drama & Agriculture Film',
    authorOrArtist: 'National Film Development Corporation',
    publisherOrStudio: 'Gramin Cinema Consortium',
    year: 2026,
    fileSizeOrDuration: '2h 12m · Full HD 1080p',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-yellow-900 to-amber-950',
    description: 'The heartwarming story of a young rural woman agronomist uniting five villages to build a community solar irrigation network.',
    sampleQuoteOrTrack: 'Dialogue: When a village stands together, the driest parched soil turns into green fields of gold.',
    offlineCached: true
  },
  // Songs & Music
  {
    id: 'med-sng-01',
    title: 'Raga Bhairavi: Sunrise Awakening & Neural Focus',
    type: 'song',
    genreOrSubject: 'Indian Classical & Binaural Spatial Meditation',
    authorOrArtist: 'Pandit Hariprasad Chaurasia & Sitar Ensemble',
    publisherOrStudio: 'Sovereign Classical Audio Archives',
    year: 2024,
    fileSizeOrDuration: '24m 18s · 24-bit 96kHz Lossless Flac',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-amber-900 to-red-950',
    description: 'Soothing morning flute melody scientifically tuned to 432 Hz to enhance cognitive concentration, deep focus, and stress release.',
    sampleQuoteOrTrack: 'Flute Cadence: Resonant bansuri harmonics creating alpha-wave brain entrainment.',
    offlineCached: true
  },
  {
    id: 'med-sng-02',
    title: 'Echoes of the High Himalayas: Folk Symphony & Chants',
    type: 'song',
    genreOrSubject: 'World Mountain Folk & Ambient Soundscape',
    authorOrArtist: 'Himalayan Folk Heritage Collective',
    publisherOrStudio: 'Universal Cultural Preservation Fund',
    year: 2025,
    fileSizeOrDuration: '18m 42s · Dolby Atmos Spatial',
    is100PercentFree: true,
    isFamilySafe: true,
    coverAccent: 'from-teal-900 to-cyan-950',
    description: 'Traditional mountain instruments, cedar wood flutes, and deep meditative bells evoking snow-capped peaks and tranquil valleys.',
    sampleQuoteOrTrack: 'Chorus: Ancient Tibetan and Pahadi prayers for universal peace and prosperity.',
    offlineCached: false
  }
];

const COMMERCE_PRODUCTS: CommerceProductItem[] = [
  {
    id: 'com-prd-01',
    title: 'Annapurna Emergency Nutrition Ration Kit (Free Relief / Fair Price)',
    category: 'food_grocery',
    sellerName: 'Public Distribution Network (PDS) & Annapurna Trust',
    sellerLocation: 'Central Civic Grain Depot, Block A',
    price: '₹0.00 / $0.00 (100% Free Relief)',
    originalPrice: '₹1,200',
    discountBadge: '100% CITIZEN SUBSIDY',
    isZeroCommissionOndc: true,
    isFairPriceSubsidized: true,
    rating: 5.0,
    deliveryEstimate: 'Same-Day 2-Hour Dispatch',
    description: 'Includes 10 kg Grade-A Wheat, 5 kg Sona Masoori Rice, 2 kg Toor Dal, 1 Liter Fortified Mustard Oil, Iodized Salt & Haldi for vulnerable families.',
    badge: 'FREE WELFARE STAPLE',
    inStock: true
  },
  {
    id: 'com-prd-02',
    title: 'Organic Sharbati Whole Wheat Grain (Direct Farm Harvest)',
    category: 'fresh_farm',
    sellerName: 'Kisan Cooperative Organic Producer Co.',
    sellerLocation: 'Sehore Organic Farmlands, Madhya Pradesh',
    price: '₹42 / kg ($0.50)',
    originalPrice: '₹68 / kg',
    discountBadge: 'DIRECT FARMER TO CONSUMER',
    isZeroCommissionOndc: true,
    isFairPriceSubsidized: false,
    rating: 4.9,
    deliveryEstimate: 'Next-Day Direct Farm Delivery',
    description: 'Pesticide-free, naturally rainwater-fed golden Sharbati wheat grains directly harvested by village farmers with zero middleman commission.',
    badge: '100% ORGANIC CERTIFIED',
    inStock: true
  },
  {
    id: 'com-prd-03',
    title: 'Cold-Pressed Pure Mustard Oil (Kachi Ghani Wooden Churn)',
    category: 'food_grocery',
    sellerName: 'Rural Gramodyog Women Cooperative',
    sellerLocation: 'Village Khurja Processing Unit',
    price: '₹140 / Liter ($1.68)',
    originalPrice: '₹210 / Liter',
    discountBadge: '33% OFF DIRECT KHADI',
    isZeroCommissionOndc: true,
    isFairPriceSubsidized: false,
    rating: 4.8,
    deliveryEstimate: '2 Days Delivery',
    description: 'Traditionally stone-churned mustard oil rich in natural antioxidants and omega-3 fatty acids without chemical refining or heat damage.',
    badge: 'KACHI GHANI NATURAL',
    inStock: true
  },
  {
    id: 'com-prd-04',
    title: 'Handwoven Sambalpuri Ikat Cotton Saree (GI Tagged Artisan Craft)',
    category: 'handloom_crafts',
    sellerName: 'Weavers Handloom Consortium, Bargarh',
    sellerLocation: 'Odisha Handloom Cluster',
    price: '₹1,850 ($22.00)',
    originalPrice: '₹3,500',
    discountBadge: '47% WEAVER FAIR WAGE',
    isZeroCommissionOndc: true,
    isFairPriceSubsidized: false,
    rating: 4.95,
    deliveryEstimate: '3-4 Days Insured Transit',
    description: 'Authentic Geographical Indication (GI) tagged handwoven tie-and-dye cotton saree. Hand-spun yarn made on traditional wooden pit looms.',
    badge: 'GI TAGGED HANDLOOM',
    inStock: true
  },
  {
    id: 'com-prd-05',
    title: 'Solar LED Rural Reading Lamp & Multi-Device Power Bank',
    category: 'electronics',
    sellerName: 'Gram Urja Green Innovations',
    sellerLocation: 'Pune Clean Tech Lab',
    price: '₹499 ($6.00)',
    originalPrice: '₹999',
    discountBadge: '50% CLEAN ENERGY WAIVER',
    isZeroCommissionOndc: true,
    isFairPriceSubsidized: true,
    rating: 4.85,
    deliveryEstimate: '1-2 Days Express Delivery',
    description: 'High-efficiency monocrystalline solar reading lamp with 32-hour battery backup, mobile charging port, and impact-resistant water-proof casing.',
    badge: 'SOLAR SELF-POWERED',
    inStock: true
  }
];

const MEETING_ROOMS: BusinessMeetingRoom[] = [
  {
    id: 'mtg-01',
    title: 'Executive Boardroom Strategy & Q4 Capital Allocation',
    meetingType: 'boardroom_executive',
    hostName: 'Kanha Sahoo (Executive Director)',
    hostOrganization: 'AURA NEXUS Consortium & Enterprise Partners',
    participantsCount: 8,
    maxCapacity: 50,
    encryptionStandard: 'Post-Quantum Kyber-1024 E2EE',
    isRecordingActive: true,
    meetingCode: 'AURA-BOARD-8821',
    aiMinuteTakerActive: true,
    status: 'live_active',
    agendaItems: [
      'Universal Lifetime Free Access Expansion & Zero-Billing Audit',
      '128 GB Storage Vault Rollout across Rural Gram Panchayats',
      'Industrial Consortium Agreements with Tata, Reliance & Siemens'
    ]
  },
  {
    id: 'mtg-02',
    title: 'Seed & Series-A Venture Investor Pitch Arena',
    meetingType: 'investor_pitch',
    hostName: 'Dr. Priya Nair (Founder)',
    hostOrganization: 'Kisan Agritech EV Startup Cohort',
    participantsCount: 14,
    maxCapacity: 100,
    encryptionStandard: 'AES-256-GCM Hardware Sealed',
    isRecordingActive: true,
    meetingCode: 'AURA-PITCH-4402',
    aiMinuteTakerActive: true,
    status: 'live_active',
    agendaItems: [
      'Autonomous Electric Tractor Prototype Telemetry Demo',
      'Soil Sensor Mesh Financial Unit Economics & Farmer Adoption',
      'Open Q&A with Sovereign Climate Fund Angels'
    ]
  },
  {
    id: 'mtg-03',
    title: 'Consortium Engineering Daily Standup & CAD Review',
    meetingType: 'team_standup',
    hostName: 'Lead Architect Rajesh Verma',
    hostOrganization: 'Cross-Platform Fleet & V2X Core Team',
    participantsCount: 22,
    maxCapacity: 50,
    encryptionStandard: 'Curve25519 Duplex Stream',
    isRecordingActive: false,
    meetingCode: 'AURA-STANDUP-1109',
    aiMinuteTakerActive: true,
    status: 'live_active',
    agendaItems: [
      'Sub-3ms 5G Network Slicing Handshake Optimization',
      'Real-Time Live SOS WebRTC Duplex VoIP Packet Integrity',
      'MeitY Skill Gaming Permissible Engine Compliance Sync'
    ]
  },
  {
    id: 'mtg-04',
    title: 'Sovereign Public Town Hall: Citizen Safety & Welfare Rights',
    meetingType: 'townhall_public',
    hostName: 'District Magistrate & Civic Council',
    hostOrganization: 'State Ministry of Public Welfare & Disaster Defense',
    participantsCount: 340,
    maxCapacity: 5000,
    encryptionStandard: 'Public Verified Civic Broadcast',
    isRecordingActive: true,
    meetingCode: 'AURA-TOWNHALL-0001',
    aiMinuteTakerActive: true,
    status: 'live_active',
    agendaItems: [
      '100% Equal Triage Road Accident Ambulance Protocol Presentation',
      'Jan Aushadhi Free Medicine Depot Expansion in 500 Villages',
      'Open Citizen Floor for Direct Grievance Redressal'
    ]
  }
];

const PARTNERSHIP_PROPOSALS: PartnershipProposal[] = [
  {
    id: 'prt-01',
    title: 'Tata Motors EV Fleet & V2X Ambulance Dispatch Accord',
    partnerA: 'Tata Motors Commercial Vehicles',
    partnerB: 'National Emergency Response System (112 ERSS)',
    industrySector: 'Automotive Electric Vehicles & Healthcare Telematics',
    partnershipScope: 'Zero-VIP bias automated hospital ambulance green corridors, EV rapid chargers at every police booth, and vehicle crash sensor integration.',
    status: 'approved_digitally_signed',
    smartContractHash: '0x8f4b22c71048bcae9123891048aefb019482c0192837',
    signedDate: 'October 2026',
    annualValueEstimated: '₹450 Crores ($54M USD)'
  },
  {
    id: 'prt-02',
    title: 'ITC e-Choupal & PDS Fair-Price Grain Logistics Consortium',
    partnerA: 'ITC Agri Business Division',
    partnerB: 'Gramin Farmer Welfare Producer Consortium',
    industrySector: 'Agriculture, Food Staples & Direct Farmer Procurement',
    partnershipScope: 'Guaranteed fair minimum prices for 500,000 village farmers, direct zero-commission delivery to PDS ration depots, and food security assurance.',
    status: 'active_consortium',
    smartContractHash: '0x1a99bc481029dfba882103847aef9018247ca8819284',
    signedDate: 'September 2026',
    annualValueEstimated: '₹1,200 Crores ($145M USD)'
  },
  {
    id: 'prt-03',
    title: 'TCS Sovereign Digital Infrastructure & Post-Quantum Banking Integration',
    partnerA: 'Tata Consultancy Services (TCS)',
    partnerB: 'AURA NEXUS Consortium Node Alpha',
    industrySector: 'Information Technology, Sovereign Cloud & Zero-Trust',
    partnershipScope: 'Direct API integration into BaNCS core banking for instantaneous zero-fee citizen welfare transfers and NIST post-quantum encryption verification.',
    status: 'approved_digitally_signed',
    smartContractHash: '0xcc10948abfe29814400192305a4ec8912d0912ab8841',
    signedDate: 'August 2026',
    annualValueEstimated: '₹850 Crores ($102M USD)'
  }
];

export const UniversalMediaCommerceMeetingsHub: React.FC<Props> = ({ isHighContrast, onHubAlert }) => {
  const [activeMainWing, setActiveMainWing] = useState<'media_library' | 'food_commerce' | 'business_meetings' | 'partnerships'>('media_library');
  
  // Media filter state
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string>('all');
  const [mediaSearchQuery, setMediaSearchQuery] = useState<string>('');
  const [activeReaderModal, setActiveReaderModal] = useState<DigitalMediaItem | null>(null);
  const [activeAudioPlaying, setActiveAudioPlaying] = useState<DigitalMediaItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeVideoModal, setActiveVideoModal] = useState<DigitalMediaItem | null>(null);

  // Commerce state
  const [commerceCategory, setCommerceCategory] = useState<string>('all');
  const [cartItemsCount, setCartItemsCount] = useState<number>(1);
  const [cartTotal, setCartTotal] = useState<string>('₹0.00 ($0 Free Relief)');
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  // Meeting room simulator state
  const [activeLiveMeeting, setActiveLiveMeeting] = useState<BusinessMeetingRoom | null>(null);
  const [meetingMicOn, setMeetingMicOn] = useState<boolean>(true);
  const [meetingCameraOn, setMeetingCameraOn] = useState<boolean>(true);
  const [meetingScreenSharing, setMeetingScreenSharing] = useState<boolean>(false);
  const [meetingRecording, setMeetingRecording] = useState<boolean>(true);

  // General notice
  const [activeNotice, setActiveNotice] = useState<string | null>(
    'UNIVERSAL DIGITAL COMMONS & COMMERCE ACTIVE: All E-Books, Journals, Movies, Songs, Food Items, Meetings & B2B Partnerships are 100% Free.'
  );

  // Play audio track simulation
  const handleTogglePlaySong = (song: DigitalMediaItem) => {
    if (activeAudioPlaying?.id === song.id && isPlayingAudio) {
      setIsPlayingAudio(false);
      sound.playChirp(440, 0.04);
      setActiveNotice(`Paused audio: ${song.title}`);
    } else {
      setActiveAudioPlaying(song);
      setIsPlayingAudio(true);
      sound.playCallConnected();
      sound.playChirp(880, 0.08);
      setActiveNotice(`Now Playing: ${song.title} (${song.authorOrArtist}) · 100% Free Spatial Audio`);
      if (onHubAlert) onHubAlert(`Playing: ${song.title}`);
    }
  };

  const handleLaunchReader = (item: DigitalMediaItem) => {
    sound.playHologramTap();
    setActiveReaderModal(item);
    setActiveNotice(`Reading: ${item.title}`);
  };

  const handleLaunchMovie = (item: DigitalMediaItem) => {
    sound.playHologramTap();
    setActiveVideoModal(item);
    setActiveNotice(`Streaming 4K Film: ${item.title} (Family Safe / 100% Free)`);
  };

  const handleAddToCart = (product: CommerceProductItem) => {
    sound.playLockSuccess();
    setCartItemsCount(c => c + 1);
    setCheckoutNotice(`Added "${product.title}" to your Zero-Fee Cart. ONDC fair-price settlement active.`);
    setTimeout(() => setCheckoutNotice(null), 3500);
    if (onHubAlert) onHubAlert(`Added ${product.title} to cart`);
  };

  const handleJoinMeeting = (meeting: BusinessMeetingRoom) => {
    sound.playCallConnected();
    setActiveLiveMeeting(meeting);
    setActiveNotice(`Joined encrypted business meeting: ${meeting.title} (Code: ${meeting.meetingCode})`);
    if (onHubAlert) onHubAlert(`Joined meeting: ${meeting.title}`);
  };

  const handleDownloadOfflineMedia = (item: DigitalMediaItem) => {
    sound.playChirp(1040, 0.05);
    const blob = new Blob([JSON.stringify(item, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AURA-128GB-VAULT-MEDIA-${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setActiveNotice(`Saved "${item.title}" to 128 GB Storage Vault for permanent offline access.`);
  };

  const filteredMedia = DIGITAL_MEDIA_ITEMS.filter(item => {
    const matchesType = mediaTypeFilter === 'all' || item.type === mediaTypeFilter;
    const matchesSearch = item.title.toLowerCase().includes(mediaSearchQuery.toLowerCase()) ||
      item.authorOrArtist.toLowerCase().includes(mediaSearchQuery.toLowerCase()) ||
      item.genreOrSubject.toLowerCase().includes(mediaSearchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filteredProducts = COMMERCE_PRODUCTS.filter(prod => {
    return commerceCategory === 'all' || prod.category === commerceCategory;
  });

  return (
    <div className="space-y-6">
      {/* Crown Banner: Universal Digital Commons, Media, Food, Shopping & Meetings Hub */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast
          ? 'bg-black border-cyan-400 text-white'
          : 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>100% FREE UNIVERSAL DIGITAL COMMONS & ONDC E-COMMERCE</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ZERO PAYWALLS · ZERO COMMISSION · ZERO 18+ CONTENT</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-purple-400" />
                <span>HD BUSINESS MEETINGS & CONSORTIUM PARTNERSHIPS</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              Universal Media, Food Commerce, Business Meetings & Partnerships Hub
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl font-sans leading-relaxed">
              Every citizen and enterprise receives <strong>100% free lifetime access</strong> to: 
              <strong> E-Books, Academic Journals & Magazines</strong>; 
              <strong> All-genre Family-Safe Cinema Movies & Spatial Songs</strong>; 
              <strong> Farm-Fresh Food Items & Zero-Commission ONDC Online Shopping</strong>; 
              <strong> Encrypted HD Business Video Meetings</strong> (Boardrooms, Investor Pitches, Standups, Townhalls); and 
              <strong> Enterprise B2B/B2G Partnership Agreements</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-center font-mono">
              <span className="text-slate-400 text-[10px] block">PUBLIC GOOD CHARTER</span>
              <span className="text-emerald-400 font-black text-xl">$0 FOREVER</span>
              <span className="text-[10px] text-cyan-300 block">Universal Free Access</span>
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

      {/* Main 4-Wing Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-900/80 border border-slate-800 rounded-2xl font-mono text-xs">
        <button
          onClick={() => {
            setActiveMainWing('media_library');
            sound.playHologramTap();
          }}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeMainWing === 'media_library'
              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>E-Books, Journals, Magazines, Movies & Songs</span>
        </button>

        <button
          onClick={() => {
            setActiveMainWing('food_commerce');
            sound.playHologramTap();
          }}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeMainWing === 'food_commerce'
              ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Food Items & ONDC Online Shopping</span>
        </button>

        <button
          onClick={() => {
            setActiveMainWing('business_meetings');
            sound.playHologramTap();
          }}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeMainWing === 'business_meetings'
              ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>All Business Meetings & Video Conference</span>
        </button>

        <button
          onClick={() => {
            setActiveMainWing('partnerships');
            sound.playHologramTap();
          }}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeMainWing === 'partnerships'
              ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Platform Partnerships & B2B Cooperation</span>
        </button>
      </div>

      {/* WING 1: DIGITAL LIBRARY & MEDIA PAVILION */}
      {activeMainWing === 'media_library' && (
        <div className="space-y-6">
          {/* Sub-Filters and Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl font-mono text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-slate-500 text-[11px] mr-1">TYPE:</span>
              {[
                { key: 'all', label: 'All Media', icon: Sparkles },
                { key: 'ebook', label: 'E-Books', icon: BookOpen },
                { key: 'journal', label: 'Journals', icon: FileText },
                { key: 'magazine', label: 'Magazines', icon: Newspaper },
                { key: 'movie', label: 'Cinema & Movies', icon: Film },
                { key: 'song', label: 'Songs & Audio', icon: Music }
              ].map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.key}
                    onClick={() => setMediaTypeFilter(t.key)}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap text-[11px] ${
                      mediaTypeFilter === t.key
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mediaSearchQuery}
                onChange={(e) => setMediaSearchQuery(e.target.value)}
                placeholder="Search titles, authors, genres..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Active Audio Bar (If song is playing) */}
          {activeAudioPlaying && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTogglePlaySong(activeAudioPlaying)}
                  className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center hover:bg-purple-400 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{activeAudioPlaying.title}</span>
                    <span className="text-[10px] text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded border border-purple-500/40">
                      NOW PLAYING (432Hz SPATIAL)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeAudioPlaying.authorOrArtist} · {activeAudioPlaying.fileSizeOrDuration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[40, 80, 60, 95, 70, 50, 85, 65, 90, 45].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: isPlayingAudio ? `${h * 0.25}px` : '4px' }}
                      className="w-1 bg-purple-400 rounded-full transition-all duration-150"
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleDownloadOfflineMedia(activeAudioPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 flex items-center gap-1 text-[11px]"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Cache to 128GB</span>
                </button>
              </div>
            </div>
          )}

          {/* Media Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMedia.map(item => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.1)] group"
              >
                <div className="space-y-4">
                  {/* Top Type Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-cyan-400 font-bold">
                      {item.type === 'ebook' ? '📖 E-BOOK' : item.type === 'journal' ? '📑 JOURNAL' : item.type === 'magazine' ? '📰 MAGAZINE' : item.type === 'movie' ? '🎬 MOVIE' : '🎵 SONG'}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                      100% FREE ($0)
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      By {item.authorOrArtist} ({item.year})
                    </p>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {item.genreOrSubject} · {item.fileSizeOrDuration}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 italic">
                    "{item.sampleQuoteOrTrack}"
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  {item.type === 'ebook' || item.type === 'journal' || item.type === 'magazine' ? (
                    <button
                      onClick={() => handleLaunchReader(item)}
                      className="flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-400/50 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>READ ONLINE ($0)</span>
                    </button>
                  ) : item.type === 'movie' ? (
                    <button
                      onClick={() => handleLaunchMovie(item)}
                      className="flex-1 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500 hover:text-white text-blue-300 border border-blue-400/50 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>STREAM 4K CINEMA</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTogglePlaySong(item)}
                      className="flex-1 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500 hover:text-white text-purple-300 border border-purple-400/50 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      {activeAudioPlaying?.id === item.id && isPlayingAudio ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>PAUSE TRACK</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>PLAY AUDIO</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => handleDownloadOfflineMedia(item)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    title="Save to 128 GB Offline Storage Vault"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WING 2: FOOD ITEMS & ONDC ONLINE SHOPPING PLATFORM */}
      {activeMainWing === 'food_commerce' && (
        <div className="space-y-6">
          {/* Commerce Banner & Category Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl font-mono text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-slate-500 text-[11px] mr-1">CATEGORY:</span>
              {[
                { key: 'all', label: 'All Items' },
                { key: 'food_grocery', label: 'Food Staples & Rations' },
                { key: 'fresh_farm', label: 'Organic Farm Harvest' },
                { key: 'handloom_crafts', label: 'Handloom & Artisans' },
                { key: 'electronics', label: 'Solar & Electronics' }
              ].map(c => (
                <button
                  key={c.key}
                  onClick={() => setCommerceCategory(c.key)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-[11px] transition-all ${
                    commerceCategory === c.key
                      ? 'bg-emerald-600 text-white font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Cart Counter */}
            <div className="flex items-center gap-3">
              <div className="p-2 px-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold">CART ({cartItemsCount})</span>
                <span className="text-emerald-400 font-bold">{cartTotal}</span>
              </div>
            </div>
          </div>

          {checkoutNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{checkoutNotice}</span>
            </div>
          )}

          {/* Product Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] group"
              >
                <div className="space-y-4">
                  {/* Badge & ONDC Zero Commission */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                      {product.badge}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-cyan-500/30">
                      ONDC 0% COMMISSION
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-mono text-white group-hover:text-emerald-300 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      Seller: {product.sellerName}
                    </p>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      📍 {product.sellerLocation} · ⚡ {product.deliveryEstimate}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {product.description}
                  </p>

                  {/* Pricing Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono flex items-baseline justify-between">
                    <div>
                      <span className="text-slate-500 text-[10px] block">DIRECT PRICE:</span>
                      <span className="text-2xl font-black text-emerald-400">{product.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 line-through text-xs block">{product.originalPrice}</span>
                      <span className="text-[10px] text-amber-400 font-bold">{product.discountBadge}</span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart / Order Now */}
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD TO CART / ORDER NOW ($0 DELIVERY)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WING 3: ALL TYPES OF BUSINESS MEETINGS & HD VIDEO CONFERENCE */}
      {activeMainWing === 'business_meetings' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-white font-bold text-sm block">
                Universal Encrypted Video Conference & All-Type Business Meetings
              </span>
              <span className="text-slate-400 text-xs">
                Zero time limits, 100% Free, Post-Quantum Kyber E2EE, AI Minute Taker & 128 GB Recording.
              </span>
            </div>
            <button
              onClick={() => {
                sound.playCallConnected();
                handleJoinMeeting(MEETING_ROOMS[0]);
              }}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Video className="w-4 h-4" />
              <span>START INSTANT FREE MEETING ROOM</span>
            </button>
          </div>

          {/* Active Meeting Room Interactive Simulator */}
          {activeLiveMeeting && (
            <div className="p-6 rounded-3xl bg-slate-950 border-2 border-purple-500 space-y-5 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 font-mono">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs text-emerald-400 font-bold uppercase">LIVE MEETING ACTIVE</span>
                    <span className="text-xs text-slate-500">ROOM: {activeLiveMeeting.meetingCode}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{activeLiveMeeting.title}</h3>
                  <p className="text-xs text-slate-400">Host: {activeLiveMeeting.hostName} · {activeLiveMeeting.hostOrganization}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/30 text-xs">
                    {activeLiveMeeting.encryptionStandard}
                  </span>
                  <button
                    onClick={() => setActiveLiveMeeting(null)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                  >
                    LEAVE ROOM
                  </button>
                </div>
              </div>

              {/* Simulated 4-Participant Video Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'You (Host)', org: 'AURA NEXUS Node', speaking: true, color: 'border-cyan-400' },
                  { name: 'Priya Rathore', org: 'Tata Capital Lead', speaking: false, color: 'border-slate-800' },
                  { name: 'Dr. Vikram Sen', org: 'IIT AI Lab Director', speaking: true, color: 'border-purple-400' },
                  { name: 'Meera Patel', org: 'Rural Farmer Mandi Lead', speaking: false, color: 'border-slate-800' }
                ].map((p, idx) => (
                  <div
                    key={idx}
                    className={`h-36 rounded-2xl bg-slate-900/90 border-2 ${p.color} p-3 flex flex-col justify-between font-mono relative overflow-hidden`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400">{p.org}</span>
                      {p.speaking && <span className="text-emerald-400 font-bold animate-pulse">● TALKING</span>}
                    </div>
                    <div className="text-center py-2">
                      <div className="w-10 h-10 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-white font-bold text-sm">
                        {p.name.charAt(0)}
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-white truncate">{p.name}</div>
                  </div>
                ))}
              </div>

              {/* Bottom Meeting Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMeetingMicOn(!meetingMicOn)}
                    className={`p-2.5 rounded-xl border flex items-center gap-1.5 ${
                      meetingMicOn ? 'bg-slate-900 text-slate-200 border-slate-700' : 'bg-rose-950 text-rose-400 border-rose-500'
                    }`}
                  >
                    {meetingMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    <span>{meetingMicOn ? 'Mute' : 'Unmuted'}</span>
                  </button>

                  <button
                    onClick={() => setMeetingCameraOn(!meetingCameraOn)}
                    className={`p-2.5 rounded-xl border flex items-center gap-1.5 ${
                      meetingCameraOn ? 'bg-slate-900 text-slate-200 border-slate-700' : 'bg-rose-950 text-rose-400 border-rose-500'
                    }`}
                  >
                    {meetingCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                    <span>{meetingCameraOn ? 'Cam Off' : 'Cam On'}</span>
                  </button>

                  <button
                    onClick={() => setMeetingScreenSharing(!meetingScreenSharing)}
                    className={`p-2.5 rounded-xl border flex items-center gap-1.5 ${
                      meetingScreenSharing ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-slate-900 text-slate-200 border-slate-700'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>{meetingScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span className="text-emerald-400">● AI Minute Taker: Active</span>
                  <span>·</span>
                  <span className="text-cyan-300">● Recording to 128 GB Vault</span>
                </div>
              </div>
            </div>
          )}

          {/* Meeting Rooms Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MEETING_ROOMS.map(room => (
              <div
                key={room.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 flex flex-col justify-between transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 font-bold">
                      {room.meetingType.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      {room.participantsCount} / {room.maxCapacity} Connected
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-mono text-white">{room.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-sans">
                      Host: {room.hostName} ({room.hostOrganization})
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs">
                    <span className="text-slate-500 text-[10px] block">MEETING AGENDA:</span>
                    {room.agendaItems.map((item, i) => (
                      <div key={i} className="text-slate-300 text-[11px] flex items-center gap-1.5">
                        <span className="text-purple-400">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-cyan-300">CODE: {room.meetingCode}</span>
                  <button
                    onClick={() => handleJoinMeeting(room)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>JOIN MEETING (FREE)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WING 4: ENTERPRISE & MSME PARTNERSHIP PROPOSALS */}
      {activeMainWing === 'partnerships' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-white font-bold text-sm block">
                Universal B2B, B2G & Cooperative Platform Partnership Accord
              </span>
              <span className="text-slate-400 text-xs">
                Open matchmaking between Startups, MSMEs, Cooperatives, and Global Conglomerates with verifiable smart contracts.
              </span>
            </div>
            <button
              onClick={() => {
                sound.playLockSuccess();
                setActiveNotice('Partnership registration form initialized. Submit your enterprise proposal.');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>PROPOSE NEW PARTNERSHIP</span>
            </button>
          </div>

          <div className="space-y-4">
            {PARTNERSHIP_PROPOSALS.map(prop => (
              <div
                key={prop.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all font-mono space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                      {prop.industrySector}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{prop.title}</h3>
                  </div>

                  <div className="text-right">
                    <span className="text-emerald-400 font-black text-sm block">{prop.annualValueEstimated}</span>
                    <span className="text-[10px] text-slate-400">{prop.status.replace('_', ' ').toUpperCase()}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-sans leading-relaxed">
                  {prop.partnershipScope}
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>SMART CONTRACT SEAL: <code className="text-cyan-300">{prop.smartContractHash.slice(0, 24)}...</code></span>
                  </div>
                  <span>SIGNED: {prop.signedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reader Modal (For E-Books & Journals) */}
      {activeReaderModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border-2 border-cyan-400 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-[0_0_60px_rgba(0,240,255,0.3)]">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                  UNIVERSAL OPEN DIGITAL READER
                </span>
                <h3 className="text-lg font-bold font-mono text-white mt-0.5">
                  {activeReaderModal.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  By {activeReaderModal.authorOrArtist} · {activeReaderModal.publisherOrStudio}
                </p>
              </div>
              <button
                onClick={() => setActiveReaderModal(null)}
                className="text-slate-400 hover:text-white font-mono text-sm px-2 py-1"
              >
                ✕ Close
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-serif leading-relaxed text-sm space-y-4">
              <p className="font-bold text-base text-cyan-300 font-sans">
                {activeReaderModal.sampleQuoteOrTrack}
              </p>
              <p>
                {activeReaderModal.description}
              </p>
              <p>
                This open educational work is released under the Universal Public Knowledge Accord. 
                Full text offline caching is automatically enabled on your hardware-bound 128 GB solid-state vault.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-mono text-xs">
              <span className="text-emerald-400">✓ 100% Free Public Library Access</span>
              <button
                onClick={() => handleDownloadOfflineMedia(activeReaderModal)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Offline to 128 GB Vault</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Cinema Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border-2 border-blue-500 rounded-3xl max-w-3xl w-full p-6 space-y-5 shadow-[0_0_60px_rgba(59,130,246,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                  4K ULTRA-HD CINEMA PLAYER (100% FREE & FAMILY SAFE)
                </span>
                <h3 className="text-lg font-bold font-mono text-white mt-0.5">
                  {activeVideoModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white font-mono text-sm px-2 py-1"
              >
                ✕ Close
              </button>
            </div>

            {/* Simulated 4K Player Canvas */}
            <div className="aspect-video w-full rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-4 relative overflow-hidden">
              <Film className="w-16 h-16 text-blue-400 animate-pulse" />
              <div>
                <h4 className="text-xl font-bold font-mono text-white">4K Spatial Stream Active</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Bitrate: 28 Mbps · Audio: Dolby Atmos 7.1.4 · Family Safe Verified
                </p>
              </div>
              <div className="w-full max-w-md h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="w-1/3 h-full bg-blue-500" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-mono text-xs">
              <span className="text-emerald-400">Zero 18+ Content · Pure Public Cinema</span>
              <button
                onClick={() => handleDownloadOfflineMedia(activeVideoModal)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download 4K to 128 GB Vault</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
