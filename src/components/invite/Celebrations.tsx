import { CalendarDays, Clock, Flame, Gem, Hand, Music, Shirt, Sparkles, Sun } from "lucide-react";

import { Reveal } from "@/components/invite/Reveal";
import { celebrations, formatDate, formatTime } from "@/lib/wedding";

const ICONS: Record<string, typeof Sun> = {
  Mehendi: Hand,
  Haldi: Sun,
  Sangeet: Music,
  Engagement: Gem,
  "Wedding & Pheras": Flame,
};

export function Celebrations() {
  return (
    <div className="space-y-6">
      {celebrations.map((event, i) => {
        const Icon = ICONS[event.name] ?? Sparkles;
        return (
          <Reveal key={event.name} delay={i * 80}>
            <article className="royal-card px-6 py-8 text-center">
              <div className="bg-gold-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-full text-maroon-deep shadow-gold">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-wider text-primary">
                {event.name}
              </h3>
              <p className="font-script text-lg italic text-muted-foreground">{event.tagline}</p>
              <div className="mx-auto my-5 h-px w-24 bg-gold-gradient" />
              <dl className="space-y-3 text-left text-base sm:mx-auto sm:max-w-xs">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  <dt className="sr-only">Date</dt>
                  <dd>{formatDate(event.start)}</dd>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  <dt className="sr-only">Time</dt>
                  <dd>{formatTime(event.start)} onwards</dd>
                </div>
                <div className="flex items-start gap-3">
                  <Shirt className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  <dt className="sr-only">Dress code</dt>
                  <dd>
                    <span className="font-display text-xs tracking-[0.15em] text-primary uppercase">
                      Dress code ·{" "}
                    </span>
                    {event.dressCode}
                  </dd>
                </div>
              </dl>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
