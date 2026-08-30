import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Education as EducationEntry } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";

export function Education({ education }: { education: EducationEntry[] }) {
  if (!education.length) return null;

  return (
    <section id="education" className="py-24 sm:py-32 bg-ink-900/40 border-y border-ink-line">
      <Container>
        <SectionHeading
          eyebrow="Transcript"
          title="Schooling &amp; degrees"
          description="The academic record behind the languages."
        />

        <ol className="mt-14 relative border-l border-ink-line pl-8 space-y-10 max-w-2xl">
          {education.map((entry) => (
            <li key={entry.id} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-stamp-green-bright ring-4 ring-ink-950" />
              <div className="font-stamp text-[10px] uppercase tracking-[0.16em] text-text-low">
                {formatDateRange(entry.start_date, entry.end_date, entry.is_current)}
              </div>
              <h3 className="font-display mt-2 text-xl text-text-hi">{entry.degree}</h3>
              <p className="mt-1 text-sm text-seal-gold-bright">
                {entry.institution}
                {entry.location ? ` · ${entry.location}` : ""}
              </p>
              {entry.description && (
                <p className="mt-3 text-sm leading-relaxed text-text-mid">{entry.description}</p>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
