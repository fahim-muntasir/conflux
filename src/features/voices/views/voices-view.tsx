"use client";

import { Plus } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQueryState } from "nuqs";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { VoiceCreateDialog } from "../components/voice-create-dialog";
import { VoicesList } from "../components/voices-list";
import { voicesSearchParams } from "../lib/params";
import { VoicesToolbar } from "../components/voices-toolbar";

function VoicesContent() {
  const trpc = useTRPC();
  const [query] = useQueryState(
    "query",
    voicesSearchParams.query
  );
  const { data } = useSuspenseQuery(
    trpc.voices.getAll.queryOptions({ query })
  );

  return (
    <>
      <VoicesList
        title="Team Voices"
        voices={data.custom}
        query={query}
        action={
          <VoiceCreateDialog>
            <Button size="sm">
              <Plus />
              Create voice
            </Button>
          </VoiceCreateDialog>
        }
      />
      <VoicesList
        title="Built-in Voices"
        voices={data.system}
        query={query}
      />
    </>
  );
};

export function VoicesView() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl space-y-10 p-4 lg:p-8">
        <VoicesToolbar />
        <VoicesContent />
      </div>
    </div>
  );
};