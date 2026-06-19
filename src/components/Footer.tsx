import { site } from "@/config/site";

const footerPlatforms = ["Spotify", "Apple Music", "Deezer", "YouTube"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto w-full max-w-4xl px-6 py-16 font-terminal text-sm text-paper/70">
      {/* VHS transport controls */}
      <div className="mb-6 flex items-center gap-4 font-display text-xl tracking-[0.2em] text-neon-cyan">
        <span aria-hidden="true">◄◄ REW</span>
        <span aria-hidden="true" className="text-paper/30">|</span>
        <span aria-hidden="true" className="neon-green">► PLAY</span>
        <span aria-hidden="true" className="text-paper/30">|</span>
        <span aria-hidden="true">■ STOP</span>
      </div>

      <p className="font-display text-2xl tracking-[0.15em] text-neon-pink neon-pink">
        {site.name}
      </p>
      <p className="mt-2 tracking-[0.2em]">© {year}</p>

      <p className="mt-4 flex flex-wrap gap-x-3">
        {footerPlatforms.map((name, i) => {
          const p = site.platforms.find((x) => x.name === name);
          return (
            <span key={name} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" className="text-paper/30">·</span>}
              {p ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glitch-hover focus-ring transition-colors hover:text-neon-cyan"
                >
                  {name}
                </a>
              ) : (
                name
              )}
            </span>
          );
        })}
      </p>
    </footer>
  );
}
