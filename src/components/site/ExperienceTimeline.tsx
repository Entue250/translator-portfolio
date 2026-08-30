import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Experience } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  if (!experience.length) return null;

  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Ledger"
          title="Entries &amp; exits"
          description="Each role, in the order I lived it."
        />

        <ol className="mt-14 relative border-l border-ink-line pl-8 space-y-12 max-w-2xl">
          {experience.map((role) => (
            <li key={role.id} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-seal-gold-bright ring-4 ring-ink-950" />
              <div className="font-stamp text-[10px] uppercase tracking-[0.16em] text-text-low">
                {formatDateRange(role.start_date, role.end_date, role.is_current)}
              </div>
              <h3 className="font-display mt-2 text-xl text-text-hi">{role.role}</h3>
              <p className="mt-1 text-sm text-seal-gold-bright">
                {role.organization}
                {role.location ? ` · ${role.location}` : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-mid">
                {role.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
