"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { site } from "@/config/site";

// The centrepiece: a luminous breathing sound-wave with the 8 Bayat Dorian
// notes as floating glowing points. Cursor/touch ripples, hover halos, click
// shockwaves, scroll-reveal, and special "note moments".
//
// Implemented in Canvas 2D for robustness across devices. A reduced-motion
// static fallback (labeled points, no animation) is rendered separately.

type Special = "bayat" | "dorian" | "final" | null;

type Note = {
  label: string;
  special: Special;
  baseX: number; // 0..1 along the wave
  // runtime
  x: number;
  y: number;
  ox: number; // origin (resting) position
  oy: number;
  vx: number;
  vy: number;
  revealed: number; // 0..1
  hover: number; // 0..1
  pulse: number;
};

type Burst = { x: number; y: number; vx: number; vy: number; life: number; color: string };

export default function ScaleSculpture() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { playClick } = useAudio();

  // which notes have been scroll-revealed (drives accessible labels too)
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  // refs read inside the rAF loop without re-binding
  const playClickRef = useRef(playClick);
  const revealRef = useRef(0);
  // setState functions are stable; capture once
  const setRevealedCountRef = useRef(setRevealedCount);
  const setActiveLabelRef = useRef(setActiveLabel);

  useEffect(() => {
    playClickRef.current = playClick;
  }, [playClick]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const notes: Note[] = site.scale.map((n, i) => ({
      label: n.label,
      special: n.special,
      baseX: (i + 0.5) / site.scale.length,
      x: 0,
      y: 0,
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
      revealed: 0,
      hover: 0,
      pulse: 0,
    }));

    const bursts: Burst[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // scroll reveal: notes appear one by one as section scrolls through
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 when top enters bottom, 1 when bottom leaves top-ish
      const total = rect.height + vh;
      const seen = vh - rect.top;
      const p = Math.max(0, Math.min(1, seen / total));
      revealRef.current = p;
      const count = Math.round(p * notes.length);
      setRevealedCountRef.current(count);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = true;
    };
    const onMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) setPointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    const lastClickRef = { t: 0 };
    const triggerBurst = (n: Note) => {
      const color =
        n.special === "bayat" ? "#FF2D78" : n.special === "dorian" ? "#FFE600" : "#39FF14";
      const count = 26;
      for (let k = 0; k < count; k++) {
        const a = (k / count) * Math.PI * 2;
        const s = 2 + Math.random() * 3;
        bursts.push({ x: n.x, y: n.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color });
      }
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const n of notes) {
        if (n.revealed < 0.3) continue;
        if (Math.hypot(n.x - cx, n.y - cy) < 26) {
          const now = Date.now();
          if (now - lastClickRef.t > 300) {
            lastClickRef.t = now;
            playClickRef.current();
          }
          triggerBurst(n);
          setActiveLabelRef.current(n.label);
          break;
        }
      }
    };
    canvas.addEventListener("click", onClick);

    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    let t = 0;
    let raf = 0;

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      const midY = height / 2;
      const amp = Math.min(height * 0.18, 90);
      const padX = width * 0.08;
      const usableW = width - padX * 2;

      // resolve special-moment global influences based on reveal progress
      const revealedNotes = notes.filter((n) => n.revealed > 0.5);
      const dorianActive = notes.find((n) => n.special === "dorian" && n.revealed > 0.6);
      const finalActive = notes.find((n) => n.special === "final" && n.revealed > 0.8);

      // background brightening for "Dorian lift"
      if (dorianActive) {
        const g = ctx.createRadialGradient(width / 2, midY, 0, width / 2, midY, width * 0.6);
        g.addColorStop(0, "rgba(255,230,0,0.10)");
        g.addColorStop(1, "rgba(10,7,5,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      // breathing wave line
      const breathe = Math.sin(t * 0.6) * 0.5 + 0.5;
      const segments = 120;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const px = padX + (usableW * i) / segments;
        const phase = (i / segments) * Math.PI * 4 + t * 1.2;
        let py = midY + Math.sin(phase) * amp * (0.5 + breathe * 0.5);

        // pointer ripple
        if (pointer.active) {
          const d = Math.abs(px - pointer.x);
          if (d < 140) {
            const infl = (1 - d / 140) * 26;
            py += Math.sign(midY - pointer.y) * -infl * Math.sin(t * 6);
          }
        }

        // "Bayat color": wave bends/destabilizes near the bayat note region
        const bayat = notes.find((n) => n.special === "bayat");
        if (bayat && bayat.revealed > 0.5) {
          const d = Math.abs(px - bayat.ox);
          if (d < 120) {
            const infl = (1 - d / 120) * 30;
            py += Math.sin(t * 9 + i) * infl;
          }
        }
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      const lineGrad = ctx.createLinearGradient(padX, 0, width - padX, 0);
      lineGrad.addColorStop(0, "#39FF14");
      lineGrad.addColorStop(0.5, dorianActive ? "#FFE600" : "#39FF14");
      lineGrad.addColorStop(1, "#00F5D4");
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "#39FF14";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // overall dissolve on final note
      const dissolve = finalActive ? Math.min(1, finalActive.revealed) : 0;

      // update + draw notes
      notes.forEach((n, i) => {
        const targetReveal = revealRef.current * notes.length - i;
        n.revealed += (Math.max(0, Math.min(1, targetReveal)) - n.revealed) * 0.08;

        const px = padX + usableW * n.baseX;
        const phase = ((px - padX) / usableW) * Math.PI * 4 + t * 1.2;
        let baseY = midY + Math.sin(phase) * amp * (0.5 + breathe * 0.5);

        // Dorian lift: note rises
        if (n.special === "dorian") baseY -= 40 * n.revealed;

        n.ox = px;
        n.oy = baseY;

        // spring toward origin, repelled by pointer
        let fx = (n.ox - n.x) * 0.08;
        let fy = (n.oy - n.y) * 0.08;
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100 && dist > 0.001) {
            const push = (1 - dist / 100) * 5;
            fx += (dx / dist) * push;
            fy += (dy / dist) * push;
          }
          // hover detection
          n.hover += ((dist < 30 ? 1 : 0) - n.hover) * 0.15;
        } else {
          n.hover += (0 - n.hover) * 0.15;
        }

        // bayat: pull particles/notes inward + jitter
        if (n.special === "bayat" && n.revealed > 0.5) {
          fx += Math.sin(t * 11 + i) * 1.2;
          fy += Math.cos(t * 13 + i) * 1.2;
        }

        n.vx = (n.vx + fx) * 0.82;
        n.vy = (n.vy + fy) * 0.82;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x === 0 && n.y === 0) {
          n.x = n.ox;
          n.y = n.oy;
        }

        if (n.revealed < 0.02) return;

        const alpha = n.revealed * (1 - dissolve * 0.85);
        const r = 6 + Math.sin(t * 3 + i) * 1.5 + n.hover * (isMobile ? 4 : 8);
        const color =
          n.special === "bayat"
            ? "#FF2D78"
            : n.special === "dorian"
              ? "#FFE600"
              : n.special === "final"
                ? "#00F5D4"
                : "#39FF14";

        // vibrating halo on hover
        if (n.hover > 0.05) {
          ctx.beginPath();
          const hr = r + 10 + Math.sin(t * 20) * 4 * n.hover;
          ctx.strokeStyle = `rgba(0,245,212,${0.5 * n.hover})`;
          ctx.lineWidth = 1.5;
          ctx.arc(n.x, n.y, hr, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 16 + n.hover * 20;
        ctx.shadowColor = color;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // label
        ctx.font = "13px var(--font-space-mono), monospace";
        ctx.fillStyle = `rgba(245,239,214,${alpha * 0.85})`;
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y + r + 16);
      });

      // special labels
      const bayat = notes.find((n) => n.special === "bayat");
      if (bayat && bayat.revealed > 0.6) {
        ctx.fillStyle = `rgba(255,45,120,${(bayat.revealed - 0.6) * 2.5})`;
        ctx.font = "14px var(--font-space-mono), monospace";
        ctx.textAlign = "center";
        ctx.fillText("Bayat color", bayat.x, bayat.y - 28);
      }
      if (dorianActive) {
        ctx.fillStyle = `rgba(255,230,0,${(dorianActive.revealed - 0.6) * 2.5})`;
        ctx.font = "14px var(--font-space-mono), monospace";
        ctx.textAlign = "center";
        ctx.fillText("Dorian lift", dorianActive.x, dorianActive.y - 34);
      }

      // bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.94;
        b.vy *= 0.94;
        b.life -= 0.025;
        if (b.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = b.life;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // final dissolve particles
      if (dissolve > 0.05) {
        ctx.fillStyle = `rgba(10,7,5,${dissolve * 0.4})`;
        ctx.fillRect(0, 0, width, height);
      }

      void revealedNotes;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [reduced]);

  const finalRevealed = revealedCount >= site.scale.length;

  return (
    <section
      id="scale"
      ref={wrapRef}
      aria-label="Interactive Bayat Dorian scale"
      className="relative min-h-[200vh] px-6 py-24"
    >
      <div className="crt-grid sticky top-0 flex h-screen flex-col items-center justify-center">
        <p className="font-display mb-4 text-xl uppercase tracking-[0.4em] text-neon-cyan neon-cyan">
          ◢ THE BAYAT DORIAN SCALE ◣
        </p>

        {reduced ? (
          // Static, fully accessible fallback
          <ul className="flex flex-wrap items-center justify-center gap-4 font-terminal">
            {site.scale.map((n, i) => (
              <li
                key={`${n.label}-${i}`}
                className="neon-border-green px-5 py-3 text-paper"
                style={{ borderRadius: 0 }}
              >
                {n.label}
                {n.special === "bayat" && (
                  <span className="ml-2 text-xs italic text-neon-pink">Bayat color</span>
                )}
                {n.special === "dorian" && (
                  <span className="ml-2 text-xs italic text-neon-yellow">Dorian lift</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="relative h-[60vh] w-full max-w-5xl">
              <canvas
                ref={canvasRef}
                role="img"
                aria-label="An oscilloscope-style sound wave with eight glowing notes of the Bayat Dorian scale: C, D half-flat, E flat, F, G, A, B flat, C. Move the cursor to ripple the wave; click a note to hear it."
                className="h-full w-full cursor-pointer touch-none"
              />
              {/* scanline overlay on the oscilloscope */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)",
                }}
              />
            </div>
            {/* Accessible live region + visually-hidden controls for each note */}
            <p className="sr-only" aria-live="polite">
              {activeLabel ? `Playing note ${activeLabel}` : ""}
            </p>
            <ul className="sr-only">
              {site.scale.map((n, i) => (
                <li key={`a11y-${n.label}-${i}`}>
                  <button type="button" onClick={() => { playClick(); setActiveLabel(n.label); }}>
                    Play note {n.label}
                    {n.special ? `, ${n.special} moment` : ""}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-terminal text-xs tracking-widest text-phosphor/50">
              {revealedCount} / {site.scale.length} notes revealed — scroll to reveal the scale
            </p>
          </>
        )}

        {/* Final C: title returns into focus */}
        <div
          className={`pointer-events-none mt-8 text-center transition-opacity duration-1000 ${
            finalRevealed || reduced ? "opacity-100" : "opacity-0"
          }`}
        >
          <span dir="rtl" lang="ku" className="block text-3xl neon-pink sm:text-5xl">
            {site.album.kurdishTitle}
          </span>
          <span className="font-display mt-2 block text-2xl tracking-[0.3em] text-neon-cyan">
            {site.album.latinTitle}
          </span>
          <span className="font-display blink mt-1 block text-sm uppercase tracking-[0.4em] text-neon-yellow">
            {site.album.status}
          </span>
        </div>
      </div>
    </section>
  );
}
