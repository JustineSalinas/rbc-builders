"use client";

import { useState } from "react";
import { Check, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

type Data = {
  projectScope: string;
  location: string;
  floorArea: string;
  finishTier: string;
  timeline: string;
  financing: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const INITIAL_DATA: Data = {
  projectScope: "",
  location: "",
  floorArea: "",
  finishTier: "",
  timeline: "",
  financing: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

const PROJECT_SCOPES = [
  "Custom Modern Villa",
  "Two-Storey Private Residence",
  "Multi-Generational Estate",
  "Turnkey Interior Fit-out",
  "Commercial / Mixed-Use",
];

const LOCATIONS = [
  "San Fernando, Pampanga",
  "Angeles City / Clark",
  "Tarlac City / Province",
  "Balanga / Mariveles, Bataan",
  "Olongapo / Subic, Zambales",
  "Other Central Luzon Region",
];

const FLOOR_AREAS = [
  "Under 180 m² (Compact Residence)",
  "180 m² – 250 m² (Standard Villa)",
  "250 m² – 380 m² (Spacious Estate)",
  "400 m²+ (Grand Residence)",
];

const FINISH_TIERS = [
  "Bare Shell (₱18k–₱20k/m²)",
  "Standard Architectural (₱20k–₱25k/m²)",
  "Premium Architectural (₱25k–₱29k/m²)",
  "Luxury Specification (₱29k+/m²)",
  "Seeking Architect Recommendation",
];

const TIMELINES = [
  "Immediate (Within 30 Days)",
  "1 – 3 Months",
  "3 – 6 Months",
  "Exploring Feasibility",
];

const FINANCING_OPTIONS = [
  "Self-Funded / Private Capital",
  "Bank Construction Loan (Assistance Needed)",
  "Pag-IBIG Construction Financing",
  "Combination / Undecided",
];

export default function BriefWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(INITIAL_DATA);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const setField = (patch: Partial<Data>) => setData((prev) => ({ ...prev, ...patch }));

  const canAdvance = [
    !!data.projectScope,
    !!data.location,
    !!(data.floorArea && data.finishTier),
    !!(data.timeline && data.financing),
    !!(data.name && data.phone && data.email),
  ][step];

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/rbcbuilders70@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Project Inquiry: ${data.name} (${data.projectScope})`,
          "Project Scope": data.projectScope,
          Location: data.location,
          "Floor Area": data.floorArea,
          "Finish Tier": data.finishTier,
          Timeline: data.timeline,
          Financing: data.financing,
          "Client Name": data.name,
          Phone: data.phone,
          Email: data.email,
          Notes: data.notes || "None provided",
        }),
      });
      if (res.ok) setStatus("done");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="p-8 sm:p-12 bg-background border border-accent/40 text-center flex flex-col items-center">
        <div className="h-14 w-14 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent mb-4">
          <Check size={28} />
        </div>
        <h4 className="font-serif text-2xl sm:text-3xl text-foreground font-normal mb-2">
          Architectural Brief Received
        </h4>
        <p className="text-sm text-foreground/75 font-light max-w-md mb-6 leading-relaxed">
          Thank you, {data.name}. Our principal project engineers will review your lot parameters and contact you within one business day to coordinate a preliminary consultation.
        </p>
        <button
          onClick={() => {
            setData(INITIAL_DATA);
            setStep(0);
            setStatus("idle");
          }}
          className="text-xs uppercase tracking-[0.2em] text-accent underline underline-offset-4 hover:text-foreground"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 bg-background border border-border flex flex-col">
      {/* Step Header */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">
            Stage 0{step + 1} of 05
          </span>
          <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal mt-0.5">
            {step === 0 && "Select Project Typology"}
            {step === 1 && "Site Location & Municipality"}
            {step === 2 && "Scale & Finishing Standard"}
            {step === 3 && "Timeline & Capital Structure"}
            {step === 4 && "Principal Contact Coordinates"}
          </h4>
        </div>
        <span className="text-xs text-muted font-mono">{Math.round(((step + 1) / 5) * 100)}%</span>
      </div>

      {/* Step 1: Scope */}
      {step === 0 && (
        <div className="space-y-4">
          <p className="text-xs text-muted font-light mb-4">
            Select the architectural category that best aligns with your planned construction:
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {PROJECT_SCOPES.map((scope) => (
              <button
                key={scope}
                type="button"
                onClick={() => setField({ projectScope: scope })}
                className={`text-left p-4 border text-xs sm:text-sm transition-colors flex items-center justify-between ${
                  data.projectScope === scope
                    ? "border-accent bg-accent/10 text-accent font-medium"
                    : "border-border text-foreground/80 hover:border-accent/40 bg-surface shadow-sm"
                }`}
              >
                <span>{scope}</span>
                {data.projectScope === scope && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Location */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-xs text-muted font-light mb-4">
            Where is your titled property or target building site situated?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setField({ location: loc })}
                className={`text-left p-4 border text-xs transition-colors flex items-center justify-between ${
                  data.location === loc
                    ? "border-accent bg-accent/10 text-accent font-medium shadow-sm"
                    : "border-border text-foreground/80 hover:border-accent/40 bg-surface shadow-sm"
                }`}
              >
                <span>{loc}</span>
                {data.location === loc && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Floor Area & Finish */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted font-medium block mb-3">
              Target Gross Floor Area
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FLOOR_AREAS.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => setField({ floorArea: area })}
                  className={`text-left p-3.5 border text-xs transition-colors ${
                    data.floorArea === area
                      ? "border-accent bg-accent/10 text-accent font-medium shadow-sm"
                      : "border-border text-foreground/80 hover:border-accent/40 bg-surface shadow-sm"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted font-medium block mb-3">
              Desired Finish Specification
            </label>
            <div className="grid grid-cols-1 gap-2">
              {FINISH_TIERS.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setField({ finishTier: tier })}
                  className={`text-left p-3.5 border text-xs transition-colors flex items-center justify-between ${
                    data.finishTier === tier
                      ? "border-accent bg-accent/10 text-accent font-medium"
                      : "border-border text-foreground/80 hover:border-white/20"
                  }`}
                >
                  <span>{tier}</span>
                  {data.finishTier === tier && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Timeline & Financing */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted font-medium block mb-3">
              Target Groundbreaking Timeline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TIMELINES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setField({ timeline: time })}
                  className={`text-left p-3.5 border text-xs transition-colors ${
                    data.timeline === time
                      ? "border-accent bg-accent/10 text-accent font-medium"
                      : "border-border text-foreground/80 hover:border-white/20"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted font-medium block mb-3">
              Capital Structuring / Funding Mode
            </label>
            <div className="grid grid-cols-1 gap-2">
              {FINANCING_OPTIONS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setField({ financing: f })}
                  className={`text-left p-3.5 border text-xs transition-colors flex items-center justify-between ${
                    data.financing === f
                      ? "border-accent bg-accent/10 text-accent font-medium"
                      : "border-border text-foreground/80 hover:border-white/20"
                  }`}
                >
                  <span>{f}</span>
                  {data.financing === f && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Contact Details */}
      {step === 4 && (
        <div className="space-y-4">
          <p className="text-xs text-muted font-light mb-2">
            Please provide your details so our engineering team can send the preliminary review:
          </p>

          <div>
            <label htmlFor="brief-name" className="text-[11px] uppercase tracking-[0.18em] text-muted block mb-1">
              Full Name *
            </label>
            <input
              id="brief-name"
              type="text"
              required
              value={data.name}
              onChange={(e) => setField({ name: e.target.value })}
              placeholder="e.g. Architect / Dr. Juan Dela Cruz"
              className="w-full bg-surface border border-border px-4 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="brief-phone" className="text-[11px] uppercase tracking-[0.18em] text-muted block mb-1">
                Mobile Number *
              </label>
              <input
                id="brief-phone"
                type="tel"
                required
                value={data.phone}
                onChange={(e) => setField({ phone: e.target.value })}
                placeholder="0917 123 4567"
                className="w-full bg-surface border border-border px-4 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="brief-email" className="text-[11px] uppercase tracking-[0.18em] text-muted block mb-1">
                Email Address *
              </label>
              <input
                id="brief-email"
                type="email"
                required
                value={data.email}
                onChange={(e) => setField({ email: e.target.value })}
                placeholder="name@example.com"
                className="w-full bg-surface border border-border px-4 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="brief-notes" className="text-[11px] uppercase tracking-[0.18em] text-muted block mb-1">
              Lot Specifics or Special Architectural Requirements (Optional)
            </label>
            <textarea
              id="brief-notes"
              rows={3}
              value={data.notes}
              onChange={(e) => setField({ notes: e.target.value })}
              placeholder="e.g. Corner lot in Angeles City, looking for double-height ceiling and solar panel integration."
              className="w-full bg-surface border border-border px-4 py-2 text-xs text-foreground focus:border-accent focus:outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => setStep((s) => s + 1)}
            className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm ${
              canAdvance
                ? "bg-accent text-white hover:bg-accent-dim"
                : "bg-surface text-muted/50 border border-border cursor-not-allowed"
            }`}
          >
            <span>Proceed</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            disabled={!canAdvance || status === "sending"}
            onClick={submit}
            className="flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-white hover:bg-accent-dim transition-all disabled:opacity-50 shadow-md"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Submitting Brief...</span>
              </>
            ) : (
              <>
                <span>Transmit Architectural Brief</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        )}
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400 mt-4 text-center font-light">
          Unable to transmit at this moment. Please call our office directly at 0977 287 3075.
        </p>
      )}
    </div>
  );
}
