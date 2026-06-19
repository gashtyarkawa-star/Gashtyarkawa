# Gashtyar Kawa

Immersive artist website for **Gashtyar Kawa** — Kurdish setar player, composer and microtonal explorer.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and Canvas 2D.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All copy, track links and platform links live in [`src/config/site.ts`](src/config/site.ts).

## Assets

Replace the placeholder files with real media:

- `public/audio/intro.mp3` — intro sound played on entry (placeholder is empty)
- `public/audio/click.mp3` — note click sound on the scale sculpture (placeholder is empty)
- `public/images/artist.jpg` — optional. If present it is used as a diffuse hero backdrop; otherwise the hero stays purely abstract.

If an audio file is missing or cannot decode, playback fails silently — the rest of the site keeps working.

## Highlights

- **Entry screen** — animated particle/smoke background + "ENTER THE WORLD"; dissolves into an expanding wave.
- **Interactive Bayat Dorian scale sculpture** — a breathing luminous wave with 8 glowing notes, cursor/touch ripples, hover halos, click shockwaves, scroll-reveal, and special "Bayat color" / "Dorian lift" / final-dissolve moments. Falls back to a static labeled version when `prefers-reduced-motion` is set.
- **Kinetic music list**, scroll-revealed about, subtle platform links, contact and footer.

Accessibility: semantic HTML, ARIA labels for audio controls and the scale, RTL Kurdish text (`dir="rtl" lang="ku"`), reduced-motion support, all external links `target="_blank" rel="noopener noreferrer"`.
