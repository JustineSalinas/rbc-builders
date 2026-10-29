// Single source of truth for company stats shown across the site.
// Keep every section that cites a number pulling from here so figures
// never drift out of sync with each other.

export const COMPANY_STATS = {
  totalFloorAreaDelivered: { value: "16,000+", unit: "sqm", label: "Total Floor Area Delivered" },
  avgFloorAreaPerProject: { value: "240+", unit: "sqm", label: "Avg. Floor Area / Project" },
  provincesServed: { value: "05", unit: "regions", label: "Provinces Served" },
  finishTiers: { value: "04", unit: "options", label: "Finish Tiers" },
  avgTurnover: { value: "10", unit: "months", label: "Avg. Turnover" },
  facebookCommunity: { value: "12K+", unit: "", label: "Facebook Community" },
};
