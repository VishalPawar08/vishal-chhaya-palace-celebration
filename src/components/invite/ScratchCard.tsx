import { useCallback, useEffect, useRef, useState } from "react";

import { dateParts, formatTime } from "@/lib/wedding";
import { cn } from "@/lib/utils";

const REVEAL_AT = 0.45;

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function ScratchCard({ iso }: { iso: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const started = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const parts = dateParts(iso);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, cssVar("--gold-deep"));
    grad.addColorStop(0.3, cssVar("--gold"));
    grad.addColorStop(0.5, cssVar("--gold-light"));
    grad.addColorStop(0.7, cssVar("--gold"));
    grad.addColorStop(1, cssVar("--gold-deep"));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Foil sparkle
    ctx.fillStyle = cssVar("--ivory");
    for (let i = 0; i < 220; i++) {
      ctx.globalAlpha = Math.random() * 0.5;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4);
    }
    ctx.globalAlpha = 1;

    // Inner border
    ctx.strokeStyle = cssVar("--maroon-deep");
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.globalAlpha = 1;

    ctx.fillStyle = cssVar("--maroon-deep");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${Math.round(w / 13)}px Cinzel, serif`;
    ctx.fillText("SCRATCH HERE", w / 2, h / 2 - 12);
    ctx.font = `italic ${Math.round(w / 18)}px "Cormorant Garamond", serif`;
    ctx.fillText("to reveal our date", w / 2, h / 2 + 22);
  }, []);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && paint());
    paint();
    const onResize = () => {
      if (!started.current) paint();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, [paint]);

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 46;
    ctx.beginPath();
    const from = last.current ?? { x, y };
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x + 0.01, y + 0.01);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    last.current = { x, y };
  };

  const checkCleared = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++;
      if ((data[i] ?? 255) < 40) clear++;
    }
    if (total && clear / total > REVEAL_AT) setRevealed(true);
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        ref={wrapRef}
        className="royal-card relative aspect-[4/3] w-full overflow-hidden"
      >
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center text-center transition-transform duration-700",
            revealed ? "scale-100" : "scale-95",
          )}
        >
          <p className="eyebrow">{parts.weekday}</p>
          <p className="text-gold-gradient mt-2 font-display text-7xl font-semibold leading-none">
            {parts.day}
          </p>
          <p className="mt-2 font-display text-2xl tracking-[0.2em] text-primary uppercase">
            {parts.month}
          </p>
          <p className="font-display text-lg tracking-[0.4em] text-gold-deep">{parts.year}</p>
          <p className="mt-2 font-script text-lg italic text-muted-foreground">
            at {formatTime(iso)}
          </p>
        </div>

        <canvas
          ref={canvasRef}
          aria-label="Scratch card hiding the wedding date. Scratch with your finger to reveal it."
          role="img"
          className={cn(
            "absolute inset-0 h-full w-full cursor-pointer touch-none rounded-[inherit] transition-opacity duration-700",
            revealed && "pointer-events-none opacity-0",
          )}
          onPointerDown={(e) => {
            drawing.current = true;
            started.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            last.current = null;
            const p = pos(e);
            scratch(p.x, p.y);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const p = pos(e);
            scratch(p.x, p.y);
          }}
          onPointerUp={() => {
            drawing.current = false;
            last.current = null;
            checkCleared();
          }}
          onPointerCancel={() => {
            drawing.current = false;
            last.current = null;
          }}
        />
      </div>
      <p
        className={cn(
          "mt-5 text-center font-script text-lg italic text-muted-foreground transition-opacity duration-500",
          revealed && "opacity-0",
        )}
      >
        Use your finger to scratch the gold
      </p>
    </div>
  );
}
