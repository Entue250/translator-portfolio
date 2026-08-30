import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Language } from "@/lib/types";

const PROFICIENCY_COLOR: Record<Language["proficiency"], string> = {
  Native: "text-seal-gold-bright border-seal-gold/60",
  Fluent: "text-stamp-green-bright border-stamp-green/60",
  Professional: "text-text-hi border-ink-line",
  Working: "text-text-mid border-ink-line",
};

export function LanguagesSection({ languages }: { languages: Language[] }) {
  if (!languages.length) return null;

  return (
    <section id="languages" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Language pairs"
          title="Every stamp is a language I've lived in"
          description="Proficiency levels follow professional self-assessment standards — Native, Fluent, Professional working, and Working knowledge for supporting research."
        />

        <div className="mt-14 flex flex-wrap gap-5">
          {languages.map((lang, i) => (
            <div
              key={lang.id}
              className={`stamp-ring flex h-32 w-32 flex-col items-center justify-center gap-1 p-3 text-center ${
                PROFICIENCY_COLOR[lang.proficiency]
              }`}
              style={{ transform: `rotate(${((i % 5) - 2) * 3}deg)` }}
            >
              <span className="font-stamp text-2xl tracking-widest">{lang.code}</span>
              <span className="font-display text-sm text-text-hi">{lang.name}</span>
              <span className="font-stamp text-[9px] uppercase tracking-[0.14em] opacity-80">
                {lang.proficiency}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
