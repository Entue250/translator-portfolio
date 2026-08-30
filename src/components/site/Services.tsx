import {
  Stamp,
  Mic,
  BookOpen,
  Globe2,
  Captions,
  CheckCircle2,
  FileText,
  Languages as LanguagesIcon,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServiceItem } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  stamp: Stamp,
  mic: Mic,
  book: BookOpen,
  globe: Globe2,
  captions: Captions,
  check: CheckCircle2,
  document: FileText,
  languages: LanguagesIcon,
};

export function Services({ services }: { services: ServiceItem[] }) {
  if (!services.length) return null;

  return (
    <section id="services" className="py-24 sm:py-32 bg-ink-900/40 border-y border-ink-line">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="What crosses my desk"
          description="Every project is read twice — once for accuracy, once for the reader who will never see the original."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon] || FileText;
            return (
              <div
                key={service.id}
                className="group rounded-sm border border-ink-line bg-ink-900/60 p-7 transition-colors hover:border-seal-gold/50"
              >
                <Icon className="h-6 w-6 text-seal-gold-bright" strokeWidth={1.5} />
                <h3 className="font-display mt-5 text-lg text-text-hi">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-mid">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
