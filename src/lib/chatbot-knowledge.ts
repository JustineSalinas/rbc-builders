export type Intent = {
  id: string;
  keywords: string[];
  reply: string;
  followUps?: string[];
};

export const INTENTS: Intent[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "kumusta"],
    reply:
      "Hi, I am the RBC Builders assistant. Ask me about pricing, services, timelines, or how to reach the team.",
    followUps: ["What are your finish tiers?", "What areas do you serve?", "How do I get a quote?"],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "rate", "budget", "finish tier", "per sqm", "square meter"],
    reply:
      "We build across four finish tiers, priced per square meter: Bare Finish at 18,000 to 20,000 pesos, Standard Finish at 20,000 to 25,000, Premium Finish at 25,000 to 29,000, and Luxury Finish at 29,000 and up. Each tier covers ceiling, windows, doors, floors, walls, and fixtures at that spec level.",
    followUps: ["What is included in Premium Finish?", "How do I get a quote?"],
  },
  {
    id: "premium-detail",
    keywords: ["premium finish", "what is included in premium"],
    reply:
      "Premium Finish (25,000 to 29,000 per sqm) includes PVC textured ceiling panels, aluminum analok windows, solid wood doors, granite tiles and wood floors, stone-accented paint walls, and semi-luxury fixtures throughout.",
  },
  {
    id: "services",
    keywords: ["service", "offer", "what do you do", "design", "build", "construction"],
    reply:
      "RBC Builders handles the full build lifecycle: architectural design, labor and materials, government permit processing, and bank application assistance for financing. One accountable team from the first sketch to the keys in your hand.",
    followUps: ["Do you help with permits?", "Can you assist with bank loans?"],
  },
  {
    id: "permits",
    keywords: ["permit", "license", "government", "approval", "legal"],
    reply:
      "Yes. We process building permits and the related regulatory requirements for you, so your project stays compliant and on schedule from day one.",
  },
  {
    id: "financing",
    keywords: ["bank", "loan", "finance", "financing", "mortgage", "payment plan"],
    reply:
      "We assist with preparing and guiding your bank loan application for construction financing. Reach out with your target budget and we will walk you through the requirements.",
  },
  {
    id: "areas",
    keywords: ["area", "location", "where", "city", "province", "cover", "serve"],
    reply:
      "We build in San Fernando, Tarlac, Angeles City, Olongapo, Balanga, and Mariveles, all across Pampanga and Central Luzon.",
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "duration", "turnover", "months", "schedule"],
    reply:
      "Most residential builds complete in about 10 months on average, depending on floor area and finish tier. We will give you a firm schedule once we review your plans.",
  },
  {
    id: "portfolio",
    keywords: ["portfolio", "project", "example", "past work", "behance", "gallery"],
    reply:
      "You can browse our rendered and completed projects on Behance, or scroll to the Portfolio section on this page for recent builds.",
  },
  {
    id: "contact",
    keywords: ["contact", "call", "phone", "number", "email", "reach", "talk to someone", "quote", "estimate"],
    reply:
      "You can call or text 0977 287 3075 or 0962 786 3202, email rbcbuilders70@gmail.com, or fill out the form in the Contact section and we will get back to you within one business day.",
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "salamat"],
    reply: "You are welcome. Let me know if there is anything else you would like to check.",
  },
];

export const FALLBACK_REPLY =
  "I do not have an exact answer for that yet. For specifics on your project, call or text 0977 287 3075 or email rbcbuilders70@gmail.com and the team will help directly.";

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
