// All invitation details live here. Times carry the +05:30 (IST) offset.
export const WEDDING_TIME_ZONE = "Asia/Kolkata";

export const couple = {
  groom: "Vishal",
  bride: "Chhaya",
  hashtag: "#VishalWedsChhaya",
};

export const weddingDateTime = "2026-12-30T10:30:00+05:30";

export type Celebration = {
  name: string;
  tagline: string;
  start: string;
  dressCode: string;
};

export const celebrations: Celebration[] = [
  {
    name: "Mehendi",
    tagline: "Henna, music & marigolds",
    start: "2026-12-28T16:00:00+05:30",
    dressCode: "Shades of green & floral prints",
  },
  {
    name: "Engagement",
    tagline: "The exchange of rings",
    start: "2026-12-28T19:30:00+05:30",
    dressCode: "Elegant pastels",
  },
  {
    name: "Haldi",
    tagline: "An afternoon bathed in turmeric",
    start: "2026-12-29T16:00:00+05:30",
    dressCode: "Sunshine yellow",
  },
  {
    name: "Sangeet",
    tagline: "An evening of song & dance",
    start: "2026-12-29T19:00:00+05:30",
    dressCode: "Glamorous Indo-western",
  },
  {
    name: "Wedding & Pheras",
    tagline: "Seven sacred vows around the holy fire",
    start: weddingDateTime,
    dressCode: "Royal traditional — reds & golds",
  },
];

export const venue = {
  name: "Laxmi Lawns",
  address: "Kharde Bk, Maharashtra 425405",
};

export function mapsUrl(name: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: WEDDING_TIME_ZONE,
  }).format(new Date(iso));
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: WEDDING_TIME_ZONE,
  })
    .format(new Date(iso))
    .toUpperCase();
}

export function dateParts(iso: string) {
  const d = new Date(iso);
  const part = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-IN", { ...opts, timeZone: WEDDING_TIME_ZONE }).format(d);
  return {
    weekday: part({ weekday: "long" }),
    day: part({ day: "2-digit" }),
    month: part({ month: "long" }),
    year: part({ year: "numeric" }),
  };
}
