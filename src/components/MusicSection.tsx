"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { site, type Track } from "@/config/site";

function PlatformLinks({ track }: { track: Track }) {
  return (
    <span className="flex items-center gap-2 font-display text-base tracking-[0.1em]">
      {track.spotify && (
        <a
          href={track.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="vcr-btn glitch-hover focus-ring px-2 py-1"
          style={{ borderRadius: 0 }}
        >
          ► SPT
        </a>
      )}
      {track.youtube && (
        <a
          href={track.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="vcr-btn glitch-hover focus-ring px-2 py-1"
          style={{ borderRadius: 0 }}
        >
          ▶ YT
        </a>
      )}
    </span>
  );
}

function TrackRow({ track, index }: { track: Track; index: number }) {
  const [hover, setHover] = useState(false);
  const reduced = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative flex flex-wrap items-center justify-between gap-3 border-b border-neon-cyan/20 py-4 transition-colors ${
        hover ? "bg-neon-cyan/5" : ""
      } ${hover && !reduced ? "glitch-hover" : ""}`}
    >
      <div className="flex items-center gap-4">
        <span className="font-display neon-green text-2xl tabular-nums">{num}</span>
        <span
          className={`font-display text-2xl tracking-wide transition-colors sm:text-3xl ${
            hover ? "neon-cyan" : "text-paper"
          }`}
        >
          {track.title}
        </span>
      </div>
      <PlatformLinks track={track} />
    </li>
  );
}

export default function MusicSection() {
  const [showMore, setShowMore] = useState(false);
  const primary = site.tracks.filter((t) => t.primary);
  const secondary = site.tracks.filter((t) => !t.primary);

  return (
    <section id="music" className="mx-auto max-w-4xl px-6 py-32" aria-label="Music">
      <motion.h2
        className="font-display mb-10 text-3xl uppercase tracking-[0.3em] text-neon-pink neon-pink"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ◼ MUSIC
      </motion.h2>

      <ul>
        {primary.map((t, i) => (
          <TrackRow key={t.title} track={t} index={i} />
        ))}
      </ul>

      <div className="mt-10">
        <button
          type="button"
          onClick={() => setShowMore((s) => !s)}
          aria-expanded={showMore}
          className="vcr-btn glitch-hover focus-ring px-4 py-2 font-display text-lg tracking-[0.2em]"
          style={{ borderRadius: 0 }}
        >
          {showMore ? "[ − LESS ]" : "[ + LOAD MORE ]"}
        </button>

        {showMore && (
          <motion.ul
            className="mt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            {secondary.map((t, i) => (
              <TrackRow key={t.title} track={t} index={primary.length + i} />
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
