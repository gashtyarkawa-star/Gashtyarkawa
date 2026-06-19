// Central content + configuration for the Gashtyar Kawa website.
// Edit this file to change copy, links, and asset paths.

export const palette = {
  background: "#070A12",
  navy: "#0E1730",
  text: "#F0F2F5",
  cobalt: "#2D5BFF",
  cyan: "#7BE7FF",
  violet: "#4B2A7D",
  silver: "#BFC8D6",
} as const;

export type Track = {
  title: string;
  primary: boolean;
  spotify?: string;
  youtube?: string;
};

export const site = {
  name: "Gashtyar Kawa",
  role: "Setar player · Composer · Microtonal explorer",
  tagline: "Between memory, movement, and new sound.",
  contactEmail: "Gashtyarkawa@gmail.com",

  album: {
    kurdishTitle: "بەیات دۆریان",
    latinTitle: "Bayat Dorian",
    status: "Coming soon",
    note: "A sound between memory and movement.",
  },

  bio: [
    "I am a Kurdish musician, setar player, and composer from Sulaymaniyah, Kurdistan, now based in Freiburg, Germany.",
    "I started playing setar at 12 and released my first original compositions in 2020.",
    "My music sits between Kurdish tradition, synthwave, and indie — and lately I have been pushing deeper into microtonal territory, developing original scales that bridge Eastern musical heritage with contemporary sound.",
  ],

  // The Bayat Dorian scale: C — D half-flat — E♭ — F — G — A — B♭ — C
  scale: [
    { label: "C", special: null },
    { label: "D half-flat", special: "bayat" },
    { label: "E♭", special: null },
    { label: "F", special: null },
    { label: "G", special: null },
    { label: "A", special: "dorian" },
    { label: "B♭", special: null },
    { label: "C", special: "final" },
  ] as { label: string; special: "bayat" | "dorian" | "final" | null }[],

  tracks: [
    { title: "Parwanatm", primary: true, spotify: "https://open.spotify.com/track/6pYda03KU2X0XvKlVTo1uO", youtube: "https://www.youtube.com/watch?v=DFoTKpC1BHg" },
    { title: "Xweni Alley", primary: true, spotify: "https://open.spotify.com/track/5WqnnGzxH9sKcS52oHNoOr", youtube: "https://www.youtube.com/watch?v=E3F-xsRxcSE" },
    { title: "Qurban", primary: true, spotify: "https://open.spotify.com/track/5RZl0l6v0UPOhLzrNPCHHg", youtube: "https://www.youtube.com/watch?v=0GSqg4vMB5Y" },
    { title: "Yar", primary: true, spotify: "https://open.spotify.com/track/6nf2b9TFcuh697Zzv0YTyF", youtube: "https://www.youtube.com/watch?v=13S-uIV08bM" },
    { title: "Gardoon", primary: true, spotify: "https://open.spotify.com/track/2qhlGT7LRqt3sKxEzFWwS1", youtube: "https://www.youtube.com/watch?v=KgbrrufeqSs" },
    { title: "Yekbun", primary: true, spotify: "https://open.spotify.com/track/1hyYcAzLiQ7DtsmhBHyvrZ", youtube: "https://www.youtube.com/watch?v=EcRcSDQQMl4" },
    { title: "Chan Datrsm", primary: false, spotify: "https://open.spotify.com/track/7kcZzQqBN7xS01yOVdMEwz" },
    { title: "Drkan", primary: false, spotify: "https://open.spotify.com/track/5dsMWQWUdECaxNcdlJPxRd", youtube: "https://www.youtube.com/watch?v=ltcuDOFVfn0" },
    { title: "Noor (feat. Diako Fahmi)", primary: false, spotify: "https://open.spotify.com/track/1DgccCxRI0duSZ33wW6RZf" },
    { title: "Xweni Alley – Slowed & Reverb", primary: false, spotify: "https://open.spotify.com/track/66Cqzu2flDAStbcX74GG8O" },
    { title: "Xweni Alley – Live", primary: false, spotify: "https://open.spotify.com/track/1qa6ENu2PXtWzA6geKbeW5" },
  ] as Track[],

  platforms: [
    { name: "Spotify", url: "https://open.spotify.com/artist/2ryH6tm7yMdWn8M8ir75Uh" },
    { name: "Apple Music", url: "https://music.apple.com/de/artist/gashtyar-kawa/1549295260" },
    { name: "Deezer", url: "https://www.deezer.com/en/artist/120207172" },
    { name: "YouTube", url: "https://www.youtube.com/@gashtyarkawa" },
    { name: "YouTube (Reviews)", url: "https://www.youtube.com/@gashtyarreviews" },
  ],

  // Audio assets. Replace these placeholder files with real audio.
  // Place files at /public/audio/intro.mp3 and /public/audio/click.mp3
  audio: {
    intro: "/audio/intro.mp3",
    click: "/audio/click.mp3",
  },

  // Optional artist image. If /public/images/artist.jpg exists it is used.
  artistImage: "/images/artist.jpg",
} as const;
