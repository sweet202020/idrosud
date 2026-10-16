import { articles } from "@/content/blog";
import { ArticleGrid } from "./blog";
import Link from "next/link";
import { sectors, type Sector } from "@/content/site";
import {
  Arrow,
  Button,
  Card,
  Eyebrow,
  ImagePlaceholder,
  Section,
  SectionHeader,
} from "./ui";
import { RevealOnScroll } from "./motion";
export function CategoryCard({ sector }: { sector: Sector }) {
  return (
    <Card className="category-card">
      <Link href={`/${sector.slug}`} className="category-link">
        <div className="category-top">
          <span className="micro">
            {sector.number} / {sector.short}
          </span>
          <span className="circle-arrow">
            <Arrow diagonal />
          </span>
        </div>
        <ImagePlaceholder label={sector.media} />
        <div className="category-copy">
          <h3>{sector.title}</h3>
          <p>{sector.description}</p>
          <span className="text-link">
            Esplora le soluzioni <Arrow />
          </span>
        </div>
      </Link>
    </Card>
  );
}
export function SectorsSection() {
  return (
    <Section id="soluzioni" className="solutions-section">
      <RevealOnScroll>
        <SectionHeader
          label="UN ELEMENTO. TRE MONDI."
          title="L’acqua ci unisce."
        >
          <p>
            Tre ambiti, un unico punto di riferimento.
            <br />
            Prodotti e competenza per ciò che ti serve.
          </p>
        </SectionHeader>
        <div className="category-grid">
          {sectors.map((s) => (
            <CategoryCard key={s.slug} sector={s} />
          ))}
        </div>
      </RevealOnScroll>
    </Section>
  );
}
export function CompanyIntro() {
  return (
    <Section className="company-section">
      <RevealOnScroll className="company-grid">
        <div>
          <Eyebrow>IL TUO PUNTO DI RIFERIMENTO A LECCE</Eyebrow>
          <h2>
            La competenza
            <br />
            prende <span>forma.</span>
          </h2>
          <p>
            Ascoltare, capire, orientare. Per noi tutto parte dalle tue
            esigenze: dalla scelta di un ricambio alla cura del verde, fino al
            trattamento dell’acqua.
          </p>
          <p>
            Affianchiamo privati e professionisti con prodotti, conoscenza
            tecnica e assistenza pre e post vendita.
          </p>
          <Button href="/chi-siamo" variant="outline">
            Conosci IDROSUD
          </Button>
        </div>
        <div className="company-visual">
          <ImagePlaceholder
            label="L’azienda e il punto vendita IDROSUD"
            ratio="portrait"
          />
          <span className="visual-caption">
            LECCE, PUGLIA <span>ACQUA · TECNOLOGIA · PERSONE</span>
          </span>
        </div>
      </RevealOnScroll>
    </Section>
  );
}
export function Strengths() {
  return (
    <Section className="strengths-section">
      <RevealOnScroll>
        <SectionHeader
          label="IL NOSTRO MODO DI ESSERCI"
          title="Prima i tuoi bisogni."
        />
        <div className="feature-grid">
          {[
            {
              title: "Competenza tecnica",
              text: "Un aiuto per orientarti tra prodotti, componenti e soluzioni.",
            },
            {
              title: "Ascolto e cortesia",
              text: "Un confronto diretto per comprendere le tue esigenze.",
            },
            {
              title: "Prima e dopo l’acquisto",
              text: "Assistenza pre e post vendita per accompagnare la tua scelta.",
            },
          ].map((f, i) => (
            <Card className="feature-card" key={f.title}>
              <span className="micro">0{i + 1} /</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Card>
          ))}
        </div>
      </RevealOnScroll>
    </Section>
  );
}
export function ArticlesSection() {
  return (
    <Section className="articles-section">
      <RevealOnScroll>
        <SectionHeader
          label="IDEE, CURA E CONOSCENZA"
          title="Uno sguardo più a fondo."
        >
          <Button href="/blog" variant="text">
            Tutti gli articoli
          </Button>
        </SectionHeader>
        <ArticleGrid articles={articles.slice(0, 2)} />
      </RevealOnScroll>
    </Section>
  );
}
