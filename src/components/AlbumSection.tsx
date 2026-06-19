"use client";

import { motion, useReducedMotion } from "framer-motion";
import VHSImage from "./VHSImage";
import { site } from "@/config/site";

// Bayat Dorian album reveal, styled as a VHS tape / vinyl sleeve.
export default function AlbumSection() {
  const reduced = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: reduced ? 0 : 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="album"
      className="relative flex min-h-screen items-center justify-center px-6 py-32"
      aria-label="Bayat Dorian album"
    >
      <motion.div
        className="flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:items-stretch"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {/* VHS tape / sleeve */}
        <motion.div
          variants={reveal}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative w-full max-w-sm shrink-0 border border-vhs-orange/60 bg-black/40 p-3"
          style={{ boxShadow: "0 0 20px rgba(255,107,0,0.25)" }}
        >
          <VHSImage
            src={site.images.album}
            alt="Bayat Dorian album cover"
            aberration
            className="aspect-square w-full"
          />
          {/* tape label strip */}
          <div className="mt-3 flex items-center justify-between border-t border-paper/20 pt-2 font-terminal text-[10px] uppercase tracking-[0.2em] text-paper/60">
            <span>VHS · STEREO</span>
            <span className="neon-orange">NTSC</span>
          </div>
        </motion.div>

        {/* details */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <motion.h2
            variants={reveal}
            transition={{ duration: 0.9, ease: "easeOut" }}
            dir="rtl"
            lang="ku"
            className="neon-pink text-5xl font-bold leading-tight sm:text-7xl"
          >
            {site.album.kurdishTitle}
          </motion.h2>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-display mt-4 text-3xl tracking-[0.1em] text-neon-cyan sm:text-5xl"
          >
            {site.album.latinTitle}
          </motion.p>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-display blink mt-6 text-2xl uppercase tracking-[0.3em] text-neon-yellow"
          >
            ▶ COMING SOON
          </motion.p>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mt-6 font-terminal text-sm italic text-paper/60"
          >
            {site.album.note}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
