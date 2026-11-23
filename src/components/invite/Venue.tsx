import { MapPin, Navigation } from "lucide-react";

import { Ornament } from "@/components/invite/Ornament";
import { Reveal } from "@/components/invite/Reveal";
import { Button } from "@/components/ui/button";
import { mapsUrl, venue } from "@/lib/wedding";

export function Venue() {
  return (
    <section id="venue" className="bg-maroon-gradient px-5 py-20 text-primary-foreground">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="eyebrow text-gold-light">The Venue</p>
        <MapPin className="mx-auto mt-6 h-9 w-9 text-gold" />
        <h2 className="text-gold-gradient mt-4 font-display text-3xl font-semibold sm:text-4xl">
          {venue.name}
        </h2>
        <Ornament className="mt-4 text-gold" />
        <p className="mx-auto mt-5 max-w-xs font-script text-xl italic text-ivory/85">
          {venue.address}
        </p>
        <Button asChild variant="gold" size="xl" className="mt-8">
          <a href={mapsUrl(venue.name, venue.address)} target="_blank" rel="noopener noreferrer">
            <Navigation />
            Get Directions
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
