"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EntryScreen from "@/components/EntryScreen";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScaleSculpture from "@/components/ScaleSculpture";
import AlbumSection from "@/components/AlbumSection";
import MusicSection from "@/components/MusicSection";
import AboutSection from "@/components/AboutSection";
import ListenSection from "@/components/ListenSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [entered, setEntered] = useState(false);

  // Lock scroll until the visitor enters the world.
  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <>
      {!entered && <EntryScreen onEnter={() => setEntered(true)} />}

      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Nav />
          <main>
            <Hero />
            <ScaleSculpture />
            <AlbumSection />
            <MusicSection />
            <AboutSection />
            <ListenSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
