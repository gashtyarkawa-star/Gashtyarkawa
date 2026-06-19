"use client";

import { motion } from "framer-motion";
import { site } from "@/config/site";

// Platform links styled as cassette-deck / VCR buttons.
export default function ListenSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24" aria-label="Listen">
      <motion.h2
        className="font-display mb-10 text-3xl uppercase tracking-[0.3em] text-neon-cyan neon-cyan"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ◼ TUNE IN
      </motion.h2>

      <div className="flex flex-wrap gap-4">
        {site.platforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="vcr-btn glitch-hover focus-ring px-5 py-3 font-display text-lg tracking-[0.15em]"
            style={{ borderRadius: 0 }}
          >
            <span className="neon-green">►</span> {p.name.toUpperCase()}
          </a>
        ))}
      </div>
    </section>
  );
}
