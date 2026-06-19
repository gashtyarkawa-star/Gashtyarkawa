"use client";

import { useEffect, useRef } from "react";

type Props = {
  // intensity scales particle count / blob count
  intensity?: number;
  className?: string;
};

// Canvas-based drifting particles + smoke-like blobs in midnight / violet / cyan.
// Used behind the entry screen and hero. Respects prefers-reduced-motion by
// rendering a single static frame.
export default function ParticleField({ intensity = 1, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

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

    const palette = ["#2D5BFF", "#7BE7FF", "#4B2A7D"];

    type Blob = { x: number; y: number; r: number; c: string; vx: number; vy: number; phase: number };
    type Dot = { x: number; y: number; vx: number; vy: number; r: number; a: number };

    const blobCount = Math.max(3, Math.round(5 * intensity));
    const dotCount = Math.max(30, Math.round(90 * intensity));

    const blobs: Blob[] = Array.from({ length: blobCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 140 + Math.random() * 220,
      c: palette[Math.floor(Math.random() * palette.length)],
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    const dots: Dot[] = Array.from({ length: dotCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.6 + 0.2,
    }));

    let t = 0;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#070A12";
      ctx.fillRect(0, 0, width, height);

      // smoke-like blobs via radial gradients
      ctx.globalCompositeOperation = "screen";
      for (const b of blobs) {
        const pulse = 1 + Math.sin(t * 0.0008 + b.phase) * 0.15;
        const r = b.r * pulse;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        g.addColorStop(0, b.c + "33");
        g.addColorStop(0.5, b.c + "12");
        g.addColorStop(1, "#00000000");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fill();

        if (!reduced) {
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < -b.r) b.x = width + b.r;
          if (b.x > width + b.r) b.x = -b.r;
          if (b.y < -b.r) b.y = height + b.r;
          if (b.y > height + b.r) b.y = -b.r;
        }
      }

      // drifting particles
      for (const d of dots) {
        ctx.fillStyle = `rgba(191,200,214,${d.a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduced) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0) d.x = width;
          if (d.x > width) d.x = 0;
          if (d.y < 0) d.y = height;
          if (d.y > height) d.y = 0;
        }
      }
      ctx.globalCompositeOperation = "source-over";

      t += 16;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}
