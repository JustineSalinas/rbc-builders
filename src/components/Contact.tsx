"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Check } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import BriefWizard from "./BriefWizard";

export default function Contact() {
  const sectionRef = useReveal<HTMLElement>();
  const [mode, setMode] = useState<"guided" | "quick">("guided");
  const [quickForm, setQuickForm] = useState({ name: "", contact: "", message: "" });
  const [quickSent, setQuickSent] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formsubmit.co/ajax/rbcbuilders70@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Direct Inquiry from ${quickForm.name}`,
          Name: quickForm.name,
          Contact: quickForm.contact,
          Message: quickForm.message,
        }),
      });
      setQuickSent(true);
    } catch {
      setQuickSent(true);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-28 sm:py-36 px-4 sm:px-8 bg-surface relative border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Private Consultation
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              Commission Your Residence
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/70 font-light max-w-md leading-relaxed">
            Begin the conversation with our chief architects and structural engineers. We review lot parameters, zoning compliance, and realistic investment estimates.
          </p>
        </div>

        {/* Two-Column Grid: Contact Coordinates vs Form Wizard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Office Coordinates & Map */}
          <div data-reveal data-reveal-delay="0.1" className="lg:col-span-5 flex flex-col gap-8">
            <div className="p-8 bg-surface border border-border flex flex-col gap-6 shadow-sm">
              <h3 className="font-serif text-2xl text-foreground font-normal pb-4 border-b border-border">
                Headquarters &amp; Direct Lines
              </h3>

              <div className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-accent shrink-0 bg-surface">
                  <MapPin size={16} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Office Location</p>
                  <p className="font-serif text-base text-foreground mt-0.5">San Fernando, Pampanga</p>
                  <p className="text-xs text-muted font-light mt-0.5">Philippines, 2005</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-accent shrink-0 bg-surface">
                  <Phone size={16} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Phone / Text</p>
                  <p className="font-serif text-base text-foreground mt-0.5">
                    <a href="tel:+639772873075" className="hover:text-accent transition-colors">
                      0977 287 3075
                    </a>
                    {" "}·{" "}
                    <a href="tel:+639627863202" className="hover:text-accent transition-colors">
                      0962 786 3202
                    </a>
                  </p>
                  <p className="text-xs text-muted font-light mt-0.5">Mon–Sat, 8:00 AM – 6:00 PM PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-accent shrink-0 bg-surface">
                  <Mail size={16} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Official Correspondence</p>
                  <p className="font-serif text-base text-foreground mt-0.5">
                    <a href="mailto:rbcbuilders70@gmail.com" className="hover:text-accent transition-colors">
                      rbcbuilders70@gmail.com
                    </a>
                  </p>
                  <p className="text-xs text-muted font-light mt-0.5">Replies within 24 business hours</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center gap-3">
                <a
                  href="https://facebook.com/RBCBuilders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 px-4 text-xs uppercase tracking-[0.18em] border border-border text-foreground/80 hover:border-accent hover:text-accent transition-colors"
                >
                  Facebook Page
                </a>
                <a
                  href="https://m.me/RBCBuilders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 px-4 text-xs uppercase tracking-[0.18em] bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} />
                  <span>Messenger</span>
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-surface shadow-sm rounded-lg">
              <iframe
                title="RBC Builders San Fernando Pampanga Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123348.97677457723!2d120.61286948572458!3d15.03407675713437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f79024f227b7%3A0xe54e58bca15a3a4c!2sCity%20of%20San%20Fernando%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Inquiry Mode Tabs & Interactive Wizard */}
          <div data-reveal data-reveal-delay="0.16" className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <button
                onClick={() => setMode("guided")}
                className={`text-xs uppercase tracking-[0.2em] font-medium px-4 py-2 border transition-colors ${
                  mode === "guided"
                    ? "bg-accent text-white border-accent shadow-sm"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                Guided Project Brief
              </button>
              <button
                onClick={() => setMode("quick")}
                className={`text-xs uppercase tracking-[0.2em] font-medium px-4 py-2 border transition-colors ${
                  mode === "quick"
                    ? "bg-accent text-white border-accent shadow-sm"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                Quick Direct Message
              </button>
            </div>

            {mode === "guided" ? (
              <BriefWizard />
            ) : (
              <div className="p-8 sm:p-10 bg-background border border-border">
                {quickSent ? (
                  <div className="text-center py-12 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent mb-4">
                      <Check size={24} />
                    </div>
                    <h4 className="font-serif text-2xl text-foreground font-normal mb-2">
                      Inquiry Dispatched
                    </h4>
                    <p className="text-xs text-muted font-light max-w-sm mb-6">
                      Our project coordination desk has received your message and will reply shortly.
                    </p>
                    <button
                      onClick={() => {
                        setQuickForm({ name: "", contact: "", message: "" });
                        setQuickSent(false);
                      }}
                      className="text-xs uppercase tracking-[0.2em] text-accent underline underline-offset-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="quick-name" className="text-[11px] uppercase tracking-[0.18em] text-muted block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="quick-name"
                        type="text"
                        required
                        value={quickForm.name}
                        onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                        placeholder="Dr. / Mr. / Ms. Full Name"
                        className="w-full bg-surface border border-border px-4 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="quick-contact" className="text-[11px] uppercase tracking-[0.18em] text-muted block mb-1.5">
                        Contact Number or Email *
                      </label>
                      <input
                        id="quick-contact"
                        type="text"
                        required
                        value={quickForm.contact}
                        onChange={(e) => setQuickForm({ ...quickForm, contact: e.target.value })}
                        placeholder="0917... or email@domain.com"
                        className="w-full bg-surface border border-border px-4 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="quick-message" className="text-[11px] uppercase tracking-[0.18em] text-muted block mb-1.5">
                        Message / Project Inquiry *
                      </label>
                      <textarea
                        id="quick-message"
                        rows={5}
                        required
                        value={quickForm.message}
                        onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                        placeholder="Tell us about your property location, intended square footage, or any specific architectural preferences..."
                        className="w-full bg-surface border border-border px-4 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-white hover:bg-accent-dim transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send size={13} />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
