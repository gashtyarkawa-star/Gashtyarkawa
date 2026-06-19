"use client";

import { motion } from "framer-motion";
import { site } from "@/config/site";

// Subtle, integrated platform links — not branded logo buttons.
export default function ListenSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24" aria-label="Listen">
      <motion.h2
        className="mb-10 text-sm uppercase tracking-[0.4em] text-silver"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Listen
      </motion.h2>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        {site.platforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-line focus-ring text-base text-foreground/80 transition-colors hover:text-cyan sm:text-lg"
          >
            {p.name}
          </a>
        ))}
      </div>
    </section>
  );
}
