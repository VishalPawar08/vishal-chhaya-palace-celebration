import { useEffect, useState } from "react";

import { getTimeLeft, type TimeLeft } from "@/lib/countdown";

const UNITS: { key: keyof Omit<TimeLeft, "done">; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function Countdown({ iso }: { iso: string }) {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(iso);
    const tick = () => setLeft(getTimeLeft(target, new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);

  if (left?.done) {
    return (
      <p className="text-center font-script text-3xl italic text-primary">
        The celebrations have begun!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="royal-card flex flex-col items-center px-1 py-5">
          <span className="text-gold-gradient font-display text-3xl font-semibold tabular-nums sm:text-5xl">
            {left ? String(left[key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-2 font-display text-[0.6rem] tracking-[0.2em] text-primary uppercase sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
