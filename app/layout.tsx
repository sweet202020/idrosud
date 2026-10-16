import { siteUrl } from "@/content/config";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/navigation";
import { ScrollExperience } from "@/components/scroll-experience";
import { MotionToggle } from "@/components/motion-toggle";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "IDROSUD — Dove c’è acqua, ci siamo.",
    template: "%s | IDROSUD",
  },
  description:
    "Prodotti, ricambi e soluzioni tecniche per piscine, giardinaggio, irrigazione e trattamento dell’acqua. Scopri IDROSUD a Lecce.",
  openGraph: {
    locale: "it_IT",
    type: "website",
    siteName: "IDROSUD",
    title: "IDROSUD — Dove c’è acqua, ci siamo.",
    description: "Prodotti e soluzioni per piscine, verde e acqua. A Lecce.",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <a className="skip-link" href="#contenuto">
          Vai al contenuto
        </a>
        <Header />
        <ScrollExperience />
        <main id="contenuto">{children}</main>
        <Footer />
        <MotionToggle />
      </body>
    </html>
  );
}
