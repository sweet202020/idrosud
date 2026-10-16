import Link from "next/link";
import { sectors } from "@/content/site";
import { Arrow, Section, SectionHeader } from "./ui";
export function ProductExplorer() {
  return (
    <Section className="explorer-section">
      <SectionHeader
        label="DAL BISOGNO AL PRODOTTO"
        title="Trova la tua direzione."
      >
        <p>
          Esplora le categorie. Per caratteristiche e disponibilità dei singoli
          prodotti, contattaci.
        </p>
      </SectionHeader>
      <fieldset className="explorer-layout">
        <legend className="visually-hidden">
          Scegli la macrocategoria da esplorare
        </legend>
        <div className="sector-filters">
          {sectors.map((s, i) => (
            <label
              key={s.slug}
              className="sector-filter"
              id={`sector-label-${s.slug}`}
            >
              <input
                className="visually-hidden"
                type="radio"
                name="explorer-sector"
                value={s.slug}
                defaultChecked={i === 0}
                aria-controls={`sector-panel-${s.slug}`}
              />
              <span className="micro">{s.number}</span>
              {s.title}
              <Arrow />
            </label>
          ))}
        </div>
        <div className="product-panels">
          {sectors.map((sector) => (
            <div
              className="product-list"
              key={sector.slug}
              id={`sector-panel-${sector.slug}`}
              role="region"
              aria-labelledby={`sector-label-${sector.slug}`}
            >
              <p className="micro">{sector.title}</p>
              {sector.products.map((p, i) => (
                <Link href={`/${sector.slug}`} key={p.title}>
                  <span className="micro">0{i + 1}</span>
                  <span>{p.title}</span>
                  <Arrow diagonal />
                </Link>
              ))}
              <Link className="explorer-category-link" href={`/${sector.slug}`}>
                <span>Scopri {sector.title.toLocaleLowerCase("it-IT")}</span>
                <Arrow diagonal />
              </Link>
            </div>
          ))}
        </div>
      </fieldset>
    </Section>
  );
}
