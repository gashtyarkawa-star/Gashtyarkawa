"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";

// Album reveal. Kurdish title emerges on scroll. No pre-save / countdown / store.
export default function AlbumSection() {
  const reduced = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: reduced ? 0 : 40, filter: reduced ? "none" : "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section
      id="album"
      className="relative flex min-h-screen items-center justify-center px-6 py-32"
      aria-label="Bayat Dorian album"
    >
      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h2
          variants={reveal}
          transition={{ duration: 1, ease: "easeOut" }}
          dir="rtl"
          lang="ku"
          className="bg-gradient-to-b from-cyan to-cobalt bg-clip-text text-6xl font-semibold leading-tight text-transparent sm:text-8xl md:text-9xl"
        >
          {site.album.kurdishTitle}
        </motion.h2>

        <motion.p
          variants={reveal}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-6 text-2xl tracking-[0.2em] text-foreground sm:text-3xl"
        >
          {site.album.latinTitle}
        </motion.p>

        <motion.p
          variants={reveal}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-8 text-sm uppercase tracking-[0.45em] text-silver"
        >
          {site.album.status}
        </motion.p>

        <motion.p
          variants={reveal}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-6 text-base italic text-foreground/60"
        >
          {site.album.note}
        </motion.p>
      </motion.div>
    </section>
  );
}
