import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Reference } from "@/lib/types";

export function References({ references }: { references: Reference[] }) {
  if (!references.length) return null;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="References"
          title="Who can vouch for the work"
          description="Available to speak directly with prospective clients or employers on request."
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((ref) => (
            <div
              key={ref.id}
              className="paper flex flex-col items-center gap-3 p-7 text-center"
            >
              <BadgeCheck className="h-6 w-6 text-stamp-green" strokeWidth={1.5} />
              <div className="font-display text-base text-paper-ink">{ref.name}</div>
              <div className="font-stamp text-[10px] uppercase tracking-[0.14em] text-paper-ink/55">
                {ref.role}
                {ref.organization ? ` · ${ref.organization}` : ""}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
