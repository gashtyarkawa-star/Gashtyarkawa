import type { Metadata } from "next";
import { VT323, Space_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/hooks/useAudio";
import VHSNoise from "@/components/VHSNoise";
import { site } from "@/config/site";

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.album.latinTitle}`,
  description:
    "Gashtyar Kawa — Kurdish setar player, composer and microtonal explorer. Bayat Dorian, coming soon.",
  openGraph: {
    title: `${site.name} — ${site.album.latinTitle}`,
    description: "Between memory, movement, and new sound.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${vt323.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AudioProvider>{children}</AudioProvider>
        <VHSNoise />
      </body>
    </html>
  );
}
