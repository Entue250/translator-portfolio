"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Profile } from "@/lib/types";
import { Mail, MapPin, Phone } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      subject: String(data.get("subject") || ""),
      languagePair: String(data.get("languagePair") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error — please try again in a moment.");
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title="Start a request"
            description="Tell me about the document, the deadline, and the language pair. I reply within one business day."
          />

          <dl className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-seal-gold-bright" />
              <a href={`mailto:${profile.email}`} className="text-sm text-text-mid hover:text-text-hi">
                {profile.email}
              </a>
            </div>
            {profile.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-seal-gold-bright" />
                <a href={`tel:${profile.phone}`} className="text-sm text-text-mid hover:text-text-hi">
                  {profile.phone}
                </a>
              </div>
            )}
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-seal-gold-bright" />
              <span className="text-sm text-text-mid">{profile.location}</span>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="paper p-8 sm:p-10 space-y-5" noValidate>
          <div className="flex items-center justify-between font-stamp text-[10px] uppercase tracking-[0.18em] text-paper-ink/45">
            <span>Application for translation services</span>
            <span>Form 07-B</span>
          </div>

          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" required autoComplete="name" />
            <Field label="Email address" name="email" type="email" required autoComplete="email" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Subject" name="subject" required />
            <Field label="Language pair" name="languagePair" placeholder="e.g. EN → FR" />
          </div>

          <div>
            <label className="font-stamp text-[10px] uppercase tracking-[0.16em] text-paper-ink/50">
              Project details
            </label>
            <textarea
              name="message"
              required
              minLength={10}
              rows={5}
              placeholder="What needs translating, by when, and any formatting requirements."
              className="mt-2 w-full resize-none border-b border-paper-ink/25 bg-transparent py-2 text-sm text-paper-ink placeholder:text-paper-ink/35 focus:border-paper-ink/60 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-sm bg-paper-ink py-3 font-stamp text-xs uppercase tracking-[0.18em] text-paper-100 transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "sending" ? "Submitting…" : "Submit request"}
          </button>

          <div aria-live="polite">
            {status === "success" && (
              <p className="text-sm text-stamp-green">
                Received &amp; stamped — I&apos;ll reply within one business day.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-stamp-red">{errorMessage}</p>
            )}
          </div>
        </form>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-stamp text-[10px] uppercase tracking-[0.16em] text-paper-ink/50"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-paper-ink/25 bg-transparent py-2 text-sm text-paper-ink placeholder:text-paper-ink/35 focus:border-paper-ink/60 focus:outline-none"
      />
    </div>
  );
}
