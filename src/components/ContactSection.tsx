"use client";

import { motion } from "framer-motion";
import { site } from "@/config/site";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-32" aria-label="Contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="border border-neon-pink/40 bg-black/30 p-6"
        style={{ boxShadow: "inset 0 0 30px rgba(255,45,120,0.08)" }}
      >
        <p className="font-display text-2xl uppercase tracking-[0.3em] text-neon-pink neon-pink">
          &gt; BOOKING / CONTACT
        </p>
        <a
          href={`mailto:${site.contactEmail}`}
          className="glitch-hover focus-ring mt-6 inline-block font-display text-2xl tracking-tight text-neon-cyan transition-colors sm:text-4xl"
        >
          &gt; {site.contactEmail}
          <span className="blink">_</span>
        </a>
      </motion.div>
    </section>
  );
}
