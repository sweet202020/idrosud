export const company = {
  name: "IDROSUD SRLS",
  address: "Viale Grassi, 1/D",
  city: "73100 Lecce (LE)",
  phone: "+39 0832 359673",
  mobile: "+39 347 7290629",
  email: "info@idrosudsrls.it",
  vat: "05093370756",
  rea: "LE-341470",
};
export const sectors = [
  {
    slug: "piscine-e-ricambi",
    number: "01",
    title: "Piscine e ricambi",
    short: "Piscine",
    tagline: "Ogni dettaglio,\nla tua piscina.",
    description:
      "Ricambi, accessori e attrezzature per prenderti cura della tua piscina, ogni giorno.",
    intro:
      "Dalla circolazione dell’acqua alla pulizia: prodotti e componenti per mantenere efficiente la tua piscina. Ti affianchiamo nella scelta delle attrezzature adatte alle tue esigenze.",
    media: "Attrezzature e ricambi per piscine",
    products: [
      {
        title: "Pompe e filtrazione",
        text: "Pompe e sistemi di filtraggio da scegliere in base a portata, caratteristiche dell’impianto e rumorosità.",
      },
      {
        title: "Pulizia e manutenzione",
        text: "Robot pulitori, attrezzature e prodotti per il trattamento dell’acqua della piscina.",
      },
      {
        title: "Accessori e ricambi",
        text: "Componenti, scalette, illuminazione e corrimano per la funzionalità della piscina.",
      },
      {
        title: "Coperture e docce",
        text: "Coperture in diversi materiali, docce per esterni e nebulizzatori.",
      },
    ],
    faqs: [
      {
        q: "Come individuare il ricambio giusto?",
        a: "Contattaci indicando marca, modello e codice del componente, se disponibili. Una fotografia del pezzo e della targhetta può aiutarci a capire la tua richiesta.",
      },
      {
        q: "Posso chiedere informazioni sulla disponibilità?",
        a: "Sì. Chiama o scrivici specificando il prodotto: verificheremo disponibilità e caratteristiche insieme a te.",
      },
    ],
  },
  {
    slug: "giardinaggio-e-irrigazione",
    number: "02",
    title: "Giardinaggio e irrigazione",
    short: "Verde",
    tagline: "Più cura al verde.\nPiù vita agli spazi.",
    description:
      "Attrezzature per il verde e componenti per un’irrigazione adatta ai tuoi spazi.",
    intro:
      "Prodotti per giardini, terrazzi e spazi verdi, per chi coltiva una passione e per chi lavora nel settore. Dalle attrezzature alla gestione dell’irrigazione, trovi soluzioni per le diverse esigenze del verde.",
    media: "Attrezzature per giardino e irrigazione",
    products: [
      {
        title: "Attrezzature per il verde",
        text: "Decespugliatori, motozappe, motoseghe, tosasiepi e tosaerba per la manutenzione degli spazi esterni.",
      },
      {
        title: "Centraline e programmatori",
        text: "Componenti di controllo per l’irrigazione, anche con connettività Wi-Fi.",
      },
      {
        title: "Irrigatori",
        text: "Irrigatori statici e a scomparsa per prati, siepi e piante.",
      },
      {
        title: "Tubi, valvole e accessori",
        text: "Componenti per gli impianti di irrigazione e utensili per la cura del giardino.",
      },
    ],
    faqs: [
      {
        q: "A chi si rivolgono i prodotti?",
        a: "A privati, giardinieri, professionisti e realtà che si occupano della manutenzione di spazi verdi pubblici e privati.",
      },
      {
        q: "Quali informazioni servono per scegliere i componenti?",
        a: "Descrivici lo spazio da irrigare e il tuo impianto attuale. Ti aiuteremo a orientarti tra le categorie disponibili.",
      },
    ],
  },
  {
    slug: "filtrazione-e-depurazione",
    number: "03",
    title: "Filtrazione e depurazione",
    short: "Acqua",
    tagline: "La qualità dell’acqua.\nAl centro.",
    description:
      "Filtri, sistemi e componenti per il trattamento dell’acqua, a casa e nel lavoro.",
    intro:
      "Ogni utilizzo dell’acqua ha esigenze diverse. Ti aiutiamo a orientarti tra sistemi di filtrazione e depurazione per usi domestici e professionali, con attenzione alle caratteristiche dell’acqua e dell’impianto.",
    media: "Sistemi di filtrazione e depurazione acqua",
    products: [
      {
        title: "Microfiltrazione",
        text: "Sistemi e componenti per il filtraggio dell’acqua, con accessori per l’impianto.",
      },
      {
        title: "Osmosi inversa",
        text: "Soluzioni di depurazione da valutare in relazione alle esigenze di utilizzo.",
      },
      {
        title: "Addolcimento",
        text: "Addolcitori per il trattamento della durezza dell’acqua e la gestione del calcare.",
      },
      {
        title: "Filtri e manutenzione",
        text: "Accessori e prodotti per la cura dei sistemi di trattamento dell’acqua.",
      },
    ],
    faqs: [
      {
        q: "Come scegliere il sistema di trattamento?",
        a: "La scelta dipende dalle caratteristiche dell’acqua e dall’uso previsto. Parlaci delle tue esigenze per individuare le soluzioni da approfondire.",
      },
      {
        q: "Sono disponibili soluzioni professionali?",
        a: "Il nostro assortimento comprende sistemi per impieghi domestici e professionali. Contattaci per informazioni sui prodotti e sui componenti.",
      },
    ],
  },
];
export type Sector = (typeof sectors)[number];
export const navigation = [
  { href: "/#soluzioni", label: "Le nostre soluzioni" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/blog", label: "Blog" },
];
