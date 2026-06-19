"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-32" aria-label="About">
      <motion.h2
        className="mb-14 text-sm uppercase tracking-[0.4em] text-silver"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        About
      </motion.h2>

      <div className="space-y-12">
        {site.bio.map((para, i) => (
          <motion.p
            key={i}
            className="text-xl leading-relaxed tracking-tight text-foreground/90 sm:text-2xl sm:leading-relaxed"
            initial={{ opacity: 0, y: reduced ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
