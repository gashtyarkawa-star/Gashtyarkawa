"use client";

import { useEffect, useRef } from "react";

// Fixed full-screen animated TV static rendered over everything at low opacity.
// Respects prefers-reduced-motion (renders a single static frame).
export default function VHSNoise() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // small offscreen buffer scaled up = chunky analog noise, cheap to render
    const W = 160;
    const H = 90;
    canvas.width = W;
    canvas.height = H;

    let raf = 0;
    let frame = 0;

    const draw = () => {
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      frame++;
      // throttle to ~20fps for a flickery analog feel
      if (!reduced) raf = window.setTimeout(() => requestAnimationFrame(draw), 50);
    };
    draw();

    return () => {
      window.clearTimeout(raf);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{
        zIndex: 9996,
        opacity: 0.05,
        mixBlendMode: "screen",
        imageRendering: "pixelated",
      }}
    />
  );
}
