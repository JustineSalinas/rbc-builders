"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Link as LinkIcon, MessageCircle, ShieldCheck, Hammer, Users } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import BriefWizard from "./BriefWizard";

const BADGES = [
  { icon: ShieldCheck, label: "Licensed & Permitted Builder" },
  { icon: Hammer, label: "Design-to-Turnover, One Team" },
  { icon: Users, label: "12K+ Facebook Community" },
];

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [mode, setMode] = useState<"quick" | "guided">("guided");

  return (
    <section id="contact" className="py-28 sm:py-36 px-4 sm:px-6 bg-surface">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div data-reveal className="flex flex-wrap gap-x-8 gap-y-3 mb-14 sm:mb-20">
          {BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-sm text-foreground/70">
              <b.icon size={16} className="text-accent shrink-0" />
              {b.label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 data-reveal className="font-display text-4xl sm:text-5xl leading-tight mb-8">
              Let&apos;s build your dream home.
            </h2>
            <p
              data-reveal
              data-reveal-delay="0.08"
              className="text-foreground/70 text-lg leading-relaxed mb-10 max-w-md"
            >
              Reach out for inquiries on design and build / construction
              services. We serve San Fernando, Tarlac, Angeles City, Olongapo,
              Balanga, and Mariveles.
            </p>

            <div className="flex flex-col gap-6 mb-10">
              <a href="tel:+639772873075" className="flex items-center gap-4 group">
                <span className="flex h-12 w-12 items-center justify-center border border-border group-hover:border-accent group-hover:text-accent transition-colors shrink-0">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">Call or Text</p>
                  <p className="text-foreground">0977 287 3075 &middot; 0962 786 3202</p>
                </div>
              </a>

              <a href="mailto:rbcbuilders70@gmail.com" className="flex items-center gap-4 group">
                <span className="flex h-12 w-12 items-center justify-center border border-border group-hover:border-accent group-hover:text-accent transition-colors shrink-0">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">Email</p>
                  <p className="text-foreground">rbcbuilders70@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center border border-border shrink-0">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">Location</p>
                  <p className="text-foreground">San Fernando, Pampanga, Philippines, 2005</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-10">
              <a
                href="https://facebook.com/RBCBuilders"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RBC Builders on Facebook"
                className="flex h-11 w-11 items-center justify-center border border-border hover:border-accent hover:text-accent transition-colors"
              >
                <LinkIcon size={18} />
              </a>
              <a
                href="https://m.me/RBCBuilders"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message RBC Builders"
                className="flex h-11 w-11 items-center justify-center border border-border hover:border-accent hover:text-accent transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>

            <div className="relative aspect-video w-full overflow-hidden border border-border grayscale hover:grayscale-0 transition-[filter] duration-500">
              <iframe
                title="RBC Builders service area map, San Fernando, Pampanga"
                src="https://www.google.com/maps?q=San+Fernando,+Pampanga,+Philippines&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div data-reveal data-reveal-delay="0.1">
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setMode("guided")}
                className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                  mode === "guided"
                    ? "bg-accent text-background border-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                Guided Brief
              </button>
              <button
                onClick={() => setMode("quick")}
                className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                  mode === "quick"
                    ? "bg-accent text-background border-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                Quick Form
              </button>
            </div>

            {mode === "guided" ? (
              <BriefWizard />
            ) : (
              <form
                action="https://formsubmit.co/rbcbuilders70@gmail.com"
                method="POST"
                className="flex flex-col gap-5 bg-background p-8 sm:p-10 border border-border"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-muted">Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="bg-surface border border-border px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-muted">Phone</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="bg-surface border border-border px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
                      placeholder="09XX XXX XXXX"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-muted">Email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="bg-surface border border-border px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
                    placeholder="you@email.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-muted">Project Type</label>
                  <select
                    name="project_type"
                    className="bg-surface border border-border px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
                    defaultValue="New Construction"
                  >
                    <option>New Construction</option>
                    <option>Renovation</option>
                    <option>Interior Design</option>
                    <option>Permit Processing Only</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-muted">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="bg-surface border border-border px-4 py-3 text-sm focus:border-accent outline-none transition-colors resize-none"
                    placeholder="Tell us about your project, location, and target budget..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 bg-accent text-background py-4 text-sm uppercase tracking-widest font-medium hover:bg-foreground transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
