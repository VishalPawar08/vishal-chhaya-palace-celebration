import { useCallback, useEffect, useRef, useState } from "react";

import videoAsset from "@/assets/palace_doors.mp4.asset.json";
import posterAsset from "@/assets/palace_doors_poster.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Phase = "idle" | "opening" | "fading" | "gone";

const FADE_MS = 1400;

export function Opening({ onEnter }: { onEnter: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  const finish = useCallback(() => {
    setPhase((p) => (p === "opening" ? "fading" : p));
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "gone" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "fading") {
      const t = setTimeout(() => setPhase("gone"), FADE_MS);
      return () => clearTimeout(t);
    }
    if (phase === "opening") {
      // Safety net in case the video never reports its end.
      const t = setTimeout(finish, 11000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, finish]);

  const handleEnter = () => {
    onEnter();
    setPhase("opening");
    const v = videoRef.current;
    if (!v) return finish();
    v.currentTime = 0;
    v.play().catch(() => finish());
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration && v.currentTime >= v.duration - 1.1) finish();
  };

  if (phase === "gone") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-hidden bg-maroon-deep transition-opacity ease-out",
        phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden={phase !== "idle"}
    >
      <video
        ref={videoRef}
        src={videoAsset.url}
        poster={posterAsset.url}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={finish}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-maroon-deep/85 via-maroon-deep/10 to-transparent px-6 pb-[14svh] text-center transition-opacity duration-700",
          phase === "idle" ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <p className="eyebrow fade-in-slow text-gold-light">You are cordially invited</p>
        <p className="fade-in-slow mt-3 font-script text-2xl italic text-ivory/90">
          to a royal celebration of love
        </p>
        <Button
          variant="enter"
          size="xl"
          onClick={handleEnter}
          className="fade-in-slow mt-8"
          style={{ animationDelay: "0.4s" }}
        >
          Tap to Enter
        </Button>
      </div>
    </div>
  );
}
