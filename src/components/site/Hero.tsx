import { Container } from "@/components/ui/Container";
import { CertifiedSeal } from "@/components/ui/CertifiedSeal";
import { InterlinearGloss } from "@/components/site/InterlinearGloss";
import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  const pairs =
    profile.hero_source_text && profile.hero_target_text
      ? [
          {
            source: profile.hero_source_text,
            sourceLang: profile.hero_source_lang || "FR",
            target: profile.hero_target_text,
            targetLang: profile.hero_target_lang || "EN",
          },
        ]
      : undefined;

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* faint dotted "stamp sheet" backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--seal-gold) 1px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          {profile.available_for_work && (
            <div className="inline-flex items-center gap-2 rounded-full border border-stamp-green/50 bg-stamp-green/10 px-3 py-1 font-stamp text-[10px] uppercase tracking-[0.2em] text-stamp-green-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-stamp-green-bright animate-pulse" />
              Available for new projects
            </div>
          )}

          <h1 className="font-display mt-6 text-4xl sm:text-6xl leading-[1.05] text-text-hi text-balance">
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-text-mid leading-relaxed">
            {profile.bio_short}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-sm bg-seal-gold px-6 py-3 font-stamp text-xs uppercase tracking-[0.18em] text-ink-950 hover:bg-seal-gold-bright transition-colors"
            >
              Request a quote
            </a>
            <a
              href="#work"
              className="rounded-sm border border-ink-line px-6 py-3 font-stamp text-xs uppercase tracking-[0.18em] text-text-hi hover:border-seal-gold-bright hover:text-seal-gold-bright transition-colors"
            >
              View case studies
            </a>
            {profile.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noreferrer noopener"
                className="font-stamp text-xs uppercase tracking-[0.18em] text-text-mid underline decoration-dotted underline-offset-4 hover:text-seal-gold-bright transition-colors"
              >
                Download CV
              </a>
            )}
          </div>

          <div className="mt-14 max-w-lg border-l-2 border-ink-line pl-5">
            <InterlinearGloss pairs={pairs} />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative text-seal-gold-bright/90">
            <CertifiedSeal
              name={profile.full_name}
              bottomText={`${profile.location.toUpperCase()} · SINCE ${new Date().getFullYear() - profile.years_experience}`}
              size={260}
              className="drop-shadow-[0_0_30px_rgba(199,154,68,0.15)] -rotate-6"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
