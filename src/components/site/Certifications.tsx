import { Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Certification } from "@/lib/types";

export function Certifications({ certifications }: { certifications: Certification[] }) {
  if (!certifications.length) return null;

  return (
    <section className="py-24 sm:py-32 bg-ink-900/40 border-y border-ink-line">
      <Container>
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications &amp; training"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.credential_url ?? undefined}
              target={cert.credential_url ? "_blank" : undefined}
              rel={cert.credential_url ? "noreferrer noopener" : undefined}
              className="flex items-start gap-4 rounded-sm border border-ink-line p-6 hover:border-seal-gold/50 transition-colors"
            >
              <Award className="h-6 w-6 shrink-0 text-seal-gold-bright" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-base text-text-hi">{cert.title}</h3>
                <p className="mt-1 text-sm text-text-mid">{cert.issuer}</p>
                <p className="mt-1 font-stamp text-[10px] uppercase tracking-[0.14em] text-text-low">
                  {cert.year}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
