import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Profile } from "@/lib/types";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-stamp text-[10px] uppercase tracking-[0.16em] text-paper-ink/50">
        {label}
      </dt>
      <dd className="font-body text-sm text-paper-ink mt-1">{value}</dd>
    </div>
  );
}

export function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="Bio data"
          title="A translator's job is to disappear, and still be trusted."
          description={profile.bio_long}
        />

        {/* Passport-style biodata card */}
        <div className="paper perforated-bottom relative mx-auto w-full max-w-md p-8">
          <div className="flex items-start justify-between">
            <span className="font-stamp text-[10px] uppercase tracking-[0.2em] text-paper-ink/50">
              Professional Profile
            </span>
            <span className="font-stamp text-[10px] uppercase tracking-[0.2em] text-paper-ink/50">
              No. {String(profile.id).padStart(6, "0")}
            </span>
          </div>

          <div className="mt-6 flex gap-6">
            <div className="h-28 w-24 shrink-0 overflow-hidden border-2 border-paper-ink/15 bg-paper-300">
              {profile.photo_url ? (
                <Image
                  src={profile.photo_url}
                  alt={profile.full_name}
                  width={96}
                  height={112}
                  className="h-full w-full object-cover grayscale contrast-125"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-2xl text-paper-ink/40">
                  {profile.full_name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
              )}
            </div>

            <dl className="grid grid-cols-1 gap-3 flex-1">
              <Field label="Full name" value={profile.full_name} />
              <Field label="Based in" value={profile.location} />
              <Field label="Practicing since" value={String(new Date().getFullYear() - profile.years_experience)} />
            </dl>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-paper-ink/10 pt-6">
            <Field label="Specialization" value={profile.headline} />
            <Field
              label="Status"
              value={profile.available_for_work ? "Accepting new work" : "Fully booked"}
            />
          </dl>

          <div className="mt-8 flex items-center justify-between border-t border-dashed border-paper-ink/20 pt-5">
            <span className="font-stamp text-[9px] uppercase tracking-[0.2em] text-paper-ink/40">
              Signed &amp; sealed
            </span>
            <span className="font-display italic text-lg text-paper-ink/70">
              {profile.full_name}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
