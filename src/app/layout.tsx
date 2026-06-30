import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import StadiumBackground from "@/components/StadiumBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LIONEL MESSI",
  description: "Experience the legendary career of Lionel Andrés Messi inside an interactive Awwwards-quality digital museum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-[#050608] text-white">
        <LenisProvider>
          {/* Visual Canvas Backdrop */}
          <StadiumBackground />
          {/* Navigation */}
          {/* Global Noise grain texture */}
          <div className="noise-overlay" />

          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
