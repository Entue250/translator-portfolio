import Image from "next/image";
import { ArrowUpRight, Paperclip } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

export function Portfolio({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section id="work" className="py-24 sm:py-32 bg-ink-900/40 border-y border-ink-line">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Areas of practice"
          description="Representative categories of translation, transcription and subtitling work. Specific client materials are confidential and available on request."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="paper relative flex flex-col p-7 sm:p-8"
            >
              <Paperclip
                className="absolute -top-3 left-8 h-7 w-7 text-paper-ink/30 -rotate-12"
                strokeWidth={1.5}
              />

              {project.image_url && (
                <div className="mb-5 aspect-[16/9] overflow-hidden rounded-sm border border-paper-ink/10">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 font-stamp text-[10px] uppercase tracking-[0.16em] text-paper-ink/50">
                <span>{project.category}</span>
                <span aria-hidden>·</span>
                <span>{project.language_pair}</span>
              </div>

              <h3 className="font-display mt-3 text-xl text-paper-ink">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-paper-ink/75 flex-1">
                {project.description}
              </p>

              {project.link_url && (
                <a
                  href={project.link_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex items-center gap-1.5 self-start font-stamp text-[11px] uppercase tracking-[0.14em] text-stamp-green underline decoration-dotted underline-offset-4 hover:text-stamp-green-bright"
                >
                  View reference
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
