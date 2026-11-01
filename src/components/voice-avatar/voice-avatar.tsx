"use client";

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useVoiceAvatar } from "./use-voice-avatar";

interface VoiceAvatarProps {
  seed: string;
  name: string;
  className?: string;
};

export function VoiceAvatar({ 
  seed, 
  name, 
  className
}: VoiceAvatarProps) {
  const avatarUrl = useVoiceAvatar(seed);

  return (
    <Avatar
      className={cn(
        "size-4 bg-muted ring-1 ring-white/10",
        className,
      )}
    >
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className="bg-primary/15 text-[8px] font-medium text-primary">
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};