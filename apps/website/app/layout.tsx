import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rora — a cosy, calm dark theme",
  description:
    "A cosy, calm dark theme — vivid aurora accents against a deep arctic night.",
  authors: [{ name: "Rora" }],
  openGraph: {
    title: "Rora — a cosy, calm dark theme",
    description:
      "A cosy, calm dark theme — vivid aurora accents against a deep arctic night.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#12101c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
