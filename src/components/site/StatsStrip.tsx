import { Container } from "@/components/ui/Container";
import type { Stat } from "@/lib/types";

const RING_COLORS = ["text-seal-gold-bright", "text-stamp-green-bright", "text-seal-gold-bright", "text-stamp-green-bright"];

export function StatsStrip({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;

  return (
    <section className="border-y border-ink-line bg-ink-900/60">
      <Container className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-12">
        {stats.map((stat, i) => (
          <div key={stat.id} className="flex flex-col items-center text-center gap-3">
            <div
              className={`stamp-ring flex h-20 w-20 items-center justify-center ${RING_COLORS[i % RING_COLORS.length]} -rotate-3`}
            >
              <span className="font-display text-xl text-text-hi rotate-3">
                {stat.value}
              </span>
            </div>
            <span className="font-stamp text-[10px] uppercase tracking-[0.16em] text-text-low">
              {stat.label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
