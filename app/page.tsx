import { siteUrl } from "@/content/config";
import { ProductExplorer } from "@/components/product-explorer";
import Link from "next/link";
import { company, sectors } from "@/content/site";
import { Button, Eyebrow, VideoPlaceholder, CTASection } from "@/components/ui";
import {
  ArticlesSection,
  CompanyIntro,
  SectorsSection,
  Strengths,
} from "@/components/sections";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-topline">
            <Eyebrow>ACQUA. TECNOLOGIA. SOLUZIONI.</Eyebrow>
            <span className="micro hero-location">
              LECCE, ITALIA <span aria-hidden="true">↗</span>
            </span>
          </div>
          <div className="hero-title">
            <h1>
              Dove c’è acqua,
              <br />
              ci <span>siamo.</span>
              <span className="title-spark" aria-hidden="true">
                ✳
              </span>
            </h1>
            <div className="hero-side">
              <span className="vertical-line" />
              <p>
                Un elemento essenziale.
                <br />
                Infinite possibilità.
              </p>
            </div>
          </div>
          <div className="hero-bottom">
            <p>
              Ricambi e accessori per piscine, prodotti per il giardinaggio e
              l’irrigazione, sistemi di filtrazione e depurazione dell’acqua.
            </p>
            <div className="hero-actions">
              <Button href="#soluzioni">Esplora le soluzioni</Button>
              <Button href="/contatti" variant="text">
                Parliamone
              </Button>
            </div>
          </div>
          <div className="hero-media">
            <VideoPlaceholder
              label="Movimento dell’acqua · video hero"
              ratio="wide"
            />
            <div className="hero-media-footer">
              <span className="micro">L’ACQUA È IL NOSTRO ELEMENTO.</span>
              <a className="scroll-link micro" href="#soluzioni">
                SCOPRI IL MONDO IDROSUD <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <nav className="sector-strip" aria-label="Le tre aree IDROSUD">
        <div className="container">
          {sectors.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`}>
              <span className="micro">{s.number}</span>
              {s.title}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </nav>
      <SectorsSection />
      <ProductExplorer />
      <CompanyIntro />
      <Strengths />
      <ArticlesSection />
      <CTASection waterEffect />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: company.name,
            url: siteUrl.origin,
            telephone: company.phone,
            email: company.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: company.address,
              addressLocality: "Lecce",
              postalCode: "73100",
              addressCountry: "IT",
            },
          }),
        }}
      />
    </>
  );
}
