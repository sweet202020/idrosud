import {
  Breadcrumbs,
  Button,
  Card,
  Eyebrow,
  ImagePlaceholder,
  Section,
  SectionHeader,
} from "@/components/ui";
import { RevealOnScroll } from "@/components/motion";
import { companyHistory, teamProfiles } from "@/content/about";
import { company } from "@/content/site";

export const metadata = {
  alternates: { canonical: "/chi-siamo" },
  title: "Chi siamo · La nostra storia",
  description:
    "Le persone, le origini e il percorso di IDROSUD a Lecce. Una storia aziendale da raccontare attraverso i suoi protagonisti.",
  openGraph: {
    title: "Le persone e la storia di IDROSUD",
    description:
      "Dietro il nostro nome, le persone. Conosci il lato umano di IDROSUD.",
    url: "/chi-siamo",
  },
};

export default function About() {
  return (
    <>
      <section className="inner-hero about-hero">
        <div className="container">
          <Breadcrumbs title="Chi siamo" />
          <Eyebrow>IL LATO UMANO DI IDROSUD</Eyebrow>
          <h1>
            Prima di un nome,
            <br />
            le <span>persone.</span>
          </h1>
          <div className="inner-intro">
            <p>
              Un’azienda si racconta attraverso chi le dà vita. Qui trovano
              spazio le origini di IDROSUD, i ricordi e le persone che ne fanno
              parte.
            </p>
            <Button href="#la-nostra-storia" variant="text">
              Segui la nostra storia
            </Button>
          </div>
          <ImagePlaceholder
            label="Foto di gruppo · le persone di IDROSUD"
            ratio="wide"
          />
          <div className="visual-caption">
            <span>LECCE, PUGLIA</span>
            <span>PERSONE · RICORDI · LEGAMI</span>
          </div>
        </div>
      </section>
      <Section className="about-story">
        <RevealOnScroll className="about-introduction">
          <Eyebrow>UNA STORIA DA RACCONTARE</Eyebrow>
          <h2>
            Ogni percorso
            <br />
            ha i suoi <span>protagonisti.</span>
          </h2>
          <div className="about-story-copy">
            <p className="content-placeholder-label">
              SEGNAPOSTO · RACCONTO AZIENDALE
            </p>
            <p>
              [Inserire il racconto delle origini: l’idea iniziale, le persone
              che l’hanno condivisa e il loro legame con Lecce.]
            </p>
            <p>
              [Inserire un ricordo autentico o un episodio che esprima il
              carattere dell’azienda e di chi ci lavora.]
            </p>
          </div>
        </RevealOnScroll>
      </Section>
      <Section id="la-nostra-storia" className="history-section">
        <SectionHeader
          label="LE ORIGINI, IL PERCORSO, OGGI"
          title="Il filo della nostra storia."
        >
          <p>
            Tre capitoli da completare con date, ricordi e fotografie aziendali.
          </p>
        </SectionHeader>
        <div className="history-timeline" data-scroll-timeline>
          <div className="history-line" aria-hidden="true">
            <span />
          </div>
          {companyHistory.map((chapter) => (
            <article className="story-chapter" key={chapter.id}>
              <div className="story-period">
                <span className="story-dot" aria-hidden="true" />
                <span className="micro">CAPITOLO {chapter.chapter}</span>
                <p>{chapter.period}</p>
              </div>
              <div className="story-content">
                <Eyebrow>{chapter.title}</Eyebrow>
                <h3>
                  {chapter.id === "origini"
                    ? "Da un’idea, un inizio."
                    : chapter.id === "percorso"
                      ? "Le tappe che ci uniscono."
                      : "Una storia che continua."}
                </h3>
                <p className="content-placeholder-label">
                  SEGNAPOSTO · TESTO DA COMPLETARE
                </p>
                <p>{chapter.story}</p>
              </div>
              <ImagePlaceholder label={chapter.media} />
            </article>
          ))}
        </div>
      </Section>
      <Section className="team-section">
        <SectionHeader
          label="LE PERSONE DI IDROSUD"
          title="Un volto, una storia."
        >
          <p>
            I profili seguenti sono segnaposto: nomi, ruoli e racconti personali
            saranno inseriti con le informazioni del team.
          </p>
        </SectionHeader>
        <div className="team-grid">
          {teamProfiles.map((person, index) => (
            <Card className="team-profile" key={person.id}>
              <ImagePlaceholder
                label={`${person.media} · ${index + 1}`}
                ratio="portrait"
              />
              <div className="team-profile-copy">
                <p className="content-placeholder-label">
                  SEGNAPOSTO PROFILO {String(index + 1).padStart(2, "0")}
                </p>
                <h3>{person.name}</h3>
                <p className="team-role">{person.role}</p>
                <p>{person.biography}</p>
              </div>
            </Card>
          ))}
        </div>
        <RevealOnScroll className="about-manifesto">
          <span className="micro">UNA VOCE DALL’AZIENDA</span>
          <p className="story-quote">
            [Inserire una frase autentica del fondatore o di una persona del
            team.]
          </p>
          <p className="content-placeholder-label">
            SEGNAPOSTO CITAZIONE · [NOME E RUOLO]
          </p>
        </RevealOnScroll>
      </Section>
      <Section className="cta-section" waterEffect>
        <Eyebrow>CONOSCIAMOCI DI PERSONA</Eyebrow>
        <div className="cta-row">
          <h2>
            Le storie cominciano
            <br />
            da un <span>incontro.</span>
          </h2>
          <div>
            <p>
              Ci trovi a Lecce.
              <br />
              {company.address}
            </p>
            <Button href="/contatti">Vieni a conoscerci</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
