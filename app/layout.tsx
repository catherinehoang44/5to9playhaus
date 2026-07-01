import { Fredoka, Bebas_Neue, Nunito_Sans, Inter } from "next/font/google";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "5-9 PLAY HAUS | Polymer Clay Workshops",
  description:
    "Polymer clay workshops hosted by Diem. Cozy ticketed events, corporate sessions, and private bookings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${bebasNeue.variable} ${nunitoSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
