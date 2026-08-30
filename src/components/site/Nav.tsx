"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#languages", label: "Languages" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ name, resumeUrl }: { name: string; resumeUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const firstName = name.split(" ")[0];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-ink-950/85 backdrop-blur border-b border-ink-line" : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg text-text-hi">
          {firstName}
          <span className="text-seal-gold-bright">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-stamp text-[11px] uppercase tracking-[0.18em] text-text-mid hover:text-seal-gold-bright transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 font-stamp text-[11px] uppercase tracking-[0.18em] text-text-mid hover:text-seal-gold-bright transition-colors"
            >
              Download CV
            </a>
          )}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-sm border border-seal-gold/60 px-4 py-2 font-stamp text-[11px] uppercase tracking-[0.18em] text-seal-gold-bright hover:bg-seal-gold hover:text-ink-950 transition-colors"
          >
            Request a quote
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn("h-px w-6 bg-text-hi transition-transform", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-px w-6 bg-text-hi transition-opacity", open && "opacity-0")} />
          <span className={cn("h-px w-6 bg-text-hi transition-transform", open && "-translate-y-2 -rotate-45")} />
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-ink-line bg-ink-950">
          <Container className="flex flex-col py-4 gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 font-stamp text-xs uppercase tracking-[0.18em] text-text-mid border-b border-ink-line/60 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
