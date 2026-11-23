import { Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";

export function MusicToggle({
  muted,
  onToggle,
  visible,
}: {
  muted: boolean;
  onToggle: () => void;
  visible: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Play music" : "Mute music"}
      className={cn(
        "fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-card/80 text-primary shadow-gold backdrop-blur-md transition-all duration-700 active:scale-95",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        !muted && "glow-pulse",
      )}
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  );
}
