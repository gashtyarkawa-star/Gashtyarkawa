"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { site } from "@/config/site";

const links = [
  { label: "WORLD", href: "#world" },
  { label: "MUSIC", href: "#music" },
  { label: site.album.kurdishTitle, href: "#album", rtl: true },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

// VHS / CRT UI overlay bar. Fixed top, scanline background, neon underline.
export default function Nav() {
  const { soundEnabled, toggleSound } = useAudio();

  return (
    <motion.nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-40 border-b border-neon-cyan/40"
      style={{
        background: "rgba(10,7,5,0.78)",
        backdropFilter: "blur(2px)",
        boxShadow: "0 0 10px rgba(0,245,212,0.25)",
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <span className="font-display neon-green text-lg tracking-[0.15em]">
          ◈ GASHTYAR KAWA
        </span>

        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 font-terminal text-xs tracking-[0.15em] sm:text-sm">
          {links.map((l, i) => (
            <li key={l.label} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-paper/30">
                  |
                </span>
              )}
              <a
                href={l.href}
                className="glitch-hover focus-ring text-paper/80 transition-colors hover:text-neon-cyan"
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
          className="vcr-btn focus-ring px-3 py-1 text-xs tracking-[0.15em]"
          style={{ borderRadius: 0 }}
        >
          [SOUND: {soundEnabled ? "ON" : "OFF"}]
        </button>
      </div>
    </motion.nav>
  );
}
