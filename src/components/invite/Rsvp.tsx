import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { couple } from "@/lib/wedding";
import { cn } from "@/lib/utils";

export const MAX_GUESTS = 10;

const rsvpSchema = z.object({
  guest_name: z
    .string()
    .trim()
    .min(1, { message: "Please tell us your name" })
    .max(100, { message: "Name must be under 100 characters" }),
  guest_count: z.number().int().min(1).max(MAX_GUESTS),
  attending: z.boolean({ message: "Please let us know if you can attend" }),
});

export function Rsvp() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | boolean>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = rsvpSchema.safeParse({
      guest_name: name,
      guest_count: attending ? guests : 1,
      attending: attending ?? undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setSending(true);
    const { error: dbError } = await supabase.from("rsvps").insert(parsed.data);
    setSending(false);
    if (dbError) {
      setError("We couldn't send your reply. Please try again.");
      return;
    }
    setSent(parsed.data.attending);
  };

  if (sent !== null) {
    return (
      <div className="royal-card animate-in fade-in zoom-in-95 px-6 py-12 text-center duration-700">
        <div className="bg-gold-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-full text-maroon-deep shadow-gold">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-primary">
          {sent ? "We can't wait to see you!" : "You'll be missed"}
        </h3>
        <p className="mt-3 font-script text-xl italic text-muted-foreground">
          {sent
            ? "Thank you for your reply. Your blessings mean the world to us."
            : "Thank you for letting us know. We'll keep you in our hearts on the day."}
        </p>
        <p className="mt-5 font-display text-sm tracking-[0.2em] text-gold-deep">
          {couple.groom} & {couple.bride}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="royal-card space-y-7 px-6 py-9" noValidate>
      <div>
        <label htmlFor="rsvp-name" className="eyebrow block">
          Your name
        </label>
        <Input
          id="rsvp-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          autoComplete="name"
          placeholder="Full name"
          className="mt-3 h-12 rounded-lg border-gold/60 bg-ivory font-serif text-lg"
        />
      </div>

      <fieldset>
        <legend className="eyebrow">Will you attend?</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { value: true, label: "Joyfully accept" },
            { value: false, label: "Regretfully decline" },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              aria-pressed={attending === opt.value}
              onClick={() => setAttending(opt.value)}
              className={cn(
                "rounded-lg border px-3 py-3 font-script text-lg italic transition-all active:scale-[0.98]",
                attending === opt.value
                  ? "bg-maroon-gradient border-gold text-primary-foreground shadow-gold"
                  : "border-gold/50 bg-ivory text-foreground",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div
        className={cn(
          "grid transition-all duration-500",
          attending === false ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
        )}
      >
        <div className="overflow-hidden">
          <p className="eyebrow">Number of guests</p>
          <div className="mt-3 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Fewer guests"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-primary active:scale-95"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span
              className="text-gold-gradient w-12 text-center font-display text-4xl font-semibold"
              aria-live="polite"
            >
              {guests}
            </span>
            <button
              type="button"
              aria-label="More guests"
              onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-primary active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-center text-base text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" variant="royal" size="xl" className="w-full" disabled={sending}>
        {sending ? "Sending…" : "Send RSVP"}
      </Button>
    </form>
  );
}
