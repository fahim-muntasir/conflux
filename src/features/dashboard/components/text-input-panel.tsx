"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HandCoins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { 
  COST_PER_UNIT, 
  TEXT_MAX_LENGTH
} from "@/features/text-to-speech/data/constants";

export function TextInputPanel() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="rounded-lg border bg-card transition-colors focus-within:border-primary/40">
      <div className="p-4">
        <Textarea
          aria-label="Text to convert to speech"
          placeholder="Start typing or paste your text here..."
          className="min-h-35 resize-none border-0 bg-transparent p-0 leading-relaxed shadow-none focus-visible:ring-0 dark:bg-transparent"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={TEXT_MAX_LENGTH}
        />
      </div>

      <div className="flex flex-col gap-3 border-t p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 border-dashed">
            <HandCoins className="size-3 text-chart-5" />
            <span className="text-xs">
              {text.length === 0 ? (
                "Start typing to estimate"
              ) : (
                <>
                  <span className="tabular-nums">
                    ${(text.length * COST_PER_UNIT).toFixed(4)}
                  </span>{" "}
                  estimated
                </>
              )}
            </span>
          </Badge>
          <span className="text-xs tabular-nums text-muted-foreground">
            {text.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()}
          </span>
        </div>

        <Button
          size="sm"
          disabled={!text.trim()}
          onClick={handleGenerate}
          className="w-full sm:w-auto"
        >
          Generate speech
        </Button>
      </div>
    </div>
  );
}