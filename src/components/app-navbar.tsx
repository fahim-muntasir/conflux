"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

type Crumb = { label: string; href?: string };

function getCrumbs(pathname: string): Crumb[] {
  if (pathname.startsWith("/text-to-speech")) {
    const crumbs: Crumb[] = [
      { label: "Text to speech", href: "/text-to-speech" },
    ];
    if (pathname !== "/text-to-speech") crumbs.push({ label: "Generation" });
    return crumbs;
  }
  if (pathname.startsWith("/voices")) return [{ label: "Voices" }];
  return [{ label: "Dashboard" }];
}

export function AppNavbar() {
  const pathname = usePathname();
  const crumbs = getCrumbs(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />

      <Breadcrumb>
        <BreadcrumbList className="gap-1.5 sm:gap-2">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={crumb.label} className="contents">
                <BreadcrumbItem>
                  {isLast || !crumb.href ? (
                    <BreadcrumbPage className="text-sm font-medium tracking-tight">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center">
        <UserButton
          fallback={<Skeleton className="size-8 rounded-full" />}
          appearance={{
            elements: {
              userButtonAvatarBox: "size-8!",
            },
          }}
        />
      </div>
    </header>
  );
}