import type { Metadata } from "next";
import "./globals.css";
import { Press_Start_2P, Space_Mono, Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-press-start",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-space-mono",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub App",
  description:
    "NoteHub is a fun, retro-style note app that feels like a game. Create notes, explore categories, and enjoy a colorful, summery experience while staying organized.",
  openGraph: {
    title: "Notehub",
    description:
      "NoteHub is a fun, retro-style note app that feels like a game. Create notes, explore categories, and enjoy a colorful, summery experience while staying organized.",
    url: `https://08-zustand-five-beryl.vercel.app/`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notehub App",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} ${spaceMono.variable} ${roboto.variable}`}
      >
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
