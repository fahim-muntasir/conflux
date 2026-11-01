import Link from "next/link";
import { BookOpen, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WaveformBars } from "@/components/waveform-bars";

export function VoicePreviewPlaceholder() {
  return (
    <div className="hidden h-full flex-1 flex-col items-center justify-center gap-6 border-t bg-card/30 p-6 lg:flex">
      <div className="w-full max-w-md space-y-6">
        {/* Ghost player */}
        <div
          aria-hidden
          className="rounded-lg border border-dashed bg-background/60 p-4"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-muted">
              <Play className="size-4 text-muted-foreground" />
            </span>
            <WaveformBars
              seed="conflux-preview-placeholder"
              count={48}
              className="h-10 min-w-0 flex-1 opacity-60"
            />
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
              00:00
            </span>
          </div>
        </div>

        <div className="space-y-1.5 text-center">
          <p className="text-base font-semibold tracking-tight text-foreground">
            Your audio will appear here
          </p>
          <p className="mx-auto max-w-xs text-sm text-muted-foreground">
            Write your script, pick a voice, and generate. The waveform and
            player show up here.
          </p>
        </div>
      </div>

      <Button variant="outline" size="sm" asChild>
        <Link href="mailto:fahimmuntasir0909@gmail.com">
          <BookOpen />
          Don&apos;t know how?
        </Link>
      </Button>
    </div>
  );
};