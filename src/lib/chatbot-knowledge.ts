export type Intent = {
  id: string;
  keywords: string[];
  reply: string;
  followUps?: string[];
};

export const INTENTS: Intent[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "kumusta", "architect", "concierge"],
    reply:
      "Welcome to RBC Builders Architectural Concierge. How may I assist you with your residence or commercial construction project in Central Luzon today?",
    followUps: [
      "What are your construction rates per sqm?",
      "Which regions do you build in?",
      "How does your design-build process work?",
      "Can you assist with bank construction loans?",
    ],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "rate", "budget", "finish tier", "per sqm", "square meter", "estimate", "calculator"],
    reply:
      "We build under four clear construction specification grades: Bare Shell (₱18k–₱20k/m²), Standard (₱20k–₱25k/m²), Premium Architectural (₱25k–₱29k/m²), and Luxury (₱29k+/m²). Each grade includes structural concrete, labor, materials, permits, and complete finish packages.",
    followUps: ["What is included in the Luxury tier?", "How do I request a site inspection?"],
  },
  {
    id: "luxury-detail",
    keywords: ["luxury", "luxury finish", "highest tier", "what is included in luxury"],
    reply:
      "Our Luxury grade (₱29,000+/m²) features heavy-gauge powder-coated architectural aluminum windows, imported large-format porcelain slabs, solid hardwood doors, multi-tier cove lighting, acoustic wood slatting, and premium designer sanitary fixtures.",
  },
  {
    id: "services",
    keywords: ["service", "offer", "what do you do", "design", "build", "construction", "disciplines"],
    reply:
      "RBC Builders offers turnkey design-build services: custom architectural planning and 3D visualization, complete general contracting (labor & materials), government building permit processing, and bank loan assistance.",
    followUps: ["Do you handle building permits?", "How does bank loan assistance work?"],
  },
  {
    id: "permits",
    keywords: ["permit", "license", "government", "approval", "legal", "zoning", "occupancy"],
    reply:
      "Every project includes full management of government regulatory requirements — from LGU zoning, structural calculation seals, and barangay clearances to the final Certificate of Occupancy.",
  },
  {
    id: "financing",
    keywords: ["bank", "loan", "finance", "financing", "mortgage", "pag-ibig", "drawdown"],
    reply:
      "We prepare bank-ready architectural blueprints, detailed Bills of Quantities (BOQ), and progress billing schedules. We coordinate directly with major lenders including BDO, BPI, Metrobank, Security Bank, and Pag-IBIG.",
  },
  {
    id: "areas",
    keywords: ["area", "location", "where", "city", "province", "cover", "serve", "pampanga", "angeles", "clark", "tarlac", "bataan", "zambales"],
    reply:
      "Our active construction footprint covers San Fernando, Angeles City, Clark, Guagua, Lubao, and Mexico in Pampanga, as well as Tarlac, Olongapo, Balanga, and Mariveles.",
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "duration", "turnover", "months", "schedule", "completion"],
    reply:
      "Turnkey residences typically achieve completion in 8 to 12 months (averaging 10 months), governed by strict milestone timelines, critical path monitoring, and transparent weekly site reports.",
  },
  {
    id: "projects",
    keywords: ["portfolio", "project", "example", "past work", "houses", "estates", "completed"],
    reply:
      "You can explore our curated Selected Works section on this page, featuring completed estates, private residences, and interior architecture across Central Luzon. We also provide full architectural lookbooks upon consultation.",
  },
  {
    id: "contact",
    keywords: ["contact", "call", "phone", "number", "email", "reach", "talk to someone", "quote", "meeting", "consultation"],
    reply:
      "To schedule a private architectural consultation or site visit, reach our engineering team directly at 0977 287 3075 or 0962 786 3202, email rbcbuilders70@gmail.com, or submit your project details in the Commission an Estate section.",
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "salamat", "appreciated"],
    reply: "It is our pleasure. We look forward to helping you realize your architectural vision.",
  },
];

export const FALLBACK_REPLY =
  "For project inquiries, site inspections, or structural consultations, please contact our team directly at 0977 287 3075 or email rbcbuilders70@gmail.com.";

export function matchIntent(input: string): Intent | null {
  const text = input.toLowerCase();
  let best: { intent: Intent; score: number } | null = null;

  for (const intent of INTENTS) {
    const score = intent.keywords.reduce(
      (acc, kw) => (text.includes(kw) ? acc + kw.length : acc),
      0
    );
    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  return best?.intent ?? null;
}
