import type { Metadata } from "next";
import { Roboto, Afacad } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "I help small business owners turn their website into a growth engine, combining UX design, front-end development and growth hacking.";

export const metadata: Metadata = {
  title: "Emma Chen | Design × Growth",
  description,
  openGraph: {
    title: "Emma Chen | Design × Growth",
    description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} ${afacad.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
