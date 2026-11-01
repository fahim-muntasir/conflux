"use client";

import { AudioLines } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function GenerateButton({
  size,
  disabled,
  isSubmitting,
  onSubmit,
  className,
}: {
  size?: "default" | "sm";
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  className?: string;
}) {
  return (
    <Button
      size={size}
      className={className}
      onClick={onSubmit}
      disabled={disabled}
    >
      {isSubmitting ? (
        <>
          <Spinner className="size-3" />
          Generating...
        </>
      ) : (
        <>
          <AudioLines className="size-3.5" />
          Generate speech
        </>
      )}
    </Button>
  );
};