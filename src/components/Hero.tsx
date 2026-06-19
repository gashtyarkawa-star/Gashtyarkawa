"use client";

import { motion, useReducedMotion } from "framer-motion";
import VHSImage from "./VHSImage";
import { site } from "@/config/site";

// Hero: desaturated artist portrait with VHS chromatic aberration + scanlines,
// massive VT323 title with neon-magenta glow.
export default function Hero() {
  const reduced = useReducedMotion();

  const scrollToScale = () => {
    document.getElementById("scale")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="world"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* background portrait */}
      <div className="absolute inset-0">
        <VHSImage
          src={site.images.portrait}
          alt="Gashtyar Kawa portrait"
          aberration
          className="h-full w-full opacity-60"
        />
      </div>
      {/* gradient to background at bottom */}
      <div className="pointer-events-none absolute inset-0 [background:linear-gradient(to_bottom,rgba(10,7,5,0.55)_0%,rgba(10,7,5,0.2)_40%,#0A0705_100%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          className="font-display neon-pink text-6xl leading-none tracking-tight sm:text-8xl md:text-[10rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          GASHTYAR KAWA
        </motion.h1>

        <motion.p
          className="mt-6 font-terminal text-xs uppercase tracking-[0.3em] text-neon-cyan sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          SETAR PLAYER · COMPOSER · MICROTONAL EXPLORER
        </motion.p>

        <motion.p
          className="mx-auto mt-4 max-w-xl font-terminal text-sm text-paper/70 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {site.tagline}
        </motion.p>

        <motion.button
          type="button"
          onClick={scrollToScale}
          className="font-display glitch-hover focus-ring neon-border-cyan mt-12 px-8 py-3 text-lg tracking-[0.2em] text-neon-cyan"
          style={{ borderRadius: 0 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          [ EXPLORE THE SOUND ]
        </motion.button>
      </div>
    </section>
  );
}
