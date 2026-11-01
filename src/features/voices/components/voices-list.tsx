import { AudioLines, SearchX } from "lucide-react";

import { StudioEmptyState } from "@/components/studio-empty-state";
import { VoiceCard } from "./voice-card";
import type { VoiceItem } from "./voice-card";

interface VoicesListProps {
  title: string;
  voices: VoiceItem[];
  query?: string | null;
  action?: React.ReactNode;
}

export function VoicesList({
  title,
  voices,
  query,
  action,
}: VoicesListProps) {
  const header = (
    <div className="flex items-baseline gap-2">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <span className="text-xs tabular-nums text-muted-foreground">
        {voices.length}
      </span>
    </div>
  );

  if (!voices.length) {
    return (
      <section className="space-y-4">
        {header}
        {query ? (
          <StudioEmptyState
            icon={SearchX}
            title="No voices found"
            description={`Nothing in ${title.toLowerCase()} matches “${query}”. Try a different name or category.`}
          />
        ) : (
          <StudioEmptyState
            icon={AudioLines}
            title="No voices found"
            description={`${title} will appear here.`}
            action={action}
          />
        )}
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {header}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {voices.map((voice) => (
          <VoiceCard key={voice.id} voice={voice} />
        ))}
      </div>
    </section>
  );
};