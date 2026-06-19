"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { site } from "@/config/site";

const links = [
  { label: "World", href: "#world" },
  { label: "Music", href: "#music" },
  { label: site.album.kurdishTitle, href: "#album", rtl: true },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Visible only after entry. Fixed top, minimal, with a sound toggle.
export default function Nav() {
  const { soundEnabled, toggleSound } = useAudio();

  return (
    <motion.nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-40"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-xs tracking-[0.25em] sm:text-sm">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-silver">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="hover-line focus-ring text-foreground/80 transition-colors hover:text-cyan"
                {...(l.rtl ? { dir: "rtl", lang: "ku" } : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
          title={soundEnabled ? "Sound on" : "Sound off"}
          className="focus-ring ml-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-silver/30 text-foreground/80 transition-colors hover:border-cyan hover:text-cyan"
        >
          <SpeakerIcon enabled={soundEnabled} />
        </button>
      </div>
    </motion.nav>
  );
}

function SpeakerIcon({ enabled }: { enabled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9v6h4l5 4V5L8 9H4z"
        fill="currentColor"
      />
      {enabled ? (
        <>
          <path d="M16 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </>
      ) : (
        <path d="M16 9l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  );
}
