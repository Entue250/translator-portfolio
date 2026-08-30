import { Container } from "@/components/ui/Container";
import type { Profile } from "@/lib/types";
import { Link2, AtSign, Image as ImageIcon, MessageCircle } from "lucide-react";

export function Footer({ profile }: { profile: Profile }) {
  const socials = [
    { href: profile.linkedin_url, label: "LinkedIn", Icon: Link2 },
    { href: profile.twitter_url, label: "X / Twitter", Icon: AtSign },
    { href: profile.instagram_url, label: "Instagram", Icon: ImageIcon },
    { href: profile.whatsapp_url, label: "WhatsApp", Icon: MessageCircle },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-ink-line py-10">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-stamp text-[11px] uppercase tracking-[0.16em] text-text-low text-center sm:text-left">
          © {new Date().getFullYear()} {profile.full_name}. All translations rendered with care.
        </p>

        {socials.length > 0 && (
          <div className="flex items-center gap-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href!}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="text-text-low hover:text-seal-gold-bright transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </Container>
    </footer>
  );
}
