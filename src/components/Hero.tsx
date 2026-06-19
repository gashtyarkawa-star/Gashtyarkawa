"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import ParticleField from "./ParticleField";
import { site } from "@/config/site";

// Hero with moving abstract background. Uses the artist image if it loads,
// otherwise stays purely abstract.
export default function Hero() {
  const reduced = useReducedMotion();
  const [hasImage, setHasImage] = useState(false);

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
      <ParticleField intensity={0.9} />

      {/* hidden probe image: if it loads, fade it in as a diffuse backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.artistImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onLoad={() => setHasImage(true)}
        onError={() => setHasImage(false)}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          hasImage ? "opacity-25" : "opacity-0"
        }`}
        style={{ mixBlendMode: "screen" }}
      />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,transparent_30%,#070A12_92%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          className="text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          GASHTYAR KAWA
        </motion.h1>

        <motion.p
          className="mt-6 text-sm tracking-[0.3em] text-silver sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {site.role}
        </motion.p>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-base text-foreground/70 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {site.tagline}
        </motion.p>

        <motion.button
          type="button"
          onClick={scrollToScale}
          className="focus-ring mt-12 rounded-full border border-silver/40 px-8 py-4 text-xs tracking-[0.4em] text-foreground/90 transition-colors hover:border-cyan hover:text-cyan"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          EXPLORE THE SOUND
        </motion.button>
      </div>
    </section>
  );
}
