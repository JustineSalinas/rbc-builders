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
    title: "Garden Gate Residence",
    category: "Exteriors",
    location: "Pampanga",
    floorArea: "240 sqm",
    bedrooms: "3 bedrooms",
    storeys: "2 storeys",
    description:
      "A contemporary two-storey family home with a street-facing gate, landscaped entry, and a two-car carport.",
  },
  {
    src: "/images/project-6.jpg",
    title: "As-Built Residence",
    category: "Exteriors",
    location: "Pampanga",
    description:
      "A completed RBC Builders project, photographed on site. Two-tone stone and render facade with a rooftop terrace above the carport.",
  },
  {
    src: "/images/project-5.jpg",
    title: "Angled Roof Residence",
    category: "Exteriors",
    location: "Pampanga",
    description: "Dramatic single-pitch roofline in stone and timber slatting, with a stacked-stone perimeter wall.",
  },
  {
    src: "/images/project-9.jpg",
    title: "Stacked Stone Residence",
    category: "Exteriors",
    location: "Pampanga",
    floorArea: "230 sqm",
    bedrooms: "3 bedrooms",
    storeys: "2 storeys",
    description:
      "Angular roofline with vertical wood-slat cladding and a stacked-stone accent wall at the entry.",
  },
  {
    src: "/images/project-7.jpg",
    title: "Rooftop Terrace Residence",
    category: "Exteriors",
    location: "Pampanga",
    description: "Stone-clad facade with a covered rooftop terrace and a warm timber entry portico.",
  },
  {
    src: "/images/project-8.jpg",
    title: "Open-Plan Interior",
    category: "Interiors",
    location: "Pampanga",
    description: "Top-down cutaway of the kitchen, dining, and living areas showing the full open-plan flow.",
  },
  {
    src: "/images/project-10.jpg",
    title: "Perforated Screen Residence",
    category: "Exteriors",
    location: "Pampanga",
    floorArea: "240 sqm",
    bedrooms: "3 bedrooms",
    storeys: "2 storeys",
    description: "Perforated screen facade over the upper floor for shade and privacy, wrapped in greenery.",
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
