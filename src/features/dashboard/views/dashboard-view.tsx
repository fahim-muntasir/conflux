import { HeroPattern } from "@/features/dashboard/components/hero-pattern";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { TextInputPanel } from "@/features/dashboard/components/text-input-panel";
import { QuickActionsPanel } from "@/features/dashboard/components/quick-actions-panel";

export function DashboardView() {
  return (
    <div className="relative">
      <HeroPattern />
      <div className="relative mx-auto w-full max-w-5xl space-y-8 p-4 lg:px-10 lg:py-12">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
};