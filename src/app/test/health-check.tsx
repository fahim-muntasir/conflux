"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function HealthCheck() {
  const trpc = useTRPC();
  const { data} = useSuspenseQuery(trpc.health.queryOptions());

  return (
    <div>
      <h1>Health Check</h1>
      <p>This is a health check component.</p>
      <p>Server Status: {data?.status}</p>
    </div>
  );
}