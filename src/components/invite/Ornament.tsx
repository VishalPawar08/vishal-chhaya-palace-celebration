import { cn } from "@/lib/utils";

export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      aria-hidden="true"
      className={cn("mx-auto h-6 w-48 text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M2 12 H88" />
      <path d="M152 12 H238" />
      <path d="M88 12 C96 4, 104 4, 108 12 C104 20, 96 20, 88 12 Z" />
      <path d="M152 12 C144 4, 136 4, 132 12 C136 20, 144 20, 152 12 Z" />
      <path d="M120 2 L128 12 L120 22 L112 12 Z" fill="currentColor" fillOpacity="0.35" />
      <circle cx="120" cy="12" r="2" fill="currentColor" />
      <circle cx="70" cy="12" r="1.6" fill="currentColor" />
      <circle cx="170" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
        {title}
      </h2>
      <Ornament className="mt-4" />
    </div>
  );
}
