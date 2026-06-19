import { site } from "@/config/site";

const footerPlatforms = ["Spotify", "Apple Music", "Deezer", "YouTube"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto w-full max-w-4xl px-6 py-16 text-sm text-silver">
      <p className="text-lg text-foreground">{site.name}</p>
      <p className="mt-2">© {year}</p>
      <p className="mt-4 flex flex-wrap gap-x-3">
        {footerPlatforms.map((name, i) => {
          const p = site.platforms.find((x) => x.name === name);
          return (
            <span key={name} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true">·</span>}
              {p ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-line focus-ring transition-colors hover:text-cyan"
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
