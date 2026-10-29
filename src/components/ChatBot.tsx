"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Send, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { matchIntent, FALLBACK_REPLY } from "@/lib/chatbot-knowledge";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const OPENING: Message = {
  id: 0,
  role: "bot",
  text: "Hi, I am the RBC Builders assistant. Ask me about pricing, services, timelines, or how to reach the team.",
};

const STARTER_CHIPS = [
  "What are your finish tiers?",
  "What areas do you serve?",
  "How do I get a quote?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState(STARTER_CHIPS);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 28, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "expo.out" }
      );
    }
  }, [open]);

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
    const delay = 450 + Math.random() * 350;

    setTimeout(() => {
      const reply = intent?.reply ?? FALLBACK_REPLY;
      setMessages((prev) => [...prev, { id: idRef.current++, role: "bot", text: reply }]);
      setChips(intent?.followUps ?? []);
      setTyping(false);
    }, delay);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] flex flex-col items-end">
      {open && (
        <div
          ref={panelRef}
          className="mb-4 flex h-[34rem] max-h-[75vh] w-[23rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[28px] border border-border bg-background/95 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-accent/10"
        >
          {/* Header */}
          <div className="relative flex items-center justify-between gap-3 bg-gradient-to-b from-surface to-background px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden ring-2 ring-accent/30">
                  <Image src="/images/logo.jpg" alt="RBC Builders" width={40} height={40} className="object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent ring-2 ring-background" />
              </div>
              <div>
                <p className="font-display text-sm tracking-wide leading-none">RBC Builders</p>
                <p className="text-[11px] text-accent mt-1.5">Usually replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3.5">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-end gap-2 ${m.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
                {m.role === "bot" && (
                  <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Sparkles size={12} />
                  </span>
                )}
                <div
                  className={`max-w-[15.5rem] text-[13.5px] leading-relaxed px-4 py-3 ${
                    m.role === "bot"
                      ? "rounded-2xl rounded-bl-sm bg-surface border border-border text-foreground/90"
                      : "rounded-2xl rounded-br-sm bg-accent text-background font-medium"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="self-start flex items-end gap-2">
                <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Sparkles size={12} />
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-surface border border-border px-4 py-3.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted animate-type-pulse [animation-delay:0s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted animate-type-pulse [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted animate-type-pulse [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            {!typing && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1 pl-8">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => send(chip)}
                    className="rounded-full text-xs border border-border px-3.5 py-2 hover:border-accent hover:text-accent transition-colors text-left"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, services..."
              className="flex-1 rounded-full bg-surface border border-border px-4 py-2.5 text-sm focus:border-accent outline-none transition-colors"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-background hover:bg-foreground hover:scale-105 transition-all"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-background shadow-[0_18px_40px_-10px_rgba(255,90,31,0.55)] hover:bg-foreground transition-colors"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-accent/60 animate-ping [animation-duration:2.4s]" />
        )}
        <span className="relative">
          {open ? (
            <X size={22} />
          ) : (
            <Image src="/images/logo.jpg" alt="" width={34} height={34} className="rounded-full object-cover" />
          )}
        </span>
      </button>
    </div>
  );
}
