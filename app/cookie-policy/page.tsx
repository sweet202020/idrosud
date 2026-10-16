import Link from "next/link";
import { InformationPage } from "@/components/information-page";
export const metadata = {
  title: "Cookie Policy",
  description:
    "Informazioni sulle tecnologie utilizzate nel nuovo sito IDROSUD.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: false, follow: true },
};
export default function Cookies() {
  return (
    <InformationPage title="Cookie Policy">
      <section>
        <h2>Tecnologie presenti</h2>
        <p>
          Questa versione del sito non integra strumenti di analisi del
          traffico, pubblicità, profilazione o contenuti multimediali di terze
          parti. I font sono serviti localmente e immagini e video sono
          rappresentati da segnaposto.
        </p>
      </section>
      <section>
        <h2>Preferenze e modulo</h2>
        <p>
          Il selettore delle categorie non memorizza preferenze in cookie. Il
          modulo contatti mantiene i dati in memoria durante la compilazione e
          prepara una bozza email senza salvarli nel browser in modo
          persistente.
        </p>
      </section>
      <section>
        <h2>Preferenza sulle animazioni</h2>
        <p>
          Il comando per attivare o ridurre le animazioni salva la tua scelta
          nella memoria locale del browser, con la chiave idrosud-motion. La
          preferenza non viene inviata a servizi esterni. In assenza di una
          scelta esplicita, il sito rispetta le impostazioni di movimento
          ridotto del sistema.
        </p>
      </section>
      <section>
        <h2>Collegamenti esterni</h2>
        <p>
          Aprire una mappa esterna o inviare un messaggio tramite il proprio
          programma email comporta l’utilizzo del servizio scelto dall’utente.
          Non vengono caricati incorporamenti della mappa durante la navigazione
          del sito.
        </p>
      </section>
      <section className="policy-pending">
        <h2>Configurazione di pubblicazione da verificare</h2>
        <p>
          Il fornitore di hosting e gli eventuali servizi aggiunti in fase di
          pubblicazione devono essere verificati per completare l’elenco di
          cookie e tecnologie effettivamente utilizzati. Questa pagina descrive
          il codice attuale del sito.
        </p>
      </section>
      <p>
        Per maggiori informazioni consulta la{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> o{" "}
        <Link href="/contatti">contatta IDROSUD</Link>.
      </p>
    </InformationPage>
  );
}
