import { type Sector, sectors } from "@/content/site";
import {
  Breadcrumbs,
  Button,
  Card,
  CTASection,
  Eyebrow,
  ImagePlaceholder,
  Section,
  SectionHeader,
} from "./ui";
import { CategoryCard } from "./sections";
import { RevealOnScroll } from "./motion";
export function SectorPage({ sector }: { sector: Sector }) {
  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <Breadcrumbs title={sector.title} />
          <Eyebrow>
            {sector.number} / {sector.title}
          </Eyebrow>
          <h1>{sector.tagline}</h1>
          <div className="inner-intro">
            <p>{sector.intro}</p>
            <Button href="/contatti">Chiedi informazioni</Button>
          </div>
          <ImagePlaceholder label={sector.media} ratio="wide" />
        </div>
      </section>
      <Section>
        <RevealOnScroll>
          <SectionHeader
            label="PRODOTTI E SOLUZIONI"
            title="Quello che ti serve."
          />
          <div className="product-grid">
            {sector.products.map((p, i) => (
              <Card className="product-card" key={p.title}>
                <ImagePlaceholder label={p.title} />
                <div className="product-copy">
                  <span className="micro">
                    0{i + 1} / {sector.short}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <Button href="/contatti" variant="text">
                    Parliamone
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </RevealOnScroll>
      </Section>
      <Section className="faq-section">
        <SectionHeader label="FACCIAMO CHIAREZZA" title="Da dove iniziare?" />
        <div className="accordion">
          {sector.faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CTASection />
      <Section waterEffect>
        <SectionHeader
          label="CONTINUA A ESPLORARE"
          title="Le altre soluzioni."
        />
        <div className="category-grid category-grid--two">
          {sectors
            .filter((s) => s.slug !== sector.slug)
            .map((s) => (
              <CategoryCard sector={s} key={s.slug} />
            ))}
        </div>
      </Section>
    </>
  );
}
