export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  sector: string;
  description: string;
  sections: { title: string; paragraphs?: string[]; points?: string[] }[];
};

// Articoli del blog aziendale, riorganizzati per il nuovo sito.
export const articles: Article[] = [
  {
    slug: "impianti-di-irrigazione-per-il-giardino-limportanza-dellautomazione",
    title:
      "Impianti di irrigazione per il giardino: l’importanza dell’automazione",
    date: "2026-01-13",
    category: "Irrigazione",
    sector: "giardinaggio-e-irrigazione",
    description:
      "Programmazione, componenti e cura del verde: come orientarsi nell’irrigazione automatica.",
    sections: [
      {
        title: "Una gestione più regolare",
        paragraphs: [
          "Annaffiare manualmente richiede tempo e costanza. Un sistema automatico permette di programmare la distribuzione dell’acqua in base alle esigenze del giardino, limitando gli interventi quotidiani e aiutando a evitare zone troppo asciutte o eccessivamente bagnate.",
        ],
      },
      {
        title: "Programmare in base agli spazi",
        paragraphs: [
          "La scelta non parte dalla sola centralina: contano terreno, esposizione, piante e superficie. La programmazione va adattata a queste condizioni, con componenti coerenti con le caratteristiche dell’impianto.",
        ],
        points: [
          "Valutare le necessità delle diverse zone verdi.",
          "Scegliere irrigatori, tubazioni e controllo in modo coordinato.",
          "Controllare periodicamente il funzionamento e aggiornare la programmazione.",
        ],
      },
      {
        title: "Componenti e ricambi",
        paragraphs: [
          "L’automazione aiuta a gestire l’irrigazione anche durante le assenze, ma richiede attenzione alla scelta dei materiali e alla manutenzione. IDROSUD offre prodotti e componenti sostitutivi per gli impianti di irrigazione: raccontaci il tuo spazio e quello che stai cercando.",
        ],
      },
    ],
  },
  {
    slug: "depurazione-acque-vantaggi-dei-trattamenti-di-depurazione-dellacqua",
    title: "Depurazione acque: vantaggi dei trattamenti dell’acqua",
    date: "2025-11-19",
    category: "Trattamento acqua",
    sector: "filtrazione-e-depurazione",
    description:
      "Filtrazione e depurazione: esigenze, tecnologie e criteri per scegliere una soluzione adatta.",
    sections: [
      {
        title: "Partire dalle caratteristiche dell’acqua",
        paragraphs: [
          "I sistemi di trattamento rispondono a esigenze differenti. Prima di scegliere un’apparecchiatura occorre considerare l’acqua disponibile, l’utilizzo previsto e le caratteristiche dell’impianto. Non tutti i filtri hanno la stessa funzione.",
        ],
      },
      {
        title: "Quali aspetti valutare",
        paragraphs: [
          "In relazione alla tecnologia scelta, il trattamento può intervenire su caratteristiche come durezza, sapore, odore o particelle presenti nell’acqua. I risultati dipendono dal sistema e dalla sua corretta gestione.",
        ],
        points: [
          "Individuare l’esigenza da affrontare prima di confrontare i prodotti.",
          "Valutare accessori e componenti necessari all’impianto.",
          "Considerare la manutenzione e la sostituzione degli elementi filtranti.",
        ],
      },
      {
        title: "Una scelta per l’uso quotidiano",
        paragraphs: [
          "Le soluzioni domestiche possono accompagnare abitudini che riducono il ricorso alle bottiglie monouso. Esistono inoltre sistemi destinati a impieghi professionali. Da IDROSUD puoi approfondire microfiltrazione, osmosi inversa e addolcimento e confrontarti sui prodotti adatti alle tue esigenze.",
        ],
      },
    ],
  },
  {
    slug: "progettazione-impianti-di-irrigazione-in-giardino-perche-linverno-e-il-momento-migliore-per-pensarci",
    title: "Impianti di irrigazione: perché pensarci in inverno",
    date: "2025-10-10",
    category: "Irrigazione",
    sector: "giardinaggio-e-irrigazione",
    description:
      "La stagione di riposo del giardino è un’occasione per valutare l’irrigazione e pianificare gli interventi.",
    sections: [
      {
        title: "Preparare la stagione successiva",
        paragraphs: [
          "La cura del verde continua anche quando gli spazi esterni vengono utilizzati meno. Pianificare in autunno e inverno permette di valutare con anticipo gli interventi, i materiali e i tempi necessari per arrivare preparati alla primavera.",
        ],
      },
      {
        title: "Le valutazioni di partenza",
        paragraphs: [
          "Un impianto va studiato sulle caratteristiche del giardino. Il confronto con un professionista aiuta a definire le esigenze tecniche e a scegliere i componenti.",
        ],
        points: [
          "Superfici, pendenze, terreno e tipologia di piante.",
          "Punti di prelievo dell’acqua, portata e pressione disponibili.",
          "Tubazioni, raccordi, valvole e centraline compatibili con il progetto.",
          "Tempi per eventuali scavi, posa e verifica del funzionamento.",
        ],
      },
      {
        title: "Organizzare prodotti e manutenzione",
        paragraphs: [
          "Programmare gli acquisti insieme agli interventi aiuta a evitare scelte frettolose. Se devi aggiornare un impianto esistente, raccogli le informazioni sui componenti già presenti. IDROSUD può aiutarti a orientarti tra prodotti, accessori e ricambi per l’irrigazione.",
        ],
      },
    ],
  },
  {
    slug: "chiusura-invernale-della-piscina-guida-alla-corretta-conservazione",
    title:
      "Cura della piscina a fine stagione: guida alla corretta conservazione",
    date: "2025-09-10",
    category: "Cura della piscina",
    sector: "piscine-e-ricambi",
    description:
      "Pulizia, controllo dell’acqua e copertura: i passaggi da considerare alla fine dell’estate.",
    sections: [
      {
        title: "Preparare il periodo di chiusura",
        paragraphs: [
          "Alla fine della stagione, occuparsi della piscina aiuta a preservare acqua e attrezzature e a organizzare la successiva riapertura. Il programma di svernamento deve tenere conto delle caratteristiche della vasca e delle indicazioni dei produttori.",
        ],
      },
      {
        title: "Le operazioni da valutare",
        points: [
          "Pulire pareti, fondo e filtro e rimuovere foglie e residui.",
          "Misurare i parametri dell’acqua prima di scegliere eventuali correzioni.",
          "Valutare i trattamenti di fine stagione e gli svernanti adatti all’impianto.",
          "Scegliere una copertura compatibile con la piscina e verificarne il corretto posizionamento.",
        ],
      },
      {
        title: "Continuare a controllare",
        paragraphs: [
          "La chiusura non elimina la necessità di verifiche periodiche. Controlla lo stato della copertura, l’eventuale accumulo d’acqua e le condizioni della piscina. Per modalità di utilizzo e dosaggi dei prodotti segui le rispettive etichette e le indicazioni tecniche. Per informazioni su coperture, attrezzature e prodotti per lo svernamento, contatta IDROSUD.",
        ],
      },
    ],
  },
  {
    slug: "curare-il-giardino-in-estate-i-consigli-degli-esperti",
    title: "Curare il giardino in estate: proteggere prato e piante dal caldo",
    date: "2025-07-21",
    category: "Cura del verde",
    sector: "giardinaggio-e-irrigazione",
    description:
      "Irrigazione, osservazione del terreno e gestione delle assenze nei mesi più caldi.",
    sections: [
      {
        title: "Osservare il giardino",
        paragraphs: [
          "Caldo e scarse piogge possono rendere più impegnativa la cura di prato e piante. L’acqua evapora più rapidamente dal terreno e le esigenze cambiano: osservare umidità, foglie e condizioni del prato aiuta a capire quando adeguare la gestione.",
        ],
      },
      {
        title: "Curare tempi e distribuzione",
        paragraphs: [
          "L’irrigazione al mattino presto limita l’esposizione al caldo durante l’annaffiatura. Se si irriga la sera, occorre considerare anche il tempo durante il quale il fogliame rimane bagnato.",
        ],
        points: [
          "Controllare l’umidità del terreno prima di modificare la programmazione.",
          "Verificare che irrigatori e ugelli distribuiscano l’acqua nelle aree previste.",
          "Seguire con regolarità la manutenzione del verde e rimuovere i rami secchi.",
        ],
      },
      {
        title: "Prepararsi alle assenze",
        paragraphs: [
          "Centraline e temporizzatori aiutano a gestire l’irrigazione quando non si è presenti. Prima di partire è utile controllare il funzionamento dell’impianto. Da IDROSUD trovi componenti e accessori per organizzare la cura degli spazi verdi.",
        ],
      },
    ],
  },
  {
    slug: "acque-torbide-come-combattere-le-acque-verdi-della-piscina",
    title: "Acque torbide: come affrontare le acque verdi della piscina",
    date: "2025-06-18",
    category: "Cura della piscina",
    sector: "piscine-e-ricambi",
    description:
      "Individuare le cause dell’acqua verde e valutare pulizia, filtrazione e trattamento.",
    sections: [
      {
        title: "Capire la causa",
        paragraphs: [
          "Un cambiamento di colore o trasparenza richiede attenzione. Alghe, metalli, filtrazione insufficiente e parametri dell’acqua non equilibrati possono contribuire al problema. Prima di scegliere un prodotto, è necessario capire quali condizioni stanno interessando la piscina.",
        ],
      },
      {
        title: "Verificare acqua e impianto",
        points: [
          "Misurare i parametri con strumenti adatti e controllare la manutenzione effettuata.",
          "Verificare il funzionamento e la pulizia del filtro.",
          "Rimuovere foglie, detriti e depositi da pareti e fondo.",
          "Valutare i trattamenti in relazione alla causa, alla compatibilità con l’impianto e alle istruzioni del prodotto.",
        ],
      },
      {
        title: "Dare continuità alla manutenzione",
        paragraphs: [
          "Controlli regolari, pulizia e filtrazione contribuiscono alla gestione della piscina durante la stagione. Evita di applicare dosaggi o combinazioni di prodotti senza verificarne le indicazioni tecniche. Per orientarti tra attrezzature, ricambi e prodotti per la manutenzione, descrivi a IDROSUD le caratteristiche del tuo impianto.",
        ],
      },
    ],
  },
];

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
