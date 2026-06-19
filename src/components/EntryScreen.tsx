"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import ParticleField from "./ParticleField";
import { useAudio } from "@/hooks/useAudio";

// Full-screen entry overlay: only an animated abstract background + ENTER button.
// On enter: play intro sound, dissolve, expanding wave, fade out to reveal site.
export default function EntryScreen({ onEnter }: { onEnter: () => void }) {
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();
  const { playIntro } = useAudio();

  const handleEnter = () => {
    if (exiting) return;
    playIntro();
    setExiting(true);
    // allow the exit animation to play before revealing the site
    window.setTimeout(onEnter, reduced ? 100 : 1400);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: reduced ? 0.1 : 1.2, delay: exiting ? 0.4 : 0 }}
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
          <ParticleField intensity={1.2} />
          {/* soft vignette / blur layer */}
          <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px] [background:radial-gradient(circle_at_center,transparent_40%,#070A12_95%)]" />

          {/* expanding wave on enter */}
          {exiting && !reduced && (
            <motion.div
              className="absolute left-1/2 top-1/2 rounded-full border border-cyan/60"
              initial={{ width: 40, height: 40, x: "-50%", y: "-50%", opacity: 0.9 }}
              animate={{ width: "200vmax", height: "200vmax", opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <AnimatePresence>
              {!exiting && (
                <motion.button
                  type="button"
                  onClick={handleEnter}
                  className="focus-ring group relative rounded-full border border-silver/40 px-10 py-5 text-sm tracking-[0.45em] text-foreground/90 transition-colors hover:border-cyan hover:text-cyan"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.4, filter: "blur(12px)" }
                  }
                  transition={{ duration: reduced ? 0.1 : 0.9, ease: "easeOut" }}
                >
                  ENTER THE WORLD
                </motion.button>
              )}
            </AnimatePresence>
          </div>
    </motion.div>
  );
}
