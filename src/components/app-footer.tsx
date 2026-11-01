import Link from "next/link";
import { Headphones, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";

const SUPPORT_EMAIL = "fahimmuntasir0909@gmail.com";

export function AppFooter() {
  return (
    <footer className="flex h-10 shrink-0 items-center justify-between border-t px-4 text-xs text-muted-foreground">
      <span className="hidden sm:inline">Conflux Studio</span>
      <nav className="flex items-center gap-1 sm:ml-auto">
        <Button variant="ghost" size="xs" asChild>
          <Link href={`mailto:${SUPPORT_EMAIL}`}>
            <ThumbsUp />
            Feedback
          </Link>
        </Button>
        <Button variant="ghost" size="xs" asChild>
          <Link href={`mailto:${SUPPORT_EMAIL}`}>
            <Headphones />
            Need help?
          </Link>
        </Button>
      </nav>
    </footer>
  );
}