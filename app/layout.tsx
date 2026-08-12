import { Fredoka, Bebas_Neue, Nunito_Sans, Inter, Rubik_Mono_One } from "next/font/google";
import type { Metadata, Viewport } from "next";
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

const rubikMonoOne = Rubik_Mono_One({
  variable: "--font-rubik-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://5to9playhaus.com"),
  title: "5-9 PLAY HAUS | Polymer Clay Workshops",
  description:
    "Polymer clay workshops hosted by Diem. Cozy ticketed events, corporate sessions, and private bookings.",
  applicationName: "5-9 PLAY HAUS",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "5-9 PLAY HAUS",
    title: "5-9 PLAY HAUS | Polymer Clay Workshops",
    description:
      "Polymer clay workshops hosted by Diem. Cozy ticketed events, corporate sessions, and private bookings.",
    images: [
      {
        url: "/og.png",
        width: 720,
        height: 720,
        alt: "5-9 PLAY HAUS logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "5-9 PLAY HAUS | Polymer Clay Workshops",
    description:
      "Polymer clay workshops hosted by Diem. Cozy ticketed events, corporate sessions, and private bookings.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f9f5eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${bebasNeue.variable} ${nunitoSans.variable} ${inter.variable} ${rubikMonoOne.variable} h-full antialiased`}
    >
      <body className="bg-grid flex min-h-full flex-col font-body">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
