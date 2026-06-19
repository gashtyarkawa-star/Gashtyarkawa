"use client";

import { createContext, createElement, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { site } from "@/config/site";

// NOTE ON AUDIO FILES:
// Real audio must be placed at:
//   /public/audio/intro.mp3
//   /public/audio/click.mp3
// The placeholders shipped in the repo are empty; if a file is missing or
// cannot decode, playback fails silently and the rest of the site keeps working.

type AudioContextValue = {
  soundEnabled: boolean;
  toggleSound: () => void;
  playIntro: () => void;
  playClick: () => void;
};

const Ctx = createContext<AudioContextValue | null>(null);

const CLICK_COOLDOWN_MS = 300;

export function AudioProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const lastClickRef = useRef(0);
  const introPlayedRef = useRef(false);

  const safePlay = useCallback(
    (src: string) => {
      if (!soundEnabled) return;
      if (typeof Audio === "undefined") return;
      try {
        const audio = new Audio(src);
        audio.volume = 0.6;
        // play() returns a promise that rejects if the file is missing/blocked.
        const p = audio.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            /* fail silently — file may not exist yet */
          });
        }
      } catch {
        /* fail silently */
      }
    },
    [soundEnabled],
  );

  const playIntro = useCallback(() => {
    if (introPlayedRef.current) return;
    introPlayedRef.current = true;
    safePlay(site.audio.intro);
  }, [safePlay]);

  const playClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickRef.current < CLICK_COOLDOWN_MS) return;
    lastClickRef.current = now;
    safePlay(site.audio.click);
  }, [safePlay]);

  const toggleSound = useCallback(() => setSoundEnabled((s) => !s), []);

  const value: AudioContextValue = { soundEnabled, toggleSound, playIntro, playClick };
  // eslint-disable-next-line react-hooks/refs
  return createElement(Ctx.Provider, { value }, children);
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe no-op fallback so components never crash outside the provider.
    return {
      soundEnabled: false,
      toggleSound: () => {},
      playIntro: () => {},
      playClick: () => {},
    };
  }
  return ctx;
}
