import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc, HydrateClient, prefetch } from "@/trpc/server";
import { HealthCheck } from "./health-check";

export default function TestPage() {
  prefetch(trpc.health.queryOptions());

  return (
    <HydrateClient>
      <div>
        <h1>Test Page</h1>
        <ErrorBoundary fallback={<div>Error occurred while fetching health status.</div>}>
          <Suspense fallback={<div>Loading health status...</div>}>
            <HealthCheck />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
}