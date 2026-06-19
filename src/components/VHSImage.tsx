"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  // CSS filter applied to the image when it loads (analog desaturation, etc.)
  imgClassName?: string;
  // show chromatic-aberration overlay copies
  aberration?: boolean;
};

// Renders an image with an 80s analog treatment. If the file is missing it
// gracefully falls back to an animated VHS-snow placeholder.
export default function VHSImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  aberration = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!failed ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover ${imgClassName}`}
            style={{ filter: "contrast(1.2) saturate(0.6)" }}
          />
          {aberration && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{
                  mixBlendMode: "screen",
                  transform: "translateX(-3px)",
                  filter: "saturate(0) brightness(1.2)",
                  background: "var(--neon-pink)",
                  opacity: 0.4,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{
                  mixBlendMode: "screen",
                  transform: "translateX(3px)",
                  opacity: 0.3,
                }}
              />
            </>
          )}
        </>
      ) : (
        <VHSStatic label={alt} />
      )}
      {/* scanline overlay on the image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)",
        }}
      />
    </div>
  );
}

function VHSStatic({ label }: { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label || "No signal"}
      className="flex h-full w-full items-center justify-center"
      style={{
        background:
          "repeating-linear-gradient(0deg,#111 0,#222 1px,#0a0a0a 2px,#1a1a1a 3px), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06), transparent 60%)",
        backgroundColor: "#0a0705",
      }}
    >
      <span className="font-display neon-cyan text-2xl tracking-[0.4em] blink">
        NO SIGNAL
      </span>
    </div>
  );
}
