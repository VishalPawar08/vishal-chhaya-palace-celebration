import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import musicAsset from "@/assets/wedding_instrumental.mp3.asset.json";
import { Celebrations } from "@/components/invite/Celebrations";
import { Countdown } from "@/components/invite/Countdown";
import { Hero } from "@/components/invite/Hero";
import { MusicToggle } from "@/components/invite/MusicToggle";
import { Opening } from "@/components/invite/Opening";
import { Ornament, SectionHeading } from "@/components/invite/Ornament";
import { Reveal } from "@/components/invite/Reveal";
import { Rsvp } from "@/components/invite/Rsvp";
import { ScratchCard } from "@/components/invite/ScratchCard";
import { Venue } from "@/components/invite/Venue";
import { couple, weddingDateTime } from "@/lib/wedding";

const TITLE = `${couple.groom} Weds ${couple.bride} — Wedding Invitation`;
const DESCRIPTION = `You are cordially invited to celebrate the wedding of ${couple.groom} & ${couple.bride}. Save the date, see the celebrations and RSVP.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);

  const startMusic = () => {
    setEntered(true);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.play().catch(() => setMuted(true));
    let v = 0;
    const fade = setInterval(() => {
      v = Math.min(0.45, v + 0.03);
      audio.volume = v;
      if (v >= 0.45) clearInterval(fade);
    }, 150);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      audio.play().catch(() => undefined);
      setMuted(false);
      return;
    }
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <Opening onEnter={startMusic} />
      <audio ref={audioRef} src={musicAsset.url} loop preload="auto" />
      <MusicToggle muted={muted} onToggle={toggleMute} visible={entered} />

      <main className="overflow-x-hidden">
        <Hero entered={entered} />

        <section id="save-the-date" className="px-5 py-20">
          <Reveal className="mx-auto max-w-xl">
            <SectionHeading eyebrow="Mark your calendar" title="Save the Date" />
            <ScratchCard iso={weddingDateTime} />
          </Reveal>
        </section>

        <section className="px-4 py-16">
          <Reveal className="mx-auto max-w-xl">
            <SectionHeading eyebrow="Counting every moment" title="Until We Say I Do" />
            <Countdown iso={weddingDateTime} />
          </Reveal>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-xl">
            <Reveal>
              <SectionHeading eyebrow="Join us for" title="The Celebrations" />
            </Reveal>
            <Celebrations />
          </div>
        </section>

        <Venue />

        <section id="rsvp" className="px-5 py-20">
          <div className="mx-auto max-w-xl">
            <Reveal>
              <SectionHeading eyebrow="Kindly respond" title="RSVP" />
              <p className="-mt-4 mb-8 text-center font-script text-xl italic text-muted-foreground">
                Your presence is the greatest gift we could ask for
              </p>
            </Reveal>
            <Reveal delay={120}>
              <Rsvp />
            </Reveal>
          </div>
        </section>

        <footer className="px-5 pb-16 pt-4 text-center">
          <Ornament />
          <p className="text-shimmer mt-5 font-script text-4xl font-semibold italic">
            {couple.groom} & {couple.bride}
          </p>
          <p className="eyebrow mt-3">{couple.hashtag}</p>
          <p className="mt-4 font-script text-lg italic text-muted-foreground">
            With love & blessings from both families
          </p>
        </footer>
      </main>
    </>
  );
}
