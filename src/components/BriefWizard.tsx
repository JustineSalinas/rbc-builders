"use client";

import { useState } from "react";
import { Check, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

type Data = {
  projectType: string;
  location: string;
  finishTier: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
};

const EMPTY: Data = {
  projectType: "",
  location: "",
  finishTier: "",
  timeline: "",
  name: "",
  phone: "",
  email: "",
};

const PROJECT_TYPES = ["New Construction", "Renovation", "Interior Design", "Permit Processing Only"];
const LOCATIONS = ["San Fernando", "Tarlac", "Angeles City", "Olongapo", "Balanga", "Mariveles", "Other"];
const TIERS = ["Bare Finish", "Standard Finish", "Premium Finish", "Luxury Finish", "Not sure yet"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

const STEP_COUNT = 5;

function ChipGroup({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`px-4 py-2.5 text-sm border transition-colors ${
            value === opt
              ? "bg-accent text-background border-accent"
              : "border-border text-foreground/80 hover:border-foreground/40"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function BriefWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));

  const canAdvance = [
    !!data.projectType,
    !!data.location,
    !!data.finishTier,
    !!data.timeline,
    !!(data.name && data.phone && data.email),
  ][step];

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/rbcbuilders70@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New guided project brief from website",
          "Project Type": data.projectType,
          Location: data.location,
          "Finish Tier": data.finishTier,
          Timeline: data.timeline,
          Name: data.name,
          Phone: data.phone,
          Email: data.email,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full min-h-[22rem] bg-background p-8 sm:p-10 border border-border">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent mb-6">
          <Check size={24} />
        </span>
        <h3 className="font-display text-2xl mb-3">Brief sent.</h3>
        <p className="text-sm text-foreground/60 max-w-xs">
          We will review your project details and get back to you within one business day at {data.email || "the email you provided"}.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background p-8 sm:p-10 border border-border">
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs uppercase tracking-wider text-muted">
          Step {step + 1} of {STEP_COUNT}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`h-1 w-6 ${i <= step ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[14rem]">
        {step === 0 && (
          <div>
            <h3 className="font-display text-2xl mb-6">What are you looking to build?</h3>
            <ChipGroup options={PROJECT_TYPES} value={data.projectType} onSelect={(v) => set({ projectType: v })} />
          </div>
        )}
        {step === 1 && (
          <div>
            <h3 className="font-display text-2xl mb-6">Where is the project located?</h3>
            <ChipGroup options={LOCATIONS} value={data.location} onSelect={(v) => set({ location: v })} />
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="font-display text-2xl mb-6">Which finish tier fits your budget?</h3>
            <ChipGroup options={TIERS} value={data.finishTier} onSelect={(v) => set({ finishTier: v })} />
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="font-display text-2xl mb-6">When are you hoping to start?</h3>
            <ChipGroup options={TIMELINES} value={data.timeline} onSelect={(v) => set({ timeline: v })} />
          </div>
        )}
        {step === 4 && (
          <div>
            <h3 className="font-display text-2xl mb-6">Where should we send your brief?</h3>
            <div className="flex flex-col gap-4">
              <input
                required
                value={data.name}
                onChange={(e) => set({ name: e.target.value })}
                placeholder="Full name"
                className="bg-surface border border-border px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
              />
              <input
                required
                value={data.phone}
                onChange={(e) => set({ phone: e.target.value })}
                placeholder="Phone number"
                className="bg-surface border border-border px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
              />
              <input
                required
                type="email"
                value={data.email}
                onChange={(e) => set({ email: e.target.value })}
                placeholder="Email address"
                className="bg-surface border border-border px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground disabled:opacity-0 transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={() => canAdvance && setStep((s) => s + 1)}
            disabled={!canAdvance}
            className="flex items-center gap-2 bg-accent text-background px-5 py-2.5 text-sm font-semibold uppercase tracking-wide disabled:opacity-40 hover:bg-foreground transition-colors"
          >
            Next <ArrowRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!data.name || !data.phone || !data.email || status === "sending"}
            className="flex items-center gap-2 bg-accent text-background px-5 py-2.5 text-sm font-semibold uppercase tracking-wide disabled:opacity-40 hover:bg-foreground transition-colors"
          >
            {status === "sending" ? <Loader2 size={14} className="animate-spin" /> : null}
            Send Brief
          </button>
        )}
      </div>
      {status === "error" && (
        <p className="text-xs text-accent mt-4">
          Something went wrong. Please call or text 0977 287 3075 instead.
        </p>
      )}
    </div>
  );
}
