"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

// Line-by-line terminal typewriter reveal of the bio.
function TypeLine({ text, active, delay }: { text: string; active: boolean; delay: number }) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    let i = 0;
    let id: number;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        i += 2;
        setTyped(Math.min(i, text.length));
        if (i >= text.length) window.clearInterval(id);
      }, 18);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [active, reduced, text, delay]);

  const shown = reduced ? text.length : typed;
  const done = shown >= text.length;

  return (
    <p className="font-terminal text-base leading-relaxed text-phosphor sm:text-lg" style={{ textShadow: "0 0 6px rgba(57,255,20,0.45)" }}>
      <span className="text-phosphor/50">&gt; </span>
      {text.slice(0, shown)}
      {!done && <span className="blink">_</span>}
    </p>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="about"
      ref={ref}
      className="crt-grid mx-auto max-w-3xl px-6 py-32"
      aria-label="About"
    >
      <motion.h2
        className="font-display mb-12 text-3xl uppercase tracking-[0.3em] text-neon-green neon-green"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ◼ ABOUT / GASHTYAR.LOG
      </motion.h2>

      <div className="space-y-8 border border-phosphor/30 bg-black/30 p-6" style={{ boxShadow: "inset 0 0 30px rgba(57,255,20,0.08)" }}>
        {site.bio.map((para, i) => (
          <TypeLine key={i} text={para} active={inView} delay={i * 1400} />
        ))}
      </div>
    </section>
  );
}
