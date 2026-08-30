export function CertifiedSeal({
  name,
  topText = "CERTIFIED TRANSLATOR",
  bottomText,
  size = 220,
  className,
}: {
  name: string;
  topText?: string;
  bottomText: string;
  size?: number;
  className?: string;
}) {
  const id = "seal-" + name.replace(/\s+/g, "-").toLowerCase();
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${topText}: ${name}`}
    >
      <defs>
        <path id={`${id}-top`} d="M 20,110 a 90,90 0 1,1 180,0" fill="none" />
        <path id={`${id}-bottom`} d="M 30,130 a 80,80 0 0,0 160,0" fill="none" />
      </defs>

      <circle
        cx="110"
        cy="110"
        r="104"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.9"
      />
      <circle
        cx="110"
        cy="110"
        r="92"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle
        cx="110"
        cy="110"
        r="60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="2 4"
      />

      <text
        fill="currentColor"
        fontSize="12.5"
        letterSpacing="3"
        fontFamily="var(--font-stamp), ui-monospace, monospace"
      >
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          {topText}
        </textPath>
      </text>

      <text
        fill="currentColor"
        fontSize="11"
        letterSpacing="3"
        fontFamily="var(--font-stamp), ui-monospace, monospace"
      >
        <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
          {bottomText}
        </textPath>
      </text>

      <text
        x="110"
        y="103"
        textAnchor="middle"
        fill="currentColor"
        fontSize="34"
        fontFamily="var(--font-display), Georgia, serif"
      >
        {initials}
      </text>
      <line x1="80" y1="118" x2="140" y2="118" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <text
        x="110"
        y="132"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8.5"
        letterSpacing="2"
        fontFamily="var(--font-stamp), ui-monospace, monospace"
      >
        EST.
      </text>
    </svg>
  );
}
