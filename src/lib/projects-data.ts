export type Category = "Exteriors" | "Interiors" | "Floor Plans";

export type Project = {
  src: string;
  title: string;
  category: Category;
  location: string;
  floorArea?: string;
  bedrooms?: string;
  storeys?: string;
  description: string;
};

export const PROJECTS: Project[] = [
  {
    src: "/images/project-1.jpg",
    title: "2-Storey, 3BR Residence",
    category: "Exteriors",
    location: "Pampanga",
    floorArea: "240 sqm",
    bedrooms: "3 bedrooms",
    storeys: "2 storeys",
    description:
      "A contemporary two-storey family home with a street-facing gate, landscaped entry, and a two-car carport.",
  },
  {
    src: "/images/project-9.jpg",
    title: "2-Storey, 3BR Residence",
    category: "Exteriors",
    location: "Pampanga",
    floorArea: "230 sqm",
    bedrooms: "3 bedrooms",
    storeys: "2 storeys",
    description:
      "Angular roofline with vertical wood-slat cladding and a stacked-stone accent wall at the entry.",
  },
  {
    src: "/images/project-3.jpg",
    title: "Modern Family Home",
    category: "Exteriors",
    location: "Pampanga",
    description: "Clean-lined facade with a cantilevered upper floor and full-height glazing.",
  },
  {
    src: "/images/project-4.jpg",
    title: "Interior Concept",
    category: "Interiors",
    location: "Pampanga",
    description: "Open living and dining layout finished in warm wood tones and soft neutral upholstery.",
  },
  {
    src: "/images/project-8.jpg",
    title: "Open-Plan Interior",
    category: "Interiors",
    location: "Pampanga",
    description: "Top-down cutaway of the kitchen, dining, and living areas showing the full open-plan flow.",
  },
  {
    src: "/images/project-5.jpg",
    title: "Contemporary Facade",
    category: "Exteriors",
    location: "Pampanga",
    description: "Night render highlighting the home's cove lighting and layered roof overhangs.",
  },
  {
    src: "/images/project-10.jpg",
    title: "2-Storey, 3BR Residence",
    category: "Exteriors",
    location: "Pampanga",
    floorArea: "240 sqm",
    bedrooms: "3 bedrooms",
    storeys: "2 storeys",
    description: "Perforated screen facade over the upper floor for shade and privacy, wrapped in greenery.",
  },
  {
    src: "/images/project-6.jpg",
    title: "Residential Elevation",
    category: "Exteriors",
    location: "Pampanga",
    description: "Design study exploring massing and roof geometry for a mid-sized family residence.",
  },
  {
    src: "/images/project-11.jpg",
    title: "Gated Residence",
    category: "Exteriors",
    location: "Pampanga",
    floorArea: "230 sqm",
    bedrooms: "2 bedrooms",
    storeys: "2 storeys",
    description: "Street-facing elevation with a slatted steel gate, stone cladding, and covered carport.",
  },
  {
    src: "/images/project-7.jpg",
    title: "Minimalist Build",
    category: "Exteriors",
    location: "Pampanga",
    description: "Pared-back exterior render emphasizing clean massing and material contrast.",
  },
  {
    src: "/images/project-12.jpg",
    title: "2-Storey, 5BR Residence",
    category: "Exteriors",
    location: "Pampanga",
    floorArea: "240 sqm",
    bedrooms: "5 bedrooms",
    storeys: "2 storeys",
    description: "Larger family residence with a dramatic angled roofline and a dedicated guest room on the ground floor.",
  },
];

export const CATEGORIES: ("All" | Category)[] = ["All", "Exteriors", "Interiors", "Floor Plans"];
