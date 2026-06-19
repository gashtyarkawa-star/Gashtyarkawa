import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/hooks/useAudio";
import { site } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
