export type CareSection = {
  title: string;
  content: string;
  bullets?: string[];
};

export type ScheduleDefaults = {
  feeding: string;
  watering: string;
  cleaning: string;
};

export type CareGuide = {
  humidity: string;
  tempRange: string;
  diet: CareSection;
  diseases: CareSection;
  habitat: CareSection;
  lighting: CareSection;
  humidityDetail: CareSection;
  substrate: CareSection;
  substitutes: CareSection;
  healthRiskSigns: string[];
  scheduleDefaults: ScheduleDefaults;
};

export type ReptileSpecies = CareGuide & {
  slug: string;
  name: string;
  scientificHint: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type Reptile = CareGuide & {
  slug: string;
  name: string;
  scientificHint: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
  species?: ReptileSpecies[];
};

const geckoSpecies: ReptileSpecies[] = [
  {
    slug: "gargoyle-gecko",
    name: "Gargoyle Gecko",
    scientificHint: "Rhacodactylus auriculatus",
    description:
      "Gargoyle geckos are hardy New Caledonian climbers that thrive in tall, planted enclosures with moderate humidity swings.",
    image: "/reptiles/geckos/gargoyle-gecko.svg",
    imageAlt: "Gargoyle gecko placeholder",
    humidity: "60–80% with dry daytime period",
    tempRange: "Day 72–78°F · Night 68–72°F",
    diet: {
      title: "Diet",
      content:
        "Feed a complete gecko diet (CGD) and occasional insects for enrichment and protein balance.",
      bullets: [
        "CGD 3–4 nights weekly: Pangea Fruit Mix Complete or Repashy Crested Gecko Diet",
        "Live insects: adult male banded crickets, small dubia roaches, calciworms (1–2× weekly)",
        "Calcium dust feeders and remove uneaten insects overnight",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Most health issues stem from dehydration, low calcium, or unsanitary décor.",
      bullets: [
        "Metabolic bone disease from poor UVB/calcium coverage",
        "Stuck shed around toes and tail tip",
        "Mouth rot in damp, dirty enclosures",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Prioritize vertical climbing routes, cork bark, and dense cover to reduce stress.",
      bullets: [
        "Single adult: 18×18×24 in minimum",
        "Branches, cork rounds, and plant cover across all heights",
        "Ventilation plus secure climbing surfaces",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Gargoyles do best under a gentle day/night cycle with mild UVB exposure.",
      bullets: [
        "12-hour light cycle",
        "Low-output UVB (2–5%) across part of the enclosure",
        "Avoid basking spots hotter than 82°F",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Mist in the evening, allow partial dry-out by daytime, and monitor with a digital hygrometer.",
      bullets: [
        "Night spike: 75–80%",
        "Daytime target: 55–65%",
        "Increase airflow if condensation persists",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Moisture-retentive but airy substrates support hydration and healthy microfauna.",
      bullets: [
        "Coco fiber or bioactive tropical mix",
        "Leaf litter and sphagnum for humidity pockets",
        "Paper towel for quarantine",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Use temporary solutions only during travel, outages, or quarantine.",
      bullets: [
        "Travel tub with cork hide and ventilation",
        "Hand misting if automatic system fails",
        "Emergency CGD brand swap for short-term feeding",
      ],
    },
    healthRiskSigns: [
      "Wrinkled skin or sunken eyes",
      "Persistent stuck shed",
      "Rapid weight loss or weak grip",
      "Jaw softness or tremors",
    ],
    scheduleDefaults: {
      feeding: "CGD every other night; insects once or twice weekly",
      watering: "Mist nightly and refresh water cup daily",
      cleaning: "Spot clean daily; full enclosure refresh every 2–4 weeks",
    },
  },
  {
    slug: "crested-gecko",
    name: "Crested Gecko",
    scientificHint: "Correlophus ciliatus",
    description:
      "Crested geckos are arboreal geckos that rely on stable room temperatures, vertical cover, and routine misting.",
    image: "/reptiles/geckos/crested-gecko.svg",
    imageAlt: "Crested gecko placeholder",
    humidity: "55–80% with nightly peak",
    tempRange: "Day 72–78°F · Night 68–72°F",
    diet: {
      title: "Diet",
      content:
        "A high-quality CGD is the staple, with feeder insects as optional enrichment.",
      bullets: [
        "CGD 3–5 nights weekly based on age",
        "Crickets or roaches weekly for enrichment",
        "Offer fresh water in elevated cup",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Cresteds often show illness first through appetite changes and climbing weakness.",
      bullets: [
        "MBD linked to low calcium or UVB",
        "Tail injuries from falls or handling",
        "Dehydration during low-humidity periods",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Tall enclosure design with visual cover keeps cresteds active and stress low.",
      bullets: [
        "Single adult: 18×18×24 in minimum",
        "Dense plants and horizontal perches at multiple heights",
        "Background texture for climbing grip",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Provide gentle daytime lighting and optional low UVB without overheating.",
      bullets: [
        "12-hour day/night cycle",
        "Optional 2–5% UVB strip",
        "Avoid enclosure temperatures above 82°F",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Aim for a nighttime rise and daytime drop to prevent respiratory issues.",
      bullets: [
        "Night: 70–80%",
        "Day: 55–65%",
        "Allow brief dry period between mists",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Substrates should support humidity while minimizing mold risk.",
      bullets: [
        "Coco husk, ABG mix, or bioactive tropical soil",
        "Drainage layer for planted enclosures",
        "Paper towel for juveniles in quarantine",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Emergency options should preserve hydration and safe climbing.",
      bullets: [
        "Temporary tub with fake foliage and paper towel",
        "Hand spray bottle during mister downtime",
        "Alternative CGD formulas until preferred brand returns",
      ],
    },
    healthRiskSigns: [
      "Weight drop and reduced tongue-feeding",
      "Weak grip or frequent slips",
      "Sunken eyes and tacky saliva",
      "Stuck shed on toe pads",
    ],
    scheduleDefaults: {
      feeding: "Juveniles CGD daily; adults every other day, plus insects weekly",
      watering: "Mist evening and provide fresh water daily",
      cleaning: "Spot clean daily; sanitize décor monthly",
    },
  },
  {
    slug: "leopard-gecko",
    name: "Leopard Gecko",
    scientificHint: "Eublepharis macularius",
    description:
      "Leopard geckos are terrestrial geckos that need dry ambient air, a warm hide, and a moist hide for shedding support.",
    image: "/reptiles/geckos/leopard-gecko.svg",
    imageAlt: "Leopard gecko placeholder",
    humidity: "30–40% ambient + humid hide",
    tempRange: "Warm hide 88–92°F · Cool side 72–78°F",
    diet: {
      title: "Diet",
      content:
        "Leopard geckos are insectivores that require gut-loaded feeders and scheduled supplementation.",
      bullets: [
        "Staple feeders: medium dubia roaches, adult crickets, silkworms, small superworms",
        "Calcium + D3 dust most feedings; multivitamin with D3 weekly",
        "Feed juveniles daily; adults every 2–3 days",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Common preventable issues involve calcium imbalance, impaction, and retained shed.",
      bullets: [
        "MBD and soft jaw syndrome",
        "Impaction from unsafe loose substrate",
        "Retained shed causing toe loss",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Horizontal floor space and three functional hides are key for thermal behavior.",
      bullets: [
        "Single adult: 36×18 in floor space minimum",
        "Warm hide, cool hide, and dedicated humid hide",
        "Secure slate or low climbing décor",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Use regulated heat and optional low UVB to support metabolism without overheating.",
      bullets: [
        "Overhead heat source with thermostat",
        "Optional low UVB strip for enrichment",
        "No red or blue night bulbs",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Maintain dry ambient humidity while keeping one humid retreat available daily.",
      bullets: [
        "Ambient target: 30–40%",
        "Humid hide: 70%+ with damp moss",
        "Increase ventilation if enclosure stays damp",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Choose stable, low-risk flooring based on age and health status.",
      bullets: [
        "Paper towel for juveniles or medical observation",
        "Slate tile or packed soil/sand blend for healthy adults",
        "Avoid calcium sand and walnut shell",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Short-term alternatives can bridge outages or quarantines safely.",
      bullets: [
        "Plastic tub quarantine with paper substrate",
        "Emergency feeder swaps: black soldier fly larvae or silkworms",
        "Heat mat backup only with thermostat control",
      ],
    },
    healthRiskSigns: [
      "Tail thinning or prolonged refusal to eat",
      "Straining stool or bloating",
      "Retained shed around toes",
      "Tremors or bowed limbs",
    ],
    scheduleDefaults: {
      feeding: "Juveniles daily; adults every 2–3 days",
      watering: "Fresh shallow water daily; humid hide checked daily",
      cleaning: "Spot clean daily; full deep clean every 2–3 weeks",
    },
  },
  {
    slug: "day-gecko",
    name: "Day Gecko",
    scientificHint: "Phelsuma spp.",
    description:
      "Day geckos are fast, diurnal arboreal geckos that need bright light, UVB, and heavily planted vertical spaces.",
    image: "/reptiles/geckos/day-gecko.svg",
    imageAlt: "Day gecko placeholder",
    humidity: "60–80% with airflow",
    tempRange: "Basking 88–92°F · Ambient 75–82°F",
    diet: {
      title: "Diet",
      content:
        "Offer varied insects plus nectar-style mixes to mirror natural feeding behavior.",
      bullets: [
        "Small insects: fruit flies, pinhead crickets, small roaches, micro mealworms dusted with calcium",
        "Commercial nectar: Pangea Fruit Mix or Repashy Day Gecko Diet 2–3 times weekly",
        "Fruit puree: mashed mango, fig, or banana only as occasional supplement",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Skin injuries and stress-related decline are common when handling or enclosure design is poor.",
      bullets: [
        "Skin tears from rough handling",
        "MBD from low UVB and supplementation gaps",
        "Respiratory irritation in stagnant humidity",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "A bright, tall habitat with bamboo and leaf cover supports territorial behavior.",
      bullets: [
        "Single adult: 18×18×24 in minimum (larger preferred)",
        "Live plants and bamboo tubes for security",
        "High perching bask zone with cooler lower area",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Day geckos require strong daytime lighting and safe basking to stay active.",
      bullets: [
        "T5 HO UVB 5–6%",
        "Bright visible light with 12-hour photoperiod",
        "Basking lamp with guarded fixture",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Provide regular misting and recovery dry periods to avoid skin and lung issues.",
      bullets: [
        "Morning and evening misting",
        "Maintain 60–80% with strong ventilation",
        "Let surfaces partially dry between sessions",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Tropical moisture-retaining substrate helps plants and humidity control.",
      bullets: [
        "Bioactive soil with drainage layer",
        "Coco fiber with leaf litter as non-bioactive option",
        "Paper substrate for quarantine",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Emergency setups should prioritize warmth, humidity, and climbing security.",
      bullets: [
        "Travel tub with artificial plants and vertical branches",
        "Manual misting if fogger or mister fails",
        "Short-term feeder rotation using flies or small roaches",
      ],
    },
    healthRiskSigns: [
      "Skin abrasions or peeling",
      "Persistent dark stress coloration",
      "Weak grip at high perches",
      "Sunken eyes or sticky shed",
    ],
    scheduleDefaults: {
      feeding: "Small feeders daily or every other day; nectar mix several times weekly",
      watering: "Mist twice daily and refresh water ledges daily",
      cleaning: "Spot clean daily; full maintenance every 2–4 weeks",
    },
  },
  {
    slug: "moorish-gecko",
    name: "Moorish Gecko",
    scientificHint: "Tarentola mauritanica",
    description:
      "Moorish geckos are hardy Mediterranean geckos that prefer rocky climbing surfaces, moderate humidity, and cooler nights.",
    image: "/reptiles/geckos/moorish-gecko.svg",
    imageAlt: "Moorish gecko placeholder",
    humidity: "45–65%",
    tempRange: "Basking 88–92°F · Cool side 72–76°F",
    diet: {
      title: "Diet",
      content:
        "Primarily insectivorous with varied feeder sizes and supplementation.",
      bullets: [
        "Insects: adult crickets, Turkish roaches, wax moth larvae, occasional mealworms",
        "Calcium dust with D3 every feeding for juveniles; multivitamin once weekly",
        "Remove uneaten insects after 30 minutes to prevent bites",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Poor hygiene and inconsistent heat can quickly trigger appetite and shedding issues.",
      bullets: [
        "Retained shed on digits",
        "Nutritional deficiency from feeder monotony",
        "Respiratory infection in cold damp enclosures",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Moorish geckos need vertical wall-like structure plus a thermal gradient.",
      bullets: [
        "Single adult: 20-gallon tall equivalent minimum",
        "Rock/cork wall zones with multiple crevice hides",
        "Secure screened top for airflow",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Provide a regular photoperiod and modest UVB for long-term bone and immune support.",
      bullets: [
        "12-hour light cycle",
        "Low to moderate UVB strip",
        "Localized basking area with thermostat control",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Moderate humidity with a damp retreat supports proper sheds.",
      bullets: [
        "Ambient 45–65%",
        "Humid hide available at all times",
        "Avoid persistently wet floor substrate",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Select low-dust substrate that handles occasional misting and supports cleanup.",
      bullets: [
        "Paper, tile, or soil/sand blend for adults",
        "Leaf litter around hides for moisture retention",
        "Avoid loose sharp gravel",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Use simple temporary housing during travel, quarantine, or power disruptions.",
      bullets: [
        "Ventilated transport box with paper substrate",
        "Battery backup thermometer/hygrometer monitoring",
        "Feeder substitution with similarly sized insects",
      ],
    },
    healthRiskSigns: [
      "Repeated incomplete sheds",
      "Noticeable weight drop",
      "Labored breathing or clicking sounds",
      "Lethargy during normal active periods",
    ],
    scheduleDefaults: {
      feeding: "Juveniles daily; adults every other day with varied insects",
      watering: "Light mist nightly and change water daily",
      cleaning: "Spot clean daily; full substrate service every 2–3 weeks",
    },
  },
];

const monitorSpecies: ReptileSpecies[] = [
  {
    slug: "nile-monitor",
    name: "Nile Monitor",
    scientificHint: "Varanus niloticus",
    description:
      "Nile monitors are very large, highly intelligent monitors that require expert-level space, security, and enrichment.",
    image: "/reptiles/monitors/nile-monitor.svg",
    imageAlt: "Nile monitor placeholder",
    humidity: "60–80% with humid retreat",
    tempRange: "Basking 130–150°F · Ambient 80–90°F",
    diet: {
      title: "Diet",
      content:
        "Nile monitors need varied whole-prey nutrition and strict portion control to prevent obesity.",
      bullets: [
        "Whole prey: frozen-thawed adult rats (200–300g), freshwater tilapia fillets, whole raw quail",
        "Invertebrates: giant African land snails, large dubia roaches (weekly)",
        "Avoid fatty ground beef and single-item rodent-only diets",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Nile monitors decline quickly when enclosure size, hydration, or UVB is inadequate.",
      bullets: [
        "Obesity and fatty liver disease",
        "Burn injuries from unguarded heat sources",
        "Respiratory infections in stagnant humidity",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Adults need room-scale enclosures with water access and deep substrate.",
      bullets: [
        "Custom enclosure often 12×6×8 ft or larger",
        "Secure lock systems and reinforced barriers",
        "Deep dig substrate plus climb structures",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "High-output UVB and intense basking heat are mandatory for this species.",
      bullets: [
        "T5 HO 10–12% UVB spanning bask and travel paths",
        "Multiple basking platforms at thermal gradient",
        "All heat fixtures caged and thermostat monitored",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Maintain humid burrows and water access while preventing foul, stagnant conditions.",
      bullets: [
        "Ambient 60–80%",
        "Humid shelter for resting and shedding",
        "Frequent water filtration and enclosure drying cycles",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Deep compactable substrate supports digging and moisture layering.",
      bullets: [
        "Topsoil/sand/clay mix 18–24+ in deep",
        "Moist lower layers with drier surface",
        "Replace soiled zones immediately",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Temporary housing should be treated as emergency-only due to size and strength.",
      bullets: [
        "Short quarantine in reinforced stock tanks",
        "Portable radiant heat panel during outages",
        "Whole-prey rotation when one feeder source is unavailable",
      ],
    },
    healthRiskSigns: [
      "Persistent pacing or nose rubbing",
      "Rapid unexplained weight changes",
      "Open-mouth breathing or mucus",
      "Reduced tongue-flicking and responsiveness",
    ],
    scheduleDefaults: {
      feeding: "Juveniles 4–5 times weekly; adults 2–3 times weekly based on body condition",
      watering: "Refresh large water basin daily and sanitize often",
      cleaning: "Spot clean daily; deep sanitize high-contact surfaces weekly",
    },
  },
  {
    slug: "savanna-monitor",
    name: "Savanna Monitor",
    scientificHint: "Varanus exanthematicus",
    description:
      "Savanna monitors are heavy-bodied burrowers that need deep substrate, extreme basking heat, and strict diet control.",
    image: "/reptiles/monitors/savanna-monitor.svg",
    imageAlt: "Savanna monitor placeholder",
    humidity: "45–65% ambient with humid burrows",
    tempRange: "Basking 125–140°F · Ambient 80–90°F",
    diet: {
      title: "Diet",
      content:
        "Savannah monitors are largely insect-focused in the wild and should not rely on rodent-heavy feeding.",
      bullets: [
        "Invertebrates: large Madagascar hissing roaches, garden snails, superworms (limited)",
        "Whole prey: small mice or rat pinkies only as occasional supplement",
        "Calcium + D3 dust every insect feeding for juveniles",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Improper feeding and low enclosure quality often cause chronic metabolic illness.",
      bullets: [
        "Obesity and fatty liver from overfeeding rodents",
        "MBD from UVB/calcium mismatch",
        "Dysecdysis from inadequate humid burrowing zones",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Savannahs require deep diggable substrate and long floor space.",
      bullets: [
        "Adult minimum often 8×4×4 ft",
        "Substrate depth 12–24 in for burrowing",
        "Strong basking platform and secure hides",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Strong UVB and high bask temperatures are essential for digestion and activity.",
      bullets: [
        "T5 HO 10–12% UVB over key zones",
        "Multiple thermometers to verify gradients",
        "12-hour photoperiod with full darkness at night",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Focus on humid substrate pockets rather than constantly wet air.",
      bullets: [
        "Ambient 45–65%",
        "Humid lower burrow layers",
        "Prevent crusted dry sheds with moisture checks",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Substrate must hold tunnels and permit natural digging behavior.",
      bullets: [
        "Soil/sand/clay blend packed for structure",
        "Large area of deep substrate, not shallow decorative layer",
        "Replace compacted soiled sections as needed",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Emergency substitutions should preserve heat gradients and burrow access.",
      bullets: [
        "Temporary heavy-duty tub with deep paper bedding",
        "Invertebrate feeder rotation if staples unavailable",
        "Portable heat projectors during power interruptions",
      ],
    },
    healthRiskSigns: [
      "Visible fat pads and inactivity",
      "Difficulty shedding despite humidity",
      "Bone softness or limb weakness",
      "Chronic appetite suppression",
    ],
    scheduleDefaults: {
      feeding: "Juveniles near-daily invertebrate meals; adults 3–4 structured meals weekly",
      watering: "Large clean water dish daily",
      cleaning: "Spot clean daily; partial substrate turnover weekly",
    },
  },
  {
    slug: "asian-water-monitor",
    name: "Asian Water Monitor",
    scientificHint: "Varanus salvator",
    description:
      "Asian water monitors are giant semi-aquatic lizards that need very large enclosures, swimming access, and controlled humidity.",
    image: "/reptiles/monitors/asian-water-monitor.svg",
    imageAlt: "Asian water monitor placeholder",
    humidity: "65–85%",
    tempRange: "Basking 120–135°F · Ambient 80–88°F",
    diet: {
      title: "Diet",
      content:
        "Balanced whole-prey variety is crucial for growth, muscle tone, and organ health.",
      bullets: [
        "Fish, rodents, chicks, crustaceans, and invertebrates",
        "Portion control to prevent obesity",
        "Juveniles require more frequent smaller meals",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Water quality and heat consistency strongly influence health outcomes.",
      bullets: [
        "Skin infections from dirty soak water",
        "Respiratory infections from cool drafts",
        "MBD in low-UVB or fast-growth juveniles",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Provide land and water zones with robust climbing and basking options.",
      bullets: [
        "Large custom enclosure with secure swim basin",
        "Dry basking decks and multiple hides",
        "Heavy-duty materials that resist claws and humidity",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Use broad UVB coverage and high-output basking arrays for large-body thermoregulation.",
      bullets: [
        "Linear UVB plus auxiliary bright light",
        "Basking areas maintained at species-appropriate high heat",
        "Thermostat and IR temperature checks daily",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Humidity must remain high without compromising air exchange.",
      bullets: [
        "Target 65–85%",
        "Cross ventilation to limit stagnant air",
        "Separate wet and dry microclimates",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Use deep moisture-retaining substrate in terrestrial zones.",
      bullets: [
        "Soil and sand blend with clay binder",
        "Deep bedding for digging and nesting behavior",
        "Frequent replacement in wet, high-traffic areas",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Short-term alternatives should still provide heat, water access, and security.",
      bullets: [
        "Reinforced stock tank with bask platform for emergencies",
        "Filtered kiddie pool only as temporary backup",
        "Feeder substitutions with species-safe whole prey",
      ],
    },
    healthRiskSigns: [
      "Skin ulcers or persistent retained shed",
      "Floating oddly or reduced swim use",
      "Labored breathing",
      "Sudden aggression paired with lethargy",
    ],
    scheduleDefaults: {
      feeding: "Juveniles 5–6 small meals weekly; adults 2–4 balanced meals weekly",
      watering: "Refresh and filter swim water daily",
      cleaning: "Remove waste daily; sanitize bask and swim zones weekly",
    },
  },
  {
    slug: "ackie-monitor",
    name: "Ackie Monitor",
    scientificHint: "Varanus acanthurus",
    description:
      "Ackie monitors are one of the most manageable monitor species, but still require intense heat and deep burrowing substrate.",
    image: "/reptiles/monitors/ackie-monitor.svg",
    imageAlt: "Ackie monitor placeholder",
    humidity: "40–60% ambient with humid burrow core",
    tempRange: "Basking 130–150°F · Cool side 75–85°F",
    diet: {
      title: "Diet",
      content:
        "Ackies thrive on varied invertebrates with occasional whole prey items.",
      bullets: [
        "Dubia, crickets, locusts, and occasional pinky mice",
        "Gut-load feeders and dust calcium routinely",
        "Adjust meal size to maintain lean body condition",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Temperature mistakes and shallow substrate are common husbandry failures.",
      bullets: [
        "MBD from poor UVB/supplementation",
        "Obesity from overfeeding high-fat prey",
        "Nasal abrasions from enclosure stress",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Ackies need a strongly heated bask zone and deep dig opportunities.",
      bullets: [
        "Adult minimum 4×2×2 ft, larger strongly preferred",
        "12+ in compacted substrate for burrows",
        "Rocky bask structures with secure hide chambers",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "High heat and broad UVB support healthy growth and activity.",
      bullets: [
        "T5 HO 10–12% UVB",
        "Very hot basking spot monitored with IR gun",
        "Stable 12-hour daylight schedule",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Keep ambient moderate while maintaining moister lower substrate layers.",
      bullets: [
        "Ambient 40–60%",
        "Humid burrow chambers below surface",
        "Avoid constantly wet top layer",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "A packed soil/sand/clay mix is essential for burrow stability.",
      bullets: [
        "Deep packed substrate with occasional rehydration",
        "Stone/shelf layers for thermal zones",
        "No shallow or loose-only decorative substrate",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "During temporary disruptions, replicate heat and cover first.",
      bullets: [
        "Quarantine tote with multiple hides",
        "Paper substrate during medical treatment",
        "Invertebrate feeder rotation based on availability",
      ],
    },
    healthRiskSigns: [
      "Chronic hiding and refusal to bask",
      "Limb weakness or tremors",
      "Rapid fat gain at tail base",
      "No burrowing behavior despite deep substrate",
    ],
    scheduleDefaults: {
      feeding: "Juveniles daily; adults every other day with portion control",
      watering: "Refresh water daily and lightly moisten burrow zone as needed",
      cleaning: "Spot clean daily; rebuild and sanitize substrate layers monthly",
    },
  },
];

const chameleonSpecies: ReptileSpecies[] = [
  {
    slug: "veiled-chameleon",
    name: "Veiled Chameleon",
    scientificHint: "Chamaeleo calyptratus",
    description:
      "Veiled chameleons are hardy beginner-friendly chameleons that still require strict hydration, UVB, and vertical living space.",
    image: "/reptiles/chameleons/veiled-chameleon.svg",
    imageAlt: "Veiled chameleon placeholder",
    humidity: "40–70% with daytime dry periods",
    tempRange: "Basking 88–95°F · Ambient 72–80°F",
    diet: {
      title: "Diet",
      content:
        "Feed gut-loaded insects with routine calcium and vitamin supplementation.",
      bullets: [
        "Specific insects: adult male banded crickets, orange-headed roaches, small hornworms",
        "Fruit mix: mashed mango, papaya, and banana puree (occasionally)",
        "Calcium dust with D3 on every feeding; multivitamin weekly",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Hydration errors and UVB deficiencies are the most frequent causes of illness.",
      bullets: [
        "MBD and weak grip",
        "Dehydration with sunken eyes",
        "Respiratory infections from poor ventilation",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Screened vertical enclosures with heavy foliage help veileds regulate stress and humidity.",
      bullets: [
        "Adult minimum 24×24×48 in screen cage",
        "Dense plant cover with multiple perch heights",
        "Dedicated bask and cool retreat pathways",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Bright UVB and basking light are required daily.",
      bullets: [
        "T5 HO UVB 5–6% across top screen",
        "Separate basking bulb for thermal gradient",
        "12-hour photoperiod on timer",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Humidity should rise after misting, then fall with strong airflow.",
      bullets: [
        "Morning/evening mist peaks",
        "Daytime dry period to reduce bacterial growth",
        "Track with elevated digital hygrometer",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Bare-bottom or drainage systems are easiest for hygiene and hydration control.",
      bullets: [
        "Bare floor with drainage tray",
        "Potted plants instead of loose floor substrate",
        "Paper towel for quarantine",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Temporary options should maintain hydration and perching opportunities.",
      bullets: [
        "Manual hand misting during mister failure",
        "Drip cup system over foliage",
        "Temporary mesh habitat for transport",
      ],
    },
    healthRiskSigns: [
      "Sunken or closed eyes",
      "Persistent dark stress coloration",
      "Weak tongue projection",
      "Frequent falls from branches",
    ],
    scheduleDefaults: {
      feeding: "Juveniles daily; adults every other day",
      watering: "Mist 2–3 times daily and run dripper during lights-on",
      cleaning: "Remove waste daily; sanitize branches and leaves weekly",
    },
  },
  {
    slug: "panther-chameleon",
    name: "Panther Chameleon",
    scientificHint: "Furcifer pardalis",
    description:
      "Panther chameleons need stable hydration cycles, dense planting, and careful thermal control to preserve color and appetite.",
    image: "/reptiles/chameleons/panther-chameleon.svg",
    imageAlt: "Panther chameleon placeholder",
    humidity: "50–75%",
    tempRange: "Basking 85–92°F · Ambient 72–80°F",
    diet: {
      title: "Diet",
      content:
        "Panthers benefit from broad feeder variety with strict supplement schedules.",
      bullets: [
        "Crickets, roaches, silkworms, and flies",
        "Calcium at most feedings; multivitamin and D3 on schedule",
        "Avoid overfeeding adult males",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Hydration and supplementation mistakes often present as eye and grip issues.",
      bullets: [
        "Dehydration and kidney strain",
        "MBD from inconsistent UVB",
        "Oral and ocular infections in poor airflow",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Tall screened habitats with thick visual barriers reduce stress responses.",
      bullets: [
        "Adult minimum 24×24×48 in screen enclosure",
        "Layered live plants and branch network",
        "Separate bask lane and hidden rest zones",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Panthers require bright daytime illumination and moderate basking temperatures.",
      bullets: [
        "Linear UVB 5–6% with replacement schedule",
        "Basking bulb tuned to mid-80s to low-90s°F",
        "12-hour consistent day/night timing",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Create hydration peaks without leaving the enclosure continuously damp.",
      bullets: [
        "Humidity target 50–75%",
        "Automatic misting and daytime ventilation",
        "Overnight cool-down with moderate humidity rise",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Simple, cleanable floors reduce infection and impaction risk.",
      bullets: [
        "Bare bottom with runoff control",
        "Plant pots topped with smooth stones to block ingestion",
        "Paper towel during observation periods",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Backup hydration and feeder plans prevent rapid decline during equipment outages.",
      bullets: [
        "Hand misting if pumps fail",
        "Drip hydration from elevated container",
        "Feeder swap to roaches/silkworms if crickets unavailable",
      ],
    },
    healthRiskSigns: [
      "Eyes closed during daytime",
      "Loss of grip strength",
      "No feeding response",
      "Persistent gaping or wheezing",
    ],
    scheduleDefaults: {
      feeding: "Juveniles daily; adults every 1–2 days",
      watering: "Mist at least morning and evening; dripper midday",
      cleaning: "Spot clean daily; deep-clean drainage and foliage weekly",
    },
  },
  {
    slug: "jacksons-chameleon",
    name: "Jackson's Chameleon",
    scientificHint: "Trioceros jacksonii",
    description:
      "Jackson's chameleons prefer cooler temperatures, strong airflow, and consistent hydration from misting and drippers.",
    image: "/reptiles/chameleons/jacksons-chameleon.svg",
    imageAlt: "Jackson's chameleon placeholder",
    humidity: "60–80%",
    tempRange: "Basking 80–85°F · Ambient 68–76°F",
    diet: {
      title: "Diet",
      content:
        "Offer smaller varied insects with cautious supplementation to match cooler metabolism.",
      bullets: [
        "Crickets, flies, roaches, and occasional worms",
        "Light calcium schedule to avoid oversupplementation",
        "Gut-load all feeders with quality produce",
      ],
    },
    diseases: {
      title: "Common Diseases",
      content:
        "Jackson's chameleons are sensitive to overheating and poor ventilation.",
      bullets: [
        "Heat stress and chronic dehydration",
        "Respiratory infections in stale air",
        "MBD from low UVB exposure",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "A cool, vertical, heavily planted enclosure is essential for this montane species.",
      bullets: [
        "Adult minimum 24×24×48 in screened enclosure",
        "Dense cool-zone planting with shaded branches",
        "Ample vertical perches and privacy barriers",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Use moderate UVB and gentler basking than lowland chameleon species.",
      bullets: [
        "UVB 5–6% at safe distance",
        "Basking kept around low-to-mid 80s°F",
        "Strict 12-hour day/night cycle",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Humidity must stay relatively high while preserving airflow and cooler temperatures.",
      bullets: [
        "Target 60–80%",
        "Frequent fine misting with dry intervals",
        "Nighttime humidity rise with cool ambient air",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Keep floor simple and drainage-focused to reduce bacterial growth.",
      bullets: [
        "Bare bottom with runoff management",
        "Potted plants on raised trays",
        "Paper substrate during quarantine",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Backup hydration and cooling plans are critical during equipment failures.",
      bullets: [
        "Manual misting plus drip bottle",
        "Portable fan for airflow in hot weather",
        "Temporary tall mesh cage for transport",
      ],
    },
    healthRiskSigns: [
      "Persistent dark coloration and gaping",
      "Weak branch grip or falls",
      "Sunken eyes and dry urates",
      "Loss of appetite beyond normal variation",
    ],
    scheduleDefaults: {
      feeding: "Small varied feeders most days for juveniles, every other day for adults",
      watering: "Mist 2–4 times daily with daytime dripper support",
      cleaning: "Spot clean daily; sanitize drainage and branches weekly",
    },
  },
];

export const reptiles: Reptile[] = [
  {
    slug: "bearded-dragons",
    name: "Bearded Dragons",
    scientificHint: "Pogona vitticeps",
    tagline: "Sun-loving desert companions",
    description:
      "Bearded dragons are calm, curious lizards known for their expressive beards and daytime activity. They thrive with strong heat gradients, UVB, and a varied insect-and-greens diet.",
    image: "/reptiles/bearded-dragon.jpg",
    imageAlt: "Bearded dragon close-up",
    accent: "#c4a35a",
    humidity: "30–40%",
    tempRange: "Basking 95–105°F · Cool 75–85°F",
    diet: {
      title: "Diet",
      content:
        "Juveniles need more protein (insects); adults shift toward leafy greens with insects a few times per week. Dust feeders with calcium (and occasional multivitamin).",
      bullets: [
        "Staple greens: collard, mustard, dandelion, turnip greens",
        "Insects: dubia roaches, crickets, black soldier fly larvae",
        "Occasional treats: squash, bell pepper, blueberries (sparingly)",
        "Avoid: avocado, rhubarb, fireflies, high-oxalate greens as staples",
      ],
    },
    diseases: {
      title: "Possible Diseases",
      content:
        "Most issues come from low UVB, poor calcium, or wet/dirty enclosures.",
      bullets: [
        "Metabolic bone disease (MBD) — soft jaw, tremors, lethargy",
        "Impaction — straining, loss of appetite after large prey/substrate ingestion",
        "Respiratory infection — wheezing, open-mouth breathing, mucus",
        "Parasites — weight loss, runny stools, lethargy",
        "Mouth rot / stomatitis — swelling, cheese-like discharge in mouth",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Adults need horizontal space to run and climb low branches. Prioritize a solid heat gradient over decorative clutter.",
      bullets: [
        "Minimum adult enclosure: 120 gallon / 4×2×2 ft (larger preferred)",
        "Hide on warm and cool ends",
        "Basking platform under heat + UVB",
        "Shallow water dish; sturdy décor that will not tip",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Bearded dragons are diurnal and require high-output UVB plus a focused basking lamp.",
      bullets: [
        "UVB: T5 HO 10–12% linear tube spanning ~½–⅔ of enclosure length",
        "Basking halogen or deep-heat projector for a clear hot spot",
        "12–14 hour day / night cycle; lights off completely at night",
        "Replace UVB bulbs on manufacturer schedule (often 6–12 months)",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Keep humidity low-to-moderate to protect respiratory health while allowing brief humid hides for shedding.",
      bullets: [
        "Target ambient: 30–40%",
        "Use a humid hide during shed if needed",
        "Avoid constantly damp substrate",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Choose diggable, low-dust options that reduce impaction risk for younger dragons.",
      bullets: [
        "Best: 50/50 organic topsoil + play sand mix (adults)",
        "Also good: slate tile, non-adhesive shelf liner, reptile carpet (temporary)",
        "Avoid long-term: pure calcium sand, walnut shell, cedar/pine shavings",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Use temporary setups when relocating, quarantining, or waiting on upgrades.",
      bullets: [
        "Paper towel / newspaper for quarantine or sick animals",
        "Tile for easy cleaning while hunting permanent bioactive mix",
        "Insect substitutes: silkworms or hornworms if dubia/crickets unavailable",
        "Greens substitutes: endive, escarole, cilantro in rotation",
      ],
    },
    healthRiskSigns: [
      "Limping, soft jaw, or trembling (possible MBD)",
      "Refusing food for several days (adults) or 24–48h (juveniles)",
      "Open-mouth breathing or wheezing",
      "Black, sticky, or bloody stool",
      "Sunken eyes and wrinkled skin (dehydration)",
    ],
    scheduleDefaults: {
      feeding: "Juveniles: insects 1–2× daily + greens. Adults: greens daily, insects 2–3× weekly",
      watering: "Fresh water daily; mist lightly or offer baths 1–2× weekly if dehydrated",
      cleaning: "Spot clean daily; full substrate change or deep clean every 2–4 weeks",
    },
  },
  {
    slug: "snakes",
    name: "Snakes",
    scientificHint: "e.g. Corn, Ball Python, King",
    tagline: "Quiet hunters of the canopy floor",
    description:
      "Pet snakes range from beginner corn snakes to humidity-sensitive ball pythons. Secure enclosures, correct prey size, and stable temperatures keep them thriving.",
    image: "/reptiles/snake.jpg",
    imageAlt: "Corn snake among foliage",
    accent: "#7ec8a3",
    humidity: "40–60% (species dependent)",
    tempRange: "Warm 85–90°F · Cool 75–80°F",
    diet: {
      title: "Diet",
      content:
        "Most commonly kept snakes eat appropriately sized rodents. Feed frozen-thawed prey for safety and consistency.",
      bullets: [
        "Prey roughly as wide as the snake’s thickest body section",
        "Juveniles: every 5–7 days; adults: every 7–14 days (species vary)",
        "Thaw prey fully in warm water; never microwave",
        "Do not handle for 48 hours after feeding",
      ],
    },
    diseases: {
      title: "Possible Diseases",
      content:
        "Watch humidity, hygiene, and mites — especially in ball pythons and densely furnished setups.",
      bullets: [
        "Respiratory infection — wheezing, bubbling nostrils, gaping",
        "Scale rot — ventral blisters from chronically wet substrate",
        "Mites — tiny black/red dots, soaking excessively, restlessness",
        "Inclusion body disease (boas/pythons) — neurological signs, regurgitation",
        "Stomatitis — swollen gums, reluctance to feed",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Length matters more than height for most terrestrial snakes. Provide at least two hides and a thermal gradient.",
      bullets: [
        "Minimum: enclosure length ≈ snake length (or larger for active species)",
        "Warm hide + cool hide required",
        "Climbing branches for arboreal/semi-arboreal species",
        "Secure locking lid — snakes are escape artists",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Snakes do not require intense UVB like diurnal lizards, but a gentle day/night cycle and heat source are essential.",
      bullets: [
        "Ambient day/night lighting on a timer (12/12)",
        "Under-tank heat pad or radiant heat with thermostat (mandatory)",
        "Optional low-level UVB for enrichment (species-dependent)",
        "No hot rocks — burn risk",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Targets vary widely: corn snakes prefer moderate air; ball pythons need higher humidity for clean sheds.",
      bullets: [
        "Corn / kings: ~40–50%",
        "Ball pythons: ~50–60% ambient, humid hide for shed",
        "Measure with a digital hygrometer at mid-level",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Pick absorbent, low-dust bedding that holds humidity without staying soggy.",
      bullets: [
        "Good: coconut husk, cypress mulch, aspen (for lower humidity species)",
        "Bioactive soil mixes for planted setups",
        "Avoid: cedar, pine, overly fine sand for most snakes",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Paper-based substrates and temporary tubs work well for quarantine or travel.",
      bullets: [
        "Paper towel / butcher paper for quarantine",
        "Plastic tubs with ventilation for temporary housing",
        "Prey substitutes: quail, chicks (species-appropriate, occasional)",
        "If frozen mice unavailable: same-size rats or appropriately sized alternatives",
      ],
    },
    healthRiskSigns: [
      "Regurgitation or repeated refusal to feed",
      "Wheezing, mucus, or open-mouth breathing",
      "Stuck shed around eyes or tail tip",
      "Lethargy paired with weight loss",
      "Visible mites or frequent soaking",
    ],
    scheduleDefaults: {
      feeding: "Every 7–14 days depending on age and species",
      watering: "Fresh water daily; large bowl for soaking",
      cleaning: "Spot clean soiled spots immediately; full change every 2–4 weeks",
    },
  },
  {
    slug: "geckos",
    name: "Geckos",
    scientificHint: "e.g. Leopard, Crested, Gargoyle",
    tagline: "Nocturnal climbers with sticky feet",
    description:
      "Geckos are popular for smaller footprints and engaging personalities. Crested geckos love vertical space and fruit diets; leopard geckos prefer dry ground with a humid hide.",
    image: "/reptiles/gecko.jpg",
    imageAlt: "Leopard gecko on a rocky surface",
    accent: "#9ad0b1",
    humidity: "40–80% (species dependent)",
    tempRange: "Species specific — see lighting & habitat",
    species: geckoSpecies,
    diet: {
      title: "Diet",
      content:
        "Diets split by species: leopard geckos are insectivores; crested/gargoyle geckos eat commercial fruit diets plus insects.",
      bullets: [
        "Leopard: gut-loaded insects + calcium dusting",
        "Crested: CGD (crested gecko diet) every other day + insects weekly",
        "Always provide clean water or light misting for drinkers",
        "Avoid wild-caught insects (pesticides/parasites)",
      ],
    },
    diseases: {
      title: "Possible Diseases",
      content:
        "Calcium deficiency and stuck shed are the most common preventable problems.",
      bullets: [
        "MBD — soft jaw, bowed limbs, tremors",
        "Dyseclysis (stuck shed) — especially toes and eye caps",
        "Impaction — constipation after substrate ingestion",
        "Cryptosporidiosis (leopard) — weight loss, regurgitation",
        "Mouth rot and bacterial infections in dirty enclosures",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Match enclosure orientation to lifestyle: horizontal for leopard geckos, vertical for cresteds.",
      bullets: [
        "Leopard adult: 20–40+ gallon horizontal with warm/cool hides",
        "Crested adult: 18×18×24 in vertical minimum (taller preferred)",
        "Humid hide for shedding (especially leopard geckos)",
        "Plenty of cover — geckos feel secure when they can hide",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Most pet geckos are crepuscular/nocturnal, but gentle UVB and a heat gradient still improve health.",
      bullets: [
        "Leopard: belly heat via thermostat-controlled pad + low UVB optional/recommended",
        "Crested: room temps 72–78°F; avoid hot basking spots over ~82°F",
        "Night lights not required; use a normal day/night cycle",
        "Never leave heat pads unregulated",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Leopard geckos need dry ambient air with a moist hide; cresteds need regular misting.",
      bullets: [
        "Leopard ambient: 30–40% + humid hide 70%+",
        "Crested: 60–80% with daily misting and dry-out periods",
        "Watch for mold — ventilate after misting",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Young or sick geckos do best on paper; adults can use naturalistic mixes.",
      bullets: [
        "Leopard adults: soil/sand mix or slate; paper for juveniles",
        "Crested: coco fiber, bioactive soil, or paper towel",
        "Avoid sticky sand and large loose particles for hatchlings",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "When commercial diets or preferred insects are out of stock, rotate safe alternatives.",
      bullets: [
        "Paper towel quarantine setups",
        "CGD substitute brands / homemade emergency mash (vet-approved recipes only)",
        "Insect rotation: crickets, dubia, mealworms (moderation), silkworms",
        "Temporary bins with ventilation for travel",
      ],
    },
    healthRiskSigns: [
      "Missing toe tips from stuck shed",
      "Tremors or soft bones",
      "Sudden weight loss or regurgitation",
      "Cloudy stuck eye caps",
      "Lethargy during normal active hours",
    ],
    scheduleDefaults: {
      feeding: "Leopard: insects daily–every other day (age dependent). Crested: CGD every 1–2 days",
      watering: "Fresh water daily; mist cresteds once or twice daily",
      cleaning: "Spot clean daily; deeper clean weekly–biweekly",
    },
  },
  {
    slug: "monitor-lizards",
    name: "Monitor Lizards",
    scientificHint: "e.g. Ackie, Savannah, Nile",
    tagline: "Intelligent excavators with big energy",
    description:
      "Monitors are active, smart lizards that need large enclosures, deep digging substrate, and experienced keepers. Smaller species like Ackie monitors are more manageable than savannahs.",
    image: "/reptiles/monitor.jpg",
    imageAlt: "Savannah monitor lizard",
    accent: "#d4b483",
    humidity: "40–70% (species dependent)",
    tempRange: "Basking 120–150°F · Ambient 80–90°F",
    species: monitorSpecies,
    diet: {
      title: "Diet",
      content:
        "Monitors are primarily carnivorous. Offer whole prey and insects; avoid fatty ground meat as a staple.",
      bullets: [
        "Insects, rodents, chicks, fish (species-appropriate)",
        "Variety prevents nutritional gaps",
        "Calcium dusting for juveniles on insect-heavy diets",
        "Limit high-fat feeders; no toxic prey",
      ],
    },
    diseases: {
      title: "Possible Diseases",
      content:
        "Large, active monitors suffer when space, heat, or hygiene are inadequate.",
      bullets: [
        "Obesity and fatty liver from overfeeding",
        "MBD in growing animals without UVB/calcium",
        "Parasites — especially wild-caught imports",
        "Respiratory infections from cool, damp conditions",
        "Injuries from aggressive tank mates or sharp décor",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Think big: deep substrate for burrows, climbing structures, and a powerful basking zone.",
      bullets: [
        "Ackie: 4×2×2 ft minimum; larger strongly preferred",
        "Savannah / Nile: custom rooms or very large enclosures",
        "Deep substrate (12–24+ in) for digging",
        "Secure doors — monitors are strong and curious",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Monitors need intense heat and high-quality UVB to match their high metabolism.",
      bullets: [
        "Hot basking zone (often 120°F+ depending on species)",
        "High-output T5 UVB across a large portion of the enclosure",
        "Strong day/night cycle",
        "All heat sources on thermostats / carefully monitored",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Many monitors need humid burrows even when ambient air is drier.",
      bullets: [
        "Ackie: ambient ~40–60% with moist dig zones",
        "Tropical monitors: higher ambient humidity",
        "Provide a moisture gradient, not a constantly soaked floor",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Deep, compactable mixes that hold tunnels are ideal.",
      bullets: [
        "Topsoil + play sand + clay (species-tuned mixes)",
        "Excavator clay for burrow walls",
        "Avoid shallow decorative bark chips alone",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Temporary housing is only for quarantine or emergencies — monitors need permanent space quickly.",
      bullets: [
        "Large plastic tubs for short quarantine only",
        "Paper substrate during medical treatment",
        "Prey rotation if preferred feeders unavailable",
        "Outdoor supervised time only in secure, escape-proof areas",
      ],
    },
    healthRiskSigns: [
      "Rapid weight gain or refusal to move",
      "Labored breathing",
      "Limping or swollen limbs",
      "Abnormal stools or parasites visible",
      "Aggression paired with opaque eyes / pre-shed stress",
    ],
    scheduleDefaults: {
      feeding: "Juveniles daily; adults every 2–3 days (adjust for body condition)",
      watering: "Large fresh water bowl daily; soak as needed",
      cleaning: "Spot clean daily; refresh dig zones regularly",
    },
  },
  {
    slug: "chameleons",
    name: "Chameleons",
    scientificHint: "e.g. Veiled, Panther, Jackson’s",
    tagline: "Arboreal artists of light and leaf",
    description:
      "Chameleons need vertical screened enclosures, moving air, live plants, and careful hydration. They drink dripping water more readily than still bowls.",
    image: "/reptiles/chameleon.jpg",
    imageAlt: "Veiled chameleon among leaves",
    accent: "#5fbf8a",
    humidity: "50–80% with airflow",
    tempRange: "Basking 85–95°F · Cool 70–75°F",
    species: chameleonSpecies,
    diet: {
      title: "Diet",
      content:
        "Insectivores that benefit from gut-loaded, dusted feeders and occasional plant matter (veiled).",
      bullets: [
        "Crickets, dubia, silkworms, hornworms, flies",
        "Gut-load insects 24 hours before feeding",
        "Calcium dusting most feedings; multivitamin 1–2× weekly",
        "Veileds may nibble greens — offer safe plants",
      ],
    },
    diseases: {
      title: "Possible Diseases",
      content:
        "Stress, low hydration, and poor UVB are leading causes of chameleon illness.",
      bullets: [
        "Dehydration — sunken eyes, dry urate, lethargy",
        "MBD — weak grip, tremors, jaw deformity",
        "Respiratory infection — mouth gaping, mucus",
        "Mouth rot and eye infections",
        "Parasites — common in imports; quarantine new animals",
      ],
    },
    habitat: {
      title: "Habitat Setup (Minimum)",
      content:
        "Screen cages with live plants and branching pathways outperform glass boxes for most species.",
      bullets: [
        "Veiled adult: 24×24×48 in screen enclosure minimum",
        "Dense foliage cover + horizontal/diagonal perches",
        "Drainage tray under plants; never stagnant wet floors",
        "Visual barriers — chameleons stress when constantly exposed",
      ],
    },
    lighting: {
      title: "Lighting Requirements",
      content:
        "Bright linear UVB and a moderate basking perch are non-negotiable.",
      bullets: [
        "T5 HO 5–6% UVB mounted above screen (follow distance guides)",
        "Separate basking bulb creating a gradient",
        "12–12 photoperiod",
        "No nighttime heat unless ambient drops dangerously low",
      ],
    },
    humidityDetail: {
      title: "Humidity Level",
      content:
        "Humidity should spike with misting then dry with airflow — stagnant wet air causes illness.",
      bullets: [
        "Target 50–80% depending on species and time of day",
        "Mist 2–3× daily; dripper or fogger as supplements",
        "Strong ventilation is as important as moisture",
      ],
    },
    substrate: {
      title: "Substrate Recommendations",
      content:
        "Many keepers use bare floors or drainage layers under potted plants to reduce impaction and mold.",
      bullets: [
        "Best: no loose substrate + potted plants / bioactive drainage layer",
        "Paper towel for quarantine",
        "Avoid deep loose bark that invites accidental ingestion",
      ],
    },
    substitutes: {
      title: "Substitutes & Short-Term Options",
      content:
        "Hydration and feeding can be adapted when equipment fails.",
      bullets: [
        "Hand misting if automatic mister breaks",
        "Drip system from a water bottle over leaves",
        "Temporary screen enclosure or tall mesh cage",
        "Feeder substitutes: roaches or flies if crickets unavailable",
      ],
    },
    healthRiskSigns: [
      "Sunken eyes or thick, dry urates",
      "Color staying dark and stressed for long periods",
      "Weak grip or falling from branches",
      "Closed/swollen eyes",
      "Refusal to eat for more than a couple of days",
    ],
    scheduleDefaults: {
      feeding: "Juveniles daily; adults every 1–2 days with appropriately sized insects",
      watering: "Mist 2–3× daily; dripper during daylight",
      cleaning: "Remove frass daily; wipe surfaces weekly; refresh plants as needed",
    },
  },
];

export function getReptile(slug: string): Reptile | undefined {
  return reptiles.find((r) => r.slug === slug);
}

export function getAllSlugs(): string[] {
  return reptiles.map((r) => r.slug);
}
