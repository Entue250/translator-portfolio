"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type GlossPair = {
  source: string;
  sourceLang: string;
  target: string;
  targetLang: string;
};

const DEFAULT_PAIRS: GlossPair[] = [
  { source: "La traduction n'est jamais une simple substitution.", sourceLang: "FR", target: "Translation is never a simple substitution.", targetLang: "EN" },
  { source: "Icyo umuntu avuga si icyo bumva bose.", sourceLang: "RW", target: "What is said is not always what is heard.", targetLang: "EN" },
  { source: "Kila neno lina uzito wake.", sourceLang: "SW", target: "Every word carries its own weight.", targetLang: "EN" },
];

export function InterlinearGloss({
  pairs = DEFAULT_PAIRS,
  intervalMs = 4200,
}: {
  pairs?: GlossPair[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const list = pairs.length ? pairs : DEFAULT_PAIRS;

  useEffect(() => {
    if (list.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), intervalMs);
    return () => clearInterval(id);
  }, [list.length, intervalMs]);

  const pair = list[index];

  return (
    <div className="font-display" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-baseline gap-3">
            <span className="font-stamp text-[10px] text-seal-gold-bright/80 shrink-0">
              {pair.sourceLang}
            </span>
            <p className="text-lg sm:text-xl text-text-mid italic leading-snug">
              {pair.source}
            </p>
          </div>
          <div className="flex items-baseline gap-3 mt-2 pl-0">
            <span className="font-stamp text-[10px] text-stamp-green-bright/90 shrink-0">
              {pair.targetLang}
            </span>
            <p className="text-xl sm:text-2xl text-text-hi leading-snug">
              {pair.target}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
