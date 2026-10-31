export type Category = "Private Residences" | "Modern Estates" | "Interior Architecture";

export type Project = {
  id: string;
  src: string;
  title: string;
  typology: string;
  category: Category;
  location: string;
  floorArea: string;
  lotArea?: string;
  bedrooms?: string;
  bathrooms?: string;
  storeys: string;
  finishTier: string;
  year: string;
  description: string;
  features: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "pavilioned-residence",
    src: "/images/project-1.jpg",
    title: "The Pavilioned Residence",
    typology: "Two-Storey Contemporary Villa",
    category: "Private Residences",
    location: "San Fernando, Pampanga",
    floorArea: "240 m²",
    lotArea: "300 m²",
    bedrooms: "3 En-suite Bedrooms",
    bathrooms: "3.5 Baths",
    storeys: "2 Storeys",
    finishTier: "Bespoke Luxury",
    year: "2024",
    description:
      "A distinguished contemporary residence featuring cantilevering upper volumes, integrated timber solar louvers, and a grand gated perimeter. Designed to maximize natural cross-ventilation while preserving intimate family privacy.",
    features: [
      "Custom timber-textured aluminum louvers",
      "Two-car covered carport with recessed architectural lighting",
      "Floor-to-ceiling tempered glass sliding panels",
      "Full turnkey delivery: architectural plans to keys",
    ],
  },
  {
    id: "horizon-villa",
    src: "/images/project-2.jpg",
    title: "The Horizon Villa",
    typology: "Luxury Modern Residence",
    category: "Modern Estates",
    location: "Angeles City, Pampanga",
    floorArea: "320 m²",
    lotArea: "420 m²",
    bedrooms: "4 En-suite Bedrooms",
    bathrooms: "4.5 Baths",
    storeys: "2 Storeys",
    finishTier: "Bespoke Luxury",
    year: "2024",
    description:
      "A striking architectural statement uniting double-height living spaces with seamless outdoor-indoor transitions. Engineered with heavy reinforced concrete frame and expansive column-free spans.",
    features: [
      "Double-height 6.2m great room with perimeter cove lighting",
      "Imported large-format porcelain slabs",
      "Spacious covered outdoor alfresco pavilion",
      "Engineered smart home lighting automation integration",
    ],
  },
  {
    id: "minimalist-monolith",
    src: "/images/project-3.jpg",
    title: "The Minimalist Monolith",
    typology: "Geometric Contemporary Home",
    category: "Modern Estates",
    location: "Clark Enclave, Pampanga",
    floorArea: "280 m²",
    lotArea: "350 m²",
    bedrooms: "4 Bedrooms",
    bathrooms: "4 Baths",
    storeys: "2 Storeys",
    finishTier: "Premium Architectural",
    year: "2023",
    description:
      "Clean Scandinavian-inspired proportions executed in textured limestone plaster and matte charcoal steel. The recessed glazing creates natural shading pockets that dramatically reduce solar heat gain.",
    features: [
      "Recessed ribbon windows with heavy powder-coated framing",
      "Custom architectural steel gate and boundary enclosure",
      "Dedicated home office and formal greeting vestibule",
      "High thermal-performance insulated roof sandwich panels",
    ],
  },
  {
    id: "courtyard-estate",
    src: "/images/project-4.jpg",
    title: "The Courtyard Estate",
    typology: "Sprawling Family Estate",
    category: "Modern Estates",
    location: "San Fernando, Pampanga",
    floorArea: "360 m²",
    lotArea: "500 m²",
    bedrooms: "5 En-suite Bedrooms",
    bathrooms: "5.5 Baths",
    storeys: "2 Storeys",
    finishTier: "Bespoke Luxury",
    year: "2024",
    description:
      "Designed for multi-generational living, this expansive estate wraps around a serene central landscaped courtyard. Features a dedicated ground-floor primary suite and secondary dirty kitchen & staff quarters.",
    features: [
      "Private internal courtyard viewable from all social areas",
      "Executive ground floor master bedroom retreat",
      "Dual kitchens (Designer Show Kitchen + Stainless Utility Kitchen)",
      "Three-vehicle covered motor court",
    ],
  },
  {
    id: "angular-roof-residence",
    src: "/images/project-5.jpg",
    title: "The Angular Roof Residence",
    typology: "Mid-Century Modern Inspired",
    category: "Private Residences",
    location: "Tarlac City, Tarlac",
    floorArea: "260 m²",
    lotArea: "320 m²",
    bedrooms: "3 Bedrooms",
    bathrooms: "3 Baths",
    storeys: "2 Storeys",
    finishTier: "Premium Architectural",
    year: "2023",
    description:
      "A dramatic single-pitch roofline anchors this contemporary residence, accented with hand-laid stacked slate stone and warm treated wood battens along the facade.",
    features: [
      "Dramatic 18-degree mono-pitch roof design with concealed gutters",
      "Hand-chiseled natural slate feature wall",
      "Upper level cantilevered balcony with safety glass balustrade",
      "Full LGU building permit & structural engineering sign-off",
    ],
  },
  {
    id: "lumina-as-built",
    src: "/images/project-6.jpg",
    title: "The Lumina Residence (As-Built)",
    typology: "Completed Turnkey Build",
    category: "Private Residences",
    location: "Guagua, Pampanga",
    floorArea: "220 m²",
    lotArea: "260 m²",
    bedrooms: "3 Bedrooms",
    bathrooms: "3 Baths",
    storeys: "2 Storeys",
    finishTier: "Standard to Premium",
    year: "2023",
    description:
      "A finished RBC Builders project photographed on site at turnover. Built with structural fidelity, crisp clean masonry, rooftop carport terrace, and robust weather-resistant finishes.",
    features: [
      "Rooftop entertaining deck directly accessible from master bedroom",
      "Heavy gauge structural steel carport canopy",
      "Completed in under 9 months from groundbreaking",
      "100% turnkey handover with Certificate of Occupancy",
    ],
  },
  {
    id: "terrace-manor",
    src: "/images/project-7.jpg",
    title: "The Terrace Manor",
    typology: "Contemporary Manor",
    category: "Private Residences",
    location: "Balanga, Bataan",
    floorArea: "250 m²",
    lotArea: "310 m²",
    bedrooms: "4 Bedrooms",
    bathrooms: "3.5 Baths",
    storeys: "2 Storeys",
    finishTier: "Luxury Specification",
    year: "2024",
    description:
      "Natural stone veneer meets warm teakwood detailing. A wide upper balcony shelters the ground portico while providing panoramic views of the landscaped perimeter.",
    features: [
      "Natural stone exterior cladding with protective water-repellent sealant",
      "Expansive 28 m² master terrace with ambient step lights",
      "Custom solid mahogany main entrance pivot door",
      "Complete bank construction loan financing facilitation",
    ],
  },
  {
    id: "great-room-interior",
    src: "/images/project-8.jpg",
    title: "The Great Room & Kitchen Suite",
    typology: "Turnkey Interior Architecture",
    category: "Interior Architecture",
    location: "San Fernando, Pampanga",
    floorArea: "140 m²",
    storeys: "Single Level",
    finishTier: "Bespoke Luxury",
    year: "2024",
    description:
      "Architectural cutaway showing the fluid integration between the quartz waterfall kitchen island, eight-seater dining volume, and recessed media lounge with acoustic timber slatting.",
    features: [
      "Seamless waterfall quartz kitchen island with undermount Franke sink",
      "Concealed architectural cove lighting with warm 3000K Kelvin index",
      "Bespoke soft-close floor-to-ceiling cabinetry throughout",
      "Premium imported 60x120cm rectified porcelain floor tiling",
    ],
  },
  {
    id: "stonecrest-residence",
    src: "/images/project-9.jpg",
    title: "The Stonecrest Residence",
    typology: "Artisanal Contemporary",
    category: "Private Residences",
    location: "San Fernando, Pampanga",
    floorArea: "230 m²",
    lotArea: "280 m²",
    bedrooms: "3 Bedrooms",
    bathrooms: "3 Baths",
    storeys: "2 Storeys",
    finishTier: "Premium Architectural",
    year: "2023",
    description:
      "A balanced architectural silhouette combining natural stone pylons, charcoal standing-seam accents, and warm timber reveals. Engineered for low maintenance and longevity.",
    features: [
      "Precision-mitered stacked stone accent masonry",
      "Analok bronze heavy-gauge sliding window frames",
      "Spacious covered utility area and laundry zone",
      "Dedicated perimeter drainage and flood-resilient elevation",
    ],
  },
  {
    id: "perforated-screen-villa",
    src: "/images/project-10.jpg",
    title: "The Perforated Screen Villa",
    typology: "Climate-Responsive Modern Villa",
    category: "Modern Estates",
    location: "Angeles City, Pampanga",
    floorArea: "240 m²",
    lotArea: "300 m²",
    bedrooms: "3 Bedrooms",
    bathrooms: "3.5 Baths",
    storeys: "2 Storeys",
    finishTier: "Bespoke Luxury",
    year: "2024",
    description:
      "Engineered with a bespoke perforated aluminum facade screen that acts as an architectural brise-soleil. It cuts harsh afternoon solar heat by up to 40% while creating a glowing evening silhouette.",
    features: [
      "Custom laser-cut architectural thermal brise-soleil",
      "Upper level lush planter box with integrated drip irrigation",
      "Full LED architectural perimeter lighting scheme",
      "Turnkey material specification across luxury finish tier",
    ],
  },
  {
    id: "gated-residence",
    src: "/images/project-11.jpg",
    title: "The Gated Horizon Estate",
    typology: "Private Gated Residence",
    category: "Private Residences",
    location: "Olongapo, Zambales",
    floorArea: "230 m²",
    lotArea: "290 m²",
    bedrooms: "3 Bedrooms",
    bathrooms: "3 Baths",
    storeys: "2 Storeys",
    finishTier: "Premium Architectural",
    year: "2023",
    description:
      "Secure, private street elevation featuring custom horizontal architectural slats, integrated video intercom pedestal, and heavy-duty structural steel framing for the two-bay carport.",
    features: [
      "Architectural slatted steel entrance gate with automated motor prep",
      "Reinforced concrete structural frame with seismic zone 4 compliance",
      "Solid timber interior doors with Hafele architectural hardware",
      "All local building and fire safety permits fully processed",
    ],
  },
  {
    id: "multi-gen-villa",
    src: "/images/project-12.jpg",
    title: "The Multi-Generational Villa",
    typology: "5-Bedroom Family Estate",
    category: "Modern Estates",
    location: "San Fernando, Pampanga",
    floorArea: "290 m²",
    lotArea: "380 m²",
    bedrooms: "5 Bedrooms",
    bathrooms: "4.5 Baths",
    storeys: "2 Storeys",
    finishTier: "Bespoke Luxury",
    year: "2024",
    description:
      "A grand family home offering five full bedrooms, including a ground floor senior suite with step-free en-suite access, soaring cathedral ceilings, and an expansive second-floor family gallery.",
    features: [
      "Ground floor senior bedroom suite with barrier-free bathroom",
      "Double-height foyer with custom pendant chandelier pre-wiring",
      "Dedicated maid's room with private bathroom and service access",
      "10-month turnkey build timeline with fixed-price contract",
    ],
  },
];

export const CATEGORIES: ("All Works" | Category)[] = [
  "All Works",
  "Private Residences",
  "Modern Estates",
  "Interior Architecture",
];
