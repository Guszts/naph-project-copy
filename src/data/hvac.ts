export type HvacCardTheme = 'cooling' | 'comfort' | 'heating';

export interface HeroFeatureCard {
  id: string;
  theme: HvacCardTheme;
  cardBg: string;
  label: string;
  title: string;
  category: 'Cooling' | 'Air Quality & Controls' | 'Heating';
  serviceName: string;
  summary: string;
  highlights: { step: string; title: string; detail: string }[];
}

export interface HvacServiceItem {
  id: string;
  theme: HvacCardTheme;
  cardBg: string;
  category: 'Cooling' | 'Heating' | 'Air Quality & Controls';
  audience: string;
  title: string;
  description: string;
  included: string[];
}

export const HERO_CARDS: HeroFeatureCard[] = [
  {
    id: 'cooling-card',
    theme: 'cooling',
    cardBg: '#28ACEA',
    label: 'COOLING',
    title: 'Air Conditioning & Cooling',
    category: 'Cooling',
    serviceName: 'Air Conditioning Services',
    summary:
      'Professional AC installation, repairs, and maintenance for dependable cooling across peak summer temperatures.',
    highlights: [
      {
        step: '01',
        title: 'Airflow & Refrigerant Check',
        detail: 'Measure coil temperature drop, static pressure, and condenser performance.',
      },
      {
        step: '02',
        title: 'Targeted Repair or Replacement',
        detail: 'Clear scope options before work begins, whether servicing an existing unit or sizing a new system.',
      },
      {
        step: '03',
        title: 'Balanced Room Cooling',
        detail: 'Verify register airflow and thermostat calibration before wrapping up.',
      },
    ],
  },
  {
    id: 'comfort-card',
    theme: 'comfort',
    cardBg: '#FAA8D0',
    label: 'COMFORT',
    title: 'Smart Thermostats & Air Quality',
    category: 'Air Quality & Controls',
    serviceName: 'Thermostat Solutions',
    summary:
      'Smart thermostat installation, temperature zoning, and indoor air quality upgrades built for steady year-round comfort.',
    highlights: [
      {
        step: '01',
        title: 'Precision Temperature Control',
        detail: 'Clean wiring and setup for programmable and Wi-Fi smart thermostats.',
      },
      {
        step: '02',
        title: 'Ventilation & Filtration',
        detail: 'Solutions designed to improve indoor airflow, reduce dust, and manage humidity.',
      },
      {
        step: '03',
        title: 'Simple Daily Schedules',
        detail: 'Set intuitive day and night temperature curves matched to your household routine.',
      },
    ],
  },
  {
    id: 'heating-card',
    theme: 'heating',
    cardBg: '#F6705E',
    label: 'HEATING',
    title: 'Residential & Commercial Heating',
    category: 'Heating',
    serviceName: 'Heating Services',
    summary:
      'Heating system installation, troubleshooting, and maintenance to keep indoor spaces warm and reliable through cold fronts.',
    highlights: [
      {
        step: '01',
        title: 'Safety & Ignition Inspection',
        detail: 'Check heat exchangers, burners, electrical connections, and safety controls.',
      },
      {
        step: '02',
        title: 'Furnace & Heat Pump Service',
        detail: 'Troubleshooting for uneven heating, short cycling, or delayed startup.',
      },
      {
        step: '03',
        title: 'Winter-Ready Operation',
        detail: 'Full cycle testing to confirm steady heat delivery across every zone.',
      },
    ],
  },
];

export const HVAC_SERVICES: HvacServiceItem[] = [
  {
    id: 'air-conditioning-services',
    theme: 'cooling',
    cardBg: '#28ACEA',
    category: 'Cooling',
    audience: 'Residential & Light Commercial',
    title: 'Air Conditioning Services',
    description:
      'Professional AC installation, repairs, and maintenance for dependable cooling.',
    included: ['Central AC & ductless systems', 'Diagnostics & component repairs', 'Seasonal cooling tune-ups'],
  },
  {
    id: 'heating-services',
    theme: 'heating',
    cardBg: '#F6705E',
    category: 'Heating',
    audience: 'Residential & Commercial',
    title: 'Heating Services',
    description:
      'Heating system installation, troubleshooting, and maintenance.',
    included: ['Furnaces & heat pump systems', 'Ignition & airflow troubleshooting', 'Safe winter startup checks'],
  },
  {
    id: 'hvac-maintenance',
    theme: 'comfort',
    cardBg: '#FAA8D0',
    category: 'Air Quality & Controls',
    audience: 'Year-Round Care',
    title: 'HVAC Maintenance',
    description:
      'Preventive maintenance to support reliable system performance throughout the year.',
    included: ['Spring & fall multi-point checks', 'Coil & drain line cleaning', 'Filter & belt inspections'],
  },
  {
    id: 'indoor-air-quality',
    theme: 'cooling',
    cardBg: '#28ACEA',
    category: 'Air Quality & Controls',
    audience: 'Healthy Indoor Environments',
    title: 'Indoor Air Quality',
    description:
      'Solutions designed to improve ventilation and indoor comfort.',
    included: ['High-efficiency media filtration', 'Whole-home ventilation balancing', 'Humidity control options'],
  },
  {
    id: 'thermostat-solutions',
    theme: 'comfort',
    cardBg: '#FAA8D0',
    category: 'Air Quality & Controls',
    audience: 'Smart Controls',
    title: 'Thermostat Solutions',
    description:
      'Smart thermostat installation and temperature control solutions.',
    included: ['Smart Wi-Fi thermostat setup', 'Multi-zone control calibration', 'Custom schedule walkthrough'],
  },
  {
    id: 'commercial-hvac',
    theme: 'heating',
    cardBg: '#F6705E',
    category: 'Heating',
    audience: 'Offices & Retail Spaces',
    title: 'Commercial HVAC',
    description:
      'Heating and cooling solutions for commercial spaces.',
    included: ['Rooftop & packaged unit service', 'Scheduled preventive visits', 'Comfort zoning for workplaces'],
  },
];

export const SOLUTIONS_PILLARS = [
  {
    number: '01.',
    title: 'Clear diagnostics before work begins',
    description:
      'Every visit starts with a straightforward inspection of airflow, controls, and mechanical components so you understand your options clearly before approving next steps.',
    detail: 'Upfront written scope for repairs and replacements',
  },
  {
    number: '02.',
    title: 'Complete home and commercial coverage',
    description:
      'From residential central air conditioners and furnaces to light commercial rooftop equipment, our services cover heating, cooling, ventilation, and smart controls under one roof.',
    detail: 'Residential & Commercial HVAC Services',
  },
  {
    number: '03.',
    title: 'Preventive care for every season',
    description:
      'Routine spring cooling checks and fall heating inspections help spot worn components early and keep indoor airflow balanced when weather shifts.',
    detail: 'Spring cooling & fall heating readiness',
  },
];

export const MAINTENANCE_PLANS = [
  {
    id: 'single-tune-up',
    name: 'Seasonal Tune-Up',
    scope: 'Single-visit inspection',
    residentialDetail: 'One focused cooling or heating inspection ahead of summer or winter weather.',
    commercialDetail: 'Single-visit mechanical and thermostat check for one light commercial unit.',
    residentialFeatures: [
      'Airflow, filter, and thermostat calibration check',
      'Condenser or burner assembly visual inspection',
      'Condensate drain line clearing',
      'Written system condition summary',
    ],
    commercialFeatures: [
      'Rooftop or split-system operational check',
      'Belt, blower, and electrical terminal inspection',
      'Zone thermostat schedule verification',
      'Written equipment status notes',
    ],
    cta: 'Schedule Service',
    highlighted: false,
  },
  {
    id: 'all-season-care',
    name: 'All-Season Care',
    scope: 'Spring & fall coverage (Demo Plan)',
    residentialDetail: 'Two scheduled seasonal visits each year covering both cooling and heating readiness.',
    commercialDetail: 'Recurring seasonal maintenance schedule tailored for commercial suites and retail spaces.',
    residentialFeatures: [
      'Spring AC preparation & fall heating check',
      'Indoor air quality and filtration review',
      'Smart thermostat optimization check',
      'Priority scheduling window for seasonal visits',
    ],
    commercialFeatures: [
      'Scheduled seasonal heating and cooling visits',
      'Multi-zone airflow and ventilation balancing',
      'Filter replacement schedule coordination',
      'Dedicated commercial estimate contact',
    ],
    cta: 'Get a Free Estimate',
    highlighted: true,
  },
];

export const ABOUT_CARDS = [
  {
    title: 'Focused on practical comfort',
    body: 'Naph focuses on the core systems people depend on every day: reliable air conditioning, steady heating, clean indoor air circulation, and straightforward thermostat control.',
    footnote: 'Heating · Cooling · Ventilation',
  },
  {
    title: 'Transparent U.S. service showcase',
    body: 'Built as a realistic demonstration for residential and commercial HVAC contractors across the United States. All contact details and plan structures shown here are clearly marked as demonstration content.',
    footnote: 'Naph · Demo Showcase',
  },
];

export const HVAC_FAQS = [
  {
    question: 'What types of properties does Airwell HVAC serve?',
    answer:
      'We support both residential homes and commercial spaces, including single-family residences, multi-unit properties, offices, and retail suites.',
  },
  {
    question: 'When should I schedule preventive HVAC maintenance?',
    answer:
      'Most homeowners schedule cooling maintenance in the spring before peak heat and heating maintenance in the fall before cold weather arrives.',
  },
  {
    question: 'Can you install a smart thermostat with my existing system?',
    answer:
      'In most homes, yes. We verify wire compatibility, C-wire availability, and multi-stage heating or cooling settings before completing installation.',
  },
  {
    question: 'How do I request a free estimate for repair or replacement?',
    answer:
      'Use the estimate form on this page or click Get a Quote in the top bar to share your contact information, service needed, and system details.',
  },
];
