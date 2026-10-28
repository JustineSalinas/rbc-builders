const ITEMS = [
  "DESIGN TO COMPLETION",
  "LABOR & MATERIALS",
  "GOVERNMENT PERMITS",
  "BANK APPLICATION ASSISTANCE",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-border bg-surface py-5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display text-xl sm:text-2xl uppercase px-8 text-foreground/70">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  );
}
