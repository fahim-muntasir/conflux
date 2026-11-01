import type { LucideIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { WaveformBars } from "@/components/waveform-bars";
import { cn } from "@/lib/utils";

export function StudioEmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Empty className={cn("border bg-card/30", className)}>
      <EmptyHeader>
        <EmptyMedia className="mb-3">
          <div className="flex items-center gap-3">
            <WaveformBars
              seed={`${title}-left`}
              count={8}
              className="h-6 w-14 opacity-60"
            />
            <span className="flex size-12 items-center justify-center rounded-lg border bg-muted">
              <Icon className="size-5 text-muted-foreground" />
            </span>
            <WaveformBars
              seed={`${title}-right`}
              count={8}
              className="h-6 w-14 opacity-60"
            />
          </div>
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  );
}