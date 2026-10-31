"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Send, Phone, Mail } from "lucide-react";
import { matchIntent, FALLBACK_REPLY } from "@/lib/chatbot-knowledge";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const OPENING: Message = {
  id: 0,
  role: "bot",
  text: "Welcome to RBC Builders Architectural Concierge. How may I assist you with your residence or commercial construction project in Central Luzon today?",
};

const STARTER_CHIPS = [
  "Construction rates per m²?",
  "Which regions do you build in?",
  "How does bank financing work?",
  "Do you handle LGU building permits?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState(STARTER_CHIPS);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    const userMsg: Message = { id: idRef.current++, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setChips([]);
    setTyping(true);

    const intent = matchIntent(text);
    const replyText = intent ? intent.reply : FALLBACK_REPLY;
    const nextChips = intent?.followUps ?? [];

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, role: "bot", text: replyText },
      ]);
      setChips(nextChips);
    }, 450);
  };

  return (
    <>
      {/* Floating Action Elements (Pill on left + Vertical Button Stack on right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {/* RBC Architectural Concierge Teaser Pill */}
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open architectural advisory chat"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 hover:bg-white border border-accent/50 hover:border-accent text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 group cursor-pointer mb-0.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-normal tracking-tight text-foreground group-hover:text-accent transition-colors whitespace-nowrap">
              RBC Concierge &middot; <strong className="font-medium text-accent">Ask Us Anything</strong>
            </span>
          </button>
        )}

        {/* Dedicated Vertical Column for Circular Buttons (All perfectly centered above each other) */}
        <div className="flex flex-col items-center gap-2.5">
          {!open && (
            <>
              {/* Email Button (top) */}
              <a
                href="mailto:rbcbuilders70@gmail.com"
                aria-label="Email RBC Builders at rbcbuilders70@gmail.com"
                title="Official Email: rbcbuilders70@gmail.com"
                className="relative h-11 w-11 rounded-full bg-white hover:bg-surface-raised text-[#151413] shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center border border-border group animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <Mail size={18} className="text-[#151413] transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute right-full mr-3 px-2.5 py-1 bg-[#151413] border border-black/10 text-white text-[11px] font-mono whitespace-nowrap rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 shadow-xl">
                  rbcbuilders70@gmail.com
                </span>
              </a>

              {/* Direct Phone / Number Button (middle-top) */}
              <a
                href="tel:+639772873075"
                aria-label="Call RBC Builders at 0977 287 3075"
                title="Hotline: 0977 287 3075"
                className="relative h-11 w-11 rounded-full bg-white hover:bg-surface-raised text-[#151413] shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center border border-border group animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <Phone size={18} className="text-[#151413] transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute right-full mr-3 px-2.5 py-1 bg-[#151413] border border-black/10 text-white text-[11px] font-mono whitespace-nowrap rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 shadow-xl">
                  0977 287 3075
                </span>
              </a>

              {/* Facebook Page Button (middle-bottom, directly above chatbot) */}
              <a
                href="https://www.facebook.com/profile.php?id=100088879215614"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit RBC Builders on Facebook"
                title="Visit our Facebook Page"
                className="relative h-11 w-11 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center border border-white/20 group animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <svg
                  className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="absolute right-full mr-3 px-2.5 py-1 bg-[#151413] border border-black/10 text-white text-[11px] font-mono whitespace-nowrap rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 shadow-xl">
                  Facebook Page
                </span>
              </a>
            </>
          )}

          {/* Chatbot Trigger Button (bottom anchor) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle RBC Architectural Concierge"
            className="h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-white border border-accent/60 text-accent hover:border-accent hover:bg-accent hover:text-white shadow-xl transition-all duration-300 flex items-center justify-center group shrink-0"
          >
            {open ? (
              <X size={20} />
            ) : (
              <div className="relative flex items-center justify-center">
                <span className="font-serif text-[12px] font-semibold tracking-wider text-accent group-hover:text-white transition-colors">
                  RBC
                </span>
                <span className="absolute -top-1.5 -right-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-white" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Concierge Panel */}
      {open && (
        <div className="fixed bottom-24 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[78vh] bg-white/95 backdrop-blur-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-surface-raised border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-sm border border-border">
                <Image
                  src="/images/logo.jpg"
                  alt="RBC Builders"
                  fill
                  quality={95}
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-base text-foreground font-normal block leading-tight">
                  RBC Architectural Concierge
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-accent font-light">
                  Live Technical &amp; Cost Advisory
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=100088879215614"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit RBC Builders on Facebook"
                title="Visit our Facebook Page"
                className="text-muted hover:text-[#1877F2] p-1 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close concierge"
                className="text-muted hover:text-foreground p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-light bg-background"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 leading-relaxed rounded-md ${
                    m.role === "user"
                      ? "bg-accent text-white font-normal shadow-sm"
                      : "bg-surface border border-border text-foreground/90 font-light shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="p-3 bg-surface border border-border text-muted flex items-center gap-1.5 rounded-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            {chips.length > 0 && !typing && (
              <div className="pt-2 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium mb-1">
                  Suggested Inquiries
                </span>
                {chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => send(chip)}
                    className="text-left p-2 border border-border bg-surface hover:border-accent hover:text-accent text-[11px] text-foreground/80 transition-colors rounded-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 bg-surface-raised border-t border-border flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire on costs, permits, or timelines..."
              aria-label="Inquire on costs, permits, or timelines"
              className="flex-1 bg-surface border border-border px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none font-light rounded-sm"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message to concierge"
              className="h-9 w-9 bg-accent text-white hover:bg-accent-dim transition-colors flex items-center justify-center disabled:opacity-40 rounded-sm"
            >
              <Send size={14} />
            </button>
          </form>

          {/* Direct Line Footer */}
          <div className="px-4 py-2 bg-surface border-t border-border/60 flex items-center justify-between text-[10px] text-muted">
            <a
              href="https://www.facebook.com/profile.php?id=100088879215614"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-[#1877F2] flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook Page</span>
            </a>
            <a href="tel:+639772873075" className="text-accent hover:underline flex items-center gap-1 font-mono">
              <Phone size={10} /> 0977 287 3075
            </a>
          </div>
        </div>
      )}
    </>
  );
}
