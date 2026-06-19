"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { site, type Track } from "@/config/site";

function PlatformLinks({ track }: { track: Track }) {
  return (
    <span className="flex items-center gap-4 text-xs tracking-[0.2em] text-silver">
      {track.spotify && (
        <a
          href={track.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-line focus-ring transition-colors hover:text-cyan"
        >
          Spotify
        </a>
      )}
      {track.youtube && (
        <a
          href={track.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-line focus-ring transition-colors hover:text-cyan"
        >
          YouTube
        </a>
      )}
    </span>
  );
}

function TrackRow({ track, primary }: { track: Track; primary: boolean }) {
  const [hover, setHover] = useState(false);
  const reduced = useReducedMotion();

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative border-b border-white/5 py-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          {/* extending line on hover */}
          <motion.span
            aria-hidden="true"
            className="block h-px bg-cyan"
            initial={false}
            animate={{ width: hover && !reduced ? 36 : 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className={`${
              primary ? "text-2xl sm:text-4xl" : "text-lg sm:text-2xl"
            } font-medium tracking-tight transition-colors group-hover:text-cyan`}
            initial={false}
            animate={{ x: hover && !reduced ? 6 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {track.title}
          </motion.span>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: hover || reduced ? 1 : 0.35, x: hover && !reduced ? 0 : 8 }}
          transition={{ duration: 0.4 }}
        >
          <PlatformLinks track={track} />
        </motion.div>
      </div>
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
        className="mb-12 text-sm uppercase tracking-[0.4em] text-silver"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Music
      </motion.h2>

      <ul>
        {primary.map((t) => (
          <TrackRow key={t.title} track={t} primary />
        ))}
      </ul>

      <div className="mt-10">
        <button
          type="button"
          onClick={() => setShowMore((s) => !s)}
          aria-expanded={showMore}
          className="hover-line focus-ring text-xs uppercase tracking-[0.35em] text-silver transition-colors hover:text-cyan"
        >
          {showMore ? "Less music" : "More music"}
        </button>

        {showMore && (
          <motion.ul
            className="mt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            {secondary.map((t) => (
              <TrackRow key={t.title} track={t} primary={false} />
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
