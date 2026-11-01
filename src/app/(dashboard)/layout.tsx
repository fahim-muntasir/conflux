import { cookies } from "next/headers";

import { AppFooter } from "@/components/app-footer";
import { AppNavbar } from "@/components/app-navbar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0 overflow-hidden">
        <AppNavbar />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {children}
        </div>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
};