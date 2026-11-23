import { ChevronDown } from "lucide-react";

import frame from "@/assets/floral_frame.jpg";
import { Ornament } from "@/components/invite/Ornament";
import { couple } from "@/lib/wedding";
import { cn } from "@/lib/utils";

export function Hero({ entered }: { entered: boolean }) {
  const anim = entered ? "fade-in-slow" : "opacity-0";

  return (
    <section className="flex min-h-[100svh] items-center justify-center px-3 py-6">
      <div className="relative mx-auto aspect-[941/1672] w-full max-w-[min(100%,56svh)]">
        <img
          src={frame}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full rounded-xl object-cover shadow-card"
        />
        <div className="absolute inset-[14%_15%_12%] flex flex-col items-center justify-center text-center">
          <p className={cn(anim, "block")} style={{ animationDelay: "0.2s" }}>
            <span className="font-display text-sm tracking-[0.2em] text-primary">
              ॥ श्री गणेशाय नमः ॥
            </span>
          </p>
          <p className={cn(anim, "eyebrow mt-6")} style={{ animationDelay: "0.5s" }}>
            Together with their families
          </p>

          <h1 className="mt-6 flex flex-col items-center">
            <span
              className={cn(
                anim,
                "text-shimmer font-script text-6xl font-semibold italic leading-tight sm:text-7xl",
              )}
              style={{ animationDelay: "0.8s" }}
            >
              {couple.groom}
            </span>
            <span
              className={cn(anim, "my-1 font-display text-lg tracking-[0.4em] text-primary")}
              style={{ animationDelay: "1.1s" }}
            >
              WEDS
            </span>
            <span
              className={cn(
                anim,
                "text-shimmer font-script text-6xl font-semibold italic leading-tight sm:text-7xl",
              )}
              style={{ animationDelay: "1.4s" }}
            >
              {couple.bride}
            </span>
          </h1>

          <div className={cn(anim, "block")} style={{ animationDelay: "1.7s" }}>
            <Ornament className="mt-6" />
            <p className="mt-4 font-script text-xl italic text-muted-foreground">
              request the honour of your presence
              <br />
              as they begin their forever
            </p>
          </div>

          <a
            href="#save-the-date"
            className={cn(anim, "mt-8 text-gold-deep")}
            style={{ animationDelay: "2.2s" }}
            aria-label="Scroll to save the date"
          >
            <ChevronDown className="float-slow mx-auto h-7 w-7" />
          </a>
        </div>
      </div>
    </section>
  );
}
