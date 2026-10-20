# IDROSUD

Sito vetrina in italiano, realizzato con Next.js 16.4, React 19 e TypeScript. L’effetto acqua usa jQuery e jQuery Ripples distribuiti localmente in `public/vendor/`. Il progetto viene consegnato nel repository locale, senza pubblicazione.

## Avvio

```sh
npm install
npm run dev
```

Gli script di sviluppo e build usano Webpack, compatibile con il fallback SWC WebAssembly quando Windows blocca il modulo nativo. In questo caso l'avviso SWC resta visibile, ma non impedisce l'avvio; Turbopack richiede invece il modulo nativo.

Aprire l’URL mostrato nel terminale. Per la produzione:

L’anteprima LAN `http://192.168.1.7:3000` è autorizzata in `allowedDevOrigins` dentro `next.config.ts`, per consentire anche la connessione HMR. Se l’indirizzo locale cambia, aggiornare quella voce: una connessione HMR bloccata può lasciare il browser su una versione precedente. In sviluppo, i messaggi `[IDROSUD motion]` e `[IDROSUD ripple]` riportano lo stato degli effetti nella console e nei log di sviluppo di Next.js; non sono attivi in produzione.

```sh
npm run build
npm start
```

## Organizzazione

- `app/`: homepage, tre settori, chi siamo, contatti, blog con pagine articolo, privacy, cookie e pagina 404; metadati per pagina, sitemap e robots.
- `app/globals.css`: sistema globale con palette, gradiente, tipografia, spaziatura, proporzioni dei media, durate, stili condivisi e regole responsive. Breakpoint centralizzati: tablet 1000px, mobile 700px; adattamento ampio a 1600px.
- `components/ui.tsx`: pulsanti con varianti, icone, contenitori di sezione, card, breadcrumb, CTA e segnaposto media.
- `components/sections.tsx` e `sector-page.tsx`: sezioni e struttura riutilizzata dalle pagine dei tre settori.
- `components/header.tsx`: menu fisso con sfondo stone, navigazione compatta, pannello soluzioni e menu mobile. Gestisce Escape, chiusura esterna, focus e blocco dello scroll su mobile. `components/navigation.tsx` mantiene il footer ed esporta l’header. Gli stili usano `--header-offset` per lasciare spazio al contenuto e agli ancoraggi.
- `components/product-explorer.tsx`: selettore delle tre macrocategorie con radio nativi e pannelli CSS, utilizzabile anche senza JavaScript; ogni pannello include un link esplicito alla pagina del settore.
- `components/motion.tsx`: contenitore dichiarativo per gli ingressi allo scroll. `components/scroll-experience.tsx` usa IntersectionObserver e transizioni CSS di opacità e traslazione per far comparire i contenuti una sola volta. Gli elementi già visibili restano stabili; quelli sotto la schermata vengono preparati prima dell’ingresso. Contenitori e figli non vengono animati insieme, e i contenuti rivelati restano visibili anche quando cambia la preferenza di movimento. Non sono usate timeline che legano fotogramma e posizione di scroll. Focus e assenza di JavaScript mantengono il contenuto accessibile. Un MutationObserver registra anche i contenuti caricati dopo il layout da Next.js.
- Le animazioni sono sempre attive: `app/layout.tsx` imposta `data-motion="enabled"` fin dal rendering iniziale. Non sono presenti comandi per disattivarle e le vecchie preferenze salvate non vengono lette.
- `components/water-ripple-section.tsx`: effetto collegato ai blocchi esistenti tramite un aggancio invisibile. Applica l’effetto al blocco finale già presente, marcato con `waterEffect` sul componente `Section`/`CTASection` oppure `data-water-ripple`. Non aggiunge sezioni, titoli, CTA o spazi. Usa lo stesso motore WebGL del riferimento Water Ripple Animation: jQuery Ripples 0.6.3, con jQuery 3.7.1. File e licenze MIT sono in `public/vendor/`; non si caricano script da CDN. La texture grafica è generata in memoria dai colori della palette; la fotografia del riferimento non viene importata. Le onde reagiscono a mouse e tocco e vengono generate automaticamente mentre il blocco è visibile. Il rendering viene nascosto fuori schermo, e a scheda nascosta; testo e link esistenti rimangono accessibili.
- `content/about.ts`: capitoli della storia aziendale e profili personali. Date, nomi, ruoli, biografie e citazione non confermati sono segnaposto espliciti. Modificare questi dati per completare `/chi-siamo`; i due profili sono esempi di impaginazione e non rappresentano il numero effettivo di persone in azienda.
- `content/site.ts`: contatti, navigazione, settori, categorie prodotto, domande frequenti e collegamenti agli articoli.
- `content/blog.ts`: tutti i sei articoli del blog, con slug, date originali, categorie e testi riorganizzati. Per aggiungere un articolo, inserire un nuovo elemento: archivio, pagina, sitemap e redirect del precedente percorso alla radice vengono generati dai dati.
- `content/config.ts`: origine del sito per canonical, sitemap e dati strutturati. Copiare `.env.example` in `.env.local` e impostare `NEXT_PUBLIC_SITE_URL` con il dominio nuovo prima della build di pubblicazione. Il valore predefinito è `http://localhost:3000`; il sito precedente non viene utilizzato come fallback.

## Font locali

Le dichiarazioni `@font-face` sono in `app/globals.css`. Outfit variabile (100–900) è usato per i titoli; Manrope variabile (200–800) per testo e interfaccia. I file provengono da `public/assets/font/`; non vengono richiesti font esterni. Sono presenti anche Plus Jakarta Sans, Montserrat e Macondo, non utilizzati. Le licenze OFL restano nelle rispettive cartelle.

## Sostituire i segnaposto

Ogni media è attualmente un segnaposto esplicitamente etichettato: nessuna foto o video è caricato. `ImagePlaceholder`, `VideoPlaceholder` e `MediaContainer` condividono le varianti `landscape`, `portrait` e `wide`.

Per inserire i media, salvare i file in `public/assets/` e sostituire il segnaposto nel componente interessato con `next/image` oppure un elemento `video`, conservando il contenitore `.media` e la relativa classe di proporzione. Per le immagini specificare dimensioni, `sizes`, testo alternativo e caricamento lazy sotto la piega; per i video usare un poster, `preload="none"`, controlli accessibili e riproduzione facoltativa. Conservare il rapporto d’aspetto per evitare spostamenti del layout. I segnaposto non simulano filmati e non hanno controlli di riproduzione fittizi.

## Contatti e contenuti

Il modulo ha validazione HTML (campi obbligatori, email, lunghezze) e genera una bozza `mailto:`. Non esiste un backend: nessuna richiesta viene inviata dal sito, nessun dato è salvato. L’utente apre, verifica e invia la bozza nel proprio programma email. Telefono ed email diretta restano disponibili. Per un invio dal sito servirà implementare un endpoint, gestione errori e relativa informativa.

Le informazioni aziendali sono state verificate il 16 ottobre 2026 sulle pagine aziendali precedenti dedicate a piscine, giardinaggio, depurazione e contatti. La comunicazione riguarda fornitura di prodotti, ricambi e supporto alla scelta, senza attribuire all’azienda costruzione di piscine. Gli orari sono indicati come estivi, secondo la fonte, con invito a verificarli telefonicamente. Nessuna promozione o disponibilità è stata migrata.

Il blog è interamente locale: archivio `/blog`, sei pagine `/blog/[slug]`, anteprime in homepage e articoli correlati. I testi sono versioni riorganizzate e sintetiche degli argomenti pubblicati, con date originali conservate. Non sono importati commenti, immagini, script WordPress o contenuti incorporati; il sito non effettua richieste al precedente CMS. I vecchi percorsi degli articoli, dell’archivio e dei quattro settori/contatti vengono reindirizzati ai nuovi percorsi tramite `next.config.ts`. Anche `/approfondimenti` conduce al blog.

Privacy e cookie sono pagine locali che descrivono la configurazione attuale. Le informazioni dipendenti dall’hosting e dalla gestione aziendale dei dati sono esplicitamente segnate come da completare prima della pubblicazione. Queste due pagine sono escluse dall’indicizzazione e dalla sitemap finché le informative non sono completate. L’indirizzo email aziendale è conservato come recapito.

La direzione creativa prende spunto da [Nereus di Zolarys](https://www.zolarys.com/projects/nereus), con composizione originale, palette richiesta e soli segnaposto. Il simbolo a goccia e la favicon sono elementi grafici dell’interfaccia, non media fotografici.

## Verifica

`node tests/motion.test.cjs` esegue i test di regressione per contenuti caricati dopo il layout, keyframe/stagger, focus, preferenze di movimento ridotto, attivazione esplicita, comparsa dei contenuti anche in Chrome, avvio e pulizia del motore ripple. I test usano il runner nativo di Node e TypeScript già presente nel progetto. Questi controlli verificano la logica, non il rendering WebGL in un browser reale.

Build di produzione completata con successo, incluso il controllo TypeScript. Controlli HTTP superati sulle sette pagine, con titoli unici, canonical, descrizioni, lingua italiana, un solo H1 e soli segnaposto media. Verificati anche font locali, sitemap, robots, favicon, quattro redirect 308 e risposta 404.

Dopo la migrazione del blog: build riuscita, controlli HTTP su homepage, archivio, sei articoli, pagine informative e contatti, inclusi tutti i rispettivi link interni. Verificati i sei redirect degli articoli, quelli degli archivi e le nuove voci della sitemap. Nessun collegamento HTTP al vecchio dominio o media remoti nelle pagine controllate. I loghi locali eventualmente aggiunti al progetto sono mantenuti.

Eseguire `npm run build` per compilazione, controllo TypeScript e prerendering. Verificare inoltre navigazione da tastiera, menu mobile (anche Escape), selettore settori, accordion e preparazione della bozza email. La verifica visiva in browser non era disponibile nella sessione di realizzazione: il controllo desktop/tablet/mobile resta da completare in un browser prima della pubblicazione.
