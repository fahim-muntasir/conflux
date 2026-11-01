"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { History } from "lucide-react";

import { StudioEmptyState } from "@/components/studio-empty-state";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

export function SettingsPanelHistory() {
  const trpc = useTRPC();
  const pathname = usePathname();

  const { data: generations } = useSuspenseQuery(
    trpc.generations.getAll.queryOptions(),
  );

  if (!generations.length) {
    return (
      <StudioEmptyState
        icon={History}
        title="No generations yet"
        description="Generate some audio and it will appear here."
        className="border-0 p-8 md:p-8"
      />
    );
  }

  return (
    <div className="flex flex-col gap-1 p-2">
      {generations.map((generation) => {
        const isActive = pathname === `/text-to-speech/${generation.id}`;

        return (
          <Link
            href={`/text-to-speech/${generation.id}`}
            key={generation.id}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md border border-transparent p-3 text-left transition-colors hover:bg-muted",
              isActive && "border-border bg-muted",
            )}
          >
            <VoiceAvatar
              seed={generation.voiceId ?? generation.voiceName}
              name={generation.voiceName}
              className="size-8 shrink-0"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="truncate text-sm font-medium text-foreground">
                {generation.text}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {generation.voiceName}
                <span> &middot; </span>
                {formatDistanceToNow(new Date(generation.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};