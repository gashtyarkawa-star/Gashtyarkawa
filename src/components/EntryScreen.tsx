"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/hooks/useAudio";

const BOOT_LINES = [
  "LOADING...",
  "SIGNAL DETECTED",
  "GASHTYAR KAWA",
  "INITIALIZING...",
];

// Full-screen CRT boot overlay: green phosphor static warming up, a terminal
// boot sequence, then an [ ENTER THE WORLD ] button. On enter: VHS rewind /
// static flash + horizontal tear, then reveals the site.
export default function EntryScreen({ onEnter }: { onEnter: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const reduced = useReducedMotion();
  const { playIntro } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // green phosphor static (CRT warming up)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 200;
    const H = 120;
    canvas.width = W;
    canvas.height = H;
    let raf = 0;
    const draw = () => {
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 90;
        d[i] = v * 0.2;
        d[i + 1] = v;
        d[i + 2] = v * 0.3;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      if (!reduced) raf = window.setTimeout(() => requestAnimationFrame(draw), 60);
    };
    draw();
    return () => {
      window.clearTimeout(raf);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // boot sequence reveal
  useEffect(() => {
    if (reduced) {
      setBootStep(BOOT_LINES.length);
      return;
    }
    if (bootStep >= BOOT_LINES.length) return;
    const id = window.setTimeout(() => setBootStep((s) => s + 1), 650);
    return () => window.clearTimeout(id);
  }, [bootStep, reduced]);

  const bootDone = bootStep >= BOOT_LINES.length;

  const handleEnter = () => {
    if (exiting) return;
    playIntro();
    setExiting(true);
    window.setTimeout(onEnter, reduced ? 120 : 1300);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: reduced ? 0.1 : 0.9, delay: exiting ? 0.4 : 0 }}
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      {/* phosphor static background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ imageRendering: "pixelated", opacity: 0.35 }}
      />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,transparent_40%,#0A0705_95%)]" />

      {/* VHS rewind: white static flash + horizontal tear lines on exit */}
      {exiting && !reduced && (
        <>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0, 0.5, 0] }}
            transition={{ duration: 0.6, times: [0, 0.1, 0.3, 0.5, 1] }}
          />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-x-0 h-[3px]"
              style={{
                background: i % 2 ? "var(--neon-cyan)" : "var(--neon-pink)",
                animation: `tear-sweep ${0.5 + i * 0.15}s linear ${i * 0.05}s 1`,
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        {/* boot terminal lines */}
        <div className="mb-12 w-full max-w-md text-left font-terminal text-sm sm:text-base">
          {BOOT_LINES.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0 }}
              animate={{ opacity: i < bootStep ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              className={
                line === "GASHTYAR KAWA"
                  ? "font-display neon-pink text-2xl tracking-[0.2em] sm:text-3xl"
                  : "neon-green"
              }
            >
              <span className="text-phosphor/60">&gt; </span>
              {line}
            </motion.p>
          ))}
        </div>

        <AnimatePresence>
          {bootDone && !exiting && (
            <motion.button
              type="button"
              onClick={handleEnter}
              className="font-display flicker-border glitch-hover focus-ring px-10 py-4 text-xl tracking-[0.25em] text-neon-cyan sm:text-2xl"
              style={{ borderRadius: 0 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              [ ENTER THE WORLD ]
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
