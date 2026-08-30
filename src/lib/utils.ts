export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

export function formatDateRange(
  start: string,
  end: string | null,
  isCurrent: boolean
) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${fmt(start)} — ${isCurrent ? "Present" : end ? fmt(end) : "—"}`;
}
