"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useSuspenseQueries } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useTRPC } from "@/trpc/client";
import { TextInputPanel } from "@/features/text-to-speech/components/text-input-panel";
import { SettingsPanel } from "@/features/text-to-speech/components/settings-panel";
import {
  TextToSpeechForm,
  type TTSFormValues
} from "@/features/text-to-speech/components/text-to-speech-form";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";
import { VoicePreviewPanel } from "../components/voice-preview-panel";
import { VoicePreviewMobile } from "../components/voice-preview-mobile";

export function TextToSpeechDetailView({
  generationId,
}: {
  generationId: string;
}) {
  const trpc = useTRPC();
  const [ 
    generationQuery,
    voicesQuery,
  ] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions()
    ],
  });

  const data = generationQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;
  const allVoices = [...customVoices, ...systemVoices];

  const fallbackVoiceId = allVoices[0]?.id ?? "";

  // Requested voice may no longer exist (deleted); fall back to first available
  const resolvedVoiceId =
    data?.voiceId &&
    allVoices.some((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: data.text,
    voiceId: resolvedVoiceId,
    temperature: data.temperature,
    topP: data.topP,
    topK: data.topK,
    repetitionPenalty: data.repetitionPenalty,
  };

  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
            {/* Context bar */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-2 lg:px-6">
              <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                <VoiceAvatar
                  seed={generationVoice.id ?? generationVoice.name}
                  name={generationVoice.name}
                  className="size-5 shrink-0"
                />
                <span className="truncate">
                  Generated with{" "}
                  <span className="font-medium text-foreground">
                    {generationVoice.name}
                  </span>
                </span>
              </div>
              <Button variant="outline" size="xs" asChild className="shrink-0">
                <Link href="/text-to-speech">
                  <Plus />
                  New generation
                </Link>
              </Button>
            </div>

            {/* Editor keeps a minimum height; the preview never steals it */}
            <div className="flex min-h-64 flex-1 flex-col">
              <TextInputPanel />
            </div>

            <VoicePreviewMobile
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
            <VoicePreviewPanel
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
};