import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { QuickAction } from "@/features/dashboard/data/quick-actions";

type QuickActionCardProps = QuickAction;

export function QuickActionCard({
  title,
  description,
  href,
}: QuickActionCardProps) {
  // Decorative waveform derived from the title (purely visual)
  const bars = Array.from({ length: 18 }, (_, i) => {
    const code = title.charCodeAt(i % title.length);
    return 20 + ((code * (i + 3)) % 70);
  });

  return (
    <div className="group flex gap-4 rounded-lg border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent/40">
      <div
        aria-hidden
        className="flex h-28 w-36 shrink-0 items-center justify-center gap-0.5 rounded-md bg-muted px-3"
      >
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-0.5 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-primary"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="flex min-w-0 flex-col justify-between py-1">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <Button variant="outline" size="xs" className="w-fit" asChild>
          <Link href={href}>
            Try now
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}