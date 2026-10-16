import Link from "next/link";
import { InformationPage } from "@/components/information-page";
import { company } from "@/content/site";
export const metadata = {
  title: "Privacy Policy",
  description:
    "Informazioni sui dati e sul funzionamento dei contatti nel sito IDROSUD.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};
export default function Privacy() {
  return (
    <InformationPage title="Privacy Policy">
      <section>
        <h2>Contatti dell’azienda</h2>
        <p>
          {company.name}, {company.address}, {company.city}. P. IVA{" "}
          {company.vat}. Per informazioni:{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </section>
      <section>
        <h2>Il modulo contatti</h2>
        <p>
          Il modulo prepara una bozza nel tuo programma email. Nome, email,
          eventuale telefono, area di interesse e messaggio vengono elaborati
          nel browser e non sono inviati a un database dal modulo. Il messaggio
          viene trasmesso solo quando decidi di inviarlo dal tuo programma
          email.
        </p>
      </section>
      <section>
        <h2>Navigazione e servizi esterni</h2>
        <p>
          Il sito utilizza font locali e non integra strumenti di analisi o
          pubblicità. I collegamenti alla mappa e al programma email si attivano
          su tua iniziativa. L’eventuale trattamento effettuato da tali servizi
          dipende dai rispettivi fornitori.
        </p>
        <p>
          Per le informazioni sulle tecnologie utilizzate consulta la{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>
      </section>
      <section className="policy-pending">
        <h2>Informazioni da completare</h2>
        <p>
          Prima della pubblicazione, il titolare dovrà completare questa
          informativa con i dati del fornitore di hosting, la gestione dei log,
          finalità e basi giuridiche dei trattamenti, destinatari, tempi di
          conservazione e modalità di esercizio dei diritti. Questi dettagli non
          sono ancora disponibili per la nuova configurazione.
        </p>
      </section>
    </InformationPage>
  );
}
