"use client";

import { useState } from "react";
import { Pause, Play, Download, Redo, Undo } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

import { useWaveSurfer } from "../hooks/use-wavesurfer";

type VoicePreviewPanelVoice = {
  id?: string;
  name: string;
};

function formatTime(seconds: number): string {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export function VoicePreviewPanel({
  audioUrl,
  voice,
  text,
}: {
  audioUrl: string;
  voice: VoicePreviewPanelVoice | null;
  text: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceSeed = voice?.id ?? null;

  const {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    togglePlayPause,
    seekBackward,
    seekForward,
  } = useWaveSurfer({
    url: audioUrl,
    autoplay: true,
  });

  const handleDownload = () => {
    setIsDownloading(true);

    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <section
      aria-label="Voice preview"
      className="@container hidden shrink-0 flex-col border-t bg-card/30 lg:flex"
    >
      {/* Header */}
      <div className="flex min-w-0 items-center justify-between gap-3 border-b px-4 py-3 @lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {selectedVoiceName && (
            <VoiceAvatar
              seed={selectedVoiceSeed ?? selectedVoiceName}
              name={selectedVoiceName}
              className="size-9 shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {selectedVoiceName ?? "Voice preview"}
            </p>
            <p className="truncate text-xs text-muted-foreground">{text}</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={isDownloading}
          className="shrink-0"
        >
          {isDownloading ? (
            <Spinner className="size-4" />
          ) : (
            <Download className="size-4" />
          )}
          <span className="hidden @sm:inline">Download</span>
        </Button>
      </div>

      {/* Waveform stage: fixed height so the waveform always has room */}
      <div className="relative h-24 shrink-0 px-4 py-3 @lg:px-6">
        {!isReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Badge
              variant="outline"
              className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-muted-foreground shadow-sm"
            >
              <Spinner className="size-4" />
              <span>Loading audio...</span>
            </Badge>
          </div>
        )}
        <div
          ref={containerRef}
          className={cn(
            "h-full w-full cursor-pointer overflow-hidden transition-opacity duration-200",
            !isReady && "opacity-0",
          )}
        />
      </div>

      {/* Transport: stacked when narrow, 3 columns when there is room */}
      <div className="flex flex-col items-center gap-2 border-t px-4 py-3 @lg:grid @lg:grid-cols-[1fr_auto_1fr] @lg:gap-3 @lg:px-6">
        <p className="font-mono text-xs tabular-nums text-foreground @lg:justify-self-start @lg:text-sm">
          {formatTime(currentTime)}
          <span className="text-muted-foreground">
            &nbsp;/&nbsp;{formatTime(duration)}
          </span>
        </p>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon-lg"
            className="flex-col gap-0"
            onClick={() => seekBackward(10)}
            disabled={!isReady}
            aria-label="Back 10 seconds"
          >
            <Undo className="size-4" />
            <span className="text-[10px] font-medium">10</span>
          </Button>

          <Button
            variant="default"
            size="icon-lg"
            className="rounded-full"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="fill-current" />
            ) : (
              <Play className="fill-current" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon-lg"
            className="flex-col gap-0"
            onClick={() => seekForward(10)}
            disabled={!isReady}
            aria-label="Forward 10 seconds"
          >
            <Redo className="size-4" />
            <span className="text-[10px] font-medium">10</span>
          </Button>
        </div>

        <div className="hidden @lg:block" />
      </div>
    </section>
  );
};