import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      <WavyBackground
        colors={["#8b5cf6", "#6366f1", "#a78bfa", "#7c3aed"]}
        backgroundFill="#09090b"
        blur={6}
        speed="slow"
        waveOpacity={0.06}
        waveWidth={40}
        waveYOffset={250}
        containerClassName="h-full"
        className="hidden"
      />
    </div>
  );
}