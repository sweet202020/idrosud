import { Breadcrumbs, Button, Eyebrow, Section } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/content/site";
export const metadata = {
  alternates: { canonical: "/contatti" },
  title: "Contatti",
  description:
    "Contatta IDROSUD a Lecce: Viale Grassi 1/D, telefono 0832 359673, info@idrosudsrls.it.",
  openGraph: {
    title: "Contatti | IDROSUD",
    description:
      "Parliamo della tua esigenza. Trovi IDROSUD a Lecce, Viale Grassi 1/D.",
  },
};
export default function Page() {
  return (
    <>
      <section className="inner-hero contact-hero">
        <div className="container">
          <Breadcrumbs title="Contatti" />
          <Eyebrow>IL DIALOGO È IL PRIMO PASSO</Eyebrow>
          <h1>
            Partiamo da
            <br />
            quello che ti serve.
          </h1>
          <p className="lead">
            Un ricambio da trovare, un prodotto da scegliere,
            <br />
            un’esigenza da capire. Siamo qui.
          </p>
        </div>
      </section>
      <Section className="contact-section" waterEffect>
        <div className="contact-layout">
          <div className="contact-info">
            <div>
              <span className="micro">01 / CHIAMACI</span>
              <a className="contact-large" href="tel:+390832359673">
                {company.phone}
              </a>
              <a href="tel:+393477290629">Mobile {company.mobile}</a>
            </div>
            <div>
              <span className="micro">02 / SCRIVICI</span>
              <a className="contact-email" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </div>
            <div>
              <span className="micro">03 / VIENI A TROVARCI</span>
              <p>
                {company.address}
                <br />
                {company.city}
              </p>
              <Button
                href="https://www.google.com/maps/search/?api=1&query=Idrosud+Viale+Grassi+1D+Lecce"
                variant="text"
              >
                Apri la mappa
              </Button>
            </div>
            <div>
              <span className="micro">
                ORARI ESTIVI RIPORTATI SUL SITO ORIGINALE
              </span>
              <p>
                Lunedì – venerdì
                <br />
                7:30 – 13:00 / 16:30 – 19:30
                <br />
                Sabato 8:30 – 13:00
              </p>
              <p className="form-note">
                Per gli orari aggiornati, chiamaci prima della visita.
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
