import { cn } from "@/lib/utils";

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function getWaveformHeights(seed: string, count: number) {
  let s = hash(seed) || 1;
  return Array.from({ length: count }, (_, i) => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const r = s / 0xffffffff;
    const envelope = 0.45 + 0.55 * Math.sin((Math.PI * (i + 0.5)) / count);
    return Math.round(18 + r * 82 * envelope);
  });
}

/** Decorative, deterministic waveform. Give it a height via className (e.g. "h-8"). */
export function WaveformBars({
  seed,
  count = 32,
  active = false,
  className,
  barClassName,
}: {
  seed: string;
  count?: number;
  active?: boolean;
  className?: string;
  barClassName?: string;
}) {
  const heights = getWaveformHeights(seed, count);

  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-between", className)}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-0.75 shrink-0 rounded-full bg-muted-foreground/30 transition-colors",
            active && "bg-primary",
            barClassName,
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}