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
      >
        <p className="text-sm uppercase tracking-[0.4em] text-silver">Booking / Contact</p>
        <a
          href={`mailto:${site.contactEmail}`}
          className="hover-line focus-ring mt-6 inline-block text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-cyan sm:text-5xl"
        >
          {site.contactEmail}
        </a>
      </motion.div>
    </section>
  );
}
