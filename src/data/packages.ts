import { ServicePackage, DetailingProcessStep, ReviewItem, FAQItem } from '../types';

export const INITIAL_PACKAGES: ServicePackage[] = [
  {
    id: 'basic-wash',
    name: 'BASIC',
    subtitle: 'WASH',
    description:
      'A thorough hand wash, wheel clean, and interior vacuum to bring your car back to a fresh, road-ready shine.',
    themeColor: '#00f0ff',
    mode: 'dark',
    sequenceUrl: '/assets/sequences/default/',
    frameCount: 192,
    framePattern: '/assets/sequences/default/frame_{index}.webp',
    price: '$120',
    estimatedTime: '2 - 3 Hours',
    recommendedFor: 'Routine upkeep & daily drivers',
    features: [
      'Two-bucket safe hand wash & foam cannon bath',
      'Wheel barrels, face & tire degrease clean',
      'Tire dressing with matte satin UV barrier',
      'Thorough interior vacuum & dashboard wipe-down',
      'Streak-free interior and exterior window clarity',
      'pH-neutral spray sealant gloss finish (30 days)'
    ]
  },
  {
    id: 'premium-detail',
    name: 'PREMIUM',
    subtitle: 'DETAIL',
    description:
      'Full exterior decontamination, machine polish, and deep interior clean for a showroom-level finish that lasts.',
    themeColor: '#0066ff',
    mode: 'dark',
    sequenceUrl: '/assets/sequences/default/',
    frameCount: 192,
    framePattern: '/assets/sequences/default/frame_{index}.webp',
    price: '$340',
    estimatedTime: '5 - 6 Hours',
    recommendedFor: 'Enthusiasts wanting a comprehensive revival',
    badge: 'MOST POPULAR',
    features: [
      'Everything in Basic Wash plus iron fallout remover',
      'Exfoliating fine clay bar decontamination',
      'Single-stage DA machine polish to enhance gloss 60%',
      'Deep steam cleaning & hot water extraction on fabrics',
      'Leather conditioning with matte OEM finish',
      'Engine bay detail & conditioning',
      'Polymer synthetic sealant coat (6 months protection)'
    ]
  },
  {
    id: 'ceramic-coating',
    name: 'CERAMIC',
    subtitle: 'COATING',
    description:
      'Multi-stage paint correction sealed with a long-lasting ceramic coating for maximum gloss and protection.',
    themeColor: '#38bdf8',
    mode: 'dark',
    sequenceUrl: '/assets/sequences/default/',
    frameCount: 192,
    framePattern: '/assets/sequences/default/frame_{index}.webp',
    price: '$890',
    estimatedTime: '1 - 2 Days',
    recommendedFor: 'Luxury, exotic & long-term paint defense',
    badge: 'FLAGSHIP PROTECTION',
    features: [
      'Full exterior multi-stage chemical & mechanical decon',
      'Multi-stage rotary & DA paint correction (eliminates 85-95% swirls)',
      '9H Professional-grade Si02 Ceramic Coating applied',
      'Hydrophobic glass treatment on all windows & windshield',
      'High-temp ceramic wheel face & brake caliper protection',
      'Infrared heat lamp curing for permanent covalent bonding',
      '3-Year certified warranty & complimentary first inspection wash'
    ]
  }
];

export const PROCESS_STEPS: DetailingProcessStep[] = [
  {
    step: '01',
    title: 'Decontamination & Safe Pre-Wash',
    description:
      'Thick snow foam dissolves road grime before any contact. Iron fallout dissolvers and clay bars eliminate embedded metallic particulates for smooth-as-glass paint.',
    highlight: 'pH Neutral Snow Foam & Chemical Iron Decon',
    icon: 'Droplets'
  },
  {
    step: '02',
    title: 'Multi-Stage Paint Correction',
    description:
      'Using dual-action rotary polishers with precision abrasives and digital paint depth gauges, we safely level micro-scratches, swirl marks, and oxidation.',
    highlight: 'Micro-Finishing Pads & 95%+ Swirl Removal',
    icon: 'Sparkles'
  },
  {
    step: '03',
    title: '9H Nano-Ceramic Shield Bonding',
    description:
      'Ultra-pure silicon dioxide (SiO2) formula bonds molecularly to the clear coat, forming an impervious, self-cleaning hydrophobic glass barrier.',
    highlight: 'Extreme Hydrophobicity & 110° Water Contact Angle',
    icon: 'Shield'
  },
  {
    step: '04',
    title: 'Infrared Thermal Curing & Inspection',
    description:
      'Shortwave infrared curing lamps solidify coating cross-linking at molecular temperatures, followed by 3000K-6000K LED inspection under showroom lighting.',
    highlight: 'Certified Laboratory Finish & Long-Term Warranty',
    icon: 'Sun'
  }
];

export const TESTIMONIALS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    vehicle: 'Porsche 911 GT3 (992) Touring',
    package: 'Ceramic Coating',
    rating: 5,
    date: '2 weeks ago',
    comment:
      'The optical depth on the paint after their 2-stage correction is unreal. Water beads off like liquid mercury on the highway. AutoShine is the only detailing studio I trust with my GT3.',
    avatarSeed: 'marcus'
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    vehicle: 'BMW M4 Competition',
    package: 'Premium Detail',
    rating: 5,
    date: '1 month ago',
    comment:
      'Transformed a car that had minor track day swirl marks into a flawless mirror. The interior looks and smells like it just rolled out of the Munich assembly floor.',
    avatarSeed: 'elena'
  },
  {
    id: 'rev-3',
    name: 'David Chen',
    vehicle: 'Mercedes-AMG G63',
    package: 'Ceramic Coating',
    rating: 5,
    date: '3 weeks ago',
    comment:
      'The gloss and swirl elimination on obsidian black paint is jaw-dropping. Cleanups take literally 10 minutes now because dirt slides off effortlessly.',
    avatarSeed: 'david'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How does ceramic coating differ from standard wax or synthetic sealant?',
    answer:
      'Traditional waxes and sealants sit on top of the clear coat and wash away after 1-3 months. Professional ceramic coatings chemically bond with your paint at a molecular level, creating a permanent, glass-like quartz layer that lasts for years, resists harsh chemicals (pH 2-12), and delivers relentless hydrophobic beading.',
    category: 'Protection'
  },
  {
    question: 'Do you offer mobile detailing or must I drop off the car at your studio?',
    answer:
      'We provide both! For Basic and Premium details, our fully equipped self-contained mobile detailing van can visit your home or office with on-board deionized water and power. For Ceramic Coatings and multi-stage paint correction, we recommend our temperature and dust-controlled studio for optimal curing and infrared lamp bonding.',
    category: 'Service'
  },
  {
    question: 'How long does a full ceramic coating service take?',
    answer:
      'A true ceramic coating requires proper prep work: multi-stage chemical decontamination, clay bar, multi-stage paint correction, panel wipe IPA preparation, coating application, and a minimum of 12-24 hours of infrared-assisted indoor curing. The entire process typically spans 1 to 2 business days.',
    category: 'Timing'
  },
  {
    question: 'Will paint correction remove all scratches from my vehicle?',
    answer:
      'Paint correction will safely remove 85% to 95% of swirl marks, light scratches, water etching, and holograms that reside in the clear coat. Deep scratches that have penetrated through the clear coat to the primer or bare metal cannot be polished out without touching up or repainting, but our technicians will blend and reduce their visibility significantly.',
    category: 'Paint Correction'
  },
  {
    question: 'How should I wash and maintain my car after it is ceramic coated?',
    answer:
      'We recommend washing every 2-3 weeks using the two-bucket method with a grit guard, a plush microfiber wash mitt, and a pH-neutral car shampoo free of waxes. Never run your vehicle through automated nylon brush car washes. We also provide every client with a complimentary maintenance guide and recommended aftercare solutions.',
    category: 'Maintenance'
  }
];
