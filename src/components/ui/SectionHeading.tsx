import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <div
        className={cn(
          "font-stamp text-xs uppercase tracking-[0.25em] flex items-center gap-3",
          align === "center" && "justify-center",
          light ? "text-ink-950/60" : "text-seal-gold-bright"
        )}
      >
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
      </div>
      <h2
        className={cn(
          "font-display mt-3 text-3xl sm:text-4xl font-medium text-balance",
          light ? "text-paper-ink" : "text-text-hi"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-paper-ink/70" : "text-text-mid"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
